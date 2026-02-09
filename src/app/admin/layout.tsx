import WorkspaceLayout from '@/components/dashboard/WorkspaceLayout';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <WorkspaceLayout>
            {children}
        </WorkspaceLayout>
    );
}
