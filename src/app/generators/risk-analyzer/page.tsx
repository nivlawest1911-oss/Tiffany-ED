import { cookies } from 'next/headers';
import RiskAnalyzerClient from './RiskAnalyzerClient';

export const dynamic = 'force-dynamic';

export default async function RiskAnalyzerPage() {
    await cookies(); // Force dynamic rendering
    return <RiskAnalyzerClient />;
}
