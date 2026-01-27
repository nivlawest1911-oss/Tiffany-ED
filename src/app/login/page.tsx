import { cookies } from 'next/headers';
import LoginClient from './LoginClient';

export const dynamic = 'force-dynamic';

export default async function LoginPage() {
  await cookies(); // Force dynamic rendering
  return <LoginClient />;
}
