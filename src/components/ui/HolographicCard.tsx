'use client'
import React from 'react'
import { cn } from '@/lib/utils'

interface HolographicCardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode
    className?: string
    title?: string
    subtitle?: string
    icon?: React.ReactNode
}

export function HolographicCard({
    children,
    className,
    title,
    subtitle,
    icon,
    ...props
}: HolographicCardProps) {
    return (
        <div
            className={cn(
                "holographic-card p-6",
                className
            )}
            {...props}
        >
            <div className="relative z-10">
                {(title || subtitle || icon) && (
                    <div className="flex items-center justify-between mb-4 border-b border-primary-500/10 pb-4">
                        <div className="flex items-center gap-3">
                            {icon && <div className="p-2 rounded-lg bg-primary-500/10 border border-primary-500/20">{icon}</div>}
                            <div>
                                {title && <h3 className="text-xs font-black text-white uppercase tracking-[0.2em]">{title}</h3>}
                                {subtitle && <p className="text-[9px] text-primary-400/60 font-bold uppercase tracking-widest mt-0.5">{subtitle}</p>}
                            </div>
                        </div>
                    </div>
                )}
                {children}
            </div>
        </div>
    )
}
