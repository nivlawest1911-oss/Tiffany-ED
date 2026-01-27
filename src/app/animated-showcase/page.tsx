import { cookies } from 'next/headers';
import AnimatedShowcaseClient from './AnimatedShowcaseClient';

export const dynamic = 'force-dynamic';

export default async function AnimatedHeroShowcase() {
    await cookies(); // Force dynamic rendering
    return <AnimatedShowcaseClient />;
}
