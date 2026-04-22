import AppLayout from "@/components/layout/AppLayout";
import { ExecutiveGuard } from "@/components/auth/ExecutiveGuard";
import { CommandPalette } from "@/components/ui/CommandPalette";
import SovereignStatus from "@/components/dashboard/SovereignStatus";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ExecutiveGuard>
            <AppLayout>
                <SovereignStatus />
                {children}
                <CommandPalette />
            </AppLayout>
        </ExecutiveGuard>
    );
}
