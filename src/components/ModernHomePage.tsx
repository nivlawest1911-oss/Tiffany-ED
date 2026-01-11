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
    Zap
} from 'lucide-react';
import Link from 'next/link';

export default function ModernHomePage() {
    const stats = [
        { value: '47,000+', label: 'Alabama Educators', icon: Users },
        { value: '1.5M+', label: 'Hours Saved', icon: Clock },
        { value: '$38M+', label: 'Capital Recovered', icon: TrendingUp },
        { value: '142', label: 'Districts Served', icon: Award },
    ];

    const features = [
        {
            icon: FileText,
            title: 'IEP Architect',
            description: 'Generate IDEA-compliant IEPs with SMART goals in minutes, not hours.',
            link: '/enhanced-test',
            color: 'from-purple-500 to-pink-500',
        },
        {
            icon: Brain,
            title: 'Lesson Planner',
            description: 'Create standards-aligned lesson plans in seconds with AI assistance.',
            link: '/generators/lesson-planner',
            color: 'from-blue-500 to-cyan-500',
        },
        {
            icon: MessageSquare,
            title: 'Email Composer',
            description: 'Draft professional communications for parents, staff, and district.',
            link: '/generators/email-composer',
            color: 'from-green-500 to-emerald-500',
        },
        {
            icon: Award,
            title: 'Behavior Coach',
            description: 'Evidence-based intervention strategies and PBIS support tools.',
            link: '/generators/behavior-coach',
            color: 'from-orange-500 to-red-500',
        },
        {
            icon: Sparkles,
            title: 'Grant Writer',
            description: 'Secure funding with compelling grant proposals and budgets.',
            link: '/generators/grant-writer',
            color: 'from-purple-500 to-pink-500',
        },
        {
            icon: Zap,
            title: 'Quick Actions',
            description: 'Access 36+ more specialized tools for every administrative task.',
            link: '/showcase',
            color: 'from-pink-500 to-orange-500',
        },
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
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
            {/* Hero Section */}
            <section className="relative overflow-hidden">
                {/* Animated background */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center"
                    >
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-8"
                        >
                            <Sparkles className="w-4 h-4 text-purple-400" />
                            <span className="text-sm text-purple-300">Trusted by 47,000+ Alabama Educators</span>
                        </motion.div>

                        {/* Headline */}
                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6">
                            AI-Powered Tools for{' '}
                            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                Educators
                            </span>
                        </h1>

                        {/* Subheadline */}
                        <p className="text-xl sm:text-2xl text-purple-200 mb-8 max-w-3xl mx-auto">
                            Save 10+ hours per week on IEPs, lesson plans, and administrative tasks.
                            Built for Alabama educators.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                            <Link href="/signup">
                                <motion.button
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-8 py-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold text-lg shadow-lg shadow-purple-500/50 flex items-center gap-2"
                                >
                                    Start Free Trial
                                    <ArrowRight className="w-5 h-5" />
                                </motion.button>
                            </Link>
                            <Link href="/showcase">
                                <motion.button
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-8 py-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-lg backdrop-blur-sm"
                                >
                                    See Demo
                                </motion.button>
                            </Link>
                        </div>

                        {/* Trust Indicators */}
                        <div className="flex flex-wrap justify-center gap-6 text-sm text-purple-300">
                            <div className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-green-400" />
                                <span>30-day free trial</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-green-400" />
                                <span>No credit card required</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-green-400" />
                                <span>Cancel anytime</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="relative py-16 border-y border-purple-500/20 bg-black/20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="text-center"
                            >
                                <stat.icon className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                                <div className="text-3xl sm:text-4xl font-bold text-white mb-1">
                                    {stat.value}
                                </div>
                                <div className="text-sm text-purple-300">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="relative py-24">
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

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map((feature, index) => (
                            <Link key={index} href={feature.link}>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    whileHover={{ scale: 1.02, y: -4 }}
                                    className="group p-6 rounded-2xl bg-black/40 backdrop-blur-xl border border-purple-500/20 hover:border-purple-500/40 transition-all cursor-pointer"
                                >
                                    <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.color} mb-4 group-hover:scale-110 transition-transform`}>
                                        <feature.icon className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                                    <p className="text-purple-200 leading-relaxed">{feature.description}</p>
                                    <div className="mt-4 flex items-center gap-2 text-purple-400 group-hover:text-purple-300 transition-colors">
                                        <span className="text-sm font-medium">Try it now</span>
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </motion.div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="relative py-24 bg-black/20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                            How EdIntel Works
                        </h2>
                        <p className="text-xl text-purple-200">
                            Get started in 3 simple steps
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { step: '1', title: 'Choose Your Tool', description: 'Select from 41 specialized AI assistants' },
                            { step: '2', title: 'Enter Details', description: 'Provide context and requirements' },
                            { step: '3', title: 'Download Result', description: 'Get professional, compliant documents' },
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                                className="text-center"
                            >
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white text-2xl font-bold mb-4">
                                    {item.step}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                                <p className="text-purple-200">{item.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section className="relative py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                            Simple, Transparent Pricing
                        </h2>
                        <p className="text-xl text-purple-200">
                            30-day free trial on all plans
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {pricing.map((plan, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className={`relative p-8 rounded-2xl backdrop-blur-xl border-2 ${plan.popular
                                        ? 'bg-purple-500/10 border-purple-500/50 shadow-lg shadow-purple-500/20'
                                        : 'bg-black/40 border-purple-500/20'
                                    }`}
                            >
                                {plan.popular && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold">
                                        Most Popular
                                    </div>
                                )}

                                <div className="text-center mb-6">
                                    <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                                    <div className="flex items-baseline justify-center gap-1 mb-2">
                                        <span className="text-4xl font-bold text-white">{plan.price}</span>
                                        {plan.period !== 'pricing' && (
                                            <span className="text-purple-300">/{plan.period}</span>
                                        )}
                                    </div>
                                    <p className="text-purple-300 text-sm">{plan.description}</p>
                                </div>

                                <ul className="space-y-3 mb-8">
                                    {plan.features.map((feature, i) => (
                                        <li key={i} className="flex items-start gap-2 text-purple-200">
                                            <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                                            <span className="text-sm">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <Link href={plan.link}>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className={`w-full py-3 rounded-xl font-semibold transition-all ${plan.popular
                                                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/50'
                                                : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                                            }`}
                                    >
                                        {plan.cta}
                                    </motion.button>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

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
                                className="px-10 py-5 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-xl shadow-2xl shadow-purple-500/50 flex items-center gap-3 mx-auto"
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
        </div>
    );
}
