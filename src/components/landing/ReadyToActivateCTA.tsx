'use client';

import React, { memo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Shield, ArrowRight, Zap, LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { ROUTES } from '@/lib/routes';
import { cn } from '@/lib/utils';


interface CTAButtonProps {
    href: string;
    icon: LucideIcon;
    label: string;
    variant?: 'primary' | 'secondary';
}

const CTAButton = memo(({ href, icon: Icon, label, variant = 'primary' }: CTAButtonProps) => {
    const shouldReduceMotion = useReducedMotion();

    if (variant === 'secondary') {
        return (
            <Link href={href}>
                <motion.button
                    whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                    whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
                    className="px-12 py-5 border border-white/10 text-white font-black uppercase tracking-widest rounded-xl hover:bg-white/5 backdrop-blur-md transition-all whitespace-nowrap"
                >
                    {label}
                </motion.button>
            </Link>
        );
    }

    return (
        <Link href={href}>
            <motion.button
                whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
                className="group relative px-12 py-5 bg-electric-cyan text-black font-black uppercase tracking-widest rounded-xl transition-all shadow-[0_0_40px_rgba(0,176,255,0.3)] hover:shadow-[0_0_60px_rgba(0,176,255,0.5)] flex items-center gap-3 whitespace-nowrap"
            >
                <Icon aria-hidden="true" className="w-5 h-5 fill-current" />
                {label}
                <ArrowRight aria-hidden="true" className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </motion.button>
        </Link>
    );
});

CTAButton.displayName = 'CTAButton';

const AnimatedHeader = memo(() => (
    <>
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-black/40 border border-electric-cyan/30 mb-8 shadow-[0_0_50px_rgba(0,176,255,0.15)] backdrop-blur-xl"
        >
            <Shield aria-hidden="true" className="w-10 h-10 text-electric-cyan" />
        </motion.div>

        <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-black text-white mb-6 uppercase tracking-tighter leading-none italic"
        >
            ACTIVATE INSTITUTIONAL <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-cyan to-blue-500">EXCELLENCE</span>
        </motion.h2>

        <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-zinc-500 text-lg md:text-xl mb-12 max-w-2xl mx-auto font-black uppercase tracking-widest"
        >
            Scale specialized intelligence across your entire organization. Master the <span className="text-sovereign-gold">Sovereign Protocol</span> to drive measurable institutional ROI.
        </motion.p>
    </>
));

AnimatedHeader.displayName = 'AnimatedHeader';

export default function ReadyToActivateCTA() {
    const { user } = useAuth();
    const isSignedIn = !!user;
    const [isMobile, setIsMobile] = React.useState(false);

    React.useEffect(() => {
        setIsMobile(window.innerWidth < 768);
    }, []);

    return (
        <section className="relative py-32 overflow-hidden bg-[#020617]">
            {/* Background Effects - Simplified for performance */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,176,255,0.05)_0%,_transparent_70%)] pointer-events-none" />

            <div className="container relative mx-auto px-4 z-10">
                <div className="max-w-4xl mx-auto text-center">
                    <AnimatedHeader />

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-col md:flex-row items-center justify-center gap-6"
                    >
                        {isSignedIn ? (
                            <CTAButton 
                                href="/the-room" 
                                icon={Zap} 
                                label="Return to Control" 
                            />
                        ) : (
                            <CTAButton 
                                href={`${String(ROUTES.LOGIN)}?mode=signup`} 
                                icon={Zap} 
                                label="Start Activation" 
                            />
                        )}

                        <CTAButton 
                            href="/demo" 
                            icon={Zap} 
                            label="View System Demo" 
                            variant="secondary"
                        />
                    </motion.div>
                </div>
            </div>

            {/* Glowing Orbs - Simplified for Mobile performance */}
            <div 
                className={cn(
                    "absolute top-1/2 left-0 rounded-full -z-10 animate-pulse transform-gpu bg-electric-cyan/10",
                    isMobile ? "w-48 h-48 blur-[60px]" : "w-96 h-96 blur-[120px]"
                )}
                style={{ transform: 'translate3d(0, -50%, 0)' }}
            />
            <div 
                className={cn(
                    "absolute bottom-0 right-0 rounded-full -z-10 animate-pulse transform-gpu bg-sovereign-gold/10",
                    isMobile ? "w-48 h-48 blur-[60px]" : "w-96 h-96 blur-[120px]"
                )}
            />
        </section>
    );
}

