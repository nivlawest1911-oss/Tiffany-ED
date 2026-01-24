'use client';
import { useRef } from 'react';

interface TileProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick?: () => void;
}

export function BentoTile({ title, description, icon, onClick }: TileProps) {
  const prefetchTimer = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    // Extreme User Friendliness: Speculative Prefetch
    // If the user hovers for more than 100ms, start warming up the AI route
    prefetchTimer.current = setTimeout(() => {
      console.log('Speculatively warming up AI for:', title);
      fetch('/api/aide', { method: 'OPTIONS' }).catch(() => {});
    }, 100);
  };

  const handleMouseLeave = () => {
    if (prefetchTimer.current) clearTimeout(prefetchTimer.current);
  };

  return (
    <div 
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className="group p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl transition-all hover:scale-[1.02] hover:shadow-xl cursor-pointer active:scale-95 relative overflow-hidden"
    >
      <div className="mb-4 text-blue-600 dark:text-blue-400">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">{description}</p>
      
      {/* Visual cue for modernization: subtle glow on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
}
