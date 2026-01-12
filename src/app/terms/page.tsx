'use client';

import { FileText, Gavel, Scale } from 'lucide-react';
import FloatingNavbar from '@/components/FloatingNavbar';
import Footer from '@/components/Footer';

export default function TermsOfServicePage() {
    return (
        <main className="min-h-screen bg-zinc-50 dark:bg-black transition-colors duration-500">
            <FloatingNavbar />

            <div className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
                <div className="flex items-center gap-3 mb-6 text-indigo-500">
                    <Gavel size={32} />
                    <span className="text-sm font-bold uppercase tracking-widest">Legal Framework</span>
                </div>

                <h1 className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-white mb-2">Terms of Service</h1>
                <p className="text-zinc-500 mb-12">Effective Date: {new Date().toLocaleDateString()}</p>

                <div className="prose prose-zinc dark:prose-invert max-w-none">
                    <h3>1. Acceptance of Protocol</h3>
                    <p>
                        By initializing a node (creating an account) on EdIntel Sovereign, you agree to these legal terms. If you do not agree, you must terminate your session immediately.
                    </p>

                    <h3>2. Usage License</h3>
                    <p>
                        EdIntel grants you a limited, non-exclusive, non-transferable license to use our cognitive automation tools for professional educational purposes. This license is revoked immediately upon non-payment or violation of these terms.
                    </p>

                    <h3>3. AI Output Disclaimer</h3>
                    <p>
                        EdIntel uses advanced artificial intelligence to generate content. While we strive for accuracy, AI can hallucinate. <strong>You, the human expert, remain the sovereign authority.</strong> You are responsible for reviewing and validating all outputs (IEPs, lesson plans, emails) before official use. EdIntel accepts no liability for unreviewed AI outputs.
                    </p>

                    <h3>4. Subscription & Billing</h3>
                    <p>
                        Subscriptions renew automatically. You may cancel at any time via your dashboard. Refunds are processed according to our Fair Use Policy (typically pro-rated for unused time upon request within 7 days).
                    </p>

                    <h3>5. Prohibited Conduct</h3>
                    <p>
                        You may not:
                    </p>
                    <ul>
                        <li>Reverse engineer our source code</li>
                        <li>Use our platform to generate illegal or harmful content</li>
                        <li>Share your account credentials (one license per human)</li>
                    </ul>

                    <h3>6. Termination</h3>
                    <p>
                        We reserve the right to terminate access for users who violate these terms or abuse the API limits.
                    </p>
                </div>
            </div>
            <Footer />
        </main>
    );
}
