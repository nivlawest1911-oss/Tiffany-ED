'use client';
import { useState, Suspense } from 'react';
import { jsPDF } from 'jspdf';
import { motion } from 'framer-motion';
import { Trash2, Download, Edit2, Save, Database, Lock, FileText } from 'lucide-react';
import AdminGuard from '@/components/AdminGuard';
import SuccessBadge from '@/components/SuccessBadge';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const item = {
  hidden: { opacity: 0, scale: 0.95 },
  show: { opacity: 1, scale: 1 }
};

// SIMULATED DATA FOR FREE TIER
const DEMO_AUDITS = [
  { id: '1', timestamp: { toDate: () => new Date() }, content: 'Strategic Alignment: 98%. Fiscal Projection: Stable. Recommendation: Proceed with Phase 2 hiring.', executiveCorrection: '' },
  { id: '2', timestamp: { toDate: () => new Date(Date.now() - 86400000) }, content: 'Curriculum Audit: Gaps identified in Grade 4 Math. Proposed solution: AI-driven intervention modules.', executiveCorrection: 'Approved.' }
];

export default function ExecutiveArchive() {
  const [audits, setAudits] = useState<any[]>(DEMO_AUDITS);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [feedbackText, setFeedbackText] = useState('');

  const fetchAudits = async () => {
    // No-op in simulated mode
  };

  const clearHistory = async () => {
    if (!confirm('⚠️ CRITICAL: Are you sure you want to permanently delete all archived audits? This cannot be undone.')) return;
    setAudits([]);
    alert('Strategic Vault Reset Successfully (Simulated).');
  };

  const saveFeedback = async (id: string) => {
    setAudits(prev => prev.map(a => a.id === id ? { ...a, executiveCorrection: feedbackText } : a));
    setEditingId(null);
    fetchAudits(); // Re-sync (simulated)
  };


  const downloadPDF = (audit: any) => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text('EdIntel Strategic Memo', 20, 20);
    const strategy = doc.splitTextToSize(audit.strategicOutput, 170);
    doc.text(strategy, 20, 50);
    doc.save('Audit_Export.pdf');
  };

  return (
    <AdminGuard>
      <Suspense fallback={null}><SuccessBadge /></Suspense>
      <div className="min-h-screen bg-black text-white p-8 md:p-12 transition-colors duration-500 relative overflow-hidden">
        {/* Kente Pattern Top Strip */}
        <div className="absolute top-0 left-0 w-full h-1.5 flex overflow-hidden opacity-50">
          {Array.from({ length: 40 }).map((_, i) => (
            <div key={i} className={`flex-1 h-full ${i % 4 === 0 ? 'bg-kente-yellow' : i % 4 === 1 ? 'bg-kente-green' : i % 4 === 2 ? 'bg-kente-red' : 'bg-black'}`} />
          ))}
        </div>

        {/* Ambient Glow */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/5 blur-[120px] pointer-events-none" />

        <div className="max-w-5xl mx-auto space-y-12 relative z-10">

          <div className="flex flex-col md:flex-row items-center justify-between gap-8 border-b border-white/5 pb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-noble-gold/10 border border-noble-gold/20 text-noble-gold text-[10px] font-black uppercase tracking-widest mb-4">
                <Database size={10} /> Strategic Vault Access
              </div>
              <h1 className="text-4xl md:text-6xl font-black tracking-tight uppercase leading-none">
                EXECUTIVE <span className="text-transparent bg-clip-text bg-gradient-to-r from-noble-gold to-amber-600">ARCHIVE</span>
              </h1>
              <p className="text-zinc-500 font-medium mt-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Welcome, Executive Director. Your strategic grid is synchronized.
              </p>
            </div>

            <button
              onClick={clearHistory}
              className="px-6 py-3 bg-red-500/10 text-red-500 border border-red-500/20 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-red-500 hover:text-white transition-all flex items-center gap-3 shadow-xl shadow-red-500/10"
            >
              <Trash2 size={16} /> Purge Vault Records
            </button>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-32 gap-6">
              <div className="relative w-20 h-20">
                <div className="absolute inset-0 rounded-full border-2 border-noble-gold/20 animate-ping" />
                <div className="absolute inset-0 rounded-full border-t-2 border-noble-gold animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Lock className="text-noble-gold w-8 h-8" />
                </div>
              </div>
              <span className="text-[10px] font-black text-noble-gold uppercase tracking-[0.4em] animate-pulse">Decrypting Records...</span>
            </div>
          ) : (
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="grid gap-8"
            >
              {audits.map((audit) => (
                <motion.div
                  key={audit.id}
                  variants={item}
                  className="group relative p-8 bg-zinc-900/40 backdrop-blur-xl rounded-[2.5rem] border border-white/5 hover:border-noble-gold/30 transition-all duration-500 overflow-hidden"
                >
                  {/* Subtle Gradient Hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-noble-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="flex justify-between items-start mb-6 relative z-10">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-zinc-950 border border-white/10 flex items-center justify-center text-noble-gold group-hover:scale-110 transition-transform">
                        <FileText size={20} />
                      </div>
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-noble-gold bg-noble-gold/10 px-3 py-1 rounded-full border border-noble-gold/20 leading-none">
                          {audit.targetSchool || 'District Office'}
                        </span>
                        <p className="text-[10px] text-zinc-500 font-mono mt-1 uppercase">
                          DECIPHERED: {audit.timestamp?.toDate().toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => downloadPDF(audit)} className="p-3 bg-zinc-950/50 hover:bg-white text-zinc-400 hover:text-black rounded-xl border border-white/5 transition-all"><Download size={18} /></button>
                      <button onClick={() => { setEditingId(audit.id); setFeedbackText(audit.executiveCorrection || ''); }} className="p-3 bg-zinc-950/50 hover:bg-white text-zinc-400 hover:text-black rounded-xl border border-white/5 transition-all"><Edit2 size={18} /></button>
                    </div>
                  </div>

                  <div className="relative z-10">
                    <h3 className="text-xl font-bold mb-3 text-white tracking-tight">{audit.executivePrompt || 'Automated Strategic Evaluation'}</h3>
                    <p className="text-sm text-zinc-400 leading-relaxed mb-6 font-medium">{audit.strategicOutput || audit.content}</p>

                    {audit.executiveCorrection && (
                      <div className="p-4 rounded-2xl bg-noble-gold/5 border border-noble-gold/10 mb-4">
                        <span className="text-[8px] font-black text-noble-gold uppercase tracking-[0.3em] block mb-1">Executive Override Note:</span>
                        <p className="text-xs text-zinc-300 italic">"{audit.executiveCorrection}"</p>
                      </div>
                    )}

                    {editingId === audit.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-6 pt-6 border-t border-white/5"
                      >
                        <textarea
                          className="w-full p-5 text-sm bg-black border border-white/10 rounded-2xl focus:ring-2 focus:ring-noble-gold outline-none transition-all text-white placeholder:text-zinc-700 font-medium"
                          rows={3}
                          placeholder="Enter strategic corrections or notes..."
                          value={feedbackText}
                          onChange={(e) => setFeedbackText(e.target.value)}
                        />
                        <div className="flex justify-end gap-3 mt-4">
                          <button onClick={() => setEditingId(null)} className="px-6 py-2 text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-white transition-colors">Discard changes</button>
                          <button onClick={() => saveFeedback(audit.id)} className="px-8 py-3 bg-white text-black rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-noble-gold transition-colors shadow-lg">
                            <Save size={14} /> Synchronize Note
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              ))}
              {audits.length === 0 && (
                <div className="text-center py-32 bg-zinc-900/20 rounded-[3rem] border border-dashed border-white/10">
                  <div className="w-20 h-20 bg-zinc-900 rounded-full flex items-center justify-center mx-auto mb-6 text-zinc-700">
                    <Database size={40} />
                  </div>
                  <h4 className="text-xl font-bold text-zinc-500 uppercase tracking-tight">Vault Depleted</h4>
                  <p className="text-sm text-zinc-600 mt-2">No strategic records found in the current temporal grid.</p>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </AdminGuard>
  );
}
