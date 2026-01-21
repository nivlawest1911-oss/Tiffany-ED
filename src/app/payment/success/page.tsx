'use client';

/**
 * EdIntel SOVEREIGN - Payment Success Page
 * Celebrates successful payment and guides next steps
 */

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Sparkles, ArrowRight, Download, Mail, Calendar } from 'lucide-react';
import Link from 'next/link';

export default function PaymentSuccessPage() {
    const [confetti, setConfetti] = useState(false);

    useEffect(() => {
        // Start confetti on mount (client-side only)
        setConfetti(true);
        // Stop confetti after 5 seconds
        const timer = setTimeout(() => setConfetti(false), 5000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-6">
            {/* Confetti Effect */}
            {confetti && (
                <div className="fixed inset-0 pointer-events-none overflow-hidden">
                    {[...Array(50)].map((_, i) => (
                        <motion.div
                            key={i}
                            initial={{ y: -100, x: Math.random() * window.innerWidth, opacity: 1 }}
                            animate={{
                                y: window.innerHeight + 100,
                                rotate: Math.random() * 360,
                                opacity: 0,
                            }}
                            transition={{
                                duration: Math.random() * 2 + 3,
                                ease: 'linear',
                            }}
                            className="absolute w-3 h-3 rounded-full"
                            style={{
                                backgroundColor: ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444'][Math.floor(Math.random() * 5)],
                            }}
                        />
                    ))}
                </div>
            )}

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="max-w-2xl w-full"
            >
                {/* Success Icon */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                    className="flex justify-center mb-8"
                >
                    <div className="relative">
                        <div className="absolute inset-0 bg-green-400 rounded-full blur-2xl opacity-50 animate-pulse" />
                        <CheckCircle className="w-32 h-32 text-green-500 relative" />
                    </div>
                </motion.div>

                {/* Success Message */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-center mb-8"
                >
                    <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                        Payment Successful!
                    </h1>
                    <p className="text-xl text-gray-600 mb-2">
                        Welcome to EdIntel SOVEREIGN Professional
                    </p>
                    <p className="text-gray-500">
                        Your account has been upgraded and all premium features are now unlocked
                    </p>
                </motion.div>

                {/* Info Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white rounded-2xl shadow-xl p-8 mb-6"
                >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="text-center">
                            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-xl mb-3">
                                <Mail className="w-6 h-6 text-blue-600" />
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-1">Confirmation Email</h3>
                            <p className="text-sm text-gray-600">Sent to your inbox</p>
                        </div>

                        <div className="text-center">
                            <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-xl mb-3">
                                <Download className="w-6 h-6 text-purple-600" />
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-1">Receipt</h3>
                            <p className="text-sm text-gray-600">Available in dashboard</p>
                        </div>

                        <div className="text-center">
                            <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-xl mb-3">
                                <Calendar className="w-6 h-6 text-green-600" />
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-1">Next Billing</h3>
                            <p className="text-sm text-gray-600">30 days from today</p>
                        </div>
                    </div>

                    {/* What's Next */}
                    <div className="border-t border-gray-200 pt-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <Sparkles className="w-5 h-5 text-yellow-500" />
                            What's Next?
                        </h3>

                        <div className="space-y-3">
                            <Link
                                href="/dashboard"
                                className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl hover:shadow-md transition-all group"
                            >
                                <div>
                                    <h4 className="font-semibold text-gray-900">Explore Your Dashboard</h4>
                                    <p className="text-sm text-gray-600">Access all premium AI tools and features</p>
                                </div>
                                <ArrowRight className="w-5 h-5 text-blue-600 group-hover:translate-x-1 transition-transform" />
                            </Link>

                            <Link
                                href="/gemini-workspace"
                                className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl hover:shadow-md transition-all group"
                            >
                                <div>
                                    <h4 className="font-semibold text-gray-900">Import Gemini Content</h4>
                                    <p className="text-sm text-gray-600">Sync your Google Gemini workspace</p>
                                </div>
                                <ArrowRight className="w-5 h-5 text-green-600 group-hover:translate-x-1 transition-transform" />
                            </Link>

                            <Link
                                href="/huggingface"
                                className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl hover:shadow-md transition-all group"
                            >
                                <div>
                                    <h4 className="font-semibold text-gray-900">Try AI Studio</h4>
                                    <p className="text-sm text-gray-600">Generate images, analyze text, and more</p>
                                </div>
                                <ArrowRight className="w-5 h-5 text-orange-600 group-hover:translate-x-1 transition-transform" />
                            </Link>

                            <Link
                                href="/phone"
                                className="flex items-center justify-between p-4 bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl hover:shadow-md transition-all group"
                            >
                                <div>
                                    <h4 className="font-semibold text-gray-900">AI Phone Center</h4>
                                    <p className="text-sm text-gray-600">Make AI-powered phone calls</p>
                                </div>
                                <ArrowRight className="w-5 h-5 text-pink-600 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>
                </motion.div>

                {/* CTA Button */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-center"
                >
                    <Link
                        href="/dashboard"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all"
                    >
                        <Sparkles className="w-5 h-5" />
                        Get Started Now
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </motion.div>
            </motion.div>
        </div>
    );
}
