'use client';

import { useEffect, RefObject } from 'react';

/**
 * Hook to scrub invalid ARIA attributes (aria-details, aria-hide) from dynamically 
 * injected DOM nodes, typically from AI streaming components.
 * 
 * @param containerRef React ref pointing to the container of the dynamic content
 */
export function useAccessibilityScrubber(containerRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (!containerRef.current) return;

    const scrubber = (node: HTMLElement) => {
      // 1. aria-details is often invalid when injected by LLMs without matching IDs
      if (node.hasAttribute('aria-details')) {
        node.removeAttribute('aria-details');
      }

      // 2. aria-hide is non-standard; should be aria-hidden
      if (node.hasAttribute('aria-hide')) {
        const val = node.getAttribute('aria-hide');
        node.removeAttribute('aria-hide');
        node.setAttribute('aria-hidden', val === 'true' ? 'true' : 'false');
      }

      // Recursively scrub children
      node.querySelectorAll('*').forEach((child) => {
        if (child instanceof HTMLElement) {
          if (child.hasAttribute('aria-details')) {
            child.removeAttribute('aria-details');
          }
          if (child.hasAttribute('aria-hide')) {
            const val = child.getAttribute('aria-hide');
            child.removeAttribute('aria-hide');
            child.setAttribute('aria-hidden', val === 'true' ? 'true' : 'false');
          }
        }
      });
    };

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof HTMLElement) {
            scrubber(node);
          }
        });
      });
    });

    observer.observe(containerRef.current, {
      childList: true,
      subtree: true,
    });

    // Initial scrub for already rendered content
    scrubber(containerRef.current);

    return () => observer.disconnect();
  }, [containerRef]);
}
