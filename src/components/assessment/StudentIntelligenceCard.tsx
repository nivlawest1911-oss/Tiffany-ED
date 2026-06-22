"use client";

import { motion } from 'framer-motion';
import { 
  Target, TrendingUp, TrendingDown, Calendar, 
  BookOpen, FileText, Settings, HeartPulse, GraduationCap, AlertCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, 
  ResponsiveContainer 
} from 'recharts';

interface StudentProps {
  student: {
    id: string;
    firstName: string;
    lastName: string;
    sisId: string;
    gradeLevel: string;
    lexileLevel: number;
    lexileTrend: string;
    riskLevel: string;
    interventionTier: string;
    ellStatus: string;
    dyslexiaFlag: boolean;
    lastScreenerDate: string;
    materialCount: number;
    deficits: string[];
  };
  onArchitectPlan: () => void;
}

export function StudentIntelligenceCard({ student, onArchitectPlan }: StudentProps) {
  // Construct small radar score data for student deficit areas
  const studentRadarData = [
    { subject: 'PA', score: student.deficits.includes('Phonemic Awareness') ? 35 : 75 },
    { subject: 'PH', score: student.deficits.includes('Phonics') ? 40 : 80 },
    { subject: 'FL', score: student.deficits.includes('Fluency') ? 30 : 85 },
    { subject: 'VO', score: student.deficits.includes('Vocabulary') ? 45 : 78 },
    { subject: 'CO', score: student.deficits.includes('Comprehension') ? 25 : 82 },
    { subject: 'WR', score: student.deficits.includes('Written Expression') ? 50 : 75 },
    { subject: 'LC', score: 70 }
  ];

  return (
    <Card className="bg-zinc-950/40 border border-white/5 backdrop-blur-xl relative overflow-hidden">
      
      {/* Risk background pulse for aesthetic */}
      <div className={cn(
        "absolute -top-20 -right-20 w-44 h-44 rounded-full blur-[60px] pointer-events-none opacity-20",
        student.riskLevel === 'at-risk' && "bg-rose-500",
        student.riskLevel === 'some-risk' && "bg-amber-500",
        student.riskLevel === 'low-risk' && "bg-emerald-500"
      )} />

      <CardHeader className="border-b border-white/5 pb-4">
        <CardTitle className="text-sm font-bold uppercase text-zinc-300 tracking-wider flex items-center justify-between">
          <span>Student Diagnostic File</span>
          <Badge className="bg-zinc-800 border-white/5 text-zinc-400 font-mono text-[9px]">Grade {student.gradeLevel}</Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-5 space-y-4">
        
        {/* Basic Meta Details */}
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-lg bg-zinc-900 border border-white/5 flex items-center justify-center font-mono font-black text-zinc-400 text-lg uppercase shadow-inner">
            {student.firstName[0]}{student.lastName[0]}
          </div>
          <div>
            <h3 className="text-sm font-black text-white">{student.lastName}, {student.firstName}</h3>
            <span className="text-[10px] text-zinc-500 font-mono">SIS ID: {student.sisId}</span>
          </div>
        </div>

        {/* Diagnostic Badges */}
        <div className="flex flex-wrap gap-2 pt-1">
          <Badge className={cn(
            "font-mono text-[9px] uppercase",
            student.riskLevel === 'at-risk' && "bg-rose-500/10 border-rose-500/20 text-rose-400",
            student.riskLevel === 'some-risk' && "bg-amber-500/10 border-amber-500/20 text-amber-400",
            student.riskLevel === 'low-risk' && "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
          )}>
            {student.riskLevel}
          </Badge>
          
          {student.riskLevel === 'at-risk' && (
            <Badge className="bg-amber-500/10 border-amber-500/20 text-amber-400 text-[9px] font-mono">
              {student.interventionTier} Active
            </Badge>
          )}

          {student.ellStatus === 'Active' && (
            <Badge className="bg-cyan-500/10 border-cyan-500/20 text-cyan-400 text-[9px] font-mono">MLL/ELL SUPPORT</Badge>
          )}

          {student.dyslexiaFlag && (
            <Badge className="bg-violet-500/10 border-violet-500/20 text-violet-400 text-[9px] font-mono">DYSLEXIA RISK</Badge>
          )}
        </div>

        <hr className="border-white/5" />

        {/* Lexile tracking metric */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest block font-mono">Estimated Lexile</span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <Target className="w-4 h-4 text-cyan-400" />
              <span className="text-sm font-black text-white">{student.lexileLevel}L</span>
              {student.lexileTrend === 'up' && <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />}
              {student.lexileTrend === 'down' && <TrendingDown className="w-3.5 h-3.5 text-rose-500" />}
            </div>
          </div>
          <div className="space-y-1">
            <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest block font-mono">Last Screener</span>
            <div className="flex items-center gap-1.5 mt-0.5 text-xs text-zinc-400">
              <Calendar className="w-3.5 h-3.5 text-zinc-500" />
              <span>{student.lastScreenerDate}</span>
            </div>
          </div>
        </div>

        {/* Small aggregated Radar score */}
        <div className="h-[140px] w-full mt-2 flex justify-center bg-black/20 border border-white/5 rounded-lg p-2 relative">
          <span className="absolute top-1.5 left-2 text-[8px] font-mono font-black text-zinc-500 uppercase tracking-widest">ALA domain performance</span>
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="55%" outerRadius="75%" data={studentRadarData}>
              <PolarGrid stroke="#27272a" />
              <PolarAngleAxis dataKey="subject" stroke="#71717a" fontSize={8} />
              <Radar name="Student" dataKey="score" stroke="#22d3ee" fill="#22d3ee" fillOpacity={0.15} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Primary deficit gaps list */}
        {student.deficits?.length > 0 && (
          <div className="space-y-1.5">
            <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest block font-mono">PRIMARY DEFICIT SECTORS</span>
            <div className="flex flex-wrap gap-1.5">
              {student.deficits.map((deficit, i) => (
                <div key={i} className="flex items-center gap-1 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-[10px] font-mono px-2 py-0.5 rounded uppercase">
                  <AlertCircle className="w-3 h-3" />
                  <span>{deficit}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <hr className="border-white/5" />

        {/* Action Toggles */}
        <div className="flex flex-col gap-2 pt-1">
          {student.riskLevel === 'at-risk' ? (
            <Button 
              onClick={onArchitectPlan}
              className="w-full bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 font-bold text-xs py-5"
            >
              <FileText className="w-4 h-4 mr-2" /> Architect SB 216 Plan (SRIP)
            </Button>
          ) : (
            <Button 
              disabled
              className="w-full bg-zinc-900 border border-zinc-800 text-zinc-600 text-xs py-5"
            >
              <HeartPulse className="w-4 h-4 mr-2" /> Tier-1 Plan Compliant
            </Button>
          )}

          <Button 
            onClick={() => window.location.href = `/generator/differentiation?student=${student.id}`}
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-zinc-950 font-bold text-xs py-5"
          >
            <GraduationCap className="w-4 h-4 mr-2" /> Level Differentiated Materials
          </Button>
        </div>

      </CardContent>
    </Card>
  );
}
export const studentIntelligenceCard = StudentIntelligenceCard;
