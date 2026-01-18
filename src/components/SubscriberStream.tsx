'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DollarSign, User, BadgeCheck, Zap, Globe } from "lucide-react";

interface SubscriberEvent {
    id: string;
    name: string;
    tier: 'PRACTITIONER' | 'ENTERPRISE' | 'SOVEREIGN' | 'DISTRICT';
    amount: string;
    location: string;
    timestamp: number;
}

const FIRST_NAMES = ["Marcus", "Sarah", "Dr. J", "Principal", "Supt.", "Alicia", "David", "Elena", "Michael", "Board Member"];
const LAST_NAMES = ["West", "Johnson", "Carter", "Lee", "Rodriguez", "Smith", "Washington", "Chen", "O'Connor", "Banks"];
const LOCATIONS = ["Mobile, AL", "Atlanta, GA", "Chicago, IL", "Dallas, TX", "New York, NY", "Los Angeles, CA", "District HQ", "Remote Uplink"];

// Tier Configs
const TIERS = {
    PRACTITIONER: { name: "Practitioner", price: "$29", color: "text-blue-400", icon: User },
    ENTERPRISE: { name: "Enterprise Hub", price: "$499", color: "text-purple-400", icon: BadgeCheck },
    SOVEREIGN: { name: "Sovereign Vault", price: "$2,997", color: "text-amber-400", icon: Zap },
    DISTRICT: { name: "District Command", price: "$15,000", color: "text-emerald-400", icon: Globe },
};

export default function SubscriberStream() {
    const [events, setEvents] = useState<SubscriberEvent[]>([]);

    useEffect(() => {
        // Initial Seed
        const initialEvents: SubscriberEvent[] = [];
        for (let i = 0; i < 3; i++) {
            initialEvents.push(generateEvent());
        }
        setEvents(initialEvents);

        const interval = setInterval(() => {
            if (Math.random() > 0.4) {
                setEvents(prev => [generateEvent(), ...prev].slice(0, 8));
            }
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    const generateEvent = (): SubscriberEvent => {
        const rand = Math.random();
        let tierKey: keyof typeof TIERS = 'PRACTITIONER';
        if (rand > 0.99) tierKey = 'DISTRICT';
        else if (rand > 0.9) tierKey = 'SOVEREIGN';
        else if (rand > 0.7) tierKey = 'ENTERPRISE';

        const tier = TIERS[tierKey];
        const name = `${FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)]} ${LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)].charAt(0)}.`;

        return {
            id: Math.random().toString(36).substr(2, 9),
            name,
            tier: tierKey,
            amount: tier.price,
            location: LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)],
            timestamp: Date.now(),
        };
    };

    return (
        <div className="w-full py-4 overflow-hidden relative">
            <div className="flex items-center gap-12 whitespace-nowrap overflow-hidden">
                <div className="flex animate-marquee gap-12 hover:[animation-play-state:paused]">
                    {[...events, ...events].map((event, i) => {
                        const TierIcon = TIERS[event.tier].icon;
                        return (
                            <div
                                key={`${event.id}-${i}`}
                                className="flex items-center gap-4 text-[11px] font-medium text-zinc-500"
                            >
                                <div className={`flex items-center gap-2 ${TIERS[event.tier].color} font-bold uppercase tracking-widest text-[10px]`}>
                                    <TierIcon size={12} />
                                    <span>{TIERS[event.tier].name}</span>
                                </div>
                                <span className="text-white font-bold">{event.name}</span>
                                <span className="text-zinc-600">({event.location})</span>
                                <div className="text-emerald-500/80 font-mono font-bold">+{event.amount}</div>
                                <div className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
                            </div>
                        );
                    })}
                </div>
            </div>
            {/* Fade Edges */}
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-transparent to-transparent pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-transparent to-transparent pointer-events-none" />

            <style jsx>{`
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-marquee {
                    animation: marquee 60s linear infinite;
                }
            `}</style>
        </div>
    );
}
