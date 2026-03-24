'use client';

import React from 'react';
import ErrorBoundary from '../shared/ErrorBoundary';

interface LayoutProps {
  children: React.ReactNode;
}

const AccessibleLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* 1. Accessible Header */}
      <header role="banner" className="p-4 border-b border-zinc-800">
        <nav aria-label="Main Navigation">
          <h1 className="text-xl font-bold">EdIntel</h1>
        </nav>
      </header>

      {/* 2. THE MAIN LANDMARK: This fixes your "One main landmark" error */}
      <main id="main-content" className="flex-grow p-6">
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </main>

      {/* 3. Accessible Footer */}
      <footer role="contentinfo" className="p-4 border-t border-zinc-800 text-sm text-zinc-500">
        <p>&copy; 2026 EdIntel - All Institutional States Preserved.</p>
      </footer>
    </div>
  );
};

export default AccessibleLayout;
