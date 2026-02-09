'use client';
import React from 'react';
import { SovereignPlayer } from '@/components/ui/SovereignPlayer';
import { motion } from 'framer-motion';
import { Film } from 'lucide-react';

export function MediaConsole() {
    const videos = [
        {
            id: "admin-vid",
            title: "School Administrator Protocol",
            src: "/videos/Video_Generation_for_School_Administrators.mp4"
        },
        {
            id: "mode-vid",
            title: "The Ultimate Solution for Mode",
            src: "/videos/The_Ultimate_Solution_for_Mode.mp4"
        },
        {
            id: "health-vid",
            title: "Health for Alabama's Educators",
            src: "/videos/Health for Alabama's Educators.mp4"
        },
        {
            id: "noise-free-vid",
            title: "Noise-Free Teaching",
            src: "/videos/EdIntel_ Noise-Free Teaching.mp4"
        },
        {
            id: "burnout-vid",
            title: "Burnout Fix Awaits",
            src: "/videos/Burnout Fix Awaits.mp4"
        },
        {
            id: "district-update-vid",
            title: "District Command Update",
            src: "/videos/District Command Update.mp4"
        }
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
                <Film className="text-blue-500" />
                <h2 className="text-2xl font-bold text-white">Media Intelligence Vault</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {videos.map((vid, index) => (
                    <motion.div
                        key={vid.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <SovereignPlayer
                            src={vid.src}
                            title={vid.title}
                            poster="/images/avatars/dr_alvin_west_official.png"
                        />
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
