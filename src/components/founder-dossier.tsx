import Image from "next/image"
import { Award, BookOpen, GraduationCap, Shield, ExternalLink, Linkedin } from "lucide-react"

const publications = [
  { title: "The Refractive Thinker® Vol. XXIV", subtitle: "Mental Health: Policy & Practice" },
  { title: "Sustaining Small Businesses", subtitle: "Effective Strategies for African American Food Service" },
]

const education = [
  { institution: "Walden University", degree: "Doctor of Business Administration (DBA)" },
  { institution: "Walden University", degree: "MBA, Business Administration" },
]

const expertise = ["AI Systems", "Ed Consulting", "Tech Writing", "Financial Reporting"]

export function FounderDossier() {
  return (
    <section id="founder" className="px-4 md:px-8 py-16 md:py-24">
      <div className="max-w-5xl mx-auto">
        <div className="glass-card p-8 md:p-12 rounded-3xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {/* Profile Image */}
            <div className="relative mx-auto md:mx-0">
              <div className="w-48 h-48 md:w-56 md:h-56 rounded-2xl overflow-hidden border-2 border-[#00d2ff]/30 shadow-[0_0_40px_rgba(0,210,255,0.2)]">
                <Image
                  src="/professional-black-man-in-business-suit--executive.jpg"
                  alt="Dr. Alvin West"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-[#10b981] rounded-xl flex items-center justify-center shadow-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>

              {/* Social Links */}
              <div className="flex justify-center gap-2 mt-4">
                <a
                  href="https://www.linkedin.com/in/alvin-west-ii-dba-11a75323"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-[#00d2ff] hover:border-[#00d2ff]/30 transition-all"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                <span className="px-3 py-1 bg-[#00d2ff]/10 border border-[#00d2ff]/30 rounded-full text-[#00d2ff] text-xs">
                  Outlier AI
                </span>
                <span className="px-3 py-1 bg-[#10b981]/10 border border-[#10b981]/30 rounded-full text-[#10b981] text-xs">
                  Transcend Wellness
                </span>
              </div>
            </div>

            {/* Bio Info */}
            <div className="md:col-span-2">
              <p className="text-xs text-[#00d2ff] uppercase tracking-widest mb-2">
                Sovereign Architect & AI Developer
              </p>
              <h3 className="font-black tracking-tighter text-3xl md:text-4xl text-white mb-4">Alvin West II, DBA</h3>

              <div className="flex flex-wrap gap-2 mb-6">
                {["DBA", "MBA", "MS", "MS", "BS"].map((degree, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-[#00d2ff]/10 border border-[#00d2ff]/30 rounded-full text-[#00d2ff] text-xs font-medium"
                  >
                    {degree}
                  </span>
                ))}
              </div>

              {/* Key Publications */}
              <div className="mb-6">
                <h4 className="font-bold text-white mb-3 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#10b981]" />
                  Key Publications
                </h4>
                <div className="space-y-2">
                  {publications.map((pub, i) => (
                    <div key={i} className="p-3 bg-white/5 rounded-lg">
                      <p className="font-medium text-white text-sm">{pub.title}</p>
                      <p className="text-xs text-gray-400">{pub.subtitle}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div className="mb-6">
                <h4 className="font-bold text-white mb-3 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-[#10b981]" />
                  Education
                </h4>
                <div className="space-y-2">
                  {education.map((edu, i) => (
                    <div key={i} className="p-3 bg-white/5 rounded-lg">
                      <p className="font-medium text-white text-sm">{edu.institution}</p>
                      <p className="text-xs text-gray-400">{edu.degree}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Expertise */}
              <div className="mb-6">
                <h4 className="font-bold text-white mb-3 flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#10b981]" />
                  Expertise
                </h4>
                <div className="flex flex-wrap gap-2">
                  {expertise.map((skill, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-[#10b981]/10 border border-[#10b981]/30 rounded-full text-[#10b981] text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                <p className="text-xs text-gray-500 mb-1">System Architect // ID: 11A75323</p>
                <a
                  href="https://www.linkedin.com/in/alvin-west-ii-dba-11a75323"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-[#00d2ff] hover:text-[#00d2ff]/80 transition-colors bg-transparent border-none p-0 cursor-pointer"
                >
                  <ExternalLink className="w-4 h-4" />
                  View Full Dossier
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
