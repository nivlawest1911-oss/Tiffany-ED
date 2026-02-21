import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'EdIntel Site Command - 30-Day Trial',
    description: 'Start your 30-day risk-free trial of Site Command for Mobile County Schools. Robust AI for only $79.99/month.',
    openGraph: {
        title: 'EdIntel Site Command - 30-Day Trial',
        description: 'Start your 30-day risk-free trial of Site Command for Mobile County Schools. Robust AI for only $79.99/month.',
        type: 'website',
        images: [
            {
                url: '/images/strategic_leadership_node.png',
                width: 1200,
                height: 630,
                alt: 'EdIntel Site Command Dashboard',
            },
        ],
    },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
