'use client';
import { useState } from 'react';

export default function AvatarCreator() {
  const [style, setStyle] = useState('tech');
  
  return (
    <div className="glass-card p-8 bg-[#0a0a0a] border border-[#222] rounded-3xl">
      <h2 className="text-2xl font-bold mb-6 gradient-text">Design Your Neural Avatar</h2>
      <div className="grid grid-cols-2 gap-8">
        <div className="aspect-square bg-[#111] rounded-2xl flex items-center justify-center border-2 border-dashed border-[#333]">
           <p className="text-gray-600">Avatar Preview Loading...</p>
        </div>
        <div className="space-y-4">
          <div>
            <label className="text-xs uppercase text-gray-500">Aura Style</label>
            <div className="flex gap-2 mt-2">
              {['Tech', 'Organic', 'Cosmic'].map(s => (
                <button key={s} onClick={() => setStyle(s)} className="px-4 py-2 rounded-full border border-[#333] text-sm hover:border-blue-500 transition">{s}</button>
              ))}
            </div>
          </div>
          <button className="w-full py-4 bg-blue-600 rounded-xl font-bold mt-10 hover:bg-blue-500 shadow-lg shadow-blue-900/20">
            Sync Identity to District
          </button>
        </div>
      </div>
    </div>
  );
}
