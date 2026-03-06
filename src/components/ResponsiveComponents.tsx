import React from 'react'

export function ResponsiveGrid({ children }: { children: React.ReactNode }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            {children}
        </div>
    )
}

export function MobileCard({
    title,
    description,
    icon,
    onClick,
    badge
}: {
    title: string
    description: string
    icon: string | React.ReactNode
    onClick?: () => void
    badge?: string
}) {
    return (
        <button
            onClick={onClick}
            className="w-full p-5 bg-card border border-border rounded-2xl shadow-sm hover:shadow-xl hover:border-blue-500/50 transition-all text-left active:scale-[0.98] group relative overflow-hidden"
        >
            {badge && (
                <div className="absolute top-0 right-0 px-3 py-1 bg-blue-500 text-white text-[10px] font-bold uppercase tracking-tighter rounded-bl-xl">
                    {badge}
                </div>
            )}
            <div className="text-4xl mb-4 p-3 bg-muted w-fit rounded-2xl group-hover:bg-blue-500/10 group-hover:text-blue-500 transition-colors">
                {typeof icon === 'string' ? icon : icon}
            </div>
            <h3 className="text-lg font-bold text-foreground mb-1 tracking-tight">{title}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{description}</p>

            <div className="mt-4 flex items-center text-[10px] font-bold text-blue-500 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                Engage Protocol →
            </div>
        </button>
    )
}
