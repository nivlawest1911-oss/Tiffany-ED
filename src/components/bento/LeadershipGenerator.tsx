'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    HeartPulse,
    MessageSquare,
    BrainCircuit,
    Loader2,
    Sparkles,
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



    const [genStep, setGenStep] = useState(0);
    const generationSteps = [
        "Analyzing Situational Context...",
        "Scanning Professional Frameworks...",
        "Aligning with Board Policy...",
        "Calibrating Tone & Intensity...",
        "Finalizing Strategic Protocol..."
    ];

    const handleGenerate = async () => {
        if (!situation.trim()) return;

        setIsGenerating(true);
        setGenStep(0);
        setOutput('');

        // Simulate thinking steps
        const stepInterval = setInterval(() => {
            setGenStep(curr => (curr < generationSteps.length - 1 ? curr + 1 : curr));
        }, 800);

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

            const textResponse = await res.text();
            let data;
            try {
                data = JSON.parse(textResponse);
            } catch (err) {
                console.error("Leadership API returned non-JSON:", textResponse);
                throw new Error("Protocol Generation Failed: Server returned invalid format.");
            }

            if (!res.ok || data.error) {
                throw new Error(data?.error || 'API unstable');
            }

            clearInterval(stepInterval);
            setOutput(data.output);
        } catch (e: any) {
            clearInterval(stepInterval);
            setOutput(`EdIntel Leadership Center connection interrupted. ${e.message}`);
        } finally {
            setIsGenerating(false);
            clearInterval(stepInterval);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="p-8 rounded-3xl bg-zinc-950 text-white border border-zinc-800 shadow-2xl relative overflow-hidden group">
            {/* Background Glow & Neural Web */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-pink-600/10 blur-[100px] -mr-32 -mt-32 pointer-events-none" />
            <div
                className="absolute inset-0 opacity-20"
                style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')" }}
            />

            {/* Neural Connections */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
                <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(236, 72, 153, 0.2)" strokeWidth="1" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
                <motion.circle
                    cx="0" cy="0" r="2" fill="#ec4899"
                    animate={{
                        cx: ["10%", "90%", "50%", "10%"],
                        cy: ["10%", "50%", "90%", "10%"]
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
            </svg>

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
                        <span className="text-[10px] font-bold text-pink-400 uppercase tracking-widest">Professional Center</span>
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
                        className="w-full py-4 bg-gradient-to-r from-pink-600 to-rose-600 rounded-2xl font-bold flex flex-col items-center justify-center gap-1 hover:from-pink-500 hover:to-rose-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group shadow-xl shadow-pink-900/20 relative overflow-hidden"
                    >
                        {isGenerating && (
                            <div className="absolute inset-0 bg-pink-700/50 flex items-center justify-center z-0">
                                <div className="w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" style={{ backgroundSize: '200% 100%' }} />
                            </div>
                        )}

                        <div className="relative z-10 flex items-center gap-3">
                            {isGenerating ? (
                                <Loader2 className="animate-spin" size={20} />
                            ) : (
                                <BrainCircuit size={20} />
                            )}
                            <span>{isGenerating ? generationSteps[genStep] : 'Generate Executive Protocol'}</span>
                        </div>
                        {isGenerating && (
                            <div className="h-1 w-32 bg-pink-900/50 rounded-full mt-2 overflow-hidden relative z-10">
                                <div className="h-full bg-white/80 transition-all duration-500" style={{ width: `${((genStep + 1) / generationSteps.length) * 100}%` }} />
                            </div>
                        )}
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
                    <span className="text-zinc-500">Center Sync: 100% Secure</span>
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
