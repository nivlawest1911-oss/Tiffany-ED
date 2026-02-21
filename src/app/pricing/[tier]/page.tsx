import { Metadata } from 'next';
import PricingClient from '../PricingClient';
import { EdIntel_TIERS } from '@/lib/pricing-config';

type Props = {
    params: Promise<{ tier: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { tier } = await params;

    const tierData = EdIntel_TIERS.find(t => t.id === tier);

    if (!tierData) {
        return {
            title: 'EdIntel Pricing',
            description: 'Choose your Sovereign Suite tier.'
        };
    }

    const tierFocus: Record<string, string> = {
        'site-command': 'Full Site Oversight and 30-day trial.',
        'director-pack': 'Leadership compliance.',
        'practitioner': 'Classroom management.',
        'sovereign-pack': 'Power users.',
        'standard-pack': 'Essential tools.',
        'sovereign-initiate': 'Free entry.'
    };

    const focus = tier === 'site-command'
        ? 'Full Site Oversight for $79.99/month. Includes a 30-day risk-free trial and maximum neural capacity.'
        : (tierFocus[tier] || tierData.description);

    return {
        title: `EdIntel ${tierData.name} - ${tier === 'sovereign-initiate' ? 'Free entry' : '30-Day Trial'}`,
        description: focus,
        openGraph: {
            title: `EdIntel ${tierData.name}`,
            description: focus,
            type: 'website',
            images: [
                {
                    url: '/images/strategic_leadership_node.png',
                    width: 1200,
                    height: 630,
                    alt: `EdIntel ${tierData.name} Tier`,
                },
            ],
        },
    };
}

export default function TierPricingPage() {
    return <PricingClient />;
}
