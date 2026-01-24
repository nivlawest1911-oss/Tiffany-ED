'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Gavel, Scale, BookOpen, Users } from 'lucide-react';

interface MotionTemplate {
    id: string;
    name: string;
    description: string;
    script: string;
    requiresSecond: boolean;
    debatable: boolean;
    amendable: boolean;
    voteRequired: string;
}

const MOTIONS: MotionTemplate[] = [
    {
        id: 'main',
        name: 'Main Motion',
        description: 'Introduce new business to the assembly.',
        script: "I move that [ACTION]...",
        requiresSecond: true,
        debatable: true,
        amendable: true,
        voteRequired: "Majority"
    },
    {
        id: 'amend',
        name: 'Amend',
        description: 'Modify the wording of a pending motion.',
        script: "I move to amend the motion by [INSERTING/STRIKING]...",
        requiresSecond: true,
        debatable: true,
        amendable: true,
        voteRequired: "Majority"
    },
    {
        id: 'table',
        name: 'Lay on the Table',
        description: 'Temporarily set aside pending business.',
        script: "I move to lay the question on the table.",
        requiresSecond: true,
        debatable: false,
        amendable: false,
        voteRequired: "Majority"
    },
    {
        id: 'adjourn',
        name: 'Adjourn',
        description: 'End the meeting.',
        script: "I move to adjourn.",
        requiresSecond: true,
        debatable: false,
        amendable: false,
        voteRequired: "Majority"
    }
];

const ALABAMA_BYLAWS = [
    {
        code: "AL Code § 16-1-41.1",
        title: "School Board Governance Improvement Act",
        summary: "Mandates that local boards adopt a code of conduct and receive annual training. Prioritizes student achievement and financial stewardship."
    },
    {
        code: "Open Meetings Act",
        title: "Alabama Sunshine Law",
        summary: "Requires reasonable notice of all meetings. Executive sessions are permitted only for specific statutory reasons (e.g., 'good name and character')."
    },
    {
        code: "Quorum Rule",
        title: "General Parliamentary Procedure",
        summary: "A majority of the whole number of members of the board constitutes a quorum. Verify your specific district policy (e.g., 3 of 5, or 4 of 7)."
    }
];

export default function GovernanceEngine() {
    const [selectedMotion, setSelectedMotion] = useState<MotionTemplate | null>(null);
    const [boardSize, setBoardSize] = useState(5);

    const quorum = Math.floor(boardSize / 2) + 1;

    return (
        <section className="space-y-8">
            <div className="flex items-center gap-4 mb-6">
                <div className="h-8 w-1 bg-[#d4af37] rounded-full" />
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">Professional Parliamentary Engine</h2>
                    <p className="text-xs text-zinc-500 font-mono uppercase tracking-widest">Powered by Robert's Rules & AL Code</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* 1. Motion Architect */}
                <div className="lg:col-span-2 p-8 bg-zinc-900 text-white rounded-[2rem] border border-zinc-800 shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-6 opacity-10">
                        <Gavel size={120} />
                    </div>
                    {/* Scanning Beam */}
                    <motion.div
                        initial={{ top: '0%' }}
                        animate={{ top: ['0%', '100%', '0%'] }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        className="absolute left-0 right-0 h-1 bg-[#d4af37]/30 shadow-[0_0_20px_#d4af37]"
                    />
                    <div className="absolute top-4 right-4 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] animate-pulse" />
                        <span className="text-[10px] font-mono text-[#d4af37] uppercase tracking-widest">Policy Scanner Active</span>
                    </div>

                    <h3 className="flex items-center gap-3 text-lg font-bold mb-6">
                        <Scale className="text-[#d4af37]" /> Motion Architect
                    </h3>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
                        {MOTIONS.map(m => (
                            <button
                                key={m.id}
                                onClick={() => setSelectedMotion(m)}
                                className={`p-4 rounded-xl border text-left transition-all ${selectedMotion?.id === m.id
                                    ? 'bg-[#d4af37] text-black border-[#d4af37]'
                                    : 'bg-zinc-800 border-zinc-700 hover:bg-zinc-700'
                                    }`}
                            >
                                <span className="block text-xs font-black uppercase tracking-wider mb-1 opacity-70">Action</span>
                                <span className="font-bold text-sm block leading-tight">{m.name}</span>
                            </button>
                        ))}
                    </div>

                    <div className="p-6 bg-black/40 rounded-2xl border border-white/10 min-h-[160px]">
                        {selectedMotion ? (
                            <div className="space-y-4">
                                <div>
                                    <span className="text-[10px] text-zinc-500 font-mono uppercase">Official Script</span>
                                    <p className="text-xl font-serif text-[#d4af37] italic">"{selectedMotion.script}"</p>
                                </div>
                                <div className="flex flex-wrap gap-4 text-xs text-zinc-400 font-mono">
                                    <span className="flex items-center gap-1"><Users size={12} /> Second: {selectedMotion.requiresSecond ? 'REQUIRED' : 'NO'}</span>
                                    <span className="flex items-center gap-1"><Users size={12} /> Debatable: {selectedMotion.debatable ? 'YES' : 'NO'}</span>
                                    <span className="flex items-center gap-1"><Users size={12} /> Vote: {selectedMotion.voteRequired}</span>
                                </div>
                            </div>
                        ) : (
                            <div className="h-full flex items-center justify-center text-zinc-600 text-sm font-medium italic">
                                Select a parliamentary action to generate the official script...
                            </div>
                        )}
                    </div>
                </div>

                {/* 2. Bylaw Intelligence */}
                <div className="space-y-6">
                    {/* Quorum Calculator */}
                    <div className="p-6 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-lg">
                        <h4 className="flex items-center gap-2 text-sm font-bold text-zinc-900 dark:text-white mb-4">
                            <Users size={16} className="text-blue-500" /> Quorum Calculator
                        </h4>
                        <div className="flex items-center justify-between mb-2">
                            <label className="text-xs text-zinc-500">Board Size</label>
                            <input
                                type="number"
                                value={boardSize}
                                onChange={(e) => setBoardSize(parseInt(e.target.value) || 0)}
                                className="w-16 p-1 text-center bg-zinc-100 dark:bg-zinc-800 rounded-lg text-sm font-bold"
                            />
                        </div>
                        <div className="flex items-center justify-between p-3 bg-blue-500/10 rounded-xl border border-blue-500/20">
                            <span className="text-xs font-bold text-blue-700 dark:text-blue-300">Required for Business</span>
                            <span className="text-xl font-black text-blue-600 dark:text-blue-400">{quorum} Members</span>
                        </div>
                    </div>

                    {/* AL Context */}
                    <div className="p-6 bg-emerald-50 dark:bg-emerald-900/10 rounded-3xl border border-emerald-200 dark:border-emerald-800/30">
                        <h4 className="flex items-center gap-2 text-sm font-bold text-emerald-800 dark:text-emerald-400 mb-4">
                            <BookOpen size={16} /> Alabama Context
                        </h4>
                        <div className="space-y-3">
                            {ALABAMA_BYLAWS.slice(0, 2).map((law, i) => (
                                <div key={i} className="text-xs">
                                    <p className="font-bold text-emerald-900 dark:text-emerald-300">{law.code}</p>
                                    <p className="text-emerald-700 dark:text-emerald-500/80 leading-snug">{law.summary}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
