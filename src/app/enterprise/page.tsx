'use client';

import FloatingNavbar from '@/components/FloatingNavbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Building2, Users, TrendingUp, Shield, Zap, Award, CheckCircle } from 'lucide-react';

export default function EnterprisePage() {
    const features = [
        { icon: Building2, title: 'District-Wide Deployment', description: 'Seamless integration across all schools and departments' },
        { icon: Users, title: 'Unlimited Users', description: 'Support for entire district staff and administration' },
        { icon: TrendingUp, title: 'Advanced Analytics', description: 'Comprehensive insights and reporting dashboards' },
        { icon: Shield, title: 'Enterprise Security', description: 'SOC 2 compliance, SSO, and advanced data protection' },
        { icon: Zap, title: 'Priority Support', description: 'Dedicated account manager and 24/7 technical support' },
        { icon: Award, title: 'Custom Training', description: 'Personalized onboarding and professional development' },
    ];

    const benefits = [
        'Custom AI model training for your district',
        'White-label options available',
        'API access for custom integrations',
        'Dedicated infrastructure',
        'SLA guarantees',
        'Quarterly business reviews',
    ];

    return (
        <div className="min-h-screen bg-black">
            <FloatingNavbar />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-4 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.1),transparent_70%)]" />

                <div className="max-w-6xl mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full mb-6">
                            <Building2 className="w-4 h-4 text-amber-400" />
                            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Enterprise Solution</span>
                        </div>

                        <h1 className="text-6xl md:text-7xl font-black text-white mb-6 tracking-tight">
                            Executive Director <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-600">Enterprise</span>
                        </h1>

                        <p className="text-xl text-zinc-400 max-w-3xl mx-auto mb-12">
                            Transform your entire district with EdIntel's enterprise-grade AI platform. Built for scale, security, and success.
                        </p>

                        <div className="flex flex-wrap justify-center gap-4">
                            <button className="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-xl font-bold hover:scale-105 transition-transform shadow-lg shadow-amber-500/50">
                                Schedule Demo
                            </button>
                            <button className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-xl font-bold hover:bg-white/10 transition-all">
                                Contact Sales
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-20 px-4 bg-zinc-950/50">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl font-black text-white text-center mb-12">Enterprise Features</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-zinc-900/50 border border-white/10 rounded-2xl p-6 hover:border-amber-500/30 transition-all"
                            >
                                <feature.icon className="w-12 h-12 text-amber-400 mb-4" />
                                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                                <p className="text-zinc-400">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-20 px-4">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-4xl font-black text-white text-center mb-12">What's Included</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        {benefits.map((benefit, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="flex items-center gap-3 bg-zinc-900/30 border border-white/5 rounded-xl p-4"
                            >
                                <CheckCircle className="w-6 h-6 text-emerald-400 flex-shrink-0" />
                                <span className="text-white font-medium">{benefit}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="bg-gradient-to-br from-amber-500/10 to-orange-600/10 border border-amber-500/20 rounded-3xl p-12"
                    >
                        <h2 className="text-4xl font-black text-white mb-4">Ready to Transform Your District?</h2>
                        <p className="text-xl text-zinc-400 mb-8">
                            Schedule a personalized demo and discover how EdIntel Enterprise can revolutionize your educational operations.
                        </p>
                        <button className="px-10 py-5 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-xl font-bold text-lg hover:scale-105 transition-transform shadow-2xl shadow-amber-500/50">
                            Get Started Today
                        </button>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
