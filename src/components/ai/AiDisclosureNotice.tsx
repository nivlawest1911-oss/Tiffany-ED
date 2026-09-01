import React from 'react';
import { ShieldAlert, CheckCircle2, AlertCircle } from 'lucide-react';
import { AI_DISCLOSURE_NOTICE, GovernanceMetadata } from '@/lib/ai/governance-gate';

export interface AiDisclosureNoticeProps {
  governance?: GovernanceMetadata | null;
  className?: string;
  variant?: 'banner' | 'footer' | 'badge';
}

export function AiDisclosureNotice({
  governance,
  className = '',
  variant = 'banner',
}: AiDisclosureNoticeProps) {
  const isHighStakes = governance?.humanReviewRequired ?? true;
  const isFinalized = governance?.finalized ?? false;
  const noticeText = governance?.aiDisclosure || AI_DISCLOSURE_NOTICE;

  if (variant === 'badge') {
    return (
      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono border ${
        isFinalized
          ? 'bg-emerald-950/40 border-emerald-800/60 text-emerald-400'
          : isHighStakes
          ? 'bg-amber-950/40 border-amber-800/60 text-amber-300'
          : 'bg-slate-900/60 border-slate-800 text-slate-400'
      } ${className}`}>
        {isFinalized ? (
          <>
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Human Verified & Finalized</span>
          </>
        ) : isHighStakes ? (
          <>
            <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
            <span>Educator Review Required</span>
          </>
        ) : (
          <span>AI Assisted</span>
        )}
      </div>
    );
  }

  if (variant === 'footer') {
    return (
      <footer className={`pt-4 mt-6 border-t border-slate-800/80 text-xs text-slate-400 font-sans ${className}`}>
        <div className="flex items-start gap-2 max-w-3xl">
          <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="leading-relaxed">
              <span className="font-semibold text-slate-300">AI Assistance Disclosure:</span>{' '}
              {noticeText}
            </p>
            {governance?.finalizedBy ? (
              <p className="text-slate-500 font-mono text-[11px]">
                Verified by {governance.finalizedBy} on {governance.finalizedAt ? new Date(governance.finalizedAt).toLocaleDateString() : 'N/A'}
              </p>
            ) : (
              <p className="text-amber-400/90 font-mono text-[11px]">
                Status: Pending Human Verification
              </p>
            )}
          </div>
        </div>
      </footer>
    );
  }

  // Default: banner
  return (
    <div className={`p-3.5 rounded-lg border flex items-start gap-3 text-xs ${
      isFinalized
        ? 'bg-emerald-950/20 border-emerald-800/40 text-emerald-300'
        : 'bg-amber-950/20 border-amber-800/40 text-amber-200/90'
    } ${className}`}>
      {isFinalized ? (
        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
      ) : (
        <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
      )}
      <div className="space-y-0.5">
        <div className="font-semibold tracking-wide">
          {isFinalized ? 'Institutional Verification Complete' : 'AI-Assisted Educational Content'}
        </div>
        <p className="text-slate-300/90 leading-relaxed">{noticeText}</p>
      </div>
    </div>
  );
}
