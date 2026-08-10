"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import GlassPanel from "@/components/ui/GlassPanel";
import { Copy, X, Mail } from "lucide-react";
import { toast } from "sonner";

export default function RosterPage() {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewContent, setPreviewContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [canSend, setCanSend] = useState(false);

  const mockStudents = [
    { id: "1", name: "Aaliyah Brooks", grade: "4th" },
    { id: "2", name: "Marcus Chen", grade: "4th" },
  ];

  const handlePreviewDigest = async (studentId?: string) => {
    setIsLoading(true);
    setIsPreviewOpen(true);
    try {
      const res = await fetch("/api/parents/digest/preview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentId, classId: "class-1" }),
      });
      const data = await res.json();
      if (res.ok) {
        setPreviewContent(data.preview);
        setCanSend(data.canSend);
      } else {
        setPreviewContent("Error generating preview.");
      }
    } catch (err) {
      setPreviewContent("Network error generating preview.");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(previewContent);
    toast.success("Digest copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-semibold tracking-[-2px] mb-8">Class Roster</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <GlassPanel className="border-white/10 p-6">
            <h2 className="text-xl font-medium mb-4">Students</h2>
            <div className="space-y-3">
              {mockStudents.map((s) => (
                <div key={s.id} className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span>{s.name} ({s.grade})</span>
                  <Button variant="outline" size="sm" className="border-white/20" onClick={() => handlePreviewDigest(s.id)}>
                    Preview Parent Digest
                  </Button>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <Button onClick={() => handlePreviewDigest()} className="bg-[#C5A46E] text-black hover:bg-[#A67C52] w-full">
                Generate Class-wide Digest
              </Button>
            </div>
          </GlassPanel>
        </div>
      </div>

      {isPreviewOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <GlassPanel hoverIntensity="none" className="w-full max-w-2xl p-6 shadow-2xl border-white/10 bg-[#0F1524]/90">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold">Weekly Parent Digest</h2>
              <button onClick={() => setIsPreviewOpen(false)} className="rounded-lg p-2 text-white/60 hover:bg-white/10 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="bg-white/5 p-4 rounded-xl max-h-96 overflow-y-auto whitespace-pre-wrap font-mono text-sm border border-white/10 text-white/80">
              {isLoading ? "Generating personalized digest..." : previewContent}
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <Button variant="outline" className="border-white/20 gap-2" onClick={copyToClipboard} disabled={isLoading}>
                <Copy className="h-4 w-4" /> Copy Text
              </Button>
              {canSend && (
                <Button className="bg-emerald-600 text-white hover:bg-emerald-500 gap-2" onClick={() => toast.success("Digest queued for sending.")} disabled={isLoading}>
                  <Mail className="h-4 w-4" /> Send via Email
                </Button>
              )}
            </div>
          </GlassPanel>
        </div>
      )}
    </div>
  );
}
