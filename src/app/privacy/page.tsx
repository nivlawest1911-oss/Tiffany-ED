'use client';

import { Shield, Lock, FileText, CheckCircle } from 'lucide-react';
import FloatingNavbar from '@/components/FloatingNavbar';
import Footer from '@/components/Footer';

export default function PrivacyPolicyPage() {
    return (
        <main className="min-h-screen bg-zinc-50 dark:bg-black transition-colors duration-500">
            <FloatingNavbar />

            <div className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
                <div className="flex items-center gap-3 mb-6 text-indigo-500">
                    <Shield size={32} />
                    <span className="text-sm font-bold uppercase tracking-widest">Sovereign Protocol</span>
                </div>

                <h1 className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-white mb-2">Privacy Policy</h1>
                <p className="text-zinc-500 mb-12">Last Updated: {new Date().toLocaleDateString()}</p>

                <div className="prose prose-zinc dark:prose-invert max-w-none">
                    <h3>1. Sovereign Data Ownership</h3>
                    <p>
                        EdIntel Sovereign operates on a principle of absolute data sovereignty. You retain full ownership of all data, protocols, and intellectual property generated within our system. We do not sell, rent, or monetize your data to third parties.
                    </p>

                    <h3>2. Information We Collect</h3>
                    <p>
                        We collect only the minimum viable data necessary for protocol execution:
                    </p>
                    <ul>
                        <li>Account Credentials (encrypted)</li>
                        <li>Usage Metrics (for system optimization)</li>
                        <li>User-generated content (stored securely for your retrieval)</li>
                    </ul>

                    <h3>3. AI Processing & Zero training</h3>
                    <p>
                        <strong>Crucial:</strong> Data submitted to our AI models is used strictly for generation. We have strict agreements with our LLM providers (OpenAI, Anthropic, Google) that ensure <strong>your data is NOT used to train their public models.</strong> Your cognitive output remains yours.
                    </p>

                    <h3>4. Security Architecture</h3>
                    <p>
                        We employ military-grade encryption (AES-256) for data at rest and TLS 1.3 for data in transit. Our infrastructure is segmented to prevent unauthorized lateral movement.
                    </p>

                    <h3>5. Your Rights</h3>
                    <p>
                        You have the right to:
                    </p>
                    <ul>
                        <li>Export your data at any time (Data Portability)</li>
                        <li>Request full deletion of your account (Right to be Forgotten)</li>
                        <li>Audit our access logs regarding your account</li>
                    </ul>

                    <h3>6. Contact Command</h3>
                    <p>
                        For privacy concerns, contact our Data Protection Officer directly at: <br />
                        <a href="mailto:dralvinwest@transcendholisticwellness.com" className="text-indigo-500 hover:underline">dralvinwest@transcendholisticwellness.com</a>
                    </p>
                </div>
            </div>
            <Footer />
        </main>
    );
}
