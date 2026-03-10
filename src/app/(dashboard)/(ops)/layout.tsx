import { SovereignGatekeeper } from "@/components/auth/SovereignGatekeeper";

export default function OpsLayout({
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
