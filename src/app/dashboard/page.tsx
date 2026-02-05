import { createSovereignServerClient } from '@/lib/supabase-server';
import SovereignTerminal from '@/components/SovereignTerminal';
import SovereignIntelligenceNode from '@/components/SovereignIntelligenceNode';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
    const supabase = await createSovereignServerClient();
    const { data: { session } } = await supabase.auth.getSession();

    return (
        <main className="min-h-screen bg-black">
            {/* Top Nav */}
            <header className="p-6 border-b border-gray-900 mb-4">
                <h1 className="text-xl font-bold tracking-tight text-white">
                    EDINTEL // <span className="text-gray-500">COMMAND CENTER</span>
                </h1>
            </header>

            {/* The Bento Grid - No complex nesting */}
            <div className="bento-grid">
                <SovereignTerminal />
                <SovereignIntelligenceNode />

                {/* Placeholder for 3rd Card to test grid alignment */}
                <div className="sovereign-card">
                    <div className="p-5 border-b border-gray-800 text-xs tracking-widest text-gray-500 uppercase">
                        ID MANAGER // NODE-03
                    </div>
                    <div className="terminal-output">
                        <h2 className="text-2xl text-white font-bold mb-6">STUDENT ID MANAGER</h2>
                        <p>&gt; Awaiting roster upload...</p>
                    </div>
                    <div className="command-deck">
                        MANAGE IDS
                    </div>
                </div>

            </div>
        </main>
    );
}
