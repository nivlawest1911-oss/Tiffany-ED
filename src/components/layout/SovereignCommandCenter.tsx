'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Mail,
    MessageSquare,
    Phone,
    MapPin,
    Linkedin,
    Facebook,
    Hexagon,
    ArrowUpRight,
    AtSign,
    Video
} from 'lucide-react';
import Link from 'next/link';
import HolographicBriefing from '../HolographicBriefing';

export function SovereignCommandCenter() {
    const [briefingOpen, setBriefingOpen] = useState(false);

    return (
        <section className="w-full bg-black/60 border-t border-intel-gold/10 backdrop-blur-3xl py-20 px-12 relative overflow-hidden">
            {/* Background Neural Pulse */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-intel-gold/5 rounded-full blur-[120px] -z-10 animate-pulse" />

            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 relative z-10">

                {/* Branding Block */}
                <div className="md:col-span-4 space-y-8">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-intel-gold/10 border border-intel-gold/30 rounded-2xl flex items-center justify-center relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gold-gradient opacity-20 group-hover:opacity-40 transition-opacity" />
                            <Hexagon className="w-8 h-8 text-intel-gold relative z-10" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-black italic uppercase tracking-tighter text-white">
                                EdIntel <span className="text-intel-gold">Professional</span>
                            </h2>
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600 block mt-1">Sovereign OS // v5.1</span>
                        </div>
                    </div>

                    <p className="text-zinc-500 font-bold italic uppercase tracking-tight leading-relaxed max-w-sm">
                        Strategic architectures for the modern educator. Empowering leadership through superior intelligence and executive automation.
                    </p>

                    <div className="flex gap-4">
                        {[
                            { icon: Video, href: 'https://www.tiktok.com/@alvinwest0', color: 'hover:bg-[#ff0050]/20 hover:text-[#ff0050]' },
                            { icon: Facebook, href: 'https://www.facebook.com/profile.php?id=61565451950668', color: 'hover:bg-[#1877F2]/20 hover:text-[#1877F2]' },
                            { icon: Linkedin, href: 'https://www.linkedin.com/in/alvin-west-ii-dba-11a75323', color: 'hover:bg-[#0077b5]/20 hover:text-[#0077b5]' }
                        ].map((social, i) => (
                            <Link
                                key={i}
                                href={social.href}
                                target="_blank"
                                className={`w-12 h-12 bg-zinc-900 border border-white/5 rounded-xl flex items-center justify-center text-zinc-500 transition-all ${social.color} hover:border-white/20`}
                            >
                                <social.icon size={20} />
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Platform Links */}
                <div className="md:col-span-4 space-y-8">
                    <h3 className="text-[11px] font-black uppercase tracking-[0.5em] text-zinc-700 italic border-l-2 border-intel-gold/40 pl-4">Platform Command</h3>
                    <nav className="flex flex-col gap-4">
                        {[
                            { label: 'Professional Pricing', href: '/pricing' },
                            { label: 'Protocol Login', href: '/auth' },
                            { label: 'Initialize Center', href: '/admin/analytics' },
                            { label: 'Intelligence Tools', href: '/admin/tools' },
                            { label: 'Professional Shield', href: '/privacy/leadership-shield' },
                            { label: 'Connector Hub', href: '/admin/vault' }
                        ].map((link, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ x: 10 }}
                                transition={{ type: 'spring', stiffness: 300 }}
                            >
                                <Link href={link.href} className="group flex items-center justify-between py-2 text-zinc-400 hover:text-white transition-colors border-b border-white/[0.03]">
                                    <span className="text-sm font-black italic uppercase tracking-widest">{link.label}</span>
                                    <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-all text-intel-gold -translate-x-4 group-hover:translate-x-0" />
                                </Link>
                            </motion.div>
                        ))}
                    </nav>
                </div>

                {/* Contact Command */}
                <div className="md:col-span-4 space-y-8">
                    <h3 className="text-[11px] font-black uppercase tracking-[0.5em] text-zinc-700 italic border-l-2 border-intel-gold/40 pl-4">Contact Command</h3>

                    <div className="space-y-6">
                        <div className="flex items-center gap-4 group cursor-pointer">
                            <div className="w-10 h-10 rounded-full bg-zinc-900 border border-white/5 flex items-center justify-center text-zinc-600 group-hover:text-white transition-colors">
                                <AtSign size={18} />
                            </div>
                            <div>
                                <h4 className="text-xs font-black uppercase tracking-widest text-white">Dr. Alvin West</h4>
                                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-tight">Founder & Architect</p>
                            </div>
                        </div>

                        <div className="space-y-3">
                            {[
                                { icon: Mail, text: 'dralvinwest@transcendhbc.com', sub: 'Primary Channel' },
                                { icon: MessageSquare, text: '+1 (251) 422-9420', sub: 'WhatsApp Direct' },
                                { icon: Phone, text: '+1 (251) 422-9420', sub: 'Voice Protocol' },
                                { icon: MapPin, text: 'Transcend Acad., Biz & Cog. Solutions', sub: 'Mobile, AL' }
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-4 text-zinc-500 hover:text-white transition-colors cursor-pointer group">
                                    <item.icon size={16} className="text-zinc-700 group-hover:text-intel-gold transition-colors" />
                                    <div>
                                        <p className="text-[11px] font-black tracking-tight">{item.text}</p>
                                        <p className="text-[8px] font-bold uppercase tracking-widest text-zinc-700">{item.sub}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>

            <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                <button
                    onClick={() => setBriefingOpen(true)}
                    className="flex items-center gap-4 group"
                >
                    <div className="w-2 h-2 rounded-full bg-intel-gold animate-ping" />
                    <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest group-hover:text-intel-gold transition-colors">Neural Grid Active // {new Date().getFullYear()} SOVEREIGN OS</span>
                </button>

                <div className="flex gap-6">
                    <Link href="/privacy" className="text-[9px] font-black uppercase tracking-widest text-zinc-800 hover:text-white transition-colors">Privacy</Link>
                    <Link href="/terms" className="text-[9px] font-black uppercase tracking-widest text-zinc-800 hover:text-white transition-colors">Terms</Link>
                    <Link href="/ferpa" className="text-[9px] font-black uppercase tracking-widest text-zinc-800 hover:text-white transition-colors">FERPA</Link>
                </div>
            </div>

            <HolographicBriefing
                isOpen={briefingOpen}
                onClose={() => setBriefingOpen(false)}
                title="System Integrity Report"
                description="Security Protocol Active. All Professional nodes are currently operational. FERPA encryption layers are intact. Your data fortress is secure."
                role="Security Operations"
                avatarImage="/images/avatars/executive_leader.png"
                thumbnail="/images/features/iep-architect-demo.mp4"
                stats={{ time: "UPTIME", saved: "99.99%", accuracy: "SECURE" }}
            />
        </section>
    );
}
