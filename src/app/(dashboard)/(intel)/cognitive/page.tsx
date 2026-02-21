import CognitiveClient from './CognitiveClient';

// Mock data fetching function with smart caching
async function getCognitiveStats() {
  // In production, this would be: 
  // const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/cognitive/stats`, { 
  //   next: { tags: ['cognitive_stats'] } 
  // });

  // For now, simulate a fast server-side fetch with tags
  return {
    velocity: [30, 45, 38, 52, 65, 58, 72],
    latency: [70, 62, 75, 55, 48, 50, 42],
    baseline: 18,
  };
}

export default async function CognitiveCommandCenter() {
  const stats = await getCognitiveStats();

  return <CognitiveClient initialStats={stats} />;
}
