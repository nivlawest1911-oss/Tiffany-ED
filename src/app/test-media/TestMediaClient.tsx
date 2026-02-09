import { Shield as LucideShield, Sparkles } from "lucide-react";

export default function TestMediaClient() {
    const avatars = [
        { name: 'IEP Architect', role: 'Special Education Lead', image: '/images/avatars/iep_architect.png', color: 'from-violet-500 to-purple-600' },
        { name: 'Executive Leader', role: 'District Administrator', image: '/images/avatars/executive_leader.png', color: 'from-indigo-500 to-blue-600' },
        { name: 'Behavior Specialist', role: 'Student Support Expert', image: '/images/avatars/behavior_specialist.png', color: 'from-emerald-500 to-teal-600' },
        { name: 'Curriculum Strategist', role: 'Instructional Designer', image: '/images/avatars/curriculum_strategist.png', color: 'from-amber-500 to-orange-600' },
        { name: 'Data Analyst', role: 'Educational Data Expert', image: '/images/avatars/data_analyst.png', color: 'from-cyan-500 to-blue-600' },
        { name: 'Literacy Coach', role: 'Reading Specialist', image: '/images/avatars/literacy_coach.png', color: 'from-rose-500 to-pink-600' },
        { name: 'School Counselor', role: 'Student Wellness Advocate', image: '/images/avatars/counselor.png', color: 'from-purple-500 to-indigo-600' },
        { name: 'STEM Coordinator', role: 'Science & Technology Lead', image: '/images/avatars/stem_coordinator.png', color: 'from-blue-500 to-cyan-600' },
        { name: 'Special Ed Director', role: 'Inclusion Strategist', image: '/images/avatars/special_ed_director.png', color: 'from-green-500 to-emerald-600' },
        { name: 'Instructional Tech', role: 'Digital Learning Specialist', image: '/images/avatars/instructional_tech.png', color: 'from-orange-500 to-red-600' },
    ];

    return (
        <main className="content-stage">
            <div className="py-12 max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-bold uppercase tracking-widest mb-6">
                        <LucideShield size={14} />
                        <span>Professional Delegates</span>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-black text-white mb-6 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent italic">
                        EdIntel AI Delegates
                    </h1>
                    <p className="text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed">
                        Meet your strategic intelligence team. Each AI delegate brings specialized expertise to advance educational excellence.
                    </p>
                </div>

                {/* Avatar Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {avatars.map((avatar, index) => (
                        <div
                            key={index}
                            className="group relative bg-zinc-900/50 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-indigo-500/50 transition-all duration-300 hover:scale-105"
                        >
                            {/* Gradient Overlay */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${avatar.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

                            {/* Avatar Image */}
                            <div className="relative aspect-square overflow-hidden">
                                <img
                                    src={avatar.image}
                                    alt={avatar.name}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent opacity-60" />
                            </div>

                            {/* Content */}
                            <div className="relative p-6">
                                <div className="flex items-start justify-between mb-2">
                                    <h3 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors">
                                        {avatar.name}
                                    </h3>
                                    <Sparkles className="w-5 h-5 text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                                <p className="text-sm text-zinc-400 group-hover:text-zinc-300 transition-colors">
                                    {avatar.role}
                                </p>
                            </div>

                            {/* Hover Effect Border */}
                            <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${avatar.color} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300 -z-10`} />
                        </div>
                    ))}
                </div>

                {/* Stats Section */}
                <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="text-center p-8 bg-zinc-900/50 backdrop-blur-sm border border-white/10 rounded-2xl">
                        <div className="text-4xl font-black text-indigo-400 mb-2">10</div>
                        <div className="text-zinc-400 text-sm uppercase tracking-wider">AI Delegates</div>
                    </div>
                    <div className="text-center p-8 bg-zinc-900/50 backdrop-blur-sm border border-white/10 rounded-2xl">
                        <div className="text-4xl font-black text-purple-400 mb-2">100%</div>
                        <div className="text-zinc-400 text-sm uppercase tracking-wider">Culturally Resonant</div>
                    </div>
                    <div className="text-center p-8 bg-zinc-900/50 backdrop-blur-sm border border-white/10 rounded-2xl">
                        <div className="text-4xl font-black text-pink-400 mb-2">24/7</div>
                        <div className="text-zinc-400 text-sm uppercase tracking-wider">Always Available</div>
                    </div>
                </div>
            </div>
        </main>
    );
}
