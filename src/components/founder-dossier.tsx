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
  { degree: "M.Ed", field: "Educational Leadership", school: "University of South Alabama" },
  { degree: "BS", field: "Psychology", school: "University of Mobile" }
];

const EXPERIENCE = [
  { role: "Founder & CEO", org: "EdIntel Sovereign OS", year: "2024-Present" },
  { role: "District Administrator", org: "Mobile County Public Schools", year: "2018-2024" },
  { role: "Strategic Consultant", org: "Sovereign Intelligence", year: "2020-Present" }
];

const SOCIAL_LINKS = [
  { icon: Linkedin, href: "https://linkedin.com/in/alvinwest", label: "LinkedIn" },
  { icon: Twitter, href: "https://twitter.com/alvinwest", label: "Twitter" },
  { icon: Globe, href: "https://edintel.io", label: "Website" },
  { icon: Mail, href: "mailto:alvin@edintel.io", label: "Contact" }
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
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container relative z-10 mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-start">

          {/* Left Column: Visual Profile */}
          <motion.div
            initial={{ opacity: 1, x: 0 }}
            className="w-full lg:w-1/3 relative"
          >
            {/* Holographic Card Effect */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000" />
              <div className="relative bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden p-2">
                <div className="aspect-[4/5] relative rounded-2xl overflow-hidden">
                  {/* Founder Image */}
                  <Image
                    src="/images/avatars/dr_alvin_west_executive.svg"
                    alt="Dr. Alvin West, Jr."
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />

                  {/* Name & Title Overlay */}
                  <div className="absolute bottom-0 left-0 w-full p-6">
                    <h2 className="text-3xl font-bold text-white mb-1">Dr. Alvin West, Jr.</h2>
                    <div className="flex items-center gap-2 text-blue-400 font-medium">
                      <Activity size={16} className="animate-pulse" />
                      <span>Founder & CEO</span>
                    </div>
                  </div>
                </div>

                {/* Voice Profile Control */}
                <div className="p-4 bg-white/5 mt-2 rounded-xl flex items-center justify-between group/audio hover:bg-white/10 transition-colors cursor-pointer" onClick={toggleAudio}>
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${isPlaying ? 'bg-blue-500 text-white' : 'bg-white/10 text-blue-400'}`}>
                      {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-1" />}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Voice Profile</div>
                      <div className="text-sm text-white font-medium">Authorized Briefing</div>
                    </div>
                  </div>
                  <div className="flex gap-0.5 items-end h-6">
                    {[1, 2, 3, 4, 5, 4, 3, 2, 1].map((h, i) => (
                      <motion.div
                        key={i}
                        animate={isPlaying ? { height: [4, 16, 4] } : { height: 4 }}
                        transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                        className={`w-1 rounded-full ${isPlaying ? 'bg-blue-400' : 'bg-slate-700'}`}
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
                  className="w-12 h-12 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-blue-500/50 hover:bg-blue-500/10 transition-all duration-300"
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
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-4">
                <Cpu size={12} />
                <span>Subject Profile</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Architecting the Future of <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Sovereign Education</span>
              </h2>
              <p className="text-lg text-slate-400 leading-relaxed max-w-2xl">
                Dr. West combines over two decades of educational leadership with advanced expertise in analytic finance and cognitive psychology. His mission is to dismantle the "digital sharecropping" model of EdTech and empower districts with true technological sovereignty.
              </p>
            </div>

            {/* Credentials Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-slate-900/50 border border-white/5 rounded-2xl p-6 hover:border-blue-500/30 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 mb-4">
                  <GraduationCap size={20} />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Academic Credentials</h3>
                <ul className="space-y-3">
                  {CREDENTIALS.map((cred, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm group">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-700 mt-1.5 group-hover:bg-blue-500 transition-colors" />
                      <div>
                        <span className="text-white font-bold">{cred.degree}</span>
                        <span className="text-slate-500"> — {cred.field}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <div
                className="bg-slate-900/50 border border-white/5 rounded-2xl p-6 hover:border-blue-500/30 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400 mb-4">
                  <Briefcase size={20} />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Operational History</h3>
                <ul className="space-y-3">
                  {EXPERIENCE.map((exp, i) => (
                    <li key={i} className="flex items-center justify-between text-sm group border-b border-white/5 pb-2 last:border-0 last:pb-0">
                      <span className="text-slate-300 font-medium group-hover:text-white transition-colors">{exp.role}</span>
                      <span className="text-slate-600 text-xs">{exp.year}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Quote/Vision */}
            <div className="relative pl-8 border-l-4 border-blue-500/30 py-2">
              <p className="text-xl text-slate-300 italic font-light mb-4">
                "We are not waiting for permission to innovate. We are building the infrastructure that makes permission irrelevant."
              </p>
              <div className="text-sm font-bold text-blue-400 uppercase tracking-widest">
                — Classified Directive 001
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
