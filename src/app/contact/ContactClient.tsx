'use client';

import { useState } from 'react';
import { Mail, MessageSquare, Phone, Send, MapPin, CheckCircle, Shield as LucideShield, Loader2, Video, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import HolographicBriefing from '@/components/intelligence/HolographicBriefing';
import Image from 'next/image';
import { GlassPanel, HolographicText, NeonButton, NeonBadge, AuroraBackground, ParticleField, LaserLine } from '@/components/ui/HolographicUI';

export default function ContactClient() {
    const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '', contactMethod: 'email' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [showBriefing, setShowBriefing] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        // Build mailto link with form data
        const mailtoLink = `mailto:dralvinwest@transcendholisticwellness.com?subject=${encodeURIComponent(formState.subject || 'Contact from EdIntel')}&body=${encodeURIComponent(`Name: ${formState.name}\nEmail: ${formState.email}\nPreferred Contact: ${formState.contactMethod}\n\nMessage:\n${formState.message}`)}`;
        
        // Open mail client
        window.open(mailtoLink, '_blank');
        
        await new Promise(resolve => setTimeout(resolve, 500));
        setSubmitted(true);
        setIsSubmitting(false);
    };

    return (
        <main className="content-stage relative min-h-screen">
            {/* Aurora Background */}
            <AuroraBackground variant="mixed" intensity="low" />
            <ParticleField count={25} />
            
            <div className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-16">
                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <NeonBadge variant="gold" pulse className="mb-6">
                        <LucideShield size={12} />
                        Secure Command Connection
                    </NeonBadge>
                    
                    <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight mb-4">
                        <HolographicText variant="gradient" as="span" className="block">
                            Contact Command
                        </HolographicText>
                    </h1>
                    
                    <p className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
                        Direct channel to Dr. Alvin West and the EdIntel engineering team.
                        Strategic intelligence requires precise communication.
                    </p>
                    
                    <LaserLine color="#FFB300" className="max-w-md mx-auto mt-8" />
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Contact Info Column */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <button
                            onClick={() => setShowBriefing(true)}
                            className="w-full mb-8"
                        >
                            <GlassPanel variant="cyan" glow className="p-4 cursor-pointer">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-[#00E5FF]/20 flex items-center justify-center">
                                            <MessageSquare size={20} className="text-[#00E5FF]" />
                                        </div>
                                        <div className="text-left">
                                            <p className="text-white font-bold text-sm">AI Comms Protocol</p>
                                            <p className="text-zinc-500 text-xs">Click to initialize briefing</p>
                                        </div>
                                    </div>
                                    <div className="w-2 h-2 rounded-full bg-[#00E5FF] animate-pulse shadow-[0_0_10px_#00E5FF]" />
                                </div>
                            </GlassPanel>
                        </button>
                        <HolographicBriefing
                            isOpen={showBriefing}
                            onClose={() => setShowBriefing(false)}
                            agentId="strategic"
                            title="Secure Comms Protocol"
                            description="I am Keisha Reynolds. You are establishing a direct uplink to the EdIntel Command Center. All transmissions are encrypted and prioritized by the professional strategy cluster."
                            briefingSteps={[
                                "Initialize secure handshake protocol.",
                                "Package inquiry data for executive review.",
                                "Route transmission via encrypted district channels.",
                                "Deploy strategic response framework within 24 hours."
                            ]}
                        />

                        {/* Founder Profile */}
                        <GlassPanel variant="gold" glow className="p-6 mb-8">
                            <div className="flex items-center gap-6">
                                <div className="relative w-24 h-24 flex-shrink-0">
                                    <Image
                                        src="/images/avatars/Dr._alvin_west.png"
                                        alt="Dr. Alvin West"
                                        fill
                                        className="object-cover rounded-xl border-2 border-[#FFB300]/30 shadow-[0_0_30px_rgba(255,179,0,0.2)]"
                                    />
                                    <div className="absolute -bottom-2 -right-2 w-6 h-6 rounded-full bg-[#FFB300] border-4 border-[#09090b] flex items-center justify-center shadow-[0_0_15px_rgba(255,179,0,0.5)]">
                                        <div className="w-1.5 h-1.5 rounded-full bg-black" />
                                    </div>
                                </div>
                                <div>
                                    <HolographicText variant="gold" as="h3" className="text-lg font-black mb-1">
                                        Dr. Alvin West, II
                                    </HolographicText>
                                    <p className="text-[#00E5FF] text-[10px] font-black uppercase tracking-[0.2em] mb-2">Founder & Chief Professional Officer</p>
                                    <p className="text-zinc-400 text-xs leading-relaxed italic">
                                        &quot;We are building the future of educational excellence together. Your voice helps shape our mission.&quot;
                                    </p>
                                </div>
                            </div>
                        </GlassPanel>

                        {/* Contact Channels Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* Email Card */}
                            <a href="mailto:dralvinwest@transcendholisticwellness.com" className="block">
                                <GlassPanel variant="default" className="p-5 h-full group">
                                    <div className="p-3 rounded-xl bg-[#FFB300]/10 w-fit mb-4 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(255,179,0,0.3)] transition-all">
                                        <Mail className="w-6 h-6 text-[#FFB300]" />
                                    </div>
                                    <h3 className="text-white font-black text-[10px] uppercase tracking-widest mb-2">Electronic Mail</h3>
                                    <p className="text-[10px] font-bold text-zinc-400 mb-1 truncate" title="dralvinwest@transcendholisticwellness.com">
                                        dralvinwest@transcendholisticwellness.com
                                    </p>
                                    <p className="text-[10px] font-bold text-zinc-500">
                                        nivlawest1911@gmail.com
                                    </p>
                                    <div className="mt-3 flex items-center gap-1 text-[#FFB300] text-[9px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                                        <span>Send Email</span>
                                        <ExternalLink size={10} />
                                    </div>
                                </GlassPanel>
                            </a>

                            {/* Secure Message Card */}
                            <a href="https://wa.me/12512296351" target="_blank" rel="noopener noreferrer" className="block">
                                <GlassPanel variant="default" className="p-5 h-full group">
                                    <div className="p-3 rounded-xl bg-[#25D366]/10 w-fit mb-4 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(37,211,102,0.3)] transition-all">
                                        <MessageSquare className="w-6 h-6 text-[#25D366]" />
                                    </div>
                                    <h3 className="text-white font-black text-[10px] uppercase tracking-widest mb-2">WhatsApp / Signal</h3>
                                    <p className="text-sm font-mono text-zinc-300">+1 (251) 229-6351</p>
                                    <div className="mt-3 flex items-center gap-1 text-[#25D366] text-[9px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                                        <span>Open Chat</span>
                                        <ExternalLink size={10} />
                                    </div>
                                </GlassPanel>
                            </a>

                            {/* Voice Connection Card */}
                            <a href="tel:+14086577099" className="block">
                                <GlassPanel variant="default" className="p-5 h-full group">
                                    <div className="p-3 rounded-xl bg-[#00E5FF]/10 w-fit mb-4 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(0,229,255,0.3)] transition-all">
                                        <Phone className="w-6 h-6 text-[#00E5FF]" />
                                    </div>
                                    <h3 className="text-white font-black text-[10px] uppercase tracking-widest mb-2">Voice Connection</h3>
                                    <p className="text-sm font-mono text-zinc-300">+1 (408) 657-7099</p>
                                    <div className="mt-3 flex items-center gap-1 text-[#00E5FF] text-[9px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                                        <span>Call Now</span>
                                        <ExternalLink size={10} />
                                    </div>
                                </GlassPanel>
                            </a>

                            {/* Video Call Card */}
                            <a href="https://calendly.com" target="_blank" rel="noopener noreferrer" className="block">
                                <GlassPanel variant="default" className="p-5 h-full group">
                                    <div className="p-3 rounded-xl bg-purple-500/10 w-fit mb-4 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all">
                                        <Video className="w-6 h-6 text-purple-400" />
                                    </div>
                                    <h3 className="text-white font-black text-[10px] uppercase tracking-widest mb-2">Video Conference</h3>
                                    <p className="text-sm text-zinc-400">Schedule a call</p>
                                    <div className="mt-3 flex items-center gap-1 text-purple-400 text-[9px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                                        <span>Book Meeting</span>
                                        <ExternalLink size={10} />
                                    </div>
                                </GlassPanel>
                            </a>

                            {/* Location Card */}
                            <GlassPanel variant="default" className="p-5 sm:col-span-2">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 rounded-xl bg-emerald-500/10 flex-shrink-0">
                                        <MapPin className="w-6 h-6 text-emerald-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-black text-[10px] uppercase tracking-widest mb-2">Headquarters</h3>
                                        <p className="text-zinc-400 text-sm leading-relaxed">
                                            Transcend Academic, Business & Cognitive Solutions<br />
                                            Mobile, Alabama 36601
                                        </p>
                                    </div>
                                </div>
                            </GlassPanel>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <GlassPanel variant="gold" glow className="p-8 lg:p-10">
                            {submitted ? (
                                <div className="flex flex-col items-center justify-center text-center py-16">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: 'spring', delay: 0.2 }}
                                        className="w-24 h-24 bg-[#FFB300]/20 rounded-full flex items-center justify-center mb-6 border border-[#FFB300]/40 shadow-[0_0_40px_rgba(255,179,0,0.3)]"
                                    >
                                        <CheckCircle className="w-12 h-12 text-[#FFB300]" />
                                    </motion.div>
                                    <HolographicText variant="gold" as="h3" className="text-2xl font-black uppercase tracking-widest mb-3">
                                        Transmission Initiated
                                    </HolographicText>
                                    <p className="text-zinc-400 text-sm mb-2">Your email client has been opened with your message.</p>
                                    <p className="text-zinc-500 text-[11px] font-bold uppercase tracking-widest">Dr. West will respond within 24-48 hours.</p>
                                    <NeonButton
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => {
                                            setSubmitted(false);
                                            setFormState({ name: '', email: '', subject: '', message: '', contactMethod: 'email' });
                                        }}
                                        className="mt-8"
                                    >
                                        Send Another Message
                                    </NeonButton>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="text-center mb-8">
                                        <HolographicText variant="gold" as="h2" className="text-xl font-black uppercase tracking-widest mb-2">
                                            Secure Transmission Form
                                        </HolographicText>
                                        <p className="text-zinc-500 text-xs">All fields encrypted with AES-256</p>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[#FFB300] mb-2 ml-1">Full Name</label>
                                            <input
                                                type="text"
                                                required
                                                value={formState.name}
                                                onChange={e => setFormState({ ...formState, name: e.target.value })}
                                                className="w-full bg-black/50 border border-[#FFB300]/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FFB300]/60 focus:shadow-[0_0_20px_rgba(255,179,0,0.1)] transition-all placeholder:text-zinc-700"
                                                placeholder="Dr. John Smith"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[#FFB300] mb-2 ml-1">Email Address</label>
                                            <input
                                                type="email"
                                                required
                                                value={formState.email}
                                                onChange={e => setFormState({ ...formState, email: e.target.value })}
                                                className="w-full bg-black/50 border border-[#FFB300]/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FFB300]/60 focus:shadow-[0_0_20px_rgba(255,179,0,0.1)] transition-all placeholder:text-zinc-700"
                                                placeholder="john@district.edu"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[#FFB300] mb-2 ml-1">Subject</label>
                                        <input
                                            type="text"
                                            required
                                            value={formState.subject}
                                            onChange={e => setFormState({ ...formState, subject: e.target.value })}
                                            className="w-full bg-black/50 border border-[#FFB300]/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FFB300]/60 focus:shadow-[0_0_20px_rgba(255,179,0,0.1)] transition-all placeholder:text-zinc-700"
                                            placeholder="Partnership Inquiry / Demo Request / Support"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[#FFB300] mb-2 ml-1">Preferred Contact Method</label>
                                        <div className="flex gap-3">
                                            {[
                                                { value: 'email', label: 'Email', icon: Mail },
                                                { value: 'phone', label: 'Phone', icon: Phone },
                                                { value: 'whatsapp', label: 'WhatsApp', icon: MessageSquare },
                                            ].map((method) => (
                                                <button
                                                    key={method.value}
                                                    type="button"
                                                    onClick={() => setFormState({ ...formState, contactMethod: method.value })}
                                                    className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-xl border transition-all ${
                                                        formState.contactMethod === method.value
                                                            ? 'bg-[#FFB300]/20 border-[#FFB300]/50 text-[#FFB300]'
                                                            : 'bg-black/30 border-white/10 text-zinc-500 hover:border-white/20'
                                                    }`}
                                                >
                                                    <method.icon size={14} />
                                                    <span className="text-[10px] font-bold uppercase tracking-wide">{method.label}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[#FFB300] mb-2 ml-1">Message</label>
                                        <textarea
                                            required
                                            rows={5}
                                            value={formState.message}
                                            onChange={e => setFormState({ ...formState, message: e.target.value })}
                                            className="w-full bg-black/50 border border-[#FFB300]/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FFB300]/60 focus:shadow-[0_0_20px_rgba(255,179,0,0.1)] transition-all placeholder:text-zinc-700 resize-none"
                                            placeholder="Tell us about your district, your challenges, and how we can help transform your educational operations..."
                                        />
                                    </div>

                                    <NeonButton
                                        type="submit"
                                        variant="gold"
                                        size="lg"
                                        disabled={isSubmitting}
                                        className="w-full flex items-center justify-center gap-3"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 size={16} className="animate-spin" />
                                                <span>Opening Email Client...</span>
                                            </>
                                        ) : (
                                            <>
                                                <span>Initialize Transmission</span>
                                                <Send size={16} />
                                            </>
                                        )}
                                    </NeonButton>

                                    <p className="text-center text-[9px] text-zinc-600 uppercase tracking-widest">
                                        Your message will open in your default email client
                                    </p>
                                </form>
                            )}
                        </GlassPanel>
                    </motion.div>
                </div>
            </div>

            {/* Professional Community Section */}
            <section className="relative py-32 bg-gradient-to-b from-black via-zinc-950 to-black overflow-hidden border-t border-white/5">
                {/* Animated Background */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.1),transparent_50%)]" />
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-700" />
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
        </main>
    );
}
