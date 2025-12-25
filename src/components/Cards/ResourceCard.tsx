'use client';
import { ExternalLink } from 'lucide-react';
interface ResourceProps { title: string; url: string; }
export default function ResourceCard({ title, url }: ResourceProps) {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="p-6 bg-white/5 border border-white/10 rounded-xl hover:border-blue-500/50 transition-all group block">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-light tracking-tight">{title}</h3>
        <ExternalLink className="w-4 h-4 text-white/20 group-hover:text-blue-400 transition-colors" />
      </div>
    </a>
  );
}
