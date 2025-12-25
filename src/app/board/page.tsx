'use client';
import AdminGuard from '../components/Auth/AdminGuard';
import ConsentLedger from '../components/ConsentLedger';
import { auth } from '../lib/firebase';
import { useRouter } from 'next/navigation';

export default function BoardPage() {
  const router = useRouter();
  const handleLogout = async () => { await auth.signOut(); router.push('/'); };

  return (
    <AdminGuard>
      <main className="min-h-screen bg-black text-white p-8 relative overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-blue-400 mb-8">EXECUTIVE HUB</h1>
          <button onClick={handleLogout} className="mb-8 px-4 py-2 border border-white/20 hover:bg-white/10 transition-all text-xs tracking-widest uppercase">Terminate Session</button>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white/5 border border-white/10 p-6 rounded-lg font-mono text-blue-400 uppercase tracking-tighter">Consent Ledger: Active</div>
            <div className="bg-white/5 border border-white/10 p-6 rounded-lg font-mono text-purple-400 uppercase tracking-tighter">Neural Progress: 0.0%</div>
            <div className="bg-white/5 border border-white/10 p-6 rounded-lg font-mono text-green-400 uppercase tracking-tighter">System ROI: Live</div>
          </div>
          <ConsentLedger />
        </div>
      </main>
    </AdminGuard>
  );
}
