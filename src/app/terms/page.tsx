'use client';

import { Scale, AlertCircle, Gavel, Check, ScrollText } from 'lucide-react';
import FloatingNavbar from '@/components/FloatingNavbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';

export default function TermsPage() {
    return (
        <main className="min-h-screen bg-black text-white selection:bg-indigo-500/30">
            <FloatingNavbar />

            {/* Header */}
            <div className="pt-32 pb-16 px-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[500px] bg-purple-900/10 blur-[120px] pointer-events-none" />

                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-black uppercase tracking-widest mb-6"
                    >
                        <Scale size={12} />
                        <span>Service Agreement</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-black mb-6 tracking-tight"
                    >
                        Terms of Service
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed"
                    >
                        The conditions governing the use of the EdIntel Professional platform and the deployment of its capabilities.
                    </motion.p>
                </div>
            </div>

            {/* Content Container */}
            <section className="px-6 pb-24 max-w-4xl mx-auto">
                <div className="p-8 md:p-12 rounded-3xl bg-zinc-950 border border-white/5 prose prose-invert prose-zinc max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-purple-400 hover:prose-a:text-purple-300">

                    <div className="flex items-center gap-4 p-4 rounded-xl bg-purple-500/10 border border-purple-500/20 not-prose mb-12">
                        <AlertCircle className="w-6 h-6 text-purple-400 flex-shrink-0" />
                        <p className="text-sm text-purple-200 m-0">
                            By accessing or using EdIntel Professional, you agree to be bound by these Terms. If you disagree with any part of the terms, you must not use the Service.
                        </p>
                    </div>

                    <h2>1. Use of Service</h2>
                    <p>
                        EdIntel Professional grants you a limited, non-exclusive, non-transferable, and revocable license to use the Service strictly in accordance with these Terms.
                    </p>
                    <ul>
                        <li>You must be a verified educator or administrator to access certain features.</li>
                        <li>You agree not to use the Service for any illegal or unauthorized purpose.</li>
                        <li>You must not attempt to reverse engineer or disrupt the integrity of our strategic infrastructure.</li>
                    </ul>

                    <h2>2. Intellectual Property Rights</h2>
                    <p>
                        <strong>Your Content:</strong> You retain full ownership of all data, text, and files you upload or generate using the Service ("User Content"). We claim no intellectual property rights over the material you provide to the Service.
                    </p>
                    <p>
                        <strong>Our Content:</strong> The Service itself, including its original content, features, and functionality (but excluding User Content), is and will remain the exclusive property of EdIntel Professional and its licensors.
                    </p>

                    <h2>3. FERPA Compliance & Education Records</h2>
                    <p>
                        We acknowledge that User Content may include personally identifiable information from education records that are subject to FERPA. We agree to be considered a "School Official" with a legitimate educational interest in such records, as defined under FERPA.
                    </p>
                    <ul className="not-prose grid gap-2 my-6">
                        <li className="flex items-start gap-3 text-zinc-400 text-sm">
                            <Check className="w-4 h-4 text-green-500 mt-1" />
                            <span>We will not disclose any education records to third parties except as required by law.</span>
                        </li>
                        <li className="flex items-start gap-3 text-zinc-400 text-sm">
                            <Check className="w-4 h-4 text-green-500 mt-1" />
                            <span>We maintain a comprehensive security program reasonably designed to protect the security, privacy, confidentiality, and integrity of student personal information.</span>
                        </li>
                    </ul>

                    <h2>4. Limitation of Liability</h2>
                    <p>
                        In no event shall EdIntel Professional, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
                    </p>

                    <h2>5. Termination</h2>
                    <p>
                        We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the Service will immediately cease.
                    </p>

                    <h2>6. Governing Law</h2>
                    <p>
                        These Terms shall be governed and construed in accordance with the laws of Alabama, United States, without regard to its conflict of law provisions.
                    </p>

                    <hr className="border-white/10 my-12" />

                    <h3>Contact Us</h3>
                    <p>
                        If you have any questions about these Terms, please contact us via our secure uplink at:
                    </p>
                    <p className="not-prose">
                        <a href="mailto:dralvinwest@transcendholisticwellness.com" className="inline-flex items-center gap-2 text-purple-400 hover:text-white transition-colors font-medium">
                            <ScrollText size={16} />
                            dralvinwest@transcendholisticwellness.com
                        </a>
                    </p>

                </div>
            </section>

            <Footer />
        </main>
    );
}
