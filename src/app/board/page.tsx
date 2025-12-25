import AdminGuard from '@/components/AdminGuard';
import DistrictROI from '@/components/DistrictROI';
import MemoGenerator from '@/components/MemoGenerator';

export default function BoardHub() {
  return (
    <AdminGuard>
      <main className="min-h-screen bg-[#050505] text-white p-12">
        <header className="flex justify-between items-start mb-12">
          <div>
            <h1 className="text-5xl font-black italic tracking-tighter uppercase">Executive <span className="text-emerald-500">Board</span> Hub</h1>
            <p className="text-gray-500 font-mono mt-2">SECURE NODE: MOBILE_COUNTY_PRICHARD_01</p>
          </div>
          <MemoGenerator />
        </header>
        
        <DistrictROI />
        
        <section className="mt-12 p-8 border border-white/5 bg-white/[0.02] rounded-3xl">
          <h3 className="text-xl font-bold mb-4">Neural Grid Activity</h3>
          <div className="h-64 flex items-center justify-center border border-dashed border-white/10 rounded-xl text-gray-600">
            [Real-time Synaptic Stream Loading...]
          </div>
        </section>
      </main>
    </AdminGuard>
  );
}
