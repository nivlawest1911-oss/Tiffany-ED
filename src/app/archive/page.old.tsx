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
import { AITwinGenerator } from "@/components/ai-twin-generator"
import { WearableIntegration } from "@/components/wearable-integration"
import { CollaborationHub } from "@/components/collaboration-hub"
import { VRTraining } from "@/components/vr-training"
import { BlockchainCredentials } from "@/components/blockchain-credentials"
import { CinematicBackground } from "@/components/cinematic-background"
import { MediaSynthesisStudio } from "@/components/media-synthesis-studio"
import { SovereignDelegates } from "@/components/sovereign-delegates"

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white overflow-x-hidden">
      <CinematicBackground />

      {/* Grid pattern overlay */}
      <div className="fixed inset-0 grid-pattern opacity-30 -z-40" />

      <AIDelegatesSidebar />

      <TopNav />
      <HeroSection />
      <SovereignDelegates />
      <DashboardSection />
      <WhatIsEdIntel />
      <AIGeneratorsHub />
      <AITwinGenerator />
      <MorningIntel />
      <FounderDossier />
      <LeadershipIntelligence />
      <NeuralSyncSection />
      <MediaSynthesisStudio />
      <AvatarLab />
      <SovereignLabs />
      <WearableIntegration />
      <CollaborationHub />
      <VRTraining />
      <BlockchainCredentials />
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
