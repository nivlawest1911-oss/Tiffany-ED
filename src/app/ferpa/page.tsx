'use client';

import { Lock, ShieldCheck, Database, FileKey } from 'lucide-react';
import FloatingNavbar from '@/components/FloatingNavbar';
import Footer from '@/components/Footer';

export default function FERPACompliancePage() {
    return (
        <main className="min-h-screen bg-zinc-50 dark:bg-black transition-colors duration-500">
            <FloatingNavbar />

            <div className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
                <div className="flex items-center gap-3 mb-6 text-indigo-500">
                    <ShieldCheck size={32} />
                    <span className="text-sm font-bold uppercase tracking-widest">Compliance Node</span>
                </div>

                <h1 className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-white mb-2">FERPA Compliance Statement</h1>
                <p className="text-zinc-500 mb-12">Ensuring Legal Defensibility for US Districts</p>

                <div className="prose prose-zinc dark:prose-invert max-w-none">
                    <div className="p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-xl mb-8">
                        <h4 className="text-emerald-500 font-bold m-0 flex items-center gap-2">
                            <CheckCircle size={20} />
                            EdIntel Sovereign is FERPA Compliant
                        </h4>
                        <p className="text-zinc-400 mt-2 text-sm m-0">
                            We adhere to the Family Educational Rights and Privacy Act (20 U.S.C. § 1232g; 34 CFR Part 99).
                        </p>
                    </div>

                    <h3>How We Protect Student Data (PII)</h3>
                    <p>
                        We treat all data entered into our system as potential PII (Personally Identifiable Information). Our architecture is designed to minimize risk:
                    </p>

                    <h3>1. Data Minimization Protocol</h3>
                    <p>
                        We encourage educators to use <strong>pseudonyms or initials</strong> when generating content. However, even if full names are used, our system protects them.
                    </p>

                    <h3>2. Encryption Standards</h3>
                    <p>
                        All databases are encrypted at rest using AES-256. All transmission occurs over HTTPS (TLS 1.2+).
                    </p>

                    <h3>3. No Third-Party PII Sharing</h3>
                    <p>
                        We do not share any student PII with third-party advertisers or data brokers. Our business model is subscription-based, not ad-based.
                    </p>

                    <h3>4. School Official Exception</h3>
                    <p>
                        Under FERPA&apos;s &quot;School Official&quot; exception, EdIntel functions as a vendor performing an institutional service. We remain under the direct control of the school/district with respect to the use and maintenance of education records.
                    </p>

                    <h3>5. Data Destruction</h3>
                    <p>
                        Upon contract termination or written request, we securely execute cryptographic deletion of all student records associated with your account within 30 days.
                    </p>
                </div>
            </div>
            <Footer />
        </main>
    );
}

// Helper component import was missing in previous thought, adding internal definition here or import
function CheckCircle({ size }: { size: number }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
    )
}
