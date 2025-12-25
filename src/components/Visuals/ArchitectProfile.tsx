'use client';
import { Linkedin, Twitter, Facebook, Youtube, Instagram, MessageSquare, ExternalLink } from 'lucide-react';

export default function ArchitectProfile() {
  const socials = [
    { name: 'LinkedIn', icon: <Linkedin />, url: 'https://linkedin.com/in/nivlawest1911' },
    { name: 'Twitter', icon: <Twitter />, url: 'https://twitter.com/nivlawest1911' },
    { name: 'Facebook', icon: <Facebook />, url: 'https://facebook.com/nivlawest1911' },
    { name: 'Instagram', icon: <Instagram />, url: 'https://instagram.com/nivlawest1911' },
    { name: 'TikTok', icon: <MessageSquare />, url: 'https://tiktok.com/@nivlawest1911' },
    { name: 'YouTube', icon: <Youtube />, url: 'https://youtube.com/@nivlawest1911' },
    { name: 'Snapchat', icon: <MessageSquare />, url: 'https://snapchat.com/add/nivlawest1911' }
  ];

  return (
    <div className="p-8 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl">
      <h3 className="text-[#FFD700] font-bold uppercase tracking-widest mb-2">Lead Systems Architect</h3>
      <h2 className="text-3xl font-light mb-6">Nivla West</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {socials.map((social) => (
          <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" 
             className="flex items-center gap-3 p-3 bg-white/5 rounded-lg hover:bg-blue-500/20 transition-all group">
            <span className="text-white/40 group-hover:text-white transition-colors">{social.icon}</span>
            <span className="text-xs font-medium uppercase tracking-tighter">{social.name}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
