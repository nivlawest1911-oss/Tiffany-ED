"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, Sparkles, Brain, CheckCircle2, X, AlertTriangle, 
  Calendar, Check, UserCheck, Plus, BookOpen, AlertCircle, Save
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from '@/components/ui/select';
import { toast } from 'sonner';

interface StudentProps {
  student: {
    id: string;
    firstName: string;
    lastName: string;
    sisId: string;
    gradeLevel: string;
    lexileLevel: number;
    interventionTier: string;
    deficits: string[];
  };
  onClose: () => void;
}

export function ReadingPlanArchitect({ student, onClose }: StudentProps) {
  const [interventionProgram, setInterventionProgram] = useState("Orton-Gillingham");
  const [frequency, setFrequency] = useState("Daily (30 Minutes)");
  const [parentNotified, setParentNotified] = useState(true);
  const [progressNotes, setProgressNotes] = useState("Student exhibits active phonemic blockages during simple blends. Applying targeted multisensory decodable scaffolding.");
  const [customGaps, setCustomGaps] = useState<string[]>(student.deficits);
  const [isSaving, setIsSaving] = useState(false);

  const handleSavePlan = async () => {
    setIsSaving(true);
    await new Promise(r => setTimeout(r, 1500));
    setIsSaving(false);
    toast.success(`SRIP successfully certified!`, {
      description: `Student Reading Improvement Plan saved for ${student.firstName} ${student.lastName}.`
    });
    onClose();
  };

  return (
    <Card className="bg-zinc-900 border border-white/10 w-full rounded-xl overflow-hidden shadow-2xl relative">
      
      {/* Dynamic Laser scanner effect */}
      <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse" />

      {/* Header bar */}
      <CardHeader className="bg-zinc-950/80 border-b border-white/5 p-6 flex flex-row items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Badge className="bg-amber-500/10 border-amber-500/20 text-amber-400 font-mono text-[9px] uppercase tracking-widest">
              State SB 216 Mandated Blueprint
            </Badge>
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
          </div>
          <CardTitle className="text-lg font-black text-white mt-1 uppercase tracking-wide">
            Student Reading Improvement Plan (SRIP) Architect
          </CardTitle>
          <CardDescription className="text-zinc-500 text-xs mt-0.5">
            Calibrate adaptive intervention targets for <strong className="text-zinc-300 font-bold">{student.firstName} {student.lastName}</strong> ({student.sisId})
          </CardDescription>
        </div>
        <Button 
          variant="ghost" 
          onClick={onClose} 
          className="text-zinc-500 hover:text-white hover:bg-white/5 rounded-full h-8 w-8 p-0"
        >
          <X className="w-5 h-5" />
        </Button>
      </CardHeader>

      <CardContent className="p-6 space-y-6 max-h-[75vh] overflow-y-auto bg-zinc-950/20">
        
        {/* State-Level Mandate Notification Banner */}
        <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-lg flex gap-3.5">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="text-xs text-zinc-400 leading-relaxed">
            <strong className="text-amber-400 font-bold block uppercase text-[10px] tracking-wider mb-0.5">Mobile County Board of Education SB 216 Compliance Requirement</strong>
            This plan triggers a weekly deficit-scaffold queue. The teacher must confirm parent notification and log periodic progress checks. Expired plans result in a state compliance flag.
          </div>
        </div>

        {/* Workspace Form split layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Left: Intervention Calibration */}
          <div className="space-y-4">
            <h3 className="text-xs font-black text-zinc-400 uppercase tracking-widest font-mono border-b border-white/5 pb-2">Intervention Configuration</h3>
            
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase text-zinc-500 tracking-wider">Approved Intervention Program</label>
              <Select value={interventionProgram} onValueChange={setInterventionProgram}>
                <SelectTrigger className="bg-black/40 border-white/10 text-zinc-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 border-white/10 text-zinc-300">
                  <SelectItem value="Orton-Gillingham">Orton-Gillingham (Multisensory)</SelectItem>
                  <SelectItem value="SPIRE">S.P.I.R.E. Reading</SelectItem>
                  <SelectItem value="Brainspring">Brainspring Phonics Mastery</SelectItem>
                  <SelectItem value="ARI">Alabama Reading Initiative (ARI) decodables</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase text-zinc-500 tracking-wider">Frequency & Duration</label>
              <Select value={frequency} onValueChange={setFrequency}>
                <SelectTrigger className="bg-black/40 border-white/10 text-zinc-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 border-white/10 text-zinc-300">
                  <SelectItem value="Daily (30 Minutes)">Daily (30 Minutes)</SelectItem>
                  <SelectItem value="3x Weekly (45 Minutes)">3x Weekly (45 Minutes)</SelectItem>
                  <SelectItem value="2x Weekly (60 Minutes)">2x Weekly (60 Minutes)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Parent Notification Checkbox toggles */}
            <div className="bg-black/30 border border-white/5 p-4 rounded-lg space-y-3">
              <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest block font-mono">Parent Communications Sync</span>
              <div 
                onClick={() => setParentNotified(!parentNotified)}
                className="flex items-center justify-between cursor-pointer group"
              >
                <div className="text-xs">
                  <span className="text-zinc-300 font-bold block">Parent/Guardian Certified</span>
                  <span className="text-zinc-500 text-[10px]">Official SB 216 notification signed & synced.</span>
                </div>
                <div className={`h-5 w-5 rounded border flex items-center justify-center transition-all ${
                  parentNotified 
                    ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-400" 
                    : "border-zinc-700 bg-black/40 group-hover:border-zinc-500"
                }`}>
                  {parentNotified && <Check className="w-3.5 h-3.5" />}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Gaps and Notes */}
          <div className="space-y-4">
            <h3 className="text-xs font-black text-zinc-400 uppercase tracking-widest font-mono border-b border-white/5 pb-2">ALA Diagnostic Target Deficits</h3>
            
            {/* Deficit Areas Grid */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest block font-mono">Identified Gaps</span>
              <div className="flex flex-wrap gap-2 pt-1">
                {student.deficits.map((gap, i) => (
                  <Badge key={i} className="bg-rose-500/15 border border-rose-500/20 text-rose-400 text-xs px-2.5 py-1">
                    {gap}
                  </Badge>
                ))}
                <Button variant="outline" size="sm" className="border-dashed border-zinc-700 bg-transparent text-zinc-500 hover:text-zinc-300 hover:border-zinc-500 py-0.5 px-2 text-[10px] h-6">
                  <Plus className="w-3 h-3 mr-1" /> Add Gap
                </Button>
              </div>
            </div>

            <div className="space-y-1.5 pt-2">
              <label className="text-[10px] font-black uppercase text-zinc-500 tracking-wider">Operational Progress Notes</label>
              <Textarea 
                value={progressNotes}
                onChange={(e) => setProgressNotes(e.target.value)}
                className="min-h-[110px] bg-black/40 border-white/10 text-zinc-300 text-xs leading-relaxed"
              />
            </div>
          </div>

        </div>

        <hr className="border-white/5" />

        {/* Closed-loop materials auto-piloted quickview */}
        <div className="space-y-3">
          <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest block font-mono">INTELLIGENT AUTO-DISPATCH QUEUE</span>
          <div className="bg-zinc-950/60 border border-white/5 rounded-lg p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
                <BookOpen className="w-5 h-5" />
              </div>
              <div className="text-xs">
                <span className="text-zinc-300 font-bold block">Deficit-Scaffold Lesson Module</span>
                <span className="text-zinc-500 text-[10px]">Autopopulating decodables at exactly {student.lexileLevel}L in Spanish.</span>
              </div>
            </div>
            <Badge className="bg-cyan-500/15 border-cyan-500/20 text-cyan-400 text-[9px] uppercase tracking-widest py-1">READY TO DEPLOY</Badge>
          </div>
        </div>

      </CardContent>

      {/* Footer bar actions */}
      <div className="bg-zinc-950/80 border-t border-white/5 p-4 flex justify-between">
        <Button variant="ghost" onClick={onClose} className="text-zinc-500 hover:text-white hover:bg-white/5 text-xs font-bold px-5">
          Cancel Setup
        </Button>
        <Button 
          onClick={handleSavePlan}
          disabled={isSaving}
          className="bg-amber-500 hover:bg-amber-600 text-zinc-950 font-bold text-xs px-6 py-5 shadow-[0_0_15px_rgba(245,158,11,0.15)] flex items-center gap-2"
        >
          {isSaving ? (
            <>
              <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, ease: "linear", duration: 1 }} className="h-4 w-4 border-2 border-zinc-950 border-t-transparent rounded-full" />
              <span>SAVING PLAN SECURES COMPLIANCE...</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4 text-zinc-950" />
              <span>CERTIFY COMPLIANCE PLAN</span>
            </>
          )}
        </Button>
      </div>

    </Card>
  );
}
export const readingPlanArchitect = ReadingPlanArchitect;
