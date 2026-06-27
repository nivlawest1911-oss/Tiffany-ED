'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function HelpPage() {
  const helpTopics = [
    {
      title: "Getting Started with EdIntel",
      description: "Learn the basics of navigating the platform and using core features.",
      link: "#",
    },
    {
      title: "Using Tiffany-ED",
      description: "How to generate lesson scaffolds, feedback, and traceable AI content.",
      link: "#",
    },
    {
      title: "Student Grouping & Interventions",
      description: "Understanding Tier 1, Tier 2, and Tier 3 grouping recommendations.",
      link: "#",
    },
    {
      title: "LTI Integration (Canvas, Clever, Google Classroom)",
      description: "How to connect and use EdIntel inside your existing LMS.",
      link: "#",
    },
    {
      title: "Parent Portal Guide",
      description: "How parents can view student progress and insights.",
      link: "#",
    },
    {
      title: "Data Privacy & Compliance",
      description: "FERPA, COPPA, and how EdIntel protects student information.",
      link: "#",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-semibold tracking-[-2px]">Help & Support</h1>
          <p className="text-white/70 mt-2">Find answers and learn how to get the most out of EdIntel.</p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search help articles..."
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/40 focus:outline-none focus:border-[#C5A46E]"
          />
        </div>

        {/* Help Topics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {helpTopics.map((topic, index) => (
            <Card 
              key={index} 
              className="bg-white/[0.03] border-white/10 hover:border-[#C5A46E]/40 transition-all cursor-pointer"
            >
              <CardHeader>
                <CardTitle className="text-xl">{topic.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/70 mb-4">{topic.description}</p>
                <Button variant="outline" className="text-sm">
                  Read Article
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact Support */}
        <div className="mt-12 text-center">
          <p className="text-white/70 mb-4">Can’t find what you’re looking for?</p>
          <Button className="bg-[#C5A46E] hover:bg-[#A67C52] text-[#0A0F1C] font-semibold px-8">
            Contact Support
          </Button>
        </div>
      </div>
    </div>
  );
}
