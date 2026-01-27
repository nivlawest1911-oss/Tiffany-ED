import { cookies } from 'next/headers';
import FERPAComplianceClient from './FERPAComplianceClient';

export const dynamic = 'force-dynamic';

export default async function FERPACompliancePage() {
    await cookies(); // Force dynamic rendering
    return <FERPAComplianceClient />;
}
