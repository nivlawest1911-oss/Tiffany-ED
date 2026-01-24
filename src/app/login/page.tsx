'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import Link from 'next/link';
import { Lock, Mail, ArrowRight, ShieldCheck as LucideShield, Hexagon } from 'lucide-react';
import HolographicBriefing from '@/components/HolographicBriefing';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [showBriefing, setShowBriefing] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  // Mouse Tracking Logic for Neural Grid
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - window.innerWidth / 2);
      mouseY.set(e.clientY - window.innerHeight / 2);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setError('');

    try {
      await login(email, password);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Authentication Protocol Failed');
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050507] p-4 relative overflow-hidden selection:bg-indigo-500/30">
      {/* 🌌 Neural Command Grid */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div
          style={{ x: springX, y: springY }}
          className="absolute inset-[-10%] opacity-20"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.15)_0%,transparent_70%)]" />
          <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '100px 100px' }} />
          <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.01) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.01) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
        </motion.div>

        {/* Floating Orbs */}
        <motion.div
          animate={{ x: [0, 100, 0], y: [0, -50, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{ x: [0, -100, 0], y: [0, 80, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px]"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-xl bg-zinc-900/40 backdrop-blur-3xl rounded-[3.5rem] p-12 lg:p-16 border border-white/5 shadow-[0_0_100px_rgba(0,0,0,0.8)] relative z-10"
      >
        {/* Corner Accents */}
        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
          <Hexagon size={240} className="rotate-12" />
        </div>

        <header className="text-center mb-16 relative">
          <motion.div
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.6 }}
            className="w-24 h-24 bg-gradient-to-br from-indigo-500/20 to-purple-600/20 rounded-[2rem] flex items-center justify-center mx-auto mb-10 border border-white/10 shadow-2xl relative"
          >
            <LucideShield size={48} className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]" />
            <div className="absolute inset-0 rounded-[2rem] border border-white/20 animate-pulse" />
          </motion.div>

          <h2 className="text-5xl font-black tracking-tighter text-white uppercase mb-4">
            Sovereign <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 font-black">Portal</span>
          </h2>
          <div className="flex items-center justify-center gap-6">
            <div className="h-[2px] w-12 bg-gradient-to-r from-transparent to-indigo-500/50" />
            <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.5em] whitespace-nowrap">Gatekeeper Protocol // v4.2</p>
            <div className="h-[2px] w-12 bg-gradient-to-l from-transparent to-indigo-500/50" />
          </div>
        </header>

        <HolographicBriefing
          isOpen={showBriefing}
          onClose={() => setShowBriefing(false)}
          title="Guardian Protocol"
          description="Establishing a secure administrative downlink. Identity verification is required for access to the Sovereign Data Grid. Please provide your institutional credentials to bypass the sentinel layers."
          role="Gatekeeper Sentinel"
          avatarImage="/images/avatars/executive_leader.png"
          stats={{ time: "1.2ms", saved: "ACTIVE", accuracy: "100%" }}
        />

        {error && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-12 p-6 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-[10px] font-bold text-center rounded-2xl uppercase tracking-widest leading-relaxed"
          >
            <span className="opacity-50 mr-2">[!]</span> {error}
          </motion.div>
        )}

        <form onSubmit={handleLogin} className="space-y-10">
          <div className="space-y-6">
            <div className="relative group">
              <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-indigo-400 transition-colors" size={20} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="EXECUTIVE EMAIL"
                className="w-full pl-16 pr-8 py-6 bg-black/20 border border-white/5 rounded-2xl outline-none focus:border-indigo-500/40 focus:bg-black/40 transition-all font-bold text-xs tracking-widest placeholder:text-zinc-700 text-white"
                required
              />
            </div>

            <div className="relative group">
              <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-indigo-400 transition-colors" size={20} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="AUTHORIZATION KEY"
                className="w-full pl-16 pr-8 py-6 bg-black/20 border border-white/5 rounded-2xl outline-none focus:border-indigo-500/40 focus:bg-black/40 transition-all font-bold text-xs tracking-widest placeholder:text-zinc-700 text-white"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoggingIn}
            className="group relative w-full overflow-hidden rounded-2xl bg-white p-6 font-black text-xs uppercase tracking-[0.4em] text-black transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 shadow-2xl shadow-indigo-500/20"
          >
            <div className="relative z-10 flex items-center justify-center gap-4">
              {isLoggingIn ? 'Establishing Link...' : 'Enter Command Deck'}
              <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform duration-500" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-100 via-white to-white opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>

          <button
            type="button"
            onClick={() => setShowBriefing(true)}
            className="w-full text-center text-[10px] font-black uppercase tracking-widest text-zinc-600 hover:text-indigo-400 transition-colors"
          >
            Initiate Identification Briefing
          </button>
        </form>

        <div className="relative my-14">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/5" />
          </div>
          <div className="relative flex justify-center text-[9px] font-black uppercase tracking-[0.4em]">
            <span className="px-6 bg-[#121215] text-zinc-600 rounded-full border border-white/5 py-1">Secondary Gateway</span>
          </div>
        </div>

        <p className="text-center text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
          New Executive? <Link href="/signup" className="text-indigo-400 hover:text-white transition-colors ml-2 border-b border-indigo-500/30">Initialize Identity Sync</Link>
        </p>
      </motion.div>

      {/* Regulatory Footer */}
      <div className="absolute bottom-12 left-0 right-0 text-center opacity-20 pointer-events-none">
        <p className="text-[9px] font-black uppercase tracking-[0.5em] text-zinc-500">
          Sovereign v4.2.0 // Neural Engine: GPT-4o // Alabama Compliance Matrix Active
        </p>
      </div>
    </div>
  );
}

