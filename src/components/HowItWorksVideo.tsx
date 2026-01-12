'use client';

import { motion } from 'framer-motion';
import { Play, Sparkles, CheckCircle } from 'lucide-react';
import VideoPlayer from './VideoPlayer';

export default function HowItWorksVideo() {
    const steps = [
        {
            number: '1',
            title: 'Choose Your Tool',
            description: 'Select from 41+ specialized AI assistants designed for educators',
            video: '/videos/how-it-works/step-1-choose-tool.mp4',
            thumbnail: '/images/avatars/executive_leader.png',
            features: ['Browse by category', 'Search by need', 'Recommended tools']
        },
        {
            number: '2',
            title: 'Enter Details',
            description: 'Provide context about your students, goals, and requirements',
            video: '/videos/how-it-works/step-2-enter-details.mp4',
            thumbnail: '/images/avatars/curriculum_strategist.png',
            features: ['Simple forms', 'Smart suggestions', 'Save templates']
        },
        {
            number: '3',
            title: 'Download Result',
            description: 'Get professional, FERPA-compliant documents ready to use',
            video: '/videos/how-it-works/step-3-download-result.mp4',
            thumbnail: '/images/avatars/data_analyst.png',
            features: ['PDF & Word export', 'Instant download', 'Edit anytime']
        }
    ];

    return (
        <section className="relative py-24 bg-zinc-950">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-bold uppercase tracking-widest mb-6">
                        <Play size={14} />
                        <span>See It In Action</span>
                    </div>
                    <h2 className="text-4xl sm:text-5xl font-black text-white mb-6">
                        How EdIntel{' '}
                        <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                            Works
                        </span>
                    </h2>
                    <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
                        Get started in 3 simple steps. Watch how easy it is to create professional educational documents.
                    </p>
                </motion.div>

                {/* Steps with Videos */}
                <div className="space-y-24">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                                }`}
                        >
                            {/* Video Side */}
                            <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                                <VideoPlayer
                                    src={step.video}
                                    poster={step.thumbnail}
                                    title={`Step ${step.number}`}
                                    description={step.title}
                                    className="shadow-2xl shadow-indigo-500/20"
                                />
                            </div>

                            {/* Content Side */}
                            <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-2xl font-black mb-6 shadow-lg shadow-indigo-500/50">
                                    {step.number}
                                </div>
                                <h3 className="text-3xl font-black text-white mb-4">{step.title}</h3>
                                <p className="text-xl text-zinc-400 mb-8 leading-relaxed">
                                    {step.description}
                                </p>
                                <ul className="space-y-3">
                                    {step.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-center gap-3">
                                            <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                                            <span className="text-zinc-300">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Note */}
                <div className="mt-16 text-center">
                    <div className="inline-block bg-yellow-500/10 border border-yellow-500/20 rounded-xl px-6 py-3">
                        <p className="text-yellow-400 text-sm">
                            📹 <strong>Note:</strong> Demo videos will be added once available.
                            Component is ready for integration!
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
