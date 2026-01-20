'use client';
import { motion } from 'framer-motion';
import { ReactCenter } from 'react';

// Standard "Professional" fade-in-up animation
export const FadeIn = ({ children, delay = 0, className = "" }: { children: ReactCenter, delay?: number, className?: string }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }} // smooth ease-out-quart
        className={className}
    >
        {children}
    </motion.div>
);

// Staggered container for lists/grids
export const StaggerContainer = ({ children, className = "" }: { children: ReactCenter, className?: string }) => (
    <motion.div
        initial="hidden"
        animate="show"
        variants={{
            hidden: { opacity: 0 },
            show: {
                opacity: 1,
                transition: {
                    staggerChildren: 0.1
                }
            }
        }}
        className={className}
    >
        {children}
    </motion.div>
);

// Scale in for cards/badges
export const ScaleIn = ({ children, delay = 0 }: { children: ReactCenter, delay?: number }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay, ease: "backOut" }}
    >
        {children}
    </motion.div>
);
