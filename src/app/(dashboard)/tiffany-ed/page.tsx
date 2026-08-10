'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import GlassPanel from '@/components/ui/GlassPanel';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { AlertTriangle } from 'lucide-react';
import { logTimeSavedClient } from '@/lib/analytics/time-saved';

export default function TiffanyEDPage() {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [output, setOutput] = useState('');

  // Mock usage data for soft session limits (to be wired to DB/Auth)
  const sessionsUsed = 185;
  const sessionLimit = 200;
  const isNearLimit = sessionsUsed >= sessionLimit * 0.8 && sessionsUsed < sessionLimit;
  const isAtLimit = sessionsUsed >= sessionLimit;

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    if (isAtLimit) {
      toast.error('Session limit reached. Please upgrade to continue.');
      return;
    }

    setIsGenerating(true);
    setOutput('');

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          generatorId: 'tiffany-ed',
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        throw new Error(errorData?.error || 'Failed to generate');
      }

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      if (!reader) throw new Error('No stream available');

      let fullOutput = '';
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        const text = decoder.decode(value, { stream: true });
        fullOutput += text;
        setOutput(fullOutput);
      }
      
      toast.success('Generated successfully');
      void logTimeSavedClient('tiffany', { generatorId: 'tiffany-ed' });
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || 'An error occurred during generation');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-4xl font-semibold tracking-[-2px]">Tiffany-ED</h1>
            <Badge className="bg-[#C5A46E]/10 text-[#C5A46E] border-[#C5A46E]/30">
              AI Multiplier
            </Badge>
          </div>
          <p className="text-white/70">Generate traceable, standards-aligned lesson scaffolds and feedback</p>
        </div>

        {/* Soft Session Limit Banner */}
        {(isNearLimit || isAtLimit) && (
          <div className={`mb-6 p-4 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border ${isAtLimit ? 'bg-red-500/10 border-red-500/30' : 'bg-amber-500/10 border-amber-500/30'}`}>
            <div className="flex items-center gap-3">
              <AlertTriangle className={isAtLimit ? 'text-red-400' : 'text-amber-400'} size={24} />
              <div>
                <h4 className={`font-semibold ${isAtLimit ? 'text-red-400' : 'text-amber-400'}`}>
                  {isAtLimit ? 'Session Limit Reached' : 'Approaching Session Limit'}
                </h4>
                <p className="text-sm text-white/70 mt-1">
                  You have used {sessionsUsed} of your {sessionLimit} Tiffany-ED sessions this month. 
                  {isAtLimit ? " You cannot generate new lessons until your cycle resets or you upgrade." : " Your school might already cover this — ask admin or view district pricing."}
                </p>
              </div>
            </div>
            <div className="flex gap-3 whitespace-nowrap">
              <Button onClick={() => window.location.href = '/pricing'} variant="outline" className={`border-white/20 bg-transparent text-white hover:bg-white/10 ${isAtLimit ? 'border-red-500/50 hover:bg-red-500/20 text-red-100' : ''}`}>
                View Pricing
              </Button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Input Section */}
          <div className="lg:col-span-2">
            <GlassPanel className="bg-white/[0.03] border-white/10 h-full">
              <CardHeader>
                <CardTitle>What would you like to create?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Example: Create a 4th grade lesson on main idea with differentiation for Tier 2 students..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="min-h-[180px] bg-white/5 border-white/10 text-white resize-y"
                />

                <Button 
                  onClick={handleGenerate}
                  disabled={!prompt.trim() || isGenerating || isAtLimit}
                  className="w-full bg-[#C5A46E] hover:bg-[#A67C52] text-[#0A0F1C] font-semibold py-6"
                >
                  {isGenerating ? "Generating..." : "Generate Lesson Scaffold"}
                </Button>

                <p className="text-xs text-white/50 text-center">
                  All outputs are traceable to Alabama standards and logged for audit.
                </p>
              </CardContent>
            </GlassPanel>
          </div>

          {/* Output Section */}
          <div className="lg:col-span-3">
            <GlassPanel className="bg-white/[0.03] border-white/10 min-h-[420px]">
              <CardHeader>
                <CardTitle>Generated Output</CardTitle>
              </CardHeader>
              <CardContent>
                {output ? (
                  <div className="prose prose-invert max-w-none text-sm whitespace-pre-wrap">
                    {output}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-64 text-white/40 text-center">
                    Your generated lesson scaffold will appear here.<br />
                    Try describing what you need above.
                  </div>
                )}
              </CardContent>
            </GlassPanel>

            {output && (
              <div className="flex gap-3 mt-4">
                <Button variant="outline" className="flex-1">Copy to Clipboard</Button>
                <Button variant="outline" className="flex-1">Save to Library</Button>
                <Button variant="outline" className="flex-1">Regenerate</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
