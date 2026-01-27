'use client';

/**
 * EdIntel SOVEREIGN - Payment Cancelled Page Client
 * Handles cancelled payments with helpful guidance
 */

import React from 'react';
import { motion } from 'framer-motion';
import { XCircle, ArrowLeft, HelpCircle, MessageCircle, RefreshCw } from 'lucide-react';
import Link from 'next/link';

export default function PaymentCancelClient() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-slate-50 to-zinc-50 flex items-center justify-center p-6">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="max-w-2xl w-full"
            >
                {/* Cancel Icon */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                    className="flex justify-center mb-8"
                >
                    <div className="relative">
                        <div className="absolute inset-0 bg-orange-400 rounded-full blur-2xl opacity-30" />
                        <XCircle className="w-32 h-32 text-orange-500 relative" />
                    </div>
                </motion.div>

                {/* Message */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-center mb-8"
                >
                    <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                        Payment Cancelled
                    </h1>
                    <p className="text-xl text-gray-600 mb-2">
                        No charges were made to your account
                    </p>
                    <p className="text-gray-500">
                        Your payment was cancelled. You can try again anytime.
                    </p>
                </motion.div>

                {/* Info Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white rounded-2xl shadow-xl p-8 mb-6"
                >
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <HelpCircle className="w-5 h-5 text-blue-600" />
                        Need Help?
                    </h3>

                    <div className="space-y-3 mb-6">
                        <div className="p-4 bg-blue-50 rounded-xl">
                            <h4 className="font-semibold text-gray-900 mb-1">Payment Issues?</h4>
                            <p className="text-sm text-gray-600">
                                If you encountered any technical issues during checkout, please try a different payment method or contact our support team.
                            </p>
                        </div>

                        <div className="p-4 bg-purple-50 rounded-xl">
                            <h4 className="font-semibold text-gray-900 mb-1">Questions About Pricing?</h4>
                            <p className="text-sm text-gray-600">
                                We offer flexible payment options including monthly and annual plans. Check our pricing page for details.
                            </p>
                        </div>

                        <div className="p-4 bg-green-50 rounded-xl">
                            <h4 className="font-semibold text-gray-900 mb-1">Want to Try Free Features?</h4>
                            <p className="text-sm text-gray-600">
                                You can still access many free features while you decide. No credit card required.
                            </p>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Link
                            href="/payment"
                            className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all"
                        >
                            <RefreshCw className="w-5 h-5" />
                            Try Again
                        </Link>

                        <Link
                            href="/contact"
                            className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all"
                        >
                            <MessageCircle className="w-5 h-5" />
                            Contact Support
                        </Link>
                    </div>
                </motion.div>

                {/* Navigation Links */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                    <Link
                        href="/pricing"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-700 rounded-xl font-semibold hover:shadow-md transition-all"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        View Pricing
                    </Link>

                    <Link
                        href="/dashboard"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-700 rounded-xl font-semibold hover:shadow-md transition-all"
                    >
                        Go to Dashboard
                    </Link>
                </motion.div>
            </motion.div>
        </div>
    );
}
