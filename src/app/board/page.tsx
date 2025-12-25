'use client';
import AdminGuard from '@/components/Auth/AdminGuard';
import ConsentLedger from '@/components/ConsentLedger'; from '@/components/Auth/AdminGuard';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';

export default function BoardPage() {
  const router = useRouter();

  const handleLogout = async () => {
    await auth.signOut();
    router.push('/');
  };

  return (
    <AdminGuard>
      <main className="min-h-screen bg-black text-white p-8 relative overflow-hidden">
        {/* Morphic Background Element */}
        <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600 rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <header className="flex justify-between items-center mb-12 border-b border-white/10 pb-6">
            <div>
              <h1 className="text-4xl font-light tracking-tighter">
                EXECUTIVE <span className="font-bold text-blue-400">HUB</span>
              </h1>
              <p className="text-white/50 text-sm tracking-widest mt-1">SOVEREIGN INTELLIGENCE • PRICHARD NODE</p>
            </div>
            <button 
              onClick={handleLogout}
              className="px-4 py-2 border border-white/20 hover:bg-white/10 transition-all text-xs tracking-widest uppercase"
            >
              Terminate Session
            </button>
          </header>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* ROI DATA PLACEHOLDERS */}
            <div className="bg-white/5 border border-white/10 p-6 rounded-lg">
              <p className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-2">Consent Ledger</p>
              <h2 className="text-3xl font-light">0 Active</h2>
            </div>
            <div className="bg-white/5 border border-white/10 p-6 rounded-lg">
              <p className="text-purple-400 text-xs font-bold uppercase tracking-widest mb-2">Neural Progress</p>
              <h2 className="text-3xl font-light">0.0%</h2>
            </div>
            <div className="bg-white/5 border border-white/10 p-6 rounded-lg">
              <p className="text-green-400 text-xs font-bold uppercase tracking-widest mb-2">System ROI</p>
              <h2 className="text-3xl font-light">$0.00</h2>
            </div>
          </section>
<ConsentLedger />
        </div>
      </main>
    </AdminGuard>
  );
}
