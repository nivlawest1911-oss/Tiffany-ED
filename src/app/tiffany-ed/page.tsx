'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function TiffanyEDPage() {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState('');

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setResult('');

    // TODO: Replace with actual API call to your generate endpoint
    setTimeout(() => {
      setResult(
        `Here is a sample AI-generated lesson scaffold based on your input:\n\n` +
        `**Objective:** Students will be able to identify main idea and supporting details.\n\n` +
        `**Standards Alignment:** ALCOS.ELA.4.RI.2, Science of Reading - Comprehension\n\n` +
        `**Suggested Activities:**\n` +
        `1. Warm-up discussion (5 min)\n` +
        `2. Guided reading with annotation (15 min)\n` +
        `3. Partner discussion using sentence stems (10 min)\n` +
        `4. Exit ticket (5 min)`
      );
      setIsGenerating(false);
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-4xl font-semibold tracking-[-2px]">Tiffany-ED</h1>
            <Badge className="bg-[#C5A46E]/10 text-[#C5A46E] border-[#C5A46E]/30">AI Multiplier</Badge>
          </div>
          <p className="text-white/70">Generate traceable, standards-aligned lesson scaffolds and feedback.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Input Section */}
          <div className="lg:col-span-2">
            <Card className="bg-white/[0.03] border-white/10 h-full">
              <CardHeader>
                <CardTitle>What would you like help with?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Example: Create a 4th grade lesson on main idea and supporting details using Science of Reading strategies..."
                  className="min-h-[180px] bg-white/5 border-white/10 text-white"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                />

                <Button 
                  onClick={handleGenerate} 
                  disabled={!prompt.trim() || isGenerating}
                  className="w-full bg-[#C5A46E] hover:bg-[#A67C52] text-[#0A0F1C] font-semibold"
                >
                  {isGenerating ? 'Generating...' : 'Generate with Tiffany-ED'}
                </Button>

                <p className="text-xs text-white/50 text-center">
                  All generations are logged and traceable to standards.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Output Section */}
          <div className="lg:col-span-3">
            <Card className="bg-white/[0.03] border-white/10 min-h-[320px]">
              <CardHeader>
                <CardTitle>Generated Output</CardTitle>
              </CardHeader>
              <CardContent>
                {result ? (
                  <div className="whitespace-pre-wrap text-white/90 leading-relaxed">
                    {result}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-[220px] text-white/40 text-sm">
                    Your AI-generated content will appear here...
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
