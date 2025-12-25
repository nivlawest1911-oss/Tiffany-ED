'use client';
import { motion } from 'framer-motion';

export default function MorphicNeuralMesh() {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-black">
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.3, 0.1] 
        }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute top-[-10%] left-[-10%] w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,_#3b82f6_0%,_transparent_70%)] blur-[120px]"
      />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 contrast-150" />
    </div>
  );
}
