"use client";

import React from 'react';
import { UnityNode } from '@/components/unity/UnityNode';
import { motion } from 'framer-motion';

export default function UnityPage() {
    return (
        <div className="min-h-screen pt-24 px-6 md:px-12 lg:px-24">
            <div className="max-w-[1600px] mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12"
                >
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-[1px] bg-blue-500/50" />
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-500">Node 13 // Integration Layer</span>
                    </div>
                    <h1 className="text-6xl font-black text-white uppercase tracking-tighter italic">
                        Total System <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Unity</span>
                    </h1>
                </motion.div>

                <UnityNode />
            </div>
        </div>
    );
}

