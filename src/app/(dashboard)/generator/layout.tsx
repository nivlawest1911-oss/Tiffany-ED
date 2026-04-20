import { SovereignGatekeeper } from "@/components/auth/SovereignGatekeeper";

export default function GeneratorLayout({
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
