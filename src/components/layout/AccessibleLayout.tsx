'use client';

import React, { useRef, useEffect } from 'react';
import ErrorBoundary from '../shared/ErrorBoundary';

interface LayoutProps {
  children: React.ReactNode;
}

/**
 * AccessibleLayout provides the main landmark and accessibility scrubbing.
 * It wraps children in a <main> element and scrubs invalid ARIA attributes
 * from third-party injected content (browser extensions, widgets, etc.)
 */
const AccessibleLayout: React.FC<LayoutProps> = ({ children }) => {
  const mainRef = useRef<HTMLElement>(null);

  // Global accessibility scrubber for third-party injected content
  useEffect(() => {
    const scrubInvalidAria = (root: Element) => {
      // Remove invalid aria-details (no matching ID references)
      root.querySelectorAll('[aria-details]').forEach((el) => {
        const detailsId = el.getAttribute('aria-details');
        if (detailsId && !document.getElementById(detailsId)) {
          el.removeAttribute('aria-details');
        }
      });

      // Fix aria-hide -> aria-hidden
      root.querySelectorAll('[aria-hide]').forEach((el) => {
        const val = el.getAttribute('aria-hide');
        el.removeAttribute('aria-hide');
        el.setAttribute('aria-hidden', val === 'true' ? 'true' : 'false');
      });

      // Add alt text to images missing it (from third-party content)
      root.querySelectorAll('img:not([alt])').forEach((img) => {
        img.setAttribute('alt', '');
        img.setAttribute('role', 'presentation');
      });

      // Fix aria-hidden on focusable elements
      root.querySelectorAll('[aria-hidden="true"]').forEach((el) => {
        const focusableSelectors = 'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])';
        const focusableChildren = el.querySelectorAll(focusableSelectors);
        if (focusableChildren.length > 0 || el.matches(focusableSelectors)) {
          // Make focusable elements inside aria-hidden unfocusable
          focusableChildren.forEach((child) => {
            if (child instanceof HTMLElement) {
              child.setAttribute('tabindex', '-1');
            }
          });
          if (el instanceof HTMLElement && el.matches(focusableSelectors)) {
            el.setAttribute('tabindex', '-1');
          }
        }
      });

      // Add labels to unlabeled form inputs (from third-party content)
      root.querySelectorAll('input:not([aria-label]):not([id])').forEach((input) => {
        if (!input.closest('label') && input instanceof HTMLInputElement) {
          const type = input.type || 'text';
          input.setAttribute('aria-label', `${type} input`);
        }
      });
    };

    // Observe document for third-party injected content
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof Element) {
            // Check if this is third-party content (has ait- classes or is outside our app)
            const isThirdParty = 
              node.className?.toString().includes('ait-') ||
              node.querySelector('[class*="ait-"]');
            
            if (isThirdParty) {
              scrubInvalidAria(node);
            }
          }
        });
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // Initial scrub
    scrubInvalidAria(document.body);

    return () => observer.disconnect();
  }, []);

  return (
    <main 
      ref={mainRef}
      id="main-content" 
      role="main"
      className="flex flex-col min-h-screen"
    >
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-[#FFB300] focus:text-black focus:px-4 focus:py-2 focus:rounded-lg focus:font-semibold"
      >
        Skip to main content
      </a>
      <ErrorBoundary>
        {children}
      </ErrorBoundary>
    </main>
  );
};

export default AccessibleLayout;
