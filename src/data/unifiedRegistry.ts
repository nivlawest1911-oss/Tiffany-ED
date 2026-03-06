import { generators as GENERATORS } from './generators';
import { globalProtocols as GLOBAL_PROTOCOLS } from './globalProtocols';
import { EdIntel_PROTOCOLS } from './sovereign-protocols';

export interface UnifiedProtocol {
    id: string;
    name: string;
    description: string;
    category: string;
    icon: any;
    link?: string;
    href?: string;
    provider?: string;
    context?: string;
    message?: string;
    videoBehavior?: 'idle' | 'attentive' | 'focus' | 'alert';
    suggestedAction?: string;
    actionLabel?: string;
    abilityType?: 'strategy' | 'compliance' | 'analytics' | 'curriculum' | 'identity' | 'communication';
    avatar?: string;
    prompts?: string[];
    heroVideo?: string;
    heroImage?: string;
    welcomeVideo?: string;
    provider?: string;
    link?: string;
    href?: string;
}

// Map the separate arrays into a single unified registry
export const PROTOCOL_REGISTRY: UnifiedProtocol[] = [
    ...GLOBAL_PROTOCOLS.map(p => ({
        ...p,
        category: p.category || "Global",
        link: (p as any).link || (p as any).href || `/generators/${p.id}`,
        context: p.name.toUpperCase(),
        abilityType: 'strategy' as const
    })),
    ...GENERATORS.map(p => {
        const sovereignData = EdIntel_PROTOCOLS[`/generators/${p.id}`] || {};
        return {
            ...p,
            category: p.category || "Strategic",
            link: (p as any).link || `/generators/${p.id}`,
            prompts: (p as any).prompts || [],
            ...sovereignData
        } as UnifiedProtocol;
    })
];

export const getProtocolById = (id: string) => PROTOCOL_REGISTRY.find(p => p.id === id);
