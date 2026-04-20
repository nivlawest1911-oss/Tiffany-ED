'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Share2, 
    Copy, 
    CheckCircle, 
    X, 
    Briefcase as Linkedin, // Fallback social icon
    Globe as Twitter, // Fallback social icon
    Globe,
    Shield,
    Sparkles,
    GraduationCap,
    Radio,
    History,
    Zap
} from 'lucide-react';
import { shareService, ShareContext } from '@/lib/ShareService';
import { toast } from 'sonner';

interface ProfileShareModalProps {
    isOpen: boolean;
    onClose: () => void;
    context: ShareContext;
    userName: string;
    userId?: string;
}

export default function ProfileShareModal({ 
    isOpen, 
    onClose, 
    context, 
    userName, 
}: ProfileShareModalProps) {
    const [copied, setCopied] = useState(false);
    const metadata = shareService.getMetadata(context, userName);

    const handleCopy = () => {
        navigator.clipboard.writeText(metadata.url);
        setCopied(true);
        toast.success('Protocol Link Copied', {
            description: 'Link has been hashed to your clipboard.'
        });
        setTimeout(() => setCopied(false), 2000);
    };

    const getContextIcon = (size: number = 10, className: string = "text-indigo-500") => {
        switch (context) {
            case 'ACADEMY':
                return <GraduationCap className={className} size={size} />;
            case 'MEDIA':
                return <Radio className={className} size={size} />;
            case 'LEDGER':
                return <History className={className} size={size} />;
            case 'SIGNAL':
                return <Zap className={className} size={size} />;
            default:
                return <Shield className={className} size={size} />;
        }
    };

    const getContextTitle = () => {
        switch (context) {
            case 'REFERRAL': return 'Protocol Referral';
            case 'DOSSIER': return 'Professional Dossier';
            case 'ACADEMY': return 'Academic Milestone';
            case 'MEDIA': return 'Intelligence Briefing';
            case 'LEDGER': return 'Immutable Directive';
            case 'SIGNAL': return 'Signal Broadcast';
            default: return 'Sharing Protocol';
        }
    };

    const socialOptions = [
        { name: 'LinkedIn', icon: Linkedin, color: 'hover:bg-[#0077b5]', url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(metadata.url)}` },
        { name: 'X', icon: Twitter, color: 'hover:bg-zinc-800', url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(metadata.url)}&text=${encodeURIComponent(metadata.description)}` },
    ];

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-lg bg-zinc-950 border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-indigo-500/10"
                    >
                        {/* Glows */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-[60px] rounded-full pointer-events-none" />
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 blur-[60px] rounded-full pointer-events-none" />

                        <div className="p-8 md:p-10">
                            {/* Header */}
                            <div className="flex items-start justify-between mb-8">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 p-[1px]">
                                        <div className="w-full h-full bg-black rounded-2xl flex items-center justify-center">
                                            <Share2 size={20} className="text-white" />
                                        </div>
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-black text-white uppercase tracking-tight italic">
                                            {getContextTitle()}
                                        </h2>
                                        <div className="text-[10px] font-black text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                                            {getContextIcon(10, "text-indigo-500")}
                                            Sovereign Data Sharing Active
                                        </div>
                                    </div>
                                </div>
                                <button 
                                    onClick={onClose}
                                    className="p-2 hover:bg-white/5 rounded-full text-zinc-500 hover:text-white transition-colors"
                                    title="Close Modal"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Preview Card */}
                            <div className="p-6 rounded-3xl bg-white/5 border border-white/5 mb-8 group relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="relative z-10">
                                    <div className="flex items-center gap-2 text-indigo-400 mb-2">
                                        <Sparkles size={12} className="animate-pulse" />
                                        <span className="text-[9px] font-black uppercase tracking-widest">{context} Context</span>
                                    </div>
                                    <h3 className="text-lg font-bold text-white mb-2 leading-tight">
                                        {metadata.title}
                                    </h3>
                                    <p className="text-sm text-zinc-400 line-clamp-2 italic">
                                        "{metadata.description}"
                                    </p>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="space-y-6">
                                {/* Copy Link */}
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em] ml-1">Universal Access Link</label>
                                    <div className="flex gap-2">
                                        <div className="flex-1 h-12 bg-black/50 border border-white/10 rounded-xl px-4 flex items-center overflow-hidden">
                                            <code className="text-[10px] text-zinc-400 font-mono truncate">
                                                {metadata.url}
                                            </code>
                                        </div>
                                        <button
                                            onClick={handleCopy}
                                            className="w-12 h-12 bg-white text-black flex items-center justify-center rounded-xl hover:scale-105 transition-transform shrink-0"
                                        >
                                            {copied ? <CheckCircle size={18} /> : <Copy size={18} />}
                                        </button>
                                    </div>
                                </div>

                                {/* Social Sharing */}
                                <div className="pt-4 border-t border-white/5 flex items-center justify-between gap-4">
                                    <div className="flex gap-4">
                                        {socialOptions.map((opt) => (
                                            <a
                                                key={opt.name}
                                                href={opt.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={`w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 ${opt.color} hover:text-white hover:border-transparent transition-all`}
                                                title={`Share via ${opt.name}`}
                                            >
                                                <opt.icon size={20} />
                                            </a>
                                        ))}
                                    </div>
                                    
                                    <button 
                                        className="h-12 px-6 rounded-xl bg-indigo-600/10 border border-indigo-600/20 text-indigo-400 text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all flex items-center gap-2"
                                        onClick={() => shareService.share(metadata)}
                                    >
                                        <Globe size={14} /> Global Distribution
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Footer Decoration */}
                        <div className="h-1 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}

