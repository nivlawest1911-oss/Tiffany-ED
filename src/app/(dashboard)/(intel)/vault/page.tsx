"use client";

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Shield, Upload, MessageSquare, Send, Bot, User, Database, Loader2, Cpu, Zap, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { toast } from 'sonner';
import { HolographicBackground } from "@/components/holographic/HolographicBackground";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import VaultDocumentLibrary from '@/components/vault/VaultDocumentLibrary';
import LegacyLedgerTimeline from '@/components/vault/LegacyLedgerTimeline';

export default function LeadershipVaultPage() {
    const [isLegacyMode, setIsLegacyMode] = useState(false);
    const [documentText, setDocumentText] = useState("");
    const [fileName, setFileName] = useState("");
    const [isLogicEngineEnabled, setIsLogicEngineEnabled] = useState(false);
    const [messages, setMessages] = useState<{ role: 'user' | 'ai', content: string }[]>([]);
    const [input, setInput] = useState("");
    const [isThinking, setIsThinking] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        const reader = new FileReader();

        reader.onload = async (event) => {
            const text = event.target?.result as string;

            try {
                const response = await fetch('/api/vault/documents', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        fileName: file.name,
                        content: text,
                        metadata: { size: file.size, type: file.type },
                        tags: ['Institutional']
                    })
                });

                if (response.ok) {
                    setDocumentText(text);
                    setFileName(file.name);
                    toast.success("Document securely archived in the Vault.");
                    setMessages([{ role: 'ai', content: `Document **${file.name}** has been ingested into the persistent institutional library. I am ready for analysis.` }]);
                } else {
                    throw new Error("Failed to save to vault");
                }
            } catch (_err) {
                toast.error("Failed to archive document. Technical uplink error.");
            } finally {
                setIsUploading(false);
            }
        };
        reader.readAsText(file);
    };

    const handleDocSelect = (doc: any) => {
        setDocumentText(doc.content || "");
        setFileName(doc.fileName);
        setMessages([{
            role: 'ai',
            content: `Uplink established with **${doc.fileName}**. Retrieval-Augmented Generation (RAG) is active. How can I assist with this intelligence asset?`
        }]);
        toast.info(`Intelligence asset ${doc.fileName} loaded.`);
    };

    const handleSendMessage = async () => {
        if (!input.trim() || !documentText) return;

        const newMessages = [...messages, { role: 'user' as const, content: input }];
        setMessages(newMessages);
        setInput("");
        setIsThinking(true);

        try {
            const response = await fetch('/api/vault/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: newMessages.slice(-5),
                    documentContext: documentText.substring(0, 15000),
                    isLogicEngineEnabled // Pass reasoning mode to API
                })
            });

            if (!response.ok) throw new Error('Vault query failed');

            const data = await response.json();
            setMessages([...newMessages, { role: 'ai', content: data.reply }]);
        } catch (error: any) {
            console.error(error);
            toast.error("Error communicating with Sovereign Vault.");
        } finally {
            setIsThinking(false);
        }
    };

    return (
        <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden">
            <HolographicBackground />

            <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
                <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-4"
                    >
                        <div className="flex items-center gap-3 text-cyan-400 mb-2">
                            <div className="p-2 bg-cyan-950/50 rounded-lg border border-cyan-500/30 shadow-[0_0_15px_rgba(34,211,238,0.2)]">
                                <Shield className="w-6 h-6" />
                            </div>
                            <span className="text-xs font-black uppercase tracking-[0.3em]">Institutional Intelligence</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white uppercase">
                            Leadership <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 italic">Vault</span>
                        </h1>
                        <p className="text-zinc-400 text-sm max-w-xl leading-relaxed">
                            Interrogate policies, data exports, and strategic documents with localized RAG and enhanced reasoning.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-4 bg-zinc-900/80 p-3 rounded-2xl border border-white/5 backdrop-blur-xl"
                    >
                        <div className="flex flex-col">
                            <span className="text-[10px] font-black text-cyan-500 uppercase tracking-widest">Logic Engine</span>
                            <span className="text-xs text-zinc-500 font-medium">{isLogicEngineEnabled ? 'Deep Reasoning Active' : 'Standard Response'}</span>
                        </div>
                        <button
                            onClick={() => setIsLogicEngineEnabled(!isLogicEngineEnabled)}
                            title={isLogicEngineEnabled ? "Disable Deep Reasoning" : "Enable Deep Reasoning"}
                            className={`relative w-12 h-6 rounded-full transition-all duration-300 ${isLogicEngineEnabled ? 'bg-cyan-500 shadow-[0_0_15px_rgba(34,211,238,0.5)]' : 'bg-zinc-700'}`}
                        >
                            <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-300 ${isLogicEngineEnabled ? 'left-7' : 'left-1'}`} />
                        </button>

                        <div className="w-px h-8 bg-white/10 mx-2" />

                        <div className="flex flex-col">
                            <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest">Legacy Mode</span>
                            <span className="text-xs text-zinc-500 font-medium">{isLegacyMode ? 'Historical Archive' : 'Active Intel'}</span>
                        </div>
                        <button
                            onClick={() => setIsLegacyMode(!isLegacyMode)}
                            title={isLegacyMode ? "Switch to Active Intelligence" : "Switch to Legacy Ledger"}
                            className={`relative w-12 h-6 rounded-full transition-all duration-300 ${isLegacyMode ? 'bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.5)]' : 'bg-zinc-700'}`}
                        >
                            <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-300 ${isLegacyMode ? 'left-7' : 'left-1'}`} />
                        </button>
                    </motion.div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left: Document Uplink & Library */}
                    <div className="lg:col-span-4 space-y-6">
                        <Card className="bg-zinc-900/50 backdrop-blur-xl border-white/10 overflow-hidden shadow-2xl">
                            <CardHeader className="border-b border-white/5 bg-black/20">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <Database className="w-5 h-5 text-cyan-500" />
                                        <CardTitle className="text-white text-sm tracking-wider uppercase font-black">Secure Uplink</CardTitle>
                                    </div>
                                    {isUploading && <Loader2 className="w-4 h-4 text-cyan-500 animate-spin" />}
                                </div>
                            </CardHeader>
                            <CardContent className="p-6">
                                {!isLegacyMode && (
                                    <>
                                        <div
                                            onClick={() => fileInputRef.current?.click()}
                                            className="border border-dashed border-cyan-500/30 hover:border-cyan-500 bg-cyan-500/5 rounded-xl p-6 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all group mb-6"
                                        >
                                            <div className="p-3 bg-cyan-950 rounded-full group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(34,211,238,0.2)]">
                                                <Upload className="w-6 h-6 text-cyan-400" />
                                            </div>
                                            <div className="text-center">
                                                <p className="text-white font-bold text-[10px] uppercase tracking-wider">Deploy New Intel</p>
                                                <p className="text-zinc-500 text-[8px] uppercase tracking-tighter mt-1">UTF-8 Formats Supported</p>
                                            </div>
                                            <input
                                                type="file"
                                                accept=".txt,.csv,.md"
                                                className="hidden"
                                                ref={fileInputRef}
                                                title="Upload document"
                                                onChange={handleFileUpload}
                                            />
                                        </div>

                                        <VaultDocumentLibrary onSelectAction={handleDocSelect} />
                                    </>
                                )}

                                {isLegacyMode && (
                                    <LegacyLedgerTimeline onSelectAction={(entry: any) => {
                                        setDocumentText(entry.directive + "\n\nLOGIC: " + entry.logic);
                                        setFileName(entry.title);
                                        setMessages([{
                                            role: 'ai',
                                            content: `Historical directive **${entry.title}** retrieved from the immutable ledger. Decision context and swarm synthesis are available for interrogation.`
                                        }]);
                                        toast.info(`Legacy asset ${entry.title} reconstructed.`);
                                    }} />
                                )}
                            </CardContent>
                        </Card>

                        {/* Stats/Info Card */}
                        <div className="p-4 bg-indigo-500/5 border border-indigo-500/20 rounded-2xl flex items-start gap-4">
                            <div className="p-2 bg-indigo-500/20 rounded-lg text-indigo-400">
                                <Cpu className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Logic Engine Overlay</h4>
                                <p className="text-[10px] text-zinc-400 leading-normal mt-1">
                                    Enabling the Logic Engine activates multi-step chain-of-thought processing for complex institutional analysis.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right: RAG Chat */}
                    <div className="lg:col-span-8 flex flex-col h-[700px]">
                        <Card className="flex-1 flex flex-col bg-zinc-900/50 backdrop-blur-xl border-white/10 overflow-hidden shadow-2xl relative">
                            {/* Background Grid */}
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

                            <CardHeader className="border-b border-white/5 bg-black/40 flex flex-row items-center justify-between py-4 relative z-10">
                                <div className="flex items-center gap-3">
                                    <div className={`w-2 h-2 rounded-full ${documentText ? 'bg-emerald-500 animate-pulse' : 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]'}`} />
                                    <CardTitle className="text-white text-xs uppercase tracking-widest font-black flex items-center gap-2">
                                        Neural Interface
                                        {documentText && <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[8px] rounded ml-2 font-mono">LINKED: {fileName}</span>}
                                    </CardTitle>
                                </div>
                                {isLogicEngineEnabled && (
                                    <div className="flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full">
                                        <Zap className="w-3 h-3 text-cyan-400 animate-pulse" />
                                        <span className="text-[9px] font-black text-cyan-400 uppercase tracking-tighter">Logic Engine Active</span>
                                    </div>
                                )}
                            </CardHeader>

                            <CardContent className="flex-1 flex flex-col p-0 overflow-hidden relative z-10">
                                {/* Chat Messages */}
                                <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
                                    {!documentText && messages.length === 0 ? (
                                        <div className="h-full flex flex-col items-center justify-center">
                                            <div className="relative mb-6">
                                                <div className="absolute inset-0 bg-cyan-500/20 blur-3xl rounded-full scale-150 animate-pulse" />
                                                <Shield className="w-20 h-20 text-zinc-800 relative z-10" />
                                            </div>
                                            <p className="text-white font-black uppercase tracking-[0.3em] text-sm">System Standby</p>
                                            <p className="text-zinc-500 text-[10px] uppercase tracking-widest mt-3 max-w-[200px] text-center leading-loose">Select or upload an institutional asset to initiate query protocol.</p>
                                        </div>
                                    ) : (
                                        messages.map((message, index) => (
                                            <motion.div
                                                key={index}
                                                initial={{ opacity: 0, scale: 0.98, y: 10 }}
                                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                                className={`flex gap-4 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                            >
                                                {message.role === 'ai' && (
                                                    <div className="w-8 h-8 rounded-lg bg-cyan-950 flex items-center justify-center border border-cyan-500/30 flex-shrink-0 shadow-[0_0_10px_rgba(34,211,238,0.2)]">
                                                        <Bot className="w-4 h-4 text-cyan-400" />
                                                    </div>
                                                )}
                                                <div className={`max-w-[85%] rounded-2xl p-4 shadow-xl ${message.role === 'user'
                                                    ? 'bg-zinc-800/80 text-white border border-white/10'
                                                    : 'bg-black/60 text-zinc-300 border border-cyan-500/20 prose prose-invert prose-sm prose-cyan'
                                                    }`}>
                                                    {message.role === 'ai' ? (
                                                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                                            {message.content}
                                                        </ReactMarkdown>
                                                    ) : (
                                                        <p className="text-sm">{message.content}</p>
                                                    )}
                                                </div>
                                                {message.role === 'user' && (
                                                    <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center border border-white/10 flex-shrink-0">
                                                        <User className="w-4 h-4 text-white" />
                                                    </div>
                                                )}
                                            </motion.div>
                                        ))
                                    )}
                                    {isThinking && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="flex gap-4 justify-start"
                                        >
                                            <div className="w-8 h-8 rounded-lg bg-cyan-950 flex items-center justify-center border border-cyan-500/30 flex-shrink-0">
                                                <Loader2 className="w-4 h-4 text-cyan-400 animate-spin" />
                                            </div>
                                            <div className="bg-black/40 rounded-2xl p-4 border border-cyan-500/20 flex flex-col gap-2 min-w-[150px]">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-1 h-1 rounded-full bg-cyan-500 animate-ping" />
                                                    <span className="text-[9px] font-black text-cyan-500 uppercase tracking-widest">
                                                        {isLogicEngineEnabled ? 'Cognitive Chain Processing' : 'Retrieving Insights'}
                                                    </span>
                                                </div>
                                                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                                                    <motion.div
                                                        className="h-full bg-cyan-500"
                                                        initial={{ width: "0%" }}
                                                        animate={{ width: "100%" }}
                                                        transition={{ duration: 2, repeat: Infinity }}
                                                    />
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </div>

                                {/* Input Area */}
                                <div className="p-4 border-t border-white/5 bg-black/40 relative">
                                    <div className="relative flex items-center">
                                        <MessageSquare className="w-5 h-5 text-zinc-500 absolute left-4" />
                                        <input
                                            type="text"
                                            value={input}
                                            onChange={(e) => setInput(e.target.value)}
                                            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                                            disabled={!documentText || isThinking}
                                            placeholder={documentText ? "Interrogate the vault..." : "Uplink required for query interface..."}
                                            className="w-full bg-zinc-900/80 border border-white/10 rounded-xl py-4 pl-12 pr-16 text-white text-sm focus:outline-none focus:border-cyan-500/50 transition-all disabled:opacity-50 placeholder:uppercase placeholder:text-[9px] placeholder:tracking-widest"
                                        />
                                        <Button
                                            size="icon"
                                            onClick={handleSendMessage}
                                            disabled={!input.trim() || !documentText || isThinking}
                                            className="absolute right-2 bg-cyan-600 hover:bg-cyan-500 text-white shadow-[0_0_15px_rgba(34,211,238,0.3)] disabled:shadow-none h-10 w-10 transition-all hover:scale-105 active:scale-95"
                                        >
                                            <Send className="w-4 h-4" />
                                        </Button>
                                    </div>
                                    <div className="flex items-center justify-between mt-3 px-1">
                                        <div className="flex items-center gap-2">
                                            <div className="flex items-center gap-1.5 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all cursor-help">
                                                <Info className="w-3 h-3 text-cyan-400" />
                                                <span className="text-[8px] font-bold text-zinc-500 uppercase tracking-tighter">Localized RAG Protocol v4.0</span>
                                            </div>
                                        </div>
                                        <span className="text-[8px] font-mono text-zinc-600">ENCRYPTION: AES-256-GCM</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
