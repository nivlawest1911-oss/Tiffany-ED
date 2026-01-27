import { cookies } from 'next/headers';
import ProfessionalCenterClient from './ProfessionalCenterClient';

export const dynamic = 'force-dynamic';

export default async function ProfessionalCenterPage() {
    await cookies(); // Force dynamic rendering
    return <ProfessionalCenterClient />;
}
