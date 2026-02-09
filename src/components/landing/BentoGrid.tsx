'use client';

import { motion } from 'framer-motion';
import { ChartBar, ShieldCheck, Wallet, GraduationCap, TrendingUp, Users } from 'lucide-react';

const features = [
    {
        id: 1,
        title: 'District-Wide Analytics',
        description: 'Real-time insights across all schools, students, and programs.',
        icon: ChartBar,
        large: true,
        chart: true
    },
    {
        id: 2,
        title: 'Safety Protocols',
        description: 'Monitor and manage safety measures in real-time.',
        icon: ShieldCheck,
        large: false
    },
    {
        id: 3,
        title: 'Grant Tracking',
        description: 'Track funding sources and allocation with precision.',
        icon: Wallet,
        large: false
    },
    {
        id: 4,
        title: 'Student Success',
        description: 'Personalized pathways for every learner.',
        icon: GraduationCap,
        large: false
    },
    {
        id: 5,
        title: 'Performance Metrics',
        description: 'Data-driven insights for continuous improvement.',
        icon: TrendingUp,
        large: false
    },
    {
        id: 6,
        title: 'Team Collaboration',
        description: 'Unified platform for educators and administrators.',
        icon: Users,
        large: false
    }
];

export default function BentoGrid() {
    return (
        <section className="px-4 py-20 max-w-7xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
            >
                <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
                    Everything You Need
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Powerful features designed for modern educational institutions.
                </p>
            </motion.div>

            {/* Bento Grid - 3 columns, 2 rows */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {features.map((feature, index) => {
                    const Icon = feature.icon;

                    return (
                        <motion.div
                            key={feature.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            whileHover={{ y: -4 }}
                            className={`glass-panel rounded-xl p-6 flex flex-col ${feature.large ? 'md:col-span-2 lg:col-span-2' : ''
                                }`}
                        >
                            {/* Icon */}
                            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                                <Icon size={24} className="text-primary" />
                            </div>

                            {/* Title & Description */}
                            <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                            <p className="text-muted-foreground text-sm mb-4">{feature.description}</p>

                            {/* Dummy Chart for Large Card */}
                            {feature.chart && (
                                <div className="mt-auto pt-6">
                                    <div className="flex items-end gap-2 h-32">
                                        {[40, 65, 45, 80, 55, 90, 70, 85].map((height, i) => (
                                            <div
                                                key={i}
                                                className="flex-1 bg-gradient-to-t from-primary/60 to-primary/20 rounded-t-lg transition-all hover:from-primary/80 hover:to-primary/40"
                                                style={{ height: `${height}%` }}
                                            />
                                        ))}
                                    </div>
                                    <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                                        <span>Jan</span>
                                        <span>Feb</span>
                                        <span>Mar</span>
                                        <span>Apr</span>
                                        <span>May</span>
                                        <span>Jun</span>
                                        <span>Jul</span>
                                        <span>Aug</span>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
}
