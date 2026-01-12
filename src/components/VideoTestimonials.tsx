'use client';

import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';
import VideoPlayer from './VideoPlayer';

export default function VideoTestimonials() {
    // Placeholder data - replace with actual video testimonials when available
    const testimonials = [
        {
            name: 'Dr. Sarah Johnson',
            role: 'Special Education Director',
            district: 'Mobile County Schools',
            video: '/videos/testimonials/educator-1.mp4',
            thumbnail: '/images/avatars/special_ed_director.png',
            quote: 'EdIntel has transformed how we create IEPs. What used to take hours now takes minutes.',
            rating: 5
        },
        {
            name: 'Marcus Williams',
            role: 'STEM Coordinator',
            district: 'Birmingham City Schools',
            video: '/videos/testimonials/educator-2.mp4',
            thumbnail: '/images/avatars/stem_coordinator.png',
            quote: 'The AI delegates understand our students and help us create truly personalized learning experiences.',
            rating: 5
        },
        {
            name: 'Dr. Angela Davis',
            role: 'Literacy Coach',
            district: 'Montgomery Public Schools',
            video: '/videos/testimonials/educator-3.mp4',
            thumbnail: '/images/avatars/literacy_coach.png',
            quote: 'Finally, an AI tool built by educators who understand the real challenges we face every day.',
            rating: 5
        }
    ];

    return (
        <section className="relative py-24 bg-gradient-to-br from-zinc-950 to-indigo-950/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-bold uppercase tracking-widest mb-6">
                        <Quote size={14} />
                        <span>Educator Voices</span>
                    </div>
                    <h2 className="text-4xl sm:text-5xl font-black text-white mb-6">
                        Hear From Our{' '}
                        <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                            Sovereign Educators
                        </span>
                    </h2>
                    <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
                        Real stories from Alabama educators who are transforming their practice with EdIntel
                    </p>
                </motion.div>

                {/* Video Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="bg-zinc-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-indigo-500/50 transition-all"
                        >
                            {/* Video Player */}
                            <VideoPlayer
                                src={testimonial.video}
                                poster={testimonial.thumbnail}
                                title={testimonial.name}
                                description={testimonial.role}
                                className="mb-6"
                            />

                            {/* Rating */}
                            <div className="flex gap-1 mb-4">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                ))}
                            </div>

                            {/* Quote */}
                            <blockquote className="text-zinc-300 mb-4 italic">
                                "{testimonial.quote}"
                            </blockquote>

                            {/* Author Info */}
                            <div className="border-t border-white/10 pt-4">
                                <p className="text-white font-bold">{testimonial.name}</p>
                                <p className="text-indigo-400 text-sm">{testimonial.role}</p>
                                <p className="text-zinc-500 text-xs">{testimonial.district}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Note about placeholder videos */}
                <div className="mt-12 text-center">
                    <div className="inline-block bg-yellow-500/10 border border-yellow-500/20 rounded-xl px-6 py-3">
                        <p className="text-yellow-400 text-sm">
                            📹 <strong>Note:</strong> Video testimonials will be added once available.
                            Component is ready for integration!
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
