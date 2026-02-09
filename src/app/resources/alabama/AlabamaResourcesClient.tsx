'use client';

import { motion } from 'framer-motion';
import {
    ExternalLink,
    Building2,
    GraduationCap,
    ShieldAlert,
    Info,
    ArrowRight,
    MapPin,
    Globe,
    Scale
} from 'lucide-react';
import React, { useState } from 'react';
import HolographicBriefing from '@/components/HolographicBriefing';

interface Resource {
    title: string;
    description: string;
    url: string;
    category: 'State' | 'District' | 'Policy' | 'Community';
    icon: React.ReactNode;
}

export default function AlabamaResourcesClient() {
    const [showBriefing, setShowBriefing] = useState(false);
    const resources: Resource[] = [
        {
            title: "Alabama State Dept of Education",
            description: "Official ALSDE portal for certifications, state standards, and academic achievement data.",
            url: "https://www.alabamaachieves.org/",
            category: 'State',
            icon: <Globe className="text-blue-500" size={20} />
        },
        {
            title: "Mobile County Public Schools",
            description: "Direct link to MCPSS board policies, employee resources, and district-wide announcements.",
            url: "https://www.mcpss.com/",
            category: 'District',
            icon: <Building2 className="text-emerald-500" size={20} />
        },
        {
            title: "Alabama Insight (IDEA)",
            description: "The primary node for Special Education compliance, IEP requirements, and Alabama Insight data.",
            url: "https://insight.alsde.edu/",
            category: 'Policy',
            icon: <Scale className="text-amber-500" size={20} />
        },
        {
            title: "Mobile Area Chamber of Commerce",
            description: "Educational initiatives and business-sector partnerships for local schools.",
            url: "https://mobilechamber.com/",
            category: 'Community',
            icon: <GraduationCap className="text-purple-500" size={20} />
        },
        {
            title: "ALSDE Mastering the Maze",
            description: "Official 2025 guidelines for Special Education process and legal compliance.",
            url: "https://www.alabamaachieves.org/special-education/",
            category: 'Policy',
            icon: <ShieldAlert className="text-red-500" size={20} />
        }
    ];

    return (
        <main className="content-stage">
            {/* Geometric Background Decals */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-[150px] rounded-full" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-600/10 blur-[150px] rounded-full" />
            </div>

            <div className="relative z-10 max-w-6xl mx-auto py-12">
                {/* Header Section */}
                <div className="mb-20 space-y-6">
                    <div className="flex items-center gap-3 text-blue-500 font-black uppercase tracking-[0.3em] text-xs">
                        <MapPin size={14} /> Regional Command Center
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-none italic">
                        Alabama <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-500">Resource Hub</span>
                    </h1>
                    <p className="text-zinc-500 max-w-2xl text-lg font-medium leading-relaxed">
                        Access official state mandates, district portals, and legal frameworks critical for the EdIntel Professional Pilot and Institutional Compliance.
                    </p>

                    <HolographicBriefing
                        isOpen={showBriefing}
                        onClose={() => setShowBriefing(false)}
                        agentId="strategic"
                        title="Regional Hub Briefing"
                        description="Connecting to the Alabama Strategic Node. We have indexed official resources from ALSDE and local districts to ensure your institutional alignment."
                        briefingSteps={[
                            "Sync with Alabama Department of Education standards.",
                            "Map Mobile County Public School policies.",
                            "Review Special Education legal frameworks.",
                            "Access community-sector partnership nodes."
                        ]}
                    />

                    <button
                        onClick={() => setShowBriefing(true)}
                        className="mt-4 px-6 py-2 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-400 text-[9px] font-black uppercase tracking-[0.3em] hover:bg-blue-500/10 transition-all"
                    >
                        Initialize Regional Briefing
                    </button>
                </div>

                {/* Categories */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {resources.map((res, i) => (
                        <motion.a
                            key={i}
                            href={res.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            whileHover={{ y: -5 }}
                            viewport={{ once: true }}
                            className="group p-8 rounded-[2rem] bg-zinc-900/40 border border-zinc-800 hover:border-blue-500/50 hover:bg-zinc-900 transition-all shadow-2xl relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                                <ExternalLink size={20} className="text-blue-500" />
                            </div>

                            <div className="relative z-10">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 rounded-2xl bg-zinc-800 border border-zinc-700 flex items-center justify-center group-hover:bg-blue-600/20 group-hover:border-blue-500/30 transition-colors">
                                        {res.icon}
                                    </div>
                                    <div>
                                        <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 group-hover:text-blue-400 transition-colors">{res.category}</span>
                                        <h3 className="text-xl font-bold text-white group-hover:text-blue-500 transition-colors">{res.title}</h3>
                                    </div>
                                </div>
                                <p className="text-sm text-zinc-500 leading-relaxed font-medium mb-8">
                                    {res.description}
                                </p>
                                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-blue-500 opacity-60 group-hover:opacity-100 transition-opacity">
                                    Initialize Secure Link <ArrowRight size={14} />
                                </div>
                            </div>
                        </motion.a>
                    ))}
                </div>

                {/* Footer Insight */}
                <div className="mt-20 p-10 rounded-[2.5rem] bg-gradient-to-br from-blue-600/10 to-transparent border border-blue-500/20 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex items-center gap-6">
                        <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center shadow-xl shadow-blue-500/20">
                            <Info size={32} className="text-white" />
                        </div>
                        <div>
                            <p className="text-lg font-bold text-white">Missing a Regional Center?</p>
                            <p className="text-sm text-zinc-400">Request the addition of local AL educational frameworks for better AI grounding.</p>
                        </div>
                    </div>
                    <button className="px-8 py-4 bg-white text-black rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-transform whitespace-nowrap">
                        Submit Resource Center
                    </button>
                </div>
            </div>
        </main>
    );
}
