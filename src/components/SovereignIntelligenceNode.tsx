'use client';

export default function SovereignIntelligenceNode() {
    return (
        <div className="dashboard-card">
            <div className="card-header">
                <div className="flex justify-between items-center text-xs text-gray-500 uppercase tracking-wider">
                    <span>Intelligence Agent // Node-02</span>
                    <span className="text-blue-500">● Listening</span>
                </div>
            </div>

            <div className="card-body">
                <h2 className="text-xl font-bold text-white mb-4">Live Observation Feed</h2>
                <div className="space-y-2 text-sm text-gray-400 font-mono">
                    <p>&gt; Listening for evidence data...</p>
                    <p>&gt; Compliance Standard: <span className="text-white bg-gray-800 px-1 rounded">AL Code 290-8-9</span></p>
                    <p>&gt; Student Roster Index: 844 Records</p>
                    <div className="mt-4 p-3 bg-gray-900 border border-gray-800 rounded text-xs">
                        Waiting for new clinical stressors...
                    </div>
                </div>
            </div>

            <div className="card-footer">
                View Analytics
            </div>
        </div>
    );
}
