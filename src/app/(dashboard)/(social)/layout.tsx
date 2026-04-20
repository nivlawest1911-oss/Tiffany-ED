import { SovereignGatekeeper } from "@/components/auth/SovereignGatekeeper";

export default function SocialLayout({
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
