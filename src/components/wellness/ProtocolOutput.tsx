"use client";

import { motion } from "framer-motion";
import { Shield, CheckCircle } from "lucide-react";

interface Props {
  result: string;
}

export default function ProtocolOutput({ result }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-12 bg-zinc-900 border border-teal-400/30 rounded-3xl p-8 shadow-2xl"
    >
      <div className="flex items-center gap-4 mb-6">
        <Shield className="w-8 h-8 text-teal-400" />
        <h2 className="text-2xl font-mono tracking-[0.4em]">PATTERSON PROTOCOL</h2>
        <CheckCircle className="w-6 h-6 text-teal-400" />
      </div>

      <div className="prose prose-invert max-w-none">
        <div className="bg-zinc-950 border border-zinc-700 rounded-2xl p-6 text-zinc-300 leading-relaxed whitespace-pre-wrap">
          {result}
        </div>
      </div>

      <p className="text-xs text-teal-400/70 font-mono tracking-widest mt-8 text-center uppercase">
        NEURAL RESET COMPLETE • VAGUS TONE IMPROVED
      </p>
    </motion.div>
  );
}
