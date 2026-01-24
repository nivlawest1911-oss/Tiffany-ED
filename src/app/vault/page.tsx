'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, FileText, Download, Gavel, Search, Key, Eye, ScrollText, Brain } from 'lucide-react';
import FloatingNavbar from '@/components/FloatingNavbar';
import Link from 'next/link';

export default function ProfessionalVault() {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState('all'); // all, legal, policy, contract, intel
    const [archivedIntel, setArchivedIntel] = useState<any[]>([]);

    const staticDocuments = [
        { id: 'ferpa', title: 'FERPA Leadership Defense', type: 'legal', date: '2024-03-15', status: 'Verified', confidence: '100%' },
        { id: 'iep', title: 'IEP Due Process Shield (Template)', type: 'legal', date: '2024-03-10', status: 'Verified', confidence: '99%' },
        { id: 'contract', title: 'Teacher Contract: IP Protection', type: 'contract', date: '2024-02-28', status: 'Draft', confidence: '95%' },
        { id: 'ai-policy', title: 'AI Usage Policy (Board Approved)', type: 'policy', date: '2024-02-15', status: 'Active', confidence: '100%' },
        { id: 'manifesto', title: 'Manifesto for Digital Rights', type: 'policy', date: '2024-01-01', status: 'Immutable', confidence: '100%' },
        { id: 'privacy', title: 'Vendor Data Privacy Rider', type: 'contract', date: '2024-03-20', status: 'Verified', confidence: '98%' },
    ];

    // Load AI Intel from LocalStorage
    useState(() => {
        if (typeof window !== 'undefined') {
            try {
                const intel = JSON.parse(localStorage.getItem('leadership_intel') || localStorage.getItem('sovereign_intel') || '[]');
                setArchivedIntel(intel);
            } catch (e) { console.error(e); }
        }
    });

    const documents = [...archivedIntel, ...staticDocuments];
    const filteredDocs = documents.filter(doc => (activeTab === 'all' || doc.type === activeTab) && doc.title.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className="min-h-screen bg-black text-white selection:bg-amber-500/30 font-sans">
            <FloatingNavbar />

            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 z-50" />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-10" />
            </div>

            <main className="max-w-7xl mx-auto px-6 py-24 relative z-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-white/10 pb-8">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/50 border border-amber-500/30 text-amber-500 text-[10px] font-black uppercase tracking-[0.2em] mb-4">
                            <Lock size={12} />
                            <span>Level 5 Security Clearance</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight">
                            Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-600">Vault</span>
                        </h1>
                        <p className="text-zinc-500 max-w-xl mt-4">
                            The ultimate repository of legal defenses, ironclad contracts, and strategic policies. Protect your career and your institution.
                        </p>
                    </div>

                    <div className="mt-8 md:mt-0 flex gap-4">
                        <div className="text-right">
                            <div className="text-xs text-zinc-500 uppercase tracking-widest mb-1">Vault Status</div>
                            <div className="text-emerald-500 font-bold flex items-center justify-end gap-2 text-sm">
                                <Lock size={16} /> SECURE
                            </div>
                        </div>
                    </div>
                </div>

                {/* Controls */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
                    <div className="lg:col-span-6">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={20} />
                            <input
                                type="text"
                                placeholder="Search the Vault..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-4 pl-12 pr-4 text-white focus:border-amber-500 outline-none transition-all"
                            />
                        </div>
                    </div>
                    <div className="lg:col-span-6 flex gap-2">
                        {['all', 'legal', 'contract', 'policy', 'intel'].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`flex-1 rounded-xl font-bold text-[10px] uppercase tracking-wider transition-all border ${activeTab === tab ? 'bg-amber-600 border-amber-500 text-white' : 'bg-zinc-900 border-zinc-800 text-zinc-500 hover:text-white'}`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Document Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredDocs.map((doc: any) => (
                        <motion.div
                            key={doc.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            whileHover={{ y: -5 }}
                            className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl group cursor-pointer hover:border-amber-500/30 transition-all relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                <Gavel size={80} />
                            </div>

                            <div className="flex justify-between items-start mb-6">
                                <div className={`p-3 rounded-lg ${doc.type === 'legal' ? 'bg-red-900/20 text-red-500' : doc.type === 'contract' ? 'bg-blue-900/20 text-blue-500' : doc.type === 'intel' ? 'bg-purple-900/20 text-purple-500' : 'bg-green-900/20 text-green-500'}`}>
                                    {doc.type === 'legal' ? <Gavel size={24} /> : doc.type === 'contract' ? <FileText size={24} /> : doc.type === 'intel' ? <Brain size={24} /> : <ScrollText size={24} />}
                                </div>
                                <div className="px-2 py-1 rounded bg-zinc-950 border border-zinc-800 text-[10px] font-mono text-zinc-400">
                                    {doc.date}
                                </div>
                            </div>

                            <h3 className="text-lg font-bold text-white mb-2 leading-tight group-hover:text-amber-500 transition-colors">
                                {doc.title}
                                {doc.delegate && <span className="block text-[10px] text-zinc-500 mt-1 uppercase tracking-widest">Architect: {doc.delegate}</span>}
                            </h3>

                            <div className="flex items-center gap-4 text-xs font-mono text-zinc-500 mb-6">
                                <span className="flex items-center gap-1"><CheckCircleIcon status={doc.status} /> {doc.status}</span>
                                <span className="flex items-center gap-1 text-amber-500/80"><Key size={10} /> {doc.rank || `Conf: ${doc.confidence}`}</span>
                            </div>

                            <div className="flex gap-2">
                                <button className="flex-1 py-2 bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 rounded-lg text-xs font-bold uppercase tracking-wider text-zinc-300 transition-colors flex items-center justify-center gap-2">
                                    <Eye size={12} /> Preview
                                </button>
                                <button className="flex-1 py-2 bg-white text-black rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2">
                                    <Download size={12} /> Access
                                </button>
                            </div>
                        </motion.div>
                    ))}

                    {/* Upsell Card - The "Secret" Files */}
                    <div className="bg-gradient-to-br from-amber-900/20 to-black border border-dashed border-amber-900/50 p-6 rounded-2xl flex flex-col items-center justify-center text-center group cursor-pointer hover:border-amber-500/50 transition-all">
                        <div className="p-4 bg-amber-500/10 rounded-full text-amber-500 mb-4 group-hover:scale-110 transition-transform">
                            <Lock size={32} />
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">Unlock Master Files</h3>
                        <p className="text-xs text-zinc-500 mb-6 max-w-[200px]">
                            Access 500+ premium executive templates, including Board Resignation Letters and Liability Waivers.
                        </p>
                        <Link href="/pricing">
                            <button className="px-6 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-all shadow-lg shadow-amber-900/20">
                                Upgrade Clearance
                            </button>
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}

function CheckCircleIcon({ status }: { status: string }) {
    if (status === 'Verified' || status === 'Active' || status === 'Immutable') return <div className="w-2 h-2 rounded-full bg-emerald-500" />;
    return <div className="w-2 h-2 rounded-full bg-zinc-600" />;
}
