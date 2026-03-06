'use client';

import React from 'react';
import EdIntelShell from '@/components/layout/EdIntelShell';
import StudentRosterClient from './StudentRosterClient';

export default function StudentRosterPage() {
    return (
        <EdIntelShell>
            <StudentRosterClient />
        </EdIntelShell>
    );
}
