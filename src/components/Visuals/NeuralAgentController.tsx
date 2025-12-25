'use client';
import { Cpu, Network, HardDrive, ShieldAlert, Radio } from 'lucide-react';

export default function NeuralAgentController() {
  const agents = [
    { name: "Fiscal-Node", role: "ROI Strategy (DBA)", status: "Analyzing", power: "98%" },
    { name: "Logistics-Node", role: "CDL Optimization", status: "Active", power: "94%" },
    { name: "Compliance-Node", role: "FERPA Shield", status: "Secure", power: "100%" }
  ];

  return (
    <div className="mt-12 p-10 bg-[#000510] border-2 border-blue-500/20 rounded-[3.5rem] shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 p-8">
        <Radio className="w-6 h-6 text-red-500 animate-ping" />
      </div>
      
      <h3 className="text-white font-black text-2xl uppercase italic tracking-tighter mb-8 flex items-center gap-3">
        <Network className="text-blue-400" /> Neural Mesh Control
      </h3>

      <div className="grid md:grid-cols-3 gap-6">
        {agents.map((agent) => (
          <div key={agent.name} className="p-6 bg-white/5 rounded-2xl border border-white/10 hover:border-blue-500/50 transition-all group">
            <div className="flex justify-between items-start mb-4">
               <Cpu className="text-blue-400 group-hover:rotate-90 transition-transform" />
               <span className="text-[10px] font-black text-green-400 uppercase tracking-widest">{agent.status}</span>
            </div>
            <h4 className="text-white font-bold text-lg mb-1">{agent.name}</h4>
            <p className="text-white/40 text-[10px] uppercase font-bold mb-4">{agent.role}</p>
            <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
              <div className="bg-blue-500 h-full" style={{ width: agent.power }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
