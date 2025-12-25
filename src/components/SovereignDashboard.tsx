'use client';
'use client';
import { useState, useEffect } from 'react';
import TokenWhistle from '@/components/TokenWhistle';
import NeuralPulse from '@/components/NeuralPulse';

export default function SovereignDashboard({ children }) {
  return (
    <div className="flex h-screen bg-[#050505] text-white overflow-hidden">
      {/* Social & Avatar Sidebar */}
      <aside className="w-64 border-r border-[#111] bg-[#0a0a0a] p-6 flex flex-col justify-between">
        <div>
          <div className="mb-10 text-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 mx-auto border-4 border-[#222] shadow-xl mb-4 overflow-hidden">
               {/* Avatar Placeholder */}
               <img src="/api/avatar-placeholder" alt="My Neural Avatar" />
            </div>
            <h3 className="font-bold text-lg">Dr. West</h3>
            <span className="text-xs text-blue-400">Master Architect</span>
          </div>
          
          <nav className="space-y-4">
            <button className="w-full text-left p-3 hover:bg-[#111] rounded-lg transition">?? Training Center</button>
            <button className="w-full text-left p-3 hover:bg-[#111] rounded-lg transition">?? Growth Stats</button>
            <button className="w-full text-left p-3 hover:bg-[#111] rounded-lg transition">?? Social Feed</button>
          </nav>
        </div>
        
        <div className="p-4 bg-blue-900/10 rounded-xl border border-blue-500/20">
          <p className="text-[10px] uppercase text-blue-500 mb-1">Live Connection</p>
          <div className="flex -space-x-2">
            {[1,2,3].map(i => <div key={i} className="w-6 h-6 rounded-full bg-gray-700 border border-black" />)}
            <span className="text-[10px] ml-4 self-center">+12 Online</span>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto relative p-8">
        <TokenWhistle />
        <div className="max-w-5xl mx-auto">
          {children}
        </div>
        <div className="fixed bottom-8 right-8">
          <NeuralPulse active={false} />
        </div>
      </main>
    </div>
  );
}
