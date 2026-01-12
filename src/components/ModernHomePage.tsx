'use client';

import { motion } from 'framer-motion';
import {
    Sparkles,
    Clock,
    Shield,
    Users,
    TrendingUp,
    CheckCircle,
    ArrowRight,
    FileText,
    Brain,
    MessageSquare,
    Award,
    Zap,
    BarChart3
} from 'lucide-react';
import Link from 'next/link';
import { UnusualHero } from './UnusualHero';
import PremiumPricingTable from './PremiumPricingTable';
import SpotlightCard from './SpotlightCard';
import FloatingNavbar from './FloatingNavbar';

export default function ModernHomePage() {
    const stats = [
        { value: '47,000+', label: 'Alabama Educators', icon: Users },
        { value: '1.5M+', label: 'Hours Saved', icon: Clock },
        { value: '$38M+', label: 'Capital Recovered', icon: TrendingUp },
        { value: '142', label: 'Districts Served', icon: Award },
    ];

    const features = [
        {
            icon: Brain,
            title: "IEP Architect",
            description: "Generate legally defensible, data-driven IEP goals and accommodations in minutes not hours.",
            color: "from-violet-500 to-purple-600",
            link: "/generators/iep-architect",
            image: "/images/avatars/iep_architect.png"
        },
        {
            icon: Sparkles,
            title: "Lesson Planner",
            description: "Create differentiated, standards-aligned lesson plans that adapt to every student's needs.",
            color: "from-fuchsia-500 to-pink-600",
            link: "/generators/lesson-planner",
            image: "/images/avatars/curriculum_strategist.png"
        },
        {
            icon: FileText,
            title: "Grant Writer",
            description: "Draft compelling grant proposals and funding requests with AI-powered persuasive writing.",
            color: "from-blue-500 to-cyan-600",
            link: "/generators/grant-writer",
            image: null
        },
        {
            icon: Users,
            title: "Behavior Plans",
            description: "Develop comprehensive behavior intervention plans based on observation data.",
            color: "from-emerald-500 to-teal-600",
            link: "/generators/behavior-coach",
            image: "/images/avatars/behavior_specialist.png"
        },
        {
            icon: Zap,
            title: "Communication",
            description: "Draft professional emails, newsletters, and parent communications effortlessly.",
            color: "from-orange-500 to-red-600",
            link: "/generators/email-composer",
            image: null
        },
        {
            icon: BarChart3,
            title: "Data Analysis",
            description: "Turn raw assessments and observations into actionable insights and visualizations.",
            color: "from-indigo-500 to-blue-600",
            link: "/generators/data-analyzer",
            image: "/images/avatars/executive_leader.png"
        }
    ];

    const pricing = [
        {
            name: 'Free',
            price: '$0',
            period: 'forever',
            description: 'Perfect for trying EdIntel',
            features: [
                '5 AI generations per month',
                'Basic templates',
                'Community support',
                'Email support',
            ],
            cta: 'Start Free',
            link: '/signup',
            popular: false,
        },
        {
            name: 'Professional',
            price: '$39.99',
            period: 'per month',
            description: 'For individual educators',
            features: [
                'Unlimited AI generations',
                'All 41 specialized tools',
                'Priority email support',
                'Advanced templates',
                'Export to PDF/Word',
                'FERPA-compliant storage',
            ],
            cta: 'Start Free Trial',
            link: '/signup?plan=pro',
            popular: true,
        },
        {
            name: 'Enterprise',
            price: 'Custom',
            period: 'pricing',
            description: 'For schools and districts',
            features: [
                'Everything in Professional',
                'Dedicated account manager',
                'Custom training sessions',
                'White-glove onboarding',
                'Priority phone support',
                'Custom integrations',
            ],
            cta: 'Contact Sales',
            link: '/contact',
            popular: false,
        },
    ];

    return (
        <div className="min-h-screen bg-black text-white selection:bg-indigo-500/30">
            <FloatingNavbar />
            {/* New v0 Hero Section */}
            <UnusualHero />

            {/* Stats Section */}
            <section className="relative py-24 border-y border-white/5 bg-zinc-950/50 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-zinc-950/0 to-zinc-950/0 pointer-events-none" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="text-center group"
                            >
                                <div className="inline-flex p-3 rounded-full bg-indigo-500/10 mb-4 group-hover:bg-indigo-500/20 transition-colors">
                                    <stat.icon className="w-8 h-8 text-indigo-400" />
                                </div>
                                <div className="text-4xl sm:text-5xl font-bold text-white mb-2 tracking-tight">
                                    {stat.value}
                                </div>
                                <div className="text-sm font-medium text-indigo-200/60 uppercase tracking-widest">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>



            {/* Features Section */}
            <section id="features" className="relative py-24 bg-gradient-to-br from-slate-950/50 to-purple-950/20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                            Everything You Need
                        </h2>
                        <p className="text-xl text-purple-200 max-w-2xl mx-auto">
                            Powerful AI tools designed specifically for Alabama educators
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                        {features.map((feature, index) => (
                            <Link key={index} href={feature.link} className="block h-full group">
                                <SpotlightCard className="h-full rounded-2xl p-0 overflow-hidden transition-all hover:scale-[1.01] relative border-0">
                                    {/* Image Background */}
                                    {feature.image && (
                                        <>
                                            <div className="absolute inset-0 z-0">
                                                <img
                                                    src={feature.image}
                                                    alt={feature.title}
                                                    className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-all duration-500 group-hover:scale-110"
                                                />
                                            </div>
                                            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/90 to-transparent z-10" />
                                        </>
                                    )}

                                    {/* Content Container */}
                                    <div className="relative z-20 p-6 flex flex-col h-full">
                                        <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.color} mb-4 w-fit shadow-lg shadow-black/50 group-hover:scale-110 transition-transform`}>
                                            <feature.icon className="w-6 h-6 text-white" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors drop-shadow-md">{feature.title}</h3>
                                        <p className="text-zinc-300 leading-relaxed mb-4 drop-shadow-md font-medium">{feature.description}</p>
                                        <div className="flex items-center gap-2 text-purple-400 font-bold mt-auto drop-shadow-md">
                                            <span>Try it now</span>
                                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                </SpotlightCard>
                            </Link>
                        ))}
                    </div>

                    <div className="mt-12 text-center pb-8">
                        <Link href="/all-tools">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold shadow-lg shadow-indigo-500/50 hover:shadow-indigo-500/70 transition-all"
                            >
                                <Sparkles className="w-5 h-5" />
                                <span>Explore All 41+ AI Tools</span>
                                <ArrowRight className="w-5 h-5 ml-1" />
                            </motion.button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}

            {/* How It Works Section */}
            <section className="relative py-24 bg-zinc-950">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-16"
                    >
                        <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                            How EdIntel Works
                        </h2>
                        <p className="text-xl text-zinc-400">
                            Get started in 3 simple steps
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-indigo-500/0 via-indigo-500/20 to-indigo-500/0" />

                        {[
                            { step: '1', title: 'Choose Your Tool', desc: 'Select from 41 specialized AI assistants' },
                            { step: '2', title: 'Enter Details', desc: 'Provide context and requirements' },
                            { step: '3', title: 'Download Result', desc: 'Get professional, compliant documents' }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                                className="relative z-10"
                            >
                                <div className="w-24 h-24 mx-auto bg-zinc-900 border border-white/10 rounded-full flex items-center justify-center mb-6 shadow-xl shadow-indigo-500/10 group hover:scale-110 transition-transform duration-300">
                                    <span className="text-3xl font-bold text-indigo-400 group-hover:text-indigo-300 transition-colors">{item.step}</span>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                                <p className="text-zinc-400">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing Section - Integrated Component */}
            <div id="pricing">
                <PremiumPricingTable />
            </div>

            {/* Final CTA */}
            <section className="relative py-24 bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-y border-purple-500/20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                            Ready to Save 10+ Hours Per Week?
                        </h2>
                        <p className="text-xl text-purple-200 mb-8">
                            Join 47,000+ Alabama educators using EdIntel to focus on what matters most
                        </p>
                        <Link href="/signup">
                            <motion.button
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-10 py-5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold text-xl shadow-2xl shadow-indigo-500/50 flex items-center gap-3 mx-auto"
                            >
                                Start Your Free Trial
                                <ArrowRight className="w-6 h-6" />
                            </motion.button>
                        </Link>
                        <div className="flex flex-wrap justify-center gap-6 mt-6 text-sm text-purple-300">
                            <div className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-green-400" />
                                <span>30-day free trial</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-green-400" />
                                <span>No credit card</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-green-400" />
                                <span>Cancel anytime</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-green-400" />
                                <span>Setup in 2 minutes</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div >
    );
}
