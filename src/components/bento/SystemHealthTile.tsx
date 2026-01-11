'use client';
import { useEffect, useState } from 'react';
import { ShieldCheck, AlertTriangle, CreditCard, Brain } from 'lucide-react';

export default function SystemHealthTile() {
    const [status, setStatus] = useState<any>(null);

    useEffect(() => {
        fetch('/api/status')
            .then(res => res.json())
            .then(data => setStatus(data))
            .catch(err => console.error(err));
    }, []);

    if (!status) return (
        <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 h-full flex items-center justify-center">
            <div className="animate-spin w-6 h-6 border-2 border-zinc-300 border-t-zinc-600 rounded-full" />
        </div>
    );

    const stripeOK = status.stripe.secretKey;
    const aiOK = status.ai.googleKey;
    const allOK = stripeOK && aiOK;

    return (
        <div className={`p-6 rounded-3xl border h-full flex flex-col justify-between ${allOK
                ? 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800'
                : 'bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-900/30'
            }`}>
            <div className="flex justify-between items-start mb-4">
                <div className={`p-2 rounded-lg ${allOK ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'}`}>
                    {allOK ? <ShieldCheck size={24} /> : <AlertTriangle size={24} />}
                </div>
                <span className="text-xs font-mono text-zinc-400">{allOK ? 'SYSTEM ONLINE' : 'ATTENTION REQUIRED'}</span>
            </div>

            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Brain size={16} className={aiOK ? "text-emerald-500" : "text-red-500"} />
                        <span className="text-sm font-medium text-zinc-600 dark:text-zinc-300">Neural Engine</span>
                    </div>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded ${aiOK ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                        {aiOK ? 'CONNECTED' : 'MISSING KEY'}
                    </span>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <CreditCard size={16} className={stripeOK ? "text-emerald-500" : "text-red-500"} />
                        <span className="text-sm font-medium text-zinc-600 dark:text-zinc-300">Stripe Uplink</span>
                    </div>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded ${stripeOK ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                        {stripeOK ? 'CONNECTED' : 'MISSING KEY'}
                    </span>
                </div>
            </div>

            {!allOK && (
                <div className="mt-4 p-3 bg-red-100 dark:bg-red-900/20 rounded-xl text-[10px] text-red-600 dark:text-red-300 leading-tight">
                    <strong>ACTION REQUIRED:</strong> Add GOOGLE_GENAI_API_KEY and STRIPE_SECRET_KEY to your Vercel Environment Variables.
                </div>
            )}
        </div>
    );
}
