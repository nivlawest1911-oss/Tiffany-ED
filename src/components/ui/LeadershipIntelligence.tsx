'use client';
import { useState } from 'react';
import { HeartPulse, BrainCircuit, Loader2 } from 'lucide-react';

export default function LeadershipIntelligence() {
  const [input, setInput] = useState('');
  const [advice, setAdvice] = useState('');
  const [loading, setLoading] = useState(false);

  const reframeSituation = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/eq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rawSituation: input, stakeholder: 'Staff', intensity: 'Medium' }),
      });
      const data = await res.json();
      setAdvice(data.output);
    } catch(e) { setAdvice("System timeout."); }
    finally { setLoading(false); }
  };

  return (
    <div className="p-6 rounded-3xl bg-gradient-to-br from-zinc-900 to-zinc-800 text-white border border-zinc-700 shadow-2xl">
      <div className="flex items-center gap-2 mb-6 text-pink-400">
        <HeartPulse size={20} />
        <h3 className="font-bold">Leadership Intelligence</h3>
      </div>
      <div className="space-y-4">
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
          <textarea 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Describe a stressful situation..."
            className="w-full bg-transparent border-none outline-none text-sm resize-none h-20"
          />
          <button onClick={reframeSituation} disabled={loading} className="w-full mt-2 py-3 bg-pink-600 rounded-xl text-xs font-bold flex justify-center items-center gap-2">
            {loading ? <Loader2 size={14} className="animate-spin" /> : <BrainCircuit size={14} />} Reframe Situation
          </button>
        </div>
        {advice && <div className="p-4 rounded-2xl bg-pink-500/10 text-xs animate-in fade-in">{advice}</div>}
      </div>
    </div>
  );
}
