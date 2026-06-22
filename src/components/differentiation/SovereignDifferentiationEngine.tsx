"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Layers, BookOpen, Brain, Sparkles, Download, FileText, 
  GraduationCap, Languages, Target, Zap, BarChart3, Globe, 
  Copy, Printer, ArrowRight, ChevronDown, Loader2, CheckCircle2, 
  Link, FileCheck, Share2, HelpCircle, FileDown, BookOpenCheck
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

// Sample mock data for smooth superintendents demo
const MOCK_GENERATED_DATA = {
  passage: "Photosynthesis is the beautiful biological process by which green plants, algae, and some bacteria convert light energy into chemical energy. Using sunlight, these organisms synthesize carbon dioxide and water into glucose (sugar) and oxygen. This conversion occurs primarily within cell organelles called chloroplasts, which house the pigment chlorophyll. Chlorophyll captures radiant solar energy and uses it to split water molecules into hydrogen and oxygen. The hydrogen binds with carbon absorbed from the atmosphere to form simple carbohydrates, while the oxygen is released as a vital byproduct. In Mobile County classrooms, this concept is central to fifth-grade science standards, providing students with a foundational understanding of ecosystems and the absolute necessity of plant life for global atmospheric regulation.",
  outputLexile: 820,
  wordCount: 124,
  fleschKincaid: 5.8,
  citations: ["National Science Foundation: Photosynthetic Cycles", "Alabama Course of Study Science Framework SC.5.8"],
  vocabulary: [
    { term: "Photosynthesis", definition: "The process by which plants make food using sunlight, water, and carbon dioxide.", exampleSentence: "Without photosynthesis, plants could not grow and produce oxygen.", cognate: "fotosíntesis", partOfSpeech: "noun", pronunciation: "pho-to-syn-the-sis", tier: 3 },
    { term: "Chloroplast", definition: "A tiny structure inside plant cells where photosynthesis takes place.", exampleSentence: "Chloroplasts contain chlorophyll which makes plants look green.", cognate: "cloroplasto", partOfSpeech: "noun", pronunciation: "chlo-ro-plast", tier: 3 },
    { term: "Synthesize", definition: "To combine different things together to create something new.", exampleSentence: "Plants synthesize sunlight and water into energy.", cognate: "sintetizar", partOfSpeech: "verb", pronunciation: "syn-the-size", tier: 2 },
    { term: "Organelle", definition: "A specialized part of a cell that performs a specific function.", exampleSentence: "The chloroplast is a vital organelle in plant cells.", cognate: "organelo", partOfSpeech: "noun", pronunciation: "or-gan-elle", tier: 3 },
    { term: "Byproduct", definition: "A secondary product made during the manufacture or synthesis of something else.", exampleSentence: "Oxygen is a byproduct of photosynthesis that animals breathe.", cognate: "subproducto", partOfSpeech: "noun", pronunciation: "by-prod-uct", tier: 2 }
  ],
  questions: [
    { id: "q1", question: "What pigment inside chloroplasts is responsible for absorbing sunlight?", dokLevel: 1, format: "multiple_choice", choices: ["Carotene", "Chlorophyll", "Xanthophyll", "Anthocyanin"], correctAnswer: "Chlorophyll", rationale: "The text states chlorophyll captures radiant solar energy within chloroplasts." },
    { id: "q2", question: "Explain the relationship between the inputs and outputs of photosynthesis based on the passage.", dokLevel: 2, format: "short_answer", correctAnswer: "Water and carbon dioxide are the inputs which, when processed with sunlight, produce glucose and oxygen.", rationale: "Shows understanding of the conversion cycle described in the passage." },
    { id: "q3", question: "Predict the immediate atmospheric impact if all plant chloroplasts were inhibited globally.", dokLevel: 3, format: "open_ended", correctAnswer: "Atmospheric oxygen would decline sharply, and carbon dioxide would rise, creating severe biosphere imbalances.", rationale: "Requires synthesizing consequences based on the necessity of plant life described." }
  ],
  graphicOrganizer: {
    type: "3-2-1",
    title: "Photosynthesis Synthesis Organizer",
    instructions: "Complete this 3-2-1 organizer based on the reading passage above.",
    data: {
      sections: [
        { label: "3 Key Concepts Learned", items: ["Solar energy is converted to chemical energy.", "Chloroplasts contain chlorophyll to catch light.", "Oxygen is released as a vital byproduct."] },
        { label: "2 Vocabulary Terms Formulated", items: ["Chloroplast (organelle)", "Synthesize (process)"] },
        { label: "1 Primary Question Remaining", items: ["How do plants adapt if there is prolonged cloudiness?"] }
      ]
    }
  }
};

const MOCK_STUDENTS = [
  { id: "st-01", name: "Isaiah Vance", grade: "5", lexile: 520, risk: "at-risk", tier: "Tier 2", language: "es", deficits: ["phonics", "fluency"] },
  { id: "st-02", name: "Maria Rodriguez", grade: "5", lexile: 410, risk: "at-risk", tier: "Tier 3", language: "es", deficits: ["comprehension", "vocabulary"] },
  { id: "st-03", name: "Jackson Miller", grade: "5", lexile: 980, risk: "low-risk", tier: "Tier 1", language: "en", deficits: [] },
  { id: "st-04", name: "Chloe Henderson", grade: "5", lexile: 710, risk: "some-risk", tier: "Tier 1", language: "en", deficits: ["written_expression"] }
];

// Helper function to map Lexile levels to grade equivalents
function lexileToGrade(lexile: number): string {
  if (lexile < 200) return "Kindergarten";
  if (lexile < 400) return "1st Grade";
  if (lexile < 500) return "2nd Grade";
  if (lexile < 700) return "3rd Grade";
  if (lexile < 800) return "4th Grade";
  if (lexile < 900) return "5th Grade";
  if (lexile < 1000) return "6th Grade";
  if (lexile < 1100) return "7th-8th Grade";
  return "High School";
}

export function SovereignDifferentiationEngine() {
  // Input states
  const [sourceInput, setSourceInput] = useState("");
  const [targetLexile, setTargetLexile] = useState([750]);
  const [gradeLevel, setGradeLevel] = useState("5");
  const [dokLevel, setDokLevel] = useState<1 | 2 | 3 | 4>(2);
  const [contentType, setContentType] = useState<string>("full_bundle");
  const [academicStandard, setAcademicStandard] = useState("SC.5.8");
  const [subject, setSubject] = useState("Science");
  const [language, setLanguage] = useState("en");
  const [selectedStudentId, setSelectedStudentId] = useState<string>("");

  // UI state
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationPhase, setGenerationPhase] = useState("");
  const [activeTab, setActiveTab] = useState("passage");
  const [bundleData, setBundleData] = useState<typeof MOCK_GENERATED_DATA | null>(null);
  const [streamingText, setStreamingText] = useState("");

  // Load selected student Lexile & language auto-pilot
  useEffect(() => {
    if (selectedStudentId) {
      const student = MOCK_STUDENTS.find(s => s.id === selectedStudentId);
      if (student) {
        setTargetLexile([student.lexile]);
        setLanguage(student.language);
        toast.info(`Synced targeting to ${student.name}'s profile (${student.lexile}L / ${student.tier})`, {
          icon: <Link className="w-4 h-4 text-cyan-400" />
        });
      }
    }
  }, [selectedStudentId]);

  // Handle generation simulation
  const handleGenerate = async () => {
    if (!sourceInput.trim()) {
      toast.error("Please insert a topic, URL, or baseline text to differentiate.");
      return;
    }

    setIsGenerating(true);
    setBundleData(null);
    setStreamingText("");
    setActiveTab("passage");

    const phases = [
      "SYNCHRONIZING NEURAL CONNECTIONS...",
      "GROUNDING PEDAGOGICAL COMPLIANCE (ALCOS SC.5.8)...",
      "CONSTRUCTING SCIENCE OF READING (SOR) SCAFFOLDS...",
      "CALIBRATING LEXILE DENSITY TO TARGET VALUE...",
      "FINALIZING MULTI-MODAL INTERVENE BUNDLE..."
    ];

    for (let i = 0; i < phases.length; i++) {
      setGenerationPhase(phases[i]);
      await new Promise(r => setTimeout(r, 700));
    }

    setGenerationPhase("COMPILING BUNDLE...");
    
    // Simulate streaming text effect for passage tab
    const fullPassage = MOCK_GENERATED_DATA.passage;
    setBundleData(MOCK_GENERATED_DATA);
    setIsGenerating(false);

    let currentText = "";
    const words = fullPassage.split(" ");
    for (let i = 0; i < words.length; i++) {
      currentText += words[i] + " ";
      setStreamingText(currentText);
      await new Promise(r => setTimeout(r, 20));
    }
    
    toast.success("Instructional Bundle generated with zero compliance friction!", {
      description: "Deducted 75 tokens from strategic ledger."
    });
  };

  // Pre-load default demo values
  const loadDemoPhotosynthesis = () => {
    setSourceInput("Photosynthesis is a process used by plants and other organisms to convert light energy into chemical energy that, through cellular respiration, can later be released to fuel the organisms' activities. Some of this chemical energy is stored in carbohydrate molecules, such as sugars and starches, which are synthesized from carbon dioxide and water.");
    setTargetLexile([820]);
    setAcademicStandard("SC.5.8");
    setSubject("Science");
    setGradeLevel("5");
    toast.info("Photosynthesis baseline curriculum loaded.");
  };

  return (
    <div className="w-full min-h-screen bg-[#0a0a0f] text-zinc-100 p-6 font-sans antialiased relative overflow-hidden select-none">
      
      {/* Scanning Laser Lines & Ambient Glow */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px]" />
        <div className="absolute -bottom-40 right-20 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[150px]" />
        <div className="w-full h-full bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:30px_30px]" />
      </div>

      {/* Main Container */}
      <div className="max-w-[1600px] mx-auto relative z-10 space-y-6">
        
        {/* Superior Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-white/5 pb-6">
          <div>
            <div className="flex items-center gap-3">
              <Badge className="bg-cyan-500/10 border-cyan-500/20 text-cyan-400 font-mono tracking-widest uppercase py-1 text-[10px]">
                Sovereign Intelligence
              </Badge>
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] text-zinc-500 font-mono tracking-tighter">NODE: SDE_ACTIVE_2026</span>
            </div>
            <h1 className="text-3xl font-black tracking-tight text-white mt-1">
              Sovereign <span className="bg-gradient-to-r from-amber-400 via-yellow-200 to-cyan-400 bg-clip-text text-transparent">Differentiation Engine</span>
            </h1>
            <p className="text-zinc-400 text-sm mt-1 max-w-2xl">
              Closed-loop Lexile-leveling, DOK multi-format assessment, and graphic organizers aligned to Alabama Literacies. Auto-pilot targeting links directly to student records.
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-3">
            <Button 
              variant="outline" 
              onClick={loadDemoPhotosynthesis}
              className="border-white/10 bg-white/5 text-zinc-300 hover:bg-white/10 hover:text-white"
            >
              <BookOpenCheck className="w-4 h-4 mr-2 text-amber-400" /> Load Demo Baseline
            </Button>
            <div className="bg-zinc-900/60 border border-white/10 px-4 py-2 rounded-lg flex items-center gap-3 font-mono">
              <Zap className="w-4 h-4 text-cyan-400 animate-pulse" />
              <div className="text-left">
                <span className="text-[9px] text-zinc-500 block leading-tight">LEDGER BALANCE</span>
                <span className="text-xs font-bold text-white leading-tight">4,850 tokens</span>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Panel: Input & Controls (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            <Card className="bg-zinc-900/40 border-white/5 backdrop-blur-xl shadow-2xl relative overflow-hidden">
              <CardHeader className="border-b border-white/5 py-4">
                <CardTitle className="text-sm font-bold uppercase tracking-wider text-zinc-300 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-cyan-400" /> Adaptation Blueprint
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-5">
                
                {/* Linked Student Record Target */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase text-zinc-400 tracking-wider flex items-center justify-between">
                    <span>Link Student Record</span>
                    <Badge variant="outline" className="text-[8px] border-cyan-500/20 text-cyan-400 font-mono">CLOSED LOOP</Badge>
                  </label>
                  <Select value={selectedStudentId} onValueChange={setSelectedStudentId}>
                    <SelectTrigger className="bg-black/40 border-white/10 text-zinc-300 focus:ring-1 focus:ring-cyan-500">
                      <SelectValue placeholder="Select student for profile link" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-900 border-white/10 text-zinc-300">
                      <SelectItem value="none">No Linking (General Template)</SelectItem>
                      {MOCK_STUDENTS.map(student => (
                        <SelectItem key={student.id} value={student.id}>
                          {student.name} (Grade {student.grade} | {student.lexile}L | {student.tier})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Topic / Baseline Curriculum Source Input */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase text-zinc-400 tracking-wider">
                    Baseline Topic, URL, or Copy-Pasted Text
                  </label>
                  <Textarea 
                    placeholder="Enter any curriculum standard topic (e.g. photosynthesis, Civil War, decimals), paste a long reading text, or enter an educational URL..."
                    value={sourceInput}
                    onChange={(e) => setSourceInput(e.target.value)}
                    className="min-h-[140px] bg-black/40 border-white/10 text-zinc-200 focus:ring-1 focus:ring-cyan-500 text-xs placeholder:text-zinc-600 resize-none"
                  />
                </div>

                {/* Lexile Range Slider with grade equivalent */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-[10px] font-black uppercase text-zinc-400 tracking-wider">
                    <span>Target Lexile Level</span>
                    <span className="text-cyan-400 font-mono text-xs">{targetLexile[0]}L ({lexileToGrade(targetLexile[0])})</span>
                  </div>
                  <div className="px-1 py-2">
                    <Slider 
                      min={100} 
                      max={1400} 
                      step={10} 
                      value={targetLexile} 
                      onValueChange={setTargetLexile}
                      className="[&>.absolute]:bg-cyan-500"
                    />
                  </div>
                  <div className="flex justify-between text-[9px] text-zinc-600 font-mono">
                    <span>100L (K-1)</span>
                    <span>600L (Gr. 3-4)</span>
                    <span>1000L (Gr. 7-8)</span>
                    <span>1400L (Gr. 11+)</span>
                  </div>
                </div>

                {/* Webb's Depth of Knowledge & Grade Selector */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase text-zinc-400 tracking-wider">Webb's DOK Level</label>
                    <Select value={String(dokLevel)} onValueChange={(val) => setDokLevel(Number(val) as any)}>
                      <SelectTrigger className="bg-black/40 border-white/10 text-zinc-300">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-900 border-white/10 text-zinc-300">
                        <SelectItem value="1">DOK-1: Recall</SelectItem>
                        <SelectItem value="2">DOK-2: Skill/Concept</SelectItem>
                        <SelectItem value="3">DOK-3: Strategic</SelectItem>
                        <SelectItem value="4">DOK-4: Extended</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase text-zinc-400 tracking-wider">Grade Level</label>
                    <Select value={gradeLevel} onValueChange={setGradeLevel}>
                      <SelectTrigger className="bg-black/40 border-white/10 text-zinc-300">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-900 border-white/10 text-zinc-300">
                        {Array.from({ length: 12 }, (_, i) => String(i + 1)).map(grade => (
                          <SelectItem key={grade} value={grade}>{grade}th Grade</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Standard, Subject, and Language Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase text-zinc-400 tracking-wider">Academic Standard</label>
                    <Input 
                      value={academicStandard}
                      onChange={(e) => setAcademicStandard(e.target.value)}
                      className="bg-black/40 border-white/10 text-zinc-300"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase text-zinc-400 tracking-wider">Target Language</label>
                    <Select value={language} onValueChange={setLanguage}>
                      <SelectTrigger className="bg-black/40 border-white/10 text-zinc-300">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-900 border-white/10 text-zinc-300">
                        <SelectItem value="en">English (Default)</SelectItem>
                        <SelectItem value="es">Spanish (Español)</SelectItem>
                        <SelectItem value="fr">French (Français)</SelectItem>
                        <SelectItem value="vi">Vietnamese (Tiếng Việt)</SelectItem>
                        <SelectItem value="ar">Arabic (العربية)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Content Bundle Configuration */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase text-zinc-400 tracking-wider">Content Output</label>
                  <Select value={contentType} onValueChange={setContentType}>
                    <SelectTrigger className="bg-black/40 border-white/10 text-zinc-300">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-900 border-white/10 text-zinc-300">
                      <SelectItem value="reading_passage">Reading Passage Only</SelectItem>
                      <SelectItem value="vocabulary">Vocabulary Matrix Only</SelectItem>
                      <SelectItem value="assessment">DOK Assessment Only</SelectItem>
                      <SelectItem value="full_bundle">Full Sovereign Bundle (Passage + Vocab + Quiz + Organizer)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Generate Button */}
                <Button 
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="w-full bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white font-bold py-6 relative overflow-hidden transition-all duration-300 transform active:scale-[0.98] shadow-[0_0_20px_rgba(245,158,11,0.2)]"
                >
                  {isGenerating ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                      <span>SYNTHESIZING PROTOCOLS...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-white animate-bounce" />
                      <span>DIFFERENTIATE & SCAFFOLD</span>
                    </div>
                  )}
                </Button>

              </CardContent>
            </Card>

            {/* Micro-Analytics Stat cards */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-zinc-900/20 border-white/5 p-4 text-center">
                <div className="text-[9px] font-black text-zinc-500 uppercase tracking-widest mb-1">ALA-SOR Rating</div>
                <div className="text-emerald-400 font-black text-xl flex items-center justify-center gap-1">
                  100% <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
                <span className="text-[8px] text-zinc-600 uppercase font-mono">System Grounded</span>
              </Card>
              <Card className="bg-zinc-900/20 border-white/5 p-4 text-center">
                <div className="text-[9px] font-black text-zinc-500 uppercase tracking-widest mb-1">Time Optimization</div>
                <div className="text-cyan-400 font-black text-xl">
                  ~3.2 hrs
                </div>
                <span className="text-[8px] text-zinc-600 uppercase font-mono">Saved Per Lesson</span>
              </Card>
            </div>
          </div>

          {/* Center + Right Panel (8 Cols) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* If generating, display premium scanning HUD overlay */}
            <AnimatePresence mode="wait">
              {isGenerating ? (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-zinc-900/80 border border-white/10 rounded-xl p-16 text-center space-y-6 backdrop-blur-2xl relative overflow-hidden min-h-[500px] flex flex-col justify-center items-center"
                >
                  <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-500/20 via-transparent to-transparent animate-pulse" />
                  
                  {/* Rotating neural engine mock animation */}
                  <div className="relative w-28 h-28 flex items-center justify-center">
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                      className="absolute inset-0 border-2 border-dashed border-cyan-500/30 rounded-full"
                    />
                    <motion.div 
                      animate={{ rotate: -360 }}
                      transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                      className="absolute inset-2 border border-dotted border-amber-500/40 rounded-full"
                    />
                    <Brain className="w-10 h-10 text-cyan-400 animate-pulse" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-black tracking-widest text-white uppercase">{generationPhase}</h3>
                    <p className="text-zinc-500 text-xs font-mono max-w-lg">
                      Mapping baseline parameters to Webb's DOK, verifying Lexile Grade Band ranges, and compiling Mobile County School compliance frameworks...
                    </p>
                  </div>

                  {/* Scanning line animation */}
                  <div className="w-64 h-1.5 bg-zinc-800 rounded-full overflow-hidden relative">
                    <motion.div 
                      animate={{ x: [-100, 200] }}
                      transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                      className="absolute top-0 left-0 w-24 h-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
                    />
                  </div>

                </motion.div>
              ) : bundleData ? (
                
                /* Generated Bundle Viewer Panels */
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-6"
                >
                  {/* Top-tier Meta-Control Bar */}
                  <div className="bg-zinc-950/60 border border-white/5 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4 backdrop-blur-xl">
                    <div className="flex items-center gap-4 text-xs font-mono text-zinc-400">
                      <div className="flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 text-zinc-500" />
                        <span>Words: <strong className="text-white">{bundleData.wordCount}</strong></span>
                      </div>
                      <div className="flex items-center gap-1.5 border-l border-white/10 pl-4">
                        <Target className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Output Lexile: <strong className="text-cyan-400">{bundleData.outputLexile}L ({lexileToGrade(bundleData.outputLexile)})</strong></span>
                      </div>
                      <div className="flex items-center gap-1.5 border-l border-white/10 pl-4">
                        <GraduationCap className="w-3.5 h-3.5 text-amber-400" />
                        <span>Flesch-Kincaid: <strong className="text-amber-400">{bundleData.fleschKincaid}</strong></span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" onClick={() => { navigator.clipboard.writeText(bundleData.passage); toast.success("Passage copied to clipboard!"); }} className="text-zinc-400 hover:text-white hover:bg-white/5">
                        <Copy className="w-4 h-4 mr-1.5" /> Copy
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => window.print()} className="text-zinc-400 hover:text-white hover:bg-white/5">
                        <Printer className="w-4 h-4 mr-1.5" /> Print
                      </Button>
                      <Button size="sm" className="bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                        <Download className="w-4 h-4 mr-1.5" /> Export to Classroom
                      </Button>
                    </div>
                  </div>

                  {/* Main Tabbed Output Panels */}
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="bg-zinc-900/60 border border-white/5 p-1 rounded-lg w-full flex justify-between">
                      <TabsTrigger value="passage" className="flex-1 text-xs py-2.5 data-[state=active]:bg-zinc-800 data-[state=active]:text-white font-black tracking-wider uppercase">
                        📖 Reading Passage
                      </TabsTrigger>
                      <TabsTrigger value="vocabulary" className="flex-1 text-xs py-2.5 data-[state=active]:bg-zinc-800 data-[state=active]:text-white font-black tracking-wider uppercase">
                        📝 Vocabulary Matrix
                      </TabsTrigger>
                      <TabsTrigger value="questions" className="flex-1 text-xs py-2.5 data-[state=active]:bg-zinc-800 data-[state=active]:text-white font-black tracking-wider uppercase">
                        ❓ DOK Quiz
                      </TabsTrigger>
                      <TabsTrigger value="organizer" className="flex-1 text-xs py-2.5 data-[state=active]:bg-zinc-800 data-[state=active]:text-white font-black tracking-wider uppercase">
                        🗺️ Graphic Organizer
                      </TabsTrigger>
                    </TabsList>

                    {/* Passage Tab */}
                    <TabsContent value="passage" className="mt-4">
                      <Card className="bg-zinc-950/40 border-white/5 p-6 backdrop-blur-xl relative overflow-hidden min-h-[300px]">
                        <div className="absolute top-4 right-4 flex gap-2">
                          <Badge className="bg-cyan-500/15 border-cyan-500/20 text-cyan-400 font-mono text-[9px] uppercase tracking-widest">{bundleData.outputLexile}L Level</Badge>
                          {language !== 'en' && <Badge className="bg-amber-500/15 border-amber-500/20 text-amber-400 font-mono text-[9px] uppercase tracking-widest">MLL SUPPORT</Badge>}
                        </div>
                        <div className="space-y-4 max-w-3xl pr-12 text-sm leading-relaxed text-zinc-300 font-serif">
                          {streamingText ? (
                            <p>{streamingText}</p>
                          ) : (
                            <p>{bundleData.passage}</p>
                          )}
                        </div>

                        {/* Citations Box */}
                        {bundleData.citations?.length > 0 && (
                          <div className="mt-8 pt-4 border-t border-white/5 space-y-1.5">
                            <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest block">GROUND TRUTH SOURCE CITATIONS</span>
                            <div className="flex flex-col gap-1 text-[11px] text-zinc-400 font-mono">
                              {bundleData.citations.map((cite, index) => (
                                <div key={index} className="flex items-center gap-1">
                                  <span className="h-1 w-1 bg-amber-400 rounded-full" />
                                  <span>{cite}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </Card>
                    </TabsContent>

                    {/* Vocabulary Matrix Tab */}
                    <TabsContent value="vocabulary" className="mt-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {bundleData.vocabulary.map((vocab, i) => (
                          <Card key={i} className="bg-zinc-950/40 border-white/5 p-4 backdrop-blur-xl relative overflow-hidden group hover:border-cyan-500/30 transition-all duration-300">
                            <div className="flex justify-between items-start">
                              <div>
                                <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">{vocab.partOfSpeech} • {vocab.pronunciation}</span>
                                <h4 className="text-base font-black text-white group-hover:text-cyan-400 transition-colors mt-0.5">{vocab.term}</h4>
                              </div>
                              <Badge className="bg-cyan-500/10 border-cyan-500/20 text-cyan-400 font-mono text-[9px]">Tier {vocab.tier}</Badge>
                            </div>
                            <p className="text-zinc-400 text-xs mt-2 leading-relaxed">{vocab.definition}</p>
                            <p className="text-zinc-500 text-xs italic mt-2 border-l border-zinc-800 pl-2">"{vocab.exampleSentence}"</p>
                            
                            {vocab.cognate && (
                              <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-zinc-400">
                                <span>SPANISH COGNATE:</span>
                                <strong className="text-amber-400 uppercase tracking-wider">{vocab.cognate}</strong>
                              </div>
                            )}
                          </Card>
                        ))}
                      </div>
                    </TabsContent>

                    {/* Assessment Tab */}
                    <TabsContent value="questions" className="mt-4">
                      <div className="space-y-4">
                        {bundleData.questions.map((q, index) => (
                          <Card key={q.id} className="bg-zinc-950/40 border-white/5 p-5 backdrop-blur-xl">
                            <div className="flex justify-between items-start border-b border-white/5 pb-3 mb-4">
                              <div className="flex items-center gap-2">
                                <span className="h-5 w-5 bg-zinc-800 text-zinc-300 font-mono text-xs font-black rounded flex items-center justify-center">Q{index + 1}</span>
                                <Badge className="bg-amber-500/10 border-amber-500/20 text-amber-400 font-mono text-[9px] uppercase">DOK-{q.dokLevel}</Badge>
                              </div>
                              <span className="text-[10px] text-zinc-500 font-mono uppercase">{q.format.replace('_', ' ')}</span>
                            </div>
                            <h4 className="text-sm font-bold text-white mb-3">{q.question}</h4>
                            
                            {q.choices && (
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 mb-4">
                                {q.choices.map((choice, i) => (
                                  <div key={i} className={cn(
                                    "p-3 rounded border text-xs font-medium cursor-pointer transition-all",
                                    choice === q.correctAnswer 
                                      ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" 
                                      : "bg-black/20 border-white/5 text-zinc-400 hover:border-zinc-800"
                                  )}>
                                    <span className="font-mono mr-2">{String.fromCharCode(65 + i)}.</span> {choice}
                                  </div>
                                ))}
                              </div>
                            )}

                            {q.format === "short_answer" && (
                              <div className="bg-black/30 border border-white/5 p-3 rounded text-xs text-zinc-400 mb-4 font-mono">
                                <span className="text-[9px] font-black text-zinc-600 block uppercase mb-1">SAMPLE KEY RESPONSES</span>
                                {q.correctAnswer}
                              </div>
                            )}

                            {/* Rationale compliance banner */}
                            <div className="bg-zinc-900/40 border border-zinc-800 p-3 rounded text-[11px] leading-relaxed text-zinc-400 flex items-start gap-2.5">
                              <Brain className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                              <div>
                                <strong className="text-zinc-300 font-bold block uppercase text-[9px] font-mono mb-0.5">COMPLIANCE CRITERIA RATIONALE</strong>
                                {q.rationale}
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>
                    </TabsContent>

                    {/* Graphic Organizer Tab */}
                    <TabsContent value="organizer" className="mt-4">
                      {bundleData.graphicOrganizer && (
                        <Card className="bg-zinc-950/40 border-white/5 p-6 backdrop-blur-xl space-y-6">
                          <div className="border-b border-white/5 pb-3">
                            <span className="text-[10px] text-cyan-400 font-mono uppercase tracking-widest">{bundleData.graphicOrganizer.type} GRAPHIC ORGANIZER</span>
                            <h3 className="text-lg font-black text-white mt-0.5">{bundleData.graphicOrganizer.title}</h3>
                            <p className="text-xs text-zinc-400 mt-1 italic">{bundleData.graphicOrganizer.instructions}</p>
                          </div>

                          <div className="space-y-4 max-w-2xl mx-auto">
                            {bundleData.graphicOrganizer.data.sections.map((section: any, idx: number) => (
                              <div key={idx} className="space-y-2">
                                <h4 className="text-xs font-black text-zinc-400 uppercase tracking-widest font-mono flex items-center gap-2">
                                  <span className="h-1.5 w-1.5 bg-amber-400 rounded-full" /> {section.label}
                                </h4>
                                <div className="space-y-2">
                                  {section.items.map((item: string, i: number) => (
                                    <div key={i} className="bg-black/40 border border-white/5 p-3 rounded text-xs text-zinc-300 italic flex items-center gap-3">
                                      <span className="h-4 w-4 bg-zinc-800 rounded-full font-mono text-[9px] flex items-center justify-center shrink-0">{i + 1}</span>
                                      <span>{item}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </Card>
                      )}
                    </TabsContent>
                  </Tabs>
                </motion.div>
              ) : (
                /* Empty state with beautiful directions */
                <Card className="bg-zinc-900/20 border border-white/5 border-dashed rounded-xl p-16 text-center space-y-6 min-h-[500px] flex flex-col justify-center items-center">
                  <div className="h-16 w-16 bg-zinc-800/40 border border-zinc-700/50 rounded-full flex items-center justify-center shadow-inner">
                    <BookOpen className="w-8 h-8 text-zinc-500 animate-pulse" />
                  </div>
                  <div className="space-y-2 max-w-md">
                    <h3 className="text-base font-bold text-white uppercase tracking-wider">Awaiting Instructional Blueprint</h3>
                    <p className="text-zinc-500 text-xs leading-relaxed">
                      Select your target grade level, input a topic (or link a specific Mobile County student profile), slide the Lexile bar to the appropriate setting, and trigger the synthesis engine to compile.
                    </p>
                  </div>
                  <Button 
                    onClick={loadDemoPhotosynthesis}
                    className="bg-zinc-900 border border-white/10 text-zinc-300 hover:bg-zinc-800"
                  >
                    Load Photosynthesis Science Blueprint
                  </Button>
                </Card>
              )}
            </AnimatePresence>

          </div>

        </div>

      </div>
    </div>
  );
}
