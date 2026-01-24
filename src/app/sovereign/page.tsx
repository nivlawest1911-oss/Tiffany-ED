'use client';

import FloatingNavbar from '@/components/FloatingNavbar';
import Footer from '@/components/Footer';
import SovereignCore from '@/components/SovereignCore';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { Shield, Lock, Zap, Brain, Network, Database, Eye, Cpu } from 'lucide-react';

const SovereignDirector = dynamic(() => import('@/components/SovereignDirector'), { ssr: false });

export default function SovereignPage() {
    const features = [
        {
            icon: Shield,
            title: 'Sovereign Security',
            description: 'Military-grade encryption and data sovereignty for your educational institution'
        },
        {
            icon: Brain,
            title: 'Neural Processing',
            description: 'Advanced AI algorithms that learn and adapt to your district\'s unique needs'
        },
        {
            icon: Network,
            title: 'Data Integration',
            description: 'Seamlessly connects and organizes data from all your educational systems'
        },
        {
            icon: Lock,
            title: 'Privacy First',
            description: 'FERPA-compliant with zero-knowledge architecture protecting student data'
        },
        {
            icon: Zap,
            title: 'Real-Time Processing',
            description: 'Instant insights and recommendations powered by distributed computing'
        },
        {
            icon: Database,
            title: 'Unified Data Lake',
            description: 'Transform tangled data into organized, actionable intelligence'
        },
        {
            icon: Eye,
            title: 'Predictive Analytics',
            description: 'Anticipate challenges and opportunities before they emerge'
        },
        {
            icon: Cpu,
            title: 'Edge Computing',
            description: 'Process data locally for maximum speed and security'
        }
    ];

    const stats = [
        { value: '99.99%', label: 'Uptime Guarantee' },
        { value: '<100ms', label: 'Response Time' },
        { value: '256-bit', label: 'Encryption' },
        { value: '24/7', label: 'Monitoring' }
    ];

    return (
        <div className="min-h-screen bg-black">
            <FloatingNavbar />

            {/* Hero Section with Sovereign Director */}
            <section className="relative pt-28 pb-12 px-4 overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <SovereignDirector
                        cinematicVideoSrc="/videos/heritage/alvin_west_doctoral_intro.mp4"
                        avatarName="Dr. Alvin West"
                    />
                </div>
            </section>

            {/* Introduction Section */}
            <section className="relative py-20 px-4 bg-gradient-to-b from-black via-blue-950/10 to-black">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                            The AI Core That Powers <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-600">Educational Excellence</span>
                        </h2>
                        <p className="text-xl text-zinc-400 leading-relaxed mb-8">
                            EdIntel SOVEREIGN is our revolutionary AI engine that transforms chaotic educational data into crystal-clear insights. Like a storm brewing in a server room, it processes miles of tangled information and activates with a pulse of golden intelligence.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <button className="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-xl font-bold hover:scale-105 transition-transform shadow-lg shadow-amber-500/50">
                                Activate SOVEREIGN
                            </button>
                            <button className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-xl font-bold hover:bg-white/10 transition-all">
                                Technical Specs
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Stats Bar */}
            <section className="py-12 px-4 bg-zinc-950/50 border-y border-white/10">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="text-center"
                            >
                                <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-600 mb-2">
                                    {stat.value}
                                </div>
                                <div className="text-sm text-zinc-400 uppercase tracking-wider font-bold">
                                    {stat.label}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-20 px-4">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl font-black text-white mb-4">
                            Core Capabilities
                        </h2>
                        <p className="text-xl text-zinc-400">
                            Eight pillars of sovereign AI technology
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-zinc-900/50 border border-white/10 rounded-2xl p-6 hover:border-amber-500/30 transition-all group"
                            >
                                <div className="relative mb-4">
                                    <feature.icon className="w-12 h-12 text-amber-400 group-hover:scale-110 transition-transform" />
                                    <motion.div
                                        className="absolute inset-0 bg-amber-400/20 rounded-full blur-xl"
                                        animate={{ opacity: [0.2, 0.4, 0.2] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    />
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                                <p className="text-sm text-zinc-400">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* The Activation Story */}
            <section className="py-20 px-4 bg-gradient-to-b from-black via-amber-950/10 to-black">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="bg-zinc-900/50 border border-amber-500/20 rounded-3xl p-12"
                    >
                        <h3 className="text-3xl font-black text-white mb-6">The Activation</h3>
                        <div className="space-y-6 text-zinc-300 leading-relaxed">
                            <p>
                                <span className="text-amber-400 font-bold">Scene 1: The Grid</span> — A storm brewing in a server room. Miles of tangled blue wires representing unorganized data stretch across a dark, vast digital landscape.
                            </p>
                            <p>
                                <span className="text-amber-400 font-bold">Scene 2: The Activation</span> — A pulse of gold light ripples from the center. The crystalline core appears—solid, metallic, heavy. The SOVEREIGN engine awakens, transforming chaos into clarity.
                            </p>
                            <p className="text-white font-bold">
                                This is EdIntel SOVEREIGN. This is the future of educational AI.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="bg-gradient-to-br from-amber-500/10 to-orange-600/10 border border-amber-500/20 rounded-3xl p-12"
                    >
                        <Shield className="w-20 h-20 text-amber-400 mx-auto mb-6" />
                        <h2 className="text-4xl font-black text-white mb-4">
                            Ready to Activate SOVEREIGN?
                        </h2>
                        <p className="text-xl text-zinc-400 mb-8">
                            Transform your district's data into actionable intelligence with the power of sovereign AI
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <button className="px-10 py-5 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-xl font-bold text-lg hover:scale-105 transition-transform shadow-2xl shadow-amber-500/50">
                                Request Demo
                            </button>
                            <button className="px-10 py-5 bg-white/5 border border-white/10 text-white rounded-xl font-bold text-lg hover:bg-white/10 transition-all">
                                Contact Sales
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
