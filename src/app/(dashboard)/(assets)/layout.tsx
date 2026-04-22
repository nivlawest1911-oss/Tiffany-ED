import { SovereignGatekeeper } from "@/components/auth/SovereignGatekeeper";

export default function AssetsLayout({
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
