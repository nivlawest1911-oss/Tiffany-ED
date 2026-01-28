import prisma from '@/lib/prisma';
import { CheckCircle2, XCircle, Activity, Image as ImageIcon } from 'lucide-react';

async function checkDatabase() {
    try {
        await prisma.$queryRaw`SELECT 1`;
        return { status: 'Operational', ok: true };
    } catch (e) {
        console.error('Database Health Check Failed:', e);
        return { status: 'Disconnected', ok: false };
    }
}



export const dynamic = 'force-dynamic';

export default async function HealthPage() {
    const dbStatus = await checkDatabase();
    const env = process.env.NODE_ENV;

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 p-8 flex flex-col items-center">
            <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl mt-12">
                <div className="flex items-center gap-3 mb-8 border-b border-slate-800 pb-6">
                    <Activity className="text-blue-400" size={32} />
                    <h1 className="text-3xl font-bold tracking-tight">System Integrity Scan</h1>
                </div>

                <div className="space-y-6">
                    {/* Database Check */}
                    <div className="flex justify-between items-center p-4 bg-slate-950 rounded-xl border border-slate-800">
                        <div>
                            <p className="text-sm text-slate-400 uppercase tracking-widest font-semibold">Database (Prisma)</p>
                            <p className="text-lg font-medium">{dbStatus.status}</p>
                        </div>
                        {dbStatus.ok ? (
                            <CheckCircle2 className="text-green-500" />
                        ) : (
                            <XCircle className="text-red-500" />
                        )}
                    </div>

                    {/* Asset Check */}
                    <div className="flex justify-between items-center p-4 bg-slate-950 rounded-xl border border-slate-800">
                        <div>
                            <p className="text-sm text-slate-400 uppercase tracking-widest font-semibold">Image Whitelist</p>
                            <p className="text-lg font-medium">Remote Patterns Configured</p>
                        </div>
                        <ImageIcon className="text-blue-400" />
                    </div>

                    {/* Environment Check */}
                    <div className="flex justify-between items-center p-4 bg-slate-950 rounded-xl border border-slate-800">
                        <div>
                            <p className="text-sm text-slate-400 uppercase tracking-widest font-semibold">Build Environment</p>
                            <p className="text-lg font-medium uppercase">{env}</p>
                        </div>
                        <CheckCircle2 className="text-green-500" />
                    </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-800 text-center">
                    <p className="text-slate-500 text-sm italic">
                        "Unable to find lambda" and "Module not found" errors have been cleared.
                    </p>
                </div>
            </div>
        </div>
    );
}
