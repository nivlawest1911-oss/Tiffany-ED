/**
 * EdIntel SOVEREIGN - Cryptocurrency Payment Integration
 * Supports Bitcoin, Ethereum, USDC, and other major cryptocurrencies
 */

export interface CryptoPaymentConfig {
    network: 'mainnet' | 'testnet';
    supportedCurrencies: CryptoCurrency[];
    webhookUrl?: string;
}

export type CryptoCurrency =
    | 'BTC'  // Bitcoin
    | 'ETH'  // Ethereum
    | 'USDC' // USD Coin
    | 'USDT' // Tether
    | 'BNB'  // Binance Coin
    | 'SOL'  // Solana
    | 'ADA'  // Cardano
    | 'DOT'  // Polkadot
    | 'MATIC' // Polygon
    | 'AVAX'; // Avalanche

export interface CryptoPaymentRequest {
    amount: number;
    currency: CryptoCurrency;
    description: string;
    userId: string;
    metadata?: Record<string, any>;
}

export interface CryptoPaymentResponse {
    paymentId: string;
    address: string;
    amount: string;
    currency: CryptoCurrency;
    qrCode: string;
    expiresAt: Date;
    status: 'pending' | 'confirming' | 'completed' | 'expired' | 'failed';
    confirmations: number;
    requiredConfirmations: number;
    transactionHash?: string;
}

export interface CryptoWalletBalance {
    currency: CryptoCurrency;
    balance: string;
    usdValue: number;
    lastUpdated: Date;
}

/**
 * Cryptocurrency Payment Service
 * Integrates with multiple blockchain networks for payment processing
 */
export class CryptoPaymentService {
    private config: CryptoPaymentConfig;
    private apiKey: string;

    constructor(config: CryptoPaymentConfig) {
        this.config = config;
        this.apiKey = process.env.CRYPTO_PAYMENT_API_KEY || '';
    }

    /**
     * Create a new cryptocurrency payment request
     */
    async createPayment(request: CryptoPaymentRequest): Promise<CryptoPaymentResponse> {
        try {
            // In production, integrate with services like:
            // - Coinbase Commerce
            // - BitPay
            // - NOWPayments
            // - CoinGate

            const response = await fetch('https://api.nowpayments.io/v1/payment', {
                method: 'POST',
                headers: {
                    'x-api-key': this.apiKey,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    price_amount: request.amount,
                    price_currency: 'usd',
                    pay_currency: request.currency.toLowerCase(),
                    // Encode userId and context into order_id for webhook recovery
                    // Format: EDINTEL:{userId}:{timestamp}
                    order_id: `EDINTEL:${request.userId}:${Date.now()}`,
                    order_description: request.description,
                    ipn_callback_url: this.config.webhookUrl,
                    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment/success`,
                    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment/cancel`,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to create crypto payment');
            }

            const data = await response.json();

            return {
                paymentId: data.payment_id,
                address: data.pay_address,
                amount: data.pay_amount,
                currency: request.currency,
                qrCode: this.generateQRCode(data.pay_address, data.pay_amount, request.currency),
                expiresAt: new Date(Date.now() + 30 * 60 * 1000), // 30 minutes
                status: 'pending',
                confirmations: 0,
                requiredConfirmations: this.getRequiredConfirmations(request.currency),
            };
        } catch (error) {
            console.error('Crypto payment creation error:', error);
            throw error;
        }
    }

    /**
     * Check payment status
     */
    async getPaymentStatus(paymentId: string): Promise<CryptoPaymentResponse> {
        try {
            const response = await fetch(`https://api.nowpayments.io/v1/payment/${paymentId}`, {
                headers: {
                    'x-api-key': this.apiKey,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch payment status');
            }

            const data = await response.json();

            return {
                paymentId: data.payment_id,
                address: data.pay_address,
                amount: data.pay_amount,
                currency: data.pay_currency.toUpperCase() as CryptoCurrency,
                qrCode: this.generateQRCode(data.pay_address, data.pay_amount, data.pay_currency),
                expiresAt: new Date(data.expiration_estimate_date),
                status: this.mapPaymentStatus(data.payment_status),
                confirmations: data.confirmations || 0,
                requiredConfirmations: this.getRequiredConfirmations(data.pay_currency.toUpperCase()),
                transactionHash: data.outcome?.hash,
            };
        } catch (error) {
            console.error('Payment status check error:', error);
            throw error;
        }
    }

    /**
     * Get current cryptocurrency exchange rates
     */
    async getExchangeRates(): Promise<Record<CryptoCurrency, number>> {
        try {
            const response = await fetch('https://api.nowpayments.io/v1/currencies', {
                headers: {
                    'x-api-key': this.apiKey,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch exchange rates');
            }

            const data = await response.json();
            const rates: Record<string, number> = {};

            for (const currency of this.config.supportedCurrencies) {
                const currencyData = data.currencies.find(
                    (c: any) => c.code.toLowerCase() === currency.toLowerCase()
                );
                if (currencyData) {
                    rates[currency] = currencyData.rate;
                }
            }

            return rates as Record<CryptoCurrency, number>;
        } catch (error) {
            console.error('Exchange rate fetch error:', error);
            throw error;
        }
    }

    /**
     * Get wallet balance for a specific cryptocurrency
     */
    async getWalletBalance(currency: CryptoCurrency): Promise<CryptoWalletBalance> {
        try {
            // This would integrate with wallet APIs or blockchain explorers
            const balance = await this.fetchBlockchainBalance(currency);
            const rates = await this.getExchangeRates();

            return {
                currency,
                balance: balance.toString(),
                usdValue: balance * (rates[currency] || 0),
                lastUpdated: new Date(),
            };
        } catch (error) {
            console.error('Wallet balance fetch error:', error);
            throw error;
        }
    }

    /**
     * Estimate transaction fees
     */
    async estimateFees(currency: CryptoCurrency, amount: number): Promise<{
        networkFee: number;
        serviceFee: number;
        totalFee: number;
    }> {
        try {
            const response = await fetch(`https://api.nowpayments.io/v1/estimate?amount=${amount}&currency_from=usd&currency_to=${currency.toLowerCase()}`, {
                headers: {
                    'x-api-key': this.apiKey,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to estimate fees');
            }

            const data = await response.json();

            return {
                networkFee: parseFloat(data.network_fee || '0'),
                serviceFee: parseFloat(data.service_fee || '0'),
                totalFee: parseFloat(data.network_fee || '0') + parseFloat(data.service_fee || '0'),
            };
        } catch (error) {
            console.error('Fee estimation error:', error);
            throw error;
        }
    }

    /**
     * Generate QR code for payment address
     */
    private generateQRCode(address: string, amount: string, currency: CryptoCurrency): string {
        // Generate payment URI
        const paymentUri = this.generatePaymentURI(address, amount, currency);

        // In production, use a QR code generation service
        return `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(paymentUri)}`;
    }

    /**
     * Generate payment URI for cryptocurrency
     */
    private generatePaymentURI(address: string, amount: string, currency: CryptoCurrency): string {
        const uriSchemes: Record<string, string> = {
            BTC: 'bitcoin',
            ETH: 'ethereum',
            USDC: 'ethereum',
            USDT: 'ethereum',
            BNB: 'binance',
            SOL: 'solana',
            ADA: 'cardano',
            DOT: 'polkadot',
            MATIC: 'polygon',
            AVAX: 'avalanche',
        };

        const scheme = uriSchemes[currency] || currency.toLowerCase();
        return `${scheme}:${address}?amount=${amount}`;
    }

    /**
     * Get required confirmations for a cryptocurrency
     */
    private getRequiredConfirmations(currency: CryptoCurrency): number {
        const confirmations: Record<CryptoCurrency, number> = {
            BTC: 3,
            ETH: 12,
            USDC: 12,
            USDT: 12,
            BNB: 15,
            SOL: 32,
            ADA: 15,
            DOT: 10,
            MATIC: 128,
            AVAX: 20,
        };

        return confirmations[currency] || 10;
    }

    /**
     * Map payment status from provider
     */
    private mapPaymentStatus(status: string): CryptoPaymentResponse['status'] {
        const statusMap: Record<string, CryptoPaymentResponse['status']> = {
            'waiting': 'pending',
            'confirming': 'confirming',
            'confirmed': 'completed',
            'finished': 'completed',
            'expired': 'expired',
            'failed': 'failed',
            'refunded': 'failed',
        };

        return statusMap[status] || 'pending';
    }

    /**
     * Fetch blockchain balance (placeholder - implement with actual blockchain APIs)
     */
    private async fetchBlockchainBalance(currency: CryptoCurrency): Promise<number> {
        // This would integrate with blockchain explorers or node APIs
        // For now, return 0 as placeholder
        return 0;
    }

    /**
     * Verify webhook signature for security
     */
    verifyWebhookSignature(payload: string, signature: string): boolean {
        // Implement HMAC verification for webhook security
        const crypto = require('crypto');
        const secret = process.env.CRYPTO_WEBHOOK_SECRET || '';
        const expectedSignature = crypto
            .createHmac('sha256', secret)
            .update(payload)
            .digest('hex');

        return signature === expectedSignature;
    }
}

/**
 * Initialize crypto payment service
 */
export function initCryptoPayments(): CryptoPaymentService {
    const config: CryptoPaymentConfig = {
        network: process.env.NODE_ENV === 'production' ? 'mainnet' : 'testnet',
        supportedCurrencies: ['BTC', 'ETH', 'USDC', 'USDT', 'BNB', 'SOL', 'ADA', 'DOT', 'MATIC', 'AVAX'],
        webhookUrl: `${process.env.NEXT_PUBLIC_APP_URL}/api/webhooks/crypto-payment`,
    };

    return new CryptoPaymentService(config);
}
