"use client"

import { useSearchParams } from 'next/navigation'
import ClientGenerator from "@/components/ClientGenerator"
import { Suspense } from 'react'

function GeneratorContent() {
    const searchParams = useSearchParams()
    const id = searchParams.get('id')

    if (!id) return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <div className="w-8 h-8 border-t-2 border-[#00d2ff] rounded-full animate-spin"></div>
                <p>Locating Neural Node...</p>
            </div>
        </div>
    )
    return <ClientGenerator generatorId={id} />
}

export default function GeneratorPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-black text-white flex items-center justify-center">Initializing...</div>}>
            <GeneratorContent />
        </Suspense>
    )
}
