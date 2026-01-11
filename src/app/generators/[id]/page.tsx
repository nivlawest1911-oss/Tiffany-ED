"use client"

import { useParams } from 'next/navigation'
import ClientGenerator from "@/components/ClientGenerator"

export default function GeneratorPage() {
    const params = useParams()

    if (!params?.id) return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
            Loading Node...
        </div>
    )

    return <ClientGenerator generatorId={params.id as string} />
}
