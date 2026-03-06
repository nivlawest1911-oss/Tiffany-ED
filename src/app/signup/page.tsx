import { redirect } from 'next/navigation';
import { ROUTES } from '@/lib/routes';

export const dynamic = 'force-dynamic';

export default async function SignupPage() {
    redirect(`${ROUTES.LOGIN}?mode=signup`);
}
