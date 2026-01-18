'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    BookOpen, GraduationCap, Scale, FileCheck, Library, Lightbulb,
    Compass, Download, ArrowUpRight, Shield as LucideShield, Landmark, BarChart3,
    Users, Settings, Briefcase, ExternalLink, Search, Sparkles, Lock
} from "lucide-react";
import { NeuralNewsTicker } from './NeuralNewsTicker';

const TEACHER_RESOURCES = {
    alabama: [
        {
            title: "ALCOS Standards",
            category: "Curriculum",
            desc: "Direct uplink to Alabama Course of Study standards for all grade levels.",
            link: "https://www.alabamaachieves.org/curriculum-instruction/standards/",
            icon: Library,
            color: "text-blue-500",
            bg: "bg-blue-500/10"
        },
        {
            title: "AL Literacy Act",
            category: "Compliance",
            desc: "Critical protocols for the Science of Reading and K-3 literacy benchmarks.",
            link: "https://www.alabamaachieves.org/academic-growth/alabama-literacy-act/",
            icon: FileCheck,
            color: "text-emerald-500",
            bg: "bg-emerald-500/10"
        },
        {
            title: "AMSTI Initiative",
            category: "STEM",
            desc: "Alabama Math, Science, and Technology Initiative. Research-based pedagogy.",
            link: "https://www.amsti.org/",
            icon: Lightbulb,
            color: "text-amber-500",
            bg: "bg-amber-500/10"
        },
        {
            title: "TIM / ATIC",
            category: "Technology",
            desc: "Technology in Motion. Empowering teachers with digital integration skills.",
            link: "https://www.alabamaachieves.org/teacher-center/technology-in-motion/",
            icon: Settings,
            color: "text-blue-400",
            bg: "bg-blue-400/10"
        }
    ],
    mobile: [
        {
            name: "Schoology Mobile",
            type: "LMS",
            detail: "Digital classroom architecture for MCPSS student engagement.",
            icon: Compass
        },
        {
            name: "TALC Portal",
            type: "Instructional",
            detail: "Teacher and Leaders Center professional learning protocols.",
            icon: GraduationCap
        },
        {
            name: "Frontline Education",
            type: "Operations",
            detail: "Absence management and professional growth tracking.",
            icon: Briefcase
        },
        {
            name: "MCPSS Curriculum Maps",
            type: "Instructional",
            detail: "Grade-specific pacing guides and instructional priorities.",
            icon: BookOpen
        },
        {
            name: "AMSTI Mobile Hub",
            type: "STEM Support",
            detail: "Regional material support and specialized STEM coaching.",
            icon: Lightbulb
        }
    ]
};

const ADMIN_RESOURCES = {
    alabama: [
        {
            title: "CLAS Leadership",
            category: "Professional",
            desc: "Council for Leaders in Alabama Schools. Elite training and advocacy.",
            link: "https://www.clasleaders.org/",
            icon: Landmark,
            color: "text-amber-500",
            bg: "bg-amber-500/10"
        },
        {
            title: "ALSDE Finance",
            category: "Operations",
            desc: "LEA Accounting and state financial transparency protocols.",
            link: "https://www.alabamaachieves.org/lea-accounting/",
            icon: BarChart3,
            color: "text-indigo-500",
            bg: "bg-indigo-500/10"
        },
        {
            title: "Cognia Excellence",
            category: "Accreditation",
            desc: "Standardized protocols for school improvement and national accreditation.",
            link: "https://www.cognia.org/",
            icon: LucideShield,
            color: "text-rose-500",
            bg: "bg-rose-500/10"
        },
        {
            title: "SES Protocols",
            category: "Special Ed",
            desc: "Special Education Services leadership and compliance standards.",
            link: "https://www.alabamaachieves.org/special-education/",
            icon: Users,
            color: "text-teal-500",
            bg: "bg-teal-500/10",
            tag: "IDEA Compliance"
        },
        {
            title: "AASSP / AAESA",
            category: "Leadership",
            desc: "Secondary and Elementary Administrator Associations. Local school leadership.",
            link: "https://www.clasleaders.org/",
            icon: GraduationCap,
            color: "text-orange-500",
            bg: "bg-orange-500/10"
        },
        {
            title: "SSA Alabama",
            category: "Executive",
            desc: "School Superintendents of Alabama. District-level strategic advocacy.",
            link: "https://www.ssaonline.org/",
            icon: Landmark,
            color: "text-blue-600",
            bg: "bg-blue-600/10"
        },
        {
            title: "ALSDE Report Card",
            category: "Accountability",
            desc: "State-wide district and school-level achievement data and analytics.",
            link: "https://www.alabamaachieves.org/reports-data/school-performance/",
            icon: BarChart3,
            color: "text-rose-500",
            bg: "bg-rose-500/10",
            tag: "Federal Requirement"
        },
        {
            title: "ARI / AMSTI Oversight",
            category: "State Literacy",
            desc: "Administrative dashboards for monitoring literacy and STEM implementation.",
            link: "https://www.alabamaachieves.org/academic-growth/",
            icon: Lightbulb,
            color: "text-emerald-500",
            bg: "bg-emerald-500/10",
            tag: "Governor's Mandate"
        }
    ],
    mobile: [
        {
            name: "MCPSS District Portal",
            type: "Admin Node",
            detail: "Executive district communications and administrative protocols.",
            icon: Settings
        },
        {
            name: "Board of School Comm.",
            type: "Governance",
            detail: "Mobile County public school board policies and meeting archives.",
            icon: Landmark
        },
        {
            name: "District Title Hub",
            type: "Federal Progs",
            detail: "Title I, II, and IV compliance and funding management.",
            icon: Briefcase,
            tag: "Mandatory"
        },
        {
            name: "MCPSS Capital Projects",
            type: "Facilities",
            detail: "Updates on district-wide construction and facility upgrades.",
            icon: Landmark
        },
        {
            name: "Executive Staffing",
            type: "HR Leadership",
            detail: "Strategic recruitment and high-level evaluation protocols.",
            icon: Users,
            tag: "Critical"
        },
        {
            name: "MCPSS Legal & Risk",
            type: "Compliance",
            detail: "District liability protocols and legal advisory services.",
            icon: LucideShield,
            tag: "High Priority"
        },
        {
            name: "District Safety Node",
            type: "Security",
            detail: "Crisis management and physical security infrastructure.",
            icon: Lock,
            tag: "Urgent"
        }
    ]
};

export default function SovereignResourceMatrix() {
    const [mode, setMode] = useState<'teacher' | 'admin'>('teacher');
    const [searchQuery, setSearchQuery] = useState('');

    const data = mode === 'teacher' ? TEACHER_RESOURCES : ADMIN_RESOURCES;

    const filteredAlabama = data.alabama.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.desc.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filteredMobile = data.mobile.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.detail.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <section className="bg-black relative overflow-hidden">
            <NeuralNewsTicker />

            <div className="absolute inset-0 z-0 opacity-20">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-600/10 rounded-full blur-[150px]" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-[120px]" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-400 text-[10px] font-bold uppercase tracking-[0.3em] mb-4">
                            <Library size={12} className="text-indigo-400" />
                            <span>Resource Intelligence Matrix</span>
                        </div>
                        <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none mb-4">
                            Sovereign <br /> <span className="text-zinc-600 italic">Protocols.</span>
                        </h2>
                        <p className="text-zinc-500 max-w-xl text-sm leading-relaxed">
                            Access elite resources tailored for {mode === 'teacher' ? 'Alabama Educators' : 'Alabama Administrators'}. Switch the uplink mode to scan regional protocols.
                        </p>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search Protocols..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full md:w-64 bg-zinc-900 border border-white/5 rounded-2xl px-6 py-3 text-[10px] text-white focus:outline-none focus:border-indigo-500/50 transition-all font-bold tracking-widest uppercase placeholder:text-zinc-600"
                            />
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500">
                                <Search size={14} />
                            </div>
                        </div>

                        <div className="inline-flex p-1 bg-zinc-900 border border-white/5 rounded-2xl shadow-2xl">
                            <button
                                onClick={() => setMode('teacher')}
                                className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${mode === 'teacher' ? 'bg-indigo-600 text-white' : 'text-zinc-500 hover:text-white'}`}
                            >
                                Teacher Mode
                            </button>
                            <button
                                onClick={() => setMode('admin')}
                                className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${mode === 'admin' ? 'bg-indigo-600 text-white' : 'text-zinc-500 hover:text-white'}`}
                            >
                                Admin Mode
                            </button>
                        </div>
                    </div>
                </div>

                <div className="mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        key={mode}
                        className="p-1 rounded-[2rem] bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-emerald-500/20 border border-white/5"
                    >
                        <div className="bg-black/80 backdrop-blur-3xl rounded-[1.9rem] p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="flex items-center gap-6">
                                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 shrink-0">
                                    <Sparkles className="w-6 h-6 text-indigo-400" />
                                </div>
                                <div>
                                    <div className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.3em] mb-1">Strategic Focus</div>
                                    <h4 className="text-white font-bold text-lg">
                                        {mode === 'teacher' ? 'Alabama Literacy Act Compliance' : 'CLAS Executive Leadership Session'}
                                    </h4>
                                    <p className="text-zinc-500 text-xs">
                                        {mode === 'teacher'
                                            ? 'Ensure your classroom architecture aligns with the latest Science of Reading benchmarks.'
                                            : 'Elite professional development tracks for district-wide administrative excellence.'}
                                    </p>
                                </div>
                            </div>
                            <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-indigo-500/20">
                                View Focus Protocol
                            </button>
                        </div>
                    </motion.div>
                </div>

                <div className="grid lg:grid-cols-12 gap-16 items-start">
                    {/* Left: Local Nodes */}
                    <div className="lg:col-span-4 space-y-6">
                        <h3 className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.3em] mb-4">Mobile County Active Nodes</h3>
                        <div className="space-y-4">
                            {filteredMobile.map((item, i) => (
                                <motion.div
                                    key={`${mode}-m-${i}`}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    whileHover={{ x: 5 }}
                                    className="p-6 rounded-2xl bg-zinc-900/40 border border-white/5 hover:border-indigo-500/20 transition-all flex items-center gap-5 group"
                                >
                                    <div className="p-3 rounded-xl bg-white/5 group-hover:bg-indigo-500/10 transition-colors">
                                        <item.icon className="w-5 h-5 text-zinc-500 group-hover:text-indigo-400 transition-colors" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-0.5">
                                            <div className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest">{item.type}</div>
                                            {item.tag && (
                                                <span className="text-[8px] font-black bg-indigo-500/10 text-indigo-400 px-1.5 py-0.5 rounded border border-indigo-500/20 uppercase tracking-tighter">
                                                    {item.tag}
                                                </span>
                                            )}
                                        </div>
                                        <div className="text-sm font-bold text-white mb-1">{item.name}</div>
                                        <div className="text-[10px] text-zinc-600 leading-tight">{item.detail}</div>
                                    </div>
                                    <ArrowUpRight size={14} className="text-zinc-700 group-hover:text-indigo-400 transition-colors" />
                                </motion.div>
                            ))}
                        </div>

                        <div className="mt-8 p-8 rounded-[2rem] bg-indigo-500/5 border border-indigo-500/10">
                            <div className="flex items-center gap-3 mb-4 text-indigo-400">
                                <Lightbulb size={20} />
                                <span className="text-xs font-bold uppercase tracking-widest">Sovereign Tip</span>
                            </div>
                            <p className="text-xs text-zinc-500 leading-relaxed italic">
                                "The {mode === 'teacher' ? 'Teacher' : 'Admin'} matrix is updated in real-time with MCPSS policy changes. Issue a neural directive to the Sovereign Delegate for deep analysis of any protocol."
                            </p>
                        </div>
                    </div>

                    {/* Right: State Resources */}
                    <div className="lg:col-span-8">
                        <h3 className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.3em] mb-8 px-2">Alabama Strategic Protocols</h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            <AnimatePresence mode="popLayout">
                                {filteredAlabama.map((item, i) => (
                                    <motion.a
                                        key={`${mode}-a-${i}`}
                                        href={item.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="group relative p-8 rounded-[3rem] bg-zinc-900/30 border border-white/5 hover:border-white/10 transition-all duration-500 overflow-hidden"
                                    >
                                        <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-white/5 to-transparent group-hover:via-indigo-500/30 transition-all" />

                                        <div className="flex justify-between items-start mb-10">
                                            <div className={`p-4 rounded-2xl ${item.bg} border border-white/5 group-hover:scale-110 transition-transform`}>
                                                <item.icon className={`w-6 h-6 ${item.color}`} />
                                            </div>
                                            <div className="p-2 rounded-full bg-white/5 border border-white/5 text-zinc-600 group-hover:text-white transition-colors">
                                                <ExternalLink size={14} />
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between mb-2">
                                            <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{item.category}</div>
                                            {item.tag && (
                                                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/5 border border-white/10">
                                                    <div className="w-1 h-1 rounded-full bg-indigo-500 animate-pulse" />
                                                    <span className="text-[8px] font-black text-indigo-400 uppercase tracking-[0.15em]">{item.tag}</span>
                                                </div>
                                            )}
                                        </div>
                                        <h4 className="text-2xl font-black text-white mb-4 group-hover:text-indigo-400 transition-colors leading-tight">{item.title}</h4>
                                        <p className="text-zinc-500 text-sm leading-relaxed mb-8">
                                            {item.desc}
                                        </p>

                                        <div className="flex items-center gap-2 text-[10px] font-black text-white uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0">
                                            <span>Initiate Uplink</span>
                                            <Download size={12} className="text-indigo-400" />
                                        </div>
                                    </motion.a>
                                ))}
                            </AnimatePresence>
                        </div>

                        <div className="mt-8 p-10 rounded-[3rem] bg-white/5 border border-white/5 flex flex-col md:flex-row items-center justify-between gap-10">
                            <div className="flex gap-6 items-start">
                                <div className="p-4 bg-indigo-500/10 rounded-2xl">
                                    <Landmark className="w-8 h-8 text-indigo-400" />
                                </div>
                                <div className="max-w-md">
                                    <h4 className="text-white font-bold text-lg leading-tight mb-2">Legislative & Compliance Feed</h4>
                                    <p className="text-zinc-500 text-sm">Access the full archive of ALSDE legislative updates and Montgomery session summaries relevant to district leadership.</p>
                                </div>
                            </div>
                            <button className="px-8 py-4 bg-white text-black font-black text-xs uppercase tracking-widest rounded-full hover:scale-105 active:scale-95 transition-all shadow-xl shadow-white/5">
                                Access Archives
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
