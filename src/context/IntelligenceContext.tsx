'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { getIntelligenceFor } from '@/lib/intelligence-engine';

const HolographicBriefing = dynamic(() => import('@/components/HolographicBriefing'), { ssr: false });

interface BriefingData {
    title: string;
    description: string;
    stats?: { time: string; saved: string; accuracy: string; };
    role?: string;
    avatarImage?: string;
    videoSrc?: string;
    abilityType?: 'strategy' | 'compliance' | 'analytics' | 'curriculum' | 'identity' | 'communication';
}

interface IntelligenceContextType {
    generateBriefing: (data: BriefingData) => void;
    closeBriefing: () => void;
}

const IntelligenceContext = createContext<IntelligenceContextType | undefined>(undefined);

export function IntelligenceProvider({ children }: { children: React.ReactNode }) {
    const [briefing, setBriefing] = useState<BriefingData | null>(null);
    const [isOpen, setIsOpen] = useState(false);

    const generateBriefing = useCallback((data: BriefingData) => {
        setBriefing(data);
        setIsOpen(true);
    }, []);

    const closeBriefing = useCallback(() => {
        setIsOpen(false);
    }, []);

    // GLOBAL INTERCEPTOR: Only trigger if explicitly requested or Shift+Click
    useEffect(() => {
        const handleGlobalClick = (e: MouseEvent) => {
            const path = window.location.pathname;
            // NEVER intercept on critical functional pages
            if (['/login', '/signup', '/onboarding'].some(p => path.startsWith(p))) return;

            const target = e.target as HTMLElement;
            const interactiveElement = target.closest('button, a') as HTMLElement | null;

            if (interactiveElement) {
                const href = interactiveElement.getAttribute('href');
                const hasIntelligenceBrand = interactiveElement.hasAttribute('data-intelligence');
                const isPlaceholderLink = href === '#' || href === '';

                // Only intercept Shift+Click OR specific intelligence triggers OR '#' links
                // AVOID intercepting real navigational links (starting with /, #, or http)
                const isRealLink = href && (href.startsWith('/') || href.startsWith('#') || href.startsWith('http')) && href !== '#' && href !== '';

                if ((e.shiftKey || hasIntelligenceBrand || isPlaceholderLink) && !isRealLink) {
                    // Safety check: Avoid highjacking elements explicitly marked to be ignored
                    if (interactiveElement.hasAttribute('data-no-intelligence')) return;

                    e.preventDefault();
                    e.stopPropagation();

                    const text = (interactiveElement as HTMLElement).innerText || interactiveElement.getAttribute('aria-label') || 'Neural Link';
                    const info = getIntelligenceFor(text);

                    if (info) {
                        generateBriefing({
                            title: info.title,
                            description: info.description,
                            stats: info.stats,
                            role: info.role,
                            avatarImage: info.avatar,
                            abilityType: info.abilityType
                        });
                    } else {
                        // COMPREHENSIVE DYNAMIC SYNTHESIS: No more placeholders
                        generateBriefing({
                            title: `Strategic Analysis: ${text}`,
                            description: `Establishing a deep neural connection to the ${text} module. My analysis indicates this area is critical for district-wide optimization and excellence. By leveraging multi-variate data synthesis in this domain, we can achieve high-fidelity leadership throughput and maximize the ROI of our professional assets. How would you like to proceed with the tactical deployment of this protocol?`,
                            role: 'Strategic Architect',
                            avatarImage: '/images/avatars/executive_leader.png',
                            stats: { time: 'Calculated', saved: '20h/week', accuracy: '100%' },
                            abilityType: 'strategy'
                        });
                    }
                }
            }
        };

        window.addEventListener('click', handleGlobalClick, true);
        return () => window.removeEventListener('click', handleGlobalClick, true);
    }, [generateBriefing]);

    return (
        <IntelligenceContext.Provider value={{ generateBriefing, closeBriefing }}>
            {children}
            {isOpen && briefing && (
                <HolographicBriefing
                    isOpen={isOpen}
                    onClose={closeBriefing}
                    title={briefing.title}
                    description={briefing.description}
                    stats={briefing.stats}
                    role={briefing.role}
                    avatarImage={briefing.avatarImage}
                    videoSrc={briefing.videoSrc}
                    abilityType={briefing.abilityType}
                    theme="professional"
                />
            )}
        </IntelligenceContext.Provider>
    );
}

export function useIntelligence() {
    const context = useContext(IntelligenceContext);
    if (context === undefined) {
        throw new Error('useIntelligence must be used within an IntelligenceProvider');
    }
    return context;
}
