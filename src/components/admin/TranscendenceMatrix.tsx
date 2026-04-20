'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Activity, Zap, Shield, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const TranscendenceMatrix: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        const nodes = Array.from({ length: 14 }).map((_, i) => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 1,
            vy: (Math.random() - 0.5) * 1,
            id: i
        }));

        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw connections
            ctx.strokeStyle = 'rgba(191, 155, 48, 0.1)';
            ctx.lineWidth = 0.5;
            nodes.forEach((node, i) => {
                nodes.slice(i + 1).forEach(other => {
                    const dist = Math.hypot(node.x - other.x, node.y - other.y);
                    if (dist < 150) {
                        ctx.beginPath();
                        ctx.moveTo(node.x, node.y);
                        ctx.lineTo(other.x, other.y);
                        ctx.stroke();
                    }
                });
            });

            // Draw nodes
            nodes.forEach(node => {
                node.x += node.vx;
                node.y += node.vy;

                if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
                if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

                ctx.fillStyle = '#BF9B30';
                ctx.beginPath();
                ctx.arc(node.x, node.y, 2, 0, Math.PI * 2);
                ctx.fill();
            });

            animationFrameId = requestAnimationFrame(render);
        };

        const resize = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };

        window.addEventListener('resize', resize);
        resize();
        render();

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', resize);
        };
    }, []);

    return (
        <div className="min-h-screen bg-black p-8 flex flex-col items-center justify-center space-y-8 overflow-hidden">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-4 relative z-10"
            >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-intel-gold/10 border border-intel-gold/20 text-intel-gold text-[10px] font-black uppercase tracking-[0.2em] mb-4">
                    <Sparkles className="w-3 h-3" />
                    Transcendence Achieved
                </div>
                <h1 className="text-6xl md:text-8xl font-black text-white italic tracking-tighter uppercase leading-none">
                    Institutional <span className="text-intel-gold">Transcendence</span>
                </h1>
                <p className="text-intel-gold/40 font-mono text-xs uppercase tracking-widest max-w-2xl mx-auto">
                    The EdIntel Sovereign Architecture has reached singularity. All 14 nodes are now operating in absolute unison, bypassing traditional pedagogical limits.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl relative z-10">
                <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
                    <CardHeader>
                        <CardTitle className="text-intel-gold flex items-center gap-2 text-sm uppercase italic">
                            <Zap className="w-4 h-4" /> Global Pulse
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-black text-white tracking-tighter">100.0%</div>
                        <div className="text-[10px] text-white/40 uppercase font-mono mt-1">Synchronization achieved</div>
                    </CardContent>
                </Card>

                <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
                    <CardHeader>
                        <CardTitle className="text-intel-gold flex items-center gap-2 text-sm uppercase italic">
                            <Activity className="w-4 h-4" /> Synaptic Velocity
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-black text-white tracking-tighter">8.4 t/ms</div>
                        <div className="text-[10px] text-white/40 uppercase font-mono mt-1">Neural propagation speed</div>
                    </CardContent>
                </Card>

                <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
                    <CardHeader>
                        <CardTitle className="text-intel-gold flex items-center gap-2 text-sm uppercase italic">
                            <Shield className="w-4 h-4" /> Integrity
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-black text-white tracking-tighter">ABSOLUTE</div>
                        <div className="text-[10px] text-white/40 uppercase font-mono mt-1">System resistance hardened</div>
                    </CardContent>
                </Card>
            </div>

            <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
                <canvas ref={canvasRef} className="w-full h-full" />
            </div>

            <motion.div
                animate={{
                    rotate: 360,
                    scale: [1, 1.1, 1]
                }}
                transition={{
                    rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                    scale: { duration: 5, repeat: Infinity, ease: "easeInOut" }
                }}
                className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border-2 border-intel-gold/5 rounded-full pointer-events-none"
            />
        </div>
    );
};

export default TranscendenceMatrix;
