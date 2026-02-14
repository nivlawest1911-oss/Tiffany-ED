import AppLayout from "@/components/layout/AppLayout";
import { ExecutiveGuard } from "@/components/auth/ExecutiveGuard";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ExecutiveGuard>
            <AppLayout>{children}</AppLayout>
        </ExecutiveGuard>
    );
}
