import FeatureShowcaseGrid from '@/components/FeatureShowcaseGrid';
import FeatureVideos from '@/components/FeatureVideos';

export default function AllToolsClient() {
    return (
        <main className="content-stage">
            <section className="py-20">
                <FeatureShowcaseGrid />
                <FeatureVideos />
            </section>
        </main>
    );
}
