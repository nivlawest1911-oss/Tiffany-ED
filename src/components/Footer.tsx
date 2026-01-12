import Link from 'next/link';
import { Shield, Mail, MapPin, Twitter, Facebook, Linkedin, Github, Phone, MessageSquare, Video } from 'lucide-react';
import EdIntelLogo from './EdIntelLogo';

export default function Footer() {
    return (
        <footer className="bg-black border-t border-white/10 pt-20 pb-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-indigo-900/10 via-zinc-950/0 to-zinc-950/0 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    {/* Brand Column */}
                    <div className="col-span-1 md:col-span-2">
                        <Link href="/" className="inline-block mb-6">
                            <EdIntelLogo />
                        </Link>
                        <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                            Neural architectures for the modern educator. Empowering sovereignty through superior intelligence and executive automation.
                        </p>
                        <div className="flex gap-4">
                            <a
                                href="https://www.tiktok.com/@dr.alvin.west.ii"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-lg bg-white/5 hover:bg-[#ff0050]/20 text-zinc-400 hover:text-[#ff0050] transition-colors group"
                                aria-label="Dr. West on TikTok"
                            >
                                <Video size={18} />
                            </a>
                            <a
                                href="https://www.facebook.com/profile.php?id=61565451950668"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-lg bg-white/5 hover:bg-[#1877F2]/20 text-zinc-400 hover:text-[#1877F2] transition-colors"
                                aria-label="Transcend Solutions on Facebook"
                            >
                                <Facebook size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-bold mb-6">Platform</h3>
                        <ul className="space-y-4">
                            <li><Link href="/pricing" className="text-zinc-400 hover:text-indigo-400 transition-colors text-sm">Sovereign Pricing</Link></li>
                            <li><Link href="/login" className="text-zinc-400 hover:text-indigo-400 transition-colors text-sm">Protocol Login</Link></li>
                            <li><Link href="/signup" className="text-zinc-400 hover:text-indigo-400 transition-colors text-sm">Initialize Node</Link></li>
                            <li><Link href="/all-tools" className="text-zinc-400 hover:text-indigo-400 transition-colors text-sm">Intelligence Tools</Link></li>
                        </ul>
                    </div>



                    {/* Contact Info */}
                    <div>
                        <h3 className="text-white font-bold mb-6">Contact Command</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <span className="p-1 rounded bg-indigo-500/10 text-indigo-400 mt-0.5"><Shield size={14} /></span>
                                <div>
                                    <p className="text-white text-sm font-medium">Dr. Alvin West</p>
                                    <p className="text-zinc-500 text-xs">Founder & Architect</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="p-1 rounded bg-indigo-500/10 text-indigo-400 mt-0.5"><Mail size={14} /></span>
                                <div className="space-y-1">
                                    <a href="mailto:dralvinwest@transcendholisticwellness.com" className="text-zinc-400 hover:text-white transition-colors text-sm block">
                                        dralvinwest@transcendholisticwellness.com
                                    </a>
                                    <a href="mailto:nivlawest1911@gmail.com" className="text-zinc-400 hover:text-white transition-colors text-sm block">
                                        nivlawest1911@gmail.com
                                    </a>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="p-1 rounded bg-indigo-500/10 text-indigo-400 mt-0.5"><MessageSquare size={14} /></span>
                                <a href="https://wa.me/12514229420" className="text-zinc-400 hover:text-white transition-colors text-sm">
                                    WhatsApp: +1 (251) 422-9420
                                </a>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="p-1 rounded bg-indigo-500/10 text-indigo-400 mt-0.5"><Phone size={14} /></span>
                                <a href="tel:+12514229420" className="text-zinc-400 hover:text-white transition-colors text-sm">
                                    +1 (251) 422-9420
                                </a>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="p-1 rounded bg-indigo-500/10 text-indigo-400 mt-0.5"><MapPin size={14} /></span>
                                <span className="text-zinc-400 text-sm">
                                    Transcend Academic, Business &<br />Cognitive Solutions
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-zinc-500 text-sm">
                        © {new Date().getFullYear()} EdIntel Sovereign. All systems operational.
                    </p>
                    <div className="flex gap-6">
                        <Link href="/privacy" className="text-zinc-500 hover:text-zinc-300 text-sm">Privacy Policy</Link>
                        <Link href="/terms" className="text-zinc-500 hover:text-zinc-300 text-sm">Terms of Service</Link>
                        <Link href="/ferpa" className="text-zinc-500 hover:text-zinc-300 text-sm">FERPA Compliance</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
