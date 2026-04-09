'use client';

import { useEffect, RefObject } from 'react';

// List of valid ARIA attributes for validation
const VALID_ARIA_ATTRIBUTES = new Set([
  'aria-activedescendant', 'aria-atomic', 'aria-autocomplete', 'aria-braillelabel',
  'aria-brailleroledescription', 'aria-busy', 'aria-checked', 'aria-colcount',
  'aria-colindex', 'aria-colindextext', 'aria-colspan', 'aria-controls',
  'aria-current', 'aria-describedby', 'aria-description', 'aria-details',
  'aria-disabled', 'aria-dropeffect', 'aria-errormessage', 'aria-expanded',
  'aria-flowto', 'aria-grabbed', 'aria-haspopup', 'aria-hidden', 'aria-invalid',
  'aria-keyshortcuts', 'aria-label', 'aria-labelledby', 'aria-level', 'aria-live',
  'aria-modal', 'aria-multiline', 'aria-multiselectable', 'aria-orientation',
  'aria-owns', 'aria-placeholder', 'aria-posinset', 'aria-pressed', 'aria-readonly',
  'aria-relevant', 'aria-required', 'aria-roledescription', 'aria-rowcount',
  'aria-rowindex', 'aria-rowindextext', 'aria-rowspan', 'aria-selected',
  'aria-setsize', 'aria-sort', 'aria-valuemax', 'aria-valuemin', 'aria-valuenow',
  'aria-valuetext'
]);

/**
 * Comprehensive accessibility scrubber hook for cleaning up invalid ARIA attributes
 * from dynamically injected DOM nodes (AI streaming, browser extensions, third-party widgets).
 * 
 * Features:
 * - Removes invalid/non-standard ARIA attributes
 * - Fixes aria-hide -> aria-hidden
 * - Validates aria-details references
 * - Adds missing alt text to images
 * - Ensures aria-hidden elements don't contain focusable content
 * - Labels unlabeled form inputs
 * 
 * @param containerRef React ref pointing to the container of the dynamic content
 * @param options Configuration options for the scrubber
 */
export function useAccessibilityScrubber(
  containerRef: RefObject<HTMLElement | null>,
  options: {
    /** Scrub entire document body instead of just containerRef */
    global?: boolean;
    /** Enable verbose logging for debugging */
    debug?: boolean;
  } = {}
) {
  const { global = false, debug = false } = options;

  useEffect(() => {
    const target = global ? document.body : containerRef.current;
    if (!target) return;

    const log = debug ? console.log.bind(console, '[AccessibilityScrubber]') : () => {};

    const scrubElement = (el: Element) => {
      if (!(el instanceof HTMLElement)) return;

      // 1. Remove invalid ARIA attributes (non-standard ones like aria-hide)
      Array.from(el.attributes).forEach((attr) => {
        if (attr.name.startsWith('aria-') && !VALID_ARIA_ATTRIBUTES.has(attr.name)) {
          // Special case: aria-hide should become aria-hidden
          if (attr.name === 'aria-hide') {
            const val = attr.value;
            el.removeAttribute('aria-hide');
            el.setAttribute('aria-hidden', val === 'true' ? 'true' : 'false');
            log(`Fixed aria-hide -> aria-hidden on`, el);
          } else {
            el.removeAttribute(attr.name);
            log(`Removed invalid attribute ${attr.name} from`, el);
          }
        }
      });

      // 2. Validate aria-details references exist
      if (el.hasAttribute('aria-details')) {
        const detailsId = el.getAttribute('aria-details');
        if (detailsId && !document.getElementById(detailsId)) {
          el.removeAttribute('aria-details');
          log(`Removed invalid aria-details reference "${detailsId}" from`, el);
        }
      }

      // 3. Validate aria-describedby and aria-labelledby references
      ['aria-describedby', 'aria-labelledby', 'aria-controls', 'aria-owns'].forEach((attr) => {
        if (el.hasAttribute(attr)) {
          const ids = el.getAttribute(attr)?.split(/\s+/) || [];
          const validIds = ids.filter((id) => document.getElementById(id));
          if (validIds.length === 0) {
            el.removeAttribute(attr);
            log(`Removed ${attr} with no valid references from`, el);
          } else if (validIds.length !== ids.length) {
            el.setAttribute(attr, validIds.join(' '));
            log(`Cleaned invalid IDs from ${attr} on`, el);
          }
        }
      });

      // 4. Fix aria-hidden on focusable elements
      if (el.getAttribute('aria-hidden') === 'true') {
        const focusableSelectors = 'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])';
        const focusableChildren = el.querySelectorAll(focusableSelectors);
        
        focusableChildren.forEach((child) => {
          if (child instanceof HTMLElement && child.getAttribute('tabindex') !== '-1') {
            child.setAttribute('tabindex', '-1');
            log(`Made focusable element unfocusable inside aria-hidden`, child);
          }
        });

        if (el.matches(focusableSelectors) && el.getAttribute('tabindex') !== '-1') {
          el.setAttribute('tabindex', '-1');
          log(`Made aria-hidden element unfocusable`, el);
        }
      }

      // 5. Add alt text to images without it (from third-party content)
      if (el.tagName === 'IMG' && !el.hasAttribute('alt')) {
        el.setAttribute('alt', '');
        el.setAttribute('role', 'presentation');
        log(`Added empty alt and presentation role to image`, el);
      }

      // 6. Add labels to unlabeled form inputs
      if (
        (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.tagName === 'SELECT') &&
        !el.hasAttribute('aria-label') &&
        !el.hasAttribute('aria-labelledby') &&
        !el.id
      ) {
        const closestLabel = el.closest('label');
        if (!closestLabel) {
          const type = el.getAttribute('type') || el.tagName.toLowerCase();
          el.setAttribute('aria-label', `${type} field`);
          log(`Added aria-label to unlabeled ${type} input`, el);
        }
      }
    };

    const scrubTree = (root: Element) => {
      scrubElement(root);
      root.querySelectorAll('*').forEach(scrubElement);
    };

    // Observe for dynamically added content
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof Element) {
            // Check if this looks like third-party content
            const isThirdParty =
              node.className?.toString().includes('ait-') ||
              node.querySelector?.('[class*="ait-"]') ||
              !target.contains(node.parentElement);

            if (isThirdParty || global) {
              scrubTree(node);
            }
          }
        });
      });
    });

    observer.observe(target, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: Array.from(VALID_ARIA_ATTRIBUTES).concat(['aria-hide']),
    });

    // Initial scrub
    scrubTree(target);

    return () => observer.disconnect();
  }, [containerRef, global, debug]);
}

/**
 * Global accessibility scrubber that runs on the entire document.
 * Use this in your root layout to catch all third-party widget injections.
 */
export function useGlobalAccessibilityScrubber(options: { debug?: boolean } = {}) {
  const dummyRef = { current: document.body } as RefObject<HTMLElement>;
  useAccessibilityScrubber(dummyRef, { global: true, ...options });
}
