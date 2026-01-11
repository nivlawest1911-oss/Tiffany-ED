'use client';
import { useEffect, useState, Suspense } from 'react';
import { jsPDF } from 'jspdf';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Download, Edit2, Save, X } from 'lucide-react';
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
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 p-8 md:p-12 transition-colors duration-500">
        <div className="max-w-4xl mx-auto space-y-8">

          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-black tracking-tight uppercase">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600">Executive</span> Strategic Archive
              </h1>
              {/* Simulated Auth Welcome */
                <p className="text-zinc-500 dark:text-zinc-400 font-medium mt-1">Welcome, Executive Director</p>
              }
            </div>

            <button
              onClick={clearHistory}
              className="px-4 py-2 bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-red-500/20 transition-colors flex items-center gap-2"
            >
              <Trash2 size={14} /> Reset Vault
            </button>
          </div>

          <div className="h-px bg-zinc-200 dark:bg-zinc-800" />

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-6 h-6 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
              <span className="ml-3 text-sm font-bold text-zinc-400 uppercase tracking-widest">Decrypting Records...</span>
            </div>
          ) : (
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="space-y-6"
            >
              {audits.map((audit) => (
                <motion.div
                  key={audit.id}
                  variants={item}
                  className="group relative p-6 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-xl hover:border-amber-500/30 transition-all duration-300"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-amber-500/80 bg-amber-500/10 px-2 py-1 rounded-full">
                        {audit.targetSchool || 'District Office'}
                      </span>
                      <span className="ml-3 text-xs text-zinc-400 font-mono">
                        {audit.timestamp?.toDate().toLocaleString()}
                      </span>
                    </div>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => downloadPDF(audit)} className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg text-zinc-500 transition-colors"><Download size={16} /></button>
                      <button onClick={() => { setEditingId(audit.id); setFeedbackText(audit.executiveCorrection || ''); }} className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg text-zinc-500 transition-colors"><Edit2 size={16} /></button>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold mb-2 text-zinc-800 dark:text-zinc-200">{audit.executivePrompt}</h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">{audit.strategicOutput}</p>

                  {editingId === audit.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-800"
                    >
                      <textarea
                        className="w-full p-3 text-sm bg-zinc-50 dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none transition-all"
                        rows={3}
                        placeholder="Enter executive notes..."
                        value={feedbackText}
                        onChange={(e) => setFeedbackText(e.target.value)}
                      />
                      <div className="flex justify-end gap-2 mt-2">
                        <button onClick={() => setEditingId(null)} className="px-3 py-1.5 text-xs font-bold text-zinc-500 hover:text-zinc-900">Cancel</button>
                        <button onClick={() => saveFeedback(audit.id)} className="px-3 py-1.5 bg-amber-500 text-white rounded-lg text-xs font-bold flex items-center gap-1 hover:bg-amber-600 transition-colors">
                          <Save size={12} /> Save
                        </button>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))}
              {audits.length === 0 && (
                <div className="text-center py-20 text-zinc-400">
                  <p>No strategic records found in the vault.</p>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </AdminGuard>
  );
}
