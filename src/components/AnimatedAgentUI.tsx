'use client';

import { useRive, useStateMachineInput, Layout, Fit, Alignment } from '@rive-app/react-canvas';
import { motion } from 'framer-motion';

export const AnimatedAgentUI = () => {
    const { rive, RiveComponent } = useRive({
        src: '/animations/edintel_agent.riv', // Path to your EdIntel Rive asset
        stateMachines: 'MainStateMachine',
        layout: new Layout({
            fit: Fit.Cover,
            alignment: Alignment.Center,
        }),
        autoplay: true,
    });

    // Example: Change animation state when user hovers
    const isHovered = useStateMachineInput(rive, 'MainStateMachine', 'isHovered');

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative w-full h-full bg-slate-900 overflow-hidden"
        >
            <div className="absolute inset-0 opacity-50">
                <RiveComponent
                    onMouseEnter={() => { if (isHovered) isHovered.value = true; }}
                    onMouseLeave={() => { if (isHovered) isHovered.value = false; }}
                    className="w-full h-full"
                />
            </div>

            {/* Content Overlay */}
            <div className="absolute inset-0 pointer-events-none z-10 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />

            <div className="relative z-20 p-8 h-full flex flex-col justify-end">
                <h3 className="text-white font-black uppercase text-2xl mb-2">Sovereign Agent</h3>
                <p className="text-zinc-400 text-sm">Interactive State Machine • Online</p>
            </div>
        </motion.div>
    );
};

export default AnimatedAgentUI;
