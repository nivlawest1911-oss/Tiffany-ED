import React from 'react';

export default function AbilityAnimation({ type }: { type: string }) {
    return (
        <div className={`ability-animation ${type} w-full h-full relative overflow-hidden`}>
            {/* Subtle pulse effect as a placeholder for the animation */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-transparent to-indigo-500/10 animate-pulse" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.05)_0%,transparent_70%)] animate-slow-spin-slow" />
        </div>
    );
}
