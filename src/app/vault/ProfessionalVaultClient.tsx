'use client';

import {
    Shield,
    Lock,
    Download,
    ExternalLink,
    FileText,
    FileCode,
    FileSpreadsheet,
    Search as SearchIcon,
    Terminal
} from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProfessionalVaultClient() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    const documents = [
        {
            id: 'doc-1',
            title: 'FERPA Compliance Protocol v2.4',
            category: 'Legal',
            type: 'PDF',
            size: '2.4 MB',
            updated: '2025-12-10',
            icon: FileText,
            color: 'text-blue-400',
            bgColor: 'bg-blue-500/10'
        },
        {
            id: 'doc-2',
            title: 'AI Ethics & Algorithmic Disclosure',
            category: 'Compliance',
            type: 'DOCX',
            size: '1.2 MB',
            updated: '2025-12-12',
            icon: Shield,
            color: 'text-amber-400',
            bgColor: 'bg-amber-500/10'
        },
        {
            id: 'doc-3',
            title: 'Data Identity Master Agreement',
            category: 'Government',
            type: 'PDF',
            size: '4.8 MB',
            updated: '2025-12-08',
            icon: Lock,
            color: 'text-purple-400',
            bgColor: 'bg-purple-500/10'
        },
        {
            id: 'doc-4',
            title: 'Intervention Logic Flowchart',
            category: 'Technical',
            type: 'SVG',
            size: '850 KB',
            updated: '2025-12-14',
            icon: FileCode,
            color: 'text-emerald-400',
            bgColor: 'bg-emerald-500/10'
        },
        {
            id: 'doc-5',
            title: 'District ROI & Vitality Forecast',
            category: 'Analytics',
            type: 'XLSX',
            size: '3.1 MB',
            updated: '2025-12-11',
            icon: FileSpreadsheet,
            color: 'text-rose-400',
            bgColor: 'bg-rose-500/10'
        }
    ];

    const categories = ['All', 'Legal', 'Compliance', 'Government', 'Technical', 'Analytics'];

    const filteredDocuments = documents.filter(doc => {
        const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || doc.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <main className="content-stage">
            <div className="max-w-7xl mx-auto px-6 py-24 relative z-10">
                {/* Header */}
                <header className="mb-12">
                    <div className="flex items-center gap-2 text-amber-500 text-xs font-black uppercase tracking-widest mb-4">
                        <Terminal size={14} />
                        <span>EdIntel Knowledge Base</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-4">
                        Professional <span className="text-amber-500 italic">Vault</span>
                    </h1>
                    <p className="text-xl text-zinc-400 max-w-2xl">
                        Decrypted administrative protocols, compliance blueprints, and tactical intelligence for the EdIntel educator.
                    </p>
                </header>

                {/* Controls */}
                <div className="flex flex-col md:flex-row gap-6 mb-12">
                    <div className="relative flex-1 group">
                        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-amber-500 transition-colors" size={20} />
                        <input
                            type="text"
                            placeholder="Search decrypted files..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-zinc-900/50 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-500/50 transition-all font-mono text-sm"
                        />
                    </div>

                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all whitespace-nowrap border ${selectedCategory === cat
                                    ? 'bg-amber-500 text-black border-amber-500 shadow-lg shadow-amber-500/20'
                                    : 'bg-zinc-900 text-zinc-500 border-white/5 hover:border-white/20'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Document Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence mode="popLayout">
                        {filteredDocuments.map((doc, idx) => (
                            <motion.div
                                key={doc.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.2 }}
                                className="group p-8 rounded-3xl bg-zinc-900/80 border border-white/5 hover:border-amber-500/30 transition-all hover:shadow-2xl hover:shadow-amber-500/5 relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <ExternalLink size={14} className="text-zinc-500 hover:text-amber-500 cursor-pointer" />
                                </div>

                                <div className={`w-14 h-14 rounded-2xl ${doc.bgColor} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                    <doc.icon className={doc.color} size={28} />
                                </div>

                                <div className="space-y-4">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <span className="text-[10px] font-mono text-amber-500/50">{doc.category}</span>
                                            <span className="w-1 h-1 rounded-full bg-zinc-800" />
                                            <span className="text-[10px] font-mono text-zinc-600">{doc.type} • {doc.size}</span>
                                        </div>
                                        <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors leading-tight">
                                            {doc.title}
                                        </h3>
                                    </div>

                                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                        <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">Modified: {doc.updated}</span>
                                        <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-amber-500 hover:text-amber-400 transition-colors">
                                            <Download size={14} />
                                            Download
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Upsell Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="mt-20 p-12 rounded-[2.5rem] bg-gradient-to-br from-amber-500/20 to-zinc-900 border border-amber-500/20 text-center relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 p-12 opacity-10">
                        <Lock size={120} />
                    </div>

                    <h2 className="text-3xl font-black text-white mb-4">Request Classified Access</h2>
                    <p className="text-zinc-400 max-w-xl mx-auto mb-8 font-medium">
                        Custom district governance documents and enterprise-level risk assessments are available upon credential verification.
                    </p>
                    <button className="px-12 py-5 bg-amber-500 text-black font-black uppercase text-xs tracking-widest hover:bg-amber-400 transition-all rounded-2xl shadow-xl shadow-amber-500/20">
                        Verify Credentials
                    </button>
                </motion.div>
            </div>
        </main>
    );
}
