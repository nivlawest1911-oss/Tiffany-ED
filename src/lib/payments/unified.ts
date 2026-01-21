/**
 * EdIntel SOVEREIGN - Unified Payment System
 * Accepts ALL forms of currency: Fiat, Crypto, Digital Wallets, Regional Methods
 */

import { CryptoPaymentService, CryptoCurrency, CryptoPaymentRequest } from './crypto';

export type PaymentMethod =
    | 'card'           // Credit/Debit Cards
    | 'crypto'         // Cryptocurrencies
    | 'paypal'         // PayPal
    | 'apple_pay'      // Apple Pay
    | 'google_pay'     // Google Pay
    | 'alipay'         // Alipay (China)
    | 'wechat_pay'     // WeChat Pay (China)
    | 'sepa'           // SEPA Direct Debit (Europe)
    | 'ideal'          // iDEAL (Netherlands)
    | 'giropay'        // Giropay (Germany)
    | 'sofort'         // Sofort (Europe)
    | 'bancontact'     // Bancontact (Belgium)
    | 'eps'            // EPS (Austria)
    | 'p24'            // Przelewy24 (Poland)
    | 'boleto'         // Boleto (Brazil)
    | 'oxxo'           // OXXO (Mexico)
    | 'konbini'        // Konbini (Japan)
    | 'grabpay'        // GrabPay (Southeast Asia)
    | 'paynow'         // PayNow (Singapore)
    | 'promptpay'      // PromptPay (Thailand)
    | 'fpx'            // FPX (Malaysia)
    | 'afterpay'       // Afterpay/Clearpay
    | 'klarna'         // Klarna
    | 'affirm';        // Affirm

export interface UnifiedPaymentRequest {
    amount: number;
    currency: string; // ISO 4217 currency code or crypto symbol
    method: PaymentMethod;
    description: string;
    userId: string;
    customerEmail: string;
    metadata?: Record<string, any>;
    successUrl?: string;
    cancelUrl?: string;
}

export interface UnifiedPaymentResponse {
    paymentId: string;
    status: 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled';
    method: PaymentMethod;
    amount: number;
    currency: string;
    checkoutUrl?: string;
    qrCode?: string;
    paymentAddress?: string;
    expiresAt?: Date;
    metadata?: Record<string, any>;
}

export interface PaymentMethodCapability {
    method: PaymentMethod;
    name: string;
    description: string;
    icon: string;
    supportedCurrencies: string[];
    regions: string[];
    processingTime: string;
    fees: {
        percentage: number;
        fixed: number;
    };
}

/**
 * Unified Payment Service
 * Orchestrates all payment methods into a single, seamless interface
 */
export class UnifiedPaymentService {
    private cryptoService: CryptoPaymentService;
    private stripeKey: string;

    constructor() {
        this.stripeKey = process.env.STRIPE_SECRET_KEY || '';

        // Initialize crypto payment service
        const { initCryptoPayments } = require('./crypto');
        this.cryptoService = initCryptoPayments();
    }

    /**
     * Create a payment with any supported method
     */
    async createPayment(request: UnifiedPaymentRequest): Promise<UnifiedPaymentResponse> {
        try {
            // Route to appropriate payment processor based on method
            switch (request.method) {
                case 'crypto':
                    return await this.createCryptoPayment(request);

                case 'card':
                case 'apple_pay':
                case 'google_pay':
                    return await this.createStripePayment(request);

                case 'paypal':
                    return await this.createPayPalPayment(request);

                case 'alipay':
                case 'wechat_pay':
                    return await this.createAsianPayment(request);

                case 'sepa':
                case 'ideal':
                case 'giropay':
                case 'sofort':
                case 'bancontact':
                case 'eps':
                case 'p24':
                    return await this.createEuropeanPayment(request);

                case 'boleto':
                case 'oxxo':
                    return await this.createLatinAmericanPayment(request);

                case 'konbini':
                case 'grabpay':
                case 'paynow':
                case 'promptpay':
                case 'fpx':
                    return await this.createAsianPayment(request);

                case 'afterpay':
                case 'klarna':
                case 'affirm':
                    return await this.createBNPLPayment(request);

                default:
                    throw new Error(`Unsupported payment method: ${request.method}`);
            }
        } catch (error) {
            console.error('Payment creation error:', error);
            throw error;
        }
    }

    /**
     * Get payment status
     */
    async getPaymentStatus(paymentId: string, method: PaymentMethod): Promise<UnifiedPaymentResponse> {
        try {
            if (method === 'crypto') {
                const cryptoStatus = await this.cryptoService.getPaymentStatus(paymentId);
                return {
                    paymentId: cryptoStatus.paymentId,
                    status: cryptoStatus.status,
                    method: 'crypto',
                    amount: parseFloat(cryptoStatus.amount),
                    currency: cryptoStatus.currency,
                    paymentAddress: cryptoStatus.address,
                    qrCode: cryptoStatus.qrCode,
                    expiresAt: cryptoStatus.expiresAt,
                };
            }

            // For other methods, query Stripe or respective payment processor
            return await this.getStripePaymentStatus(paymentId);
        } catch (error) {
            console.error('Payment status check error:', error);
            throw error;
        }
    }

    /**
     * Get all available payment methods with capabilities
     */
    getAvailablePaymentMethods(): PaymentMethodCapability[] {
        return [
            {
                method: 'card',
                name: 'Credit/Debit Card',
                description: 'Visa, Mastercard, American Express, Discover',
                icon: '💳',
                supportedCurrencies: ['USD', 'EUR', 'GBP', 'CAD', 'AUD', 'JPY', 'CNY'],
                regions: ['Global'],
                processingTime: 'Instant',
                fees: { percentage: 2.9, fixed: 0.30 },
            },
            {
                method: 'crypto',
                name: 'Cryptocurrency',
                description: 'Bitcoin, Ethereum, USDC, and more',
                icon: '₿',
                supportedCurrencies: ['BTC', 'ETH', 'USDC', 'USDT', 'BNB', 'SOL', 'ADA', 'DOT', 'MATIC', 'AVAX'],
                regions: ['Global'],
                processingTime: '10-30 minutes',
                fees: { percentage: 1.0, fixed: 0 },
            },
            {
                method: 'paypal',
                name: 'PayPal',
                description: 'Pay with your PayPal account',
                icon: '🅿️',
                supportedCurrencies: ['USD', 'EUR', 'GBP', 'CAD', 'AUD'],
                regions: ['Global'],
                processingTime: 'Instant',
                fees: { percentage: 3.49, fixed: 0.49 },
            },
            {
                method: 'apple_pay',
                name: 'Apple Pay',
                description: 'Fast and secure payment with Apple Pay',
                icon: '',
                supportedCurrencies: ['USD', 'EUR', 'GBP', 'CAD', 'AUD', 'JPY'],
                regions: ['Global'],
                processingTime: 'Instant',
                fees: { percentage: 2.9, fixed: 0.30 },
            },
            {
                method: 'google_pay',
                name: 'Google Pay',
                description: 'Pay quickly with Google Pay',
                icon: '🔵',
                supportedCurrencies: ['USD', 'EUR', 'GBP', 'CAD', 'AUD', 'JPY'],
                regions: ['Global'],
                processingTime: 'Instant',
                fees: { percentage: 2.9, fixed: 0.30 },
            },
            {
                method: 'alipay',
                name: 'Alipay',
                description: 'Popular payment method in China',
                icon: '🇨🇳',
                supportedCurrencies: ['CNY', 'USD', 'EUR'],
                regions: ['China', 'Asia'],
                processingTime: 'Instant',
                fees: { percentage: 2.5, fixed: 0 },
            },
            {
                method: 'wechat_pay',
                name: 'WeChat Pay',
                description: 'Pay with WeChat',
                icon: '💬',
                supportedCurrencies: ['CNY', 'USD', 'EUR'],
                regions: ['China', 'Asia'],
                processingTime: 'Instant',
                fees: { percentage: 2.5, fixed: 0 },
            },
            {
                method: 'ideal',
                name: 'iDEAL',
                description: 'Popular in the Netherlands',
                icon: '🇳🇱',
                supportedCurrencies: ['EUR'],
                regions: ['Netherlands'],
                processingTime: 'Instant',
                fees: { percentage: 0.29, fixed: 0 },
            },
            {
                method: 'sepa',
                name: 'SEPA Direct Debit',
                description: 'Bank transfer across Europe',
                icon: '🇪🇺',
                supportedCurrencies: ['EUR'],
                regions: ['Europe'],
                processingTime: '3-5 business days',
                fees: { percentage: 0.8, fixed: 0 },
            },
            {
                method: 'klarna',
                name: 'Klarna',
                description: 'Buy now, pay later',
                icon: '🛍️',
                supportedCurrencies: ['USD', 'EUR', 'GBP', 'SEK', 'NOK', 'DKK'],
                regions: ['Europe', 'North America', 'Australia'],
                processingTime: 'Instant',
                fees: { percentage: 3.29, fixed: 0.30 },
            },
            {
                method: 'afterpay',
                name: 'Afterpay',
                description: 'Pay in 4 interest-free installments',
                icon: '💰',
                supportedCurrencies: ['USD', 'AUD', 'NZD', 'GBP', 'CAD'],
                regions: ['Australia', 'New Zealand', 'North America', 'UK'],
                processingTime: 'Instant',
                fees: { percentage: 4.0, fixed: 0.30 },
            },
        ];
    }

    /**
     * Create cryptocurrency payment
     */
    private async createCryptoPayment(request: UnifiedPaymentRequest): Promise<UnifiedPaymentResponse> {
        const cryptoRequest: CryptoPaymentRequest = {
            amount: request.amount,
            currency: request.currency as CryptoCurrency,
            description: request.description,
            userId: request.userId,
            metadata: request.metadata,
        };

        const cryptoPayment = await this.cryptoService.createPayment(cryptoRequest);

        return {
            paymentId: cryptoPayment.paymentId,
            status: 'pending',
            method: 'crypto',
            amount: parseFloat(cryptoPayment.amount),
            currency: cryptoPayment.currency,
            paymentAddress: cryptoPayment.address,
            qrCode: cryptoPayment.qrCode,
            expiresAt: cryptoPayment.expiresAt,
            metadata: request.metadata,
        };
    }

    /**
     * Create Stripe payment (cards, Apple Pay, Google Pay)
     */
    private async createStripePayment(request: UnifiedPaymentRequest): Promise<UnifiedPaymentResponse> {
        try {
            const stripe = require('stripe')(this.stripeKey);

            const session = await stripe.checkout.sessions.create({
                payment_method_types: [this.mapStripePaymentMethod(request.method)],
                line_items: [
                    {
                        price_data: {
                            currency: request.currency.toLowerCase(),
                            product_data: {
                                name: request.description,
                            },
                            unit_amount: Math.round(request.amount * 100), // Convert to cents
                        },
                        quantity: 1,
                    },
                ],
                mode: 'payment',
                success_url: request.successUrl || `${process.env.NEXT_PUBLIC_APP_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: request.cancelUrl || `${process.env.NEXT_PUBLIC_APP_URL}/payment/cancel`,
                customer_email: request.customerEmail,
                metadata: request.metadata,
            });

            return {
                paymentId: session.id,
                status: 'pending',
                method: request.method,
                amount: request.amount,
                currency: request.currency,
                checkoutUrl: session.url,
                metadata: request.metadata,
            };
        } catch (error) {
            console.error('Stripe payment creation error:', error);
            throw error;
        }
    }

    /**
     * Create PayPal payment
     */
    private async createPayPalPayment(request: UnifiedPaymentRequest): Promise<UnifiedPaymentResponse> {
        // Implement PayPal SDK integration
        return {
            paymentId: `paypal-${Date.now()}`,
            status: 'pending',
            method: 'paypal',
            amount: request.amount,
            currency: request.currency,
            checkoutUrl: `https://www.paypal.com/checkoutnow?token=PLACEHOLDER`,
            metadata: request.metadata,
        };
    }

    /**
     * Create Asian payment methods (Alipay, WeChat Pay, etc.)
     */
    private async createAsianPayment(request: UnifiedPaymentRequest): Promise<UnifiedPaymentResponse> {
        try {
            const stripe = require('stripe')(this.stripeKey);

            const session = await stripe.checkout.sessions.create({
                payment_method_types: [this.mapStripePaymentMethod(request.method)],
                line_items: [
                    {
                        price_data: {
                            currency: request.currency.toLowerCase(),
                            product_data: {
                                name: request.description,
                            },
                            unit_amount: Math.round(request.amount * 100),
                        },
                        quantity: 1,
                    },
                ],
                mode: 'payment',
                success_url: request.successUrl || `${process.env.NEXT_PUBLIC_APP_URL}/payment/success`,
                cancel_url: request.cancelUrl || `${process.env.NEXT_PUBLIC_APP_URL}/payment/cancel`,
                customer_email: request.customerEmail,
                metadata: request.metadata,
            });

            return {
                paymentId: session.id,
                status: 'pending',
                method: request.method,
                amount: request.amount,
                currency: request.currency,
                checkoutUrl: session.url,
                metadata: request.metadata,
            };
        } catch (error) {
            console.error('Asian payment creation error:', error);
            throw error;
        }
    }

    /**
     * Create European payment methods
     */
    private async createEuropeanPayment(request: UnifiedPaymentRequest): Promise<UnifiedPaymentResponse> {
        try {
            const stripe = require('stripe')(this.stripeKey);

            const session = await stripe.checkout.sessions.create({
                payment_method_types: [this.mapStripePaymentMethod(request.method)],
                line_items: [
                    {
                        price_data: {
                            currency: 'eur',
                            product_data: {
                                name: request.description,
                            },
                            unit_amount: Math.round(request.amount * 100),
                        },
                        quantity: 1,
                    },
                ],
                mode: 'payment',
                success_url: request.successUrl || `${process.env.NEXT_PUBLIC_APP_URL}/payment/success`,
                cancel_url: request.cancelUrl || `${process.env.NEXT_PUBLIC_APP_URL}/payment/cancel`,
                customer_email: request.customerEmail,
                metadata: request.metadata,
            });

            return {
                paymentId: session.id,
                status: 'pending',
                method: request.method,
                amount: request.amount,
                currency: request.currency,
                checkoutUrl: session.url,
                metadata: request.metadata,
            };
        } catch (error) {
            console.error('European payment creation error:', error);
            throw error;
        }
    }

    /**
     * Create Latin American payment methods
     */
    private async createLatinAmericanPayment(request: UnifiedPaymentRequest): Promise<UnifiedPaymentResponse> {
        try {
            const stripe = require('stripe')(this.stripeKey);

            const session = await stripe.checkout.sessions.create({
                payment_method_types: [this.mapStripePaymentMethod(request.method)],
                line_items: [
                    {
                        price_data: {
                            currency: request.currency.toLowerCase(),
                            product_data: {
                                name: request.description,
                            },
                            unit_amount: Math.round(request.amount * 100),
                        },
                        quantity: 1,
                    },
                ],
                mode: 'payment',
                success_url: request.successUrl || `${process.env.NEXT_PUBLIC_APP_URL}/payment/success`,
                cancel_url: request.cancelUrl || `${process.env.NEXT_PUBLIC_APP_URL}/payment/cancel`,
                customer_email: request.customerEmail,
                metadata: request.metadata,
            });

            return {
                paymentId: session.id,
                status: 'pending',
                method: request.method,
                amount: request.amount,
                currency: request.currency,
                checkoutUrl: session.url,
                metadata: request.metadata,
            };
        } catch (error) {
            console.error('Latin American payment creation error:', error);
            throw error;
        }
    }

    /**
     * Create Buy Now Pay Later (BNPL) payment
     */
    private async createBNPLPayment(request: UnifiedPaymentRequest): Promise<UnifiedPaymentResponse> {
        try {
            const stripe = require('stripe')(this.stripeKey);

            const session = await stripe.checkout.sessions.create({
                payment_method_types: [this.mapStripePaymentMethod(request.method)],
                line_items: [
                    {
                        price_data: {
                            currency: request.currency.toLowerCase(),
                            product_data: {
                                name: request.description,
                            },
                            unit_amount: Math.round(request.amount * 100),
                        },
                        quantity: 1,
                    },
                ],
                mode: 'payment',
                success_url: request.successUrl || `${process.env.NEXT_PUBLIC_APP_URL}/payment/success`,
                cancel_url: request.cancelUrl || `${process.env.NEXT_PUBLIC_APP_URL}/payment/cancel`,
                customer_email: request.customerEmail,
                metadata: request.metadata,
            });

            return {
                paymentId: session.id,
                status: 'pending',
                method: request.method,
                amount: request.amount,
                currency: request.currency,
                checkoutUrl: session.url,
                metadata: request.metadata,
            };
        } catch (error) {
            console.error('BNPL payment creation error:', error);
            throw error;
        }
    }

    /**
     * Get Stripe payment status
     */
    private async getStripePaymentStatus(sessionId: string): Promise<UnifiedPaymentResponse> {
        try {
            const stripe = require('stripe')(this.stripeKey);
            const session = await stripe.checkout.sessions.retrieve(sessionId);

            return {
                paymentId: session.id,
                status: this.mapStripeStatus(session.payment_status),
                method: 'card',
                amount: session.amount_total / 100,
                currency: session.currency.toUpperCase(),
                metadata: session.metadata,
            };
        } catch (error) {
            console.error('Stripe status check error:', error);
            throw error;
        }
    }

    /**
     * Map payment method to Stripe payment method type
     */
    private mapStripePaymentMethod(method: PaymentMethod): string {
        const methodMap: Record<string, string> = {
            'card': 'card',
            'apple_pay': 'card',
            'google_pay': 'card',
            'alipay': 'alipay',
            'wechat_pay': 'wechat_pay',
            'ideal': 'ideal',
            'sepa': 'sepa_debit',
            'giropay': 'giropay',
            'sofort': 'sofort',
            'bancontact': 'bancontact',
            'eps': 'eps',
            'p24': 'p24',
            'boleto': 'boleto',
            'oxxo': 'oxxo',
            'konbini': 'konbini',
            'grabpay': 'grabpay',
            'paynow': 'paynow',
            'promptpay': 'promptpay',
            'fpx': 'fpx',
            'afterpay': 'afterpay_clearpay',
            'klarna': 'klarna',
            'affirm': 'affirm',
        };

        return methodMap[method] || 'card';
    }

    /**
     * Map Stripe payment status
     */
    private mapStripeStatus(status: string): UnifiedPaymentResponse['status'] {
        const statusMap: Record<string, UnifiedPaymentResponse['status']> = {
            'paid': 'completed',
            'unpaid': 'pending',
            'no_payment_required': 'completed',
        };

        return statusMap[status] || 'pending';
    }
}

/**
 * Initialize unified payment service
 */
export function initUnifiedPayments(): UnifiedPaymentService {
    return new UnifiedPaymentService();
}
