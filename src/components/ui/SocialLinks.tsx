'use client';
import {
    Twitter,
    Linkedin,
    Facebook,
    Instagram,
    Youtube,
    Globe,
    Github
} from 'lucide-react';

export default function SocialLinks() {
    const socials = [
        { icon: <Twitter size={18} />, label: 'X (Twitter)', href: 'https://twitter.com', color: 'hover:text-sky-400' },
        { icon: <Linkedin size={18} />, label: 'LinkedIn', href: 'https://linkedin.com', color: 'hover:text-blue-600' },
        { icon: <Youtube size={18} />, label: 'YouTube', href: 'https://youtube.com', color: 'hover:text-red-500' },
        { icon: <Instagram size={18} />, label: 'Instagram', href: 'https://instagram.com', color: 'hover:text-pink-500' },
        { icon: <Github size={18} />, label: 'GitHub', href: 'https://github.com', color: 'hover:text-zinc-100' },
    ];


    return (
        <div className="flex flex-wrap items-center gap-6 mt-12 pt-8 border-t border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center gap-2 text-zinc-500 mr-4">
                <Globe size={14} />
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">Global Presence</span>
            </div>
            {socials.map((social, i) => (
                <a
                    key={i}
                    href={social.href}
                    className={`flex items-center gap-2 text-zinc-500 transition-all duration-300 ${social.color} hover:scale-110`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {social.icon}
                    <span className="text-[10px] font-bold uppercase tracking-widest hidden sm:inline">{social.label}</span>
                </a>
            ))}
            <div className="ml-auto text-[9px] font-mono text-zinc-500 uppercase tracking-widest">
                EdIntel Sovereign Suite v4.0.2
            </div>
        </div>
    );
}
