'use client';
import { useState } from 'react';

export default function AnticipatoryTile({ title, children, onPreWarm }) {
  const [isWarming, setIsWarming] = useState(false);

  const handleHover = () => {
    if (!isWarming) {
      setIsWarming(true);
      console.log(`[AI Orchestrator] Pre-warming ${title} context...`);
      onPreWarm?.(); // Triggers background data fetch
    }
  };

  return (
    <div onMouseEnter={handleHover} className="glass-card" style={{
      position: 'relative',
      overflow: 'hidden',
      transition: 'transform 0.3s ease'
    }}>
      {isWarming && (
        <div style={{
          position: 'absolute', top: 0, left: 0, height: '2px', width: '100%',
          background: 'linear-gradient(90deg, transparent, #0070f3, transparent)',
          animation: 'scan 2s infinite'
        }} />
      )}
      {children}
      <style jsx>{`
        @keyframes scan { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
      `}</style>
    </div>
  );
}
