'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Crown, Mail, MapPin, Facebook, Linkedin, Phone, MessageSquare, Video, ExternalLink } from 'lucide-react';
import EdIntelLogo from './EdIntelLogo';
import HolographicBriefing from '@/components/intelligence/HolographicBriefing';
import { motion } from 'framer-motion';

export default function Footer() {
    const [systemStatusOpen, setSystemStatusOpen] = useState(false);
    return (
        <footer className="relative bg-black border-t border-[#FFB300]/20 pt-20 pb-10 overflow-hidden">
            {/* Aurora Background Effect */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#FFB300]/5 rounded-full blur-[150px]" />
                <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#00E5FF]/5 rounded-full blur-[120px]" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    {/* Brand Column */}
                    <div className="col-span-1 md:col-span-2">
                        <Link href="/" className="inline-block mb-6">
                            <EdIntelLogo variant="sovereign-fidelity" className="transform scale-90 origin-left" />
                        </Link>
                        <p className="text-zinc-400 text-sm leading-relaxed mb-6 max-w-md">
                            Strategic architectures for the modern educator. Empowering leadership through superior intelligence and executive automation.
                        </p>
                        <div className="flex gap-3">
                            <motion.a
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                href="https://www.tiktok.com/@alvinwestii"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 rounded-xl bg-white/5 hover:bg-[#ff0050]/20 text-zinc-400 hover:text-[#ff0050] transition-all border border-white/5 hover:border-[#ff0050]/30 hover:shadow-[0_0_20px_rgba(255,0,80,0.2)]"
                                aria-label="Dr. West on TikTok"
                            >
                                <Video size={18} />
                            </motion.a>
                            <motion.a
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                href="https://www.facebook.com/profile.php?id=61565451950668"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 rounded-xl bg-white/5 hover:bg-[#1877F2]/20 text-zinc-400 hover:text-[#1877F2] transition-all border border-white/5 hover:border-[#1877F2]/30 hover:shadow-[0_0_20px_rgba(24,119,242,0.2)]"
                                aria-label="Transcend Solutions on Facebook"
                            >
                                <Facebook size={18} />
                            </motion.a>
                            <motion.a
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                href="https://www.linkedin.com/in/alvin-west-ii-dba-11a75323/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 rounded-xl bg-white/5 hover:bg-[#0077b5]/20 text-zinc-400 hover:text-[#0077b5] transition-all border border-white/5 hover:border-[#0077b5]/30 hover:shadow-[0_0_20px_rgba(0,119,181,0.2)]"
                                aria-label="Dr. West on LinkedIn"
                            >
                                <Linkedin size={18} />
                            </motion.a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-[#FFB300] font-black text-[10px] uppercase tracking-[0.3em] mb-6">Platform</h3>
                        <ul className="space-y-3">
                            <li><Link href="/pricing" className="text-zinc-300 hover:text-[#FFB300] transition-colors text-sm font-medium flex items-center gap-2 group">Strategic Pricing <ExternalLink size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" /></Link></li>
                            <li><Link href="/login" className="text-zinc-400 hover:text-[#00E5FF] transition-colors text-sm font-medium">Protocol Login</Link></li>
                            <li><Link href="/signup" className="text-zinc-400 hover:text-[#00E5FF] transition-colors text-sm font-medium">Initialize Account</Link></li>
                            <li><Link href="/videos" className="text-zinc-400 hover:text-[#00E5FF] transition-colors text-sm font-medium">Video Library</Link></li>
                            <li><Link href="/support" className="text-zinc-400 hover:text-[#00E5FF] transition-colors text-sm font-medium">Support Center</Link></li>
                            <li><Link href="/connectors" className="text-zinc-400 hover:text-[#00E5FF] transition-colors text-sm font-medium">Connector Hub</Link></li>
                            <li><Link href="/contact" className="text-zinc-400 hover:text-[#00E5FF] transition-colors text-sm font-medium">Contact Command</Link></li>
                        </ul>
                    </div>



                    {/* Contact Info */}
                    <div>
                        <h3 className="text-[#FFB300] font-black text-[10px] uppercase tracking-[0.3em] mb-6">Contact Command</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <span className="p-1.5 rounded-lg bg-[#FFB300]/10 text-[#FFB300] mt-0.5 border border-[#FFB300]/20"><Crown size={14} /></span>
                                <div>
                                    <p className="text-white text-sm font-medium">Dr. Alvin West, II</p>
                                    <p className="text-zinc-400 text-xs">Founder & Chief Professional Officer</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="p-1.5 rounded-lg bg-[#00E5FF]/10 text-[#00E5FF] mt-0.5 border border-[#00E5FF]/20"><Mail size={14} /></span>
                                <div className="space-y-1">
                                    <a href="mailto:dralvinwest@transcendholisticwellness.com" className="text-zinc-400 hover:text-[#FFB300] transition-colors text-sm block truncate max-w-[200px]" title="dralvinwest@transcendholisticwellness.com">
                                        dralvinwest@transcendholisticwellness.com
                                    </a>
                                    <a href="mailto:nivlawest1911@gmail.com" className="text-zinc-400 hover:text-[#FFB300] transition-colors text-sm block">
                                        nivlawest1911@gmail.com
                                    </a>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="p-1.5 rounded-lg bg-[#25D366]/10 text-[#25D366] mt-0.5 border border-[#25D366]/20"><MessageSquare size={14} /></span>
                                <a href="https://wa.me/12512296351" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-[#25D366] transition-colors text-sm">
                                    WhatsApp: +1 (251) 229-6351
                                </a>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="p-1.5 rounded-lg bg-[#00E5FF]/10 text-[#00E5FF] mt-0.5 border border-[#00E5FF]/20"><Phone size={14} /></span>
                                <a href="tel:+14086577099" className="text-zinc-400 hover:text-[#00E5FF] transition-colors text-sm">
                                    Direct: +1 (408) 657-7099
                                </a>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 mt-0.5 border border-emerald-500/20"><MapPin size={14} /></span>
                                <span className="text-zinc-400 text-sm">
                                    Transcend Academic Solutions<br />Mobile, AL 36601
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Legal Links Bar */}
                <div className="border-t border-[#FFB300]/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setSystemStatusOpen(true)}
                            aria-label="System Integrity Report"
                            className="text-zinc-400 text-xs flex items-center gap-2 hover:text-emerald-400 transition-colors group cursor-pointer"
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            All systems operational
                        </button>
                        <span className="text-zinc-700 mx-2">|</span>
                        <span className="text-zinc-400 text-xs">
                            © {new Date().getFullYear()} EdIntel Professional
                        </span>
                    </div>

                    <HolographicBriefing
                        isOpen={systemStatusOpen}
                        onClose={() => setSystemStatusOpen(false)}
                        title="System Integrity Report"
                        description="Security Protocol Active. All Professional nodes are currently operational. FERPA encryption layers are intact. Latency is minimal. Your data fortress is secure, Principal."
                        role="Security Operations"
                        avatarImage="/images/avatars/executive_leader.png"
                        thumbnail="/images/features/iep-architect-demo.mp4"
                        stats={{ time: "UPTIME", saved: "99.99%", accuracy: "SECURE" }}
                    />
                    
                    <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
                        <Link href="/privacy" className="text-zinc-400 hover:text-[#FFB300] transition-colors text-xs font-medium uppercase tracking-wider">
                            Privacy Policy
                        </Link>
                        <Link href="/terms" className="text-zinc-400 hover:text-[#FFB300] transition-colors text-xs font-medium uppercase tracking-wider">
                            Terms of Service
                        </Link>
                        <Link href="/ferpa" className="text-zinc-400 hover:text-[#FFB300] transition-colors text-xs font-medium uppercase tracking-wider">
                            FERPA Compliance
                        </Link>
                        <Link href="/contact" className="text-zinc-500 hover:text-[#00E5FF] transition-colors text-xs font-medium uppercase tracking-wider">
                            Contact Us
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

