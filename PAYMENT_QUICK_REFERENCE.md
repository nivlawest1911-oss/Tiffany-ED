# 💳 Payment System Quick Reference

## 🚀 Quick Start

### 1. Add Payment to Your Page
```tsx
import UniversalPaymentHub from '@/components/UniversalPaymentHub';

<UniversalPaymentHub
  amount={99.00}
  description="Professional Subscription"
  userId="user_123"
  customerEmail="user@example.com"
  onSuccess={(id) => console.log('Paid:', id)}
/>
```

### 2. Environment Variables
```bash
STRIPE_SECRET_KEY=sk_live_xxx
CRYPTO_PAYMENT_API_KEY=xxx
CRYPTO_WEBHOOK_SECRET=xxx
```

### 3. Test Payment Flow
1. Visit `/payment`
2. Select payment method
3. Choose currency
4. Complete payment
5. Redirected to `/payment/success`

## 📍 Key Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/payments/create` | POST | Create payment |
| `/api/payments/status` | GET | Check status |
| `/api/payments/methods` | GET | List methods |
| `/api/webhooks/crypto-payment` | POST | Crypto webhook |

## 💰 Supported Payment Methods

### Traditional (via Stripe)
- 💳 Credit/Debit Cards
- 🍎 Apple Pay
- 🔵 Google Pay
- 🅿️ PayPal

### Cryptocurrency
- ₿ Bitcoin (BTC)
- Ξ Ethereum (ETH)
- 💵 USDC, USDT
- 🔶 BNB, SOL, ADA, DOT, MATIC, AVAX

### Regional
- 🇪🇺 iDEAL, SEPA, Giropay, Sofort
- 🇨🇳 Alipay, WeChat Pay
- 🇧🇷 Boleto
- 🇲🇽 OXXO
- 🇯🇵 Konbini

## 🔧 Common Tasks

### Create Crypto Payment
```typescript
const res = await fetch('/api/payments/create', {
  method: 'POST',
  body: JSON.stringify({
    amount: 99,
    currency: 'BTC',
    method: 'crypto',
    description: 'Subscription',
    userId: 'user_123',
    customerEmail: 'user@example.com',
  }),
});
const { qrCode, paymentAddress } = await res.json();
```

### Check Payment Status
```typescript
const res = await fetch(
  `/api/payments/status?paymentId=xxx&method=crypto`
);
const { status } = await res.json();
// status: 'pending' | 'processing' | 'completed' | 'failed'
```

### Get Available Methods
```typescript
const res = await fetch('/api/payments/methods');
const { methods } = await res.json();
// Returns array of PaymentMethodCapability
```

## 🎨 UI Components

### UniversalPaymentHub
Main payment selection and processing component.

**Props:**
- `amount: number` - Payment amount
- `description: string` - Payment description
- `userId: string` - User ID
- `customerEmail: string` - Customer email
- `onSuccess?: (paymentId: string) => void` - Success callback
- `onCancel?: () => void` - Cancel callback

## 🔐 Security Checklist

- ✅ SSL/TLS encryption (256-bit)
- ✅ Webhook signature verification
- ✅ PCI DSS compliant (Stripe)
- ✅ No sensitive data storage
- ✅ Blockchain verification (crypto)

## 📊 Payment Fees

| Method | Fee | Processing Time |
|--------|-----|----------------|
| Card | 2.9% + $0.30 | Instant |
| Crypto | 1.0% | 10-30 min |
| PayPal | 3.49% + $0.49 | Instant |
| Apple/Google Pay | 2.9% + $0.30 | Instant |
| iDEAL | 0.29% | Instant |
| SEPA | 0.8% | 3-5 days |

## 🌍 Currency Support

### Fiat Currencies
USD, EUR, GBP, CAD, AUD, JPY, CNY, and 100+ more

### Cryptocurrencies
BTC, ETH, USDC, USDT, BNB, SOL, ADA, DOT, MATIC, AVAX

## 🔄 Webhook Events

### Crypto Payment Events
- `waiting` - Payment created, awaiting funds
- `confirming` - Funds received, awaiting confirmations
- `confirmed` - Confirmations received
- `finished` - Payment complete ✅
- `failed` - Payment failed ❌
- `expired` - Payment expired ⏰
- `refunded` - Payment refunded 💸

## 🚨 Troubleshooting

### Payment Not Confirming
- Check blockchain explorer with transaction hash
- Verify sufficient confirmations (BTC: 3, ETH: 12)
- Wait 10-30 minutes for crypto payments

### Webhook Not Received
- Verify webhook URL is publicly accessible
- Check webhook secret matches
- Review server logs for errors

### Card Declined
- Verify card details are correct
- Check with bank for authorization
- Try alternative payment method

## 📱 Mobile Optimization

All payment flows are fully responsive:
- ✅ Touch-optimized buttons
- ✅ QR code scanning for crypto
- ✅ Apple Pay / Google Pay integration
- ✅ Mobile-friendly forms

## 🎯 Best Practices

1. **Always verify webhooks** - Use signature verification
2. **Handle all statuses** - pending, processing, completed, failed
3. **Show clear feedback** - Loading states, errors, success
4. **Test thoroughly** - Use testnet/sandbox before production
5. **Monitor payments** - Set up alerts for failures

## 📞 Support

- **Documentation**: `/PAYMENT_SYSTEM.md`
- **Email**: support@edintel.app
- **Stripe Dashboard**: https://dashboard.stripe.com
- **NOWPayments Dashboard**: https://nowpayments.io/dashboard

---

**Quick Links:**
- [Full Documentation](./PAYMENT_SYSTEM.md)
- [Stripe Docs](https://stripe.com/docs)
- [NOWPayments API](https://nowpayments.io/api-documentation)
