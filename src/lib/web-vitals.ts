/**
 * Web Vitals monitoring and reporting
 * Tracks Core Web Vitals: LCP, FID, CLS, TTFB, INP
 */

import type { Metric } from 'web-vitals';

// Thresholds based on Google's Core Web Vitals guidelines
export const WEB_VITALS_THRESHOLDS = {
  LCP: { good: 2500, poor: 4000 },   // Largest Contentful Paint
  FID: { good: 100, poor: 300 },      // First Input Delay
  CLS: { good: 0.1, poor: 0.25 },     // Cumulative Layout Shift
  TTFB: { good: 800, poor: 1800 },    // Time to First Byte
  INP: { good: 200, poor: 500 },      // Interaction to Next Paint
  FCP: { good: 1800, poor: 3000 },    // First Contentful Paint
};

export type VitalRating = 'good' | 'needs-improvement' | 'poor';

export function getVitalRating(name: string, value: number): VitalRating {
  const threshold = WEB_VITALS_THRESHOLDS[name as keyof typeof WEB_VITALS_THRESHOLDS];
  if (!threshold) return 'good';
  
  if (value <= threshold.good) return 'good';
  if (value <= threshold.poor) return 'needs-improvement';
  return 'poor';
}

export function reportWebVitals(metric: Metric) {
  const rating = getVitalRating(metric.name, metric.value);
  
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Web Vitals] ${metric.name}: ${metric.value.toFixed(2)} (${rating})`);
  }
  
  // Send to analytics endpoint
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
    const body = JSON.stringify({
      id: metric.id,
      name: metric.name,
      value: metric.value,
      rating,
      delta: metric.delta,
      navigationType: metric.navigationType,
      url: window.location.href,
      timestamp: Date.now(),
    });

    // Use sendBeacon for reliability during page unload
    if (navigator.sendBeacon) {
      navigator.sendBeacon('/api/analytics/vitals', body);
    } else {
      fetch('/api/analytics/vitals', {
        body,
        method: 'POST',
        keepalive: true,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }
}

// Initialize web-vitals tracking
export async function initWebVitals() {
  if (typeof window === 'undefined') return;
  
  try {
    const { onCLS, onFID, onLCP, onTTFB, onINP, onFCP } = await import('web-vitals');
    
    onCLS(reportWebVitals);
    onFID(reportWebVitals);
    onLCP(reportWebVitals);
    onTTFB(reportWebVitals);
    onINP(reportWebVitals);
    onFCP(reportWebVitals);
  } catch (error) {
    console.warn('[Web Vitals] Failed to initialize:', error);
  }
}
