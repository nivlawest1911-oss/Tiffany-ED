"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Layers, Upload, FileSpreadsheet, Sparkles, Brain, CheckCircle2, 
  Search, ShieldAlert, GraduationCap, ArrowUpRight, TrendingUp, 
  TrendingDown, RefreshCw, AlertCircle, ChevronRight, Zap, Target,
  FileCheck, Calendar, BookOpen, Users, BarChart3, AlertTriangle, ShieldCheck
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, 
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend 
} from 'recharts';
import { StudentIntelligenceCard } from './StudentIntelligenceCard';
import { ReadingPlanArchitect } from './ReadingPlanArchitect';

// Preloaded mock data for rich presentation
const INITIAL_STUDENT_DATA = [
  { id: "st-01", firstName: "Isaiah", lastName: "Vance", sisId: "SIS-8201", gradeLevel: "3", lexileLevel: 450, lexileTrend: "up", riskLevel: "at-risk", interventionTier: "Tier 3", ellStatus: "None", dyslexiaFlag: true, lastScreenerDate: "2026-05-15", materialCount: 4, deficits: ["Phonics", "Fluency"] },
  { id: "st-02", firstName: "Maria", lastName: "Rodriguez", sisId: "SIS-4512", gradeLevel: "3", lexileLevel: 380, lexileTrend: "down", riskLevel: "at-risk", interventionTier: "Tier 3", ellStatus: "Active", dyslexiaFlag: false, lastScreenerDate: "2026-05-14", materialCount: 6, deficits: ["Vocabulary", "Comprehension"] },
  { id: "st-03", firstName: "Chloe", lastName: "Henderson", sisId: "SIS-9122", gradeLevel: "3", lexileLevel: 510, lexileTrend: "up", riskLevel: "some-risk", interventionTier: "Tier 2", ellStatus: "None", dyslexiaFlag: false, lastScreenerDate: "2026-05-15", materialCount: 2, deficits: ["Oral Accuracy"] },
  { id: "st-04", firstName: "Jackson", lastName: "Miller", sisId: "SIS-1022", gradeLevel: "3", lexileLevel: 780, lexileTrend: "flat", riskLevel: "low-risk", interventionTier: "Tier 1", ellStatus: "None", dyslexiaFlag: false, lastScreenerDate: "2026-05-10", materialCount: 1, deficits: [] },
  { id: "st-05", firstName: "Devonte", lastName: "Washington", sisId: "SIS-3482", gradeLevel: "3", lexileLevel: 490, lexileTrend: "up", riskLevel: "some-risk", interventionTier: "Tier 2", ellStatus: "None", dyslexiaFlag: true, lastScreenerDate: "2026-05-15", materialCount: 3, deficits: ["Phonics"] }
];

const COHORT_RADAR_DATA = [
  { subject: 'Phonemic Awareness', benchmark: 85, Isaiah: 40, Maria: 30, Devonte: 55 },
  { subject: 'Phonics (Decoding)', benchmark: 80, Isaiah: 35, Maria: 40, Devonte: 45 },
  { subject: 'Fluency', benchmark: 85, Isaiah: 30, Maria: 45, Devonte: 60 },
  { subject: 'Vocabulary', benchmark: 75, Isaiah: 60, Maria: 25, Devonte: 70 },
  { subject: 'Comprehension', benchmark: 80, Isaiah: 55, Maria: 20, Devonte: 65 },
  { subject: 'Written Expression', benchmark: 75, Isaiah: 50, Maria: 35, Devonte: 50 },
  { subject: 'Listening Comp', benchmark: 80, Isaiah: 65, Maria: 50, Devonte: 75 }
];

const MOCK_CSV_PREVIEW = `student_id,name,grade,composite,cls,orf,vocab,comp
SIS-8201,Isaiah Vance,3,410,35,30,60,55
SIS-4512,Maria Rodriguez,3,340,40,45,25,20
SIS-9122,Chloe Henderson,3,510,55,60,50,45
SIS-1022,Jackson Miller,3,780,85,90,75,80
SIS-3482,Devonte Washington,3,460,45,50,60,55`;

export function ScreenerCommand() {
  const [platform, setPlatform] = useState<string>("mCLASS");
  const [windowPeriod, setWindowPeriod] = useState<string>("MOY");
  const [csvText, setCsvText] = useState(MOCK_CSV_PREVIEW);
  
  // Roster States
  const [students, setStudents] = useState(INITIAL_STUDENT_DATA);
  const [searchQuery, setSearchQuery] = useState("");
  const [riskFilter, setRiskFilter] = useState("all");
  
  // Selection
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [showPlanArchitect, setShowPlanArchitect] = useState(false);
  
  // UI actions
  const [isImporting, setIsImporting] = useState(false);
  const [isIntervening, setIsIntervening] = useState(false);
  const [activeTab, setActiveTab] = useState("roster");

  // Load demo CSV
  const handleImport = async () => {
    setIsImporting(true);
    await new Promise(r => setTimeout(r, 1500));
    
    // Simulate successful import mapping
    toast.success("Ingestion handshake complete!", {
      description: "Added 5 student profiles to live Mobile County database."
    });
    setStudents(INITIAL_STUDENT_DATA);
    setIsImporting(false);
    setActiveTab("roster");
  };

  // Trigger bulk intervention
  const handleBulkIntervention = async () => {
    setIsIntervening(true);
    await new Promise(r => setTimeout(r, 2000));
    setIsIntervening(false);
    toast.success("Cohort Auto-Intervention successful!", {
      description: "Generated 3 premium decodable reading bundles matching student deficits."
    });
  };

  const filteredStudents = students.filter(student => {
    const matchesSearch = `${student.firstName} ${student.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) || student.sisId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRisk = riskFilter === "all" ? true : student.riskLevel === riskFilter;
    return matchesSearch && matchesRisk;
  });

  return (
    <div className="w-full min-h-screen bg-[#0a0a0f] text-zinc-100 p-6 relative overflow-hidden font-sans">
      
      {/* Background patterns */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute -top-40 right-40 w-96 h-96 bg-cyan-500/5 rounded-full blur-[120px]" />
        <div className="absolute top-80 -left-20 w-[450px] h-[450px] bg-amber-500/5 rounded-full blur-[150px]" />
        <div className="w-full h-full bg-[linear-gradient(rgba(255,255,255,0.005)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.005)_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="max-w-[1600px] mx-auto relative z-10 space-y-6">
        
        {/* Superior Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-white/5 pb-6">
          <div>
            <div className="flex items-center gap-3">
              <Badge className="bg-cyan-500/10 border-cyan-500/20 text-cyan-400 font-mono tracking-widest uppercase py-1 text-[10px]">
                Operations Console
              </Badge>
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-[10px] text-zinc-500 font-mono tracking-tighter">NODE: ASSESSMENT_COMMAND_V3</span>
            </div>
            <h1 className="text-3xl font-black tracking-tight text-white mt-1">
              Assessment Ingestion & <span className="bg-gradient-to-r from-cyan-400 via-teal-200 to-amber-300 bg-clip-text text-transparent">Auto-Intervention Console</span>
            </h1>
            <p className="text-zinc-400 text-sm mt-1 max-w-2xl">
              Closed-loop diagnostic ecosystem. Ingest platform screeners, analyze Mobile County cohort deficits automatically, and distribute custom decodables linked to active Reading Plans.
            </p>
          </div>
        </div>

        {/* Dash Summary Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-zinc-900/40 border-white/5 p-4 flex items-center justify-between">
            <div>
              <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest block">COHORT ENROLLMENT</span>
              <span className="text-2xl font-black text-white block mt-1">32 Students</span>
              <span className="text-[9px] font-mono text-zinc-500">MCPSS Dentone Magnet Campus</span>
            </div>
            <Users className="w-8 h-8 text-cyan-500/50" />
          </Card>
          <Card className="bg-zinc-900/40 border-white/5 p-4 flex items-center justify-between">
            <div>
              <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest block">AT-RISK DEFICITS</span>
              <span className="text-2xl font-black text-rose-500 block mt-1">42% (13 students)</span>
              <span className="text-[9px] font-mono text-rose-400/70">Requires SB 216 SRIP Monitoring</span>
            </div>
            <AlertTriangle className="w-8 h-8 text-rose-500/50" />
          </Card>
          <Card className="bg-zinc-900/40 border-white/5 p-4 flex items-center justify-between">
            <div>
              <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest block">ACTIVE INTERVENTIONS</span>
              <span className="text-2xl font-black text-amber-400 block mt-1">9 Plans Active</span>
              <span className="text-[9px] font-mono text-amber-300/70">Decodables dispatched weekly</span>
            </div>
            <BookOpen className="w-8 h-8 text-amber-400/50" />
          </Card>
          <Card className="bg-zinc-900/40 border-white/5 p-4 flex items-center justify-between">
            <div>
              <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest block">COGNITIVE COMPLIANCE</span>
              <span className="text-2xl font-black text-emerald-400 block mt-1">100% Verified</span>
              <span className="text-[9px] font-mono text-emerald-400/70">Science of Reading Compliant</span>
            </div>
            <ShieldCheck className="w-8 h-8 text-emerald-500/50" />
          </Card>
        </div>

        {/* Command Workspace Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="bg-zinc-900/60 border border-white/5 p-1 rounded-lg w-full flex justify-between">
            <TabsTrigger value="roster" className="flex-1 text-xs py-3 data-[state=active]:bg-zinc-800 data-[state=active]:text-white font-black tracking-wider uppercase">
              📋 Cohort Roster & Lexile Map
            </TabsTrigger>
            <TabsTrigger value="import" className="flex-1 text-xs py-3 data-[state=active]:bg-zinc-800 data-[state=active]:text-white font-black tracking-wider uppercase">
              📥 Platform Screener Importer
            </TabsTrigger>
            <TabsTrigger value="radar" className="flex-1 text-xs py-3 data-[state=active]:bg-zinc-800 data-[state=active]:text-white font-black tracking-wider uppercase">
              📊 ALA 7-Skill Cohort Analysis
            </TabsTrigger>
            <TabsTrigger value="autoPilot" className="flex-1 text-xs py-3 data-[state=active]:bg-zinc-800 data-[state=active]:text-white font-black tracking-wider uppercase">
              🔥 Auto-Intervention Dispatch
            </TabsTrigger>
          </TabsList>

          {/* Tab 1: Cohort Roster */}
          <TabsContent value="roster" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Left Side: Student List table (2 Cols equivalent) */}
              <div className="lg:col-span-2 space-y-4">
                <Card className="bg-zinc-950/40 border-white/5 backdrop-blur-xl">
                  <CardHeader className="border-b border-white/5 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <CardTitle className="text-sm font-bold uppercase text-zinc-300">Roster Intelligence</CardTitle>
                      <CardDescription className="text-xs text-zinc-500 mt-1">List of Mobile County students, diagnostic risks, and linked reading improvement plans.</CardDescription>
                    </div>
                    
                    <div className="flex gap-2">
                      <div className="relative">
                        <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-3" />
                        <Input 
                          placeholder="Search SIS ID, name..." 
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="bg-black/40 border-white/10 text-xs text-zinc-300 pl-9 w-48 h-9"
                        />
                      </div>
                      <Select value={riskFilter} onValueChange={setRiskFilter}>
                        <SelectTrigger className="bg-black/40 border-white/10 text-xs text-zinc-300 w-36 h-9">
                          <SelectValue placeholder="Filter Risk" />
                        </SelectTrigger>
                        <SelectContent className="bg-zinc-900 border-white/10 text-zinc-300 text-xs">
                          <SelectItem value="all">All Risks</SelectItem>
                          <SelectItem value="low-risk">Low Risk</SelectItem>
                          <SelectItem value="some-risk">Some Risk</SelectItem>
                          <SelectItem value="at-risk">At Risk</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="border-b border-white/5 bg-zinc-950/30 text-[10px] font-black text-zinc-500 uppercase tracking-widest font-mono">
                            <th className="p-4">Student</th>
                            <th className="p-4">SIS ID</th>
                            <th className="p-4">Lexile Level</th>
                            <th className="p-4">ALA Risk Tier</th>
                            <th className="p-4">SRIP Status</th>
                            <th className="p-4 text-right">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 text-xs text-zinc-300 font-medium">
                          {filteredStudents.map(student => (
                            <tr 
                              key={student.id} 
                              onClick={() => setSelectedStudent(student)}
                              className={cn(
                                "hover:bg-white/5 transition-colors cursor-pointer",
                                selectedStudent?.id === student.id && "bg-cyan-500/5 text-white"
                              )}
                            >
                              <td className="p-4">
                                <div className="font-bold text-zinc-200">{student.lastName}, {student.firstName}</div>
                                <span className="text-[10px] text-zinc-500">Grade {student.gradeLevel}</span>
                              </td>
                              <td className="p-4 font-mono text-zinc-500">{student.sisId}</td>
                              <td className="p-4">
                                <div className="flex items-center gap-2">
                                  <Target className="w-3.5 h-3.5 text-cyan-400" />
                                  <span className="font-bold">{student.lexileLevel}L</span>
                                  {student.lexileTrend === 'up' && <TrendingUp className="w-3 h-3 text-emerald-400" />}
                                  {student.lexileTrend === 'down' && <TrendingDown className="w-3 h-3 text-rose-500" />}
                                </div>
                              </td>
                              <td className="p-4">
                                <Badge className={cn(
                                  "font-mono text-[9px] uppercase",
                                  student.riskLevel === 'at-risk' && "bg-rose-500/10 border-rose-500/20 text-rose-400",
                                  student.riskLevel === 'some-risk' && "bg-amber-500/10 border-amber-500/20 text-amber-400",
                                  student.riskLevel === 'low-risk' && "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                                )}>
                                  {student.riskLevel}
                                </Badge>
                              </td>
                              <td className="p-4 font-mono">
                                {student.riskLevel === 'at-risk' ? (
                                  <Badge className="bg-amber-500/10 border-amber-500/20 text-amber-400 text-[9px] font-mono">
                                    {student.interventionTier} Active
                                  </Badge>
                                ) : (
                                  <span className="text-zinc-600 font-mono">-</span>
                                )}
                              </td>
                              <td className="p-4 text-right">
                                <Button variant="ghost" size="sm" className="text-cyan-400 hover:text-white hover:bg-cyan-500/10 p-2">
                                  <ChevronRight className="w-4 h-4" />
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Side: Selected Student Intelligence Display (1 Col) */}
              <div className="lg:col-span-1 space-y-6">
                {selectedStudent ? (
                  <div className="space-y-6">
                    <StudentIntelligenceCard 
                      student={selectedStudent} 
                      onArchitectPlan={() => setShowPlanArchitect(true)}
                    />
                    
                    {/* Active Plan Checklist Quickview */}
                    {selectedStudent.riskLevel === 'at-risk' && (
                      <Card className="bg-zinc-950/40 border-white/5 p-4 backdrop-blur-xl space-y-3">
                        <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                          <FileCheck className="w-3.5 h-3.5 text-amber-400" /> Active Plan Checklist
                        </h4>
                        <div className="space-y-2 text-xs">
                          <div className="flex items-center gap-2 text-emerald-400">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                            <span>Diagnostic Screener Completed</span>
                          </div>
                          <div className="flex items-center gap-2 text-emerald-400">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                            <span>Reading Plan (SRIP) Drafted</span>
                          </div>
                          <div className="flex items-center gap-2 text-zinc-400">
                            <span className="h-4 w-4 rounded-full border border-zinc-700 flex items-center justify-center text-[9px] font-mono shrink-0">3</span>
                            <span>Differentiated Decodable Pushed</span>
                          </div>
                          <div className="flex items-center gap-2 text-zinc-500">
                            <span className="h-4 w-4 rounded-full border border-zinc-800 flex items-center justify-center text-[9px] font-mono shrink-0">4</span>
                            <span>Parent Signature Ingestion</span>
                          </div>
                        </div>
                      </Card>
                    )}
                  </div>
                ) : (
                  <Card className="bg-zinc-900/20 border border-white/5 border-dashed p-8 text-center flex flex-col justify-center items-center min-h-[300px] text-zinc-500 space-y-2">
                    <Target className="w-8 h-8 text-zinc-600 animate-pulse" />
                    <h4 className="text-xs font-bold text-zinc-400 uppercase">No Selection Active</h4>
                    <p className="text-[10px] text-zinc-600 leading-relaxed max-w-[200px]">
                      Select a student in the roster list to render deep academic and risk intelligence files.
                    </p>
                  </Card>
                )}
              </div>

            </div>
          </TabsContent>

          {/* Tab 2: Screener Importer */}
          <TabsContent value="import" className="mt-6">
            <Card className="bg-zinc-950/40 border-white/5 backdrop-blur-xl p-6 space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-4">
                <div>
                  <h3 className="text-sm font-bold uppercase text-zinc-300">Diagnostic Data Ingestion</h3>
                  <p className="text-xs text-zinc-500 mt-1">Upload CSV data directly from your state-approved diagnostic platforms.</p>
                </div>
                
                {/* Configuration Toggles */}
                <div className="flex gap-4">
                  <div className="space-y-1">
                    <label className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Diagnostic Platform</label>
                    <Select value={platform} onValueChange={setPlatform}>
                      <SelectTrigger className="bg-black/40 border-white/10 text-xs text-zinc-300 w-32 h-8">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-900 border-white/10 text-zinc-300">
                        <SelectItem value="mCLASS">mCLASS (ARI)</SelectItem>
                        <SelectItem value="i-Ready">i-Ready</SelectItem>
                        <SelectItem value="STAR">STAR Reading</SelectItem>
                        <SelectItem value="aimswebPlus">aimswebPlus</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Screener Window</label>
                    <Select value={windowPeriod} onValueChange={setWindowPeriod}>
                      <SelectTrigger className="bg-black/40 border-white/10 text-xs text-zinc-300 w-32 h-8">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-900 border-white/10 text-zinc-300">
                        <SelectItem value="BOY">Beginning (BOY)</SelectItem>
                        <SelectItem value="MOY">Middle (MOY)</SelectItem>
                        <SelectItem value="EOY">End (EOY)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Importer Grid (Drag/Drop area + raw text input) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="border border-dashed border-white/10 bg-zinc-900/10 rounded-lg p-10 text-center flex flex-col justify-center items-center min-h-[220px] space-y-3 hover:bg-white/5 hover:border-cyan-500/20 cursor-pointer transition-all duration-300">
                    <Upload className="w-8 h-8 text-cyan-400" />
                    <div>
                      <h4 className="text-xs font-bold text-zinc-300 uppercase">Drag & Drop Screener Export File</h4>
                      <p className="text-[10px] text-zinc-500 mt-1 max-w-[280px] mx-auto">Supports raw classroom exports (.csv, .xlsx, .txt) from your district AIM Portal.</p>
                    </div>
                  </div>

                  <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-lg flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />
                    <div className="text-xs text-zinc-400 leading-relaxed">
                      <strong className="text-amber-400 font-bold block mb-0.5">ALABAMA LITERACY ACT COMPLIANCE (SB 216)</strong>
                      Students showing a deficit on middle-of-year (MOY) screeners must receive an active Student Reading Plan (SRIP) within 15 school days.
                    </div>
                  </div>
                </div>

                {/* CSV text preview box */}
                <div className="space-y-2">
                  <label className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">CSV Raw Preview</label>
                  <Textarea 
                    value={csvText}
                    onChange={(e: any) => setCsvText(e.target.value)}
                    className="min-h-[200px] bg-black/40 border-white/10 text-xs text-zinc-300 font-mono resize-none"
                  />
                  <Button 
                    onClick={handleImport}
                    disabled={isImporting}
                    className="w-full bg-cyan-500 hover:bg-cyan-600 text-zinc-950 font-bold py-5 mt-2"
                  >
                    {isImporting ? "INGESTING & CLASSIFYING RECORDS..." : "INGEST & CALCULATE RISKS"}
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Tab 3: ALA Skill Cohort Analysis */}
          <TabsContent value="radar" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Radar Chart (2 Cols) */}
              <div className="lg:col-span-2">
                <Card className="bg-zinc-950/40 border-white/5 backdrop-blur-xl p-6 min-h-[450px] flex flex-col justify-between">
                  <div className="border-b border-white/5 pb-3">
                    <h3 className="text-sm font-bold uppercase text-zinc-300">ALA 7-Skill Cohort Deficit Analysis</h3>
                    <p className="text-xs text-zinc-500 mt-1">Aggregated proficiency scores across Mobile County Reading domains.</p>
                  </div>

                  <div className="h-[300px] w-full mt-4 flex justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={COHORT_RADAR_DATA}>
                        <PolarGrid stroke="#3f3f46" />
                        <PolarAngleAxis dataKey="subject" stroke="#a1a1aa" fontSize={10} />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#3f3f46" fontSize={8} />
                        <Radar name="Isaiah" dataKey="Isaiah" stroke="#38bdf8" fill="#38bdf8" fillOpacity={0.1} />
                        <Radar name="Maria" dataKey="Maria" stroke="#f43f5e" fill="#f43f5e" fillOpacity={0.1} />
                        <Radar name="Devonte" dataKey="Devonte" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.1} />
                        <Radar name="Benchmark" dataKey="benchmark" stroke="#10b981" fill="#10b981" fillOpacity={0.05} />
                        <Tooltip contentStyle={{ backgroundColor: '#18181b', borderColor: '#3f3f46', color: '#f4f4f5' }} />
                        <Legend wrapperStyle={{ fontSize: '10px', marginTop: '10px' }} />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </Card>
              </div>

              {/* Deficit breakdown list (1 Col) */}
              <div className="space-y-6">
                <Card className="bg-zinc-950/40 border-white/5 p-4 backdrop-blur-xl space-y-4">
                  <div className="border-b border-white/5 pb-2">
                    <h4 className="text-xs font-bold text-zinc-300 uppercase">Prioritized Gaps</h4>
                  </div>
                  <div className="space-y-3">
                    <div className="p-3 bg-rose-500/5 border border-rose-500/10 rounded flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-black text-rose-400 uppercase tracking-widest block font-mono">1. Phonics & Decoding</span>
                        <span className="text-xs text-zinc-300 font-bold mt-0.5 block">3 Students Underperforming</span>
                      </div>
                      <Badge className="bg-rose-500/20 text-rose-400 text-[9px]">CRITICAL</Badge>
                    </div>
                    <div className="p-3 bg-rose-500/5 border border-rose-500/10 rounded flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-black text-rose-400 uppercase tracking-widest block font-mono">2. Fluency</span>
                        <span className="text-xs text-zinc-300 font-bold mt-0.5 block">2 Students Underperforming</span>
                      </div>
                      <Badge className="bg-rose-500/20 text-rose-400 text-[9px]">CRITICAL</Badge>
                    </div>
                    <div className="p-3 bg-amber-500/5 border border-amber-500/10 rounded flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-black text-amber-400 uppercase tracking-widest block font-mono">3. Written Expression</span>
                        <span className="text-xs text-zinc-300 font-bold mt-0.5 block">1 Student Underperforming</span>
                      </div>
                      <Badge className="bg-amber-500/20 text-amber-400 text-[9px]">MODERATE</Badge>
                    </div>
                  </div>
                </Card>
              </div>

            </div>
          </TabsContent>

          {/* Tab 4: Auto-Intervention Dashboard */}
          <TabsContent value="autoPilot" className="mt-6">
            <Card className="bg-zinc-950/40 border-white/5 backdrop-blur-xl p-8 text-center space-y-6 max-w-3xl mx-auto flex flex-col justify-center items-center">
              <div className="h-16 w-16 bg-cyan-500/10 border border-cyan-500/20 rounded-full flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.15)] animate-pulse">
                <Brain className="w-8 h-8 text-cyan-400" />
              </div>
              
              <div className="space-y-2 max-w-lg">
                <h3 className="text-lg font-black tracking-wider text-white uppercase">Adaptive Auto-Intervention Dispatch</h3>
                <p className="text-zinc-500 text-xs leading-relaxed font-mono">
                  THE COMPETITIVE KILLER: Closed-Loop Diagnostics. EdIntel checks student profiles, scans active diagnostic deficit gaps, generates custom decodable passages from the Sovereign engine, constructs SB 216 plans, and syncs parent consent forms automatically.
                </p>
              </div>

              <div className="border border-white/5 rounded-lg p-5 w-full bg-black/30 grid grid-cols-3 gap-6 text-left font-mono">
                <div>
                  <span className="text-[8px] text-zinc-500 uppercase font-black tracking-widest block">TARGETING TARGETS</span>
                  <span className="text-base font-black text-rose-500 mt-1 block">3 Students Flagged</span>
                  <span className="text-[9px] text-zinc-500 font-medium mt-0.5 block">Isaiah, Maria, Devonte</span>
                </div>
                <div>
                  <span className="text-[8px] text-zinc-500 uppercase font-black tracking-widest block">DIFFERENTIATION LEV</span>
                  <span className="text-base font-black text-cyan-400 mt-1 block">3 Distinct Lexiles</span>
                  <span className="text-[9px] text-zinc-500 font-medium mt-0.5 block">380L, 450L, 490L</span>
                </div>
                <div>
                  <span className="text-[8px] text-zinc-500 uppercase font-black tracking-widest block">COMPLIANCE CODE</span>
                  <span className="text-base font-black text-amber-400 mt-1 block">ACOS Science of Reading</span>
                  <span className="text-[9px] text-zinc-500 font-medium mt-0.5 block">SB 216 Compliant SRIP</span>
                </div>
              </div>

              <Button 
                onClick={handleBulkIntervention}
                disabled={isIntervening}
                className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-zinc-950 font-bold py-6 px-10 relative overflow-hidden transition-all duration-300 shadow-[0_0_20px_rgba(6,182,212,0.15)]"
              >
                {isIntervening ? (
                  <div className="flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>SYNTHESIZING ADAPTIVES...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 animate-bounce" />
                    <span>ACTIVATE AUTO-INTERVENTIONS</span>
                  </div>
                )}
              </Button>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Modal: Reading Improvement Plan Architect */}
        <AnimatePresence>
          {showPlanArchitect && selectedStudent && (
            <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="max-w-4xl w-full h-[90vh] overflow-y-auto"
              >
                <ReadingPlanArchitect 
                  student={selectedStudent} 
                  onClose={() => setShowPlanArchitect(false)}
                />
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
