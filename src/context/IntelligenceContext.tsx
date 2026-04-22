'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { getIntelligenceFor } from '@/lib/intelligence-engine';

const HolographicBriefing = dynamic(() => import('@/components/intelligence/HolographicBriefing'), { ssr: false });

interface BriefingData {
    title: string;
    description: string;
    stats?: { time: string; saved: string; accuracy: string; };
    role?: string;
    avatarImage?: string;
    videoSrc?: string;
    audioSrc?: string;
    abilityType?: 'strategy' | 'compliance' | 'analytics' | 'curriculum' | 'identity' | 'communication';
}

interface IntelligenceContextType {
    generateBriefing: (data: BriefingData) => void;
    triggerBriefing: (id: string) => void;
    closeBriefing: () => void;
    addAction: (action: string) => void;
    recentActions: string[];
    suggestion: { text: string; action: string } | null;
    setSuggestion: (suggestion: { text: string; action: string } | null) => void;
    isHudExpanded: boolean;
    setIsHudExpanded: (expanded: boolean) => void;
    isSynthesizing: boolean;
    isRescueOneActive: boolean;
    toggleRescueOne: () => void;
}

const IntelligenceContext = createContext<IntelligenceContextType | undefined>(undefined);

export function IntelligenceProvider({ children }: { children: React.ReactNode }) {
    const [briefing, setBriefing] = useState<BriefingData | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [recentActions, setRecentActions] = useState<string[]>([]);
    const [suggestion, setSuggestion] = useState<{ text: string; action: string } | null>(null);
    const [isHudExpanded, setIsHudExpanded] = useState(false);
    const [isSynthesizing, setIsSynthesizing] = useState(false);
    const [isRescueOneActive, setIsRescueOneActive] = useState(false);

    const toggleRescueOne = useCallback(() => {
        setIsRescueOneActive(prev => !prev);
    }, []);

    const generateBriefing = useCallback(async (data: BriefingData, skipSimulation = false) => {
        setIsSynthesizing(true);
        
        if (skipSimulation) {
            setBriefing(data);
            setIsOpen(true);
            setIsSynthesizing(false);
            return;
        }

        // Simulate a brief synthesis period for cinematic effect
        setTimeout(() => {
            setBriefing(data);
            setIsOpen(true);
            setIsSynthesizing(false);
        }, 1200);
    }, []);

    const closeBriefing = useCallback(() => {
        setIsOpen(false);
    }, []);

    const addAction = useCallback((action: string) => {
        setRecentActions(prev => [action, ...prev].slice(0, 5));
    }, []);

    const triggerBriefing = useCallback((id: string) => {
        const info = getIntelligenceFor(id);
        if (info) {
            generateBriefing({
                title: info.title,
                description: info.description,
                stats: info.stats,
                role: info.role,
                avatarImage: info.avatar,
                videoSrc: info.video,
                audioSrc: info.audio,
                abilityType: info.abilityType
            });
        }
    }, [generateBriefing]);

    // GLOBAL INTERCEPTOR: Only trigger if explicitly requested or Shift+Click
    useEffect(() => {
        if (typeof window === 'undefined') return;
        
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
                            videoSrc: info.video,
                            audioSrc: info.audio,
                            abilityType: info.abilityType
                        });
                    } else {
                        // ðŸ§  REAL-TIME NEURAL SYNTHESIS: Call the EdIntel AI Hub
                        setIsSynthesizing(true);
                        
                        fetch('/api/chat', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                messages: [{
                                    role: 'user',
                                    content: `Generate a short, professional, high-fidelity strategic briefing (max 3 sentences) for the educational module interface element named: "${text}". Use a commanding, authoritative, yet visionary tone aligned with Alabama educational excellence.`
                                }],
                                pathname: window.location.pathname
                            })
                        })
                        .then(res => res.text())
                        .then(aiResponse => {
                            generateBriefing({
                                title: `Strategic Analysis: ${text}`,
                                description: aiResponse || `Establishing a deep neural connection to the ${text} module...`,
                                role: 'Strategic Architect',
                                avatarImage: '/images/avatars/executive_leader.png',
                                stats: { time: 'Real-time', saved: '24h/week', accuracy: '100% (Gemini)' },
                                abilityType: 'strategy'
                            }, true); // skip extra simulation
                        })
                        .catch(err => {
                            console.error('[INTELLIGENCE_FAILURE]', err);
                            generateBriefing({
                                title: `Strategic Analysis: ${text}`,
                                description: `Establishing a deep neural connection to the ${text} module. Optimization protocols are currently being established via the alternate GCP uplink.`,
                                role: 'Strategic Architect',
                                avatarImage: '/images/avatars/executive_leader.png',
                                stats: { time: 'Safe Mode', saved: 'N/A', accuracy: 'L1 Ready' },
                                abilityType: 'strategy'
                            });
                        });
                    }
                }
            }
        };

        // CWV OPTIMIZATION: Defer event listener registration until idle to improve TBT
        let ricId: number;
        
        const registerListener = () => {
            window.addEventListener('click', handleGlobalClick, true);
        };

        if ('requestIdleCallback' in window) {
            ricId = (window as any).requestIdleCallback(registerListener, { timeout: 2000 });
        } else {
            setTimeout(registerListener, 1000);
        }

        return () => {
            window.removeEventListener('click', handleGlobalClick, true);
            if (ricId && 'cancelIdleCallback' in window) {
                (window as any).cancelIdleCallback(ricId);
            }
        };
    }, [generateBriefing]);

    // Neural Suggestion Engine: Derives next actions from recent activity
    useEffect(() => {
        if (recentActions.length === 0) {
            setSuggestion(null);
            return;
        }

        const lastAction = recentActions[0];

        if (lastAction.includes('Code Protocol Synthesized')) {
            setSuggestion({
                text: "Compliance check required for synthesized code alignment with District Policy 5.1.",
                action: "Initiate Audit"
            });
        } else if (lastAction.includes('Strategic Lesson Plan')) {
            setSuggestion({
                text: "Lesson protocol synthesized. Shall I generate a matching holographic visual or adaptive quiz bank?",
                action: "Generate Visual"
            });
        } else if (lastAction.includes('Holographic Visual Synthesized')) {
            setSuggestion({
                text: "Visual asset rendered. Would you like to export this for the classroom display or embed in the lesson?",
                action: "Export Asset"
            });
        } else if (lastAction.includes('Strategic Briefing')) {
            setSuggestion({
                text: "Drafting the executive summary for the Board? I can synthesize a 1-page ROI brief based on this data.",
                action: "Synthesize ROI"
            });
        } else if (lastAction.includes('Protocol Synthesized')) {
            setSuggestion({
                text: "Establishing a deep neural connection to the secondary modules. Would you like to vault this generation?",
                action: "Vault Protocol"
            });
        } else {
            setSuggestion({
                text: "Strategic momentum detected. Should I prepare a leadership briefing based on your current session?",
                action: "Generate Briefing"
            });
        }
    }, [recentActions]);

    return (
        <IntelligenceContext.Provider value={{
            generateBriefing,
            triggerBriefing,
            closeBriefing,
            addAction,
            recentActions,
            suggestion,
            setSuggestion,
            isHudExpanded,
            setIsHudExpanded,
            isSynthesizing,
            isRescueOneActive,
            toggleRescueOne
        }}>
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
                    audioSrc={briefing.audioSrc}
                    abilityType={briefing.abilityType}
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
