'use client';

/**
 * Gemini Workspace Hub - Import and manage content from Google Gemini
 */

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Upload,
    FileText,
    Image as ImageIcon,
    MessageSquare,
    Workflow,
    Sparkles,
    FolderOpen,
    Search,
    Tag,
    TrendingUp,
    CheckCircle,
    XCircle,
    Loader2,
    Download,
    Eye,
    Trash2,
    Star,
    Brain,
} from 'lucide-react';
import { useDropzone } from 'react-dropzone';

interface ImportedContent {
    id: string;
    type: 'conversation' | 'image' | 'document' | 'prompt' | 'workflow';
    title: string;
    content: string;
    tags: string[];
    category: string;
    relatedFeatures: string[];
    timestamp: Date;
}

export default function GeminiWorkspaceHub() {
    const [activeTab, setActiveTab] = useState<'import' | 'library' | 'workflows'>('import');
    const [importedContent, setImportedContent] = useState<ImportedContent[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            {/* Header */}
            <div className="relative overflow-hidden bg-gradient-to-r from-purple-600/20 to-pink-600/20 border-b border-purple-500/30">
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
                <div className="relative max-w-7xl mx-auto px-6 py-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                    >
                        <div className="inline-flex items-center gap-3 mb-4">
                            <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl">
                                <Sparkles className="w-8 h-8 text-white" />
                            </div>
                            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400 bg-clip-text text-transparent">
                                Gemini Workspace Hub
                            </h1>
                        </div>
                        <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                            Import and integrate your Google Gemini content into EdIntel Professional
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Tabs */}
            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="flex gap-4 mb-8">
                    <TabButton
                        active={activeTab === 'import'}
                        onClick={() => setActiveTab('import')}
                        icon={Upload}
                        label="Import Content"
                    />
                    <TabButton
                        active={activeTab === 'library'}
                        onClick={() => setActiveTab('library')}
                        icon={FolderOpen}
                        label="Content Library"
                    />
                    <TabButton
                        active={activeTab === 'workflows'}
                        onClick={() => setActiveTab('workflows')}
                        icon={Workflow}
                        label="Workflows"
                    />
                </div>

                {/* Content */}
                <AnimatePresence mode="wait">
                    {activeTab === 'import' && (
                        <ImportTab
                            key="import"
                            onImport={(content) => setImportedContent([...importedContent, content])}
                        />
                    )}
                    {activeTab === 'library' && (
                        <LibraryTab
                            key="library"
                            content={importedContent}
                            searchQuery={searchQuery}
                            onSearch={setSearchQuery}
                        />
                    )}
                    {activeTab === 'workflows' && (
                        <WorkflowsTab
                            key="workflows"
                            content={importedContent.filter(c => c.type === 'workflow')}
                        />
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

/**
 * Tab Button Component
 */
function TabButton({ active, onClick, icon: Icon, label }: any) {
    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${active
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/50'
                    : 'bg-slate-800/50 text-slate-400 hover:text-white'
                }`}
        >
            <span className="flex items-center gap-2">
                <Icon className="w-5 h-5" />
                {label}
            </span>
        </motion.button>
    );
}

/**
 * Import Tab
 */
function ImportTab({ onImport }: { onImport: (content: ImportedContent) => void }) {
    const [textContent, setTextContent] = useState('');
    const [contentType, setContentType] = useState<ImportedContent['type']>('conversation');
    const [loading, setLoading] = useState(false);

    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        setLoading(true);
        try {
            for (const file of acceptedFiles) {
                const formData = new FormData();
                formData.append('file', file);

                const response = await fetch('/api/gemini/upload', {
                    method: 'POST',
                    body: formData,
                });

                const data = await response.json();

                if (data.success) {
                    const imported: ImportedContent = {
                        id: data.id,
                        type: 'image',
                        title: file.name,
                        content: data.url,
                        tags: [],
                        category: 'General',
                        relatedFeatures: [],
                        timestamp: new Date(),
                    };
                    onImport(imported);
                }
            }
        } catch (error) {
            console.error('Upload error:', error);
        } finally {
            setLoading(false);
        }
    }, [onImport]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp'],
            'application/pdf': ['.pdf'],
            'text/*': ['.txt', '.md'],
        },
    });

    const handleTextImport = async () => {
        if (!textContent.trim()) return;

        setLoading(true);
        try {
            const response = await fetch('/api/gemini/import', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    content: textContent,
                    type: contentType,
                }),
            });

            const data = await response.json();

            if (data.success) {
                onImport(data.content);
                setTextContent('');
            }
        } catch (error) {
            console.error('Import error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid lg:grid-cols-2 gap-8"
        >
            {/* File Upload */}
            <div className="bg-slate-800/50 backdrop-blur-xl rounded-3xl p-8 border border-slate-700">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <Upload className="w-6 h-6 text-purple-400" />
                    Upload Files
                </h2>

                <div
                    {...getRootProps()}
                    className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all ${isDragActive
                            ? 'border-purple-500 bg-purple-500/10'
                            : 'border-slate-600 hover:border-purple-500/50'
                        }`}
                >
                    <input {...getInputProps()} />
                    <Upload className="w-16 h-16 mx-auto mb-4 text-slate-500" />
                    <p className="text-slate-300 mb-2">
                        {isDragActive ? 'Drop files here...' : 'Drag & drop files here'}
                    </p>
                    <p className="text-sm text-slate-500">
                        or click to browse (images, PDFs, text files)
                    </p>
                </div>

                {loading && (
                    <div className="mt-4 flex items-center justify-center gap-2 text-purple-400">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Uploading...</span>
                    </div>
                )}
            </div>

            {/* Text Import */}
            <div className="bg-slate-800/50 backdrop-blur-xl rounded-3xl p-8 border border-slate-700">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <FileText className="w-6 h-6 text-pink-400" />
                    Import Text Content
                </h2>

                <div className="space-y-4">
                    <div>
                        <label className="text-sm font-semibold text-slate-300 mb-2 block">
                            Content Type
                        </label>
                        <select
                            value={contentType}
                            onChange={(e) => setContentType(e.target.value as any)}
                            className="w-full bg-slate-900/50 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                            <option value="conversation">Conversation</option>
                            <option value="prompt">Prompt</option>
                            <option value="document">Document</option>
                            <option value="workflow">Workflow</option>
                        </select>
                    </div>

                    <div>
                        <label className="text-sm font-semibold text-slate-300 mb-2 block">
                            Content
                        </label>
                        <textarea
                            value={textContent}
                            onChange={(e) => setTextContent(e.target.value)}
                            placeholder="Paste your Gemini content here..."
                            className="w-full h-64 bg-slate-900/50 border border-slate-700 rounded-xl p-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                        />
                    </div>

                    <button
                        onClick={handleTextImport}
                        disabled={loading || !textContent.trim()}
                        className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-2">
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Importing...
                            </span>
                        ) : (
                            <span className="flex items-center justify-center gap-2">
                                <Sparkles className="w-5 h-5" />
                                Import with AI Analysis
                            </span>
                        )}
                    </button>
                </div>
            </div>
        </motion.div>
    );
}

/**
 * Library Tab
 */
function LibraryTab({ content, searchQuery, onSearch }: any) {
    const categories = ['All', 'IEP', 'Lesson Planning', 'Student Data', 'Communication', 'Assessment'];
    const [selectedCategory, setSelectedCategory] = useState('All');

    const filteredContent = content.filter((item: ImportedContent) => {
        const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.content.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
        >
            {/* Search & Filters */}
            <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-700">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => onSearch(e.target.value)}
                            placeholder="Search content..."
                            className="w-full pl-12 pr-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>
                    <div className="flex gap-2 overflow-x-auto">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all ${selectedCategory === cat
                                        ? 'bg-purple-600 text-white'
                                        : 'bg-slate-700/50 text-slate-400 hover:text-white'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Content Grid */}
            {filteredContent.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredContent.map((item: ImportedContent) => (
                        <ContentCard key={item.id} content={item} />
                    ))}
                </div>
            ) : (
                <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-12 border border-slate-700 text-center">
                    <FolderOpen className="w-16 h-16 mx-auto mb-4 text-slate-600" />
                    <p className="text-slate-400">No content found</p>
                    <p className="text-sm text-slate-500 mt-2">Import content from the Import tab</p>
                </div>
            )}
        </motion.div>
    );
}

/**
 * Content Card Component
 */
function ContentCard({ content }: { content: ImportedContent }) {
    const typeIcons = {
        conversation: MessageSquare,
        image: ImageIcon,
        document: FileText,
        prompt: Brain,
        workflow: Workflow,
    };

    const Icon = typeIcons[content.type];

    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-700 hover:border-purple-500/50 transition-all"
        >
            <div className="flex items-start justify-between mb-4">
                <div className="p-2 bg-purple-500/20 rounded-lg">
                    <Icon className="w-5 h-5 text-purple-400" />
                </div>
                <span className="text-xs px-2 py-1 bg-slate-700 rounded-full text-slate-300">
                    {content.category}
                </span>
            </div>

            <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">
                {content.title}
            </h3>

            {content.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                    {content.tags.slice(0, 3).map((tag, i) => (
                        <span key={i} className="text-xs px-2 py-1 bg-purple-500/20 text-purple-300 rounded-full">
                            {tag}
                        </span>
                    ))}
                </div>
            )}

            <div className="flex items-center gap-2 text-sm text-slate-400">
                <span>{new Date(content.timestamp).toLocaleDateString()}</span>
            </div>
        </motion.div>
    );
}

/**
 * Workflows Tab
 */
function WorkflowsTab({ content }: { content: ImportedContent[] }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-slate-800/50 backdrop-blur-xl rounded-3xl p-8 border border-slate-700"
        >
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Workflow className="w-6 h-6 text-purple-400" />
                Imported Workflows
            </h2>

            {content.length > 0 ? (
                <div className="space-y-4">
                    {content.map((workflow) => (
                        <div key={workflow.id} className="bg-slate-900/50 rounded-xl p-6 border border-slate-700">
                            <h3 className="text-lg font-semibold text-white mb-2">{workflow.title}</h3>
                            <p className="text-slate-400 text-sm">{workflow.content.substring(0, 200)}...</p>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-12">
                    <Workflow className="w-16 h-16 mx-auto mb-4 text-slate-600" />
                    <p className="text-slate-400">No workflows imported yet</p>
                </div>
            )}
        </motion.div>
    );
}
