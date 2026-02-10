import React from 'react';
import IEPNarrativeArchitect from '@/components/intelligence/IEPNarrativeArchitect';

import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'IEP Narrative Architect | EdIntel Intelligence',
    description: 'AI-powered PLAAFP generator for Mobile County compliance.',
};

export default function IEPArchitectPage() {
    return <IEPNarrativeArchitect />;
}
