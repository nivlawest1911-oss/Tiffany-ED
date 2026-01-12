/**
 * Utility functions for Vercel-native features
 * - OG Image generation
 * - Analytics tracking
 * - Performance monitoring
 */

// ============================================
// OG IMAGE UTILITIES
// ============================================

export interface OGImageParams {
    school?: string;
    plan?: string;
    price?: string;
    generator?: string;
}

/**
 * Generate OG image URL for social sharing
 */
export function generateOGImageUrl(params: OGImageParams = {}): string {
    const searchParams = new URLSearchParams();

    if (params.school) searchParams.set('school', params.school);
    if (params.plan) searchParams.set('plan', params.plan);
    if (params.price) searchParams.set('price', params.price);
    if (params.generator) searchParams.set('generator', params.generator);

    return `/api/og?${searchParams.toString()}`;
}

/**
 * Preset OG images for common use cases
 */
export const OG_PRESETS = {
    mobileCounty: generateOGImageUrl({
        school: 'Mobile County Schools',
        plan: 'Professional',
        price: '$39.99',
    }),
    iepArchitect: generateOGImageUrl({
        generator: 'IEP Architect',
        plan: 'Professional',
        price: '$39.99',
    }),
    lessonPlanner: generateOGImageUrl({
        generator: 'Lesson Plan Generator',
        plan: 'Professional',
        price: '$39.99',
    }),
    basicTier: generateOGImageUrl({
        plan: 'Free',
        price: '$0',
    }),
    professionalTier: generateOGImageUrl({
        plan: 'Professional',
        price: '$39.99',
    }),
    enterpriseTier: generateOGImageUrl({
        plan: 'Enterprise',
        price: 'Custom',
    }),
};

// ============================================
// ANALYTICS TRACKING
// ============================================

/**
 * Track school signup event
 */
export function trackSchoolSignup(data: {
    schoolName: string;
    district: string;
    plan: 'basic' | 'professional' | 'enterprise';
    price: number;
    email?: string;
}) {
    if (typeof window !== 'undefined' && window.va) {
        window.va('event', {
            name: 'school_signup',
            data: {
                school_name: data.schoolName,
                district: data.district,
                plan: data.plan,
                price: data.price,
                timestamp: new Date().toISOString(),
            },
        });
    }
}

/**
 * Track generator usage
 */
export function trackGeneratorUsage(data: {
    generatorId: string;
    generatorName: string;
    promptLength: number;
    responseLength?: number;
    cached?: boolean;
    school?: string;
}) {
    if (typeof window !== 'undefined' && window.va) {
        window.va('event', {
            name: 'generator_used',
            data: {
                generator_id: data.generatorId,
                generator_name: data.generatorName,
                prompt_length: data.promptLength,
                response_length: data.responseLength,
                cached: data.cached,
                school: data.school,
                timestamp: new Date().toISOString(),
            },
        });
    }
}

/**
 * Track theme selection
 */
export function trackThemeSelection(data: {
    theme: 'purple' | 'blue' | 'green' | 'orange';
    generatorId: string;
    page: string;
}) {
    if (typeof window !== 'undefined' && window.va) {
        window.va('event', {
            name: 'theme_selected',
            data: {
                theme: data.theme,
                generator_id: data.generatorId,
                page: data.page,
                timestamp: new Date().toISOString(),
            },
        });
    }
}

/**
 * Track token usage
 */
export function trackTokenUsage(data: {
    tokensUsed: number;
    tokensRemaining: number;
    generatorId: string;
    school?: string;
}) {
    if (typeof window !== 'undefined' && window.va) {
        window.va('event', {
            name: 'token_usage',
            data: {
                tokens_used: data.tokensUsed,
                tokens_remaining: data.tokensRemaining,
                generator_id: data.generatorId,
                school: data.school,
                timestamp: new Date().toISOString(),
            },
        });
    }
}

/**
 * Track layout interaction
 */
export function trackLayoutInteraction(data: {
    element: string;
    action: 'click' | 'hover' | 'scroll' | 'focus';
    page: string;
    value?: string | number;
}) {
    if (typeof window !== 'undefined' && window.va) {
        window.va('event', {
            name: 'layout_interaction',
            data: {
                element: data.element,
                action: data.action,
                page: data.page,
                value: data.value,
                timestamp: new Date().toISOString(),
            },
        });
    }
}

/**
 * Track page performance
 */
export function trackPagePerformance(data: {
    page: string;
    loadTime: number;
    cls?: number;
    fid?: number;
    lcp?: number;
}) {
    if (typeof window !== 'undefined' && window.va) {
        window.va('event', {
            name: 'page_performance',
            data: {
                page: data.page,
                load_time: data.loadTime,
                cls: data.cls,
                fid: data.fid,
                lcp: data.lcp,
                timestamp: new Date().toISOString(),
            },
        });
    }
}

// ============================================
// WEB VITALS MONITORING
// ============================================

/**
 * Report high CLS (Cumulative Layout Shift)
 */
export function reportHighCLS(value: number, page: string) {
    if (value > 0.1) {
        console.warn(`High CLS detected: ${value} on ${page}`);
        trackLayoutInteraction({
            element: 'page',
            action: 'scroll',
            page,
            value,
        });
    }
}

/**
 * Report FID (First Input Delay)
 */
export function reportFID(value: number, page: string) {
    trackPagePerformance({
        page,
        loadTime: 0,
        fid: value,
    });
}

/**
 * Report LCP (Largest Contentful Paint)
 */
export function reportLCP(value: number, page: string) {
    trackPagePerformance({
        page,
        loadTime: 0,
        lcp: value,
    });
}

// ============================================
// TYPE DECLARATIONS
// ============================================

declare global {
    interface Window {
        va?: (event: string, data: any) => void;
    }
}

export { };
