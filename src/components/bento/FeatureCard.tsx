import Image from 'next/image';

interface Feature {
    title: string;
    description: string;
    image: string;
}

export default function FeatureCard({ feature }: { feature: Feature }) {
    return (
        <article className="group bg-zinc-950/50 backdrop-blur-md border border-white/5 rounded-[2rem] overflow-hidden hover:border-intel-gold/30 transition-all duration-500 shadow-2xl">
            <div className="relative h-64 overflow-hidden">
                <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700 opacity-60 group-hover:opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
            </div>
            <div className="p-8">
                <h3 className="text-2xl font-black text-white mb-3 uppercase tracking-tighter">{feature.title}</h3>
                <p className="text-zinc-400 leading-relaxed mb-4">{feature.description}</p>
                <div className="h-1 w-12 bg-intel-gold/30 group-hover:w-full transition-all duration-500" />
            </div>
        </article>
    );
}
