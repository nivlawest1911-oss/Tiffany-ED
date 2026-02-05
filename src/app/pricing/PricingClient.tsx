'use client';
import PricingMatrix from '@/components/bento/PricingMatrix';
import CircadianFilter from '@/components/graphics/CircadianFilter';
import { Shield as LucideShield } from 'lucide-react';

export default function PricingClient() {
    return (
        <main className="min-h-screen bg-black transition-colors duration-500 pb-20">
            <CircadianFilter />

            <div className="max-w-7xl mx-auto px-6 pt-12">
                {/* Minimal Header */}
                <div className="mb-8 hidden">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-intel-gold/10 rounded-xl flex items-center justify-center border border-intel-gold/30">
                            <LucideShield className="text-intel-gold" size={20} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black tracking-tight uppercase text-white italic">Professional Protocol</h2>
                            <p className="text-[10px] text-zinc-600 uppercase tracking-widest font-black">Secure Deployment Tier</p>
                        </div>
                    </div>
                </div>

                <PricingMatrix />
            </div>
        </main>
    );
}
