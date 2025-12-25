'use client';
import { PlayCircle, Shield, Truck, BarChart, FileText } from 'lucide-react';

export default function MediaCommandHub() {
  return (
    <div className="space-y-8 animate-in fade-in duration-1000">
      {/* Cinematic Hero Section */}
      <div className="relative h-[400px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-black">
        <div className="absolute inset-0 bg-gradient-to-t from-[#001A33] via-transparent to-transparent z-10" />
        {/* LOGO & TITLE OVERLAY */}
        <div className="absolute bottom-10 left-10 z-20">
          <div className="flex items-center gap-6">
             <div className="w-24 h-24 rounded-full border-2 border-blue-500/50 p-1 backdrop-blur-md">
                <img src="/logo.png" alt="EdIntel Logo" className="w-full h-full object-contain" />
             </div>
             <div>
                <h1 className="text-6xl font-black text-white tracking-tighter">EdIntel</h1>
                <p className="text-blue-400 font-bold tracking-[0.4em] uppercase text-sm">Mobile County Regional Command</p>
             </div>
          </div>
        </div>
      </div>

      {/* MULTIMEDIA DATA TILES */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 hover:border-blue-500/50 transition-all">
          <Truck className="w-8 h-8 text-[#FFD700] mb-4" />
          <h4 className="text-white/40 text-[10px] uppercase font-black tracking-widest">Logistics Command</h4>
          <p className="text-white text-lg font-bold">Class A CDL Optimized</p>
        </div>
        
        <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 hover:border-blue-500/50 transition-all">
          <Shield className="w-8 h-8 text-green-400 mb-4" />
          <h4 className="text-white/40 text-[10px] uppercase font-black tracking-widest">Sovereign Standard</h4>
          <p className="text-white text-lg font-bold">nivlawest1911</p>
        </div>

        <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 hover:border-blue-500/50 transition-all">
          <BarChart className="w-8 h-8 text-cyan-400 mb-4" />
          <h4 className="text-white/40 text-[10px] uppercase font-black tracking-widest">Fiscal Logic</h4>
          <p className="text-white text-lg font-bold">DBA/MBA ROI Engine</p>
        </div>

        <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 hover:border-blue-500/50 transition-all">
          <FileText className="w-8 h-8 text-purple-400 mb-4" />
          <h4 className="text-white/40 text-[10px] uppercase font-black tracking-widest">Science Stack</h4>
          <p className="text-white text-lg font-bold">MS / MS / BS Credentials</p>
        </div>
      </div>
    </div>
  );
}
