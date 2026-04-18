'use client';

import React from 'react';
import ErrorBoundary from '../shared/ErrorBoundary';

interface LayoutProps {
  children: React.ReactNode;
}

const AccessibleLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* 1. Skip to Main Content - Crucial for Keyboard Accessibility (WCAG 2.4.1) */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-6 focus:py-3 focus:bg-[#FFB300] focus:text-black focus:font-black focus:rounded-xl focus:shadow-[0_0_30px_rgba(255,179,0,0.5)] transition-all"
      >
        Skip to Main Content
      </a>

      {/* 2. THE MAIN LANDMARK: One main landmark per page is high-fidelity best practice */}
      <main id="main-content" tabIndex={-1} className="flex-grow outline-none">
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </main>
    </div>
  );
};

export default AccessibleLayout;
