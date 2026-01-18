'use client';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function SequentialRecallGame({ onGameFinish }: { onGameFinish: (score: number) => void }) {
  const [sequence, setSequence] = useState<number[]>([]);
  const [userSequence, setUserSequence] = useState<number[]>([]);
  const [isShowing, setIsShowing] = useState(false);

  const startNewLevel = () => {
    const nextStep = Math.floor(Math.random() * 9);
    setSequence([...sequence, nextStep]);
    setUserSequence([]);
    setIsShowing(true);
  };

  const handleInput = (num: number) => {
    const newUserSeq = [...userSequence, num];
    setUserSequence(newUserSeq);

    if (num !== sequence[userSequence.length]) {
      onGameFinish(sequence.length - 1);
    } else if (newUserSeq.length === sequence.length) {
      setTimeout(startNewLevel, 1000);
    }
  };

  return (
    <div className="grid grid-cols-3 gap-4 p-8 bg-card rounded-xl shadow-futuristic">
      {[...Array(9)].map((_, i) => (
        <Button
          key={i}
          onClick={() => handleInput(i)}
          className="h-20 w-20 text-xl font-bold"
          variant={isShowing && sequence.includes(i) ? "default" : "outline"}
        >
          {i + 1}
        </Button>
      ))}
    </div>
  );
}