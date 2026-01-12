'use client';

import FloatingNavbar from '@/components/FloatingNavbar';
import Footer from '@/components/Footer';

export default function TestMediaPage() {
    return (
        <main className="min-h-screen bg-black text-white p-20">
            <FloatingNavbar />
            <h1 className="text-4xl mb-10">Media Verification Page</h1>
            <div className="grid grid-cols-2 gap-10">
                <div>
                    <h2 className="text-xl mb-4">IEP Architect</h2>
                    <img src="/images/avatars/iep_architect.png" alt="IEP" className="w-64 h-64 object-cover border-4 border-indigo-500" />
                </div>
                <div>
                    <h2 className="text-xl mb-4">Executive Leader</h2>
                    <img src="/images/avatars/executive_leader.png" alt="Exec" className="w-64 h-64 object-cover border-4 border-indigo-500" />
                </div>
                <div>
                    <h2 className="text-xl mb-4">Behavior Specialist</h2>
                    <img src="/images/avatars/behavior_specialist.png" alt="Behav" className="w-64 h-64 object-cover border-4 border-indigo-500" />
                </div>
                <div>
                    <h2 className="text-xl mb-4">Curriculum Strategist</h2>
                    <img src="/images/avatars/curriculum_strategist.png" alt="Curr" className="w-64 h-64 object-cover border-4 border-indigo-500" />
                </div>
            </div>
            <Footer />
        </main>
    );
}
