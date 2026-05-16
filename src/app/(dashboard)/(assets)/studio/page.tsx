import StudioClient from './StudioClient';
import { SovereignGatekeeper } from '@/components/auth/SovereignGatekeeper';

export default function StudioPage() {
    return (
        <SovereignGatekeeper>
            <StudioClient />
        </SovereignGatekeeper>
    );
}
