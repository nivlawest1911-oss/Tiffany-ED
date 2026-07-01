'use client';

import React, { useState } from 'react';
import { Sparkles, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';

export default function PresentTiffanyED() {
  const [prompt, setPrompt] = useState('');
  const [output, setOutput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);

    setTimeout(() => {
      setOutput(`**Differentiated Lesson: Grade 4 – Multisyllabic Words (Phonics Focus)**

**Objective:** Decode multisyllabic words using explicit phonics strategies.

**Science of Reading Alignment:** 94%

**Lesson Structure (35 min):**
1. Warm-Up (5 min) – Sound-spelling review
2. Explicit Instruction (12 min) – "tion/sion" pattern
3. Guided Practice (10 min) – Partner reading
4. Independent Application (8 min) – Comprehension questions

**Differentiation:**
- Below Level: Pre-highlighted text + audio support
- On Level: Standard passage
- Above Level: Extended text + inferencing challenge`);
      setIsGenerating(false);
    }, 1200);
  };

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto space-y-8">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-2xl bg-[#C5A46E]/10">
          <Sparkles className="h-6 w-6 text-[#C5A46E]" />
        </div>
        <h1 className="text-3xl font-semibold tracking-tight">Tiffany-ED</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <Card className="lg:col-span-2 bg-white/[0.03] border-white/10 hover:border-[#C5A46E]/40 rounded-3xl transition-all">
          <CardHeader>
            <CardTitle>Lesson Request</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Create a differentiated 4th grade lesson on multisyllabic words..."
              className="min-h-[160px] bg-white/5 border-white/10 rounded-2xl"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <Button 
              onClick={handleGenerate} 
              disabled={!prompt.trim() || isGenerating}
              className="w-full bg-[#C5A46E] hover:bg-[#C5A46E]/90 active:scale-[0.985] transition-all text-[#0A0F1C] rounded-2xl font-medium"
            >
              {isGenerating ? "Generating..." : "Generate Lesson Plan"}
            </Button>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3 bg-white/[0.03] border-white/10 hover:border-[#C5A46E]/40 rounded-3xl transition-all">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-[#C5A46E]" /> Generated Lesson
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!output && !isGenerating && (
              <p className="text-white/50 text-sm">Your lesson plan will appear here.</p>
            )}
            {isGenerating && <p className="text-[#C5A46E]">Generating lesson...</p>}
            {output && (
              <pre className="whitespace-pre-wrap text-sm text-white/90 leading-relaxed">{output}</pre>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
