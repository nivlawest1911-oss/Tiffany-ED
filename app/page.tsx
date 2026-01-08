import { TopNav } from "@/components/top-nav"
import { HeroSection } from "@/components/hero-section"
import { PricingSection } from "@/components/pricing-section"
import { NeuralSyncSection } from "@/components/neural-sync-section"
import { DashboardSection } from "@/components/dashboard-section"
import { TokenSection } from "@/components/token-section"
import { FounderDossier } from "@/components/founder-dossier"
import { AIDelegatesSidebar } from "@/components/ai-delegates-sidebar"
import { LeadershipIntelligence } from "@/components/leadership-intelligence"
import { MorningIntel } from "@/components/morning-intel"
import { LegalSingularityVault } from "@/components/legal-singularity-vault"
import { PersonnelSentiment } from "@/components/personnel-sentiment"
import { GlobalPresence } from "@/components/global-presence"
import { AvatarLab } from "@/components/avatar-lab"
import { SovereignLabs } from "@/components/sovereign-labs"
import { NetworkFeed } from "@/components/network-feed"
import { SupportProtocol } from "@/components/support-protocol"
import { WhatIsEdIntel } from "@/components/what-is-edintel"
import { SovereignIdentity } from "@/components/sovereign-identity"
import { AIGeneratorsHub } from "@/components/ai-generators-hub"
import { ResearchHub } from "@/components/research-hub"

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white overflow-x-hidden">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,_#0d1117_0%,_#000000_70%)] -z-10" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(0,210,255,0.1)_0%,_transparent_50%)] -z-10" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(16,185,129,0.08)_0%,_transparent_50%)] -z-10" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(212,175,55,0.05)_0%,_transparent_40%)] -z-10" />

      {/* Grid pattern overlay */}
      <div className="fixed inset-0 grid-pattern opacity-30 -z-10" />

      <AIDelegatesSidebar />

      <TopNav />
      <HeroSection />
      <DashboardSection />
      <WhatIsEdIntel />
      <AIGeneratorsHub />
      <MorningIntel />
      <FounderDossier />
      <LeadershipIntelligence />
      <NeuralSyncSection />
      <AvatarLab />
      <SovereignLabs />
      <ResearchHub />
      <PersonnelSentiment />
      <SovereignIdentity />
      <LegalSingularityVault />
      <NetworkFeed />
      <PricingSection />
      <TokenSection />
      <SupportProtocol />
      <GlobalPresence />
    </main>
  )
}
