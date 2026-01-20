'use client';
import dynamic from 'next/dynamic';

const ProfessionalPortal = dynamic(() => import('@/components/LeadershipPortal'), { ssr: false });
const ComplianceGuard = dynamic(() => import('@/components/ComplianceGuard'), { ssr: false });

export default function ClientLayoutValues() {
    return (
        <>
            <ProfessionalPortal />
            <ComplianceGuard />
        </>
    );
}
