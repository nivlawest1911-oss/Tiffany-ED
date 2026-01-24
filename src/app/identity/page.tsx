
'use client';

import { motion } from 'framer-motion';
import FloatingNavbar from '@/components/FloatingNavbar';
import Footer from '@/components/Footer';
import VoiceIdentityComponent from '@/components/VoiceIdentity';
import useProfessionalSounds from '@/hooks/useProfessionalSounds';
import { Shield as LucideShield, Award, Users, Brain, Lock } from 'lucide-react';
import ProfessionalBroadcastCenter from '@/components/bento/ProfessionalBroadcastCenter';
import ProfessionalSocialConnection from '@/components/bento/ProfessionalSocialConnection';

export default function IdentityPage() {
    const { playHover, playClick } = useProfessionalSounds();

    const team = [
        {
            name: "Dr. Alvin West",
            role: "Professional Architect",
            image: "/avatars/alvin_west.png",
            voice: "/voice-profiles/alvin_deep.mp3",
            bio: "Visionary leader bridging the gap between neural architecture and educational excellence.",
            color: "from-amber-500 to-orange-600"
        },
        {
            name: "Sarah Connors",
            role: "Strategic Data Scientist",
            image: "/avatars/sarah_connors.webp",
            voice: "/voice-profiles/sarah_clinical.mp3",
            bio: "Tactical expert in district analytics and predictive success modeling.",
            color: "from-indigo-500 to-blue-600"
        },
        {
            name: "Marcus Aurelius",
            role: "Professional Administrator",
            image: "/avatars/marcus_aurelius.webp",
            voice: "/voice-profiles/marcus_grave.mp3",
            bio: "Stoic philosopher governing administrative duty and disciplined compliance.",
            color: "from-zinc-400 to-zinc-600"
        },
        {
            name: "André State",
            role: "Innovation Strategist",
            image: "/avatars/andre_state.webp",
            voice: "/voice-profiles/andre_innovative.mp3",
            bio: "Heuristic architect optimizing district agility through neural engineering.",
            color: "from-emerald-500 to-teal-600"
        }
    ];

    return (
        <div className="min-h-screen bg-[#0a0a0f] text-white selection:bg-indigo-500/30">
            <FloatingNavbar />

            {/* Hero Section with Video Background */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-40">
                    <video
                        src="/videos/features/iep-architect-demo.mp4"
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/80 to-transparent" />
                </div>

                <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8"
                    >
                        <LucideShield className="w-4 h-4 text-indigo-400" />
                        <span className="text-sm font-medium text-indigo-200">The Professional Council</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50 mb-6 tracking-tight"
                    >
                        Architects of Intelligence
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed"
                    >
                        Meet the specialized AI personas and human visionaries dedicated to redefining educational leadership.
                    </motion.p>
                </div>
            </section>

            {/* Social Broadcast Centers */}
            <section className="py-12 px-6 relative z-10 bg-zinc-950/50">
                <div className="max-w-7xl mx-auto flex flex-col gap-12">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        <ProfessionalSocialConnection />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <ProfessionalBroadcastCenter />
                    </motion.div>
                </div>
            </section>

            {/* Team Grid */}
            <section className="py-24 px-6 relative z-10">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {team.map((member, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            viewport={{ once: true }}
                            className="group relative"
                            onMouseEnter={playHover}
                        >
                            <div className={`absolute inset-0 bg-gradient-to-br ${member.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl blur-xl`} />

                            <div className="relative bg-zinc-900/50 border border-white/10 rounded-3xl p-6 backdrop-blur-sm overflow-hidden hover:border-white/20 transition-all duration-300 h-full flex flex-col">
                                <div className="absolute top-0 right-0 p-4 opacity-30 group-hover:opacity-100 transition-opacity">
                                    <div className="w-12 h-12 bg-gradient-to-br from-white/5 to-transparent rounded-full flex items-center justify-center">
                                        <Award className="w-6 h-6 text-white/20" />
                                    </div>
                                </div>

                                <div className="mb-6 relative">
                                    <div className="w-24 h-24 rounded-2xl overflow-hidden ring-4 ring-white/10 group-hover:ring-white/30 transition-all bg-black">
                                        <img src={member.image} alt={member.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                    </div>
                                    <div className="absolute -bottom-2 -right-2 scale-75 origin-bottom-right">
                                        <VoiceIdentityComponent src={member.voice} label="Voice Connection" />
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                                <p className={`text-[10px] font-black bg-gradient-to-r ${member.color} bg-clip-text text-transparent mb-4 uppercase tracking-[0.2em]`}>
                                    {member.role}
                                </p>
                                <p className="text-zinc-400 text-xs leading-relaxed flex-grow">
                                    {member.bio}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Values Section */}
            <section className="py-24 bg-zinc-900/30 border-y border-white/5 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.05)_0%,transparent_70%)]" />
                <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
                    <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-16">
                        The <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Professional Code</span>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { title: "Privacy Prime", desc: "FERPA and HIPAA clinical-grade encryption protocol.", icon: Lock },
                            { title: "Human Agency", desc: "Systems designed to amplify human leadership, never replace it.", icon: Users },
                            { title: "Strategic Fidelity", desc: "Tailored AI archetypes with 99.8% strategic accuracy.", icon: Brain }
                        ].map((item, i) => (
                            <div key={i} className="p-10 rounded-[2rem] bg-zinc-950/50 border border-white/5 hover:border-indigo-500/30 transition-all group">
                                <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform">
                                    <item.icon className="w-8 h-8 text-indigo-500" />
                                </div>
                                <h3 className="text-xl font-bold mb-4 uppercase tracking-wider">{item.title}</h3>
                                <p className="text-zinc-500 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div >
    );
}
