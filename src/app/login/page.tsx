'use client';
import { useState } from 'react';
import { auth } from '@/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/archive');
    } catch (err: any) {
      setError('Invalid Executive Credentials. Access denied.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-black p-4 relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-[120px] pointer-events-none animate-pulse-slow" />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "backOut" }}
        className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-[2.5rem] p-10 shadow-2xl relative z-10 border border-zinc-200 dark:border-zinc-800"
      >
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-blue-500/10 dark:bg-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 transform rotate-3">
            <ShieldCheck size={32} className="text-blue-600 dark:text-blue-400" />
          </div>
          <h2 className="text-3xl font-black tracking-tighter text-zinc-900 dark:text-white uppercase mb-2">EdIntel Portal</h2>
          <p className="text-sm font-bold text-zinc-500 uppercase tracking-widest">District Executive Login</p>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mb-8 p-4 bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs font-bold text-center rounded-xl uppercase tracking-wider"
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-zinc-400 hidden">Executive Email</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-blue-500 transition-colors" size={18} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="EXECUTIVE EMAIL"
                className="w-full pl-12 pr-4 py-4 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium text-sm placeholder:text-zinc-400 dark:text-white"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-zinc-400 hidden">Access Key</label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-blue-500 transition-colors" size={18} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="ACCESS KEY"
                className="w-full pl-12 pr-4 py-4 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium text-sm placeholder:text-zinc-400 dark:text-white"
                required
              />
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-black text-sm uppercase tracking-[0.2em] shadow-lg shadow-blue-900/30 flex items-center justify-center gap-2"
          >
            Secure Sign In <ArrowRight size={16} />
          </motion.button>
        </form>

        <p className="text-center mt-10 text-xs font-medium text-zinc-400">
          New Executive? <a href="/signup" className="text-blue-500 hover:text-blue-400 font-bold uppercase tracking-wide ml-1 transition-colors">Initialize Protocol</a>
        </p>
      </motion.div>
    </div>
  );
}
