"use client";

import React, { useState } from "react";
import { ShieldCheck, UserCheck, Lock, Unlock, FileText, CheckCircle2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface VerificationRecord {
  verified_by_human: true;
  verified_by_user_id: string;
  verification_timestamp: string;
  source_data_snapshot_hash: string;
}

interface SB63VerificationGateProps {
  documentTitle: string;
  studentName?: string;
  draftContent: string;
  sourceContext?: string;
  userId: string;
  onVerify: (record: VerificationRecord) => void;
  children: React.ReactNode;
}

export function SB63VerificationGate({
  documentTitle,
  studentName,
  draftContent,
  sourceContext,
  userId,
  onVerify,
  children,
}: SB63VerificationGateProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const handleAuthorize = async () => {
    if (!isConfirmed) return;
    
    // Generate SHA-256 hash of underlying source data
    const encoder = new TextEncoder();
    const data = encoder.encode(draftContent + (sourceContext || ""));
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");

    const record: VerificationRecord = {
      verified_by_human: true,
      verified_by_user_id: userId,
      verification_timestamp: new Date().toISOString(),
      source_data_snapshot_hash: hashHex,
    };

    setIsVerified(true);
    setIsOpen(false);
    onVerify(record);
  };

  return (
    <div className="space-y-4">
      {/* Verification Badge Status Bar */}
      <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono">
        <div className="flex items-center gap-2">
          <ShieldCheck className={`w-4 h-4 ${isVerified ? "text-emerald-400" : "text-amber-400"}`} />
          <span className="text-slate-300">
            Alabama SB 63 Compliance: <strong className={isVerified ? "text-emerald-400" : "text-amber-400"}>
              {isVerified ? "VERIFIED BY EDUCATOR" : "PENDING HUMAN OVERVIEW"}
            </strong>
          </span>
        </div>

        {!isVerified ? (
          <Button
            size="sm"
            onClick={() => setIsOpen(true)}
            className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5"
          >
            <Lock className="w-3.5 h-3.5" /> Authorize Document
          </Button>
        ) : (
          <span className="text-emerald-400 font-bold flex items-center gap-1">
            <CheckCircle2 className="w-4 h-4" /> Export Unlocked
          </span>
        )}
      </div>

      {/* Side-by-Side Verification Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-4xl w-full p-6 space-y-6 shadow-2xl overflow-y-auto max-h-[90vh]">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono uppercase text-amber-400 font-semibold flex items-center gap-1">
                  <UserCheck className="w-4 h-4" /> Alabama SB 63 Human-in-the-Loop Audit Gate
                </span>
                <h2 className="text-xl font-bold text-slate-100 mt-1">{documentTitle}</h2>
                {studentName && <p className="text-xs text-slate-400 font-mono">Student: {studentName}</p>}
              </div>
              <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-slate-200 text-sm font-bold">
                ✕
              </button>
            </div>

            {/* Side-by-Side View */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
              <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-2">
                <h4 className="font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1 text-[11px]">
                  <FileText className="w-3.5 h-3.5 text-sky-400" /> Source Data / Student Context
                </h4>
                <div className="text-slate-400 leading-relaxed font-mono whitespace-pre-wrap max-h-60 overflow-y-auto">
                  {sourceContext || "No background student context linked."}
                </div>
              </div>

              <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-2">
                <h4 className="font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1 text-[11px]">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" /> AI Drafted Recommendations
                </h4>
                <div className="text-slate-200 leading-relaxed whitespace-pre-wrap max-h-60 overflow-y-auto">
                  {draftContent}
                </div>
              </div>
            </div>

            {/* Authorization Checkbox & Action */}
            <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-4">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isConfirmed}
                  onChange={(e) => setIsConfirmed(e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-slate-700 bg-slate-900 text-amber-500 focus:ring-amber-500"
                />
                <span className="text-xs text-slate-300 leading-relaxed">
                  I certify as a licensed educator/administrator that I have reviewed the AI-generated draft against official student records. I accept full professional responsibility for this document under Alabama SB 63.
                </span>
              </label>

              <div className="flex justify-end gap-3 pt-2">
                <Button variant="ghost" onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-slate-200">
                  Cancel
                </Button>
                <Button
                  onClick={handleAuthorize}
                  disabled={!isConfirmed}
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold flex items-center gap-2"
                >
                  <Unlock className="w-4 h-4" /> Digitally Sign & Unlock Export
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Render Action Children (Buttons/Export Options) when verified */}
      <div className={!isVerified ? "opacity-50 pointer-events-none" : ""}>
        {children}
      </div>
    </div>
  );
}
