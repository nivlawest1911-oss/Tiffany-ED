'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DollarSign, User, BadgeCheck, Zap, Globe } from "lucide-react";

interface SubscriberEvent {
    id: string;
    name: string;
    tier: 'PRACTITIONER' | 'ENTERPRISE' | 'PROFESSIONAL' | 'DISTRICT';
    amount: string;
    location: string;
    timestamp: number;
}

const FIRST_NAMES = ["Marcus", "Sarah", "Dr. J", "Principal", "Supt.", "Alicia", "David", "Elena", "Michael", "Board Member"];
const LAST_NAMES = ["West", "Johnson", "Carter", "Lee", "Rodriguez", "Smith", "Washington", "Chen", "O'Connor", "Banks"];
const LOCATIONS = ["Mobile, AL", "Atlanta, GA", "Chicago, IL", "Dallas, TX", "New York, NY", "Los Angeles, CA", "District HQ", "Remote Connection"];

// Tier Configs
const TIERS = {
    PRACTITIONER: { name: "Practitioner", price: "$29", color: "text-blue-400", icon: User },
    ENTERPRISE: { name: "Enterprise Hub", price: "$499", color: "text-purple-400", icon: BadgeCheck },
    PROFESSIONAL: { name: "Professional Vault", price: "$2,997", color: "text-amber-400", icon: Zap },
    DISTRICT: { name: "District Command", price: "$15,000", color: "text-emerald-400", icon: Globe },
};

export default function SubscriberStream() {
    const [events, setEvents] = useState<SubscriberEvent[]>([]);

    useEffect(() => {
        // Initial Seed
        const initialEvents: SubscriberEvent[] = [];
        for (let i = 0; i < 5; i++) {
            initialEvents.push(generateEvent());
        }
        setEvents(initialEvents);

        const interval = setInterval(() => {
            if (Math.random() > 0.4) {
                setEvents(prev => [generateEvent(), ...prev].slice(0, 10));
            }
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const generateEvent = (): SubscriberEvent => {
        const rand = Math.random();
        let tierKey: keyof typeof TIERS = 'PRACTITIONER';
        if (rand > 0.95) tierKey = 'DISTRICT';
        else if (rand > 0.8) tierKey = 'PROFESSIONAL';
        else if (rand > 0.5) tierKey = 'ENTERPRISE';

        const tier = TIERS[tierKey];
        const name = `${FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)]} ${LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)].charAt(0)}.`;

        return {
            id: Math.random().toString(36).substring(2, 11),
            name,
            tier: tierKey,
            amount: tier.price,
            location: LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)],
            timestamp: Date.now(),
        };
    };

    return (
        <div className="w-full py-2 overflow-hidden relative border-y border-white/5 bg-black/40 backdrop-blur-md">
            <div className="flex items-center gap-12 whitespace-nowrap overflow-hidden">
                <div className="flex animate-marquee gap-12 hover:[animation-play-state:paused] py-1">
                    {[...events, ...events].map((event, i) => {
                        const TierIcon = TIERS[event.tier].icon;
                        return (
                            <div
                                key={`${event.id}-${i}`}
                                className="flex items-center gap-4 text-[10px] font-bold text-zinc-500 uppercase tracking-tighter"
                            >
                                <div className={`flex items-center gap-2 ${TIERS[event.tier].color} bg-white/5 px-2 py-0.5 rounded border border-white/5 shadow-sm`}>
                                    <TierIcon size={10} className="animate-pulse" />
                                    <span className="text-[8px] tracking-[0.1em]">{TIERS[event.tier].name}</span>
                                </div>
                                <span className="text-zinc-200">{event.name}</span>
                                <span className="text-zinc-600 font-mono text-[9px]">[{event.location}]</span>
                                <div className="text-indigo-400 font-black tracking-tight">+{event.amount}</div>
                                <div className="w-[1px] h-3 bg-zinc-800" />
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Cinematic Gradient Masks */}
            <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-black via-black/80 to-transparent pointer-events-none z-10" />
            <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-black via-black/80 to-transparent pointer-events-none z-10" />

            {/* Strategic Pulse Line */}
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />

            <style jsx>{`
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-marquee {
                    animation: marquee 80s linear infinite;
                }
            `}</style>
        </div>
    );
}
