'use client';
import { useState } from 'react';
import { HeartPulse, BrainCircuit, Loader2, Sparkles, ShieldAlert, Cpu } from 'lucide-react';
import { useIntelligence } from '@/context/IntelligenceContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function LeadershipIntelligence() {
  const [input, setInput] = useState('');
  const [advice, setAdvice] = useState('');
  const [loading, setLoading] = useState(false);
  const { isRescueOneActive, addAction } = useIntelligence();

  const reframeSituation = async () => {
    if (!input) return;
    setLoading(true);
    try {
      const res = await fetch('/api/eq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          rawSituation: input, 
          stakeholder: 'Leadership', 
          intensity: isRescueOneActive ? 'High-Velocity' : 'Medium' 
        }),
      });
      const data = await res.json();
      setAdvice(data.output);
      addAction(isRescueOneActive ? "Strategic Reframe Applied - Emergency Protocol" : "Cognitive Reframe Engine Executed");
    } catch(e) { 
      setAdvice("System timeout. Please re-engage."); 
    } finally { 
      setLoading(false); 
    }
  };

  return (
    <div className={`relative overflow-hidden p-6 rounded-[2.5rem] border transition-all duration-500 bg-[#050505]/60 backdrop-blur-3xl shadow-2xl ${
      isRescueOneActive ? 'border-rose-500/30 shadow-rose-900/10' : 'border-white/5 group-hover:border-white/10 shadow-black'
    }`}>
      {/* Background HUD Decorations */}
      <div className="absolute -bottom-10 -left-10 opacity-[0.03] text-pink-500 pointer-events-none">
        <Cpu size={200} />
      </div>

      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${
            isRescueOneActive ? 'bg-rose-500 text-white shadow-[0_0_20px_rgba(244,63,94,0.4)]' : 'bg-pink-500/10 text-pink-400'
          }`}>
            <BrainCircuit size={24} />
          </div>
          <div>
            <h3 className="font-black text-white text-sm uppercase tracking-[0.2em]">Cognitive Reframe</h3>
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-0.5 italic">Executive Emotional Intelligence</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 rounded-full">
            <div className={`w-1.5 h-1.5 rounded-full ${isRescueOneActive ? 'bg-rose-500 animate-pulse' : 'bg-pink-400'}`} />
            <span className="text-[8px] font-black text-zinc-400 uppercase tracking-widest">Neural Link Active</span>
        </div>
      </div>

      <div className="space-y-6 relative z-10">
        <div className="relative group/input">
          <textarea 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Outline a stressful institutional scenario..."
            className="w-full bg-white/5 border border-white/10 rounded-3xl p-5 text-sm text-zinc-300 placeholder:text-zinc-700 outline-none focus:bg-white/10 focus:border-white/20 transition-all resize-none h-32 custom-scrollbar"
          />
          <div className="absolute bottom-4 right-4 flex items-center gap-2 opacity-20 pointer-events-none">
            <span className="text-[8px] font-mono uppercase tracking-[0.3em]">SECURE_INPUT</span>
          </div>
        </div>

        <button 
            onClick={reframeSituation} 
            disabled={loading || !input} 
            className={`w-full py-4 rounded-2xl text-xs font-black uppercase tracking-[0.3em] flex justify-center items-center gap-3 transition-all relative overflow-hidden group ${
                isRescueOneActive 
                    ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-[0_0_30px_rgba(244,63,94,0.2)]' 
                    : 'bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white shadow-lg'
            }`}
        >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 opacity-20" />
            {loading ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} className="group-hover:rotate-12 transition-transform" />} 
            {isRescueOneActive ? 'ANALYZE TACTICAL REFRAME' : 'Reframe Situation'}
        </button>

        <AnimatePresence>
            {advice && (
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`p-6 rounded-[2rem] border transition-all duration-500 relative ${
                        isRescueOneActive 
                            ? 'bg-rose-500/10 border-rose-500/30 shadow-[0_0_20px_rgba(244,63,94,0.05)]' 
                            : 'bg-white/5 border-white/10'
                    }`}
                >
                    <div className="flex items-center gap-2 mb-4">
                        <HeartPulse size={14} className={isRescueOneActive ? 'text-rose-500' : 'text-pink-400'} />
                        <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Tactical Clarity Output</span>
                    </div>
                    <div className={`text-[13px] leading-relaxed font-medium ${isRescueOneActive ? 'text-rose-100' : 'text-zinc-300'}`}>
                        {advice}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
      </div>
    </div>
  );
}
