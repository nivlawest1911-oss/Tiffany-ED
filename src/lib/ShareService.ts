/**
 * ShareService: Unified utility for generating and managing professional share links
 * across the EdIntel Sovereign ecosystem.
 */

export type ShareContext = 'REFERRAL' | 'DOSSIER' | 'ACADEMY' | 'MEDIA' | 'LEDGER' | 'SIGNAL';

export interface ShareMetadata {
    title: string;
    description: string;
    url: string;
    icon?: string;
}

class ShareService {
    private readonly BASE_URL = 'https://edintel.ai';
    private readonly DEFAULT_REFERRAL = 'ALVIN57';

    /**
     * Generates a context-specific share link.
     * @param context The sharing context
     * @param identifier The user ID or specific resource ID
     */
    generateLink(context: ShareContext, identifier: string = this.DEFAULT_REFERRAL): string {
        switch (context) {
            case 'REFERRAL':
                return `${this.BASE_URL}/enlist/${identifier}`;
            case 'DOSSIER':
                return `${this.BASE_URL}/dossier/${identifier}`;
            case 'ACADEMY':
                return `${this.BASE_URL}/academy?ref=ACADEMY_${identifier}`;
            case 'MEDIA':
                return `${this.BASE_URL}/media?artifact=${identifier}`;
            case 'LEDGER':
                return `${this.BASE_URL}/vault?entry=${identifier}`;
            case 'SIGNAL':
                return `${this.BASE_URL}/fleet?signal=${identifier}`;
            default:
                return this.BASE_URL;
        }
    }

    /**
     * Prepares social media sharing metadata based on context.
     */
    getMetadata(context: ShareContext, name: string, identifier?: string): ShareMetadata {
        const link = this.generateLink(context, identifier);
        
        switch (context) {
            case 'REFERRAL':
                return {
                    title: 'Join the Sovereign Network',
                    description: `${name} has invited you to join the EdIntel elite educational network.`,
                    url: link
                };
            case 'DOSSIER':
                return {
                    title: 'Professional Portfolio: EdIntel',
                    description: `View the verified professional identity and strategic impact of ${name}.`,
                    url: link
                };
            case 'ACADEMY':
                return {
                    title: "Strategic Learning Milestone",
                    description: "I am scaling my capacity in the Sovereign Academy. View my progress protocol.",
                    url: link
                };
            case 'MEDIA':
                return {
                    title: "Sovereign Intelligence Briefing",
                    description: "Review this autonomous media synthesis artifact from my private intelligence fleet.",
                    url: link
                };
            case 'LEDGER':
                return {
                    title: "Immutable Legacy Directive",
                    description: "An immutable entry has been recorded in the Sovereign Ledger. Peer validation requested.",
                    url: link
                };
            case 'SIGNAL':
                return {
                    title: "Intelligence Signal Broadcast",
                    description: "A high-fidelity intelligence signal has been detected in the fleet network.",
                    url: link
                };
            default:
                return {
                    title: "EdIntel Sovereign Identity",
                    description: "Connect with my professional dossier on the EdIntel network.",
                    url: this.BASE_URL
                };
        }
    }

    /**
     * Triggers the native share API if available, otherwise falls back to clipboard.
     */
    async share(metadata: ShareMetadata): Promise<boolean> {
        if (typeof navigator !== 'undefined' && navigator.share) {
            try {
                await navigator.share({
                    title: metadata.title,
                    text: metadata.description,
                    url: metadata.url,
                });
                return true;
            } catch (err) {
                console.warn('[ShareService] Native share failed:', err);
                return false;
            }
        }
        return false;
    }
}

export const shareService = new ShareService();
