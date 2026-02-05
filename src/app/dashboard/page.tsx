import DashboardClient from './DashboardClient';
import { createSovereignServerClient } from '@/lib/supabase-server';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
    const supabase = await createSovereignServerClient();

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
