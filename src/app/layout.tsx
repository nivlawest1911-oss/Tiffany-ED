'use client';
import './globals.css';
import MorphicNeuralMesh from '@/components/Visuals/MorphicNeuralMesh';
import SynapticToast from '@/components/Visuals/Notifications/SynapticToast';
import { motion, AnimatePresence } from 'framer-motion';

export default function SovereignLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-white antialiased overflow-x-hidden font-sans">
        <MorphicNeuralMesh />
        <SynapticToast />
        <main className="relative z-10 min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
// Deployment Timestamp: 12/25/2025 05:03:19
