'use client';

import { ShieldCheck, Lock, FileKey, Check, Server, EyeOff } from 'lucide-react';
import FloatingNavbar from '@/components/FloatingNavbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';

export default function FERPAComplianceClient() {
    const protocols = [
        {
            icon: Lock,
            title: "Encryption at Rest",
            content: "All databases are secured with AES-256 encryption. Your data is mathematically indecipherable without the unique keys generated for your district node.",
            color: "emerald"
        },
        {
            icon: EyeOff,
            title: "Zero-Training Policy",
            content: "We have stringent legal agreements with our AI providers. Your student data is processed in a stateless environment and NEVER used to train public models.",
            color: "cyan"
        },
        {
            icon: Server,
            title: "Professional Isolation",
            content: "Tenant data is logically isolated. A breach in one node (theoretically impossible) cannot laterally move to access your data.",
            color: "teal"
        },
        {
            icon: FileKey,
            title: "Cryptographic Deletion",
            content: "When you hit delete, we don't just hide the file. We execute a cryptographic shredding process that makes recovery impossible.",
            color: "green"
        }
    ];

    return (
        <main className="min-h-screen bg-black text-white selection:bg-emerald-500/30 overflow-x-hidden">
            <FloatingNavbar />

            {/* 1. Hero: Compliance Shield */}
            <div className="relative pt-40 pb-32 px-6 overflow-hidden">
                {/* Emerald Background Glow */}
                <div className="absolute top-0 inset-x-0 h-[800px] bg-gradient-to-b from-emerald-950/20 via-teal-950/10 to-black pointer-events-none" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-600/10 blur-[150px] rounded-full pointer-events-none animate-pulse-slow" />

                <div className="max-w-5xl mx-auto text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-black uppercase tracking-[0.2em] mb-8 shadow-[0_0_20px_rgba(16,185,129,0.2)]"
                    >
                        <ShieldCheck size={12} /> Compliance Architecture
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-5xl md:text-8xl font-black text-white tracking-tighter uppercase mb-8 leading-[0.9]"
                    >
                        FERPA <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Ironclad.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed"
                    >
                        Your legal safety is not a feature; it is the foundation.
                        We operate under the "School Official" exception, providing a fortress for your data.
                    </motion.p>
                </div>
            </div>

            {/* 2. Compliance Status Banner */}
            <div className="max-w-7xl mx-auto px-6 mb-24 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="p-8 rounded-3xl bg-zinc-900 border border-emerald-500/30 flex flex-col md:flex-row items-center gap-8 shadow-[0_0_50px_rgba(16,185,129,0.1)] relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/20 to-transparent pointer-events-none" />

                    <div className="w-20 h-20 rounded-2xl bg-emerald-500/10 flex items-center justify-center flex-shrink-0 animate-pulse-slow border border-emerald-500/20">
                        <Check size={40} className="text-emerald-400" />
                    </div>

                    <div className="flex-1 text-center md:text-left">
                        <h3 className="text-2xl font-bold text-white mb-2">Verified Compliant: 20 U.S.C. § 1232g</h3>
                        <p className="text-zinc-400">
                            EdIntel Professional fully adheres to the Family Educational Rights and Privacy Act (FERPA).
                            We function as an institutional agent, subject to the direct control of the district.
                        </p>
                    </div>

                    <div className="flex-shrink-0">
                        <div className="px-6 py-3 rounded-xl bg-emerald-500 text-black font-black uppercase tracking-widest text-xs">
                            Status: Secure
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* 3. Security Protocols Grid */}
            <section className="px-6 pb-32 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {protocols.map((protocol, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="group p-8 rounded-3xl bg-zinc-900/50 border border-white/5 hover:border-emerald-500/30 transition-all duration-500 hover:-translate-y-1 relative"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />

                            <div className="w-12 h-12 rounded-xl bg-zinc-800 flex items-center justify-center mb-6 group-hover:bg-emerald-500/20 transition-colors">
                                <protocol.icon size={24} className="text-zinc-400 group-hover:text-emerald-400 transition-colors" />
                            </div>

                            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors">
                                {protocol.title}
                            </h3>
                            <p className="text-zinc-500 leading-relaxed group-hover:text-zinc-400 transition-colors">
                                {protocol.content}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* 4. The School Official Exception Explained */}
            <section className="py-24 bg-zinc-950 border-t border-white/5 relative overflow-hidden">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold text-white mb-8">Role and Responsibility</h2>
                    <div className="prose prose-invert prose-lg mx-auto">
                        <p className="text-zinc-400">
                            Under FERPA's <strong className="text-white">"School Official"</strong> exception (34 CFR § 99.31(a)(1)(i)(B)), EdIntel functions as a vendor performing an institutional service.
                        </p>
                        <ul className="text-left text-zinc-400 space-y-4 mt-8 list-none pl-0">
                            <li className="flex items-start gap-3">
                                <Check className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-1" />
                                <span>We perform a service for which the school would otherwise use its own employees.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Check className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-1" />
                                <span>We are under the direct control of the agency or institution with respect to the use and maintenance of education records.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Check className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-1" />
                                <span>We are subject to the requirements of 34 CFR § 99.33(a) governing the use and redisclosure of personally identifiable information from education records.</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
