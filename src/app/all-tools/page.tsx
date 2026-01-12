'use client';

import FloatingNavbar from '@/components/FloatingNavbar';
import FeatureShowcaseGrid from '@/components/FeatureShowcaseGrid';
import Footer from '@/components/Footer';
import FeatureVideos from '@/components/FeatureVideos';

export default function AllToolsPage() {
    return (
        <main className="min-h-screen bg-black">
            <FloatingNavbar />
            <div className="pt-24">
                <FeatureShowcaseGrid />
                <FeatureVideos />
            </div>
            <Footer />
        </main>
    );
}
