'use client';

import FloatingNavbar from '@/components/FloatingNavbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Crown, Award, Users, TrendingUp, Shield, Zap } from 'lucide-react';

export default function ProfessionalCenterClient() {
    const features = [
        { icon: Crown, title: 'Executive Leadership', description: 'Advanced AI tools for district-level decision making' },
        { icon: Award, title: 'Professional Development', description: 'Continuous learning and certification programs' },
        { icon: Users, title: 'Collaborative Network', description: 'Connect with educational leaders nationwide' },
        { icon: TrendingUp, title: 'Performance Analytics', description: 'Data-driven insights for strategic planning' },
        { icon: Shield, title: 'Compliance Management', description: 'Stay ahead of regulatory requirements' },
        { icon: Zap, title: 'Rapid Implementation', description: 'Get started in minutes, not months' },
    ];

    return (
        <div className="min-h-screen bg-black">
            <FloatingNavbar />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-4 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.1),transparent_70%)]" />

                <div className="max-w-6xl mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-6">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">New Professional Hub</span>
                        </div>

                        <h1 className="text-6xl md:text-7xl font-black text-white mb-6 tracking-tight">
                            Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Center</span>
                        </h1>

                        <p className="text-xl text-zinc-400 max-w-3xl mx-auto mb-12">
                            Elevate your educational leadership with AI-powered tools, professional development, and a nationwide network of innovative educators.
                        </p>

                        <div className="flex flex-wrap justify-center gap-4">
                            <button className="px-8 py-4 bg-white text-black rounded-xl font-bold hover:scale-105 transition-transform">
                                Get Started
                            </button>
                            <button className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-xl font-bold hover:bg-white/10 transition-all">
                                Learn More
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-20 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-zinc-900/50 border border-white/10 rounded-2xl p-6 hover:border-purple-500/30 transition-all"
                            >
                                <feature.icon className="w-12 h-12 text-purple-400 mb-4" />
                                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                                <p className="text-zinc-400">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
