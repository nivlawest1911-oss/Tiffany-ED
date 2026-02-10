import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Sparkles } from 'lucide-react';
import { useEdIntelVibe } from '@/context/EdIntelVibeContext';

interface EdIntelBentoProps {
    className?: string;
    children: React.ReactNode;
}

export const EdIntelBentoGrid = ({ className, children }: EdIntelBentoProps) => {
    return (
        <div
            className={cn(
                "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto",
                className
            )}
        >
            {children}
        </div>
    );
};

interface EdIntelBentoItemProps {
    className?: string;
    title?: string | React.ReactNode;
    description?: string | React.ReactNode;
    header?: React.ReactNode;
    icon?: React.ReactNode;
    onClick?: () => void;
}

export const EdIntelBentoItem = ({
    className,
    title,
    description,
    header,
    icon,
    onClick
}: EdIntelBentoItemProps) => {
    const { isSystemThinking } = useEdIntelVibe();

    return (
        <motion.div
            whileHover={{ scale: 0.98 }}
            animate={!isSystemThinking ? {
                y: [0, -4, 0],
                transition: {
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                }
            } : {}}
            onClick={onClick}
            className={cn(
                "row-span-1 rounded-3xl group/bento transition-all duration-500 border border-white/5 bg-zinc-950/50 backdrop-blur-xl flex flex-col justify-between space-y-4 p-8 cursor-pointer relative overflow-hidden",
                isSystemThinking && "border-noble-gold/30 shadow-[0_0_20px_rgba(197,164,126,0.15)]",
                "hover:shadow-noble-gold/10 hover:border-noble-gold/20",
                className
            )}
        >
            {/* Obsidian Glass Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent z-0 pointer-events-none" />

            {/* Thinking Pulse Overlay */}
            {isSystemThinking && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0.05, 0.15, 0.05] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 bg-noble-gold pointer-events-none z-0"
                />
            )}

            {/* Beam Effect on Hover */}
            <div className="absolute inset-0 bg-noble-gold/5 opacity-0 group-hover/bento:opacity-100 transition-opacity duration-700 pointer-events-none z-0 mix-blend-overlay" />

            <div className="relative z-10">
                {header}
            </div>

            <div className="group-hover/bento:translate-x-2 transition duration-300 relative z-10">
                <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center mb-4 transition-all duration-500",
                    isSystemThinking ? "bg-noble-gold/20 text-noble-gold scale-110 shadow-[0_0_15px_rgba(197,164,126,0.4)]" : "bg-noble-gold/10 text-noble-gold shadow-none",
                    "border border-noble-gold/20"
                )}>
                    {icon || <Sparkles size={16} />}
                </div>
                <div className="font-black text-white mb-2 mt-2 uppercase tracking-wide">
                    {title}
                </div>
                <div className="font-sans font-normal text-zinc-500 text-xs">
                    {description}
                </div>
            </div>

            {/* Corner Accent */}
            <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-noble-gold/10 to-transparent opacity-50" />
        </motion.div>
    );
};
