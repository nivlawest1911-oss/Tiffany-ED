'use client';
import { motion } from 'framer-motion';
import { Check, ShieldCheck, Zap } from 'lucide-react';
import { stripeConfig } from '@/utils/stripeConfig';

export default function SovereignPricingHUD() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto py-20">
      {stripeConfig.plans.map((plan, i) => (
        <motion.div 
          key={plan.id}
          whileHover={{ y: -10 }}
          className="glass-card p-10 rounded-[3rem] border border-white/10 flex flex-col relative overflow-hidden"
        >
          {i === 1 && <div className="absolute top-0 right-0 bg-blue-600 px-6 py-2 rounded-bl-3xl font-black text-[10px] uppercase tracking-widest">Recommended</div>}
          
          <div className="mb-8">
            <h3 className="text-3xl font-black italic uppercase text-white">{plan.name}</h3>
            <div className="flex items-baseline gap-2 mt-4">
              <span className="text-6xl font-black text-blue-500">${plan.price}</span>
              <span className="text-gray-500 font-mono text-xs uppercase tracking-widest">/ {plan.interval}</span>
            </div>
          </div>

          <ul className="space-y-4 mb-10 flex-1">
            {plan.features.map((feature, idx) => (
              <li key={idx} className="flex items-center gap-3 text-sm text-gray-300">
                <Check size={16} className="text-emerald-500" />
                {feature}
              </li>
            ))}
          </ul>

          <button className="w-full py-6 bg-white text-black rounded-2xl font-black uppercase tracking-[0.4em] text-[10px] hover:bg-blue-600 hover:text-white transition-all">
            Initialize node
          </button>
        </motion.div>
      ))}
    </div>
  );
}
