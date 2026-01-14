'use client';

import FeatureVideos from './FeatureVideos';
import { Button } from "@/components/ui/button";
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
import VideoTestimonials from './VideoTestimonials';
import HowItWorksVideo from './HowItWorksVideo';
import SovereignDelegate from './SovereignDelegate';

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
            description: "Generate legally defensible, data-driven IEP goals and accoms in minutes via our Sovereign Interface.",
            color: "from-violet-500 to-purple-600",
            link: "/generators/iep-architect",
            image: "/images/features/iep_interface.png",
            imageClass: "object-center"
        },
        {
            icon: Sparkles,
            title: "Lesson Planner",
            description: "Interact with a quantum curriculum node to create standards-aligned, adaptive lesson plans.",
            color: "from-fuchsia-500 to-pink-600",
            link: "/generators/lesson-planner",
            image: "/images/features/iep_interface.png",
            imageClass: "object-center hue-rotate-90"
        },
        {
            icon: FileText,
            title: "Grant Writer",
            description: "Secure funding with a high-tech digital drafting engine designed for persuasive success.",
            color: "from-blue-500 to-cyan-600",
            link: "/generators/grant-compliance-auditor",
            image: "/images/features/iep_interface.png",
            imageClass: "object-right hue-rotate-180"
        },
        {
            icon: Users,
            title: "Behavior Plans",
            description: "Develop comprehensive behavior intervention plans based on observation data.",
            color: "from-emerald-500 to-teal-600",
            link: "/generators/behavior-coach",
            image: "/images/avatars/behavior_specialist.png",
            imageClass: "object-top"
        },
        {
            icon: Zap,
            title: "Communication",
            description: "Draft professional emails, newsletters, and parent communications effortlessly.",
            color: "from-orange-500 to-red-600",
            link: "/generators/email-composer",
            image: "/images/features/iep_interface.png",
            imageClass: "object-left hue-rotate-270" // Orange-ish
        },
        {
            icon: BarChart3,
            title: "Data Analysis",
            description: "Turn raw assessments and observations into actionable insights and visualizations.",
            color: "from-indigo-500 to-blue-600",
            link: "/generators/data-analyzer",
            image: "/images/avatars/executive_leader.png",
            imageClass: "object-top"
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

            {/* Why EdIntel Section - New with Image */}
            <section className="relative py-24 bg-zinc-950 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        {/* Image Side */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="relative"
                        >
                            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-indigo-500/20 border border-white/10">
                                <img
                                    src="/images/hero_educator_team.png"
                                    alt="African American educators collaborating"
                                    className="w-full h-auto object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 via-transparent to-transparent" />
                            </div>
                            {/* Floating Stats Badge */}
                            <div className="absolute -bottom-6 -right-6 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 shadow-2xl shadow-indigo-500/50 border border-white/20">
                                <div className="text-4xl font-black text-white mb-1">47K+</div>
                                <div className="text-sm text-indigo-100 uppercase tracking-wider">Educators</div>
                            </div>
                        </motion.div>

                        {/* Content Side */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-bold uppercase tracking-widest mb-6">
                                <Shield size={14} />
                                <span>Sovereign Intelligence</span>
                            </div>
                            <h2 className="text-4xl sm:text-5xl font-black text-white mb-6 leading-tight">
                                Built by Educators,<br />
                                <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                                    For Educators
                                </span>
                            </h2>
                            <p className="text-xl text-zinc-400 mb-8 leading-relaxed">
                                EdIntel was created by Dr. Alvin West, an experienced educator who understands the daily challenges you face. Our AI delegates are designed to amplify your expertise, not replace it.
                            </p>

                            <div className="space-y-4 mb-8">
                                {[
                                    { icon: CheckCircle, text: "Culturally responsive AI that understands diverse learners" },
                                    { icon: Shield, text: "FERPA-compliant and built for educational privacy" },
                                    { icon: Sparkles, text: "Continuously learning from educator feedback" },
                                    { icon: Users, text: "Supporting 142 districts across Alabama" }
                                ].map((item, index) => (
                                    <div key={index} className="flex items-start gap-4">
                                        <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 mt-0.5">
                                            <item.icon size={20} />
                                        </div>
                                        <p className="text-zinc-300 text-lg">{item.text}</p>
                                    </div>
                                ))}
                            </div>

                            <Link href="/about">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold transition-all"
                                >
                                    <span>Learn Our Story</span>
                                    <ArrowRight className="w-5 h-5" />
                                </motion.button>
                            </Link>
                        </motion.div>
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
                                                    // @ts-ignore
                                                    className={`w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-all duration-700 group-hover:scale-110 ${feature.imageClass || ''}`}
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
                        <Link href="/generators">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold shadow-lg shadow-indigo-500/50 hover:shadow-indigo-500/70 transition-all"
                            >
                                <Sparkles className="w-5 h-5" />
                                <span>Access Sovereign Command Deck</span>
                                <ArrowRight className="w-5 h-5 ml-1" />
                            </motion.button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}

            {/* How It Works Section - Replaced with Video Component */}
            <HowItWorksVideo />

            {/* Feature Demonstrations (Video Section) */}
            <div id="video-demo">
                <FeatureVideos />
            </div>

            {/* Pricing Section - Integrated Component */}
            <div id="pricing">
                <PremiumPricingTable />
            </div>

            {/* Video Testimonials Section */}
            <VideoTestimonials />

            {/* Final CTA with Image */}
            <section className="relative py-24 overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="/images/student_success.png"
                        alt="Successful classroom moment"
                        className="w-full h-full object-cover opacity-20"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-900/90 via-indigo-900/90 to-pink-900/90" />
                </div>

                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                            Ready to Save 10+ Hours Per Week?
                        </h2>
                        <p className="text-xl text-purple-100 mb-8">
                            Join 47,000+ Alabama educators using EdIntel to focus on what matters most
                        </p>
                        <Link href="/signup">
                            <motion.button
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-10 py-5 rounded-xl bg-white text-indigo-600 font-bold text-xl shadow-2xl hover:shadow-white/50 flex items-center gap-3 mx-auto transition-all"
                            >
                                Start Your Free Trial
                                <ArrowRight className="w-6 h-6" />
                            </motion.button>
                        </Link>
                        <div className="flex flex-wrap justify-center gap-6 mt-6 text-sm text-purple-100">
                            <div className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-green-300" />
                                <span>30-day free trial</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-green-300" />
                                <span>No credit card</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-green-300" />
                                <span>Cancel anytime</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-green-300" />
                                <span>Setup in 2 minutes</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
            {/* Sovereign Guide for Landing Page */}
            <SovereignDelegate
                name="Dr. Alvin West"
                role="Founder & Architect"
                avatarImage="/images/dr_alvin_west.png"
                color="from-indigo-600 to-purple-800"
                greetingText="Welcome to EdIntel Sovereign. I am here to assist your leadership journey."
                theme="sovereign"
            // No video/voice src means it will just be a talking avatar bubble/interface
            />
        </div>
    );
}
