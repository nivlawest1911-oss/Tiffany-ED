import SovereignShell from '@/components/layout/SovereignShell';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <SovereignShell>
            {children}
        </SovereignShell>
    );
}
