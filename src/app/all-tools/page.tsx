'use client';

import FloatingNavbar from '@/components/FloatingNavbar';
import FeatureShowcaseGrid from '@/components/FeatureShowcaseGrid';
import Footer from '@/components/Footer';
import FeatureVideos from '@/components/FeatureVideos';
import SovereignDelegate from '@/components/SovereignDelegate';

export default function AllToolsPage() {
    return (
        <main className="min-h-screen bg-black">
            <FloatingNavbar />
            <div className="pt-24">
                <FeatureShowcaseGrid />
                <FeatureVideos />
            </div>

            <SovereignDelegate
                name="Sovereign Strategist"
                role="System Guide"
                avatarImage="/images/avatars/curriculum_strategist.png"
                color="from-pink-500 to-rose-600"
                greetingText="Explore our 41 specialized AI tools designed for educational excellence."
            />
            <Footer />
        </main >
    );
}
