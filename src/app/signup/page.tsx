import { cookies } from 'next/headers';
import SignupClient from './SignupClient';

export const dynamic = 'force-dynamic';

export default async function SignupPage() {
    await cookies(); // Force dynamic rendering
    return <SignupClient />;
}
