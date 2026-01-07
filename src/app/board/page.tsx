'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import AuditChart from '@/components/AuditChart';
import ResourceMap from '@/components/ResourceMap';
import BoardReport from '@/components/BoardReport';
import RevenueDashboard from '@/components/RevenueDashboard';

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

export default function BoardView() {
  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={container}
      className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 font-sans p-8 md:p-12 transition-colors duration-500"
    >
      <div className="max-w-6xl mx-auto space-y-12">
        <motion.header variants={item} className="text-center space-y-4">
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
    </motion.div>
  );
}
