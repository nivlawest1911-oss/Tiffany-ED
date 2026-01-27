import { cookies } from 'next/headers';
import UserProfilePage from '@/components/UserProfilePage';

export const dynamic = 'force-dynamic';

export default async function ProfilePage() {
    await cookies(); // Force dynamic rendering
    return <UserProfilePage />;
}
