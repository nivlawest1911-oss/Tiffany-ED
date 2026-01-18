'use client';

import { motion } from 'framer-motion';
import { ShoppingBag, TrendingUp, DollarSign, Star, User, ArrowRight } from 'lucide-react';
import Image from 'next/image';

export default function NeuralMarketplace() {
    const listings = [
        {
            title: "AP Calculus AB: Full Year Curriculum",
            author: "Sarah M.",
            earnings: "$12,450",
            price: "$199",
            rating: 5.0,
            image: "/images/avatars/curriculum_strategist.png"
        },
        {
            title: "Orton-Gillingham Intervention Bundle",
            author: "Dr. K. Lewis",
            earnings: "$8,200",
            price: "$49",
            rating: 4.9,
            image: "/images/avatars/avatar_1.png"
        },
        {
            title: "PBIS Tier 2 & 3 Behavior Tracking System",
            author: "Coach Carter",
            earnings: "$5,100",
            price: "$29",
            rating: 4.8,
            image: "/images/avatars/avatar_2.png"
        }
    ];

    return (
        <section className="py-24 bg-zinc-950 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-[10px] font-black uppercase tracking-[0.2em] mb-6 border border-purple-500/20">
                            <ShoppingBag size={12} />
                            <span>Creator Economy Active</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                            Turn Your Expertise Into <span className="text-emerald-400">Recurring Revenue</span>
                        </h2>
                        <p className="text-zinc-400 max-w-xl text-lg">
                            Don't just use AI—sell what you build. Join the Neural Marketplace to list your Sovereignty-verified curriculum and protocols.
                        </p>
                    </div>

                    <button className="px-8 py-4 bg-white text-black rounded-xl font-bold uppercase tracking-widest hover:bg-zinc-200 transition-colors flex items-center gap-2">
                        Become a Creator <ArrowRight size={16} />
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {listings.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden group hover:border-purple-500/50 transition-all shadow-xl"
                        >
                            <div className="h-48 bg-zinc-800 relative group-hover:scale-105 transition-transform duration-500 bg-[url('/placeholders/curriculum_bg.jpg')] bg-cover bg-center">
                                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent" />
                                <div className="absolute bottom-4 left-4 flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full border border-white/20 overflow-hidden">
                                        <img src={item.image} alt={item.author} className="w-full h-full object-cover" />
                                    </div>
                                    <span className="text-xs font-bold text-white shadow-black drop-shadow-md">{item.author}</span>
                                </div>
                                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg text-emerald-400 text-xs font-black uppercase tracking-wider border border-emerald-500/20">
                                    Earned: {item.earnings}
                                </div>
                            </div>

                            <div className="p-6">
                                <h3 className="text-lg font-bold text-white mb-2 leading-tight group-hover:text-purple-400 transition-colors">{item.title}</h3>
                                <div className="flex justify-between items-center mt-4">
                                    <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                                        <Star size={12} fill="currentColor" /> {item.rating}
                                    </div>
                                    <div className="text-xl font-black text-white">{item.price}</div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
