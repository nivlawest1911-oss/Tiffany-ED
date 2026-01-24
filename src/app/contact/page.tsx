'use client';
// Deployment: 2026-01-12T01:23:00-06:00

import { useState } from 'react';
import { Mail, MessageSquare, Phone, Send, MapPin, CheckCircle, Shield as LucideShield } from 'lucide-react';
import { motion } from 'framer-motion';
import FloatingNavbar from '@/components/FloatingNavbar';
import Footer from '@/components/Footer';
import HolographicBriefing from '@/components/HolographicBriefing';
import AnimatedEducatorHero from '@/components/AnimatedEducatorHero';

export default function ContactPage() {
    const [formState, setFormState] = useState({ name: '', email: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [showBriefing, setShowBriefing] = useState(false);

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
                        <div className="flex items-center justify-between mb-6">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-bold uppercase tracking-widest">
                                <LucideShield size={12} />
                                <span>Command Connection</span>
                            </div>
                            <button
                                onClick={() => setShowBriefing(true)}
                                className="p-2 rounded-full bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 transition-colors"
                                title="Open Comms Protocol"
                            >
                                <MessageSquare size={16} className="animate-pulse" />
                            </button>
                        </div>

                        <h1 className="text-5xl font-black text-white mb-6">Contact Command</h1>
                        <p className="text-xl text-zinc-400 mb-12 leading-relaxed">
                            Deploying strategic intelligence requires precise communication.
                            Direct channel open to Dr. Alvin West and the EdIntel engineering team.
                        </p>

                        <HolographicBriefing
                            isOpen={showBriefing}
                            onClose={() => setShowBriefing(false)}
                            title="Secure Comms Connection"
                            description="Channel Open. You are now connected to the Professional Command Center. All transmissions are encrypted. Use this channel for strategic inquiries, partnership proposals, or technical directives. We are listening."
                            role="Communications Director"
                            avatarImage="/images/avatars/executive_leader.png"
                            thumbnail="/images/features/iep-architect-demo.mp4"
                            stats={{ time: "OPEN", saved: "SECURE", accuracy: "100%" }}
                        />

                        {/* Founder Profile */}
                        <div className="flex items-center gap-6 mb-12 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-indigo-500/30 transition-colors">
                            <div className="relative w-24 h-24 flex-shrink-0">
                                <img
                                    src="/images/avatars/dr_alvin_west_premium.png"
                                    alt="Dr. Alvin West"
                                    className="w-full h-full object-cover rounded-xl border border-white/20 shadow-lg"
                                />
                                <div className="absolute -bottom-2 -right-2 w-6 h-6 rounded-full bg-green-500 border-4 border-zinc-900 flex items-center justify-center">
                                    <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-white font-bold text-lg">Dr. Alvin West, II</h3>
                                <p className="text-indigo-400 text-sm font-medium mb-1">Founder & Chief Professional Officer</p>
                                <p className="text-zinc-500 text-xs leading-relaxed">
                                    "We are building the future of educational excellence together. Your voice helps shape our mission."
                                </p>
                            </div>
                        </div>

                        {/* Professional Protocol Visualization */}
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
                                    { step: '02', title: 'Transmission', desc: 'Message packet routed to Professional Command prioritization queue.', color: 'border-l-purple-500' },
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

                        {/* Contact Channels Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* Email Card */}
                            <div className="group p-5 rounded-2xl bg-zinc-900/50 border border-white/10 hover:border-indigo-500/50 hover:bg-zinc-900/80 transition-all duration-300">
                                <div className="p-3 rounded-xl bg-indigo-500/10 w-fit mb-4 group-hover:scale-110 transition-transform">
                                    <Mail className="w-6 h-6 text-indigo-400" />
                                </div>
                                <h3 className="text-white font-bold mb-1">Electronic Mail</h3>
                                <div className="space-y-1">
                                    <a href="mailto:dralvinwest@transcendholisticwellness.com" className="text-xs text-zinc-400 hover:text-white transition-colors block truncate" title="dralvinwest@transcendholisticwellness.com">
                                        dralvinwest@transcend...
                                    </a>
                                    <a href="mailto:nivlawest1911@gmail.com" className="text-xs text-zinc-400 hover:text-white transition-colors block">
                                        nivlawest1911@gmail.com
                                    </a>
                                </div>
                            </div>

                            {/* Secure Message Card */}
                            <div className="group p-5 rounded-2xl bg-zinc-900/50 border border-white/10 hover:border-emerald-500/50 hover:bg-zinc-900/80 transition-all duration-300">
                                <div className="p-3 rounded-xl bg-emerald-500/10 w-fit mb-4 group-hover:scale-110 transition-transform">
                                    <MessageSquare className="w-6 h-6 text-emerald-400" />
                                </div>
                                <h3 className="text-white font-bold mb-1">Secure Message</h3>
                                <p className="text-xs text-zinc-500 mb-2">WhatsApp / Signal</p>
                                <a href="https://wa.me/12514229420" className="text-sm font-mono text-emerald-400 hover:text-emerald-300 transition-colors">
                                    +1 (251) 422-9420
                                </a>
                            </div>

                            {/* Voice Connection Card */}
                            <div className="group p-5 rounded-2xl bg-zinc-900/50 border border-white/10 hover:border-purple-500/50 hover:bg-zinc-900/80 transition-all duration-300">
                                <div className="p-3 rounded-xl bg-purple-500/10 w-fit mb-4 group-hover:scale-110 transition-transform">
                                    <Phone className="w-6 h-6 text-purple-400" />
                                </div>
                                <h3 className="text-white font-bold mb-1">Voice Connection</h3>
                                <p className="text-xs text-zinc-500 mb-2">Direct Line</p>
                                <a href="tel:+12514229420" className="text-sm font-mono text-purple-400 hover:text-purple-300 transition-colors">
                                    +1 (251) 422-9420
                                </a>
                            </div>

                            {/* Location Card */}
                            <div className="group p-5 rounded-2xl bg-zinc-900/50 border border-white/10 hover:border-orange-500/50 hover:bg-zinc-900/80 transition-all duration-300">
                                <div className="p-3 rounded-xl bg-orange-500/10 w-fit mb-4 group-hover:scale-110 transition-transform">
                                    <MapPin className="w-6 h-6 text-orange-400" />
                                </div>
                                <h3 className="text-white font-bold mb-1">Base Ops</h3>
                                <p className="text-xs text-zinc-400 leading-tight">
                                    Transcend Academic<br />Solutions, AL
                                </p>
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
                        {/* Animated Background - Replaced static image */}
                        <div className="absolute inset-0 z-0 opacity-30 rounded-3xl overflow-hidden">
                            <div className="scale-150 -translate-y-20">
                                <AnimatedEducatorHero />
                            </div>
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
                                        placeholder="How can we advance your strategy?"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-indigo-500/25 transition-all disabled:opacity-50 border border-white/10"
                                >
                                    {isSubmitting ? 'Transmitting...' : 'Initialize Connection'}
                                    <Send size={18} />
                                </button>
                            </form>
                        )}
                    </motion.div>
                </div>
            </div>

            {/* Professional Community Section */}
            <section className="relative py-32 bg-gradient-to-b from-black via-zinc-950 to-black overflow-hidden border-t border-white/5">
                {/* Animated Background */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.1),transparent_50%)]" />
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
                </div>

                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-bold uppercase tracking-widest mb-6 border border-indigo-500/20">
                            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                            Professional Network
                        </div>
                        <h2 className="text-4xl sm:text-5xl font-black text-white mb-6 bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent">
                            Join the Professional Community
                        </h2>
                        <p className="text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed">
                            Connect with <span className="text-white font-semibold">5,000+ forward-thinking educators</span> who are reclaiming their time and expertise with EdIntel. Share strategies, get support, and shape the future of education.
                        </p>
                    </motion.div>

                    {/* Community Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                        {/* Discord Card */}
                        <motion.a
                            href="https://discord.gg/edintel"
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600/20 to-purple-600/20 border border-indigo-500/30 hover:border-indigo-500/50 transition-all duration-300 p-8"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 to-purple-500/0 group-hover:from-indigo-500/10 group-hover:to-purple-500/10 transition-all duration-300" />

                            <div className="relative z-10">
                                <div className="flex items-start justify-between mb-6">
                                    <div className="p-4 rounded-xl bg-indigo-500/20 group-hover:bg-indigo-500/30 transition-colors">
                                        <MessageSquare className="w-8 h-8 text-indigo-400" />
                                    </div>
                                    <div className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-bold border border-green-500/30">
                                        LIVE
                                    </div>
                                </div>

                                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-indigo-300 transition-colors">
                                    Join Discord Community
                                </h3>

                                <p className="text-zinc-400 mb-6 leading-relaxed">
                                    Real-time collaboration, instant support, and exclusive workshops. Connect with educators, share resources, and get help from our team.
                                </p>

                                <div className="space-y-2 mb-6">
                                    <div className="flex items-center gap-2 text-sm text-zinc-300">
                                        <CheckCircle className="w-4 h-4 text-green-500" />
                                        <span>24/7 Community Support</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-zinc-300">
                                        <CheckCircle className="w-4 h-4 text-green-500" />
                                        <span>Weekly Office Hours with Dr. West</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-zinc-300">
                                        <CheckCircle className="w-4 h-4 text-green-500" />
                                        <span>Exclusive Templates & Resources</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 text-indigo-400 font-semibold group-hover:gap-3 transition-all">
                                    <span>Join 5,000+ Educators</span>
                                    <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </motion.a>

                        {/* Newsletter Card */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-purple-500/30 hover:border-purple-500/50 transition-all duration-300 p-8"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/10 group-hover:to-pink-500/10 transition-all duration-300" />

                            <div className="relative z-10">
                                <div className="flex items-start justify-between mb-6">
                                    <div className="p-4 rounded-xl bg-purple-500/20 group-hover:bg-purple-500/30 transition-colors">
                                        <Mail className="w-8 h-8 text-purple-400" />
                                    </div>
                                    <div className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-400 text-xs font-bold border border-purple-500/30">
                                        WEEKLY
                                    </div>
                                </div>

                                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">
                                    Subscribe to Newsletter
                                </h3>

                                <p className="text-zinc-400 mb-6 leading-relaxed">
                                    Get weekly insights, AI education trends, platform updates, and exclusive tips delivered to your inbox every Monday.
                                </p>

                                <form onSubmit={(e) => { e.preventDefault(); alert('Newsletter subscription coming soon!'); }} className="space-y-4">
                                    <input
                                        type="email"
                                        placeholder="your.email@district.edu"
                                        required
                                        className="w-full bg-black/50 backdrop-blur-md border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors placeholder:text-zinc-500"
                                    />
                                    <button
                                        type="submit"
                                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-purple-500/25 transition-all group-hover:scale-[1.02]"
                                    >
                                        <span>Subscribe Now</span>
                                        <Send className="w-4 h-4" />
                                    </button>
                                </form>

                                <p className="text-xs text-zinc-500 mt-4 text-center">
                                    Join 12,000+ subscribers • Unsubscribe anytime
                                </p>
                            </div>
                        </motion.div>
                    </div>

                    {/* Social Proof */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="text-center"
                    >
                        <div className="flex items-center justify-center gap-8 flex-wrap">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-white mb-1">5,000+</div>
                                <div className="text-sm text-zinc-500">Discord Members</div>
                            </div>
                            <div className="h-12 w-px bg-white/10" />
                            <div className="text-center">
                                <div className="text-3xl font-bold text-white mb-1">12,000+</div>
                                <div className="text-sm text-zinc-500">Newsletter Subscribers</div>
                            </div>
                            <div className="h-12 w-px bg-white/10" />
                            <div className="text-center">
                                <div className="text-3xl font-bold text-white mb-1">98%</div>
                                <div className="text-sm text-zinc-500">Satisfaction Rate</div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
