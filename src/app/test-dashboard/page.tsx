import EdIntelTerminal from '@/components/edintel-core/EdIntelTerminal';
import EdIntelIntelligenceNode from '@/components/edintel-core/EdIntelIntelligenceNode';
import '@/app/globals.css';

export const dynamic = 'force-dynamic';

export default function TestDashboard() {
    return (
        <html lang="en">
            <head>
                <title>Test Dashboard</title>
                <title>Test Dashboard</title>
                {/* <link rel="stylesheet" href="/globals.css" /> - Handled by import in layout or here if needed but app router handles globals via layout */}
            </head>
            <body>
                <div className="min-h-screen bg-black p-8">
                    <h1 className="text-3xl font-bold text-white mb-8">
                        ISOLATED TEST - No Layout Wrapper
                    </h1>

                    <div className="dashboard-grid">
                        <EdIntelTerminal />
                        <EdIntelIntelligenceNode />

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
            </body>
        </html>
    );
}
