'use client';

/**
 * EdIntel EdIntel - Universal Payment Hub
 * Beautiful UI for accepting ALL forms of currency
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    CreditCard,
    Wallet,
    Globe,
    Zap,
    CheckCircle,
    AlertCircle,
    Loader,
    Bitcoin,
    DollarSign,
    TrendingUp,
    Shield,
    Clock,
    Info,
} from 'lucide-react';
import Image from 'next/image';
import { PaymentMethod, PaymentMethodCapability } from '@/lib/payments/unified';

interface UniversalPaymentHubProps {
    amount: number;
    description: string;
    userId: string;
    customerEmail: string;
    onSuccess?: (paymentId: string) => void;
    onCancel?: () => void;
}

export default function UniversalPaymentHub({
    amount,
    description,
    userId,
    customerEmail,
    onSuccess,
    onCancel,
}: UniversalPaymentHubProps) {
    const [paymentMethods, setPaymentMethods] = useState<PaymentMethodCapability[]>([]);
    const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);
    const [selectedCurrency, setSelectedCurrency] = useState<string>('USD');
    const [loading, setLoading] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [qrCode, setQrCode] = useState<string | null>(null);

    // Fetch available payment methods
    useEffect(() => {
        fetchPaymentMethods();
    }, []);

    const fetchPaymentMethods = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/payments/methods');
            const data = await response.json();
            setPaymentMethods(data.methods);
        } catch (err) {
            setError('Failed to load payment methods');
        } finally {
            setLoading(false);
        }
    };

    const handlePaymentMethodSelect = (method: PaymentMethod) => {
        setSelectedMethod(method);
        setError(null);

        // Set default currency based on method
        const methodData = paymentMethods.find(m => m.method === method);
        if (methodData && methodData.supportedCurrencies.length > 0) {
            setSelectedCurrency(methodData.supportedCurrencies[0]);
        }
    };

    const handleCreatePayment = async () => {
        if (!selectedMethod) return;

        try {
            setProcessing(true);
            setError(null);

            const response = await fetch('/api/payments/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount,
                    currency: selectedCurrency,
                    method: selectedMethod,
                    description,
                    userId,
                    customerEmail,
                    successUrl: `${window.location.origin}/payment/success`,
                    cancelUrl: `${window.location.origin}/payment/cancel`,
                }),
            });

            if (!response.ok) {
                throw new Error('Payment creation failed');
            }

            const data = await response.json();

            if (data.checkoutUrl) {
                // Redirect to checkout page
                window.location.href = data.checkoutUrl;
            } else if (data.qrCode) {
                // Show QR code for crypto payments
                setQrCode(data.qrCode);
                setSuccess(true);
            } else {
                setSuccess(true);
                if (onSuccess) {
                    onSuccess(data.paymentId);
                }
            }
        } catch (err) {
            setError('Failed to create payment. Please try again.');
        } finally {
            setProcessing(false);
        }
    };

    const getCategoryIcon = (method: PaymentMethod) => {
        if (method === 'crypto') return <Bitcoin className="w-6 h-6" />;
        if (['card', 'apple_pay', 'google_pay'].includes(method)) return <CreditCard className="w-6 h-6" />;
        if (['paypal', 'afterpay', 'klarna', 'affirm'].includes(method)) return <Wallet className="w-6 h-6" />;
        return <Globe className="w-6 h-6" />;
    };

    const getCategoryColor = (method: PaymentMethod) => {
        if (method === 'crypto') return 'from-noble-gold to-noble-gold-dark';
        if (['card', 'apple_pay', 'google_pay'].includes(method)) return 'from-noble-gold to-zinc-700';
        if (['paypal', 'afterpay', 'klarna', 'affirm'].includes(method)) return 'from-zinc-800 to-zinc-950';
        return 'from-gray-700 to-gray-900';
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <Loader className="w-12 h-12 animate-spin text-blue-500 mx-auto mb-4" />
                    <p className="text-gray-600">Loading payment methods...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-6">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-8"
            >
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-noble-gold to-noble-gold-dark rounded-full text-white text-sm font-semibold mb-4">
                    <Shield className="w-4 h-4" />
                    Secure EdIntel Protocol
                </div>
                <h1 className="text-4xl font-black mb-2 uppercase tracking-tighter text-white">
                    Select <span className="text-noble-gold italic">Payment</span> Method
                </h1>
                <p className="text-white/60 text-lg font-medium">
                    We accept every form of currency - Traditional, Crypto, and Digital Wallets
                </p>

                {/* Amount Display */}
                <div className="mt-6 inline-flex items-center gap-3 px-6 py-3 bg-zinc-900 border border-noble-gold/20 rounded-2xl shadow-2xl">
                    <DollarSign className="w-6 h-6 text-noble-gold" />
                    <div className="text-left">
                        <p className="text-[10px] font-black uppercase tracking-widest text-white/30">Total Value</p>
                        <p className="text-2xl font-black text-white italic">${amount.toFixed(2)}</p>
                    </div>
                </div>
            </motion.div>

            {/* Payment Methods Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {paymentMethods.map((method, index) => (
                    <motion.button
                        key={method.method}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => handlePaymentMethodSelect(method.method)}
                        className={`relative p-6 rounded-2xl border transition-all duration-300 text-left ${selectedMethod === method.method
                            ? 'border-noble-gold bg-noble-gold/10 shadow-lg shadow-noble-gold/20'
                            : 'border-zinc-800 bg-zinc-900/50 hover:border-zinc-700 hover:shadow-md'
                            }`}
                    >
                        {/* Icon */}
                        <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${getCategoryColor(method.method)} text-white mb-4`}>
                            {getCategoryIcon(method.method)}
                        </div>

                        {/* Method Info */}
                        <div className="mb-3">
                            <div className="flex items-center gap-2 mb-1">
                                <h3 className="text-lg font-black text-white uppercase tracking-tight">{method.name}</h3>
                                <span className="text-2xl">{method.icon}</span>
                            </div>
                            <p className="text-xs text-white/40 font-medium leading-relaxed">{method.description}</p>
                        </div>

                        {/* Processing Time */}
                        <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                            <Clock className="w-3 h-3" />
                            {method.processingTime}
                        </div>

                        {/* Fees */}
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                            <TrendingUp className="w-3 h-3" />
                            {method.fees.percentage}% + ${method.fees.fixed.toFixed(2)}
                        </div>

                        {/* Regions */}
                        <div className="mt-3 flex flex-wrap gap-1">
                            {method.regions.slice(0, 2).map((region) => (
                                <span
                                    key={region}
                                    className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                                >
                                    {region}
                                </span>
                            ))}
                        </div>

                        {/* Selected Indicator */}
                        {selectedMethod === method.method && (
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="absolute top-4 right-4"
                            >
                                <CheckCircle className="w-6 h-6 text-noble-gold" />
                            </motion.div>
                        )}
                    </motion.button>
                ))}
            </div>

            {/* Currency Selection */}
            <AnimatePresence>
                {selectedMethod && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mb-8"
                    >
                        <div className="bg-zinc-900 border border-noble-gold/20 rounded-2xl p-6">
                            <h3 className="text-xs font-black text-noble-gold uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
                                <Globe className="w-4 h-4" />
                                Select Channel Currency
                            </h3>

                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                                {paymentMethods
                                    .find(m => m.method === selectedMethod)
                                    ?.supportedCurrencies.map((currency) => (
                                        <button
                                            key={currency}
                                            onClick={() => setSelectedCurrency(currency)}
                                            className={`px-4 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${selectedCurrency === currency
                                                ? 'bg-noble-gold text-black shadow-lg shadow-noble-gold/20'
                                                : 'bg-black text-white/40 hover:bg-zinc-800 border-2 border-zinc-800'
                                                }`}
                                        >
                                            {currency}
                                        </button>
                                    ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Error Message */}
            <AnimatePresence>
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-xl flex items-center gap-3"
                    >
                        <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                        <p className="text-red-700">{error}</p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Success Message with QR Code */}
            <AnimatePresence>
                {success && qrCode && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="mb-6 p-8 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl text-center"
                    >
                        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Payment Address Generated</h3>
                        <p className="text-gray-600 mb-6">Scan the QR code below to complete your payment</p>

                        <div className="inline-block p-4 bg-white rounded-2xl shadow-lg">
                            <Image src={qrCode} alt="Payment QR Code" width={256} height={256} className="w-64 h-64" />
                        </div>

                        <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-600">
                            <Info className="w-4 h-4" />
                            Payment will be confirmed automatically once received
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Action Buttons */}
            <div className="flex gap-4 justify-center">
                {onCancel && (
                    <button
                        onClick={onCancel}
                        disabled={processing}
                        className="px-8 py-4 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Cancel
                    </button>
                )}

                <button
                    onClick={handleCreatePayment}
                    disabled={!selectedMethod || processing}
                    className="px-8 py-4 bg-noble-gold text-black rounded-xl font-black text-xs uppercase tracking-[0.2em] hover:shadow-lg hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center gap-2"
                >
                    {processing ? (
                        <>
                            <Loader className="w-5 h-5 animate-spin" />
                            Initialising...
                        </>
                    ) : (
                        <>
                            <Zap className="w-5 h-5 fill-current" />
                            Authorise Payment
                        </>
                    )}
                </button>
            </div>

            {/* Security Badge */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-8 text-center"
            >
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-600">
                    <Shield className="w-4 h-4 text-green-500" />
                    256-bit SSL Encrypted • PCI DSS Compliant • Blockchain Verified
                </div>
            </motion.div>
        </div>
    );
}
