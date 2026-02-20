'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Home, MessageSquare, Loader2, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import LiveAvatarChat from '@/components/LiveAvatarChat';
import Image from 'next/image';
import { createBrowserClient } from '@supabase/ssr';
import { ROUTES } from '@/lib/routes';

export default function NotFound() {
    const router = useRouter();
    const [showAvatarChat, setShowAvatarChat] = useState(false);
    const [hasSpoken, setHasSpoken] = useState(false);
    const [isLoadingUser, setIsLoadingUser] = useState(true);
    const [userRole, setUserRole] = useState<'admin' | 'teacher' | null>(null);

    // Initialize Sovereign Client
    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    useEffect(() => {
        const checkUser = async () => {
            try {
                const { data: { user } } = await supabase.auth.getUser();
                if (user) {
                    setUserRole(user.user_metadata?.role || 'teacher');
                }
            } catch (error) {
                console.error("Sovereign Identity Check Failed:", error);
            } finally {
                setIsLoadingUser(false);
            }
        };
        checkUser();
    }, [supabase]);

    // Auto-speak greeting when page loads
    useEffect(() => {
        if (!hasSpoken && 'speechSynthesis' in window) {
            setTimeout(() => {
                const utterance = new SpeechSynthesisUtterance(
                    "Oops! It looks like you've wandered into uncharted territory. I'm Dr. Alvin West, and I'm here to help you find your way back. Would you like to talk with me?"
                );
                utterance.rate = 0.9;
                utterance.pitch = 1.0;
                window.speechSynthesis.speak(utterance);
                setHasSpoken(true);
            }, 1000);
        }
    }, [hasSpoken]);

    const handleHomeClick = () => {
        if (userRole === 'admin') {
            router.push(ROUTES.ADMIN_DASHBOARD);
        } else if (userRole === 'teacher') {
            router.push(ROUTES.TEACHER_LAB);
        } else {
            router.push(ROUTES.LOGIN);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Animated background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(20)].map((_, i) => {
                    const seed = i * 13.37;
                    const left = ((seed * 7.919) % 100);
                    const top = ((seed * 11.7) % 100);
                    const delay = ((seed * 2.1) % 8);

                    return (
                        <motion.div
                            key={i}
                            className="absolute w-1 h-1 rounded-full bg-purple-500"
                            style={{
                                left: `${left}%`,
                                top: `${top}%`,
                            }}
                            animate={{
                                y: [0, -30, 0],
                                opacity: [0.2, 0.5, 0.2],
                                scale: [1, 1.5, 1],
                            }}
                            transition={{
                                duration: 15,
                                repeat: Infinity,
                                delay: delay,
                                ease: "easeInOut"
                            }}
                        />
                    );
                })}
            </div>

            <div className="max-w-4xl w-full relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center"
                >
                    {/* 404 Number */}
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                        className="mb-8"
                    >
                        <h1 className="text-[200px] font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 leading-none">
                            404
                        </h1>
                    </motion.div>

                    {/* Avatar Section */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 }}
                        className="mb-8"
                    >
                        <div className="relative inline-block">
                            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-purple-500 shadow-lg shadow-purple-500/50 mx-auto mb-4">
                                <Image
                                    src="/images/avatars/Dr._alvin_west.png"
                                    alt="Dr. Alvin West"
                                    className="w-full h-full object-cover"
                                    width={128}
                                    height={128}
                                />
                            </div>
                            <motion.div
                                className="absolute -bottom-2 -right-2 bg-green-500 w-8 h-8 rounded-full border-4 border-slate-950"
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                        </div>
                    </motion.div>

                    {/* Message */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="mb-8"
                    >
                        <h2 className="text-4xl font-bold text-white mb-4">
                            Page Not Found
                        </h2>
                        <p className="text-xl text-purple-200 mb-6 max-w-2xl mx-auto">
                            Oops! It looks like you've wandered into uncharted territory.
                            I'm <span className="font-bold text-purple-400">Dr. Alvin West</span>,
                            and I'm here to help you find your way back.
                        </p>

                        {/* Speech Bubble */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.8 }}
                            className="relative inline-block max-w-lg mx-auto mb-8"
                        >
                            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 relative">
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-white/10 border-l border-t border-white/20 rotate-45" />
                                <p className="text-white text-lg italic">
                                    "Don't worry! Let me help you get back on track. Would you like to have a conversation with me?"
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Action Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1 }}
                        className="flex flex-wrap gap-4 justify-center"
                    >
                        <motion.button
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleHomeClick}
                            disabled={isLoadingUser}
                            className="px-8 py-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold shadow-lg shadow-purple-500/50 hover:shadow-purple-500/70 transition-all flex items-center gap-2"
                        >
                            {isLoadingUser ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    <span>Locating Signal...</span>
                                </>
                            ) : userRole ? (
                                <>
                                    <ShieldCheck className="w-5 h-5" />
                                    <span>Return to Command Center</span>
                                </>
                            ) : (
                                <>
                                    <Home className="w-5 h-5" />
                                    <span>Return to Login</span>
                                </>
                            )}
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setShowAvatarChat(true)}
                            className="px-8 py-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold transition-all flex items-center gap-2"
                        >
                            <MessageSquare className="w-5 h-5" />
                            Talk with Dr. Alvin
                        </motion.button>

                    </motion.div>

                    {/* Quick Links */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2 }}
                        className="mt-12"
                    >
                        <p className="text-sm text-purple-300 mb-4">Popular Pages:</p>
                        <div className="flex flex-wrap gap-3 justify-center">
                            {[
                                { name: 'AI Generators', href: '/generators' },
                                { name: 'Pricing', href: '/#pricing' },
                                { name: 'About Us', href: '/about' },
                                { name: 'Contact', href: '/contact' },
                            ].map((link, index) => (
                                <Link key={index} href={link.href}>
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-purple-200 text-sm transition-all"
                                    >
                                        {link.name}
                                    </motion.div>
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            </div>

            {/* Live Avatar Chat Modal */}
            {showAvatarChat && (
                <LiveAvatarChat
                    avatarName="Dr. Alvin West"
                    avatarRole="Executive Guide"
                    avatarImage="/images/avatars/Dr._alvin_west.png"
                    avatarVideo="/videos/dr_alvin_talking.mp4"
                    avatarVoice={undefined}
                    onClose={() => setShowAvatarChat(false)}
                />
            )}
        </div>
    );
}
