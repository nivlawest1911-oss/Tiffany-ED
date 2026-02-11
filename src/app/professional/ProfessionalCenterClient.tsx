import { Crown, Award, Users, TrendingUp, Shield, Zap, Sparkles } from 'lucide-react';
import { ParticleBackground, GlassCard, HeaderAccent } from '@/components/ui/Cinematic';

export default function ProfessionalCenterClient() {
    const features = [
        { icon: Crown, title: 'Executive Leadership', description: 'Advanced AI tools for district-level decision making' },
        { icon: Award, title: 'Professional Development', description: 'Continuous learning and certification programs' },
        { icon: Users, title: 'Collaborative Network', description: 'Connect with educational leaders nationwide' },
        { icon: TrendingUp, title: 'Performance Analytics', description: 'Data-driven insights for strategic planning' },
        { icon: Shield, title: 'Compliance Management', description: 'Stay ahead of regulatory requirements' },
        { icon: Zap, title: 'Rapid Implementation', description: 'Get started in minutes, not months' },
    ];

    return (
        <main className="min-h-screen bg-black text-white relative overflow-hidden">
            <ParticleBackground count={40} />

            {/* Background Gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(212,175,55,0.05),transparent_50%)]" />

            {/* Hero Section */}
            <section className="relative py-12 px-4 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.1),transparent_70%)]" />

                <div className="max-w-6xl mx-auto relative z-10">
                    <div className="text-center pt-16">
                        <HeaderAccent text="New Professional Hub" />

                        <h1 className="text-7xl md:text-9xl font-black text-white mb-8 tracking-tighter uppercase italic">
                            EdIntel <span className="text-transparent bg-clip-text bg-gradient-to-r from-noble-gold to-white">Center</span>
                        </h1>

                        <p className="text-xl md:text-2xl text-zinc-400 max-w-3xl mx-auto mb-16 font-medium italic leading-relaxed">
                            "Elevating educational leadership through administrative intelligence and the professional token economy."
                        </p>

                        <div className="flex flex-wrap justify-center gap-6">
                            <button className="px-12 py-5 bg-noble-gold text-black rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-[0_0_30px_rgba(212,175,55,0.2)] hover:scale-105 hover:shadow-[0_0_50px_rgba(212,175,55,0.4)] transition-all flex items-center gap-3">
                                <Crown className="w-4 h-4" />
                                Initiate Upgrade
                            </button>
                            <button className="px-12 py-5 bg-white/5 border border-white/10 text-white rounded-2xl font-black uppercase text-xs tracking-[0.2em] backdrop-blur-md hover:bg-white/10 transition-all flex items-center gap-3">
                                Explore Protocols
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-32 px-4 relative z-10">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <GlassCard
                                key={index}
                                delay={index * 0.1}
                                className="p-10 group"
                            >
                                <div className="flex flex-col h-full">
                                    <feature.icon className="w-16 h-16 text-noble-gold mb-8 group-hover:scale-110 transition-transform duration-500" />
                                    <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-tighter italic">{feature.title}</h3>
                                    <p className="text-zinc-400 font-medium leading-relaxed">{feature.description}</p>
                                    <div className="mt-8 pt-8 border-t border-white/5 flex items-center gap-2 text-[10px] font-black text-noble-gold uppercase tracking-[0.3em] opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Sparkles className="w-4 h-4" />
                                        Advanced Module
                                    </div>
                                </div>
                            </GlassCard>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
