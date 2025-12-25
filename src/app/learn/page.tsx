'use client';
'use client';
import { useState } from 'react';
import { Play, BookOpen, UserCheck, Share2 } from 'lucide-react';

export default function NeuralLearningVault() {
  const [activeVideo, setActiveVideo] = useState("Introduction to Cognitive Fitness");

  const modules = [
    { title: "Neuroplasticity 101", duration: "5:20", status: "Completed" },
    { title: "The Literacy-to-Liberation Arc", duration: "8:45", status: "In Progress" },
    { title: "Managing Emotional Load", duration: "12:10", status: "Locked" }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6 bg-[#050505] min-h-screen text-white">
      {/* Main Video Player */}
      <div className="lg:col-span-2 space-y-6">
        <div className="aspect-video bg-[#111] rounded-3xl border border-[#222] relative overflow-hidden flex items-center justify-center group cursor-pointer">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          <Play size={64} className="text-blue-500 group-hover:scale-110 transition-transform" />
          
          {/* Avatar Coaching Overlay */}
          <div className="absolute bottom-4 right-4 w-32 h-32 rounded-full border-2 border-blue-500 bg-[#0a0a0a] overflow-hidden shadow-2xl">
             <img src="/api/avatar-coach" alt="AI Tutor" className="w-full h-full object-cover" />
             <div className="absolute bottom-0 w-full bg-blue-600/80 text-[8px] text-center py-1">AI TUTOR LIVE</div>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">{activeVideo}</h1>
          <div className="flex gap-4">
            <button className="flex items-center gap-2 bg-[#111] px-4 py-2 rounded-lg border border-[#333] hover:text-blue-400">
              <Share2 size={18} /> Share Progress
            </button>
          </div>
        </div>
      </div>

      {/* Module Sidebar */}
      <div className="bg-[#0a0a0a] rounded-3xl border border-[#222] p-6 space-y-4">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <BookOpen className="text-blue-500" /> Course Modules
        </h3>
        {modules.map((m) => (
          <div key={m.title} className="p-4 bg-[#111] rounded-2xl border border-[#222] hover:border-blue-500 transition cursor-pointer">
            <div className="flex justify-between items-start mb-2">
              <span className="text-sm font-semibold">{m.title}</span>
              <span className="text-[10px] bg-blue-900/30 text-blue-400 px-2 py-1 rounded-full">{m.duration}</span>
            </div>
            <div className="flex items-center gap-2 text-[10px] text-gray-500">
              <UserCheck size={12} className={m.status === "Completed" ? "text-green-500" : "text-gray-600"} />
              {m.status}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
