import SovereignTerminal from '@/components/SovereignTerminal';
import SovereignIntelligenceNode from '@/components/SovereignIntelligenceNode';
import '../globals.css';

export const dynamic = 'force-dynamic';

export default function LayoutTest() {
    return (
        <div className="min-h-screen bg-black p-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">
                    🧪 LAYOUT TEST - Public Route (No Auth Required)
                </h1>
                <p className="text-gray-400">
                    This route bypasses authentication to test the pure layout.
                </p>
            </div>

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
                        <p className="text-sm text-gray-400 font-mono mt-2">&gt; System ready...</p>
                    </div>
                    <div className="card-footer">
                        Manage IDs
                    </div>
                </div>
            </div>

            <div className="mt-8 p-4 bg-gray-900 border border-gray-800 rounded text-sm text-gray-400">
                <p><strong className="text-white">Expected Layout:</strong></p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>3 cards in a responsive grid</li>
                    <li>White bars at the BOTTOM of each card</li>
                    <li>No overlapping components</li>
                    <li>Proper spacing between cards</li>
                </ul>
            </div>
        </div>
    );
}
