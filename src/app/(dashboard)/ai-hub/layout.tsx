import { SovereignGatekeeper } from "@/components/auth/SovereignGatekeeper";
import { AI } from "@/lib/ai/rsc";

export default function AIHubLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <AI>
            <SovereignGatekeeper>
                {children}
            </SovereignGatekeeper>
        </AI>
    );
}
