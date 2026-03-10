import { SovereignGatekeeper } from "@/components/auth/SovereignGatekeeper";

export default function AIHubLayout({
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
