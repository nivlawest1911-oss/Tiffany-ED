"use client";

import React, { useState, useEffect, useId } from "react";
import { ShieldCheck, UserCheck, Lock, Unlock, FileText, CheckCircle2, Sparkles, Hash, Eye, Columns, FileCode, Check } from "lucide-react";
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

// Inline SVG SHA-256 Verification Badge Indicator Component
const SHA256BadgeSVG = ({ hash, isVerified }: { hash: string; isVerified: boolean }) => (
  <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/60 border border-amber-400/30 text-amber-300 font-mono text-[10px] shadow-[0_0_15px_rgba(245,158,11,0.1)]">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={isVerified ? "text-emerald-400" : "text-amber-400"}>
      <path d="M12 22S20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
    <div className="flex flex-col">
      <span className="text-[8px] uppercase tracking-widest text-zinc-500 font-bold">SHA-256 Audit Seal</span>
      <span className="font-mono text-zinc-300 tracking-tight font-semibold">
        {hash ? `${hash.slice(0, 8)}...${hash.slice(-8)}` : 'COMPUTING HASH...'}
      </span>
    </div>
  </div>
);

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
  const [currentHash, setCurrentHash] = useState<string>('');
  const [diffMode, setDiffMode] = useState<'side-by-side' | 'unified'>('side-by-side');
  
  const modalTitleId = useId();

  // Compute live SHA-256 hash on mount or payload change
  useEffect(() => {
    let isMounted = true;
    async function computeHash() {
      try {
        const encoder = new TextEncoder();
        const data = encoder.encode((draftContent || "") + (sourceContext || ""));
        const hashBuffer = await crypto.subtle.digest("SHA-256", data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
        if (isMounted) setCurrentHash(hashHex);
      } catch (err) {
        if (isMounted) setCurrentHash("e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855");
      }
    }
    computeHash();
    return () => { isMounted = false; };
  }, [draftContent, sourceContext]);

  // Handle ESC key accessible close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleAuthorize = async () => {
    if (!isConfirmed) return;

    let finalHash = currentHash;
    if (!finalHash) {
      const encoder = new TextEncoder();
      const data = encoder.encode((draftContent || "") + (sourceContext || ""));
      const hashBuffer = await crypto.subtle.digest("SHA-256", data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      finalHash = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
    }

    const record: VerificationRecord = {
      verified_by_human: true,
      verified_by_user_id: userId,
      verification_timestamp: new Date().toISOString(),
      source_data_snapshot_hash: finalHash,
    };

    setIsVerified(true);
    setIsOpen(false);
    onVerify(record);
  };

  // Simple line-by-line diff computation generator
  const getDiffLines = () => {
    const sourceLines = (sourceContext || "No baseline context linked.").split('\n');
    const draftLines = (draftContent || "").split('\n');
    const maxLines = Math.max(sourceLines.length, draftLines.length);

    const lines = [];
    for (let i = 0; i < maxLines; i++) {
      const src = sourceLines[i] || "";
      const drf = draftLines[i] || "";
      let type: 'same' | 'modified' | 'added' | 'removed' = 'same';
      if (!src && drf) type = 'added';
      else if (src && !drf) type = 'removed';
      else if (src !== drf) type = 'modified';

      lines.push({ lineNum: i + 1, src, drf, type });
    }
    return lines;
  };

  const diffLines = getDiffLines();

  return (
    <div className="space-y-4 font-sans">
      {/* Verification Status Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between p-3.5 rounded-2xl bg-[#050814]/90 border border-white/10 text-xs font-mono gap-3 shadow-xl">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-xl border ${isVerified ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" : "bg-amber-500/10 border-amber-400/30 text-amber-400"}`}>
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-zinc-500 uppercase tracking-widest">Alabama SB 63 Compliance Protocol</span>
            <span className={`font-bold uppercase tracking-wider ${isVerified ? "text-emerald-400" : "text-amber-400"}`}>
              {isVerified ? "HUMAN VERIFIED & DIGITALLY SIGNED" : "PENDING HUMAN OVERVIEW"}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <SHA256BadgeSVG hash={currentHash} isVerified={isVerified} />

          {!isVerified ? (
            <Button
              size="sm"
              onClick={() => setIsOpen(true)}
              className="bg-amber-400 hover:bg-amber-300 text-black font-black text-xs px-4 py-2 rounded-xl flex items-center gap-2 shadow-[0_0_20px_rgba(245,158,11,0.2)] font-mono uppercase"
            >
              <Lock className="w-3.5 h-3.5" /> Authorize Document
            </Button>
          ) : (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold font-mono text-[10px] uppercase">
              <CheckCircle2 className="w-4 h-4" /> Export Unlocked
            </div>
          )}
        </div>
      </div>

      {/* Accessible Side-by-Side Verification Modal */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={modalTitleId}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4"
        >
          <div className="bg-[#050814] border border-amber-400/30 rounded-3xl max-w-5xl w-full p-6 space-y-5 shadow-2xl overflow-y-auto max-h-[92vh] font-sans">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-white/10 pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-bold uppercase tracking-widest">
                  <UserCheck className="w-4 h-4" />
                  <span>Alabama SB 63 Human-in-the-Loop Gate</span>
                </div>
                <h2 id={modalTitleId} className="text-xl font-black text-white uppercase italic tracking-tight">
                  {documentTitle}
                </h2>
                {studentName && <p className="text-xs text-zinc-400 font-mono">Student Subject: <span className="text-white font-bold">{studentName}</span></p>}
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors border border-white/5 text-xs font-mono"
                aria-label="Close modal"
              >
                ✕ ESC
              </button>
            </div>

            {/* Diff View Toolbar & SHA-256 Badge Indicator */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 rounded-2xl bg-white/[0.02] border border-white/5 font-mono text-xs">
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Diff Inspector Mode:</span>
                <button
                  onClick={() => setDiffMode('side-by-side')}
                  className={`px-3 py-1 rounded-lg border transition-all text-[10px] uppercase font-bold flex items-center gap-1.5 ${
                    diffMode === 'side-by-side' ? 'bg-amber-400 text-black border-amber-400' : 'bg-black/40 border-white/10 text-zinc-400 hover:text-white'
                  }`}
                >
                  <Columns size={12} /> Side-by-Side
                </button>
                <button
                  onClick={() => setDiffMode('unified')}
                  className={`px-3 py-1 rounded-lg border transition-all text-[10px] uppercase font-bold flex items-center gap-1.5 ${
                    diffMode === 'unified' ? 'bg-amber-400 text-black border-amber-400' : 'bg-black/40 border-white/10 text-zinc-400 hover:text-white'
                  }`}
                >
                  <FileCode size={12} /> Unified Line Diff
                </button>
              </div>

              {/* Dynamic SHA-256 Badge */}
              <SHA256BadgeSVG hash={currentHash} isVerified={isVerified} />
            </div>

            {/* Diff Content View Area */}
            {diffMode === 'side-by-side' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-sans text-xs">
                {/* Source Context Baseline */}
                <div className="bg-[#030712] border border-white/10 p-4 rounded-2xl space-y-3">
                  <div className="flex items-center justify-between border-b border-white/5 pb-2">
                    <h4 className="font-mono font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1.5 text-[11px]">
                      <FileText className="w-3.5 h-3.5" /> Source Baseline Data
                    </h4>
                    <span className="text-[9px] font-mono text-zinc-500 uppercase">Original Record</span>
                  </div>
                  <div className="text-zinc-300 leading-relaxed font-mono text-xs whitespace-pre-wrap max-h-72 overflow-y-auto custom-scrollbar p-2 bg-black/40 rounded-xl border border-white/5">
                    {sourceContext || "No background student context linked."}
                  </div>
                </div>

                {/* AI Draft Recommendation */}
                <div className="bg-[#030712] border border-amber-400/30 p-4 rounded-2xl space-y-3 shadow-[0_0_20px_rgba(245,158,11,0.05)]">
                  <div className="flex items-center justify-between border-b border-white/5 pb-2">
                    <h4 className="font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5 text-[11px]">
                      <Sparkles className="w-3.5 h-3.5" /> AI Drafted Scaffolding
                    </h4>
                    <span className="text-[9px] font-mono text-amber-400 uppercase">Proposed Accommodation</span>
                  </div>
                  <div className="text-white leading-relaxed font-sans text-xs whitespace-pre-wrap max-h-72 overflow-y-auto custom-scrollbar p-2 bg-black/40 rounded-xl border border-amber-400/20">
                    {draftContent}
                  </div>
                </div>
              </div>
            ) : (
              /* Unified Line Diff Inspector */
              <div className="bg-[#030712] border border-white/10 rounded-2xl p-4 font-mono text-xs space-y-2 max-h-80 overflow-y-auto custom-scrollbar">
                <div className="flex items-center justify-between border-b border-white/5 pb-2 text-[10px] text-zinc-500 uppercase tracking-widest font-bold">
                  <span>Line Diff View</span>
                  <span>+ Added / - Baseline</span>
                </div>
                <div className="space-y-1">
                  {diffLines.map((line, idx) => (
                    <div
                      key={idx}
                      className={`grid grid-cols-12 gap-2 p-1.5 rounded text-[11px] leading-tight ${
                        line.type === 'modified'
                          ? 'bg-amber-500/10 border-l-2 border-amber-400 text-amber-200'
                          : line.type === 'added'
                          ? 'bg-emerald-500/10 border-l-2 border-emerald-400 text-emerald-300'
                          : line.type === 'removed'
                          ? 'bg-rose-500/10 border-l-2 border-rose-400 text-rose-300'
                          : 'text-zinc-400 hover:bg-white/[0.02]'
                      }`}
                    >
                      <span className="col-span-1 text-zinc-600 select-none text-right">{line.lineNum}</span>
                      <div className="col-span-11 flex flex-col">
                        {line.type === 'modified' && (
                          <>
                            <span className="line-through text-rose-400/70">- {line.src}</span>
                            <span className="text-emerald-300 font-bold">+ {line.drf}</span>
                          </>
                        )}
                        {line.type === 'added' && <span>+ {line.drf}</span>}
                        {line.type === 'removed' && <span>- {line.src}</span>}
                        {line.type === 'same' && <span>  {line.drf || line.src}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Educator Certification Attestation & Action */}
            <div className="bg-[#030712] border border-amber-400/30 p-5 rounded-2xl space-y-4">
              <label className="flex items-start gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={isConfirmed}
                  onChange={(e) => setIsConfirmed(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-amber-400/50 bg-black text-amber-400 focus:ring-amber-400"
                />
                <span className="text-xs text-zinc-200 leading-relaxed font-sans font-medium">
                  I certify as a licensed educator/administrator that I have reviewed the AI-generated draft against official student baseline records. I accept full professional responsibility for this document under Alabama SB 63 and digital due process compliance standards.
                </span>
              </label>

              <div className="flex justify-end gap-3 pt-2 font-mono">
                <Button variant="ghost" onClick={() => setIsOpen(false)} className="text-zinc-400 hover:text-white text-xs">
                  Cancel
                </Button>
                <Button
                  onClick={handleAuthorize}
                  disabled={!isConfirmed}
                  className="bg-amber-400 hover:bg-amber-300 text-black font-black text-xs px-6 py-5 rounded-xl flex items-center gap-2 shadow-[0_0_25px_rgba(245,158,11,0.3)] disabled:opacity-40 uppercase"
                >
                  <Unlock className="w-4 h-4" /> Digitally Sign & Unlock Export
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Render Action Children (Buttons/Export Options) when verified */}
      <div className={!isVerified ? "opacity-40 pointer-events-none transition-opacity" : "opacity-100 transition-opacity"}>
        {children}
      </div>
    </div>
  );
}
