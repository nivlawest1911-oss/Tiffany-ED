// src/app/cognitive/page.tsx
"use client";

import React, { useState } from 'react';
import { saveCognitiveScore } from '../../firebase/non-blocking-updates';
import { auth } from '../../firebase/index';

export default function CognitivePage() {
  const [activeModule, setActiveModule] = useState<'recall' | 'pattern' | null>(null);
  
  const handleScore = (moduleName: string, score: number) => {
    const user = auth.currentUser;
    saveCognitiveScore(moduleName, score, user ? user.uid : null);
    alert(`Score saved: ${score}`);
  };

  return (
    <div>
      <h2>Cognitive Modules</h2>
      <div className="module-buttons">
        <button onClick={() => setActiveModule('recall')}>Sequential Recall</button>
        <button onClick={() => setActiveModule('pattern')}>Pattern Match</button>
      </div>

      {activeModule === 'recall' && (
        <div className="module-container">
            <h3>Sequential Recall</h3>
            <p>Test your short-term memory.</p>
            <button onClick={() => handleScore('Sequential Recall', Math.floor(Math.random() * 100))}>
                Simulate Complete (Random Score)
            </button>
        </div>
      )}

      {activeModule === 'pattern' && (
        <div className="module-container">
            <h3>Pattern Match</h3>
            <p>Identify patterns in the grid.</p>
            <button onClick={() => handleScore('Pattern Match', Math.floor(Math.random() * 100))}>
                Simulate Complete (Random Score)
            </button>
        </div>
      )}
    </div>
  );
}
