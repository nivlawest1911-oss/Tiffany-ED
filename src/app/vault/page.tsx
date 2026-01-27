import { cookies } from 'next/headers';
import ProfessionalVaultClient from './ProfessionalVaultClient';

export const dynamic = 'force-dynamic';

export default async function ProfessionalVaultPage() {
    await cookies(); // Force dynamic rendering
    return <ProfessionalVaultClient />;
}
