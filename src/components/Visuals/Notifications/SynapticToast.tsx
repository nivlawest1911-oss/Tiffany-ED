'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
}

export default function SynapticToast({ message, type = 'info' }: ToastProps) {
  return (
    <div className="fixed bottom-8 right-8 z-50">
      <div className="bg-blue-500/10 border border-blue-500/20 backdrop-blur-md px-6 py-3 rounded-full flex items-center gap-3">
        <Sparkles className="w-4 h-4 text-blue-400" />
        <span className="text-sm font-mono text-blue-100 uppercase tracking-widest">{message}</span>
      </div>
    </div>
  );
}