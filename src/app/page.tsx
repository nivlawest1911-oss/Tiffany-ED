'use client';
import { useState } from 'react';
import { districtData } from '@/utils/districtData';
import CommandBridge from '@/components/Navigation/CommandBridge';
import SovereignExecutiveHUD from '@/components/Admin/SovereignExecutiveHUD';
import VibeMeter from '@/components/Teacher/VibeMeter/VibeMeter';
import ParentProsperityHUD from '@/components/Public/ParentHUD/ParentProsperityHUD';
import { motion, AnimatePresence } from 'framer-motion';

export default function DashboardSwitcher() {
  const [activeView, setActiveView] = useState('admin');
  const [liveStats] = useState(districtData.stats);

  return (
    <div className="max-w-7xl mx-auto space-y-10 pb-32 pt-10 px-6">
      <div className="text-center mb-10">
        <motion.h1 
          initial={{ letterSpacing: "1em", opacity: 0 }}
          animate={{ letterSpacing: "0em", opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="text-6xl font-black italic tracking-tighter uppercase text-white leading-none"
        >
          Sovereign <span className="text-blue-500">State</span> Intel
        </motion.h1>
        <p className="text-gray-500 font-mono tracking-[1em] text-[10px] mt-6 uppercase">
          Mobile County: Synaptic Node {districtData.stats.literacyVelocity} Active
        </p>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeView}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
        >
          {activeView === 'admin' && <SovereignExecutiveHUD stats={liveStats} />}
          {activeView === 'teacher' && <VibeMeter schools={districtData.schools} />}
          {activeView === 'student' && <ParentProsperityHUD />}
        </motion.div>
      </AnimatePresence>

      <CommandBridge setView={setActiveView} activeView={activeView} />
    </div>
  );
}
