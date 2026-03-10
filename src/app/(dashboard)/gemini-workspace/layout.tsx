import { SovereignGatekeeper } from "@/components/auth/SovereignGatekeeper";

export default function GeminiWorkspaceLayout({
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
