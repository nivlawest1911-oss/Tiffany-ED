'use client';
import { useState } from 'react';
import {
    Heart,
    Users,
    MessageCircle,
    ShieldCheck,
    Zap,
    Sparkles,
    Loader2,
    ArrowRight,
    Smile,
    Dna,
    UserPlus,
    Brain,
    PenTool
} from 'lucide-react';

type Persona = 'Student' | 'Teacher' | 'Admin' | 'Parent' | 'Staff' | 'District';

export default function EQGenerator() {
    const [persona, setPersona] = useState<Persona>('Teacher');
    const [situation, setSituation] = useState('');
    const [output, setOutput] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);

    const personas: { id: Persona; label: string; icon: React.ReactNode }[] = [
        { id: 'Student', label: 'Student', icon: <Smile size={16} /> },
        { id: 'Teacher', label: 'Teacher', icon: <PenTool size={16} /> },
        { id: 'Admin', label: 'Admin', icon: <ShieldCheck size={16} /> },
        { id: 'Parent', label: 'Parent', icon: <Heart size={16} /> },
        { id: 'Staff', label: 'Support Staff', icon: <Users size={16} /> },
        { id: 'District', label: 'Central Office', icon: <Dna size={16} /> },
    ];

    const handleGenerate = async () => {
        if (!situation.trim()) return;
        setIsGenerating(true);

        try {
            const res = await fetch('/api/eq', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    rawSituation: situation,
                    stakeholder: persona,
                    intensity: 'Medium',
                    protocol: 'ef-reframing'
                }),
            });
            const textResponse = await res.text();
            let data;
            try {
                data = JSON.parse(textResponse);
            } catch (err) {
                console.error("EQ API returned non-JSON:", textResponse);
                throw new Error("Neural Link Unstable: Received invalid response format.");
            }

            if (!res.ok || data.error) {
                throw new Error(data?.error || "Neural Link disrupted.");
            }

            setOutput(data.output);
        } catch (e) {
            setOutput("EQ Neural Link interrupted. Retrying...");
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="p-8 rounded-[2.5rem] bg-zinc-950 text-white border border-zinc-800 shadow-3xl relative overflow-hidden group">
            {/* Dynamic Aura */}
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none group-hover:bg-purple-600/20 transition-all duration-700" />

            <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-600/20 animate-pulse">
                            <Heart className="text-white fill-white" size={20} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300">
                                Emotional Intelligence Lab
                            </h2>
                            <p className="text-sm text-zinc-400">Stakeholder Empathy Engine</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-purple-500/10 border border-purple-500/20 rounded-full">
                        <Zap size={14} className="text-purple-400" />
                        <span className="text-[10px] font-bold text-purple-400 uppercase tracking-widest">Neural Sync</span>
                    </div>
                </div>

                {/* Persona Selector */}
                <div className="flex flex-wrap gap-2 mb-8">
                    {personas.map((p) => (
                        <button
                            key={p.id}
                            onClick={() => setPersona(p.id)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all border ${persona === p.id
                                ? 'bg-purple-600 border-purple-500 text-white shadow-lg shadow-purple-900/40'
                                : 'bg-zinc-900 border-zinc-800 text-zinc-500 hover:border-zinc-700'
                                }`}
                        >
                            {p.icon}
                            {p.label}
                        </button>
                    ))}
                </div>

                <div className="space-y-6">
                    <div className="relative">
                        <textarea
                            value={situation}
                            onChange={(e) => setSituation(e.target.value)}
                            placeholder={`Describe a situation involving a ${persona}...`}
                            className="w-full bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all resize-none h-40"
                        />
                        <div className="absolute right-4 bottom-4">
                            <MessageCircle size={18} className="text-zinc-700" />
                        </div>
                    </div>

                    <button
                        onClick={handleGenerate}
                        disabled={isGenerating || !situation.trim()}
                        className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl font-bold flex items-center justify-center gap-3 hover:from-purple-500 hover:to-pink-500 transition-all shadow-xl shadow-purple-900/20 disabled:opacity-50"
                    >
                        {isGenerating ? <Loader2 className="animate-spin" size={20} /> : <Sparkles size={20} />}
                        Synchronize Emotional Response
                    </button>

                    {output && (
                        <div className="mt-8 p-8 rounded-2xl bg-zinc-900/80 border border-zinc-800 backdrop-blur-md animate-in zoom-in-95 duration-500">
                            <div className="flex items-center gap-2 mb-4 text-purple-400">
                                <Brain size={16} />
                                <span className="text-[10px] font-bold uppercase tracking-widest">Intelligence Output</span>
                            </div>
                            <div className="text-sm text-zinc-300 leading-relaxed whitespace-pre-wrap">
                                {output}
                            </div>
                        </div>
                    )}
                </div>

                {/* Community Node */}
                <div className="mt-8 pt-8 border-t border-zinc-900 grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-purple-500/5 border border-purple-500/10 flex items-center gap-3 transition-all hover:bg-purple-500/10">
                        <UserPlus size={18} className="text-purple-400" />
                        <div>
                            <p className="text-[10px] font-bold text-white uppercase tracking-wider">Stakeholder Hub</p>
                            <p className="text-[9px] text-zinc-500">Connect with personnel nodes</p>
                        </div>
                    </div>
                    <div className="p-4 rounded-xl bg-pink-500/5 border border-pink-500/10 flex items-center gap-3 transition-all hover:bg-pink-500/10">
                        <ArrowRight size={18} className="text-pink-400" />
                        <div>
                            <p className="text-[10px] font-bold text-white uppercase tracking-wider">Pulse Analysis</p>
                            <p className="text-[9px] text-zinc-500">View real-time district EQ</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


