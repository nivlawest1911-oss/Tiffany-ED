'use client';
import { Brain, Eye, Languages, Video, Cpu, ShieldCheck } from 'lucide-react';

const extensions = [
    {
        id: 'vertex',
        name: 'Vertex AI Cortex',
        description: 'Gemini Pro Logic Engine',
        icon: Brain,
        color: 'text-purple-400',
        bg: 'bg-purple-950/30',
        status: 'Active'
    },
    {
        id: 'vision',
        name: 'Cloud Vision',
        description: 'OCR & Document Scanning',
        icon: Eye,
        color: 'text-blue-400',
        bg: 'bg-blue-950/30',
        status: 'Standby'
    },
    {
        id: 'translate',
        name: 'Neural Translate',
        description: 'Multi-Lingual Bridge',
        icon: Languages,
        color: 'text-emerald-400',
        bg: 'bg-emerald-950/30',
        status: 'Active'
    },
    {
        id: 'video',
        name: 'Video Intelligence',
        description: 'Classroom Analysis',
        icon: Video,
        color: 'text-red-400',
        bg: 'bg-red-950/30',
        status: 'Processing'
    },
    {
        id: 'nlp',
        name: 'Natural Language',
        description: 'Sentiment & Emotion',
        icon: Brain, // Using Brain again as generic "Thinking" icon, or could import something else
        color: 'text-orange-400',
        bg: 'bg-orange-950/30',
        status: 'Active'
    },
    {
        id: 'speech',
        name: 'Neural Voice (TTS)',
        description: 'Text-to-Speech Synthesis',
        icon: Languages, // Reuse Languages or similar
        color: 'text-pink-400',
        bg: 'bg-pink-950/30',
        status: 'Standby'
    },
    {
        id: 'maps',
        name: 'District Mapping',
        description: 'Zoning & Logistics',
        icon: Eye, // Using Eye as "View" metaphor
        color: 'text-green-400',
        bg: 'bg-green-950/30',
        status: 'Online'
    },
    {
        id: 'bigquery',
        name: 'Predictive Analytics',
        description: 'BigQuery Data Engine',
        icon: Cpu,
        color: 'text-cyan-400',
        bg: 'bg-cyan-950/30',
        status: 'Active'
    }
];

export default function CloudExtensionsGrid() {
    return (
        <section className="py-12 border-t border-white/5">
            <div className="flex items-center gap-3 mb-8">
                <Cpu className="w-6 h-6 text-[#00d2ff]" />
                <h2 className="text-2xl font-bold tracking-tight text-white">
                    Google Cloud Neural Extensions
                </h2>
                <div className="px-2 py-1 bg-white/5 rounded text-[10px] uppercase font-bold text-gray-400 border border-white/10">
                    Sovereign Brain v2.0
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {extensions.map((ext) => (
                    <div key={ext.id} className="p-4 rounded-2xl bg-black/40 border border-white/10 hover:border-[#00d2ff]/30 transition-all group">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-xl ${ext.bg}`}>
                                <ext.icon className={`w-6 h-6 ${ext.color}`} />
                            </div>
                            <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-white/5 border border-white/5">
                                <div className={`w-1.5 h-1.5 rounded-full ${ext.status === 'Active' ? 'bg-green-500 animate-pulse' : 'bg-gray-500'}`} />
                                <span className="text-[10px] font-mono text-gray-400 uppercase">{ext.status}</span>
                            </div>
                        </div>
                        <h3 className="font-bold text-white mb-1 group-hover:text-[#00d2ff] transition-colors">{ext.name}</h3>
                        <p className="text-xs text-gray-500">{ext.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
