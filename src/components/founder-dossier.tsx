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
  Award,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

// Credentials Data
const CREDENTIALS = [
  { degree: "DBA", field: "Analytic Finance", school: "Valar Institute" },
  { degree: "MBA", field: "Corporate Finance", school: "Quantic School of Business" },
  { degree: "M.Ed", field: "Educational Leadership", school: "High Tech High GSE" },
  { degree: "M.Ed", field: "Special Education", school: "University of South Alabama" },
  { degree: "BS", field: "Psychology", school: "University of Mobile" },
];

const EXPERIENCE = [
  { role: "Founder & CEO", org: "EdIntel OS", year: "2024-Present", highlight: true },
  { role: "District Administrator", org: "Mobile County Public Schools", year: "2018-2024" },
  { role: "Strategic Consultant", org: "EdIntel Intelligence", year: "2020-Present" }
];

const SOCIAL_LINKS = [
  { icon: Linkedin, href: "https://www.linkedin.com/in/alvin-west-ii-dba-11a75323/", label: "LinkedIn", color: "hover:text-blue-500 hover:border-blue-500/50" },
  { icon: Twitter, href: "https://x.com/AlvinWe53959439", label: "Twitter", color: "hover:text-sky-400 hover:border-sky-400/50" },
  { icon: Globe, href: "https://nivlawest1911.wixsite.com/website", label: "Website", color: "hover:text-emerald-400 hover:border-emerald-400/50" },
  { icon: Mail, href: "mailto:dralvinwest@transcendholisticwellness.com", label: "Contact", color: "hover:text-noble-gold hover:border-noble-gold/50" }
];

const ACHIEVEMENTS = [
  "20+ Years Educational Leadership",
  "Published Researcher",
  "5000+ IEP Strategies Implemented",
  "District-Wide AI Integration Pioneer"
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
    <section className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-black" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-noble-gold/5 rounded-full blur-[150px] pointer-events-none" />
      
      {/* Decorative Lines */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-noble-gold/20 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-noble-gold/20 to-transparent" />

      <div className="container relative z-10 mx-auto px-6 max-w-7xl">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-noble-gold/10 border border-noble-gold/20 text-noble-gold text-[10px] font-black uppercase tracking-[0.3em] mb-6">
            <Award size={14} />
            <span>Meet the Founder</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 tracking-tight">
            Dr. Alvin West
          </h2>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            Founder & CEO of EdIntel - Transforming education through AI-powered intelligence systems
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Visual Profile */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 relative"
          >
            {/* Profile Card */}
            <div className="relative group">
              {/* Glow Effect */}
              <div className="absolute -inset-2 bg-gradient-to-r from-noble-gold/30 via-amber-500/20 to-noble-gold/30 rounded-[2rem] blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
              
              <div className="relative bg-zinc-900/80 backdrop-blur-xl border border-white/10 rounded-[2rem] overflow-hidden">
                {/* Image Container */}
                <div className="aspect-[4/5] relative overflow-hidden">
                  <Image
                    src="/dr-alvin-west.jpg"
                    alt="Dr. Alvin West - Founder & CEO of EdIntel"
                    fill
                    priority={true}
                    className="object-cover object-top transition-transform duration-1000 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 40vw"
                  />
                  
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-transparent opacity-90" />
                  
                  {/* Status Badge */}
                  <div className="absolute top-6 left-6 flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 backdrop-blur-sm">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-emerald-400 text-[10px] font-bold uppercase tracking-wider">Available for Consultation</span>
                  </div>

                  {/* Name & Title Overlay */}
                  <div className="absolute bottom-0 left-0 w-full p-8">
                    <div className="flex items-center gap-3 mb-2">
                      <Activity size={16} className="text-noble-gold animate-pulse" />
                      <span className="text-noble-gold text-[10px] font-black uppercase tracking-[0.3em]">Chief Intelligence Architect</span>
                    </div>
                    <h3 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-3">
                      Dr. Alvin West
                    </h3>
                    <p className="text-zinc-400 text-sm leading-relaxed max-w-md">
                      DBA in Analytic Finance | MBA | M.Ed in Educational Leadership | Special Education Specialist
                    </p>
                  </div>
                </div>

                {/* Voice Profile Control */}
                <div className="p-4 border-t border-white/5">
                  <button 
                    className="w-full p-4 bg-white/5 rounded-xl flex items-center justify-between group/audio hover:bg-noble-gold/10 transition-all border border-white/5 hover:border-noble-gold/30" 
                    onClick={toggleAudio}
                    aria-label={isPlaying ? "Pause voice briefing" : "Play voice briefing"}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${isPlaying ? 'bg-noble-gold text-black scale-110 shadow-[0_0_30px_rgba(212,175,55,0.5)]' : 'bg-zinc-800 text-noble-gold'}`}>
                        {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-0.5" />}
                      </div>
                      <div className="text-left">
                        <div className="text-[10px] font-black text-noble-gold uppercase tracking-[0.2em]">Voice Profile</div>
                        <div className="text-sm text-white font-semibold">Listen to Introduction</div>
                      </div>
                    </div>
                    <div className="flex gap-0.5 items-end h-8" aria-hidden="true">
                      {[1, 2, 3, 4, 5, 4, 3, 2, 1].map((_, i) => (
                        <motion.div
                          key={i}
                          animate={isPlaying ? { height: [4, 20, 4] } : { height: 4 }}
                          transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.08 }}
                          className={`w-1 rounded-full ${isPlaying ? 'bg-noble-gold shadow-[0_0_8px_#D4AF37]' : 'bg-zinc-700'}`}
                        />
                      ))}
                    </div>
                  </button>
                </div>

                {/* Social Links */}
                <div className="p-4 pt-0">
                  <div className="flex gap-3 justify-center">
                    {SOCIAL_LINKS.map((link, i) => (
                      <Link
                        key={i}
                        href={link.href}
                        target="_blank"
                        aria-label={link.label}
                        className={`w-11 h-11 rounded-xl bg-zinc-800/50 border border-white/10 flex items-center justify-center text-zinc-500 transition-all duration-300 ${link.color}`}
                      >
                        <link.icon size={18} />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Dossier Content */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 space-y-8"
          >
            {/* Mission Statement */}
            <div className="relative p-8 rounded-2xl bg-gradient-to-br from-zinc-900/80 to-zinc-950/80 border border-white/5 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-noble-gold/5 rounded-full blur-[60px]" />
              <h4 className="text-[11px] font-black text-noble-gold uppercase tracking-[0.3em] mb-4">Mission</h4>
              <p className="text-xl md:text-2xl text-white font-light leading-relaxed italic relative z-10">
                &ldquo;We are not waiting for permission to innovate. We are building the infrastructure that makes permission irrelevant.&rdquo;
              </p>
              <p className="text-sm text-zinc-500 mt-4 font-medium">
                Dismantling digital sharecropping in EdTech through sovereign AI systems.
              </p>
            </div>

            {/* Credentials & Experience Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Credentials */}
              <div className="p-6 rounded-2xl bg-zinc-900/50 border border-white/5 hover:border-noble-gold/20 transition-all">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-noble-gold/10 flex items-center justify-center text-noble-gold border border-noble-gold/20">
                    <GraduationCap size={20} />
                  </div>
                  <h4 className="text-sm font-black text-white uppercase tracking-wider">Education</h4>
                </div>
                <ul className="space-y-3">
                  {CREDENTIALS.map((cred, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm group">
                      <div className="w-1.5 h-1.5 rounded-full bg-noble-gold/50 mt-2 group-hover:bg-noble-gold transition-colors" />
                      <div>
                        <span className="text-white font-bold">{cred.degree}</span>
                        <span className="text-zinc-500"> - {cred.field}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Experience */}
              <div className="p-6 rounded-2xl bg-zinc-900/50 border border-white/5 hover:border-amber-500/20 transition-all">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500 border border-amber-500/20">
                    <Briefcase size={20} />
                  </div>
                  <h4 className="text-sm font-black text-white uppercase tracking-wider">Experience</h4>
                </div>
                <ul className="space-y-4">
                  {EXPERIENCE.map((exp, i) => (
                    <li key={i} className={`flex items-center justify-between text-sm pb-3 border-b border-white/5 last:border-0 last:pb-0 ${exp.highlight ? 'text-noble-gold' : 'text-zinc-400'}`}>
                      <span className="font-semibold">{exp.role}</span>
                      <span className="text-xs text-zinc-600">{exp.year}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Achievements */}
            <div className="p-6 rounded-2xl bg-zinc-900/50 border border-white/5">
              <h4 className="text-[11px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-4">Key Achievements</h4>
              <div className="grid grid-cols-2 gap-3">
                {ACHIEVEMENTS.map((achievement, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-zinc-300">
                    <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                    <span>{achievement}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <Link 
              href="/about" 
              className="group flex items-center justify-between p-6 rounded-2xl bg-gradient-to-r from-noble-gold/10 to-amber-500/5 border border-noble-gold/20 hover:border-noble-gold/40 transition-all"
            >
              <div>
                <h4 className="text-white font-bold mb-1">View Full Dossier</h4>
                <p className="text-sm text-zinc-500">Complete professional profile and research publications</p>
              </div>
              <ArrowRight className="text-noble-gold group-hover:translate-x-2 transition-transform" size={24} />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
