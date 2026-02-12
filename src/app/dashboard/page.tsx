import { createClient } from '@/lib/supabase/server';
import Dashboard from '@/components/dashboard/Dashboard';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
    // Fetch user and subscription data
    const supabase = await createClient();
    try {
        const { data: { user } } = await supabase.auth.getUser();

        if (user) {
            // Standardize on 'subscriptions' table
            await supabase
                .from('subscriptions')
                .select('*')
                .eq('user_id', user.id)
                .single();
        }
    } catch (err) {
        console.error('[DASHBOARD_PAGE] Server Data Fetch Error:', err);
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
