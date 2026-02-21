import React from 'react';
import EdIntelShell from '@/components/layout/EdIntelShell';
import { AdminCommandDashboard } from '@/components/admin/AdminCommandDashboard';

export default function AdminCommandPage() {
    return (
        <EdIntelShell>
            <AdminCommandDashboard />
        </EdIntelShell>
    );
}
