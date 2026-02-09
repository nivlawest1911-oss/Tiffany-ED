'use client';
import React, { useEffect, useState } from 'react';
import { Mic, Play, Square } from 'lucide-react';

export function VoiceCommand() {
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
    const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
    const [isSpeaking, setIsSpeaking] = useState(false);

    useEffect(() => {
        const loadVoices = () => {
            const available = window.speechSynthesis.getVoices();
            // Filter for female-sounding names or defaults
            const femaleVoices = available.filter(v =>
                v.name.includes('Zira') ||
                v.name.includes('Samantha') ||
                v.name.includes('Female') ||
                v.name.includes('Google US English')
            );
            setVoices(available);
            if (femaleVoices.length > 0) setSelectedVoice(femaleVoices[0]);
            else if (available.length > 0) setSelectedVoice(available[0]);
        };

        loadVoices();
        window.speechSynthesis.onvoiceschanged = loadVoices;
    }, []);

    const speakBriefing = () => {
        if (!selectedVoice) return;

        // The Script
        const text = "Good morning, Dr. West. Systems are nominal. Zone 3 attendance is holding at 89%. I have flagged 12 priority cases for your review in the War Room. Awaiting your command.";

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.voice = selectedVoice;
        utterance.rate = 1;
        utterance.pitch = 1;

        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);

        window.speechSynthesis.speak(utterance);
    };

    const stopSpeaking = () => {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
    };

    return (
        <div className="glass-panel p-4 rounded-xl border border-white/10 bg-slate-900/50 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className={`p-3 rounded-full ${isSpeaking ? 'bg-emerald-500/20 text-emerald-400 animate-pulse' : 'bg-blue-500/10 text-blue-400'}`}>
                    <Mic size={20} />
                </div>
                <div>
                    <h4 className="text-white font-bold text-sm">System Voice</h4>
                    <p className="text-slate-400 text-xs">
                        {selectedVoice ? selectedVoice.name : "Initializing..."}
                    </p>
                </div>
            </div>

            <button
                onClick={isSpeaking ? stopSpeaking : speakBriefing}
                className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs font-bold text-white uppercase tracking-widest transition-colors flex items-center gap-2"
            >
                {isSpeaking ? <><Square size={12} /> Stop</> : <><Play size={12} /> Test Audio</>}
            </button>
        </div>
    );
}
