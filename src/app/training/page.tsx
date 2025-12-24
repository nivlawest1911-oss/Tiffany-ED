'use client';
import { useState, useEffect } from 'react';
import { Music, Zap, Star } from 'lucide-react';

export default function NeuralBeatGame() {
  const [score, setScore] = useState(0);
  const [activeWord, setActiveWord] = useState("Sovereignty");
  const [feedback, setFeedback] = useState("");

  const handleBeatInput = (syllables: number) => {
    if (syllables === 4) { // 'Sov-er-eign-ty'
      setScore(score + 100);
      setFeedback("PERFECT SYNC! +100 Cognitive Points");
      setTimeout(() => setFeedback(""), 2000);
    } else {
      setFeedback("Out of sync. Try the rhythm again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-10 bg-[#0a0a0a] rounded-3xl border border-blue-500/30 shadow-[0_0_50px_rgba(59,130,246,0.1)]">
      <div className="flex items-center gap-4 mb-8">
        <Star className="text-yellow-500 animate-pulse" />
        <h2 className="text-4xl font-black tracking-tighter italic">LITERACY BEATS</h2>
        <span className="bg-blue-600 px-3 py-1 rounded text-xs font-mono">LEVEL 1</span>
      </div>

      <div className="text-6xl font-bold mb-10 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
        {activeWord}
      </div>

      <div className="grid grid-cols-4 gap-4 w-full max-w-md">
        {[1, 2, 3, 4].map((num) => (
          <button 
            key={num}
            onClick={() => handleBeatInput(num)}
            className="h-20 bg-[#111] border border-[#222] rounded-xl hover:bg-blue-600 hover:scale-105 transition active:scale-95 flex flex-col items-center justify-center"
          >
            <Music size={20} className="mb-1" />
            <span className="text-xs font-bold">{num} Beat{num > 1 ? 's' : ''}</span>
          </button>
        ))}
      </div>

      <div className="mt-10 h-10 text-blue-400 font-mono text-sm uppercase tracking-widest">
        {feedback}
      </div>

      <div className="mt-6 p-4 bg-white/5 rounded-full px-10 border border-white/10">
        SCORE: <span className="text-blue-500 font-bold">{score}</span>
      </div>
    </div>
  );
}
