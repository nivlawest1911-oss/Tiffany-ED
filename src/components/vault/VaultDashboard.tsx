"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, FileText, Search, Filter, Download, MoreVertical, Eye } from 'lucide-react';
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
        // Refresh document list
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
                    className="bg-slate-900/50 border border-slate-800 p-4 rounded-xl backdrop-blur-sm"
                >
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-amber-500/10 rounded-lg text-amber-400">
                            <Eye className="w-5 h-5" />
                        </div>
                        <span className="text-slate-400 font-medium">Audit Log</span>
                    </div>
                    <div className="text-2xl font-bold text-white">99.9% <span className="text-sm font-normal text-slate-500">integrity</span></div>
                    <div className="flex items-center gap-2 mt-3 text-xs text-slate-500">
                        <span className="text-amber-400">0 anomalies</span>
                        <span>•</span>
                        <span>Last scan: 2m ago</span>
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

            {/* Document List */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden backdrop-blur-sm">
                <div className="grid grid-cols-12 gap-4 p-4 border-b border-slate-800 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    <div className="col-span-5">Document Name</div>
                    <div className="col-span-2">Type</div>
                    <div className="col-span-2">Size</div>
                    <div className="col-span-2">Date Added</div>
                    <div className="col-span-1 text-right">Action</div>
                </div>
                <div className="divide-y divide-slate-800/50">
                    {filteredDocs.map((doc) => (
                        <motion.div
                            key={doc.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-slate-800/30 transition-colors group"
                        >
                            <div className="col-span-5 flex items-center gap-3">
                                <div className="p-2 bg-slate-800 rounded-lg text-slate-400 group-hover:text-indigo-400 group-hover:bg-indigo-500/10 transition-colors">
                                    <FileText className="w-5 h-5" />
                                </div>
                                <div>
                                    <div className="font-medium text-slate-200 group-hover:text-white transition-colors">{doc.title}</div>
                                    <div className="text-xs text-slate-500 flex items-center gap-1.5">
                                        {doc.status === 'Top Secret' && <span className="w-1.5 h-1.5 rounded-full bg-red-500" />}
                                        {doc.status === 'Confidential' && <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />}
                                        {doc.status === 'Encrypted' && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />}
                                        {doc.status}
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-2 text-sm text-slate-400">{doc.type}</div>
                            <div className="col-span-2 text-sm text-slate-400">{doc.size}</div>
                            <div className="col-span-2 text-sm text-slate-400">{doc.date}</div>
                            <div className="col-span-1 flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button className="p-1.5 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition-colors">
                                    <Download className="w-4 h-4" />
                                </button>
                                <button className="p-1.5 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition-colors">
                                    <MoreVertical className="w-4 h-4" />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                    {filteredDocs.length === 0 && (
                        <div className="p-8 text-center text-slate-500">
                            No documents found matching your search.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
