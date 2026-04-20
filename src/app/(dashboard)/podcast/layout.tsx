import { SovereignGatekeeper } from "@/components/auth/SovereignGatekeeper";

export default function PodcastLayout({
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
