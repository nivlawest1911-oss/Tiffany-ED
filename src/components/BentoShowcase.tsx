'use client';

import { motion } from 'framer-motion';
import {
    Globe
} from 'lucide-react';

// Import existing Bento Tiles
// We use dynamic imports or direct imports if they are lightweight enough
// But based on the file list, these are likely default exports

import ExecutiveDashboard from './bento/ExecutiveDashboard';
import NeuralTrainingCommand from './bento/LeadershipTraining';
import LeadershipGenerator from './bento/LeadershipGenerator';
import AvatarMasterclass from './bento/AvatarMasterclass';
import IEPGenerator from './bento/IEPGenerator';
import LessonPlanGenerator from './bento/LessonPlanGenerator';
import NeuralSyncGym from './bento/LeadershipGym';
import SovereignSocialUplink from './bento/ProfessionalSocialConnection';
import AutomatedIEPAudit from './bento/AutomatedIEPAudit';
import PricingMatrix from './bento/PricingMatrix';
import SovereignBroadcastNode from './bento/ProfessionalBroadcastCenter';

export default function BentoShowcase() {
    return (
        <section className="py-24 bg-black relative">
            <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-16 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-widest mb-6"
                    >
                        <Globe size={14} className="animate-spin-slow" />
                        EdIntel Ecosystem
                    </motion.div>
                    <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-6">
                        Operational <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">Modules</span>
                    </h2>
                    <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
                        A complete suite of autonomous agents, neural tools, and executive protocols designed for the modern educational sovereign.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 auto-rows-[300px] gap-6">
                    {/* 1. Executive Dashboard (Large) */}
                    <div className="col-span-1 md:col-span-2 row-span-2 rounded-3xl overflow-hidden border border-white/10 bg-zinc-950">
                        <ExecutiveDashboard />
                    </div>

                    {/* 2. Neural Training (Tall) */}
                    <div className="col-span-1 row-span-2 rounded-3xl overflow-hidden border border-white/10 bg-zinc-950">
                        <NeuralTrainingCommand />
                    </div>

                    {/* 3. Leadership Generator */}
                    <div className="col-span-1 row-span-1 rounded-3xl overflow-hidden border border-white/10 bg-zinc-950">
                        <LeadershipGenerator />
                    </div>

                    {/* 4. Avatar Masterclass */}
                    <div className="col-span-1 row-span-1 rounded-3xl overflow-hidden border border-white/10 bg-zinc-950">
                        <AvatarMasterclass />
                    </div>

                    {/* 5. IEP Generator (Large) */}
                    <div className="col-span-1 md:col-span-2 row-span-1 rounded-3xl overflow-hidden border border-white/10 bg-zinc-950">
                        <IEPGenerator />
                    </div>

                    {/* 6. Lesson Plan */}
                    <div className="col-span-1 row-span-1 rounded-3xl overflow-hidden border border-white/10 bg-zinc-950">
                        <LessonPlanGenerator />
                    </div>

                    {/* 7. Neural Sync Gym */}
                    <div className="col-span-1 row-span-1 rounded-3xl overflow-hidden border border-white/10 bg-zinc-950">
                        <NeuralSyncGym />
                    </div>

                    {/* 8. Pricing Matrix (Wide) */}
                    <div className="col-span-1 md:col-span-2 row-span-2 rounded-3xl overflow-hidden border border-white/10 bg-zinc-950">
                        <PricingMatrix />
                    </div>

                    {/* 9. Social Uplink */}
                    <div className="col-span-1 row-span-1 rounded-3xl overflow-hidden border border-white/10 bg-zinc-950">
                        <SovereignSocialUplink />
                    </div>

                    {/* 10. Automated Audit */}
                    <div className="col-span-1 row-span-1 rounded-3xl overflow-hidden border border-white/10 bg-zinc-950">
                        <AutomatedIEPAudit />
                    </div>

                    {/* 11. Broadcast Node */}
                    <div className="col-span-1 md:col-span-2 row-span-1 rounded-3xl overflow-hidden border border-white/10 bg-zinc-950">
                        <SovereignBroadcastNode />
                    </div>

                </div>
            </div>
        </section>
    );
}
