import { createClient } from '@/lib/supabase/server';
import Dashboard from '@/components/dashboard/Dashboard';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
    // Fetch user and subscription data
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    let subscription = null;

    if (user) {
        // Fetch subscription
        const { data: subData } = await supabase
            .from('user_subscriptions')
            .select('*')
            .eq('user_id', user.id)
            .single();

        subscription = subData;
    }

    // Tier information can be used for future conditional rendering in Dashboard component
    // const tier = subscription?.tier_name || 'Sovereign Initiate';

    return (
        <div className="min-h-screen bg-transparent">
            {/* The Dashboard component is currently self-contained with demo data, 
                but can be extended to accept tier-specific props or context. */}
            <Dashboard />
        </div>
    );
}
