import { SovereignGatekeeper } from "@/components/auth/SovereignGatekeeper";
import { AI } from "@/app/ai-hub/ai";

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
