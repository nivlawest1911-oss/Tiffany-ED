import Link from 'next/link';
import { Shield, Mail, MapPin, Twitter, Facebook, Linkedin, Github, Phone, MessageSquare } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-zinc-950 border-t border-white/10 pt-16 pb-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-indigo-900/10 via-zinc-950/0 to-zinc-950/0 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand Column */}
                    <div>
                        <Link href="/" className="inline-flex items-center gap-2 mb-6 group">
                            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                                <Shield className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-bold text-white tracking-tight">EdIntel Sovereign</span>
                        </Link>
                        <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                            Neural architectures for the modern educator. Empowering sovereignty through superior intelligence and executive automation.
                        </p>
                        <div className="flex gap-4">
                            <Link href="#" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors">
                                <Twitter size={18} />
                            </Link>
                            <Link href="#" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors">
                                <Facebook size={18} />
                            </Link>
                            <Link href="#" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors">
                                <Linkedin size={18} />
                            </Link>
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

                    {/* Resources */}
                    <div>
                        <h3 className="text-white font-bold mb-6">Resources</h3>
                        <ul className="space-y-4">
                            <li><Link href="#" className="text-zinc-400 hover:text-indigo-400 transition-colors text-sm">Documentation</Link></li>
                            <li><Link href="#" className="text-zinc-400 hover:text-indigo-400 transition-colors text-sm">API Reference</Link></li>
                            <li><Link href="#" className="text-zinc-400 hover:text-indigo-400 transition-colors text-sm">System Status</Link></li>
                            <li><Link href="#" className="text-zinc-400 hover:text-indigo-400 transition-colors text-sm">Security Protocols</Link></li>
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
                                <a href="mailto:dralvinwest@transcendholisticwellness.com" className="text-zinc-400 hover:text-white transition-colors text-sm">
                                    dralvinwest@transcendholisticwellness.com
                                </a>
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
