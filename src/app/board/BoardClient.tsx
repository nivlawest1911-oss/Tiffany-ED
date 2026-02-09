'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import AuditChart from '@/components/AuditChart';
import ResourceMap from '@/components/ResourceMap';
import BoardReport from '@/components/BoardReport';
import RevenueDashboard from '@/components/RevenueDashboard';
import GovernanceEngine from '@/components/GovernanceEngine';
import BurnoutHeatmap from '@/components/BurnoutHeatmap';

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
};

export default function BoardClient() {
    return (
        <motion.main
            initial="hidden"
            animate="show"
            variants={container}
            className="content-stage"
        >
            <div className="max-w-6xl mx-auto space-y-12">
                <motion.header variants={item} className="text-center space-y-4 relative pt-6">
                    {/* Strategic Kente Lattice */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-[2px] flex overflow-hidden opacity-40">
                        {Array.from({ length: 20 }).map((_, i) => (
                            <div key={i} className={`flex-1 h-full ${i % 4 === 0 ? 'bg-amber-500' : i % 4 === 1 ? 'bg-emerald-600' : i % 4 === 2 ? 'bg-rose-600' : 'bg-black'}`} />
                        ))}
                    </div>

                    <div className="inline-flex items-center px-4 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-widest">
                        Read-Only Executive Summary
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight text-zinc-900 dark:text-white">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">EdIntel</span> Strategic Oversight
                    </h1>
                    <p className="text-lg text-zinc-500 dark:text-zinc-400 font-medium">Mobile County District Data Visualization - Project Alpha</p>
                </motion.header>

                <div className="grid grid-cols-1 gap-12">
                    <motion.section variants={item} className="space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="h-8 w-1 bg-blue-500 rounded-full" />
                            <h2 className="text-2xl font-bold tracking-tight">Audit Activity Trends</h2>
                        </div>
                        <div className="p-6 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-xl shadow-zinc-200/50 dark:shadow-none">
                            <AuditChart />
                        </div>
                    </motion.section>

                    <motion.section variants={item} className="space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="h-8 w-1 bg-red-500 rounded-full" />
                            <h2 className="text-2xl font-bold tracking-tight">Administrative Load</h2>
                        </div>
                        <BurnoutHeatmap />
                    </motion.section>

                    <motion.section variants={item} className="space-y-8">
                        <div className="flex items-center gap-4">
                            <div className="h-8 w-1 bg-zinc-900 dark:bg-zinc-500 rounded-full" />
                            <h2 className="text-2xl font-bold tracking-tight">Resource Support Hotspots</h2>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="p-6 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-xl shadow-zinc-200/50 dark:shadow-none">
                                <BoardReport />
                            </div>
                            <div className="p-6 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-xl shadow-zinc-200/50 dark:shadow-none">
                                <RevenueDashboard />
                            </div>
                        </div>

                        <div className="p-6 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-xl shadow-zinc-200/50 dark:shadow-none">
                            <ResourceMap />
                        </div>
                    </motion.section>

                    <motion.section variants={item} className="space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="h-8 w-1 bg-[#d4af37] rounded-full" />
                            <h2 className="text-2xl font-bold tracking-tight">Parliamentary Protocol</h2>
                        </div>
                        <GovernanceEngine />
                    </motion.section>
                </div>

                <motion.footer variants={item} className="pt-12 mt-12 border-t border-zinc-200 dark:border-zinc-800 text-center">
                    <p className="text-sm text-zinc-400 font-medium">
                        Powered by EdIntel AI Twin Technology | Dr. West Leadership Suite
                    </p>
                    <Link href="/login" className="inline-block mt-4 text-xs font-bold text-zinc-300 hover:text-blue-500 transition-colors uppercase tracking-widest">
                        Executive Portal Login
                    </Link>
                </motion.footer>
            </div>
        </motion.main>
    );
}
