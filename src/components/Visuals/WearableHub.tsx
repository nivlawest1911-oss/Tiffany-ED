'use client';
import { Glasses, Gamepad2, Share2 } from 'lucide-react';

export default function WearableHub() {
  return (
    <div className="mt-10 p-8 bg-gradient-to-r from-[#001A33] to-[#003865] rounded-[3rem] border border-cyan-500/30">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-white font-black uppercase text-xl italic tracking-tighter">Wearable Command Active</h3>
          <p className="text-cyan-400 text-[9px] uppercase font-bold tracking-[0.3em]">Hardware: Meta Ray-Ban | VR: Oculus/VisionPro</p>
        </div>
        <div className="flex gap-4">
          <button className="p-4 bg-cyan-500/20 rounded-full hover:bg-cyan-500/40 border border-cyan-500/50 transition-all">
            <Glasses className="w-6 h-6 text-cyan-400" />
          </button>
          <button className="p-4 bg-purple-500/20 rounded-full hover:bg-purple-500/40 border border-purple-500/50 transition-all">
            <Gamepad2 className="w-6 h-6 text-purple-400" />
          </button>
        </div>
      </div>
    </div>
  );
}
