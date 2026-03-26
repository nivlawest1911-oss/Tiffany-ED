'use client';

import { motion } from 'framer-motion';
import {
    Globe
} from 'lucide-react';

// Import existing Bento Tiles
// We use dynamic imports or direct imports if they are lightweight enough
// But based on the file list, these are likely default exports

import dynamic from 'next/dynamic';

const ExecutiveDashboard = dynamic(() => import('./bento/ExecutiveDashboard'));
const NeuralTrainingCommand = dynamic(() => import('./bento/LeadershipTraining'));
const LeadershipGenerator = dynamic(() => import('./bento/LeadershipGenerator'));
const AvatarMasterclass = dynamic(() => import('./bento/AvatarMasterclass'));
const IEPGenerator = dynamic(() => import('./bento/IEPGenerator'));
const LessonPlanGenerator = dynamic(() => import('./bento/LessonPlanGenerator'));
const NeuralSyncGym = dynamic(() => import('./bento/LeadershipGym'));
const EdIntelSocialUplink = dynamic(() => import('@/components/dossier/ProfessionalSocialConnection'));
const AutomatedIEPAudit = dynamic(() => import('./bento/AutomatedIEPAudit'));
const PricingMatrix = dynamic(() => import('./bento/PricingMatrix'));
const EdIntelBroadcastNode = dynamic(() => import('@/components/dossier/ProfessionalBroadcastCenter'));

export default function BentoShowcase() {
    return (
        <section className="py-24 bg-black relative">
            <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-16 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-noble-gold/10 border border-noble-gold/20 text-noble-gold text-xs font-bold uppercase tracking-widest mb-6"
                    >
                        <Globe size={14} className="animate-spin-slow shadow-[0_0_8px_rgba(197,164,126,0.3)]" />
                        EdIntel Ecosystem
                    </motion.div>
                    <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-6">
                        Operational <span className="text-transparent bg-clip-text bg-gradient-to-r from-noble-gold to-amber-500">Modules</span>
                    </h2>
                    <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
                        A complete suite of autonomous agents, neural tools, and executive protocols designed for the modern educational EdIntel.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 auto-rows-[minmax(280px,auto)] gap-6">

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
                        <EdIntelSocialUplink />
                    </div>

                    {/* 10. Automated Audit */}
                    <div className="col-span-1 row-span-1 rounded-3xl overflow-hidden border border-white/10 bg-zinc-950">
                        <AutomatedIEPAudit />
                    </div>

                    {/* 11. Broadcast Node */}
                    <div className="col-span-1 md:col-span-2 row-span-1 rounded-3xl overflow-hidden border border-white/10 bg-zinc-950">
                        <EdIntelBroadcastNode />
                    </div>

                </div>
            </div>
        </section>
    );
}
