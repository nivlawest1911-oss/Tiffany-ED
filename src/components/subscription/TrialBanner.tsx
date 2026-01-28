import React from 'react';
import { CreditCard, Zap, AlertCircle } from 'lucide-react';

interface TrialBannerProps {
    daysRemaining: number;
    tokenCount: number;
    onPurchase: () => void;
}

export const TrialBanner = ({ daysRemaining, tokenCount, onPurchase }: TrialBannerProps) => {
    const isLowTokens = tokenCount < 10;

    return (
        <div className="p-4 mb-6 rounded-xl border border-blue-500/30 bg-gradient-to-r from-blue-900/20 to-indigo-900/20 backdrop-blur-md">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500/20 rounded-lg">
                        <Zap className="text-blue-400 w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-white font-semibold">
                            {daysRemaining} Days Left in School Site Pilot
                        </h3>
                        <p className="text-blue-200 text-sm">
                            Current Balance: <span className={isLowTokens ? "text-orange-400 font-bold" : "text-blue-400"}>
                                {tokenCount} AI Tokens
                            </span>
                        </p>
                    </div>
                </div>

                <button
                    onClick={onPurchase}
                    className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-all shadow-lg shadow-blue-900/20"
                >
                    <CreditCard size={18} />
                    Purchase Usage Tokens
                </button>
            </div>

            {isLowTokens && (
                <div className="mt-3 flex items-center gap-2 text-orange-300 text-xs">
                    <AlertCircle size={14} />
                    <span>Low token balance! Your AI features may pause if tokens run out.</span>
                </div>
            )}
        </div>
    );
};
