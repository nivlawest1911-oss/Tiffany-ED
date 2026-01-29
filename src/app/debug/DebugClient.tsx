'use client';

import Link from 'next/link';

export default function DebugClient() {
    return (
        <div className="min-h-screen bg-black text-white p-8">
            <h1 className="text-4xl font-bold mb-8">Debug Info</h1>
            <div className="space-y-4">
                <p>If you see this page, the app is working!</p>
                <p>Current time: {new Date().toISOString()}</p>
                <Link href="/" className="text-blue-400 underline">Go to Homepage</Link>
            </div>
        </div>
    );
}
