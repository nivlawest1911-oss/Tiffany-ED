'use client';

import { useState, useEffect, useCallback } from 'react';

export function useExitDemo() {
  const [isExiting, setIsExiting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const requestExit = useCallback(() => {
    setShowConfirm(true);
  }, []);

  const confirmExit = () => {
    setShowConfirm(false);
    setIsExiting(true);

    // Clean up demo state
    sessionStorage.removeItem('demoMode');

    setTimeout(() => {
      window.location.replace('/login');
    }, 400);
  };

  const cancelExit = useCallback(() => {
    setShowConfirm(false);
  }, []);

  // Keyboard shortcut: Esc key behavior
  // - If dialog is closed → open confirmation
  // - If dialog is open → close/cancel it
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (showConfirm) {
          cancelExit();                    // Close dialog if open
        } else if (!isExiting) {
          requestExit();                   // Open dialog if closed
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showConfirm, isExiting, requestExit, cancelExit]);

  return {
    isExiting,
    showConfirm,
    requestExit,
    confirmExit,
    cancelExit,
  };
}
