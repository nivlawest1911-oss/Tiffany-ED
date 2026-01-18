'use client';

import { useState, useRef } from 'react';
import Image from "next/image"
import { motion } from "framer-motion"
import { Award, BookOpen, GraduationCap, Shield as LucideShield, ExternalLink, Linkedin, Briefcase, CheckCircle2, Facebook, Download, Activity, Lock, Pause, Volume2 } from "lucide-react"

const publications = [
  { title: "Effective Strategies to Sustain Small Businesses", subtitle: "Doctoral Dissertation • Walden University (2023)" },
  { title: "The Refractive Thinker® Vol. XXIV", subtitle: "Mental Health: Policy & Practice (Contributing Author)" },
]

const education = [
  { institution: "Walden University", degree: "Doctor of Business Administration (DBA)", year: "2023" },
  { institution: "Texas Southern University", degree: "Master of Business Administration (MBA)", year: "Corporate Finance" },
  { institution: "Alabama State University", degree: "Master of Science (MS), Education", year: "Educational Leadership" },
  { institution: "Alabama State University", degree: "Bachelor of Science (BS), Finance", year: "Financial Management" },
]

const experience = [
  { role: "Expert AI Trainer & Consultant", company: "Outlier.ai", year: "Present" },
  { role: "Founder & Strategic Architect", company: "Transcend Academic, Business & Cognitive Solutions", year: "2018 - Present" },
  { role: "Regional Operations Manager", company: "Corporate Sector", year: "15+ Years" },
]

const expertise = ["Strategic Finance", "Artificial Intelligence", "Operational Analytics", "Change Management", "EdTech Innovation"]

export function FounderDossier() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleAudio = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio("/voice-profiles/principal_voice.mp3");
      audioRef.current.onended = () => setIsPlaying(false);
    }

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <section className="px-4 md:px-8 py-16 md:py-24 perspective-1000">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ rotateX: 10, opacity: 0, scale: 0.9 }}
          whileInView={{ rotateX: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="glass-card rounded-[2.5rem] relative overflow-hidden shadow-2xl border border-amber-500/10 bg-zinc-900/60 backdrop-blur-xl group"
        >
          {/* Pan-African Kente Accent Line */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-red-600 via-yellow-500 to-green-600 z-50" />

          {/* System Header */}
          <div className="h-12 bg-black/40 border-b border-white/5 flex items-center justify-between px-8">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              <span className="text-[10px] font-mono text-amber-500 uppercase tracking-[0.2em]">Sovereign Identification Verified</span>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
              <Lock size={10} />
              Clearance: Executive Architect
            </div>
          </div>

          {/* Background Decor */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative z-10 p-8 md:p-12">

            {/* Left Column: Profile & quick stats */}
            <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
              <div className="relative group cursor-pointer" onClick={toggleAudio}>
                {/* Cultural Aura */}
                <div className={`absolute inset-0 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-3xl blur opacity-20 transition-opacity ${isPlaying ? 'animate-pulse opacity-60' : 'group-hover:opacity-40'}`} />

                <div className="relative w-64 h-64 rounded-3xl overflow-hidden border-2 border-white/10 shadow-2xl">
                  <Image
                    src="/images/dr_alvin_west.png"
                    alt="Dr. Alvin E. West II"
                    fill
                    className="object-cover"
                  />
                  {/* Biometric Scan Line */}
                  <motion.div
                    animate={{ top: ["-100%", "200%"] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-x-0 h-1/2 bg-gradient-to-b from-transparent via-amber-500/20 to-transparent"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 bg-zinc-950 border border-amber-500/30 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-xl flex items-center gap-2 scale-100 group-hover:scale-110 transition-transform z-20">
                  {isPlaying ? <Pause className="w-4 h-4 text-green-500 animate-pulse" /> : <Volume2 className="w-4 h-4 text-green-500" />}
                  {isPlaying ? "Transmitting..." : "Voice of the Architect"}
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-3xl font-black text-white leading-tight">
                  Dr. Alvin E. West II
                  <span className="block text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 mt-1">DBA, MBA</span>
                </h3>
                <p className="text-zinc-400 text-sm">Sovereign Architect & Executive Consultant</p>
              </div>

              {/* Social Links */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-2">
                <a
                  href="https://www.linkedin.com/in/alvin-west-ii-dba-11a75323"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg bg-[#0077b5]/10 border border-[#0077b5]/20 flex items-center gap-2 text-[#0077b5] hover:bg-[#0077b5]/20 transition-all text-xs font-bold uppercase tracking-wide"
                >
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                </a>
                <a
                  href="https://www.tiktok.com/@alvinwestii"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg bg-pink-500/10 border border-pink-500/20 flex items-center gap-2 text-pink-500 hover:bg-pink-500/20 transition-all text-xs font-bold uppercase tracking-wide"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.65-1.58-1.11-.2-.18-.4-.36-.58-.55v7.26c-.03 2.13-1.09 4.23-2.91 5.37-1.83 1.14-4.14 1.22-6.03.2-1.89-1-3.13-3-3.26-5.2-.1-1.63.63-3.23 1.95-4.23 1.33-1 3.14-1.19 4.67-.48.16.08.31.06.46.12v4.02c-.52-.15-1.07-.12-1.58.1-.51.21-.92.65-1.09 1.18-.17.52-.06 1.1.28 1.54.34.44.9.69 1.45.64 1.05-.08 1.87-.99 1.84-2.04V.02z" /></svg>
                  TikTok
                </a>
                <a
                  href="https://www.facebook.com/alvin.west.18"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg bg-[#1877F2]/10 border border-[#1877F2]/20 flex items-center gap-2 text-[#1877F2] hover:bg-[#1877F2]/20 transition-all text-xs font-bold uppercase tracking-wide"
                >
                  <Facebook className="w-4 h-4" />
                  Facebook
                </a>
              </div>

              {/* Strategic Impact Metrics */}
              <div className="w-full mt-6 grid grid-cols-3 gap-2">
                {[
                  { label: "Fiscal", val: "98%", color: "text-emerald-400" },
                  { label: "Compliance", val: "100%", color: "text-blue-400" },
                  { label: "Innovation", val: "Top 1%", color: "text-purple-400" },
                ].map((stat, i) => (
                  <div key={i} className="bg-black/20 rounded-xl p-2 text-center border border-white/5">
                    <div className={`text-sm font-black ${stat.color}`}>{stat.val}</div>
                    <div className="text-[9px] uppercase text-zinc-500 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Leadership Philosophy */}
              <div className="mt-8 p-6 bg-white/5 rounded-2xl border border-white/5 relative">
                <div className="absolute -top-3 left-4 bg-black px-2 text-indigo-400">
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M14.017 21L14.017 18C14.017 16.8954 13.1216 16 12.017 16H9.01703C7.91246 16 7.01703 16.8954 7.01703 18V21H2.01703V18C2.01703 14.134 5.15104 11 9.01703 11H13.517C17.383 11 20.517 14.134 20.517 18V21H14.017ZM11.267 9C9.20003 9 7.51703 7.317 7.51703 5.25C7.51703 3.183 9.20003 1.5 11.267 1.5C13.334 1.5 15.017 3.183 15.017 5.25C15.017 7.317 13.334 9 11.267 9Z" /></svg>
                </div>
                <p className="text-zinc-300 text-sm italic leading-relaxed">
                  "True sovereignty in education isn't about control—it's about the seamless integration of fiscal responsibility, cognitive data, and human compassion."
                </p>

                {/* Simulated Signature */}
                <div className="mt-4 pt-4 border-t border-white/10 flex justify-end">
                  <motion.svg
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                    width="150" height="40" viewBox="0 0 200 60"
                    className="text-indigo-400 stroke-current opacity-80"
                  >
                    <motion.path
                      d="M10,40 Q30,10 50,40 T90,40 T130,40 T170,40"
                      strokeWidth="2"
                      fill="none"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      transition={{ duration: 1.5 }}
                    />
                    <text x="60" y="45" fontFamily="Cursive" fontSize="24" fill="currentColor" className="opacity-0 animate-fade-in delay-1000 fill-indigo-400">Dr. A. West</text>
                  </motion.svg>
                </div>
              </div>
            </div>

            {/* Right Column: Detailed Dossier */}
            <div className="lg:col-span-8 space-y-8">

              {/* Education Grid */}
              <div>
                <h4 className="flex items-center gap-2 text-sm font-bold text-indigo-400 uppercase tracking-widest mb-4">
                  <GraduationCap className="w-4 h-4" /> Academic Pedigree
                </h4>
                <div className="grid md:grid-cols-2 gap-4">
                  {education.map((edu, i) => (
                    <div key={i} className="group p-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-colors relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                        <GraduationCap size={40} />
                      </div>
                      <div className="text-white font-bold text-sm mb-1 relative z-10">{edu.degree}</div>
                      <div className="text-zinc-400 text-xs mb-2 relative z-10">{edu.institution}</div>
                      {edu.year && <div className="inline-block px-2 py-0.5 bg-white/10 rounded text-[10px] text-zinc-300 relative z-10">{edu.year}</div>}
                    </div>
                  ))}
                </div>
              </div>

              {/* Strategic Publications */}
              <div>
                <h4 className="flex items-center gap-2 text-sm font-bold text-emerald-400 uppercase tracking-widest mb-4">
                  <BookOpen className="w-4 h-4" /> Published Research & Thought Leadership
                </h4>
                <div className="space-y-3">
                  {publications.map((pub, i) => (
                    <a key={i} href="https://scholarworks.waldenu.edu/dissertations/14595/" target="_blank" rel="noreferrer" className="block group">
                      <div className="p-4 bg-emerald-900/10 border border-emerald-500/10 rounded-2xl group-hover:border-emerald-500/30 transition-all flex items-start justify-between gap-4">
                        <div>
                          <div className="text-white font-medium text-sm group-hover:text-emerald-300 transition-colors">{pub.title}</div>
                          <div className="text-zinc-500 text-xs mt-1">{pub.subtitle}</div>
                        </div>
                        <ExternalLink className="w-4 h-4 text-zinc-600 group-hover:text-emerald-400" />
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Experience & Expertise Split */}
              <div className="grid md:grid-cols-2 gap-8">
                {/* Experience */}
                <div>
                  <h4 className="flex items-center gap-2 text-sm font-bold text-blue-400 uppercase tracking-widest mb-4">
                    <Briefcase className="w-4 h-4" /> Professional Trajectory
                  </h4>
                  <div className="space-y-0 relative border-l border-white/10 ml-2">
                    {experience.map((exp, i) => (
                      <div key={i} className="mb-6 ml-6 relative group">
                        {/* Timeline Dot */}
                        <div className="absolute -left-[30px] top-1.5 w-3 h-3 rounded-full bg-zinc-800 border-2 border-blue-500 group-hover:scale-125 transition-transform shadow-[0_0_10px_rgba(59,130,246,0.5)]" />

                        <div>
                          <div className="text-white text-sm font-bold group-hover:text-blue-400 transition-colors">{exp.role}</div>
                          <div className="text-zinc-400 text-xs">{exp.company}</div>
                          <div className="text-zinc-500 text-[10px] uppercase mt-0.5 font-mono">{exp.year}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Expertise Tags */}
                <div>
                  <h4 className="flex items-center gap-2 text-sm font-bold text-purple-400 uppercase tracking-widest mb-4">
                    <Award className="w-4 h-4" /> Sovereign Capabilities
                  </h4>
                  <div className="flex flex-wrap gap-2 content-start">
                    {expertise.map((skill, i) => (
                      <span key={i} className="px-3 py-1.5 bg-gradient-to-r from-white/5 to-white/0 border border-white/10 text-zinc-300 text-xs rounded-lg hover:border-purple-500/50 hover:text-white transition-all cursor-default hover:shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Download Brief */}
              <div className="mt-8 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex gap-2 text-zinc-500 text-xs items-center">
                  <Activity size={14} className="text-green-500" />
                  <span>System Status: <span className="text-white">Active</span></span>
                  <span className="w-px h-3 bg-zinc-700 mx-2" />
                  <span>Last Updated: <span className="text-white">Jan 14, 2026</span></span>
                </div>
                <button className="px-6 py-3 rounded-xl bg-white text-black font-bold text-xs uppercase tracking-widest hover:bg-zinc-200 transition-colors flex items-center gap-2">
                  <Download size={16} />
                  Download Executive Brief
                </button>
              </div>

            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
