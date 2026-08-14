"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { FileCheck, Send } from "lucide-react";

export interface PORequestDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitPO?: (data: { districtName: string; contactEmail: string; poNumber: string }) => void;
}

export function PORequestDialog({ isOpen, onClose, onSubmitPO }: PORequestDialogProps) {
  const [districtName, setDistrictName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [poNumber, setPoNumber] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmitPO) {
      onSubmitPO({ districtName, contactEmail, poNumber });
    }
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-lg bg-slate-950 border border-slate-800 text-slate-100 transform-gpu p-6">
        <DialogHeader className="space-y-2 text-center sm:text-left">
          <DialogTitle className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-amber-400" />
            <span>Generate District Purchase Order (PO)</span>
          </DialogTitle>
          <DialogDescription className="text-slate-400 text-sm">
            Enter your district procurement details below to issue an enterprise PO invoice immediately.
          </DialogDescription>
        </DialogHeader>

        {isSubmitted ? (
          <div className="py-8 text-center space-y-3">
            <div className="mx-auto w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <FileCheck className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-semibold text-slate-100">PO Invoice Request Submitted</h4>
            <p className="text-sm text-slate-400">An official invoice has been generated and dispatched to your procurement team.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 mt-2">
            <div className="space-y-1.5">
              <Label htmlFor="districtName" className="text-xs text-slate-300">
                School District Name
              </Label>
              <Input
                id="districtName"
                value={districtName}
                onChange={(e) => setDistrictName(e.target.value)}
                placeholder="e.g. Jefferson County School District"
                required
                className="bg-slate-900 border-slate-800 text-slate-100 focus-visible:ring-amber-500"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="contactEmail" className="text-xs text-slate-300">
                Superintendent / Procurement Email
              </Label>
              <Input
                id="contactEmail"
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                placeholder="superintendent@district.edu"
                required
                className="bg-slate-900 border-slate-800 text-slate-100 focus-visible:ring-amber-500"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="poNumber" className="text-xs text-slate-300">
                PO / Requisition Reference # (Optional)
              </Label>
              <Input
                id="poNumber"
                value={poNumber}
                onChange={(e) => setPoNumber(e.target.value)}
                placeholder="PO-2026-9812"
                className="bg-slate-900 border-slate-800 text-slate-100 focus-visible:ring-amber-500"
              />
            </div>

            <div className="pt-2 flex justify-end gap-3">
              <Button type="button" variant="ghost" onClick={onClose} className="text-slate-400 hover:text-slate-200">
                Cancel
              </Button>
              <Button type="submit" className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold flex items-center gap-2">
                <Send className="w-4 h-4" />
                <span>Submit PO Invoice Request</span>
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
