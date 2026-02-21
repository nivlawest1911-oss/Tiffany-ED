"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, FileText, Search, Filter, Download, Eye } from 'lucide-react';
import VaultUpload from './VaultUpload';

const MOCK_DOCUMENTS = [
    { id: '1', title: 'Q1 Financial Report', type: 'PDF', size: '2.4 MB', date: 'Oct 24, 2025', status: 'Encrypted' },
    { id: '2', title: 'Project Alpha Blueprint', type: 'CAD', size: '145 MB', date: 'Oct 22, 2025', status: 'Top Secret' },
    { id: '3', title: 'Executive Meeting Notes', type: 'DOCX', size: '45 KB', date: 'Oct 20, 2025', status: 'Confidential' },
    { id: '4', title: 'Asset Allocation Logic', type: 'JS', size: '12 KB', date: 'Oct 18, 2025', status: 'Encrypted' },
    { id: '5', title: 'Security Audit Log', type: 'CSV', size: '8.2 MB', date: 'Oct 15, 2025', status: 'System' },
];

export default function VaultDashboard() {
    const [documents, _setDocuments] = useState(MOCK_DOCUMENTS);
    const [searchQuery, setSearchQuery] = useState('');

    const handleUploadComplete = () => {
        console.log('Upload complete, refreshing list...');
    };

    const filteredDocs = documents.filter(doc =>
        doc.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6">
            {/* Header Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-slate-900/50 border border-slate-800 p-4 rounded-xl backdrop-blur-sm"
                >
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400">
                            <Shield className="w-5 h-5" />
                        </div>
                        <span className="text-slate-400 font-medium">Secure Storage</span>
                    </div>
                    <div className="text-2xl font-bold text-white">45.2 GB <span className="text-sm font-normal text-slate-500">used</span></div>
                    <div className="w-full bg-slate-800 h-1.5 mt-3 rounded-full overflow-hidden">
                        <div className="bg-indigo-500 h-full w-[45%] rounded-full" />
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-slate-900/50 border border-slate-800 p-4 rounded-xl backdrop-blur-sm"
                >
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400">
                            <FileText className="w-5 h-5" />
                        </div>
                        <span className="text-slate-400 font-medium">Documents</span>
                    </div>
                    <div className="text-2xl font-bold text-white">1,204 <span className="text-sm font-normal text-slate-500">files</span></div>
                    <div className="flex items-center gap-2 mt-3 text-xs text-slate-500">
                        <span className="text-emerald-400">+12 this week</span>
                        <span>•</span>
                        <span>All encrypted</span>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-slate-900/50 border border-slate-800 p-4 rounded-xl backdrop-blur-sm relative overflow-hidden group"
                >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 blur-3xl -mr-16 -mt-16 group-hover:bg-amber-500/10 transition-all duration-500" />
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-amber-500/10 rounded-lg text-amber-400">
                            <Eye className="w-5 h-5" />
                        </div>
                        <span className="text-slate-400 font-medium">Sentinel Auditor</span>
                    </div>
                    <div className="text-2xl font-bold text-white">99.9% <span className="text-sm font-normal text-slate-500">integrity</span></div>
                    <div className="flex items-center gap-2 mt-3 text-xs text-slate-500">
                        <span className="text-amber-400">0 critical gaps</span>
                        <span>•</span>
                        <span>OCR scan active</span>
                    </div>
                </motion.div>
            </div>

            {/* Upload & Search */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                        type="text"
                        placeholder="Search secure documents..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-slate-900/50 border border-slate-800 rounded-lg pl-10 pr-4 py-2 text-sm text-slate-300 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all placeholder:text-slate-600"
                    />
                </div>
                <div className="w-full md:w-auto flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-slate-900/50 border border-slate-800 rounded-lg text-sm text-slate-400 hover:text-white hover:border-slate-700 transition-colors">
                        <Filter className="w-4 h-4" />
                        <span>Filter</span>
                    </button>
                    <div className="w-64">
                        <VaultUpload userId="current-user-id" onUploadComplete={handleUploadComplete} />
                    </div>
                </div>
            </div>

            {/* Sentinel Audit Exceptions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 backdrop-blur-sm">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2">
                            <Shield className="w-4 h-4 text-indigo-400" />
                            Compliance Anomalies
                        </h3>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold">Scanning...</span>
                    </div>
                    <div className="space-y-4">
                        {[
                            { id: 'AN-928', subject: 'IEP Signature Missing', student: 'Marcus T.', risk: 'High' },
                            { id: 'AN-931', subject: 'Inconsistent Service Hours', student: 'Sarah L.', risk: 'Medium' }
                        ].map((issue) => (
                            <div key={issue.id} className="p-3 bg-slate-800/30 rounded-lg border border-slate-800 flex items-center justify-between hover:bg-slate-800/50 transition-colors cursor-pointer group">
                                <div>
                                    <div className="text-xs font-bold text-slate-200 group-hover:text-white transition-colors">{issue.subject}</div>
                                    <div className="text-[10px] text-slate-500">Student: {issue.student} • ID: {issue.id}</div>
                                </div>
                                <div className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${issue.risk === 'High' ? 'bg-rose-500/10 text-rose-500' : 'bg-amber-500/10 text-amber-500'}`}>
                                    {issue.risk}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 backdrop-blur-sm">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2">
                            <FileText className="w-4 h-4 text-emerald-400" />
                            Automated OCR Queue
                        </h3>
                        <span className="text-[10px] text-slate-500">3 Pending</span>
                    </div>
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <div className="flex items-center justify-between text-[10px] uppercase tracking-tighter text-slate-500">
                                <span>Processing Legacy IEP Archive</span>
                                <span>34%</span>
                            </div>
                            <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: '34%' }}
                                    className="h-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]"
                                />
                            </div>
                        </div>
                        <div className="text-[10px] text-slate-500 italic text-center p-4 border border-dashed border-slate-800 rounded-lg">
                            "AI is currently indexing legacy documents for compliance verification and trend analysis."
                        </div>
                        <button className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] font-black uppercase tracking-widest rounded-lg transition-colors">
                            View Full Queue
                        </button>
                    </div>
                </div>
            </div>

            {/* Document List Preview */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden backdrop-blur-sm">
                <div className="p-4 border-b border-slate-800 flex items-center justify-between">
                    <h3 className="text-xs font-black text-white uppercase tracking-widest">Secure Document Registry</h3>
                    <button className="text-[10px] font-bold text-indigo-400 hover:text-indigo-300">View All Architecture</button>
                </div>
                <div className="divide-y divide-slate-800/50">
                    {filteredDocs.map((doc) => (
                        <div key={doc.id} className="p-4 flex items-center justify-between hover:bg-slate-800/30 transition-colors group">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-slate-800 rounded-lg text-slate-400 group-hover:text-indigo-400 transition-colors">
                                    <FileText size={18} />
                                </div>
                                <div>
                                    <div className="text-sm font-medium text-slate-200">{doc.title}</div>
                                    <div className="text-[10px] text-slate-500">{doc.status} • {doc.date}</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 text-xs text-slate-500">
                                <span>{doc.size}</span>
                                <button
                                    className="p-1 text-slate-600 hover:text-white transition-colors"
                                    title="Download Document"
                                >
                                    <Download size={14} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
