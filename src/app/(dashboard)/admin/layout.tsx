import { SovereignGatekeeper } from "@/components/auth/SovereignGatekeeper";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <SovereignGatekeeper>
            {children}
        </SovereignGatekeeper>
    );
}
