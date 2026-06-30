'use client';

import { useState } from 'react';

export function useExitDemo() {
  const [isExiting, setIsExiting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const requestExit = () => {
    setShowConfirm(true);
  };

  const confirmExit = () => {
    setShowConfirm(false);
    setIsExiting(true);

    // Clean up all demo state
    sessionStorage.removeItem('demoMode');
    
    // Optional: clear any other demo-related storage
    // localStorage.removeItem('demoState');

    // Smooth exit with small delay for UX
    setTimeout(() => {
      window.location.replace('/login');
    }, 400);
  };

  const cancelExit = () => {
    setShowConfirm(false);
  };

  return {
    isExiting,
    showConfirm,
    requestExit,
    confirmExit,
    cancelExit,
  };
}
