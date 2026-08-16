"use client";

import React, { useState, useCallback } from "react";
import {
  FileCheck2,
  Zap,
  CreditCard,
  Video,
  Bot,
  Building2,
  ShieldCheck,
  Award,
  Sparkles,
  Copy,
  Check,
  ExternalLink,
  TrendingDown,
  DollarSign,
  Activity,
  BatteryCharging,
  Truck,
  Globe2,
  Layers,
} from "lucide-react";

type ActiveTab = "sbir" | "analytics" | "fintech" | "media" | "agents";

export function SovereignMasterShell() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("sbir");

  const handleSelectTab = useCallback((tab: ActiveTab) => {
    setActiveTab(tab);
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 text-slate-100 font-sans selection:bg-amber-500/30">
      {/* Executive Command Header */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 backdrop-blur-xl shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10 border-b border-slate-800 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded-full flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> EdIntel Sovereign Platform
              </span>
              <span className="text-xs text-slate-400 font-mono">
                DOE Pitch ID: SBIRSTTR-26-PH1-041
              </span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-100 mt-2">
              Omni-Sovereign Command & Proposal Engine
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Transcend Holistic Wellness • Prichard, AL (AL-01) • PI: Dr. Alvin West, II
            </p>
          </div>

          {/* Federal & Institutional Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-1 text-[11px] bg-slate-950 border border-slate-800 text-slate-300 rounded-lg flex items-center gap-1 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" /> SBA HUBZone
            </span>
            <span className="px-2.5 py-1 text-[11px] bg-slate-950 border border-slate-800 text-slate-300 rounded-lg flex items-center gap-1 font-medium">
              <Award className="w-3.5 h-3.5 text-amber-400" /> Minority Owned (≥51%)
            </span>
            <span className="px-2.5 py-1 text-[11px] bg-slate-950 border border-slate-800 text-slate-300 rounded-lg flex items-center gap-1 font-medium">
              <Building2 className="w-3.5 h-3.5 text-amber-400" /> Disadvantaged Business
            </span>
          </div>
        </div>

        {/* Engine Navigation Tabs */}
        <div className="mt-6 flex flex-wrap gap-2 pt-1">
          <TabButton
            active={activeTab === "sbir"}
            onClick={() => handleSelectTab("sbir")}
            icon={<FileCheck2 className="w-4 h-4" />}
            label="DOE SBIR Pitch Portal"
            badge="Portal Ready"
          />
          <TabButton
            active={activeTab === "analytics"}
            onClick={() => handleSelectTab("analytics")}
            icon={<Zap className="w-4 h-4" />}
            label="Clean Energy & Fleet Load"
            badge=">20% Energy Cut"
          />
          <TabButton
            active={activeTab === "fintech"}
            onClick={() => handleSelectTab("fintech")}
            icon={<CreditCard className="w-4 h-4" />}
            label="B2G Fintech & PO Engine"
            badge="150+ Currencies"
          />
          <TabButton
            active={activeTab === "media"}
            onClick={() => handleSelectTab("media")}
            icon={<Video className="w-4 h-4" />}
            label="Video Pruning & Media"
            badge="WebCodecs"
          />
          <TabButton
            active={activeTab === "agents"}
            onClick={() => handleSelectTab("agents")}
            icon={<Bot className="w-4 h-4" />}
            label="Multi-Agent Swarm"
            badge="Autonomous"
          />
        </div>
      </div>

      {/* Dynamic Engine Content Surface */}
      <div className="transition-all duration-200 min-h-[400px]">
        {activeTab === "sbir" && <SbirSection />}
        {activeTab === "analytics" && <AnalyticsSection />}
        {activeTab === "fintech" && <FintechSection />}
        {activeTab === "media" && <MediaSection />}
        {activeTab === "agents" && <AgentSection />}
      </div>
    </div>
  );
}

const TabButton = React.memo(function TabButton({
  active,
  onClick,
  icon,
  label,
  badge,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  badge?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2.5 rounded-xl font-semibold text-xs transition-all flex items-center gap-2 border ${
        active
          ? "bg-amber-500 text-slate-950 border-amber-400 shadow-lg shadow-amber-500/10 font-bold"
          : "bg-slate-950/80 text-slate-300 border-slate-800 hover:border-slate-700 hover:bg-slate-800/50"
      }`}
    >
      {icon}
      <span>{label}</span>
      {badge && (
        <span
          className={`px-1.5 py-0.5 text-[9px] font-mono rounded ${
            active ? "bg-slate-950 text-amber-400" : "bg-slate-800 text-slate-400"
          }`}
        >
          {badge}
        </span>
      )}
    </button>
  );
});

/* ============================================================================
   ENGINE 1: DOE SBIR/STTR PHASE I PITCH PORTAL
   ============================================================================ */
function SbirSection() {
  const [subTab, setSubTab] = useState<"narrative" | "applicant" | "attachments">("narrative");
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(id);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const countWords = (str: string) => str.trim().split(/\s+/).filter(Boolean).length;

  const narrativeData = {
    title:
      "EdIntel: Predictive Clean Energy Transit Analytics and Fleet Load Optimization Platform for Municipal and Educational Infrastructure",
    techStatus: "Concept / Early Prototype (TRL 2–3)",
    summary:
      "EdIntel develops an intelligent predictive analytics engine that optimizes energy efficiency, route logistics, and peak electrical load management across public school and municipal transit infrastructure. Directly advancing DOE Genesis Mission priorities in clean energy deployment and grid modernization, the software models operational duty cycles, route thermodynamic dissipation, and dynamic time-of-use tariffs. By uniting analytic finance modeling with operational transit telemetry, this 9-month Phase I project establishes algorithmic feasibility to eliminate energy waste, lower public expenditure, and accelerate clean transportation transitions in underserved regional communities.",
    technicalPromise:
      "Significance – School districts and municipal transit systems face severe budget constraints and grid-capacity bottlenecks when modernizing fleets. Existing telematics tools only log historical routes without predictive energy optimization, causing unmanaged peak-load utility surcharges and excessive battery and fuel waste.\n\nInnovation – EdIntel introduces a predictive transit optimization engine combining econometric modeling, cloud data pipelines, and vehicle thermodynamics. Unlike static dispatch software, our system evaluates real-time route topography, passenger load variations, ambient weather conditions, and time-varying utility tariffs. This enables dynamic charge-dispatch scheduling that reduces fleet energy consumption and peak charging demand by over 20%.\n\nFeasibility – The 9-month Phase I project executes three concrete milestones:\n1. Ingest NREL Fleet DNA/FASTSim baseline data and calibrate predictive route-energy algorithms.\n2. Build and bench-test core optimization modules in a Next.js/Supabase cloud environment using simulated multi-route municipal transit datasets.\n3. Validate a working software prototype demonstrating >20% energy cost reduction and zero operational route disruption.\n\nOur existing cloud architecture, mathematical modeling foundations, and direct commercial transit expertise ensure on-time, within-budget Phase I execution.",
    commercialization:
      "Value Proposition – School districts and municipalities allocate significant operating funds to fuel, charging, and vehicle maintenance under strict budget limits. EdIntel reduces total cost of ownership by up to 25% through automated, tariff-aware charging windows and dynamic route optimization without requiring expensive proprietary hardware.\n\nCompetitive Advantage – Unlike legacy telematics platforms with rigid dashboards and complex token pricing, EdIntel combines rigorous financial econometrics with real-world commercial transit operational workflows. Our cloud platform offers high-throughput processing, frictionless 30-day adoption, and unencumbered commercial freedom to operate.\n\nGo-to-Market Strategy –\n• Year 1 (Phase I/II): Deploy pilot testing across Mobile County Public Schools and municipal transit operations in coastal Alabama.\n• Years 2–3: Scale B2G SaaS licensing to Southeastern school districts, regional transit authorities, and municipal fleets.\n• Years 4–5: Expand nationwide via clean cities coalitions, EV charging infrastructure partners, and state DOT contracts, establishing sustained positive cash flow.",
    teamQualifications:
      "Company – Transcend Holistic Wellness is led by Principal Investigator Dr. Alvin West, II (DBA, Analytic Finance, Walden University; MBA, Corporate Finance; MS, Instructional Leadership & Supervision; MS, Collaborative Teaching & Special Education; BS, Psychology; Middle School Math Certification; active Class A Commercial Driver License with commercial transit endorsements). Dr. West bridges quantitative finance, instructional leadership, and frontline commercial transit fleet driving operations.\n\nPartnerships – Operational execution and regional strategic deployment are co-managed with strategic partner Tiffany Robinson-Harris. The team leverages deep relationships across Mobile County Public Schools, regional Alabama municipal networks, and modern full-stack cloud software environments (Next.js, Supabase, Vercel).\n\nFinancials – Dr. West’s corporate finance and analytic modeling background guarantees disciplined fiscal management, milestone compliance, and capital efficiency. Phase I success will derisk system architecture, positioning the company for a Phase II award, regional public-private partnerships, and self-sustaining SaaS commercial revenues.",
    aiDisclosure:
      "Generative AI tools were utilized strictly for administrative text formatting, editorial structuring, and portal compliance verification. All scientific methodologies, analytical modeling frameworks, team credentials, and proposed research objectives were formulated, directed, and verified by the proposing team.",
  };

  return (
    <div className="space-y-6">
      {/* Portal Sub-Navigation */}
      <div className="flex border-b border-slate-800 gap-4">
        <button
          onClick={() => setSubTab("narrative")}
          className={`pb-3 px-2 font-medium text-sm transition-colors flex items-center gap-2 ${
            subTab === "narrative" ? "text-amber-400 border-b-2 border-amber-500 font-bold" : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <FileCheck2 className="w-4 h-4" /> Section 2: Narrative Form Fields
        </button>
        <button
          onClick={() => setSubTab("applicant")}
          className={`pb-3 px-2 font-medium text-sm transition-colors flex items-center gap-2 ${
            subTab === "applicant" ? "text-amber-400 border-b-2 border-amber-500 font-bold" : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <Building2 className="w-4 h-4" /> Section 1: Submitter Info
        </button>
        <button
          onClick={() => setSubTab("attachments")}
          className={`pb-3 px-2 font-medium text-sm transition-colors flex items-center gap-2 ${
            subTab === "attachments" ? "text-amber-400 border-b-2 border-amber-500 font-bold" : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <Layers className="w-4 h-4" /> Section 3: Disclosures & Bibliography
        </button>
      </div>

      {subTab === "narrative" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 bg-slate-900/80 border border-slate-800 rounded-xl p-5">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold uppercase text-slate-400">Descriptive Title of Project *</label>
                <button
                  onClick={() => handleCopy("title", narrativeData.title)}
                  className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 font-medium"
                >
                  {copiedField === "title" ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedField === "title" ? "Copied" : "Copy Title"}
                </button>
              </div>
              <p className="text-sm font-medium text-slate-200 leading-relaxed">{narrativeData.title}</p>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5">
              <label className="text-xs font-semibold uppercase text-slate-400 block mb-2">Technology Status *</label>
              <div className="inline-block px-3 py-1.5 bg-amber-500/10 border border-amber-500/20 text-amber-400 font-mono text-sm rounded-lg font-semibold">
                {narrativeData.techStatus}
              </div>
            </div>
          </div>

          <WordCountCard
            id="summary"
            label="Summary, Topic, and Mission Alignment *"
            text={narrativeData.summary}
            wordLimit={100}
            wordCount={countWords(narrativeData.summary)}
            copiedField={copiedField}
            onCopy={handleCopy}
          />

          <WordCountCard
            id="technicalPromise"
            label="Technical Promise *"
            text={narrativeData.technicalPromise}
            wordLimit={200}
            wordCount={countWords(narrativeData.technicalPromise)}
            copiedField={copiedField}
            onCopy={handleCopy}
          />

          <WordCountCard
            id="commercialization"
            label="Commercialization Potential *"
            text={narrativeData.commercialization}
            wordLimit={200}
            wordCount={countWords(narrativeData.commercialization)}
            copiedField={copiedField}
            onCopy={handleCopy}
          />

          <WordCountCard
            id="teamQualifications"
            label="Team Qualifications *"
            text={narrativeData.teamQualifications}
            wordLimit={200}
            wordCount={countWords(narrativeData.teamQualifications)}
            copiedField={copiedField}
            onCopy={handleCopy}
          />
        </div>
      )}

      {subTab === "applicant" && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-amber-400" /> Submitter & Entity Credentials
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <InfoTile label="Submitter Name" value="Alvin West" />
            <InfoTile label="Submitter Email" value="dralvinwest@transcendholisticwellness.com" />
            <InfoTile label="Company Name" value="Transcend Holistic Wellness" />
            <InfoTile label="City & State" value="Prichard, AL" />
            <InfoTile label="Congressional District" value="AL-01" />
            <InfoTile label="Company Website" value="https://transcendholisticwellness.com" isLink />
            <InfoTile label="Alternate POC" value="Tiffany Robinson-Harris" />
            <InfoTile label="ConnectWerx Network" value="Yes" />
            <InfoTile label="Prior Phase I Awards" value="0" />
          </div>
        </div>
      )}

      {subTab === "attachments" && (
        <div className="space-y-6">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-semibold uppercase text-slate-400 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" /> Generative AI Disclosure Statement *
              </label>
              <button
                onClick={() => handleCopy("aiDisclosure", narrativeData.aiDisclosure)}
                className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 font-medium"
              >
                {copiedField === "aiDisclosure" ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedField === "aiDisclosure" ? "Copied" : "Copy Disclosure"}
              </button>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono">
              {narrativeData.aiDisclosure}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function WordCountCard({
  id,
  label,
  text,
  wordLimit,
  wordCount,
  copiedField,
  onCopy,
}: {
  id: string;
  label: string;
  text: string;
  wordLimit: number;
  wordCount: number;
  copiedField: string | null;
  onCopy: (id: string, text: string) => void;
}) {
  const isWithinLimit = wordCount <= wordLimit;

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-3">
        <label className="text-xs font-semibold uppercase text-slate-400">{label}</label>

        <div className="flex items-center gap-3">
          <span
            className={`text-xs font-mono font-semibold px-2.5 py-0.5 rounded-full border ${
              isWithinLimit ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" : "bg-rose-500/10 border-rose-500/20 text-rose-400"
            }`}
          >
            {wordCount} / {wordLimit} words ({wordLimit - wordCount} remaining)
          </span>

          <button
            onClick={() => onCopy(id, text)}
            className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 font-medium bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-lg transition-colors"
          >
            {copiedField === id ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copiedField === id ? "Copied" : "Copy Section"}
          </button>
        </div>
      </div>

      <p className="text-sm text-slate-200 leading-relaxed font-sans whitespace-pre-line bg-slate-950 p-4 rounded-xl border border-slate-800/80">
        {text}
      </p>
    </div>
  );
}

function InfoTile({ label, value, isLink }: { label: string; value: string; isLink?: boolean }) {
  return (
    <div className="bg-slate-950 border border-slate-800 p-3 rounded-xl">
      <div className="text-[10px] uppercase font-semibold text-slate-400">{label}</div>
      {isLink ? (
        <a href={value} target="_blank" rel="noreferrer" className="text-xs text-amber-400 hover:underline flex items-center gap-1 mt-0.5 font-mono">
          {value} <ExternalLink className="w-3 h-3" />
        </a>
      ) : (
        <div className="text-xs font-semibold text-slate-200 mt-0.5">{value}</div>
      )}
    </div>
  );
}

/* ============================================================================
   ENGINE 2: CLEAN ENERGY TRANSIT ANALYTICS
   ============================================================================ */
function AnalyticsSection() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiTile label="Energy Cost Cut" value="22.4%" subtext="Exceeds Phase I Target (>20%)" icon={<TrendingDown className="w-5 h-5 text-emerald-400" />} />
        <KpiTile label="Est. Monthly Savings" value="$14,850" subtext="Mobile County School Fleet" icon={<DollarSign className="w-5 h-5 text-amber-400" />} />
        <KpiTile label="Peak Grid Cut" value="185 kW" subtext="TOU Shifted Off-Peak" icon={<BatteryCharging className="w-5 h-5 text-sky-400" />} />
        <KpiTile label="Fleet TCO Cut" value="24.8%" subtext="Fuel + Maintenance + Demand Surcharges" icon={<Activity className="w-5 h-5 text-purple-400" />} />
      </div>

      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <Truck className="w-4 h-4 text-amber-400" /> Dynamic Route Thermodynamic Dissipation Simulator
          </h3>
          <span className="text-xs font-mono text-slate-400">NREL FASTSim / RouteE Calibrated</span>
        </div>

        <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4">
          <div className="flex justify-between text-xs text-slate-400">
            <span>Route: <strong className="text-amber-400">Route 14 - Mobile County Schools</strong></span>
            <span>Tariff Rate: <strong className="text-emerald-400">$0.11/kWh (Off-Peak Window)</strong></span>
          </div>

          <div className="w-full h-12 bg-slate-900 rounded-lg flex items-end p-1 gap-1 border border-slate-800">
            {[35, 42, 68, 85, 92, 70, 45, 30, 25, 60, 88, 95, 40, 20].map((h, i) => (
              <div key={i} style={{ height: `${h}%` }} className="flex-1 bg-amber-500 rounded-sm" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function KpiTile({ label, value, subtext, icon }: { label: string; value: string; subtext: string; icon: React.ReactNode }) {
  return (
    <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs uppercase font-semibold text-slate-400">{label}</span>
        {icon}
      </div>
      <div className="text-2xl font-bold font-mono text-slate-100">{value}</div>
      <div className="text-[11px] text-slate-400">{subtext}</div>
    </div>
  );
}

/* ============================================================================
   ENGINE 3: GLOBAL B2G FINTECH & PO ENGINE
   ============================================================================ */
function FintechSection() {
  const [curr, setCurr] = useState("USD");
  return (
    <div className="space-y-6">
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-100">District Purchase Order (PO) Invoicing Engine</h3>
          <p className="text-xs text-slate-400 mt-1">Single-click PO generation for school districts & municipalities globally.</p>
        </div>

        <div className="flex items-center gap-2 bg-slate-950 p-2 rounded-xl border border-slate-800 text-xs font-mono">
          <Globe2 className="w-4 h-4 text-amber-400" />
          <select value={curr} onChange={(e) => setCurr(e.target.value)} className="bg-transparent text-slate-200 outline-none">
            <option value="USD">USD - United States ($12,500)</option>
            <option value="EUR">EUR - European Union (€11,500)</option>
            <option value="GBP">GBP - United Kingdom (£9,875)</option>
          </select>
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
   ENGINE 4: ALGORITHMIC MEDIA PRUNING
   ============================================================================ */
function MediaSection() {
  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider flex items-center gap-2">
          <Video className="w-4 h-4 text-amber-400" /> Video Retention & Auto-Pruning Engine
        </h3>
        <span className="text-xs font-mono text-emerald-400 font-bold">950 MB Cloud Storage Reclaimed</span>
      </div>
      <p className="text-xs text-slate-400">Automatically identifies underperforming video assets and executes WebCodecs trim routines.</p>
    </div>
  );
}

/* ============================================================================
   ENGINE 5: MULTI-AGENT SWARM
   ============================================================================ */
function AgentSection() {
  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider flex items-center gap-2">
          <Bot className="w-4 h-4 text-amber-400" /> Autonomous Multi-Agent Swarm Orchestrator
        </h3>
        <span className="text-xs font-mono text-emerald-400 font-bold">Swarm Active (12ms latency)</span>
      </div>
      <p className="text-xs text-slate-400">Background agents serving dynamic district learning, media editing, and PO arbitrage needs.</p>
    </div>
  );
}
