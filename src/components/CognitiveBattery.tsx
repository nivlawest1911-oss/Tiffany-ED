import React from 'react';

interface CognitiveBatteryProps {
    loadScore: number; // 0-100, where 100 is max load (fatigue)
}

export const CognitiveBattery: React.FC<CognitiveBatteryProps> = ({ loadScore }) => {
    // loadScore is derived from BCI focus data and interaction speed
    const getStatusColor = (score: number) => {
        if (score > 80) return 'bg-red-500'; // Critical Fatigue
        if (score > 50) return 'bg-yellow-500'; // Approaching Fatigue
        return 'bg-green-500'; // Optimal
    };

    return (
        <div className="p-4 bg-slate-800 rounded-lg border border-slate-700 mb-4 transition-all">
            <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold uppercase text-slate-400">Cognitive Battery</span>
                <span className="text-xs text-slate-300">{Math.max(0, 100 - loadScore)}% Remaining</span>
            </div>
            <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                <div
                    className={`h-full transition-all duration-500 ${getStatusColor(loadScore)}`}
                    style={{ width: `${Math.max(0, 100 - loadScore)}%` }}
                />
            </div>
            {loadScore > 75 && (
                <p className="text-[10px] text-red-400 mt-2 animate-pulse font-bold">
                    ⚠️ Decision Fatigue Detected: Switching to Binary Mode.
                </p>
            )}
        </div>
    );
};
