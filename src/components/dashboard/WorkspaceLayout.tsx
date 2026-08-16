"use client"

import React from "react"

import dynamic from 'next/dynamic';
import { Sidebar } from "@/components/layout/Sidebar";
import { EdIntelVibeProvider } from "@/context/EdIntelVibeContext";
import { useEdIntelVibe } from '@/context/EdIntelVibeContext';
import { AnimatePresence, motion } from 'framer-motion';

const AuroraBackground = dynamic(() => import('@/components/dashboard/aurora-background').then(mod => mod.AuroraBackground), {
    ssr: false,
    loading: () => <div className="absolute inset-0 pointer-events-none" />
});
const TacticalHeader = dynamic(() => import('@/components/dashboard/TacticalHeader').then(mod => mod.TacticalHeader), {
    ssr: false,
    loading: () => <div className="h-16 w-full bg-slate-950/80 border-b border-slate-800" />
});
const EdIntelCommandDeck = dynamic(() => import('./EdIntelCommandDeck'), {
    ssr: false,
    loading: () => <div className="fixed inset-0 z-[100] bg-black/95 min-h-screen" />
});

export default function WorkspaceLayout({ children }: { children: React.ReactNode }) {
    return (
        <EdIntelVibeProvider>
            <WorkspaceContent>{children}</WorkspaceContent>
        </EdIntelVibeProvider>
    )
}

function WorkspaceContent({ children }: { children: React.ReactNode }) {
    const { isCommandConsoleOpen } = useEdIntelVibe();

    return (
        <div className="relative flex h-screen" style={{ backgroundColor: "#020617" }}>
            <AuroraBackground />

            {/* COMMAND CONSOLE OVERLAY */}
            <AnimatePresence>
                {isCommandConsoleOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="fixed inset-0 z-[100] bg-black/95 overflow-y-auto"
                    >
                        <EdIntelCommandDeck />
                    </motion.div>
                )}
            </AnimatePresence>

            <Sidebar />
            <div className="flex flex-1 flex-col min-w-0">
                <TacticalHeader />
                <div className="flex-1 overflow-y-auto">{children}</div>
            </div>
        </div>
    );
}
