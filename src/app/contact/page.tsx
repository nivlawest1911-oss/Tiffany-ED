'use client';
// Deployment: 2026-01-12T01:23:00-06:00

import { useState } from 'react';
import { Mail, MessageSquare, Phone, Send, MapPin, CheckCircle, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import FloatingNavbar from '@/components/FloatingNavbar';
import Footer from '@/components/Footer';

export default function ContactPage() {
    const [formState, setFormState] = useState({ name: '', email: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setSubmitted(true);
        setIsSubmitting(false);
    };

    return (
        <main className="min-h-screen bg-black text-white selection:bg-indigo-500/30">
            <FloatingNavbar />

            <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

                    {/* Contact Info Column */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-bold uppercase tracking-widest mb-6">
                            <Shield size={12} />
                            <span>Command Uplink</span>
                        </div>

                        <h1 className="text-5xl font-black text-white mb-6">Contact Command</h1>
                        <p className="text-xl text-zinc-400 mb-12 leading-relaxed">
                            Deploying sovereign intelligence requires precise communication.
                            Direct channel open to Dr. Alvin West and the EdIntel engineering team.
                        </p>

                        {/* Sovereign Protocol Visualization */}
                        <div className="mb-12 relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/50 p-6">
                            <div className="absolute top-0 right-0 p-4 opacity-30">
                                <img src="/images/protocol_interface.png" alt="Protocol HUD" className="w-32 h-auto" />
                            </div>

                            <h3 className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-4 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                Secure Transmission Protocol
                            </h3>

                            <div className="space-y-6 relative z-10">
                                {[
                                    { step: '01', title: 'Initialization', desc: 'Secure uplink channel established via encrypted form.', color: 'border-l-indigo-500' },
                                    { step: '02', title: 'Transmission', desc: 'Message packet routed to Sovereign Command prioritization queue.', color: 'border-l-purple-500' },
                                    { step: '03', title: 'Deployment', desc: 'Strategic response formulated and deployed within 24 hours.', color: 'border-l-pink-500' }
                                ].map((phase, idx) => (
                                    <div key={idx} className={`pl-4 border-l-2 ${phase.color} fade-in-up`} style={{ animationDelay: `${idx * 150}ms` }}>
                                        <div className="flex items-baseline gap-2 mb-1">
                                            <span className="text-xs font-mono text-zinc-500">{phase.step}</span>
                                            <h4 className="text-sm font-bold text-white">{phase.title}</h4>
                                        </div>
                                        <p className="text-xs text-zinc-400 leading-relaxed max-w-[90%]">
                                            {phase.desc}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-8">
                            <div className="flex items-start gap-6 group">
                                <div className="p-4 rounded-2xl bg-zinc-900 border border-white/10 group-hover:border-indigo-500/50 transition-colors">
                                    <Mail className="w-6 h-6 text-indigo-400" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white mb-1">Electronic Mail</h3>
                                    <p className="text-zinc-500 text-sm mb-2">Priority support channels</p>
                                    <div className="space-y-1">
                                        <a href="mailto:dralvinwest@transcendholisticwellness.com" className="text-indigo-300 hover:text-white transition-colors font-medium block">
                                            dralvinwest@transcendholisticwellness.com
                                        </a>
                                        <a href="mailto:nivlawest1911@gmail.com" className="text-indigo-300 hover:text-white transition-colors font-medium block">
                                            nivlawest1911@gmail.com
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-start gap-6 group">
                                <div className="p-4 rounded-2xl bg-zinc-900 border border-white/10 group-hover:border-indigo-500/50 transition-colors">
                                    <MessageSquare className="w-6 h-6 text-emerald-400" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white mb-1">Secure Message</h3>
                                    <p className="text-zinc-500 text-sm mb-2">WhatsApp / Signal Encrypted</p>
                                    <a href="https://wa.me/12514229420" className="text-indigo-300 hover:text-white transition-colors font-medium">
                                        +1 (251) 422-9420
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start gap-6 group">
                                <div className="p-4 rounded-2xl bg-zinc-900 border border-white/10 group-hover:border-indigo-500/50 transition-colors">
                                    <Phone className="w-6 h-6 text-purple-400" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white mb-1">Voice Uplink</h3>
                                    <p className="text-zinc-500 text-sm mb-2">Direct line</p>
                                    <a href="tel:+12514229420" className="text-indigo-300 hover:text-white transition-colors font-medium">
                                        +1 (251) 422-9420
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start gap-6 group">
                                <div className="p-4 rounded-2xl bg-zinc-900 border border-white/10 group-hover:border-indigo-500/50 transition-colors">
                                    <MapPin className="w-6 h-6 text-orange-400" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white mb-1">Base of Operations</h3>
                                    <p className="text-zinc-400 text-sm">
                                        Transcend Academic, Business & Cognitive Solutions<br />
                                        Alabama, United States
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="bg-zinc-900/50 backdrop-blur-sm border border-white/10 rounded-3xl p-8 lg:p-10 relative overflow-hidden"
                    >
                        <div className="absolute inset-0 z-0 opacity-20">
                            <img
                                src="/images/contact_command.png"
                                alt="Command Center Interface"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-900/95 to-indigo-950/90" />
                        </div>

                        {/* Old blur effect removed, replaced with high-tech background */}

                        {submitted ? (
                            <div className="h-full flex flex-col items-center justify-center text-center py-20 relative z-10">
                                <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6 border border-green-500/20">
                                    <CheckCircle className="w-10 h-10 text-green-500" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">Transmission Received</h3>
                                <p className="text-zinc-400">Our team will establish a secure connection shortly.</p>
                                <button
                                    onClick={() => setSubmitted(false)}
                                    className="mt-8 text-sm text-indigo-400 hover:text-white transition-colors"
                                >
                                    Send another message
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Identity</label>
                                    <input
                                        type="text"
                                        required
                                        value={formState.name}
                                        onChange={e => setFormState({ ...formState, name: e.target.value })}
                                        className="w-full bg-black/50 backdrop-blur-md border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                                        placeholder="Dr. Name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Comms Frequency</label>
                                    <input
                                        type="email"
                                        required
                                        value={formState.email}
                                        onChange={e => setFormState({ ...formState, email: e.target.value })}
                                        className="w-full bg-black/50 backdrop-blur-md border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                                        placeholder="email@district.edu"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Transmission</label>
                                    <textarea
                                        required
                                        rows={4}
                                        value={formState.message}
                                        onChange={e => setFormState({ ...formState, message: e.target.value })}
                                        className="w-full bg-black/50 backdrop-blur-md border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors resize-none"
                                        placeholder="How can we advance your sovereignty?"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-indigo-500/25 transition-all disabled:opacity-50 border border-white/10"
                                >
                                    {isSubmitting ? 'Transmitting...' : 'Initialize Uplink'}
                                    <Send size={18} />
                                </button>
                            </form>
                        )}
                    </motion.div>
                </div>
            </div>

            {/* New Community Section */}
            <section className="relative py-24 bg-zinc-950 overflow-hidden border-t border-white/5">
                <div className="absolute inset-0 z-0">
                    <img
                        src="/images/community_connection.png"
                        alt="Diverse educators connecting"
                        className="w-full h-full object-cover opacity-10"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent" />
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <h2 className="text-3xl sm:text-4xl font-black text-white mb-6">
                        Join the Sovereign Community
                    </h2>
                    <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-8">
                        Connect with other forward-thinking educators who are reclaiming their time and expertise with EdIntel.
                    </p>
                    <div className="flex justify-center gap-4">
                        <button className="px-8 py-3 rounded-xl bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 hover:bg-indigo-600/30 transition-all font-semibold backdrop-blur-sm">
                            Join Discord
                        </button>
                        <button className="px-8 py-3 rounded-xl bg-white/5 text-white border border-white/10 hover:bg-white/10 transition-all font-semibold backdrop-blur-sm">
                            Newsletter
                        </button>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
