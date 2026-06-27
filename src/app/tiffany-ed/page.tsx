'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function TiffanyEDPage() {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [output, setOutput] = useState('');

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);

    // Simulate AI generation (replace with real API call later)
    await new Promise(resolve => setTimeout(resolve, 1800));

    const mockOutput = `**Lesson Scaffold: Main Idea & Supporting Details (4th Grade)**

**Objective:** Students will identify the main idea and supporting details in informational texts.

**Standards Aligned:** ALCOS.ELA.4.RI.2

**Warm-Up (5 min):**
- Quick review of key vocabulary using visual cards.

**Core Activity (20 min):**
- Students read a short passage about Alabama’s waterways.
- Use the “Main Idea Detective” graphic organizer (provided).

**Differentiation:**
- Tier 1: Independent reading + written response
- Tier 2: Partner reading with sentence starters
- Tier 3: Teacher-led small group with highlighted text

**Exit Ticket:** Students write one sentence stating the main idea of the passage.`;

    setOutput(mockOutput);
    setIsGenerating(false);
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

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Input Section */}
          <div className="lg:col-span-2">
            <Card className="bg-white/[0.03] border-white/10 h-full">
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
                  disabled={!prompt.trim() || isGenerating}
                  className="w-full bg-[#C5A46E] hover:bg-[#A67C52] text-[#0A0F1C] font-semibold py-6"
                >
                  {isGenerating ? "Generating..." : "Generate Lesson Scaffold"}
                </Button>

                <p className="text-xs text-white/50 text-center">
                  All outputs are traceable to Alabama standards and logged for audit.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Output Section */}
          <div className="lg:col-span-3">
            <Card className="bg-white/[0.03] border-white/10 min-h-[420px]">
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
            </Card>

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
