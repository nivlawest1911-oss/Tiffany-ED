'use client';
import PremiumPricingTable from '@/components/PremiumPricingTable';
import CircadianFilter from '@/components/graphics/CircadianFilter';
import { Shield as LucideShield, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function PricingClient() {
    return (
        <main className="min-h-screen bg-black transition-colors duration-500 pb-20">
            <CircadianFilter />

            <div className="max-w-7xl mx-auto px-6 pt-12">
                {/* Minimal Header */}
                <div className="flex items-center justify-between mb-8">
                    <Link href="/" className="flex items-center gap-2 group text-zinc-500 hover:text-zinc-300 transition-colors">
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="text-xs font-bold uppercase tracking-widest">Return to Command</span>
                    </Link>

                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-noble-gold rounded-lg flex items-center justify-center shadow-lg shadow-noble-gold/20">
                            <LucideShield className="text-black" size={14} />
                        </div>
                        <span className="text-sm font-black tracking-tight uppercase text-white">EdIntel Professional</span>
                    </div>
                </div>

                <PremiumPricingTable />
            </div>
        </main>
    );
}
