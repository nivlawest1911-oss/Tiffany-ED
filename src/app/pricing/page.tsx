'use client';
import PricingMatrix from '@/components/bento/PricingMatrix';
import CircadianFilter from '@/components/graphics/CircadianFilter';
import { Shield as LucideShield, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-black transition-colors duration-500 pb-20">
      <CircadianFilter />

      <div className="max-w-7xl mx-auto px-6 pt-12">
        {/* Minimal Header */}
        <div className="flex items-center justify-between mb-16">
          <Link href="/" className="flex items-center gap-2 group text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-xs font-bold uppercase tracking-widest">Return to Command</span>
          </Link>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <LucideShield className="text-white" size={14} />
            </div>
            <span className="text-sm font-black tracking-tight uppercase">EdIntel Professional</span>
          </div>
        </div>

        <PricingMatrix />
      </div>
    </main>
  );
}
