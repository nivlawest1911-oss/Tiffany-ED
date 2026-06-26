'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function HelpCenterPage() {
  const faqs = [
    {
      question: "How do I generate lesson plans with Tiffany-ED?",
      answer: "Go to the Tiffany-ED page, type your request, and click 'Generate with Tiffany-ED'. All outputs are traceable to standards.",
    },
    {
      question: "How are student groups created?",
      answer: "Click 'Generate Smart Groups' on the Grouping page. Groups are created using Science of Reading research and your assessment data.",
    },
    {
      question: "Can parents access student data?",
      answer: "Yes. Parents can log in through the Parent Portal to view their child’s progress. All access is FERPA compliant.",
    },
    {
      question: "How do I connect Canvas or Clever?",
      answer: "Go to Admin → LTI Platforms and register your district’s LMS. Contact your district admin if you need help.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-semibold tracking-[-2px]">Help Center</h1>
          <p className="text-white/70 mt-2">Find answers or contact our support team</p>
        </div>

        {/* Search Bar */}
        <div className="mb-10">
          <Input 
            placeholder="Search for help articles..." 
            className="bg-white/5 border-white/10 py-6 text-lg" 
          />
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <Card className="bg-white/[0.03] border-white/10 hover:border-[#C5A46E]/40 transition-all cursor-pointer">
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-2">Getting Started</h3>
              <p className="text-sm text-white/70">Learn how to use EdIntel’s core features.</p>
            </CardContent>
          </Card>

          <Card className="bg-white/[0.03] border-white/10 hover:border-[#C5A46E]/40 transition-all cursor-pointer">
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-2">Tiffany-ED Guide</h3>
              <p className="text-sm text-white/70">How to generate lessons and feedback.</p>
            </CardContent>
          </Card>

          <Card className="bg-white/[0.03] border-white/10 hover:border-[#C5A46E]/40 transition-all cursor-pointer">
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-2">Data & Privacy</h3>
              <p className="text-sm text-white/70">FERPA, COPPA, and data security information.</p>
            </CardContent>
          </Card>
        </div>

        {/* FAQs */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="bg-white/[0.03] border-white/10">
                <CardHeader>
                  <CardTitle className="text-lg">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/80">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact Support */}
        <div className="mt-12 text-center">
          <p className="text-white/70 mb-4">Still need help?</p>
          <Button className="bg-[#C5A46E] hover:bg-[#A67C52] text-[#0A0F1C] font-semibold px-8">
            Contact Support
          </Button>
        </div>
      </div>
    </div>
  );
}
