import React from 'react';
import { MorningSynthesisCard, CognitiveLoadCard, StudioActionCard } from './PrincipalTacticalHUD';

export function LiveOperations() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <MorningSynthesisCard />
            <div className="hidden lg:block">
                <CognitiveLoadCard />
            </div>
            <StudioActionCard />
        </div>
    );
}
