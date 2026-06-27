'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function LTIDeepLinksPage() {
  const [selectedResources, setSelectedResources] = useState<string[]>([]);

  const resources = [
    { id: 'dashboard', title: 'EdIntel Sovereign Dashboard', description: 'Full teacher workspace with progress and alerts' },
    { id: 'tiffany-ed', title: 'Tiffany-ED Lesson Planner', description: 'AI-powered lesson scaffolding and differentiation' },
    { id: 'grouping', title: 'Student Grouping & Tier Analysis', description: 'Smart AI-generated student groups' },
    { id: 'progress', title: 'Science of Reading Progress', description: 'Phonics, fluency, and comprehension monitoring' },
    { id: 'parent-portal', title: 'Parent Portal', description: 'Secure parent access to student insights' },
  ];

  const toggleResource = (id: string) => {
    setSelectedResources(prev =>
      prev.includes(id)
        ? prev.filter(r => r !== id)
        : [...prev, id]
    );
  };

  const generateConfig = () => {
    const config = {
      message_type: 'LtiDeepLinkingResponse',
      content_items: selectedResources.map(id => {
        const resource = resources.find(r => r.id === id);
        return {
          type: 'ltiResourceLink',
          title: resource?.title,
          url: `https://edintelai.vercel.app/${id}`,
        };
      }),
    };

    navigator.clipboard.writeText(JSON.stringify(config, null, 2));
    alert('Deep Link configuration copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-semibold tracking-[-2px]">LTI Deep Links</h1>
          <p className="text-white/70 mt-1">Configure resources that can be launched from Canvas, Clever, or Google Classroom</p>
        </div>

        {/* Resources */}
        <Card className="bg-white/[0.03] border-white/10 mb-6">
          <CardHeader>
            <CardTitle>Select Resources to Expose via LTI</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {resources.map((resource) => {
              const isSelected = selectedResources.includes(resource.id);
              return (
                <div
                  key={resource.id}
                  onClick={() => toggleResource(resource.id)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start gap-4 ${
                    isSelected 
                      ? 'border-[#C5A46E] bg-[#C5A46E]/5' 
                      : 'border-white/10 hover:border-white/30'
                  }`}
                >
                  <div className={`mt-1 w-5 h-5 rounded border flex items-center justify-center ${isSelected ? 'bg-[#C5A46E] border-[#C5A46E]' : 'border-white/30'}`}>
                    {isSelected && <span className="text-[#0A0F1C] text-xs">✓</span>}
                  </div>
                  <div>
                    <div className="font-semibold">{resource.title}</div>
                    <div className="text-sm text-white/60">{resource.description}</div>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex justify-between items-center">
          <p className="text-sm text-white/50">
            {selectedResources.length} resource{selectedResources.length !== 1 ? 's' : ''} selected
          </p>
          <Button 
            onClick={generateConfig}
            disabled={selectedResources.length === 0}
            className="bg-[#C5A46E] hover:bg-[#A67C52] text-[#0A0F1C] font-semibold"
          >
            Generate Deep Link Config
          </Button>
        </div>
      </div>
    </div>
  );
}
