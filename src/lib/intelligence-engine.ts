export interface DeepIntelligence {
    title: string;
    description: string;
    stats: { time: string; saved: string; accuracy: string; };
    role: string;
    avatar: string;
    video?: string;
    audio?: string;
    abilityType?: 'strategy' | 'compliance' | 'analytics' | 'curriculum' | 'identity' | 'communication';
    suggestedNext?: string[]; // Keys of INTELLIGENCE_MAP
}

export const INTELLIGENCE_MAP: Record<string, DeepIntelligence> = {
    'Legacy Profile': {
        title: 'Strategic Analysis: Legacy Profile',
        description: 'Dr. Alvin West, II is the Founder and Chief Architect of EdIntel. A Doctorate-level clinical and fiscal strategist, he bridges the gap between neural technological innovation and meticulous operational excellence. With a legacy rooted in the heritage of Africatown and a career spanning AI development at Outlier and transformative leadership in Mobile County, Dr. West champions the fusion of machine learning with culturally-responsive leadership frameworks. His work shapes the high-fidelity narratives that propel institutional success in the Sovereign era.',
        stats: { time: 'Calculated', saved: 'Institutional Legacy', accuracy: '100%' },
        role: 'Founder & Chief Architect',
        avatar: '/images/avatars/Dr._alvin_west.png',
        audio: '/videos/mirage-studio-audio-02-12-2026 (1).wav',
        abilityType: 'strategy',
        suggestedNext: ['Professional Center', 'The Room', 'EdIntel Core']
    },
    'Student Focus': {
        title: 'Strategic Briefing: Student Focus',
        description: 'Synchronizing neural performance with cognitive benchmarks for student success. This protocol optimizes working memory capacity and recall velocity across the K-12 spectrum.',
        stats: { time: 'Real-time', saved: '4.2 hrs/wk', accuracy: '98.5%' },
        role: 'Learning Architect',
        avatar: '/images/avatars/student_focus.png',
        video: '/videos/how_edintel_works3.mp4',
        abilityType: 'analytics',
        suggestedNext: ['Data Intelligence', 'Neural Sync Gym', 'Counselor Briefing']
    },
    'Teacher Guard': {
        title: 'Strategic Briefing: Teacher Guard',
        description: 'Deploying burnout shields and executive function support for front-line educators. Our protocols reduce cognitive load by 40% through automated narrative synthesis and real-time adjustment.',
        stats: { time: 'Instant', saved: '12 hrs/wk', accuracy: '99%' },
        role: 'Educator Liaison',
        avatar: '/images/avatars/teacher_guard.png',
        video: '/videos/how_edintel_works1.mp4',
        abilityType: 'compliance',
        suggestedNext: ['IEP Architect', 'Voice Synthesis', 'Lesson Wizard']
    },
    'IEP Architect': {
        title: 'IEP Architectural Engine',
        description: 'Leveraging Level 4 Neural Compliance, the IEP Architect synthesizes student assessment data into legally robust, measurable goals. It cross-references current Alabama SDE statutes with 100% fidelity.',
        stats: { time: 'Real-time', saved: '4 hours/IEP', accuracy: '99.8%' },
        role: 'Compliance Architect',
        avatar: '/images/avatars/iep.png',
        video: '/videos/features/iep-architect-demo.mp4',
        audio: '/audio/briefings/iep-architect.mp3',
        abilityType: 'compliance',
        suggestedNext: ['risk-analyzer', 'Lesson Wizard', 'Automated Audit']
    },
    'Lesson Wizard': {
        title: 'Quantum Curriculum Foundry',
        description: 'The Lesson Wizard transforms static state standards into dynamic, multi-tiered learning experiences. It automatically differentiates for diverse learner profiles while synthesizing engagement strategies.',
        stats: { time: '3 min', saved: 'Curricular Flow', accuracy: '98%' },
        role: 'Curriculum Strategist',
        avatar: '/images/avatars/lesson.png',
        video: '/videos/features/lesson-planner-demo.mp4',
        audio: '/audio/briefings/lesson-wizard.mp3',
        abilityType: 'curriculum',
        suggestedNext: ['IEP Architect', 'Video Studio', 'Leadership Training']
    },
    'Lesson Planner': {
        title: 'Quantum Curriculum Foundry',
        description: 'The Lesson Planner Pro transforms static state standards into dynamic, multi-tiered learning experiences. It automatically differentiates for diverse learner profiles.',
        stats: { time: '3 min', saved: '2 hours', accuracy: '98%' },
        role: 'Curriculum Strategist',
        avatar: '/images/avatars/keisha_reynolds_premium.png',
        video: '/videos/features/lesson-planner-demo.mp4',
        abilityType: 'curriculum',
        suggestedNext: ['IEP Architect', 'Video Studio', 'Leadership Training']
    },
    'Data Intelligence': {
        title: 'Executive Intelligence Command',
        description: 'Aggregate and analyze fragmented district data streams into a unified strategic dashboard. We identify "Opportunity Centers"—pockets of instructional potential—and provide actionable directives for immediate capital recovery.',
        stats: { time: '2 min', saved: '10h/report', accuracy: '100%' },
        role: 'Chief Analyst',
        avatar: '/images/avatars/data_analyst.png',
        video: '/videos/features/data-analysis-demo.mp4',
        abilityType: 'analytics',
        suggestedNext: ['Data Briefing', 'Executive Dashboard', 'Budget Report']
    },
    'EdIntel Core': {
        title: 'EdIntel ID Protocol',
        description: 'Your EdIntel Identity is a triple-redundant biometric shield fueled by Google Gemini 3 Pro and NVIDIA ACE 3.0. It powers your digital twins with sub-second latency and persistent thought signatures, ensuring your leadership presence is felt across every building without compromising security.',
        stats: { time: '0ms latency', saved: 'Infinite Scale', accuracy: '99.99%' },
        role: 'Identity Architect',
        avatar: '/images/avatars/executive_leader.png',
        video: '/videos/Architecting_and_Deploying_Holographic_AI.mp4',
        abilityType: 'identity',
        suggestedNext: ['Identity Cloning', 'Avatar Masterclass', 'EdIntel Account']
    },
    'Gemini Workspace': {
        title: 'Neural Synthesis Chamber',
        description: 'Integrate the power of Google Gemini directly into your administrative workflow. This workspace serves as a collaborative intelligence hub for drafting policy, analyzing work samples, and modeling complex fiscal scenarios with high-fidelity projections.',
        stats: { time: 'Sub-second', saved: '20h/month', accuracy: '99.5%' },
        role: 'Neural Strategist',
        avatar: '/images/avatars/stem_coordinator.png',
        video: '/videos/Video_Generation_with_EdIntel.mp4',
        abilityType: 'analytics',
        suggestedNext: ['AI Hub', 'Neural Synthesis', 'Hugging Face']
    },
    'Pricing': {
        title: 'Investment & ROI Analysis',
        description: 'EdIntel EdIntel is not an expense; it is a capital recovery vehicle. By automating high-overhead administrative tasks, we allow your district to reinvest thousands of human-hours back into direct student instruction.',
        stats: { time: 'FY2026 Ready', saved: 'High ROI', accuracy: 'Guaranteed' },
        role: 'Fiscal Director',
        avatar: '/images/avatars/special_ed_director.png'
    },
    'Features': {
        title: 'Architectural Feature Suite',
        description: 'Explore the multi-layered capabilities of the EdIntel ecosystem. From generative media studios to real-time behavioral intervention systems, our features are architected to scale with your leadership demands.',
        stats: { time: 'Modular', saved: 'Comprehensive', accuracy: '99%' },
        role: 'Systems Architect',
        avatar: '/images/avatars/executive_leader.png',
        video: '/videos/The_Ultimate_Solution_for_Mode_Fixed.mp4',
        abilityType: 'strategy',
        suggestedNext: ['AI Hub', 'Enterprise', 'Professional Center']
    },
    'AI Hub': {
        title: 'Neural Hub Nexus',
        description: 'The AI Hub is the central processing unit for all generative tasks. It coordinates between Replicate, Google Gemini, and our proprietary high-fidelity avatars to deliver a unified intelligence experience.',
        stats: { time: 'Aggregated', saved: '30h/week', accuracy: '99.7%' },
        role: 'AI Director',
        avatar: '/images/avatars/dr-west.png',
        audio: '/audio/briefings/ai-hub-overview.mp3',
        abilityType: 'analytics'
    },
    'About': {
        title: 'Mission & Strategic Vision',
        description: 'EdIntel EdIntel was founded on the principle of "Instructional Agency." Our mission is to return agency to educational leaders by removing the friction of administrative compliance through advanced technology.',
        stats: { time: 'Perpetual', saved: 'Infinite', accuracy: 'High Fidelity' },
        role: 'Founder & CEO',
        avatar: '/images/avatars/Dr._alvin_west.png'
    },
    'Enterprise': {
        title: 'Enterprise District Protocol',
        description: 'Full-scale deployment for large districts. This tier includes dedicated cloud clusters, custom voice clone archives for all cabinet members, and custom-trained policy advisors for local board regulations.',
        stats: { time: 'Custom', saved: 'District-Wide', accuracy: 'Quantum' },
        role: 'Enterprise Lead',
        avatar: '/images/avatars/executive_leader.png',
        video: '/videos/AI_Agents_Eliminate_Administrator_Fatigue%20(1).mp4',
        abilityType: 'strategy',
        suggestedNext: ['district-strategy', 'Admin Vision', 'Principal Briefing']
    },
    'Executive Dashboard': {
        title: 'Executive Strategic Overwatch',
        description: 'A macro-level visualization of district operational health. It monitors key performance vectors including attendance trends, fiscal burn rates, and instructional compliance in real-time.',
        stats: { time: 'Continuously Syncing', saved: '20h/week', accuracy: '100%' },
        role: 'Chief Analytics Officer',
        avatar: '/images/avatars/data_analyst.png',
        video: '/videos/Video_Generation_for_School_Administrators.mp4',
        abilityType: 'analytics',
        suggestedNext: ['Data Intelligence', 'Budget Report', 'Admin Vision']
    },
    'Leadership Training': {
        title: 'Neural Leadership Command',
        description: 'Simulated high-stakes administrative scenarios designed to calibrate executive decision-making. These modules use generative behavioral models to provide authentic feedback on leadership directives.',
        stats: { time: 'On-demand', saved: 'Professional Growth', accuracy: '99.5%' },
        role: 'Executive Coach',
        avatar: '/images/avatars/Dr._alvin_west.png',
        video: '/videos/Edintel_App_Burnout_Suspensions_Fatigue_Solution%20(1).mp4',
        abilityType: 'strategy',
        suggestedNext: ['Neural Sync Gym', 'Avatar Masterclass', 'Principal Briefing']
    },
    'Avatar Masterclass': {
        title: 'Identity Synchronization Protocol',
        description: 'Master the art of digital presence. Learn to deploy your EdIntel Digital Twin across multiple communication channels while maintaining 100% cultural and professional fidelity.',
        stats: { time: '2-Session Cert', saved: 'Ubiquity', accuracy: 'Perfect' },
        role: 'Digital Identity Specialist',
        avatar: '/images/avatars/executive_leader.png'
    },
    'Neural Sync Gym': {
        title: 'Cognitive Calibration Lab',
        description: 'Optimize the alignment between your human leadership style and the AI agents under your command. This lab ensures your synthetic delegates reflect your exact values and rhetorical preferences.',
        stats: { time: 'Daily 5m', saved: 'Total Alignment', accuracy: '99.9%' },
        role: 'Neural Architect',
        avatar: '/images/avatars/stem_coordinator.png'
    },
    'Social Uplink': {
        title: 'Professional Advocacy Nexus',
        description: 'Connect with other EdIntel leaders in a secure, encrypted social environment. Share successful instructional protocols and coordinate advocacy efforts across district lines.',
        stats: { time: 'Live', saved: 'Collective Power', accuracy: 'Verified' },
        role: 'Community Lead',
        avatar: '/images/avatars/curriculum_strategist.png'
    },
    'Automated Audit': {
        title: 'Zero-Touch Compliance Audit',
        description: 'Automated script-based auditing of IEPs, 504s, and fiscal ledgers. Our bots identify compliance vulnerabilities before state audits occur, saving millions in potential funding clawbacks.',
        stats: { time: 'Background', saved: 'Thousands of Hours', accuracy: '100%' },
        role: 'Compliance Officer',
        avatar: '/images/avatars/special_ed_director.png'
    },
    'EdIntel Social': {
        title: 'EdIntel Social Uplink',
        description: 'The premier professional network for educational EdIntels. Exchange strategic blueprints and neural voice profiles within a high-trust, biometric-verified ecosystem.',
        stats: { time: 'Syncing', saved: 'Global Network', accuracy: '100%' },
        role: 'Network Director',
        avatar: '/images/avatars/executive_leader.png'
    },
    'Crisis Protocol': {
        title: 'Rapid Response Synthesis',
        description: 'Immediate generation of communications, logistics, and administrative directives during high-intensity events. Protocol Omega ensures leadership remains clear and decisive under pressure.',
        stats: { time: 'Immediate', saved: 'Critical', accuracy: 'High-Stakes' },
        role: 'Safety Director',
        avatar: '/images/avatars/special_ed_director.png',
        video: "/videos/Health for Alabama's Educators.mp4"
    },
    'Budget Report': {
        title: 'Fiscal Variance Analysis',
        description: 'Transform complex accounting data into crystal-clear executive summaries. Identify surplus vectors and optimize resource allocation across all Title programs.',
        stats: { time: '4s', saved: '15h/month', accuracy: '100%' },
        role: 'Chief Fiscal Officer',
        avatar: '/images/avatars/data_analyst.png'
    },
    'Contact': {
        title: 'Executive Support Uplink',
        description: 'Direct neural link to the EdIntel Support Team. We provide white-glove onboarding and technical calibration for enterprise leaders during their first 100 days.',
        stats: { time: '< 2m', saved: 'Total Support', accuracy: 'Platinum' },
        role: 'Support Lead',
        avatar: '/images/avatars/executive_leader.png'
    },
    'Identity Cloning': {
        title: 'Biometric Synthesis Protocol',
        description: 'Your identity is your power. We use advanced spectral analysis to clone your voice and visual patterns, enabling your leadership presence to transcend physical boundaries while maintaining strict ethical and security firewalls.',
        stats: { time: '3m Analysis', saved: 'Ubiquity', accuracy: '100% Match' },
        role: 'Identity Architect',
        avatar: '/images/avatars/executive_leader.png'
    },
    'Universal Ledger': {
        title: 'Immutable Decision Ledger',
        description: 'Every administrative directive and student record is vaulted in a secure, immutable ledger. This provides a clear audit trail for compliance while ensuring the integrity of institutional memory.',
        stats: { time: 'Permanent', saved: 'Total Continuity', accuracy: 'Indisputable' },
        role: 'Compliance Officer',
        avatar: '/images/avatars/special_ed_director.png'
    },
    'Neural Synthesis': {
        title: 'Quantum Synthesis Hub',
        description: 'Neural synthesis merges disparate district data—from lunch wave logistics to Tier-3 behavior plans—into a single, cohesive institutional intelligence. It identifies hidden efficiencies and predicts student needs before they manifest.',
        stats: { time: 'Real-time', saved: '40h/week', accuracy: '99.9%' },
        role: 'AI Strategist',
        avatar: '/images/avatars/stem_coordinator.png'
    },
    'Autonomous Protocols': {
        title: 'Executive Autonomy Engine',
        description: 'Deploy autonomous agents to handle the high-volume, low-leverage tasks of administration. From drafting sub plans to auditing grant reports, our bots execute with machine-level precision under your overwatch.',
        stats: { time: 'Instant', saved: '60%', accuracy: 'Unmatched' },
        role: 'Autonomous Lead',
        avatar: '/images/avatars/executive_leader.png'
    },
    'Protocol Omega': {
        title: 'Omega Strategic Deployment',
        description: 'Protocol Omega is the total activation of all EdIntel systems. It represents the final stage of institutional digital transformation, where every administrative friction point is neutralized by AI strategy.',
        stats: { time: 'Permanent', saved: 'Enterprise Wide', accuracy: 'Total' },
        role: 'Executive EdIntel',
        avatar: '/images/avatars/Dr._alvin_west.png'
    },
    'Voice Synthesis': {
        title: 'Neural Vocal Calibration',
        description: 'Leveraging Hugging Face inference models and ElevenLabs high-fidelity outputs, we synthesize voices that carry authority, empathy, and professional nuance. Perfect for district-wide updates and personalized student briefings.',
        stats: { time: 'Sub-second', saved: 'Production Time', accuracy: 'Human-Prime' },
        role: 'Vocal Architect',
        avatar: '/images/avatars/sarah_connors_premium.png'
    },
    'Signal Strength': {
        title: 'Neural Bandwidth Monitor',
        description: 'Ensuring your connection to the EdIntel Mainnet remains uncompromised. We monitor latencies and encryption integrity to provide a stable, zero-delay strategic experience.',
        stats: { time: '0ms', saved: 'Uptime: 100%', accuracy: 'Secure' },
        role: 'Systems Monitor',
        avatar: '/images/avatars/stem_coordinator.png'
    },
    'Matrix': {
        title: 'Strategic Decision Matrix',
        description: 'The Matrix is the multi-dimensional grid where EdIntel processes all district vectors. It allows you to visualize the ripple effects of every administrative decision before you commit.',
        stats: { time: 'Visualized', saved: 'Planning', accuracy: 'Strategic' },
        role: 'Command Architect',
        avatar: '/images/avatars/Dr._alvin_west.png'
    },
    'EdIntel Account': {
        title: 'EdIntel Credentials',
        description: 'Your EdIntel account is your key to the entire EdIntel ecosystem. It stores your biometric profiles, custom-trained agents, and all vaulted institutional intelligence.',
        stats: { time: 'Instant Access', saved: 'Total Control', accuracy: 'Biometric' },
        role: 'Identity Lead',
        avatar: '/images/avatars/executive_leader.png'
    },
    'Leadership Briefing': {
        title: 'Daily Strategic Briefing',
        description: 'An executive synthesis of legislative alerts, fiscal deadlines, and institutional hot-spots. This briefing is calibrated to your district code and state statutes.',
        stats: { time: 'Every 24h', saved: '3h/morning', accuracy: 'Critical' },
        role: 'Chief of Staff',
        avatar: '/images/avatars/executive_leader.png'
    },
    'Legislative Calendar': {
        title: 'Alabama Legislative Overwatch',
        description: 'Tracking the progress of education-critical bills through the Alabama State House. We provide real-time impact analysis on SB 101, RAISE Act, and Title IX amendments.',
        stats: { time: 'Session Live', saved: 'Lobbying Time', accuracy: 'State-Prime' },
        role: 'Government Affairs',
        avatar: '/images/avatars/special_ed_director.png'
    },
    'SB 101': {
        title: 'Special Education Funding Analysis',
        description: 'Deep-dive into the SB 101 funding reform. Our AI models the potential revenue shifts for your specific student population, identifying capital recovery strategies for the next fiscal cycle.',
        stats: { time: 'Calculated', saved: '$1.2M Projection', accuracy: '98%' },
        role: 'Fiscal Analyst',
        avatar: '/images/avatars/data_analyst.png'
    },
    'AI Phone Center': {
        title: 'Neural Communication Uplink',
        description: 'Automated executive answering and scheduling system. It uses your voice clone to interact with stakeholders, allowing you to maintain a 24/7 strategic presence without being tethered to a handset.',
        stats: { time: '< 200ms Latency', saved: '15h/week', accuracy: '99.9%' },
        role: 'Communications Director',
        avatar: '/images/avatars/executive_leader.png',
        video: '/videos/EdIntel_Noise-Free_Teaching.mp4',
        abilityType: 'communication',
        suggestedNext: ['Voice Synthesis', 'Parent Sync', 'Contact']
    },
    'Video Studio': {
        title: 'Holographic Cinema Forge',
        description: 'Generate high-fidelity video broadcasts using your digital twin. Perfect for town halls, professional development briefings, and emergency broadcasts where your visual presence is critical.',
        stats: { time: '60s Gen Time', saved: 'Production Crew', accuracy: '99.8%' },
        role: 'Media Strategist',
        avatar: '/images/avatars/instructional_tech.png',
        video: '/videos/Video_Generation_Request_Fulfilled.mp4',
        abilityType: 'communication',
        suggestedNext: ['AI Hub', 'Voice Synthesis', 'Avatar Masterclass']
    },
    'Hugging Face': {
        title: 'Open Source Neural Array',
        description: 'Leveraging the latest open-source models for highly specific educational tasks. From sentiment analysis on student surveys to fine-tuned IEP compliance bots, we integrate the best of HF into your workflow.',
        stats: { time: 'API Driven', saved: 'Dev Costs', accuracy: 'Model Specific' },
        role: 'Data Scientist',
        avatar: '/images/avatars/stem_coordinator.png'
    },
    'risk-analyzer': {
        title: 'Litigation Risk Sentinel',
        description: 'Instant legal exposure analysis for all administrative directives. Our engine calculates probability scores for litigation and provides concrete mitigation steps to protect institutional resources and reputation.',
        stats: { time: 'Instant Audit', saved: 'Legal Fees', accuracy: '99%' },
        role: 'Compliance Lead',
        avatar: '/images/avatars/dr_isaiah_vance_premium.png',
        video: '/videos/features/iep-architect-demo.mp4'
    },
    'district-strategy': {
        title: 'District Strategy Command',
        description: 'The ultimate turnaround architect. We synthesize complex district performance vectors into crystalline strategic roadmaps for Superintendents and Boards. Transform data into absolute institutional clarity.',
        stats: { time: 'Real-time', saved: 'Strategic Clarity', accuracy: '100%' },
        role: 'Strategy Director',
        avatar: '/images/avatars/Dr._alvin_west.png',
        video: '/videos/District Command Update.mp4'
    },
    'Admin Vision': {
        title: 'Strategic Briefing: Admin Vision',
        description: 'Operational command intelligence for school administrators. Fusing real-time attendance patterns, discipline analytics, and staffing vectors into a unified situational awareness dashboard. Reduces administrative overhead by 35% through predictive resource allocation.',
        stats: { time: 'Live Feed', saved: '8 hrs/wk', accuracy: '97.5%' },
        role: 'Operations Commander',
        avatar: '/images/avatars/dr_isaiah_vance_premium.png',
        video: '/videos/how_edintel_works1.mp4',
        abilityType: 'strategy',
        suggestedNext: ['district-strategy', 'Teacher Guard', 'Data Intelligence']
    },
    'Parent Sync': {
        title: 'Strategic Briefing: Parent Sync',
        description: 'Family engagement acceleration protocol. Translates complex academic data into clear, culturally-responsive parent communications across 12+ language vectors. Increases parent participation by 60% through AI-optimized outreach timing and channel selection.',
        stats: { time: 'Scheduled', saved: '6 hrs/wk', accuracy: '99.2%' },
        role: 'Community Bridge',
        avatar: '/images/avatars/student_focus.png',
        video: '/videos/how_edintel_works2.mp4',
        abilityType: 'communication',
        suggestedNext: ['Student Focus', 'Voice Synthesis', 'EdIntel Core']
    },
    'Counselor Briefing': {
        title: 'Counselor Intelligence Briefing',
        description: 'Strategic guidance for school counselors: mental health analytics, student risk scoring, intervention protocols, and caseload optimization. Our AI synthesizes behavioral patterns across the entire student body to surface at-risk individuals before crisis points.',
        stats: { time: 'Daily Brief', saved: '5 hrs/wk', accuracy: '96.8%' },
        role: 'Counselor Intelligence',
        avatar: '/images/avatars/student_focus.png',
        video: '/videos/briefings/counselor_briefing.mp4',
        abilityType: 'analytics',
        suggestedNext: ['Student Focus', 'Parent Sync', 'Teacher Guard']
    },
    'Data Briefing': {
        title: 'Data Analytics Command Briefing',
        description: 'Comprehensive data intelligence briefing covering district-wide performance metrics, predictive analytics, and trend analysis. Transform raw institutional data into actionable strategic intelligence.',
        stats: { time: 'Real-time', saved: '10 hrs/wk', accuracy: '99.5%' },
        role: 'Data Commander',
        avatar: '/images/avatars/dr_isaiah_vance_premium.png',
        video: '/videos/briefings/data_briefing.mp4',
        abilityType: 'analytics',
        suggestedNext: ['Data Intelligence', 'district-strategy', 'Admin Vision']
    },
    'Principal Briefing': {
        title: 'Principal Command Briefing',
        description: 'Executive intelligence briefing for principals: operational status, staffing analytics, discipline trends, and strategic decision vectors. Real-time situational awareness for school-level command.',
        stats: { time: 'Morning Brief', saved: '7 hrs/wk', accuracy: '98.2%' },
        role: 'Operations Commander',
        avatar: '/images/avatars/Dr._alvin_west.png',
        video: '/videos/briefings/principal_briefing.mp4',
        abilityType: 'strategy',
        suggestedNext: ['Admin Vision', 'Teacher Guard', 'district-strategy']
    }
};

export function getIntelligenceFor(label: string): DeepIntelligence | null {
    const key = Object.keys(INTELLIGENCE_MAP).find(k =>
        label.toLowerCase().includes(k.toLowerCase()) ||
        k.toLowerCase().includes(label.toLowerCase())
    );
    return key ? INTELLIGENCE_MAP[key] : null;
}
