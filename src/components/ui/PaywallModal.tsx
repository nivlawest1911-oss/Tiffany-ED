"use client";

import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Lock, Sparkles, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface PaywallModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  onUpgradeStripe?: () => void;
  onRequestPO?: () => void;
}

export function PaywallModal({
  isOpen,
  onClose,
  title = "Unlock Enterprise Sovereign Intelligence",
  description = "This advanced evaluation report or feature requires a School Administrative or District Sovereign plan.",
  onUpgradeStripe,
  onRequestPO,
}: PaywallModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md bg-slate-950 border border-slate-800 text-slate-100 transform-gpu p-6">
        <DialogHeader className="space-y-3 text-center sm:text-left">
          <div className="mx-auto sm:mx-0 w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
            <Lock className="w-6 h-6 text-amber-400" />
          </div>
          <DialogTitle className="text-xl font-bold text-slate-100 leading-snug">
            {title}
          </DialogTitle>
          <DialogDescription className="text-slate-400 text-sm">
            {description}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 p-4 rounded-xl bg-slate-900/80 border border-slate-800/80 space-y-2 text-xs text-slate-300">
          <div className="flex items-center gap-2 font-semibold text-amber-400">
            <Sparkles className="w-4 h-4" />
            <span>District Tier Sovereign Features</span>
          </div>
          <ul className="list-disc list-inside space-y-1 text-slate-400">
            <li>Unlimited multi-school analytics & AI evaluations</li>
            <li>Custom Purchase Order (PO) & invoice workflows</li>
            <li>Board-ready PDF & presentation exports</li>
          </ul>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <Button
            onClick={onUpgradeStripe}
            className="flex-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold shadow-md shadow-amber-500/20"
          >
            Upgrade via Stripe
          </Button>
          <Button
            onClick={onRequestPO}
            variant="outline"
            className="flex-1 border-slate-700 hover:bg-slate-800 text-slate-200 flex items-center justify-center gap-1.5"
          >
            <FileText className="w-4 h-4 text-amber-400" />
            <span>Request District PO</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
