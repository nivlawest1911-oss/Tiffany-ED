'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface GenerativeLogStreamProps {
    type: 'IEP' | 'GRANT' | 'DATA' | 'POLICY' | 'DEFAULT';
    isActive: boolean;
}

const LOG_TEMPLATES = {
    IEP: [
        "Starting IEP Preparation...",
        "Reviewing Student Record: #8291-A...",
        "Analyzing Performance Data...",
        "> Reading Comprehension: -1.5 Grade Level gap identified",
        "> Auditory Processing: Above Average",
        "Drafting SMART Goal: Reading Fluency...",
        "Target: 80% accuracy by Q3",
        "Selecting LRE: General Education with Consultant Support",
        "Adding Accommodations: Text-to-Speech enabled...",
        "Verifying Compliance...",
        "IEP Draft Complete."
    ],
    GRANT: [
        "Starting Grant Writer Support...",
        "Reviewing District Demographics...",
        "> Title I Eligibility: Confirmed",
        "> Free/Reduced Lunch: 68%",
        "Drafting Needs Assessment...",
        "Writing Narrative: 'Closing the Opportunity Gap'...",
        "Aligning with State Strategic Plan 2030...",
        "Preparing Budget Justification...",
        "> Personnel Allocation: $150,000",
        "> Equipment Allocation: $45,000",
        "Reviewing for impact and clarity...",
        "Grant Proposal Ready for Review."
    ],
    DATA: [
        "Connecting to District Database...",
        "Analyzing Test Scores: ACAP, iReady, STAR...",
        "Running Trend Analysis...",
        "> Correlation Found: Attendance vs. Math Proficiency",
        "Identifying Students for Support...",
        "Calculating Growth Targets...",
        "Creating Visualizations...",
        "> Heatmap: Grade 3 Reading",
        "> Trendline: Chronic Absenteeism",
        "Dashboard Updated."
    ],
    POLICY: [
        "Accessing Board Policy Manual...",
        "Reviewing Legislative Updates (2025 Session)...",
        "Cross-Referencing AL Code 290-8-9...",
        "Drafting Policy Amendment: Student Mobile Device Usage...",
        "Checking Legal Precedents...",
        "Generating Stakeholder Communication Letter...",
        "Finalizing Policy Brief...",
        "Ready for Board Approval."
    ],
    DEFAULT: [
        "Assistant Ready.",
        "Awaiting Input...",
        "Processing...",
        "Optimizing...",
        "Complete."
    ]
};

export default function GenerativeLogStream({ type, isActive }: GenerativeLogStreamProps) {
    const [lines, setLines] = useState<{ text: string; time: string }[]>([]);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isActive) {
            setLines([]);
            return;
        }

        const template = LOG_TEMPLATES[type] || LOG_TEMPLATES.DEFAULT;
        let index = 0;

        const interval = setInterval(() => {
            if (index < template.length) {
                setLines(prev => [...prev, {
                    text: template[index],
                    time: new Date().toLocaleTimeString()
                }]);
                index++;
            } else {
                clearInterval(interval);
            }
        }, 300);

        return () => clearInterval(interval);
    }, [isActive, type]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [lines]);

    return (
        <div className="font-mono text-[10px] md:text-xs text-emerald-400 bg-black/80 p-4 rounded-xl border border-emerald-500/30 h-48 overflow-hidden relative shadow-inner shadow-black/50">
            <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-black/80 to-transparent pointer-events-none z-10" />

            <div ref={scrollRef} className="h-full overflow-y-auto space-y-1 custom-scrollbar pb-8">
                {lines.map((line, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-2"
                    >
                        <span className="text-emerald-500/50">[{line.time}]</span>
                        <span className={line.text.startsWith(">") ? "text-emerald-200 ml-4" : "text-emerald-400"}>
                            {line.text}
                        </span>
                    </motion.div>
                ))}
                {isActive && (
                    <motion.div
                        animate={{ opacity: [0, 1] }}
                        transition={{ repeat: Infinity, duration: 0.5 }}
                        className="w-2 h-4 bg-emerald-500"
                    />
                )}
            </div>

            {/* Scanline Effect */}
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-20 bg-[length:100%_2px,3px_100%]" />
        </div>
    );
}
