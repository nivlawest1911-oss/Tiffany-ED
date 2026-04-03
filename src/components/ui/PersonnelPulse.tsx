'use client';
import { useState } from 'react';
import { Activity, ShieldAlert, Loader2, Zap, AlertTriangle, Fingerprint } from 'lucide-react';
import { useIntelligence } from '@/context/IntelligenceContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function PersonnelPulse() {
  const [text, setText] = useState('');
  const [analysis, setAnalysis] = useState('');
  const [loading, setLoading] = useState(false);
  const { isRescueOneActive, addAction } = useIntelligence();

  const analyzeBurnout = async () => {
    if (!text) return;
    setLoading(true);
    try {
      const res = await fetch('/api/eq', { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          rawSituation: `Analyze this staff feedback: ${text}`, 
          stakeholder: 'Staff', 
          intensity: isRescueOneActive ? 'Extreme' : 'High' 
        })
      });
      const data = await res.json();
      setAnalysis(data.output);
      addAction(isRescueOneActive ? "Emergency Pulse Analysis Executed" : "Staff Sentiment Analysis Completed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`relative overflow-hidden p-6 rounded-[2.5rem] border transition-all duration-500 bg-[#050505]/60 backdrop-blur-3xl shadow-2xl ${
      isRescueOneActive ? 'border-rose-500/30' : 'border-white/5 group-hover:border-white/10'
    }`}>
      {/* HUD Background Decorations */}
      <div className="absolute top-0 right-0 p-8 opacity-[0.02] pointer-events-none">
        <Fingerprint size={120} />
      </div>

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-colors ${
            isRescueOneActive ? 'bg-rose-500 text-white' : 'bg-emerald-500/10 text-emerald-400'
          }`}>
            <Activity size={20} />
          </div>
          <div>
            <h3 className="font-black text-white text-xs uppercase tracking-[0.2em]">Bio-Dynamic Pulse</h3>
            <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest mt-0.5">Staff Neutralizer & Burnout Monitor</p>
          </div>
        </div>

        {isRescueOneActive && (
          <motion.div 
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="flex items-center gap-1 px-3 py-1 bg-rose-500/10 border border-rose-500/30 rounded-full"
          >
            <AlertTriangle className="w-3 h-3 text-rose-500" />
            <span className="text-[8px] font-black text-rose-500 uppercase tracking-widest leading-none">High Crisis Vector</span>
          </motion.div>
        )}
      </div>
      
      <div className="relative group/textarea">
        <textarea 
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste anonymized staff feedback or transcripts..."
          className="w-full h-32 p-4 text-[11px] font-medium leading-relaxed rounded-3xl bg-black/40 text-zinc-300 border border-white/5 focus:border-white/10 outline-none resize-none transition-all placeholder:text-zinc-700 custom-scrollbar"
        />
        <div className="absolute top-3 right-3 text-[8px] font-mono text-zinc-800 uppercase tracking-widest">Aide_Buffer_v1.2</div>
      </div>
      
      <button 
        onClick={analyzeBurnout}
        disabled={loading || !text}
        className={`w-full mt-4 h-12 flex justify-center items-center gap-2 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all relative overflow-hidden ${
          isRescueOneActive 
            ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-[0_0_20px_rgba(225,29,72,0.3)]' 
            : 'bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white border border-white/5'
        }`}
      >
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div 
              key="loading"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <Loader2 className="w-4 h-4 animate-spin" />
            </motion.div>
          ) : (
            <motion.div 
              key="idle"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="flex items-center gap-2"
            >
              {isRescueOneActive ? <Zap className="w-3 h-3" /> : <ShieldAlert className="w-3 h-3 text-emerald-400" />}
              <span>{isRescueOneActive ? 'EXECUTE EMERGENCY ASSESSMENT' : 'Evaluate Stability Risk'}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </button>

      <AnimatePresence>
        {analysis && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-6 p-5 rounded-3xl text-[11px] leading-relaxed transition-all relative overflow-hidden border ${
              isRescueOneActive 
                ? 'bg-rose-500/5 text-rose-100 border-rose-500/20' 
                : 'bg-emerald-500/5 text-emerald-50/70 border-emerald-500/10'
            }`}
          >
            <div className={`absolute top-0 left-0 w-1 h-full ${isRescueOneActive ? 'bg-rose-500' : 'bg-emerald-500'}`} />
            <div className="flex items-center gap-2 mb-2">
                <div className={`w-1.5 h-1.5 rounded-full ${isRescueOneActive ? 'bg-rose-500' : 'bg-emerald-400'}`} />
                <span className="text-[8px] font-black uppercase tracking-widest opacity-60">Intelligence Synthesis</span>
            </div>
            {analysis}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
