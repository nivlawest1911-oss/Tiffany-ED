"use client"

import React from "react"

import { AuroraBackground } from "@/components/dashboard/aurora-background"
import { Sidebar } from "@/components/dashboard/Sidebar"
import { TacticalHeader } from "@/components/dashboard/TacticalHeader"
import { EdIntelVibeProvider } from "@/context/EdIntelVibeContext"

import { useEdIntelVibe } from '@/context/EdIntelVibeContext';
import EdIntelCommandDeck from './EdIntelCommandDeck';
import { AnimatePresence, motion } from 'framer-motion';

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
                <main className="flex-1 overflow-y-auto">{children}</main>
            </div>
        </div>
    );
}
