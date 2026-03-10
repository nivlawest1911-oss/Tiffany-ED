import AppLayout from "@/components/layout/AppLayout";
import { ExecutiveGuard } from "@/components/auth/ExecutiveGuard";
import { CommandPalette } from "@/components/ui/CommandPalette";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ExecutiveGuard>
            <AppLayout>
                {children}
                <CommandPalette />
            </AppLayout>
        </ExecutiveGuard>
    );
}
