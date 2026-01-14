import Image from "next/image";
import { Award, BookOpen, GraduationCap, Shield, ExternalLink, Linkedin, Cpu, Globe, Zap, Network } from "lucide-react";
import { motion } from "framer-motion";

const publications = [
  {
    title: "The Refractive Thinker® Vol. XXIV",
    subtitle: "Mental Health: Policy & Practice in Educational Leadership",
    type: "Academic Anthem"
  },
  {
    title: "Sustaining Small Businesses",
    subtitle: "Effective Strategies for African American Food Service Enterprises",
    type: "Economic Strategy"
  },
];

const education = [
  {
    institution: "Walden University",
    degree: "Doctor of Business Administration (DBA)",
    focus: "Organizational Leadership & AI Systems",
    year: "2019"
  },
  {
    institution: "Walden University",
    degree: "MBA, Business Administration",
    focus: "Strategic Management",
    year: "2015"
  },
];

const skills = [
  { name: "AI Architecture", level: 98 },
  { name: "Ed-Tech Consulting", level: 95 },
  { name: "Fiscal Strategy", level: 92 },
  { name: "Systemic Reform", level: 96 }
];

export function SovereignFounderProfile() {
  return (
    <section id="founder" className="relative py-24 bg-zinc-950 overflow-hidden">
      {/* AI Neural Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-amber-500/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 -right-1/4 w-1/2 h-1/2 bg-purple-600/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.03) 1px, transparent 1px)`,
          backgroundSize: '30px 30px'
        }} />
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[400px,1fr] gap-12 items-start">

          {/* Identity Node (Left Column) */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="sticky top-24"
          >
            <div className="relative group">
              {/* Holographic Border Ring */}
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 via-purple-500 to-indigo-500 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-1000"></div>

              <div className="relative bg-black/80 backdrop-blur-xl border border-white/10 p-6 rounded-2xl overflow-hidden">
                {/* Avatar Container */}
                <div className="relative w-full aspect-square rounded-xl overflow-hidden border border-white/10 mb-6 group-hover:border-amber-500/30 transition-colors">
                  <Image
                    src="/images/dr_alvin_west.png"
                    alt="Dr. Alvin West"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Overlay Glitch Effect */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/10 to-transparent mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                <div className="text-center">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-bold uppercase tracking-widest mb-3">
                    <Shield size={12} />
                    Sovereign Architect
                  </div>
                  <h3 className="text-3xl font-black text-white mb-1">The Architect</h3>
                  <p className="text-zinc-400 text-sm font-mono mb-6">Founder // Systemic Architect // Visionary</p>

                  {/* Status Grid */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                      <div className="text-2xl font-bold text-white">15+</div>
                      <div className="text-[10px] text-zinc-500 uppercase">Years Mastery</div>
                    </div>
                    <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                      <div className="text-2xl font-bold text-white">100+</div>
                      <div className="text-[10px] text-zinc-500 uppercase">Sovereign Nodes</div>
                    </div>
                  </div>

                  <div className="flex justify-center gap-4">
                    <button className="flex items-center gap-2 px-4 py-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 rounded-lg border border-amber-500/20 transition-all">
                      <Network size={18} />
                      <span className="text-sm font-bold">Bridge Contact</span>
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg border border-white/10 transition-all">
                      <ExternalLink size={18} />
                      <span className="text-sm font-bold">Dossier</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Neural Data Stream (Right Column) */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Bio */}
            <div className="prose prose-invert max-w-none">
              <h2 className="text-4xl font-bold text-white flex items-center gap-3">
                <Zap className="text-amber-500 w-8 h-8" />
                <span className="bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent">Architectural Vision</span>
              </h2>
              <p className="text-lg text-zinc-300 leading-relaxed">
                The Architect is a <strong>systems designer</strong> for the future of learning. With a Doctorate in Business Administration focused on AI Systems and over 15 years in educational leadership, they fuse <strong>strategic business intelligence</strong> with <strong>pedagogical expertise</strong> to solve systemic inefficiencies.
              </p>
              <p className="text-lg text-zinc-300 leading-relaxed">
                As the mind behind EdIntel Sovereign, they have translated complex administrative burdens into elegant AI solutions—reclaiming millions of hours for educators and districts across the nation.
              </p>
            </div>

            {/* Neural Skills Matrix */}
            <div>
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Cpu className="text-amber-500 w-5 h-5" />
                Core Protocols
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {skills.map((skill, i) => (
                  <div key={i} className="group relative bg-zinc-900/50 p-4 rounded-xl border border-white/5 hover:border-amber-500/50 transition-colors">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold text-zinc-200 group-hover:text-amber-400 transition-colors">{skill.name}</span>
                      <span className="text-xs font-mono text-zinc-500">{skill.level}% Sync</span>
                    </div>
                    <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: i * 0.1 }}
                        className="h-full bg-gradient-to-r from-amber-500 to-purple-600"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Education Timeline */}
            <div>
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <GraduationCap className="text-purple-500 w-5 h-5" />
                Neural Architecture (Education)
              </h3>
              <div className="space-y-4">
                {education.map((edu, i) => (
                  <div key={i} className="flex gap-4 items-start p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border-l-2 border-purple-500">
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-white">{edu.degree}</h4>
                      <p className="text-sm text-purple-300 mb-1">{edu.institution}, {edu.year}</p>
                      <p className="text-sm text-zinc-400 italic">{edu.focus}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Publications */}
            <div>
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Globe className="text-indigo-500 w-5 h-5" />
                Strategic Output (Publications)
              </h3>
              <div className="grid gap-4">
                {publications.map((pub, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-white/10 hover:border-indigo-500/50 bg-black/20 group cursor-pointer transition-all">
                    <div>
                      <div className="text-xs text-indigo-400 font-bold uppercase tracking-wider mb-1">{pub.type}</div>
                      <h4 className="font-bold text-white group-hover:text-indigo-200 transition-colors">{pub.title}</h4>
                      <p className="text-sm text-zinc-500">{pub.subtitle}</p>
                    </div>
                    <ExternalLink className="w-5 h-5 text-zinc-600 group-hover:text-white transition-colors" />
                  </div>
                ))}
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
