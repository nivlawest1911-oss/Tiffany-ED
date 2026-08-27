import { cookies } from 'next/headers';
import { SovereignDifferentiationEngine } from "@/components/differentiation/SovereignDifferentiationEngine";

export const dynamic = 'force-dynamic';

export const metadata = {
  title: "Sovereign Differentiation Engine | EdIntel Operations",
  description: "Native Science of Reading aligned AI content leveling and instructional scaffolds for Mobile County schools.",
};

export default async function DifferentiationGeneratorPage() {
  await cookies();
  return <SovereignDifferentiationEngine />;
}
