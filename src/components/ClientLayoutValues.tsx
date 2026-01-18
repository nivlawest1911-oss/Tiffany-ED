'use client';
import dynamic from 'next/dynamic';

const SovereignPortal = dynamic(() => import('@/components/SovereignPortal'), { ssr: false });
const ComplianceGuard = dynamic(() => import('@/components/ComplianceGuard'), { ssr: false });

export default function ClientLayoutValues() {
    return (
        <>
            <SovereignPortal />
            <ComplianceGuard />
        </>
    );
}
