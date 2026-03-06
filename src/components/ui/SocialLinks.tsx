'use client';
import Link from 'next/link';
import {
    Linkedin,
    Facebook,
    Youtube,
    Globe,
    Video
} from 'lucide-react';

import { SOCIAL_LINKS } from '@/config/socials';

export default function SocialLinks() {
    const socials = [
        { icon: <Facebook size={18} />, label: 'Facebook', href: SOCIAL_LINKS.FACEBOOK, color: 'hover:text-blue-600' },
        { icon: <Video size={18} />, label: 'TikTok', href: SOCIAL_LINKS.TIKTOK, color: 'hover:text-pink-500' },
        { icon: <Linkedin size={18} />, label: 'LinkedIn', href: SOCIAL_LINKS.LINKEDIN, color: 'hover:text-blue-500' }, // Updated Link
        { icon: <Youtube size={18} />, label: 'YouTube', href: SOCIAL_LINKS.YOUTUBE, color: 'hover:text-red-500' },
    ];


    return (
        <div className="flex flex-wrap items-center gap-6 mt-12 pt-8 border-t border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center gap-4 text-zinc-500 mr-4 border-r border-zinc-200 dark:border-zinc-800 pr-4">
                <div className="flex items-center gap-2">
                    <Globe size={14} />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">Global Presence</span>
                </div>
                <Link href="/pricing" className="text-[10px] font-bold uppercase tracking-widest hover:text-emerald-500 transition-colors">
                    Sales Protocol
                </Link>
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
                EdIntel Professional Suite v4.0.2
            </div>
        </div>
    );
}
