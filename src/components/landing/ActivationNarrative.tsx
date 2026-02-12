'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface Scene {
    id: number;
    title: string;
    subtitle: string;
    description: string;
    duration: number;
}

const SCENES: Scene[] = [
    {
        id: 1,
        title: "THE ACTIVATION",
        subtitle: "Scene 1: The Grid",
        description: "A storm brewing in a server room. Miles of tangled blue wires representing unorganized data stretch across a dark, vast digital landscape.",
        duration: 5000
    },
    {
        id: 2,
        title: "THE ACTIVATION",
        subtitle: "Scene 2: The Activation",
        description: "A pulse of gold light ripples from the center. The crystalline core appears—solid, metallic, heavy. The EdIntel engine awakens, transforming chaos into clarity.",
        duration: 6000
    },
    {
        id: 3,
        title: "EdIntel EdIntel",
        subtitle: "SYSTEM READY",
        description: "This is EdIntel EdIntel. This is the future of educational AI.",
        duration: 3000
    }
];

export default function ActivationNarrative({ onCompleteAction }: { onCompleteAction: () => void }) {
    const [currentScene, setCurrentScene] = useState(0);

    useEffect(() => {
        if (currentScene >= SCENES.length) {
            onCompleteAction();
            return;
        }

        const timer = setTimeout(() => {
            setCurrentScene(prev => prev + 1);
        }, SCENES[currentScene].duration);

        return () => clearTimeout(timer);
    }, [currentScene, onCompleteAction]);

    if (currentScene >= SCENES.length) return null;

    const scene = SCENES[currentScene];

    return (
        <div className="fixed inset-0 z-[150] flex items-center justify-center bg-black/40 pointer-events-none">
            <AnimatePresence mode="wait">
                <motion.div
                    key={scene.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="max-w-4xl w-full px-8 text-center"
                >
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-4xl md:text-7xl font-black text-white tracking-[0.2em] mb-8 uppercase"
                    >
                        {scene.title}
                    </motion.h1>

                    <div className="space-y-6">
                        <motion.h2
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="text-noble-gold text-lg md:text-2xl font-bold uppercase tracking-widest"
                        >
                            {scene.subtitle}
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1 }}
                            className="text-zinc-400 text-sm md:text-xl font-light leading-relaxed italic max-w-2xl mx-auto"
                        >
                            {scene.description}
                        </motion.p>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Progress Indicator */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-4">
                {SCENES.map((_, i) => (
                    <motion.div
                        key={i}
                        className={cn(
                            "h-1 w-12 rounded-full transition-colors duration-500",
                            i <= currentScene ? "bg-noble-gold" : "bg-white/10"
                        )}
                        animate={i === currentScene ? { scaleX: [1, 1.2, 1], opacity: [0.5, 1, 0.5] } : {}}
                        transition={{ repeat: Infinity, duration: 2 }}
                    />
                ))}
            </div>
        </div>
    );
}
