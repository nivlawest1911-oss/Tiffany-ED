'use client';

import { Mail, Calendar, MessageSquare, ShieldCheck, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function DrWestAuthority() {
    return (
        <section className="relative py-24 px-4 overflow-hidden bg-black">
            <div className="absolute inset-0 bg-gradient-to-b from-noble-gold/[0.03] to-transparent pointer-events-none" />
            
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
                
                {/* Visual Image Node */}
                <div className="lg:w-1/2 relative group">
                    <div className="absolute inset-0 bg-noble-gold/20 blur-[120px] rounded-full opacity-20 group-hover:opacity-40 transition-opacity" />
                    <div className="relative liquid-glass p-1 border-noble-gold/30 rounded-[3rem] overflow-hidden shadow-[0_0_80px_rgba(212,175,55,0.1)]">
                        <Image 
                            src="/images/avatars/dr_alvin_west_official.png" 
                            alt="Dr. Alvin West"
                            width={800}
                            height={800}
                            className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000"
                        />
                        
                        {/* HUD Labels */}
                        <div className="absolute bottom-10 left-10 border-l-2 border-noble-gold pl-6 py-2 bg-black/40 backdrop-blur-md">
                            <h4 className="text-white font-black uppercase text-xl tracking-[0.2em] italic">Architect Node</h4>
                            <p className="text-noble-gold text-[10px] uppercase font-black tracking-[0.4em]">EdIntel Executive Architect</p>
                        </div>
                    </div>
                </div>

                {/* Information Content */}
                <div className="lg:w-1/2 flex flex-col items-start text-left">
                    <div className="flex items-center gap-4 mb-8">
                        <span className="h-px w-12 bg-noble-gold/40" />
                        <span className="text-[12px] font-black text-noble-gold uppercase tracking-[0.5em]">Leadership & Authority</span>
                    </div>

                    <h2 className="text-5xl lg:text-7xl font-black text-white italic uppercase tracking-tighter leading-none mb-8">
                        Dr. Alvin West
                    </h2>
                    
                    <p className="text-xl text-white/70 font-mono leading-relaxed mb-12 max-w-2xl">
                        A recognized leader in Mobile County education and emotional intelligence, Dr. West specializes in synchronizing human systems with artificial strategy. 
                        Owner of <span className="text-noble-gold">Transcend Holistic Wellness</span>, his methodologies have redefined district-level performance across the Alabama Gulf Coast.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mb-12">
                        <div className="p-6 bg-white/5 border border-white/10 rounded-2xl flex flex-col gap-3">
                            <ShieldCheck className="text-noble-gold" size={24} />
                            <h5 className="text-white font-black uppercase text-xs tracking-widest leading-none">FERPA Certified Architect</h5>
                            <p className="text-white/40 text-[10px] uppercase tracking-widest leading-relaxed">System-wide data protection and compliance strategy.</p>
                        </div>
                        <div className="p-6 bg-white/5 border border-white/10 rounded-2xl flex flex-col gap-3">
                            <MessageSquare className="text-noble-gold" size={24} />
                            <h5 className="text-white font-black uppercase text-xs tracking-widest leading-none">Strategic Intelligence</h5>
                            <p className="text-white/40 text-[10px] uppercase tracking-widest leading-relaxed">Converting complex data clusters into actionable district roadmaps.</p>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-4 w-full">
                        <Link 
                            href="/contact"
                            className="flex-1 min-w-[240px] EdIntel-button bg-white text-black py-5 text-[12px] group"
                        >
                            <Calendar size={18} className="mr-3" />
                            Book Executive Consultation
                            <ChevronRight size={16} className="ml-auto group-hover:translate-x-2 transition-transform" />
                        </Link>
                        <button 
                            className="flex items-center justify-center p-5 liquid-glass border-white/10 text-white/50 hover:text-white transition-all"
                            aria-label="Email Executive Office"
                        >
                            <Mail size={18} />
                        </button>
                    </div>
                </div>

            </div>
        </section>
    );
}
