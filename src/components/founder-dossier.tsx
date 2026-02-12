'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Briefcase,
  Globe,
  GraduationCap,
  Linkedin,
  Mail,
  Play,
  Pause,
  Twitter,
  Activity,
  Cpu
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

// Credentials Data
const CREDENTIALS = [
  { degree: "DBA", field: "Analytic Finance", school: "Valar Institute" },
  { degree: "MBA", field: "Corporate Finance", school: "Quantic School of Business and Technology" },
  { degree: "M.Ed", field: "Educational Leadership", school: "High Tech High Graduate School of Education" },
  { degree: "M.Ed", field: "Special Education & Collab. Teaching", school: "University of South Alabama" },
  { degree: "BS", field: "Psychology", school: "University of Mobile" },
  { degree: "Cert", field: "Mathematics Instructor", school: "State Department of Education" }
];

const EXPERIENCE = [
  { role: "Founder & CEO", org: "EdIntel OS", year: "2024-Present" },
  { role: "District Administrator", org: "Mobile County Public Schools", year: "2018-2024" },
  { role: "Strategic Consultant", org: "EdIntel Intelligence", year: "2020-Present" }
];

const SOCIAL_LINKS = [
  { icon: Linkedin, href: "https://www.linkedin.com/in/alvin-west-ii-dba-11a75323/", label: "LinkedIn" },
  { icon: Twitter, href: "https://x.com/AlvinWe53959439", label: "Twitter" },
  { icon: Globe, href: "https://nivlawest1911.wixsite.com/website", label: "Website" },
  { icon: Mail, href: "mailto:dralvinwest@transcendholisticwellness.com", label: "Contact" }
];

export default function FounderDossier() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleAudio = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(err => {
          console.error("Audio playback error:", err);
          setIsPlaying(false);
        });
      }
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      audioRef.current = new Audio('/voice-profiles/principal_voice.wav');
      audioRef.current.onended = () => setIsPlaying(false);
      audioRef.current.load();
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-slate-950/50" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-noble-gold/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-amber-900/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container relative z-10 mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-start">

          {/* Left Column: Visual Profile */}
          <motion.div
            initial={{ opacity: 1, x: 0 }}
            className="w-full lg:w-1/3 relative"
          >
            {/* Holographic Card Effect */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-noble-gold to-amber-600 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000" />
              <div className="relative bg-zinc-900/90 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden p-2">
                <div className="aspect-[4/5] relative rounded-2xl overflow-hidden">
                  {/* Founder Image */}
                  <Image
                    src="/images/avatars/Dr._alvin_west.png"
                    alt="Dr. Alvin West, Jr."
                    fill
                    priority={true}
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />

                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />

                  {/* Name & Title Overlay */}
                  <div className="absolute bottom-0 left-0 w-full p-6">
                    <h2 className="text-3xl font-black text-white mb-1 uppercase tracking-tighter">Dr. Alvin West, Jr.</h2>
                    <div className="flex items-center gap-2 text-noble-gold font-black uppercase tracking-widest text-[10px]">
                      <Activity size={14} className="animate-pulse" />
                      <span>Founder & CEO // EdIntel OS</span>
                    </div>
                  </div>
                </div>

                {/* Voice Profile Control */}
                <div className="p-4 bg-white/5 mt-2 rounded-xl flex items-center justify-between group/audio hover:bg-white/10 transition-all cursor-pointer border border-white/5" onClick={toggleAudio}>
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${isPlaying ? 'bg-noble-gold text-black scale-110 shadow-[0_0_20px_rgba(212,175,55,0.4)]' : 'bg-white/10 text-noble-gold'}`}>
                      {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="ml-1" />}
                    </div>
                    <div>
                      <div className="text-[10px] font-black text-noble-gold uppercase tracking-[0.2em]">Voice Profile</div>
                      <div className="text-xs text-white font-bold uppercase tracking-widest">Authorized Briefing</div>
                    </div>
                  </div>
                  <div className="flex gap-0.5 items-end h-6">
                    {[1, 2, 3, 4, 5, 4, 3, 2, 1].map((h, i) => (
                      <motion.div
                        key={i}
                        animate={isPlaying ? { height: [4, 16, 4] } : { height: 4 }}
                        transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                        className={`w-1 rounded-full ${isPlaying ? 'bg-noble-gold shadow-[0_0_8px_#D4AF37]' : 'bg-zinc-700'}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 mt-8 justify-center">
              {SOCIAL_LINKS.map((link, i) => (
                <Link
                  key={i}
                  href={link.href}
                  target="_blank"
                  className="w-12 h-12 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center text-slate-400 hover:text-noble-gold hover:border-noble-gold/50 hover:bg-noble-gold/10 transition-all duration-300"
                >
                  <link.icon size={20} />
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Dossier Content */}
          <div className="w-full lg:w-2/3">
            {/* Header */}
            <div className="mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-noble-gold/10 border border-noble-gold/20 text-noble-gold text-[10px] font-black uppercase tracking-[0.3em] mb-4">
                <Cpu size={12} />
                <span>Subject Profile</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight uppercase tracking-tighter italic">
                Architecting <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-noble-gold to-white">Intelligence</span>
              </h2>
              <p className="text-lg text-zinc-400 leading-relaxed max-w-2xl font-medium italic">
                Dr. West combines over two decades of educational leadership with advanced expertise in analytic finance and cognitive psychology. His mission is to dismantle the "digital sharecropping" model of EdTech and empower districts with true technological intelligence.
              </p>
            </div>

            {/* Credentials Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-zinc-900/50 border border-white/5 rounded-2xl p-8 hover:border-noble-gold/30 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-noble-gold/10 flex items-center justify-center text-noble-gold mb-6 border border-noble-gold/20">
                  <GraduationCap size={24} />
                </div>
                <h3 className="text-xl font-black text-white mb-6 uppercase tracking-widest italic border-b border-white/5 pb-2">Academic Credentials</h3>
                <ul className="space-y-4">
                  {CREDENTIALS.map((cred, i) => (
                    <li key={i} className="flex items-start gap-4 text-xs group/item">
                      <div className="w-2 h-2 rounded-full bg-white/10 mt-1 shadow-[0_0_8px_rgba(255,255,255,0.1)] group-hover/item:bg-noble-gold transition-colors" />
                      <div className="flex flex-col">
                        <span className="text-white font-black tracking-widest uppercase">{cred.degree}</span>
                        <span className="text-zinc-500 font-bold text-[10px] uppercase tracking-wider">{cred.field}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <div
                className="bg-zinc-900/50 border border-white/5 rounded-2xl p-8 hover:border-amber-500/30 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500 mb-6 border border-amber-500/20">
                  <Briefcase size={24} />
                </div>
                <h3 className="text-xl font-black text-white mb-6 uppercase tracking-widest italic border-b border-white/5 pb-2">Operational History</h3>
                <ul className="space-y-4">
                  {EXPERIENCE.map((exp, i) => (
                    <li key={i} className="flex items-center justify-between text-[11px] group border-b border-white/5 pb-3 last:border-0 last:pb-0">
                      <span className="text-zinc-300 font-black uppercase tracking-widest group-hover:text-white transition-colors">{exp.role}</span>
                      <span className="text-zinc-600 font-bold uppercase tracking-widest text-[9px]">{exp.year}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Quote/Vision */}
            <div className="relative pl-8 border-l-4 border-noble-gold/30 py-4">
              <p className="text-2xl text-zinc-300 italic font-light mb-4 leading-relaxed">
                "We are not waiting for permission to innovate. We are building the infrastructure that makes permission irrelevant."
              </p>
              <div className="text-[10px] font-black text-noble-gold uppercase tracking-[0.4em]">
                — Classified Directive 001 // EdIntel Founder
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
