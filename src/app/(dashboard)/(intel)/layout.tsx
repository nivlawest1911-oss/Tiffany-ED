import { SovereignGatekeeper } from "@/components/auth/SovereignGatekeeper";

export default function IntelLayout({
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
