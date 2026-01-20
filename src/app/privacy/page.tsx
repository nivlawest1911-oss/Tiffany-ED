'use client';

import { Shield as LucideShield, Lock, Eye, Database, Server, UserCheck, FileText } from 'lucide-react';
import FloatingNavbar from '@/components/FloatingNavbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';

export default function PrivacyPolicyPage() {
    const sections = [
        {
            icon: Database,
            title: 'Data Leadership',
            content: 'Unlike traditional platforms that treat user data as a commodity, EdIntel Professional recognizes your data as your intellectual property. You retain absolute ownership of all inputs, outputs, and generated protocols. We act merely as the secure vault and processing engine.'
        },
        {
            icon: Eye,
            title: 'Zero-Training Guarantee',
            content: 'We adhere to a strict "No-Training" policy. Data processed through our Strategic Broadcast Centers (AI Models) is ephemeral for the purpose of generation only. It is legally and technically firewalled from being used to train public AI models by providers like OpenAI, Google, or Anthropic.'
        },
        {
            icon: Lock,
            title: 'Encryption Standards',
            content: 'Your digital exhaust is secured with AES-256 encryption at rest and TLS 1.3 in transit. Our database architecture uses row-level security policies, ensuring that even at the database level, your data is isolated from other strategic centers.'
        },
        {
            icon: UserCheck,
            title: 'Minimization Principle',
            content: 'We collect only what is strictly necessary to maintain the integrity of the Professional network: Authentication tokens, billing status, and encrypted user preferences. We do not track your activity across the web or sell behavioral profiles.'
        }
    ];

    return (
        <main className="min-h-screen bg-black text-white selection:bg-indigo-500/30">
            <FloatingNavbar />

            {/* Header */}
            <div className="pt-32 pb-16 px-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-full h-[500px] bg-indigo-900/10 blur-[120px] pointer-events-none" />

                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-black uppercase tracking-widest mb-6"
                    >
                        <LucideShield size={12} />
                        <span>Professional Constitution</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-black mb-6 tracking-tight"
                    >
                        Privacy Policy
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed"
                    >
                        In the age of AI, privacy is not just a right; it is a strategic asset.
                        We protect your intellectual property with military-grade architecture.
                    </motion.p>
                </div>
            </div>

            {/* Core Principles Grid */}
            <section className="px-6 pb-24 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
                    {sections.map((section, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="p-8 rounded-3xl bg-zinc-900/50 border border-white/10 hover:border-indigo-500/30 transition-colors group"
                        >
                            <div className="w-12 h-12 rounded-2xl bg-zinc-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 group-hover:bg-indigo-500/20">
                                <section.icon className="w-6 h-6 text-zinc-400 group-hover:text-indigo-400 transition-colors" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">{section.title}</h3>
                            <p className="text-zinc-400 leading-relaxed">
                                {section.content}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Detailed Legal Text */}
                <div className="max-w-3xl mx-auto prose prose-invert prose-zinc prose-headings:font-bold prose-headings:tracking-tight prose-a:text-indigo-400 hover:prose-a:text-indigo-300">
                    <div className="p-8 rounded-3xl bg-zinc-950 border border-white/5">
                        <h2>1. Introduction</h2>
                        <p>
                            This Privacy Policy describes how <strong>EdIntel Professional</strong> ("we", "us", or "our") collects, uses, and discloses your Personal Information when you visit or use our application. By using the Service, you agree to the collection and use of information in accordance with this policy.
                        </p>

                        <h2>2. Data Collection & Usage</h2>
                        <p>
                            We collect specific data points solely to provide our services:
                        </p>
                        <ul>
                            <li><strong>Identity Data:</strong> Name, email address, and professional title.</li>
                            <li><strong>Technical Data:</strong> IP address, browser type, and device information for security auditing.</li>
                            <li><strong>Usage Data:</strong> Information about how you use our website to improve UX.</li>
                        </ul>

                        <h2>3. Third-Party Sharing</h2>
                        <p>
                            We do not sell your personal data. We may share data with trusted third-party service providers (e.g., Vercel for hosting) strictly for the purpose of operating the Service. All providers are vetted for high security standards.
                        </p>

                        <h2>4. Data Retention</h2>
                        <p>
                            We retain your personal data only for as long as is necessary for the purposes set out in this Privacy Policy. You may request deletion of your account and all associated data at any time via the Contact Command channel.
                        </p>

                        <h2>5. Contact Us</h2>
                        <p>
                            For any questions regarding this Privacy Policy or to exercise your data rights, please contact our Data Protection Officer:
                        </p>
                        <p className="not-prose mt-4">
                            <a href="mailto:dralvinwest@transcendholisticwellness.com" className="inline-flex items-center gap-2 text-indigo-400 hover:text-white transition-colors font-medium">
                                <FileText size={16} />
                                dralvinwest@transcendholisticwellness.com
                            </a>
                        </p>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
