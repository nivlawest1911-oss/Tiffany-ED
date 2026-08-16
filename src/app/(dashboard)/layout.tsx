'use client';

import AppLayout from '@/components/layout/AppLayout';
import AuthenticatedProviders from '@/components/providers/AuthenticatedProviders';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthenticatedProviders>
      <AppLayout>
        {children}
      </AppLayout>
    </AuthenticatedProviders>
  );
}