'use client';

import React from 'react';
import FloatingNavbar from '@/components/FloatingNavbar';
import Hero from '@/components/landing/Hero';
import DistrictIntelligenceScore from '@/components/landing/DistrictIntelligenceScore';
import PlatformActivity from '@/components/landing/PlatformActivity';
import HowItWorks from '@/components/landing/HowItWorks';
import CommunityStats from '@/components/landing/CommunityStats';
import PricingSection from '@/components/landing/PricingSection';
import Footer from '@/components/Footer';
import FounderDossier from '@/components/founder-dossier';

export default function LandingPageClient() {
    return (
        <div className="relative min-h-screen bg-slate-950 text-white overflow-x-hidden selection:bg-blue-500/30">
            {/* Navigation */}
            <FloatingNavbar />

            {/* Cinematic Background Layers */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-blue-900/10 via-slate-950 to-black" />
                <div className="scanline opacity-20" /> {/* CRT Scanline Effect */}
            </div>

            <main className="relative z-10 w-full overflow-x-hidden">
                {/* Hero Section - Reserved Space for LCP */}
                <div className="min-h-[80vh] md:min-h-screen flex flex-col items-center justify-center">
                    <Hero />
                </div>

                {/* Dashboard Preview Section - Reserved Space */}
                <section className="py-10 md:py-20 px-4 md:px-8 max-w-7xl mx-auto min-h-[600px]">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
                            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                            Live System Preview
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black text-white">
                            Command Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Digital District</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch min-h-[400px]">
                        <DistrictIntelligenceScore />
                        <PlatformActivity />
                    </div>
                </section>

                {/* How It Works - Reserved Space */}
                <div className="min-h-[500px]">
                    <HowItWorks />
                </div>

                {/* Founder Dossier - Reserved Space */}
                <section className="py-10 md:py-20 px-4 md:px-8 max-w-7xl mx-auto min-h-[700px]">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-5xl font-black text-white mb-6">
                            Architect of <span className="text-noble-gold">EdIntel Protocol</span>
                        </h2>
                    </div>
                    <FounderDossier />
                </section>

                {/* Community Stats - Reserved Space */}
                <div className="min-h-[200px]">
                    <CommunityStats />
                </div>

                {/* Pricing - Reserved Space */}
                <div className="min-h-[800px]">
                    <PricingSection />
                </div>
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
}
