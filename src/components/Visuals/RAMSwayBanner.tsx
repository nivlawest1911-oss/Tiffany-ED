'use client';
import { Shield, BookOpen, Users } from 'lucide-react';

export default function RAMSwayBanner() {
  return (
    <div className="bg-white/10 backdrop-blur-md border-y border-white/20 p-4 my-8">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-8 text-[10px] tracking-[0.2em] uppercase font-bold text-white/80">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-blue-400" />
          <span>Respectful</span>
        </div>
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-blue-400" />
          <span>Accountable</span>
        </div>
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-blue-400" />
          <span>Motivated</span>
        </div>
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-blue-400" />
          <span>Successful</span>
        </div>
      </div>
    </div>
  );
}
