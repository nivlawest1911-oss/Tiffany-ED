"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart3, Globe, ShieldAlert, Sparkles, TrendingUp, Cpu, 
  HelpCircle, Info, RefreshCw, FileText, ArrowRight, Download,
  CheckCircle2, AlertTriangle, Play, BookOpen, Settings, School, Zap,
  X, Loader2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { toast } from 'sonner';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, 
  Legend, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar 
} from 'recharts';

// Preloaded mock district snapshots
const FUNDING_HISTORY_DATA = [
  { year: '2022', title1: 18500000, erate: 800000 },
  { year: '2023', title1: 19800000, erate: 950000 },
  { year: '2024', title1: 21200000, erate: 1100000 },
  { year: '2025', title1: 22800000, erate: 1150000 },
  { year: '2026', title1: 24500000, erate: 1200000 }
];

const ERATE_DONUT_DATA = [
  { name: 'Used Category 2 Budget', value: 450000, color: '#06b6d4' },
  { name: 'Unutilized Strategic Reserves', value: 750000, color: '#f59e0b' }
];

const ADOPTION_MATRIX = [
  { name: 'EdIntel Unified OS', category: 'Instructional Intelligence', adoptionPct: 88, activeUsers: 2450, trend: 'up' },
  { name: 'Schoology LMS', category: 'Learning Management', adoptionPct: 92, activeUsers: 4800, trend: 'up' },
  { name: 'Clever SSO', category: 'Identity Management', adoptionPct: 96, activeUsers: 5100, trend: 'flat' },
  { name: 'Diffit (Competing)', category: 'Scaffolding', adoptionPct: 15, activeUsers: 420, trend: 'down' }
];

const SCHOOL_PROFICIENCY_HEATMAP = [
  { school: 'Denton Magnet', ELA: 76, Math: 68, readiness: 4.8 },
  { school: 'Scarborough Model', ELA: 42, Math: 35, readiness: 2.2 },
  { school: 'Mobile Pathways', ELA: 38, Math: 29, readiness: 1.8 },
  { school: 'Semmes Elementary', ELA: 64, Math: 60, readiness: 3.9 },
  { school: 'Adelia Williams', ELA: 58, Math: 52, readiness: 3.5 }
];

const MOCK_AI_EXECUTIVE_BRIEF = `### EXECUTIVE INTELLIGENCE REPORT: MOBILE COUNTY V2026
**Prepared for the Board of Education | Strategic Security Division**

#### 1. VIRTUAL READINESS MATRIX
Mobile County Public Schools currently registers a **3.8 / 5.0 composite Virtual Readiness Index**. 
*   **Hardware Density**: Denton Magnet leads at 98% 1:1 Chromebook saturation. Critical infrastructure hardware deficits remain flagged at Scarborough and Mobile Pathways (under 40% active device availability).
*   **Professional Development (SB 216)**: ELA teacher alignment to Science of Reading (SOR) standards has reached **72% systemic saturation**.

#### 2. FEDERAL RESERVES & COOPERATIVE BUYPASS
*   **E-rate Category 2**: Of the **$1,200,000 Category 2 allocation**, only **$450,000 has been drawn down**. We project a **$750,000 unutilized reserve** that will expire unless E-rate Category 2 contracts are closed before the upcoming USAC cycle.
*   **Title I Trajectory**: Funding shows a **$24.5M net inflow**, a 7.4% year-over-year increase. We advise utilizing approved cooperative agreements (**Omnia/Sourcewell**) to bypass the standard 45-day local procurement cycle to route these funds to underperforming campuses.

#### 3. COHORT REMEDIATION ACTION ITEMS
Screener metrics show **critical systemic reading gaps** at Scarborough Model and Mobile Pathways. 
*   **Action Mandate**: Click 'Override Cohort Gaps' below to trigger the Sovereign Differentiation Engine. This will automatically level ELA curriculum decodables to the exact Lexile deficits for all affected 3rd-5th grade cohorts.`;

export function DistrictListeningDashboard() {
  const [activeSnapshot, setActiveSnapshot] = useState<any>(null);
  const [executiveBrief, setExecutiveBrief] = useState("");
  const [isLoadingBrief, setIsLoadingBrief] = useState(false);
  const [isDeployingDecodables, setIsDeployingDecodables] = useState(false);

  // Load snapshot values
  useEffect(() => {
    setActiveSnapshot({
      districtName: 'Mobile County Public Schools',
      compositeReadiness: 3.8,
      titleIRevenue: 24500000,
      erateCat2Budget: 1200000,
      erateCat2Used: 450000,
      enrollmentTotal: 52000,
      freeReducedPct: 68.5,
      elaProficiencyPct: 56.4,
      mathProficiencyPct: 48.2
    });
  }, []);

  // Simulates AI Executive Brief loading
  const handleCompileBrief = async () => {
    setIsLoadingBrief(true);
    setExecutiveBrief("");
    await new Promise(r => setTimeout(r, 2000));
    setExecutiveBrief(MOCK_AI_EXECUTIVE_BRIEF);
    setIsLoadingBrief(false);
    toast.success("AI Strategic Briefing compiled!", {
      description: "Analysis grounded in local Mobile County operational models."
    });
  };

  // Triggers macro batch generation
  const handleCohortOverride = async () => {
    setIsDeployingDecodables(true);
    await new Promise(r => setTimeout(r, 2500));
    setIsDeployingDecodables(false);
    toast.success("Systemic Gaps Overridden!", {
      description: "Dispatched 1,200 Lexile-aligned decodables to Scarborough and Mobile Pathways."
    });
  };

  return (
    <div className="w-full min-h-screen bg-[#0a0a0f] text-zinc-100 p-6 relative overflow-hidden font-sans">
      
      {/* Laser backgrounds */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px]" />
        <div className="absolute top-[60vh] -right-20 w-[450px] h-[450px] bg-amber-500/5 rounded-full blur-[150px]" />
        <div className="w-full h-full bg-[linear-gradient(rgba(255,255,255,0.005)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.005)_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="max-w-[1600px] mx-auto relative z-10 space-y-6">
        
        {/* Superior Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-white/5 pb-6">
          <div>
            <div className="flex items-center gap-3">
              <Badge className="bg-cyan-500/10 border-cyan-500/20 text-cyan-400 font-mono tracking-widest uppercase py-1 text-[10px]">
                District Administration
              </Badge>
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-[10px] text-zinc-500 font-mono tracking-tighter">NODE: DISTRICT_LISTENING_SYS</span>
            </div>
            <h1 className="text-3xl font-black tracking-tight text-white mt-1">
              District <span className="bg-gradient-to-r from-cyan-400 via-amber-200 to-yellow-300 bg-clip-text text-transparent">Listening Dashboard</span>
            </h1>
            <p className="text-zinc-400 text-sm mt-1 max-w-2xl">
              Board-level strategic dashboard. Monitor Virtual Readiness Index, track E-rate Category 2 and Title I funds, and analyze tool adoption ratios.
            </p>
          </div>
          
          <div className="mt-4 md:mt-0 flex gap-3">
            <Button 
              onClick={handleCompileBrief}
              disabled={isLoadingBrief}
              className="bg-zinc-900 border border-white/10 hover:bg-zinc-800 text-zinc-300 font-bold py-5 flex items-center gap-2"
            >
              {isLoadingBrief ? <RefreshCw className="w-4 h-4 animate-spin" /> : <FileText className="w-4 h-4 text-amber-400" />}
              <span>Compile Strategic AI Brief</span>
            </Button>

            <Button 
              onClick={handleCohortOverride}
              disabled={isDeployingDecodables}
              className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-zinc-950 font-bold py-5 px-6 flex items-center gap-2"
            >
              {isDeployingDecodables ? <RefreshCw className="w-4 h-4 animate-spin text-zinc-950" /> : <Zap className="w-4 h-4 text-zinc-950 animate-bounce" />}
              <span>Override Cohort Gaps</span>
            </Button>
          </div>
        </div>

        {/* Charts & Snapshot Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Panel: Virtual Readiness gauge + Donut (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Virtual Readiness Index */}
            <Card className="bg-zinc-950/40 border-white/5 backdrop-blur-xl p-5">
              <CardHeader className="p-0 pb-3 border-b border-white/5">
                <CardTitle className="text-xs font-bold uppercase tracking-widest text-zinc-400">Virtual Readiness composite</CardTitle>
              </CardHeader>
              <CardContent className="p-0 pt-6 text-center space-y-4">
                {activeSnapshot && (
                  <div className="relative w-40 h-24 mx-auto flex flex-col justify-end items-center">
                    {/* SVG Gauge */}
                    <svg className="w-full h-full absolute top-0 left-0" viewBox="0 0 100 50">
                      <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="#27272a" strokeWidth="8" />
                      <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="url(#cyanGoldGradient)" strokeWidth="8" strokeDasharray="125" strokeDashoffset={125 - (125 * (activeSnapshot.compositeReadiness / 5.0))} />
                      <defs>
                        <linearGradient id="cyanGoldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#ef4444" />
                          <stop offset="50%" stopColor="#f59e0b" />
                          <stop offset="100%" stopColor="#06b6d4" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <span className="text-3xl font-black text-white">{activeSnapshot.compositeReadiness}</span>
                    <span className="text-[10px] text-zinc-500 font-mono">OUT OF 5.0 INDEX</span>
                  </div>
                )}
                <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-mono border-t border-white/5 pt-4">
                  <div>
                    <span className="text-zinc-500 block">HARDWARE</span>
                    <strong className="text-white text-xs mt-0.5 block">4.2 / 5</strong>
                  </div>
                  <div>
                    <span className="text-zinc-500 block">TRAINING</span>
                    <strong className="text-white text-xs mt-0.5 block">3.6 / 5</strong>
                  </div>
                  <div>
                    <span className="text-zinc-500 block">LMS USAGE</span>
                    <strong className="text-white text-xs mt-0.5 block">4.0 / 5</strong>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* E-rate Cat 2 Budget Donut */}
            <Card className="bg-zinc-950/40 border-white/5 backdrop-blur-xl p-5">
              <CardHeader className="p-0 pb-3 border-b border-white/5">
                <CardTitle className="text-xs font-bold uppercase tracking-widest text-zinc-400">E-rate Category 2 Budget</CardTitle>
              </CardHeader>
              <CardContent className="p-0 pt-4 flex flex-col items-center">
                <div className="h-[180px] w-full flex justify-center items-center relative">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie 
                        data={ERATE_DONUT_DATA} 
                        cx="50%" 
                        cy="50%" 
                        innerRadius={50} 
                        outerRadius={70} 
                        paddingAngle={5} 
                        dataKey="value"
                      >
                        {ERATE_DONUT_DATA.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute flex flex-col items-center">
                    <span className="text-zinc-500 text-[8px] font-black uppercase">UNSPENT RESERVED</span>
                    <span className="text-base font-black text-amber-400">$750k</span>
                  </div>
                </div>
                <div className="w-full text-[10px] font-mono space-y-2 mt-2">
                  <div className="flex justify-between items-center text-cyan-400">
                    <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-cyan-400" /> Contracted spent:</span>
                    <span>$450,000</span>
                  </div>
                  <div className="flex justify-between items-center text-amber-400">
                    <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-amber-400" /> Expiring surplus:</span>
                    <span>$750,000</span>
                  </div>
                </div>
              </CardContent>
            </Card>

          </div>

          {/* Center Panel: Line History & heatmaps (8 Cols) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* AI Executive briefing Terminal */}
            <AnimatePresence>
              {(isLoadingBrief || executiveBrief) && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <Card className="bg-[#0c0c14] border border-cyan-500/20 shadow-[0_0_25px_rgba(6,182,212,0.05)] p-5 relative overflow-hidden">
                    <div className="absolute top-4 right-4 flex gap-2">
                      <Badge className="bg-cyan-500/15 text-cyan-400 border-cyan-500/20 text-[9px] uppercase tracking-widest font-mono">
                        Superintendent Brief
                      </Badge>
                      <Button variant="ghost" size="sm" onClick={() => { setExecutiveBrief(""); }} className="text-zinc-500 hover:text-white p-0 h-6 w-6">
                        <X className="w-4 h-4" />
                      </Button>
                    </div>

                    <CardHeader className="p-0 border-b border-white/5 pb-2.5 mb-4">
                      <CardTitle className="text-xs font-mono font-black text-cyan-400 flex items-center gap-2">
                        <Cpu className="w-4 h-4 text-cyan-400 animate-pulse" /> SYSTEM EXECUTIVE ANALYZER v2026
                      </CardTitle>
                    </CardHeader>
                    
                    <CardContent className="p-0">
                      {isLoadingBrief ? (
                        <div className="py-12 flex flex-col justify-center items-center gap-3">
                          <Loader2 className="w-6 h-6 text-cyan-400 animate-spin" />
                          <span className="text-xs font-mono text-zinc-500">AGGREGATING REGIONAL LEDGERS...</span>
                        </div>
                      ) : (
                        <div className="text-xs leading-relaxed text-zinc-300 font-mono whitespace-pre-line prose prose-invert prose-xs max-w-none pr-12">
                          {executiveBrief}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Title I Inflow Line Chart */}
              <Card className="bg-zinc-950/40 border-white/5 p-5">
                <CardHeader className="p-0 pb-3 border-b border-white/5 flex flex-row items-center justify-between">
                  <CardTitle className="text-xs font-bold uppercase tracking-widest text-zinc-400">Federal Funding Inflows</CardTitle>
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                </CardHeader>
                <CardContent className="p-0 pt-6">
                  <div className="h-[200px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={FUNDING_HISTORY_DATA}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                        <XAxis dataKey="year" stroke="#71717a" fontSize={9} />
                        <YAxis stroke="#71717a" fontSize={9} />
                        <Tooltip contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a' }} />
                        <Line type="monotone" dataKey="title1" stroke="#f59e0b" name="Title I Inflows" strokeWidth={2.5} dot={{ r: 4 }} />
                        <Line type="monotone" dataKey="erate" stroke="#06b6d4" name="E-rate Allocation" strokeWidth={2} dot={{ r: 4 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Heatmap/Grid of School Proficiencies */}
              <Card className="bg-zinc-950/40 border-white/5 p-5">
                <CardHeader className="p-0 pb-3 border-b border-white/5">
                  <CardTitle className="text-xs font-bold uppercase tracking-widest text-zinc-400">Campus Proficiency Matrix</CardTitle>
                </CardHeader>
                <CardContent className="p-0 pt-4">
                  <div className="space-y-3">
                    {SCHOOL_PROFICIENCY_HEATMAP.map((item, i) => (
                      <div key={i} className="flex items-center justify-between text-xs border-b border-white/5 pb-2.5 last:border-0 last:pb-0">
                        <div className="flex items-center gap-2.5">
                          <School className="w-4 h-4 text-zinc-500" />
                          <div>
                            <span className="text-zinc-200 font-bold block">{item.school}</span>
                            <span className="text-[9px] text-zinc-500 font-mono">Readiness: {item.readiness}/5</span>
                          </div>
                        </div>

                        <div className="flex gap-3 text-[10px] font-mono">
                          <div className="text-right">
                            <span className="text-zinc-500 block text-[8px]">ELA</span>
                            <strong className={cn(
                              "font-black text-xs",
                              item.ELA < 45 ? "text-rose-400" : item.ELA < 65 ? "text-amber-400" : "text-emerald-400"
                            )}>{item.ELA}%</strong>
                          </div>
                          <div className="text-right border-l border-white/5 pl-3">
                            <span className="text-zinc-500 block text-[8px]">MATH</span>
                            <strong className={cn(
                              "font-black text-xs",
                              item.Math < 40 ? "text-rose-400" : item.Math < 60 ? "text-amber-400" : "text-emerald-400"
                            )}>{item.Math}%</strong>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

            </div>

            {/* EdTech Adoption Matrix */}
            <Card className="bg-zinc-950/40 border-white/5 p-5">
              <CardHeader className="p-0 pb-3 border-b border-white/5">
                <CardTitle className="text-xs font-bold uppercase tracking-widest text-zinc-400">EdTech Adoption Matrix</CardTitle>
              </CardHeader>
              <CardContent className="p-0 pt-4">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="text-[9px] font-black text-zinc-500 uppercase tracking-widest font-mono border-b border-white/5 pb-2">
                        <th className="pb-3">Software Tool</th>
                        <th className="pb-3">Sector</th>
                        <th className="pb-3">Saturation</th>
                        <th className="pb-3">Active Users</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-zinc-300 font-medium">
                      {ADOPTION_MATRIX.map((tool, i) => (
                        <tr key={i} className="hover:bg-white/5 transition-colors">
                          <td className="py-3 font-bold text-zinc-200">{tool.name}</td>
                          <td className="py-3 text-zinc-500">{tool.category}</td>
                          <td className="py-3">
                            <div className="flex items-center gap-2">
                              <div className="w-24 h-1.5 bg-zinc-800 rounded-full overflow-hidden shrink-0">
                                <div className="h-full bg-cyan-500" style={{ width: `${tool.adoptionPct}%` }} />
                              </div>
                              <span className="font-mono font-bold">{tool.adoptionPct}%</span>
                            </div>
                          </td>
                          <td className="py-3 font-mono text-zinc-400">{tool.activeUsers.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

          </div>

        </div>

      </div>
    </div>
  );
}
export const districtListeningDashboard = DistrictListeningDashboard;
