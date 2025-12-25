'use client';
import { Bot, Sparkles, Activity, Zap } from 'lucide-react';

export default function EdIntelAIAgent() {
  return (
    <div className="relative group bg-gradient-to-br from-[#001A33] to-black border border-white/10 rounded-[2.5rem] p-10 shadow-2xl overflow-hidden mt-12">
      {/* Dynamic Background Pulse */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
      
      <div className="relative z-10 flex flex-col lg:flex-row gap-12 items-center">
        {/* DR. WEST AI AVATAR SLOT */}
        <div className="relative">
          <div className="w-32 h-32 rounded-full border-2 border-[#FFD700] p-1 shadow-[0_0_20px_rgba(255,215,0,0.3)]">
            <div className="w-full h-full rounded-full bg-blue-900 flex items-center justify-center overflow-hidden">
              <img src="/avatar-dr-west.png" alt="AI Agent West" className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="absolute -bottom-2 -right-2 bg-green-500 w-6 h-6 rounded-full border-4 border-black" />
        </div>

        <div className="flex-1 text-center lg:text-left">
          <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
            <Bot className="text-blue-400 w-6 h-6" />
            <h3 className="text-[#FFD700] font-black uppercase tracking-[0.4em] text-xs">Sovereign Intelligence Active</h3>
          </div>
          <h2 className="text-3xl font-light text-white mb-4 italic">"Dr. West, the Vigor Feeder Pattern shows a 12% rise in ROI readiness."</h2>
          <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
            <span className="px-4 py-2 bg-white/5 rounded-full text-[10px] text-white/60 border border-white/10 flex items-center gap-2">
              <Zap className="w-3 h-3 text-blue-400" /> Real-time Logistics Analysis
            </span>
            <span className="px-4 py-2 bg-white/5 rounded-full text-[10px] text-white/60 border border-white/10 flex items-center gap-2">
              <Activity className="w-3 h-3 text-green-400" /> FERPA-Safe Neural Processing
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
