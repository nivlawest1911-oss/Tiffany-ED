import React from 'react';

interface Feature {
    title: string;
    description: string;
    image: string;
}

export default function FeatureCard({ feature }: { feature: Feature }) {
    return (
        <article className="group bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="relative h-48">
                <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>
            <div className="p-6">
                <h3 className="text-xl font-black text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-white/70 mb-4">{feature.description}</p>
            </div>
        </article>
    );
}
