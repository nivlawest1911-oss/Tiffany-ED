'use client';

import React from 'react';
import SovereignShell from '@/components/layout/SovereignShell';
import StudentRosterClient from './StudentRosterClient';

export default function StudentRosterPage() {
    return (
        <SovereignShell>
            <StudentRosterClient />
        </SovereignShell>
    );
}
