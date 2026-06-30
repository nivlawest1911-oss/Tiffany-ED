'use client';

import React, { useState } from 'react';
import { BookOpen, Sparkles, Target, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';

export default function DemoTiffanyED() {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');
  const [showToast, setShowToast] = useState(false);

  const handleGenerate = () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setGeneratedContent('');

    // Simulate AI generation delay
    setTimeout(() => {
      const demoOutput = `**Differentiated Lesson Plan: Grade 4 – Phonics & Comprehension**

**Objective:** Students will decode multisyllabic words and improve reading fluency using explicit phonics strategies aligned to Alabama Literacy Act.

**Science of Reading Alignment:** 94%  
**Estimated Time:** 35 minutes  
**Tier Support:** Tier 1 + targeted Tier 2 scaffolds

**Lesson Flow:**
1. **Warm-Up (5 min)** – Sound-spelling review with Elkonin boxes
2. **Explicit Instruction (12 min)** – Teaching the "tion/sion" pattern with visual anchors
3. **Guided Practice (10 min)** – Partner reading with decodable text
4. **Independent Application (8 min)** – Comprehension questions with sentence starters

**Differentiation:**
- **Below Level:** Pre-highlighted text + audio support option
- **On Level:** Standard passage + vocabulary preview
- **Above Level:** Extended text + inferencing challenge questions

**Assessment:** Exit ticket – 3 words decoded + 1 comprehension response`;

      setGeneratedContent(demoOutput);
      setIsGenerating(false);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2200);
    }, 1400);
  };

  const handleClear = () => {
    setPrompt('');
    setGeneratedContent('');
  };

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-2xl bg-[#C5A46E]/10">
            <Sparkles className="h-6 w-6 text-[#C5A46E]" />
          </div>
          <h1 className="text-3xl font-semibold tracking-tight">Tiffany-ED</h1>
        </div>
        <p className="text-white/60">AI-powered lesson differentiation aligned to ALCOS & Science of Reading</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Prompt Input */}
        <Card className="lg:col-span-2 bg-white/[0.03] border-white/10 rounded-3xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Target className="h-5 w-5 text-[#C5A46E]" /> Lesson Request
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Example: Create a differentiated 4th grade lesson on multisyllabic words with phonics focus for struggling readers..."
              className="min-h-[180px] bg-white/5 border-white/10 rounded-2xl resize-y"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            
            <div className="flex gap-3">
              <Button 
                onClick={handleGenerate} 
                disabled={!prompt.trim() || isGenerating}
                className="flex-1 bg-[#C5A46E] hover:bg-[#C5A46E]/90 text-[#0A0F1C] font-medium rounded-2xl h-11"
              >
                {isGenerating ? "Generating..." : "Generate Lesson Plan"}
              </Button>
              <Button onClick={handleClear} variant="outline" className="border-white/20 rounded-2xl h-11 px-6">
                Clear
              </Button>
            </div>

            <div className="text-xs text-white/50 flex items-center gap-2 pt-1">
              <Clock className="h-3.5 w-3.5" /> Typical generation time: 4–8 seconds
            </div>
          </CardContent>
        </Card>

        {/* Output Area */}
        <Card className="lg:col-span-3 bg-white/[0.03] border-white/10 rounded-3xl flex flex-col">
          <CardHeader className="border-b border-white/10">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-lg">
                <BookOpen className="h-5 w-5 text-[#C5A46E]" /> Generated Lesson
              </CardTitle>
              {generatedContent && (
                <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/30">Ready for use</Badge>
              )}
            </div>
          </CardHeader>
          <CardContent className="flex-1 p-6">
            {!generatedContent && !isGenerating && (
              <div className="h-full flex items-center justify-center text-center text-white/40">
                Your differentiated lesson plan will appear here after generation.
              </div>
            )}

            {isGenerating && (
              <div className="h-full flex items-center justify-center">
                <div className="flex flex-col items-center gap-4 text-[#C5A46E]">
                  <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#C5A46E] border-t-transparent" />
                  <p className="text-sm">Tiffany-ED is synthesizing your lesson...</p>
                </div>
              </div>
            )}

            {generatedContent && (
              <div className="prose prose-invert prose-sm max-w-none text-white/90 whitespace-pre-wrap leading-relaxed">
                {generatedContent}
              </div>
            )}
          </CardContent>

          {generatedContent && (
            <div className="p-6 pt-0">
              <Button onClick={handleGenerate} variant="outline" className="w-full border-[#C5A46E]/40 text-[#C5A46E] hover:bg-[#C5A46E]/10 rounded-2xl">
                Regenerate with Adjustments
              </Button>
            </div>
          )}
        </Card>
      </div>

      {showToast && (
        <div className="fixed bottom-6 right-6 bg-[#C5A46E] text-[#0A0F1C] px-6 py-3 rounded-2xl text-sm font-medium shadow-xl flex items-center gap-2">
          <Sparkles className="h-4 w-4" /> Lesson plan ready — copied to clipboard in real version
        </div>
      )}
    </div>
  );
}
