import { cookies } from 'next/headers';
import ProfessionalShieldPrivacyClient from './ProfessionalShieldPrivacyClient';

export const dynamic = 'force-dynamic';

export default async function ProfessionalShieldPrivacyPage() {
    await cookies(); // Force dynamic rendering
    return <ProfessionalShieldPrivacyClient />;
}
