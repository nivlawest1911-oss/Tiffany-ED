import { cookies } from 'next/headers';
import { Sparkles } from 'lucide-react';
import React from 'react';
import FeaturesContent from './FeaturesContent';

export const metadata = {
    title: 'EdIntel Professional - Features',
    description: 'Explore the powerful AI features of EdIntel Professional.',
};

export const dynamic = 'force-dynamic';

export default async function FeaturesLanding() {
    await cookies(); // Force dynamic rendering
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 relative overflow-hidden">
            {/* Animated background - Static CSS for better LCP */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
                <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-2000" />
            </div>

            <div className="relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-0 text-center">
                    {/* Hero Icon - Static bounce for LCP */}
                    <div className="inline-flex p-4 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg shadow-purple-500/50 mb-8 animate-bounce">
                        <Sparkles className="w-12 h-12 text-white" />
                    </div>

                    <h1 className="text-6xl md:text-7xl font-bold text-white mb-6">
                        EdIntel <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Professional</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-purple-200 mb-8 max-w-3xl mx-auto">
                        Transform education with AI-powered tools. Generate IEPs, lesson plans, and more in seconds.
                    </p>
                </div>

                {/* Client Content (Buttons + Rest) */}
                <FeaturesContent />
            </div>
        </div>
    );
}
