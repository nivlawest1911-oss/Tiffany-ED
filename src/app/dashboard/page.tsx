import SovereignTerminal from '@/components/SovereignTerminal';
import SovereignIntelligenceNode from '@/components/SovereignIntelligenceNode';

export const dynamic = 'force-dynamic';

export default function DashboardPage() {
    return (
        <div className="min-h-screen bg-black">
            <header className="p-6 border-b border-gray-900">
                <h1 className="text-2xl font-bold text-white">
                    EdIntel <span className="text-gray-500">Command Center</span>
                </h1>
            </header>

            <div className="dashboard-grid">
                <SovereignTerminal />
                <SovereignIntelligenceNode />

                {/* Test Card */}
                <div className="dashboard-card">
                    <div className="card-header">
                        <div className="text-xs text-gray-500 uppercase tracking-wider">
                            ID Manager // Node-03
                        </div>
                    </div>
                    <div className="card-body">
                        <h2 className="text-xl font-bold text-white mb-4">Student ID Manager</h2>
                        <p className="text-sm text-gray-400 font-mono">&gt; Awaiting roster upload...</p>
                    </div>
                    <div className="card-footer">
                        Manage IDs
                    </div>
                </div>
            </div>
        </div>
    );
}
