'use client';
import { useState } from 'react';
import { Activity, ShieldAlert, Loader2 } from 'lucide-react';

export default function PersonnelPulse() {
  const [text, setText] = useState('');
  const [analysis, setAnalysis] = useState('');
  const [loading, setLoading] = useState(false);

  const analyzeBurnout = async () => {
    setLoading(true);
    // Note: We'll reuse the EQ or a new Admin endpoint
    try {
      const res = await fetch('/api/eq', { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rawSituation: `Analyze this staff feedback: ${text}`, stakeholder: 'Staff', intensity: 'High' })
      });
      const data = await res.json();
      setAnalysis(data.output);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm">
      <div className="flex items-center gap-2 mb-4 text-orange-500">
        <Activity size={20} />
        <h3 className="font-bold text-zinc-900 dark:text-white text-sm">Personnel Sentiment</h3>
      </div>
      
      <textarea 
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste anonymized staff feedback..."
        className="w-full h-24 p-3 text-xs rounded-xl bg-zinc-50 dark:bg-zinc-950 border-none outline-none resize-none"
      />
      
      <button 
        onClick={analyzeBurnout}
        disabled={loading || !text}
        className="w-full mt-3 py-2 bg-orange-500/10 text-orange-600 dark:text-orange-400 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-orange-500/20 transition-all flex justify-center items-center gap-2"
      >
        {loading ? <Loader2 size={12} className="animate-spin" /> : <ShieldAlert size={12} />}
        Check Burnout Risk
      </button>

      {analysis && (
        <div className="mt-4 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 text-[10px] leading-relaxed opacity-80 border-l-2 border-orange-500">
          {analysis}
        </div>
      )}
    </div>
  );
}
