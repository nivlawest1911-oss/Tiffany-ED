'use client';
import { useState } from 'react';
import {
    HeartPulse,
    MessageSquare,
    BrainCircuit,
    Loader2,
    Sparkles,
    FileText,
    Users,
    AlertCircle,
    ShieldCheck,
    Copy,
    Download
} from 'lucide-react';

type ProtocolType = 'ef-reframing' | 'meeting-agenda' | 'feedback' | 'crisis' | 'conflict' | 'discipline';

interface Protocol {
    id: ProtocolType;
    name: string;
    icon: React.ReactNode;
    description: string;
}

export default function LeadershipGenerator() {
    const [situation, setSituation] = useState('');
    const [stakeholder, setStakeholder] = useState<'Parent' | 'Staff' | 'District'>('Staff');
    const [intensity, setIntensity] = useState<'Low' | 'Medium' | 'High'>('Medium');
    const [activeProtocol, setActiveProtocol] = useState<ProtocolType>('ef-reframing');
    const [output, setOutput] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [copied, setCopied] = useState(false);

    const protocols: Protocol[] = [
        {
            id: 'ef-reframing',
            name: 'EQ Reframing',
            icon: <HeartPulse size={18} />,
            description: 'De-escalate situations and reframe responses.'
        },
        {
            id: 'conflict',
            name: 'Touchy Sit',
            icon: <AlertCircle size={18} className="text-orange-400" />,
            description: 'Navigate difficult, touchy, and challenging administrative situations.'
        },
        {
            id: 'discipline',
            name: 'Discipline Comp',
            icon: <ShieldCheck size={18} className="text-blue-400" />,
            description: 'Check legal compliance for suspensions and behavioral removals (IDEA/504).'
        },
        {
            id: 'meeting-agenda',
            name: 'Meeting Protocol',
            icon: <Users size={18} />,
            description: 'Generate high-impact agendas for school leadership.'
        },
        {
            id: 'feedback',
            name: 'Staff Feedback',
            icon: <MessageSquare size={18} />,
            description: 'Draft constructive performance feedback.'
        },
        {
            id: 'crisis',
            name: 'Crisis Comm',
            icon: <AlertCircle size={18} className="text-red-400" />,
            description: 'Draft urgent memos for high-stakes events.'
        },
    ];



    const handleGenerate = async () => {
        if (!situation.trim()) return;

        setIsGenerating(true);
        setOutput('');

        try {
            // Using the expanded logic via the API
            const res = await fetch('/api/eq', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    rawSituation: situation,
                    stakeholder,
                    intensity,
                    protocol: activeProtocol // Passing the protocol to the agent
                }),
            });

            if (!res.ok) throw new Error('API unstable');
            const data = await res.json();
            setOutput(data.output);
        } catch (e) {
            setOutput("EdIntel Leadership Node connection interrupted. Please check environment variables.");
        } finally {
            setIsGenerating(false);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="p-8 rounded-3xl bg-zinc-950 text-white border border-zinc-800 shadow-2xl relative overflow-hidden group">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-pink-600/10 blur-[100px] -mr-32 -mt-32 pointer-events-none" />

            <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-pink-600 flex items-center justify-center shadow-lg shadow-pink-600/20">
                            <ShieldCheck className="text-white" size={24} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-rose-300">
                                Leadership Intelligence
                            </h2>
                            <p className="text-sm text-zinc-400">Executive Protocol Generator</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-pink-500/10 border border-pink-500/20 rounded-full">
                        <Sparkles size={14} className="text-pink-400 animate-pulse" />
                        <span className="text-[10px] font-bold text-pink-400 uppercase tracking-widest">Sovereign Node</span>
                    </div>
                </div>

                {/* Protocol Selector */}
                <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mb-8">
                    {protocols.map((p) => (
                        <button
                            key={p.id}
                            onClick={() => setActiveProtocol(p.id)}
                            className={`flex flex-col items-center gap-2 p-3 rounded-2xl border transition-all duration-300 ${activeProtocol === p.id
                                ? 'bg-pink-600/20 border-pink-500 text-pink-400 shadow-lg shadow-pink-600/5'
                                : 'bg-zinc-900/50 border-zinc-800 text-zinc-500 hover:border-zinc-700'
                                }`}
                        >
                            {p.icon}
                            <span className="text-[10px] font-bold uppercase tracking-wider">{p.name}</span>
                        </button>
                    ))}
                </div>

                <div className="space-y-6">
                    <div className="relative">
                        <textarea
                            value={situation}
                            onChange={(e) => setSituation(e.target.value)}
                            placeholder={`Describe the situation needing ${activeProtocol.replace('-', ' ')}...`}
                            className="w-full bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500/50 transition-all resize-none h-32"
                        />
                        <div className="absolute right-4 bottom-4 flex items-center gap-4">
                            <select
                                value={stakeholder}
                                onChange={(e) => setStakeholder(e.target.value as any)}
                                className="bg-transparent border-none text-[10px] font-bold text-zinc-500 hover:text-pink-400 cursor-pointer focus:outline-none"
                            >
                                <option value="Staff">STAFF</option>
                                <option value="Parent">PARENT</option>
                                <option value="District">DISTRICT</option>
                            </select>
                            <select
                                value={intensity}
                                onChange={(e) => setIntensity(e.target.value as any)}
                                className="bg-transparent border-none text-[10px] font-bold text-zinc-500 hover:text-pink-400 cursor-pointer focus:outline-none"
                            >
                                <option value="Low">LOW URGENCY</option>
                                <option value="Medium">MEDIUM URGENCY</option>
                                <option value="High">HIGH URGENCY</option>
                            </select>
                        </div>
                    </div>

                    <button
                        onClick={handleGenerate}
                        disabled={isGenerating || !situation.trim()}
                        className="w-full py-4 bg-gradient-to-r from-pink-600 to-rose-600 rounded-2xl font-bold flex items-center justify-center gap-3 hover:from-pink-500 hover:to-rose-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group shadow-xl shadow-pink-900/20"
                    >
                        {isGenerating ? (
                            <Loader2 className="animate-spin" size={20} />
                        ) : (
                            <BrainCircuit size={20} />
                        )}
                        <span>Generate Executive Protocol</span>
                    </button>

                    {output && (
                        <div className="relative animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-8 backdrop-blur-sm">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-2">
                                        <Sparkles size={16} className="text-pink-400" />
                                        <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Protocol Output</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={copyToClipboard}
                                            className="p-2 hover:bg-white/5 rounded-lg transition-colors text-zinc-500 hover:text-pink-400"
                                            title="Copy to clipboard"
                                        >
                                            {copied ? <CheckCircle size={16} className="text-green-400" /> : <Copy size={16} />}
                                        </button>
                                        <button
                                            className="p-2 hover:bg-white/5 rounded-lg transition-colors text-zinc-500 hover:text-pink-400"
                                            title="Download as memo"
                                        >
                                            <Download size={16} />
                                        </button>
                                    </div>
                                </div>
                                <div className="prose prose-invert prose-sm max-w-none text-zinc-300 leading-relaxed whitespace-pre-wrap">
                                    {output}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Context Footer */}
                <div className="mt-8 pt-8 border-t border-zinc-900 flex items-center justify-between opacity-50 text-[10px] font-mono tracking-tighter uppercase grayscale hover:grayscale-0 transition-all duration-500">
                    <div className="flex gap-4">
                        <span className="text-pink-400 underline decoration-pink-400/30 underline-offset-4">Frontiers in Psychology (2025)</span>
                        <span className="text-rose-400 underline decoration-rose-400/30 underline-offset-4">Autonomy Bolstered</span>
                    </div>
                    <span className="text-zinc-500">Node Sync: 100% Secure</span>
                </div>
            </div>
        </div>
    );
}

function CheckCircle(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <path d="m9 11 3 3L22 4" />
        </svg>
    );
}
