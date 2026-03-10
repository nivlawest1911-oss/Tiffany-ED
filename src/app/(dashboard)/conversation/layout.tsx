import { SovereignGatekeeper } from "@/components/auth/SovereignGatekeeper";

export default function ConversationLayout({
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
