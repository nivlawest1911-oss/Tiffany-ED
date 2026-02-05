import { cookies } from 'next/headers';
import DashboardClient from './DashboardClient';

export const dynamic = 'force-dynamic';

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

export default async function DashboardPage() {
    await cookies(); // Force dynamic rendering
    const supabase = createServerComponentClient({ cookies });

    const { data: { session } } = await supabase.auth.getSession();
    let tierName = "Sovereign Initiate";

    if (session?.user) {
        const { data } = await supabase
            .from('subscriptions')
            .select('tier_name')
            .eq('user_id', session.user.id)
            .single();
        if (data?.tier_name) {
            tierName = data.tier_name;
        }
    }

    return <DashboardClient tierName={tierName} />;
}
