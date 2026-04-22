'use client';

import { useState } from "react";
import { motion } from "framer-motion";
import { Shield, Zap } from "lucide-react";
import { executeCognitiveSynthesis } from "@/lib/actions/wellness";

interface Props {
  biometrics: { currentHR: number; currentStressIndex: number; currentHRV: number };
  onProtocolComplete?: (result: string) => void;
}

export default function BurnoutShield({ biometrics, onProtocolComplete }: Props) {
  const [loading, setLoading] = useState(false);

  const activateShield = async () => {
    setLoading(true);
    try {
      const response = await executeCognitiveSynthesis({
        type: "burnout-shield",
        stressLevel: biometrics.currentStressIndex,
        heartRate: biometrics.currentHR,
        hrv: biometrics.currentHRV,
        focus: biometrics.currentStressIndex > 70 ? "Deep De-escalation" : "Moderate Reset"
      });

      if (response.success && response.data && onProtocolComplete) {
        onProtocolComplete(response.data);
      }
    } catch (error) {
      console.error("Failed to activate burnout shield:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8 bg-zinc-900 border border-zinc-700 rounded-3xl p-8 text-left">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-left w-full md:w-auto">
          <h2 className="text-2xl font-mono tracking-[0.4em] flex items-center gap-3 uppercase text-left">
            <Shield className="w-6 h-6 text-teal-400" />
            BURNOUT SHIELD
          </h2>
          <p className="text-zinc-400 text-sm mt-1 font-mono uppercase tracking-widest text-left">Dr. André Patterson Protocol</p>
        </div>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={activateShield}
          disabled={loading}
          className="w-full md:w-auto px-8 py-4 bg-teal-400 hover:bg-teal-300 disabled:bg-zinc-700 text-zinc-950 font-black uppercase tracking-widest rounded-2xl flex items-center justify-center gap-3 transition-colors"
        >
          <Zap className={`w-5 h-5 ${loading ? 'animate-pulse' : ''}`} />
          {loading ? "ACTIVATING..." : "ACTIVATE PROTOCOL"}
        </motion.button>
      </div>
    </div>
  );
}
