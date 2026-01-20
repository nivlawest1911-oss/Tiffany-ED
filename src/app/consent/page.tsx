'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  FileText,
  CheckCircle,
  AlertTriangle,
  ChevronRight,
  Scale,
  Fingerprint,
  Building2,
  Stamp,
  Download
} from 'lucide-react';
import Navbar from '@/components/Navbar';

export default function ParentalOptIn() {
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate secure archive commit
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    setSubmitted(true);
  };

  function ProtocolHash() {
    const [hash, setHash] = useState("GENERATING...");

    useEffect(() => {
      setHash(`SB101-COMMIT-#${Math.random().toString(36).substring(7).toUpperCase()}`);
    }, []);

    return (
      <p className="mt-16 text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
        Protocol Hash: {hash}
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 transition-colors duration-500">
      <Navbar />

      <main className="max-w-4xl mx-auto px-6 py-16">
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden"
            >
              {/* Header Section */}
              <div className="p-10 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 flex flex-col md:flex-row items-center gap-8">
                <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center shadow-xl shadow-blue-500/20 rotate-3">
                  <Scale size={40} className="text-white" />
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-black tracking-tighter uppercase leading-none mb-2 font-geist-sans">
                    Alabama <span className="text-blue-600">SB 101</span> Compliance
                  </h1>
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="px-3 py-1 bg-zinc-200 dark:bg-zinc-800 rounded-full text-[10px] font-black uppercase tracking-widest text-zinc-600 dark:text-zinc-400 border border-zinc-300 dark:border-zinc-700">
                      Mental Health Services Opt-In (FY26)
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-blue-600 dark:text-blue-400 font-bold">
                      <Building2 size={14} /> Continuous Learning Center Vault
                    </div>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="p-10 space-y-10">
                {/* Regulatory Notice */}
                <div className="p-6 rounded-2xl bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/50 flex gap-4">
                  <AlertTriangle className="text-amber-600 shrink-0" size={24} />
                  <p className="text-sm text-amber-900 dark:text-amber-500 font-medium leading-relaxed">
                    As per <span className="font-bold underline">Alabama Act 2025-455</span>, written parental permission is required for students under 16 to receive school counseling services. Digital signatures in this vault carry full institutional authority under Alabama Code § 16-1-58.
                  </p>
                </div>

                {/* Services Toggle */}
                <div className="space-y-4">
                  <h3 className="text-xs font-black uppercase tracking-widest text-zinc-400 px-2">Authorized Protocol Access</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { id: 'bh', label: 'Individual Behavioral Coaching', desc: 'CLC-Specific Protocols' },
                      { id: 'mh', label: 'Mental Health Screeners', desc: 'Universal Assessments' },
                      { id: 'sel', label: 'Social-Emotional Learning', desc: 'Small Group Support' },
                      { id: 'ep', label: 'Emergency Psychological', desc: 'Grief/Threat Response' }
                    ].map((service) => (
                      <label key={service.id} className="relative flex items-start gap-4 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 hover:border-blue-500/50 cursor-pointer transition-all group hover:bg-zinc-50 dark:hover:bg-zinc-950/50">
                        <div className="relative flex items-center h-5">
                          <input
                            type="checkbox"
                            required={service.id !== 'ep'}
                            defaultChecked={true}
                            className="w-5 h-5 rounded-lg border-zinc-300 dark:border-zinc-700 text-blue-600 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <span className="block text-sm font-bold text-zinc-900 dark:text-zinc-200 group-hover:text-blue-600 transition-colors">{service.label}</span>
                          <span className="block text-[10px] text-zinc-500 uppercase font-mono mt-1">{service.desc}</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Identity Verification */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-xs font-black uppercase tracking-widest text-zinc-400 px-2">Guardian Legal Name</label>
                    <input
                      type="text"
                      required
                      placeholder="FULL LEGAL SIGNATURE"
                      className="w-full px-5 py-4 bg-zinc-50 dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 font-bold uppercase tracking-widest text-sm"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-black uppercase tracking-widest text-zinc-400 px-2">Student Identification</label>
                    <input
                      type="text"
                      required
                      placeholder="FULL STUDENT NAME"
                      className="w-full px-5 py-4 bg-zinc-50 dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 font-bold uppercase tracking-widest text-sm"
                    />
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  disabled={isLoading}
                  type="submit"
                  className="w-full py-6 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-[2rem] font-black text-lg uppercase tracking-[0.2em] shadow-2xl flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      Archiving Consent...
                    </>
                  ) : (
                    <>
                      <Fingerprint size={24} /> Digitally Sign Protocol
                    </>
                  )}
                </motion.button>

                <p className="text-center text-[10px] text-zinc-400 font-medium uppercase tracking-widest">
                  Encryption: AES-256 // Secure Institutional Hash
                </p>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-blue-500/30 p-16 text-center shadow-3xl relative overflow-hidden"
            >
              {/* Success Backdrop */}
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500" />
              <div className="absolute inset-0 bg-blue-500/5 pointer-events-none" />

              <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-10 shadow-xl shadow-blue-500/20">
                <CheckCircle size={48} className="text-white" />
              </div>

              <h2 className="text-4xl font-black tracking-tighter uppercase mb-4">Consent Archived</h2>
              <p className="text-zinc-500 text-lg font-medium leading-relaxed max-w-lg mx-auto mb-12 italic">
                "The digital signature has been verified and committed to the Continuous Learning Center vault. Protocols are now synchronized."
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button className="px-8 py-4 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:scale-105 transition-transform">
                  <Download size={16} /> Download Copy (PDF)
                </button>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-8 py-4 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 rounded-2xl font-black text-xs uppercase tracking-widest hover:text-zinc-900 dark:hover:text-white"
                >
                  Modify Existing Consent
                </button>
              </div>

              Protocol Hash: <ProtocolHash />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="py-12 border-t border-zinc-100 dark:border-zinc-900 opacity-40 text-center">
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">
          Professional Governance Center // Mobile County Branch
        </p>
      </footer>
    </div>
  );
}
