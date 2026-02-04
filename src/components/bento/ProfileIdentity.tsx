'use client';
import { Linkedin, BookOpen, GraduationCap, Award, ChevronRight } from 'lucide-react';
import { SOCIAL_HUB_AVATAR } from '@/lib/assets';
import Image from 'next/image';

export default function ProfileIdentity() {
    return (
        <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-zinc-900 to-black border border-zinc-800 shadow-2xl relative overflow-hidden group">
            {/* Ambient Background */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-900/20 blur-[80px] rounded-full pointer-events-none" />

            <div className="relative z-10">
                <div className="flex items-start justify-between mb-8">
                    <div className="flex gap-4">
                        <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-zinc-700 shadow-lg relative group-hover:border-cyan-500 transition-colors">
                            <Image
                                src={SOCIAL_HUB_AVATAR}
                                alt="Dr. Alvin West II, DBA"
                                width={80}
                                height={80}
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                            />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
                                Dr. Alvin West II <span className="text-cyan-500 text-sm align-top">DBA, Ph.D., MBA</span>
                                <div className="w-5 h-5 rounded-full bg-cyan-500/20 flex items-center justify-center border border-cyan-500/50" title="Verified Executive">
                                    <div className="w-2 h-2 bg-cyan-500 rounded-full" />
                                </div>
                            </h2>
                            <p className="text-sm font-mono text-zinc-400">Chief AI Architect & Strategic Superintendent</p>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {['Outlier AI', 'Transcend Wellness', 'FUSE Coordinator', 'Certified Editor'].map(role => (
                                    <span key={role} className="px-2 py-0.5 rounded bg-blue-900/10 text-blue-400 text-[9px] font-bold uppercase tracking-wider border border-blue-800/30">{role}</span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <a href="https://www.linkedin.com/in/alvin-west-ii-dba-11a75323" target="_blank" rel="noopener noreferrer"
                        className="p-3 bg-[#0077b5] text-white rounded-xl hover:scale-105 transition-transform shadow-lg shadow-blue-900/20">
                        <Linkedin size={20} />
                    </a>
                </div>

                <div className="space-y-6">
                    {/* Education Section */}
                    <div className="p-4 rounded-2xl bg-zinc-800/30 border border-zinc-700/50">
                        <h3 className="text-xs font-black text-zinc-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                            <GraduationCap size={12} /> Confirmed Academics
                        </h3>
                        <div className="space-y-3">
                            <div>
                                <p className="text-xs text-zinc-300 font-bold">Doctor of Business Administration (DBA) - Finance</p>
                                <p className="text-[10px] text-zinc-500 italic">Academic Residencies: Tampa (2), Orlando (3), Atlanta (3) - Fiscal Peer Reviews, IRB, BCI/AI Twin Research</p>
                            </div>
                            <div>
                                <p className="text-xs text-zinc-300 font-bold">Master of Business Administration (MBA) - Corporate Finance</p>
                            </div>
                            <div>
                                <p className="text-xs text-zinc-300 font-bold">Bachelor of Science</p>
                            </div>
                        </div>
                    </div>

                    {/* Certifications & Licenses */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-2xl bg-zinc-800/30 border border-zinc-700/50">
                            <h3 className="text-xs font-black text-zinc-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                                <Award size={12} /> Certifications
                            </h3>
                            <div className="flex flex-wrap gap-1.5">
                                {['Class A CDL (Passenger)', 'Academic Editor', 'AI Developer', 'Prompt Engineer', 'School Safety Admin'].map(cert => (
                                    <span key={cert} className="px-1.5 py-0.5 bg-emerald-900/20 text-emerald-400 text-[9px] rounded font-medium border border-emerald-900/30">{cert}</span>
                                ))}
                            </div>
                        </div>

                        <div className="p-4 rounded-2xl bg-zinc-800/30 border border-zinc-700/50">
                            <h3 className="text-xs font-black text-zinc-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                                <BookOpen size={12} /> Teaching Matrix
                            </h3>
                            <div className="flex flex-wrap gap-1.5">
                                {['Special Ed', 'Gifted', 'Math', 'Biology', 'Business', 'Alternative'].map(subject => (
                                    <span key={subject} className="px-1.5 py-0.5 bg-indigo-900/20 text-indigo-400 text-[9px] rounded font-medium border border-indigo-900/30">{subject}</span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Leadership & Settings */}
                    <div className="p-4 rounded-2xl bg-zinc-800/30 border border-zinc-700/50">
                        <h3 className="text-xs font-black text-zinc-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                            <Award size={12} /> Leadership Architecture
                        </h3>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-[10px] text-zinc-400">
                            <div className="flex items-center gap-2"><div className="w-1 h-1 bg-zinc-500 rounded-full" />Chair of Special Programs</div>
                            <div className="flex items-center gap-2"><div className="w-1 h-1 bg-zinc-500 rounded-full" />Chair of Mathematics</div>
                            <div className="flex items-center gap-2"><div className="w-1 h-1 bg-zinc-500 rounded-full" />Chair of Gifted Education</div>
                            <div className="flex items-center gap-2"><div className="w-1 h-1 bg-zinc-500 rounded-full" />FUSE Program Coordinator</div>
                            <div className="flex items-center gap-2"><div className="w-1 h-1 bg-zinc-500 rounded-full" />Model, Magnet, Virtual & Rural settings</div>
                            <div className="flex items-center gap-2"><div className="w-1 h-1 bg-zinc-500 rounded-full" />EdIntel Application Builder</div>
                        </div>
                    </div>

                </div>

                <div className="mt-8 pt-6 border-t border-zinc-800 flex justify-between items-center">
                    <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">Director // ID: 11A75323</p>
                    <button className="text-xs font-bold text-cyan-500 flex items-center gap-1 hover:gap-2 transition-all uppercase tracking-wider">
                        View Full Dossier <ChevronRight size={12} />
                    </button>
                </div>
            </div>
        </div>
    );
}
