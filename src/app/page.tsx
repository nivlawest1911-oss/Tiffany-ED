import MorphicNeuralMesh from '@/components/Visuals/MorphicNeuralMesh';
import SynapticToast from '@/components/Visuals/Notifications/SynapticToast';

export default function SovereignDashboard() {
  return (
    <main className="relative min-h-screen bg-black overflow-hidden">
      <MorphicNeuralMesh />
      <div className="relative z-10 p-20">
        <h1 className="text-6xl font-black text-white italic tracking-tighter uppercase">
          Sovereign <span className="text-emerald-500">State</span> Intel
        </h1>
        <p className="text-gray-400 mt-4 font-mono uppercase tracking-widest text-xs">
          Mobile County Node: Prichard-01 | Synaptic Load: Optimal
        </p>
      </div>
      <SynapticToast message="Neural Grid Active" type="success" />
    </main>
  );
}
