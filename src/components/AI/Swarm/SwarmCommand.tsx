'use client';
import { motion } from 'framer-motion';
import { Share2, Zap, Shield, Target, Cpu } from 'lucide-react';

export default function SwarmCommand() {
  const agents = [
    { name: 'Literacy-Agent-Alpha', task: 'Optimizing Phonemic Awareness', status: 'Active' },
    { name: 'Safety-Agent-Sentinel', task: 'Monitoring Emotional Load', status: 'Standby' },
    { name: 'Fiscal-Agent-Vault', task: 'Auditing SB 101 Compliance', status: 'Syncing' }
  ];

  return (
    <div className="relative p-12 bg-black rounded-[4rem] border border-blue-500/10 overflow-hidden shadow-[0_0_150px_rgba(59,130,246,0.1)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,_rgba(59,130,246,0.1),_transparent)] animate-pulse" />
      
      <div className="relative z-10">
        <div className="flex justify-between items-center mb-16">
          <div className="flex items-center gap-6">
            <div className="p-5 bg-blue-600 rounded-[2rem] shadow-2xl shadow-blue-500/40">
              <Share2 className="text-white animate-spin-slow" />
            </div>
            <div>
              <h2 className="text-5xl font-black tracking-tighter uppercase italic text-white">Neural <span className="text-blue-500">Swarm</span></h2>
              <p className="text-[10px] text-gray-500 font-mono tracking-[0.5em] uppercase">Autonomous District Orchestration</p>
            </div>
          </div>
          <div className="flex gap-4">
             <div className="flex items-center gap-2 px-5 py-2 bg-blue-500/10 rounded-full border border-blue-500/20">
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
                <span className="text-xs font-bold text-blue-400 font-mono">142 AGENTS ONLINE</span>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {agents.map((agent, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              key={agent.name} 
              className="p-8 bg-[#0a0a0a] rounded-[2.5rem] border border-white/5 hover:border-blue-500/40 transition-all cursor-pointer group"
            >
              <Cpu className="text-blue-500 mb-6 group-hover:rotate-90 transition-transform duration-500" />
              <h4 className="text-lg font-bold mb-2">{agent.name}</h4>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-4">{agent.task}</p>
              <div className="flex items-center gap-2">
                <span className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    animate={{ x: ['-100%', '100%'] }} 
                    transition={{ duration: 3, repeat: Infinity }}
                    className="h-full w-1/3 bg-blue-600" 
                  />
                </span>
                <span className="text-[10px] text-blue-400 font-bold">{agent.status}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
