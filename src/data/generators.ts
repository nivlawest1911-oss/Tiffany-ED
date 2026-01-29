import {
    FileText, MessageSquare, GraduationCap, GraduationCap as StudentCap, Brain, Lightbulb, Sparkles, Check, BookOpen, Users,
    Mic, Code, Database, Megaphone, Palette, ClipboardCheck, TrendingUp, Target,
    Briefcase, BookMarked, PenTool, Video, Beaker, Calculator, HandCoins, Bus, ClipboardList,
    PieChart, Layers, Gamepad2, ShieldAlert, Mail, ScrollText, UserCheck, FileJson, Table, HeartHandshake, Smile,
    GanttChart, Trophy, Glasses, BarChart3, Globe, Star, Scale, Clock, ShoppingBag, Presentation, HardHat,
    History, Heart, Flame, Compass
} from "lucide-react"

import { CORE_AVATARS } from './avatars';
import {
    ECONOMIC_ORACLE_IMAGE,
    IDENTITY_RESTORATION_IMAGE,
    WELLNESS_FORGE_IMAGE,
    GLOBAL_LEARNING_IMAGE,
    FAITH_ORACLE_IMAGE,
    AI_PHILOSOPHER_IMAGE,
    AI_HISTORIAN_IMAGE,
    AI_FUTURIST_IMAGE,
    AI_STORYTELLER_IMAGE
} from '@/lib/assets';

// Map specific tools to "Delegate" avatars using the Single Source of Truth
// STRICT: Ensure all Avatars are African American Professionals from the verified list
const AVATARS = {
    PRINCIPAL: CORE_AVATARS.find(a => a.id === 'sovereign_1')?.avatar || "/images/avatars/dr_alvin_west_premium.png",
    COUNSELOR: CORE_AVATARS.find(a => a.id === 'delegate_2')?.avatar || "/images/avatars/keisha_reynolds_premium.png",
    CURRICULUM: CORE_AVATARS.find(a => a.id === 'delegate_5')?.avatar || "/images/avatars/emily_robinson_premium.png", // Using Dr. Robinson for Curriculum implies data-backed design
    DATA: CORE_AVATARS.find(a => a.id === 'delegate_5')?.avatar || "/images/avatars/emily_robinson_premium.png",
    COMPLIANCE: CORE_AVATARS.find(a => a.id === 'delegate_3')?.avatar || "/images/avatars/isaiah_vance_premium.png",
    LITERACY: CORE_AVATARS.find(a => a.id === 'delegate_5')?.avatar || "/images/avatars/emily_robinson_premium.png",
    FINANCE: CORE_AVATARS.find(a => a.id === 'sovereign_1')?.avatar || "/images/avatars/dr_alvin_west_premium.png", // Executive handles Finance
    BEHAVIOR: CORE_AVATARS.find(a => a.id === 'delegate_4')?.avatar || "/images/avatars/andre_patterson_premium.png",
    SPED: CORE_AVATARS.find(a => a.id === 'delegate_6')?.avatar || "/images/avatars/maya_washington_premium.png"
}

export const generators = [
    // --- STRATEGIC LEADERSHIP TOOLS ---
    {
        id: "iep-architect",
        name: "IEP Specialist",
        description: "Generate professional IEP drafts with SMART goals and data-driven accommodations. Designed for clarity, compliance, and student success.",
        icon: FileText,
        color: "#00d2ff",
        avatar: AVATARS.SPED,
        heroImage: "/images/iep_architect_mockup.png",
        heroVideo: "", // REPLACED: Stock footage removed
        welcomeVideo: "", // REPLACED: Stock footage removed
        voiceWelcome: "/voice-profiles/compliance_voice.wav",
        prompts: [
            "Draft 3 annual IEP goals for a 4th-grade student with autism focusing on executive function and social-emotional regulation.",
            "Create a list of 5 high-impact accommodations for a high-schooler with dyslexia in a chemistry lab environment.",
            "Synthesize a 12-month transition plan for a post-secondary student aiming for vocational training in digital media."
        ]
    },
    {
        id: "lesson-planner",
        name: "Lesson Planner Pro",
        description: "Transform state standards into engaging, multi-tiered lesson plans. Optimized for student growth and classroom efficiency.",
        icon: BookOpen,
        color: "#d946ef",
        avatar: AVATARS.CURRICULUM,
        heroImage: "/images/lesson_planner_mockup.png",
        heroVideo: "", // REPLACED: Stock footage removed
        welcomeVideo: "", // REPLACED: Stock footage removed
        voiceWelcome: "/voice-profiles/counselor_voice.wav",
        prompts: [
            "Design a 5th Grade math lesson on fractions that incorporates Kente pattern geometry and culturally-responsive narratives.",
            "Design a high school American History unit on the Reconstruction Era focusing on economic sovereignty and legislative policy.",
            "Create a middle school science lab protocol for renewable energy, tiered for ELL and GT learners."
        ]
    },
    {
        id: "data-analyzer",
        name: "Data Insight Analyst",
        description: "Analyze complex student performance data to identify achievement gaps and growth opportunities with precision.",
        icon: BarChart3,
        color: "#6366f1",
        avatar: AVATARS.DATA,
        heroVideo: "/videos/features/data-analysis-demo.mp4",
        welcomeVideo: "", // REPLACED: Stock footage removed
        voiceWelcome: "/voice-profiles/data_voice.wav",
        prompts: [
            "Analyze 3rd-grade reading fluency data and identify the top 3 phonemic awareness clusters requiring intervention.",
            "Correlate attendance patterns with math benchmark scores to detect early warning signs of disengagement.",
            "Generate a building-wide performance brief for the Board of Education highlighting a 15% increase in mastery metrics."
        ]
    },
    {
        id: "behavior-coach",
        name: "Behavior Support Coach",
        description: "Develop professional Functional Behavior Assessments (FBA) and effective Behavior Intervention Plans (BIP) for your students.",
        icon: Users,
        color: "#ec4899",
        avatar: AVATARS.BEHAVIOR,
        heroVideo: "", // REPLACED: Stock footage removed
        welcomeVideo: "", // REPLACED: Stock footage removed
        voiceWelcome: "/voice-profiles/principal_voice.mp3",
        prompts: [
            "Draft an FBA for a student exhibiting avoidant behaviors during high-stakes testing, including hypothesized functions.",
            "Create a Tier-3 Behavior Intervention Plan with positive reinforcement scaffolds and de-escalation protocols.",
            "Generate a daily behavior tracking matrix optimized for teacher-user experience and data accuracy."
        ]
    },
    {
        id: "substitute-binder-pro",
        name: "Substitute Binder Pro",
        description: "Create detailed substitute teacher packets, including emergency procedures, daily routines, and classroom management guidance.",
        icon: ClipboardList,
        color: "#f59e0b",
        avatar: AVATARS.PRINCIPAL,
        heroVideo: "", // REPLACED: Stock footage removed
        welcomeVideo: "", // REPLACED: Stock footage removed
        voiceWelcome: "/voice-profiles/principal_voice.wav",
        prompts: [
            "Generate an emergency 'Day 1' sub plan for a 1st-grade classroom including literacy and social-emotional activities.",
            "Draft a classroom procedure brief for a middle school art department, including safety protocols for sculptural equipment.",
            "Create a 'Principal's Memo' for guest educators outlining school-wide cultural expectations and contact procedures."
        ]
    },
    {
        id: "grant-compliance-auditor",
        name: "Fiscal Analyst",
        description: "Analyze grant funding and ensure compliance with spending guidelines. Maximize resources for your school.",
        icon: FileJson,
        color: "#8b5cf6",
        avatar: AVATARS.FINANCE,
        heroVideo: "", // REPLACED: Stock footage removed
        welcomeVideo: "", // REPLACED: Stock footage removed
        voiceWelcome: "/voice-profiles/data_voice.wav",
        prompts: [
            "Audit a Title I spending ledger for allowable costs under the latest ESSA guidelines.",
            "Generate a grant reporting checklist for a state-funded STEM initiative, ensuring 100% documentation accuracy.",
            "Draft a fiscal impact analysis for a district-wide technology refresh, including ROI projections for student achievement."
        ]
    },
    {
        id: "rubric-maker",
        name: "Rubric Builder Pro",
        description: "Create clear, effective grading rubrics that define success. Optimized for all grade levels and subjects.",
        icon: Table,
        color: "#06b6d4",
        avatar: AVATARS.CURRICULUM,
        heroVideo: "", // REPLACED: Stock footage removed
        welcomeVideo: "", // REPLACED: Stock footage removed
        voiceWelcome: "/voice-profiles/counselor_voice.wav",
        prompts: [
            "Create a 5-tier mastery rubric for a 9th-grade persuasive essay, focusing on evidence-based synthesis and rhetorical strategy.",
            "Draft a project-based learning (PBL) rubric for an engineering challenge involving bridge structural integrity.",
            "Generate a soft-skills rubric for student collaboration and conflict resolution in a flipped-classroom setting."
        ]
    },
    {
        id: "conflict-mediator",
        name: "Conflict Resolution Coach",
        description: "Professional scripts and strategies for de-escalating classroom or staff conflicts with empathy and clarity.",
        icon: HeartHandshake,
        color: "#ec4899",
        avatar: AVATARS.COUNSELOR,
        heroVideo: "", // REPLACED: Stock footage removed
        welcomeVideo: "", // REPLACED: Stock footage removed
        voiceWelcome: "/voice-profiles/counselor_voice.wav",
        prompts: [
            "Draft a restorative circle script for a classroom dealing with themes of digital citizenship and mutual respect.",
            "Create a mediation protocol for a parent-teacher conference involving sensitive academic performance data.",
            "Generate a 'Leadership De-escalation Script' for high-stakes administrative meetings with communal stakeholders."
        ]
    },
    {
        id: "schedule-optimizer",
        name: "Master Schedule Optimizer",
        description: "Analyze andSuggest strategic improvements for building-wide schedules. Optimize instructional blocks to recover teacher prep time and student focus windows.",
        icon: GanttChart,
        color: "#6366f1",
        avatar: AVATARS.PRINCIPAL,
        heroVideo: "", // REPLACED: Stock footage removed
        welcomeVideo: "", // REPLACED: Stock footage removed
        voiceWelcome: "/voice-profiles/principal_voice.wav",
        prompts: [
            "Optimize a high-school block schedule to ensure all core-subject teachers have synchronized planning windows.",
            "Analyze elementary lunch wave logistics to minimize hall traffic and maximize cafeteria staff efficiency.",
            "Suggest a 3-tier intervention block structure for a middle school with high achievement-gap volatility."
        ]
    },
    {
        id: "sports-eligibility-tracker",
        name: "Athletic Compliance",
        description: "Track student athlete eligibility and grade requirements",
        icon: Trophy,
        color: "#f97316",
        avatar: AVATARS.COMPLIANCE,
        heroVideo: "/videos/features/iep-architect-demo.mp4",
        welcomeVideo: "", // REPLACED: Stock footage removed
        voiceWelcome: "/voice-profiles/compliance_voice.wav",
        prompts: ["Eligibility checklist", "GPA tracking template", "NCAA requirement guide"]
    },
    {
        id: "dyslexia-resource-gen",
        name: "Dyslexia Resource Gen",
        description: "Specialized interventions and fonts for reading support",
        icon: Glasses,
        color: "#3b82f6",
        avatar: AVATARS.CURRICULUM,
        heroVideo: "/videos/features/lesson-planner-demo.mp4",
        welcomeVideo: "", // REPLACED: Stock footage removed
        voiceWelcome: "/voice-profiles/counselor_voice.wav",
        prompts: ["Dyslexia-friendly worksheet", "Reading intervention list", "Parent resource guide"]
    },
    // Re-adding essential existing ones for the demo to work fully
    { id: "email-composer", name: "Email Composer", description: "Professional communications", icon: MessageSquare, color: "#10b981", avatar: AVATARS.PRINCIPAL, heroImage: "/images/features/strategic_communications_director.png", heroVideo: "/videos/features/iep-architect-demo.mp4", welcomeVideo: "", voiceWelcome: "/voice-profiles/principal_voice.wav", prompts: ["Parent conference follow-up", "Staff announcement"] },
    { id: "policy-advisor", name: "Policy Advisor", description: "Navigate regulations", icon: Scale, color: "#8b5cf6", avatar: AVATARS.COMPLIANCE, heroVideo: "/videos/features/iep-architect-demo.mp4", welcomeVideo: "", voiceWelcome: "/voice-profiles/compliance_voice.wav", prompts: ["IDEA compliance check", "504 plan requirements"] },
    { id: "cognitive-coach", name: "Cognitive Coach", description: "Executive function strategies", icon: Brain, color: "#ec4899", avatar: AVATARS.COUNSELOR, heroVideo: "/videos/features/lesson-planner-demo.mp4", welcomeVideo: "", voiceWelcome: "/voice-profiles/counselor_voice.wav", prompts: ["Working memory activities"] },
    { id: "idea-generator", name: "Idea Generator", description: "Creative solutions", icon: Lightbulb, color: "#f59e0b", avatar: AVATARS.CURRICULUM, heroVideo: "/videos/features/lesson-planner-demo.mp4", welcomeVideo: "", voiceWelcome: "/voice-profiles/counselor_voice.wav", prompts: ["Engagement strategies"] },
    { id: "code-commander", name: "Code Commander", description: "Learn coding", icon: Code, color: "#06b6d4", avatar: AVATARS.DATA, heroVideo: "/videos/features/data-analysis-demo.mp4", welcomeVideo: "", voiceWelcome: "/voice-profiles/data_voice.wav", prompts: ["Debug my Python code"] },
    { id: "comms-director", name: "Comms Director", description: "PR content", icon: Megaphone, color: "#f97316", avatar: AVATARS.PRINCIPAL, heroVideo: "/videos/features/iep-architect-demo.mp4", welcomeVideo: "", voiceWelcome: "/voice-profiles/principal_voice.wav", prompts: ["Draft school newsletter"] },
    { id: "design-studio", name: "Design Studio", description: "Creative layout", icon: Palette, color: "#e11d48", avatar: AVATARS.CURRICULUM, heroVideo: "/videos/features/lesson-planner-demo.mp4", welcomeVideo: "", voiceWelcome: "/voice-profiles/counselor_voice.wav", prompts: ["Yearbook layout ideas"] },
    { id: "meeting-prep", name: "Meeting Prep", description: "Agendas & talking points", icon: Briefcase, color: "#0ea5e9", avatar: AVATARS.PRINCIPAL, heroVideo: "/videos/features/iep-architect-demo.mp4", welcomeVideo: "", voiceWelcome: "/voice-profiles/principal_voice.wav", prompts: ["Board meeting agenda"] },
    { id: "assessment-builder", name: "Assessment Builder", description: "Create assessments", icon: ClipboardCheck, color: "#8b5cf6", avatar: AVATARS.CURRICULUM, heroVideo: "/videos/features/lesson-planner-demo.mp4", welcomeVideo: "", voiceWelcome: "/voice-profiles/counselor_voice.wav", prompts: ["Multiple choice quiz"] },
    { id: "differentiation-planner", name: "Differentiation", description: "Tiered activities", icon: Target, color: "#ec4899", avatar: AVATARS.CURRICULUM, heroVideo: "/videos/features/lesson-planner-demo.mp4", welcomeVideo: "", voiceWelcome: "/voice-profiles/counselor_voice.wav", prompts: ["Tier 1, 2, 3 activities"] },
    { id: "parent-communicator", name: "Parent Communicator", description: "Communication logs", icon: MessageSquare, color: "#f59e0b", avatar: AVATARS.COUNSELOR, heroVideo: "/videos/features/lesson-planner-demo.mp4", welcomeVideo: "", voiceWelcome: "/voice-profiles/counselor_voice.wav", prompts: ["Weekly progress update"] },
    { id: "student-goal-setter", name: "Student Goal Setter", description: "SMART goals", icon: StudentCap, color: "#06b6d4", avatar: AVATARS.COUNSELOR, heroVideo: "/videos/features/lesson-planner-demo.mp4", welcomeVideo: "", voiceWelcome: "/voice-profiles/counselor_voice.wav", prompts: ["Academic goal template"] },
    { id: "study-guide-maker", name: "Study Guide Maker", description: "Review materials", icon: BookMarked, color: "#a855f7", avatar: AVATARS.CURRICULUM, heroVideo: "/videos/features/lesson-planner-demo.mp4", welcomeVideo: "", voiceWelcome: "/voice-profiles/counselor_voice.wav", prompts: ["Chapter summary"] },
    { id: "writing-coach", name: "Writing Coach", description: "Essay feedback", icon: PenTool, color: "#f97316", avatar: AVATARS.CURRICULUM, heroVideo: "/videos/features/lesson-planner-demo.mp4", welcomeVideo: "", voiceWelcome: "/voice-profiles/counselor_voice.wav", prompts: ["Essay outline help"] },
    { id: "video-lesson-planner", name: "Video Lesson Planner", description: "Video scripts", icon: Video, color: "#d946ef", avatar: AVATARS.CURRICULUM, heroVideo: "/videos/features/lesson-planner-demo.mp4", welcomeVideo: "", voiceWelcome: "/voice-profiles/counselor_voice.wav", prompts: ["Flipped classroom script"] },
    { id: "college-essay-coach", name: "College Essay Coach", description: "Ivy League feedback", icon: StudentCap, color: "#d4af37", avatar: AVATARS.COUNSELOR, heroVideo: "/videos/features/lesson-planner-demo.mp4", welcomeVideo: "", voiceWelcome: "/voice-profiles/counselor_voice.wav", prompts: ["Review college essay draft"] },
    { id: "science-fair-mentor", name: "Science Fair Mentor", description: "Project ideas", icon: Beaker, color: "#0ea5e9", avatar: AVATARS.CURRICULUM, heroVideo: "/videos/features/lesson-planner-demo.mp4", welcomeVideo: "", voiceWelcome: "/voice-profiles/counselor_voice.wav", prompts: ["Science fair project ideas"] },
    { id: "math-tutor-pro", name: "Math Tutor Pro", description: "Math help", icon: Calculator, color: "#f59e0b", avatar: AVATARS.CURRICULUM, heroVideo: "/videos/features/lesson-planner-demo.mp4", welcomeVideo: "", voiceWelcome: "/voice-profiles/counselor_voice.wav", prompts: ["Explain math problem"] },
    { id: "debate-prep", name: "Debate Prep", description: "Argument builder", icon: Mic, color: "#ef4444", avatar: AVATARS.CURRICULUM, heroVideo: "/videos/features/lesson-planner-demo.mp4", welcomeVideo: "", voiceWelcome: "/voice-profiles/counselor_voice.wav", prompts: ["Argument builder"] },
    { id: "bus-route-optimizer", name: "Transport Logistics", description: "Route efficiency", icon: Bus, color: "#f59e0b", avatar: AVATARS.DATA, heroVideo: "/videos/features/data-analysis-demo.mp4", welcomeVideo: "", voiceWelcome: "/voice-profiles/data_voice.wav", prompts: ["Optimize bus route"] },
    { id: "budget-allocator", name: "Budget Allocator", description: "Finance modeling", icon: PieChart, color: "#06b6d4", avatar: AVATARS.DATA, heroVideo: "/videos/features/data-analysis-demo.mp4", welcomeVideo: "", voiceWelcome: "/voice-profiles/data_voice.wav", prompts: ["Budget analysis"] },
    { id: "project-pbl-architect", name: "PBL Specialist", description: "Project design", icon: Layers, color: "#ec4899", avatar: AVATARS.CURRICULUM, heroVideo: "/videos/features/lesson-planner-demo.mp4", welcomeVideo: "", voiceWelcome: "/voice-profiles/counselor_voice.wav", prompts: ["PBL unit plan"] },
    { id: "quiz-gamifier", name: "Quiz Gamifier", description: "Gamification", icon: Gamepad2, color: "#8b5cf6", avatar: AVATARS.CURRICULUM, heroVideo: "/videos/features/lesson-planner-demo.mp4", welcomeVideo: "", voiceWelcome: "/voice-profiles/counselor_voice.wav", prompts: ["Gamify quiz review"] },
    { id: "safety-drill-master", name: "Safety Drill Master", description: "Crisis planning", icon: ShieldAlert, color: "#ef4444", avatar: AVATARS.COMPLIANCE, heroVideo: "/videos/features/iep-architect-demo.mp4", welcomeVideo: "", voiceWelcome: "/voice-profiles/compliance_voice.wav", prompts: ["Fire drill procedure"] },
    { id: "newsletter-wizard", name: "Newsletter Wizard", description: "Community updates", icon: Mail, color: "#3b82f6", avatar: AVATARS.PRINCIPAL, heroImage: "/images/features/strategic_communications_director.png", heroVideo: "/videos/features/iep-architect-demo.mp4", welcomeVideo: "", voiceWelcome: "/voice-profiles/principal_voice.wav", prompts: ["Weekly newsletter"] },

    // --- ADMINISTRATIVE SUPPORT ---
    {
        id: "staff-retention-prophet",
        name: "Staff Retention Specialist",
        description: "Understand staff turnover risks and develop positive culture strategies using survey data.",
        icon: UserCheck,
        color: "#d97706", // Amber
        avatar: AVATARS.DATA,
        heroVideo: "", // REPLACED: Stock footage removed
        welcomeVideo: "", // REPLACED: Stock footage removed
        voiceWelcome: "/voice-profiles/data_voice.wav",
        prompts: ["Analyze climate survey", "Identify retention risks", "Draft retention plan"]
    },
    {
        id: "equity-audit-protocol",
        name: "Equity Review Tool",
        description: "Review curriculum and policies for representation and inclusion gaps.",
        icon: ScrollText,
        color: "#7c3aed", // Purple
        avatar: AVATARS.CURRICULUM,
        heroVideo: "/videos/features/lesson-planner-demo.mp4",
        welcomeVideo: "", // REPLACED: Stock footage removed
        voiceWelcome: "/voice-profiles/counselor_voice.wav",
        prompts: ["Audit reading list", "Check discipline policy", "Review hiring practices"]
    },
    {
        id: "fiscal-strategist",
        name: "Budget Strategist",
        description: "In-depth budget modeling and resource analysis for district school funds.",
        icon: PieChart,
        color: "#10b981", // Emerald
        avatar: AVATARS.PRINCIPAL,
        heroVideo: "/videos/features/data-analysis-demo.mp4",
        welcomeVideo: "", // REPLACED: Stock footage removed
        voiceWelcome: "/voice-profiles/principal_voice.wav",
        prompts: ["Model 5% budget cut", "Project Title I allocation", "Analyze vendor ROI"]
    },
    {
        id: "enrollment-forecaster",
        name: "Enrollment Forecaster",
        description: "Predict next year's student counts using demographic trends.",
        icon: TrendingUp,
        color: "#3b82f6", // Blue
        avatar: AVATARS.DATA,
        heroVideo: "", // REPLACED: Stock footage removed
        welcomeVideo: "", // REPLACED: Stock footage removed
        voiceWelcome: "/voice-profiles/data_voice.wav",
        prompts: ["Forecast kindergarten enrollment", "Analyze zoning changes", "Predict class sizes"]
    },
    {
        id: "classroom-decor-ai",
        name: "Classroom Specialist",
        description: "Visualize and plan classroom layouts optimized for learning.",
        icon: Palette,
        color: "#db2777", // Pink-600
        avatar: AVATARS.CURRICULUM,
        heroVideo: "/videos/features/lesson-planner-demo.mp4",
        welcomeVideo: "", // REPLACED: Stock footage removed
        voiceWelcome: "/voice-profiles/counselor_voice.wav",
        prompts: ["Montessori layout ideas", "Calm corner design", "Seating chart for 25 students"]
    },
    {
        id: "teacher-wellness-guide",
        name: "Wellness Guardian",
        description: "Strategies for avoiding burnout and maintaining balance.",
        icon: HeartHandshake,
        color: "#059669", // Emerald-600
        avatar: AVATARS.COUNSELOR,
        heroVideo: "/videos/features/lesson-planner-demo.mp4",
        welcomeVideo: "", // REPLACED: Stock footage removed
        voiceWelcome: "/voice-profiles/counselor_voice.wav",
        prompts: ["5-minute stress relief", "Boundary setting scripts", "End-of-day decompression"]
    },
    {
        id: "strategic-visionary",
        name: "Strategic Visionary",
        description: "Draft 3-5 year strategic plans and mission statements.",
        icon: Target,
        color: "#7c3aed", // Violet-600
        avatar: AVATARS.PRINCIPAL,
        heroVideo: "/videos/features/iep-architect-demo.mp4",
        welcomeVideo: "", // REPLACED: Stock footage removed
        voiceWelcome: "/voice-profiles/principal_voice.wav",
        prompts: ["Draft STEM magnet vision", "3-year tech rollout plan", "Mission statement refresh"]
    },
    {
        id: "hr-talent-scout",
        name: "HR Talent Scout",
        description: "Generate interview questions and performance growth plans.",
        icon: Briefcase,
        color: "#db2777", // Pink-600
        avatar: AVATARS.DATA,
        heroVideo: "", // REPLACED: Stock footage removed
        welcomeVideo: "", // REPLACED: Stock footage removed
        voiceWelcome: "/voice-profiles/data_voice.wav",
        prompts: ["Math teacher interview questions", "Performance improvement plan", "Rejection letter template"]
    },
    {
        id: "restorative-justice-guide",
        name: "Restorative Voice",
        description: "Scripts for conflict circles and restorative conferences.",
        icon: HeartHandshake,
        color: "#ea580c", // Orange-600
        avatar: AVATARS.COUNSELOR,
        heroVideo: "/videos/features/lesson-planner-demo.mp4",
        welcomeVideo: "", // REPLACED: Stock footage removed
        voiceWelcome: "/voice-profiles/counselor_voice.wav",
        prompts: ["Circle facilitator script", "Re-entry meeting agenda", "Apology letter scaffold"]
    },
    {
        id: "grant-narrative-architect",
        name: "Grant Specialist",
        description: "Compelling narratives for federal and state grant applications.",
        icon: ScrollText,
        color: "#16a34a", // Green-600
        avatar: AVATARS.PRINCIPAL,
        heroVideo: "/videos/features/iep-architect-demo.mp4",
        welcomeVideo: "", // REPLACED: Stock footage removed
        voiceWelcome: "/voice-profiles/principal_voice.wav",
        prompts: ["Title I needs assessment", "STEM grant narrative", "Community partnership output"]
    },
    {
        id: "crisis-ops-lead",
        name: "Crisis Response Lead",
        description: "Checklists and communication protocols for emergencies.",
        icon: ShieldAlert,
        color: "#dc2626", // Red-600
        avatar: AVATARS.COMPLIANCE,
        heroVideo: "/videos/features/iep-architect-demo.mp4",
        welcomeVideo: "", // REPLACED: Stock footage removed
        voiceWelcome: "/voice-profiles/compliance_voice.wav",
        prompts: ["Severe weather checklist", "Parent reunification logic", "Media holding statement"]
    },
    {
        id: "plc-facilitator",
        name: "PLC Facilitator",
        description: "Agendas and data protocols for Professional Learning Communities.",
        icon: Users,
        color: "#2563eb", // Blue-600
        avatar: AVATARS.CURRICULUM,
        heroVideo: "/videos/features/lesson-planner-demo.mp4",
        welcomeVideo: "", // REPLACED: Stock footage removed
        voiceWelcome: "/voice-profiles/counselor_voice.wav",
        prompts: ["Data dive protocol", "Student work analysis", "PLC norm setting"]
    },
    {
        id: "504-compliance-officer",
        name: "504 Compliance Officer",
        description: "Draft robust Section 504 plans and accommodation reviews.",
        icon: FileText,
        color: "#4f46e5", // Indigo-600
        avatar: AVATARS.COMPLIANCE,
        heroVideo: "/videos/features/iep-architect-demo.mp4",
        welcomeVideo: "", // REPLACED: Stock footage removed
        voiceWelcome: "/voice-profiles/compliance_voice.wav",
        prompts: ["504 plan for anxiety", "Accommodation review meeting agenda", "Manifestation determination review"]
    },
    {
        id: "instructional-mastery-coach",
        name: "Instructional Coach",
        description: "Observation feedback scripts and co-teaching models.",
        icon: Lightbulb,
        color: "#e11d48", // Rose-600
        avatar: AVATARS.CURRICULUM,
        heroVideo: "/videos/features/lesson-planner-demo.mp4",
        welcomeVideo: "", // REPLACED: Stock footage removed
        voiceWelcome: "/voice-profiles/counselor_voice.wav",
        prompts: ["Post-observation feedback script", "Co-teaching station rotation plan", "Growth mindset coaching questions"]
    },
    {
        id: "family-community-nexus",
        name: "Community Hub",
        description: "Bridge the gap with multilingual newsletters and partnership outreach.",
        icon: Users,
        color: "#0d9488", // Teal-600
        avatar: AVATARS.PRINCIPAL,
        heroVideo: "/videos/features/iep-architect-demo.mp4",
        welcomeVideo: "", // REPLACED: Stock footage removed
        voiceWelcome: "/voice-profiles/principal_voice.wav",
        prompts: ["Title I parent meeting invite", "Community partnership proposal", "Monthly family newsletter"]
    },
    {
        id: "digital-innovation-architect",
        name: "Digital Specialist",
        description: "Draft AI policies, digital citizenship curriculums, and tech plans.",
        icon: Code,
        color: "#0891b2", // Cyan-600
        avatar: AVATARS.DATA,
        heroVideo: "", // REPLACED: Stock footage removed
        welcomeVideo: "", // REPLACED: Stock footage removed
        voiceWelcome: "/voice-profiles/data_voice.wav",
        prompts: ["District AI usage policy", "1:1 device rollout plan", "Digital citizenship lesson"]
    },
    {
        id: "board-governance-strategist",
        name: "Board Strategist",
        description: "Prepare executive summaries, board presentations, and policy briefs.",
        icon: Briefcase,
        color: "#475569", // Slate-600
        avatar: AVATARS.PRINCIPAL,
        heroVideo: "/videos/features/iep-architect-demo.mp4",
        welcomeVideo: "", // REPLACED: Stock footage removed
        voiceWelcome: "/voice-profiles/principal_voice.wav",
        prompts: ["Superintendent's report summary", "Policy change impact analysis", "Budget presentation script"]
    },
    {
        id: "culture-climate-architect",
        name: "Culture Specialist",
        description: "Audit school culture and plan inclusive, affirming events.",
        icon: Smile,
        color: "#f97316", // Orange-500
        avatar: AVATARS.COUNSELOR,
        heroVideo: "/videos/features/lesson-planner-demo.mp4",
        welcomeVideo: "", // REPLACED: Stock footage removed
        voiceWelcome: "/voice-profiles/counselor_voice.wav",
        prompts: ["School culture audit survey", "Staff appreciation week plan", "Inclusive assembly script"]
    },
    {
        id: "cte-industry-liaison",
        name: "CTE Industry Liaison",
        description: "Build industry partnerships and track certification data.",
        icon: Briefcase,
        color: "#0284c7", // Sky-600
        avatar: AVATARS.DATA,
        heroVideo: "", // REPLACED: Stock footage removed
        welcomeVideo: "", // REPLACED: Stock footage removed
        voiceWelcome: "/voice-profiles/data_voice.wav",
        prompts: ["Industry advisory board agenda", "Internship evaluation rubric", "Work-based learning agreement"]
    },
    {
        id: "ell-success-coordinator",
        name: "ELL Success Coordinator",
        description: "Scaffold content and communications for multilingual learners.",
        icon: Globe,
        color: "#d946ef", // Fuchsia-600
        avatar: AVATARS.CURRICULUM,
        heroVideo: "/videos/features/lesson-planner-demo.mp4",
        welcomeVideo: "", // REPLACED: Stock footage removed
        voiceWelcome: "/voice-profiles/counselor_voice.wav",
        prompts: ["Sheltered instruction strategy", "Parent letter in Spanish/English", "WIDA access goal setting"]
    },
    {
        id: "gt-gifted-architect",
        name: "Gifted & Talented Specialist",
        description: "Design extension projects and DEP differentiation.",
        icon: Brain,
        color: "#f59e0b", // Amber-500
        avatar: AVATARS.CURRICULUM,
        heroVideo: "/videos/features/lesson-planner-demo.mp4",
        welcomeVideo: "", // REPLACED: Stock footage removed
        voiceWelcome: "/voice-profiles/counselor_voice.wav",
        prompts: ["Project-based extension for Math", "Depth and Complexity prompts", "Independent study contract"]
    },
    {
        id: "athletic-director-pro",
        name: "Athletic Director Pro",
        description: "Manage practice schedules, logistics, and eligibility.",
        icon: Trophy,
        color: "#b91c1c", // Red-700
        avatar: AVATARS.COMPLIANCE,
        heroVideo: "/videos/features/iep-architect-demo.mp4",
        welcomeVideo: "", // REPLACED: Stock footage removed
        voiceWelcome: "/voice-profiles/compliance_voice.wav",
        prompts: ["Facility usage schedule", "Coach evaluation rubric", "Parent athlete handbook"]
    },
    {
        id: "alumni-relations-manager",
        name: "Alumni Manager",
        description: "Engage former students for mentorship and fundraising.",
        icon: GraduationCap,
        color: "#1e293b", // Slate-800
        avatar: AVATARS.PRINCIPAL,
        heroVideo: "/videos/features/iep-architect-demo.mp4",
        welcomeVideo: "", // REPLACED: Stock footage removed
        voiceWelcome: "/voice-profiles/principal_voice.wav",
        prompts: ["Alumni newsletter template", "Career day invitation", "Fundraising campaign email"]
    },
    {
        id: "restorative-dean",
        name: "Restorative Dean",
        description: "Manage discipline with a restorative, growth-focused lens.",
        icon: HeartHandshake,
        color: "#4338ca", // Indigo-700
        avatar: AVATARS.COMPLIANCE,
        heroVideo: "/videos/features/iep-architect-demo.mp4",
        welcomeVideo: "", // REPLACED: Stock footage removed
        voiceWelcome: "/voice-profiles/compliance_voice.wav",
        prompts: ["Behavior contract template", "Incident reflection sheet", "Suspension alternative list"]
    },
    {
        id: "testing-coordinator-pro",
        name: "Testing Coordinator",
        description: "Organize state testing logistics, proctor schedules, and accommodations.",
        icon: ClipboardCheck,
        color: "#0f766e", // Teal-700
        avatar: AVATARS.DATA,
        heroVideo: "", // REPLACED: Stock footage removed
        welcomeVideo: "", // REPLACED: Stock footage removed
        voiceWelcome: "/voice-profiles/data_voice.wav",
        prompts: ["Proctor training agenda", "Testing room schedule builder", "Irregularity report template"]
    },
    {
        id: "facilities-ops-manager",
        name: "Facilities Manager",
        description: "Track work orders, safety audits, and custodial schedules.",
        icon: Check,
        color: "#374151", // Gray-700
        avatar: AVATARS.PRINCIPAL,
        heroVideo: "/videos/features/iep-architect-demo.mp4",
        welcomeVideo: "", // REPLACED: Stock footage removed
        voiceWelcome: "/voice-profiles/principal_voice.wav",
        prompts: ["Custodial cleaning checklist", "Safety walk-through audit", "Summer maintenance timeline"]
    },
    {
        id: "transportation-logistics",
        name: "Transport Director",
        description: "Optimize bus routes and manage driver communication.",
        icon: Bus,
        color: "#d97706", // Amber-600
        avatar: AVATARS.DATA,
        heroVideo: "", // REPLACED: Stock footage removed
        welcomeVideo: "", // REPLACED: Stock footage removed
        voiceWelcome: "/voice-profiles/data_voice.wav",
        prompts: ["Driver safety memo", "Bus conduct report", "Field trip transport request"]
    },
    {
        id: "substitute-manager",
        name: "Substitute Manager",
        description: "Manage sub pools, emergency plans, and coverage logistics.",
        icon: Users,
        color: "#be123c", // Rose-700
        avatar: AVATARS.PRINCIPAL,
        heroVideo: "/videos/features/iep-architect-demo.mp4",
        welcomeVideo: "", // REPLACED: Stock footage removed
        voiceWelcome: "/voice-profiles/principal_voice.wav",
        prompts: ["Sub handbook table of contents", "Emergency lesson plan template", "Sub feedback form"]
    },
    {
        id: "mental-health-lead",
        name: "Mental Health Lead",
        description: "Systems for suicide risk assessment and crisis counseling.",
        icon: HeartHandshake,
        color: "#6d28d9", // Violet-700
        avatar: AVATARS.COUNSELOR,
        heroVideo: "/videos/features/lesson-planner-demo.mp4",
        welcomeVideo: "", // REPLACED: Stock footage removed
        voiceWelcome: "/voice-profiles/counselor_voice.wav",
        prompts: ["Suicide risk assessment protocol", "Grief counseling script", "Safety plan template"]
    },
    {
        id: "social-media-manager",
        name: "Social Media Manager",
        description: "Draft engaging posts and manage school branding strategy.",
        icon: Megaphone,
        color: "#ec4899", // Pink-500
        avatar: AVATARS.CURRICULUM,
        heroVideo: "/videos/features/lesson-planner-demo.mp4",
        welcomeVideo: "", // REPLACED: Stock footage removed
        voiceWelcome: "/voice-profiles/counselor_voice.wav",
        prompts: ["Teacher spotlight post", "Snow day announcement", "Bond referendum info post"]
    },
    {
        id: "literacy-architect",
        name: "Literacy Specialist",
        description: "Science of Reading aligned interventions and phonics routines.",
        icon: BookOpen,
        color: "#be185d", // Pink-700
        avatar: AVATARS.CURRICULUM,
        heroVideo: "/videos/features/lesson-planner-demo.mp4",
        welcomeVideo: "", // REPLACED: Stock footage removed
        voiceWelcome: "/voice-profiles/counselor_voice.wav",
        prompts: ["Phonemic awareness drill", "Decodable text generator", "Reading fluency rubric"]
    },
    {
        id: "math-interventionist",
        name: "Math Interventionist",
        description: "Concrete-Representational-Abstract (CRA) math scaffolds.",
        icon: Calculator,
        color: "#059669", // Emerald-600
        avatar: AVATARS.DATA,
        heroVideo: "", // REPLACED: Stock footage removed
        welcomeVideo: "", // REPLACED: Stock footage removed
        voiceWelcome: "/voice-profiles/data_voice.wav",
        prompts: ["Fraction intervention scaffold", "Word problem visualizer", "Math fact fluency game"]
    },
    {
        id: "early-learning-director",
        name: "Early Learning Director",
        description: "Play-based learning stations and pre-k transition plans.",
        icon: Smile,
        color: "#fbbf24", // Amber-400
        avatar: AVATARS.COUNSELOR,
        heroVideo: "/videos/features/lesson-planner-demo.mp4",
        welcomeVideo: "", // REPLACED: Stock footage removed
        voiceWelcome: "/voice-profiles/counselor_voice.wav",
        prompts: ["Sensory bin activity guide", "Social-emotional circle time", "Kindergarten readiness checklist"]
    },
    {
        id: "transition-coordinator",
        name: "Transition Coordinator",
        description: "Post-secondary transition plans for Special Education.",
        icon: GraduationCap,
        color: "#4f46e5", // Indigo-600
        avatar: AVATARS.COMPLIANCE,
        heroVideo: "/videos/features/iep-architect-demo.mp4",
        welcomeVideo: "", // REPLACED: Stock footage removed
        voiceWelcome: "/voice-profiles/compliance_voice.wav",
        prompts: ["Transition assessment tool", "Job coaching script", "Independent living goal"]
    },
    {
        id: "library-media-specialist",
        name: "Media Specialist",
        description: "Digital citizenship lessons and research frameworks.",
        icon: BookMarked,
        color: "#0891b2", // Cyan-600
        avatar: AVATARS.CURRICULUM,
        heroVideo: "/videos/features/lesson-planner-demo.mp4",
        welcomeVideo: "", // REPLACED: Stock footage removed
        voiceWelcome: "/voice-profiles/counselor_voice.wav",
        prompts: ["Digital citizenship lesson", "Research source evaluation", "Makerspace challenge card"]
    },
    {
        id: "dual-language-bridge",
        name: "Dual Language Bridge",
        description: "Bilingual content generation for two-way immersion.",
        icon: Globe,
        color: "#db2777", // Pink-600
        avatar: AVATARS.CURRICULUM,
        heroVideo: "/videos/features/lesson-planner-demo.mp4",
        welcomeVideo: "", // REPLACED: Stock footage removed
        voiceWelcome: "/voice-profiles/counselor_voice.wav",
        prompts: ["Cognate wall list", "Translanguaging strategy", "Bilingual newsletter blurb"]
    },
    {
        id: "federal-programs-director",
        name: "Federal Programs Director",
        description: "Manage Title I, II, III, & IV compliance and documentation.",
        icon: Scale,
        color: "#1e3a8a", // Blue-900
        avatar: AVATARS.COMPLIANCE,
        heroVideo: "/videos/features/iep-architect-demo.mp4",
        welcomeVideo: "", // REPLACED: Stock footage removed
        voiceWelcome: "/voice-profiles/compliance_voice.wav",
        prompts: ["Title I schoolwide plan", "Equitable services consultation", "Supplement vs Supplant guide"]
    },
    {
        id: "magnet-coordinator",
        name: "Magnet Coordinator",
        description: "Integrate specialized themes (STEM, Arts, IB) into curriculum.",
        icon: Star,
        color: "#7c3aed", // Violet-600
        avatar: AVATARS.CURRICULUM,
        heroVideo: "/videos/features/lesson-planner-demo.mp4",
        welcomeVideo: "", // REPLACED: Stock footage removed
        voiceWelcome: "/voice-profiles/counselor_voice.wav",
        prompts: ["PBL unit with STEM theme", "Magnet recruitment plan", "Theme integration rubric"]
    },
    {
        id: "attendance-officer",
        name: "Attendance Officer",
        description: "Truancy diversion plans and chronic absenteeism interventions.",
        icon: Clock,
        color: "#c2410c", // Orange-700
        avatar: AVATARS.DATA,
        heroVideo: "", // REPLACED: Stock footage removed
        welcomeVideo: "", // REPLACED: Stock footage removed
        voiceWelcome: "/voice-profiles/data_voice.wav",
        prompts: ["Truancy diversion contract", "Attendance success plan", "Home visit protocol"]
    },
    {
        id: "school-registrar",
        name: "School Registrar",
        description: "Manage enrollment, transcripts, and master schedule data.",
        icon: Database,
        color: "#374151", // Gray-700
        avatar: AVATARS.DATA,
        heroVideo: "", // REPLACED: Stock footage removed
        welcomeVideo: "", // REPLACED: Stock footage removed
        voiceWelcome: "/voice-profiles/data_voice.wav",
        prompts: ["Enrollment verification letter", "Transcript audit checklist", "Withdrawal form template"]
    },
    {
        id: "procurement-specialist",
        name: "Procurement Specialist",
        description: "Draft RFPs, bid specifications, and vendor contracts.",
        icon: ShoppingBag,
        color: "#065f46", // Emerald-800
        avatar: AVATARS.PRINCIPAL,
        heroVideo: "/videos/features/iep-architect-demo.mp4",
        welcomeVideo: "", // REPLACED: Stock footage removed
        voiceWelcome: "/voice-profiles/principal_voice.wav",
        prompts: ["Technology RFP template", "Vendor evaluation matrix", "Sole source justification"]
    },
    {
        id: "pd-coordinator",
        name: "PD Coordinator",
        description: "Design professional development tracks and workshop agendas.",
        icon: Presentation,
        color: "#be185d", // Pink-700
        avatar: AVATARS.CURRICULUM,
        heroVideo: "/videos/features/lesson-planner-demo.mp4",
        welcomeVideo: "", // REPLACED: Stock footage removed
        voiceWelcome: "/voice-profiles/counselor_voice.wav",
        prompts: ["New teacher induction agenda", "Differentiated PD survey", "Instructional rounds protocol"]
    },
    {
        id: "mckinney-vento-liaison",
        name: "Homeless Liaison",
        description: "Support students in transition with transport and resource rights.",
        icon: HeartHandshake,
        color: "#fb923c", // Orange-400
        avatar: AVATARS.COUNSELOR,
        heroVideo: "/videos/features/lesson-planner-demo.mp4",
        welcomeVideo: "", // REPLACED: Stock footage removed
        voiceWelcome: "/voice-profiles/counselor_voice.wav",
        prompts: ["Dispute resolution letter", "Needs assessment for shelter", "Transport request form"]
    },
    {
        id: "foster-care-poc",
        name: "Foster Care Point of Contact",
        description: "Coordinate best interest determinations and DCF communication.",
        icon: Heart,
        color: "#4f46e5", // Indigo-600
        avatar: AVATARS.COUNSELOR,
        heroVideo: "/videos/features/lesson-planner-demo.mp4",
        welcomeVideo: "", // REPLACED: Stock footage removed
        voiceWelcome: "/voice-profiles/counselor_voice.wav",
        prompts: ["Best interest determination meeting", "DCF school stability plan", "Records transfer checklist"]
    },
    {
        id: "school-health-director",
        name: "Health Services Director",
        description: "Manage Individual Health Plans (IHP) and immunization compliance.",
        icon: ClipboardCheck,
        color: "#ef4444", // Red-500
        avatar: AVATARS.COMPLIANCE,
        heroVideo: "/videos/features/iep-architect-demo.mp4",
        welcomeVideo: "", // REPLACED: Stock footage removed
        voiceWelcome: "/voice-profiles/compliance_voice.wav",
        prompts: ["Seizure action plan template", "Allergy awareness letter", "Immunization audit log"]
    },
    {
        id: "after-school-director",
        name: "After-School Director",
        description: "Coordinate enrichment schedules, staffing, and snack logistics.",
        icon: Palette,
        color: "#8b5cf6", // Violet-500
        avatar: AVATARS.CURRICULUM,
        heroVideo: "/videos/features/lesson-planner-demo.mp4",
        welcomeVideo: "", // REPLACED: Stock footage removed
        voiceWelcome: "/voice-profiles/counselor_voice.wav",
        prompts: ["Enrichment club rotation schedule", "Snack program tracking sheet", "Dismissal safety protocol"]
    },
    {
        id: "volunteer-coordinator",
        name: "Volunteer Coordinator",
        description: "Manage background checks, recruitment, and appreciation.",
        icon: Users,
        color: "#10b981", // Emerald-500
        avatar: AVATARS.PRINCIPAL,
        heroVideo: "/videos/features/iep-architect-demo.mp4",
        welcomeVideo: "", // REPLACED: Stock footage removed
        voiceWelcome: "/voice-profiles/principal_voice.wav",
        prompts: ["Volunteer orientation handbook", "Background check process memo", "Appreciation breakfast script"]
    },
    {
        id: "safety-security-chief",
        name: "Safety & Security Chief",
        description: "Conduct physical perimeter checks and visitor management protocols.",
        icon: ShieldAlert,
        color: "#111827", // Gray-900
        avatar: AVATARS.COMPLIANCE,
        heroVideo: "/videos/features/iep-architect-demo.mp4",
        welcomeVideo: "", // REPLACED: Stock footage removed
        voiceWelcome: "/voice-profiles/compliance_voice.wav",
        prompts: ["Perimeter security checklist", "Visitor entry protocol", "Door prop audit log"]
    },
    {
        id: "title-ix-coordinator",
        name: "Title IX Coordinator",
        description: "System for gender equity investigations and compliance.",
        icon: Scale,
        color: "#831843", // Pink-900
        avatar: AVATARS.COMPLIANCE,
        heroVideo: "/videos/features/iep-architect-demo.mp4",
        welcomeVideo: "", // REPLACED: Stock footage removed
        voiceWelcome: "/voice-profiles/compliance_voice.wav",
        prompts: ["Investigation timeline checklist", "No-contact order template", "Equity climate survey"]
    },
    {
        id: "school-budget-analyst",
        name: "Budget Analyst",
        description: "Forecast expenditures, track grants, and justify heavy purchases.",
        icon: Calculator,
        color: "#14532d", // Green-900
        avatar: AVATARS.DATA,
        heroVideo: "", // REPLACED: Stock footage removed
        welcomeVideo: "", // REPLACED: Stock footage removed
        voiceWelcome: "/voice-profiles/data_voice.wav",
        prompts: ["Budget narrative justification", "Title I spending spreadsheet", "Cost-benefit analysis for tech"]
    },
    {
        id: "stem-robotics-lead",
        name: "STEM & Robotics Lead",
        description: "Design makerspaces and robotics competition charters.",
        icon: Code,
        color: "#0369a1", // Sky-700
        avatar: AVATARS.CURRICULUM,
        heroVideo: "/videos/features/lesson-planner-demo.mp4",
        welcomeVideo: "", // REPLACED: Stock footage removed
        voiceWelcome: "/voice-profiles/counselor_voice.wav",
        prompts: ["Makerspace safety rules", "Robotics club charter", "Engineering design process rubric"]
    },
    {
        id: "arts-integration-specialist",
        name: "Arts Integration Specialist",
        description: "Fuse arts into STEM (STEAM) and core curriculum projects.",
        icon: Palette,
        color: "#c026d3", // Fuchsia-600
        avatar: AVATARS.CURRICULUM,
        heroVideo: "/videos/features/lesson-planner-demo.mp4",
        welcomeVideo: "", // REPLACED: Stock footage removed
        voiceWelcome: "/voice-profiles/counselor_voice.wav",
        prompts: ["STEAM project proposal", "Visual thinking strategy script", "Music in math lesson plan"]
    },
    {
        id: "labor-relations-liaison",
        name: "Labor Relations Liaison",
        description: "Navigate contract language and staff grievance procedures.",
        icon: Briefcase,
        color: "#3f3f46", // Zinc-700
        avatar: AVATARS.PRINCIPAL,
        heroVideo: "/videos/features/iep-architect-demo.mp4",
        welcomeVideo: "", // REPLACED: Stock footage removed
        voiceWelcome: "/voice-profiles/principal_voice.wav",
        prompts: ["Contract language clarification", "Grievance response template", "MOU drafting guide"]
    },
    {
        id: "capital-projects-manager",
        name: "Capital Projects Manager",
        description: "Oversee renovations, construction timelines, and FF&E.",
        icon: HardHat,
        color: "#b45309", // Amber-700
        avatar: AVATARS.PRINCIPAL,
        heroVideo: "/videos/features/iep-architect-demo.mp4",
        welcomeVideo: "", // REPLACED: Stock footage removed
        voiceWelcome: "/voice-profiles/principal_voice.wav",
        prompts: ["Renovation timeline visualizer", "FF&E inventory log", "Construction safety memo"]
    },

    // --- THE PROFESSIONAL FORGE: CREATION & POWER ---
    {
        id: "economic-independence-analyst",
        name: "Economic Oracle",
        description: "Draft strategies for fiscal independence and capital recovery. Powering community wealth through analytical foresight.",
        icon: HandCoins,
        color: "#065f46", // Emerald-900
        avatar: AVATARS.PRINCIPAL,
        heroImage: ECONOMIC_ORACLE_IMAGE,
        welcomeVideo: "", // REPLACED: Stock footage removed
        prompts: ["Community wealth building strategy", "Grant narrative for economic development", "Small business resilience protocol"]
    },
    {
        id: "identity-restoration-center",
        name: "Identity Restoration System",
        description: "Healing through knowledge. Reconstructing ancestral and cultural identities through deep-learning synthesis.",
        icon: Compass,
        color: "#7c2d12", // Red-950
        avatar: AVATARS.COUNSELOR,
        heroImage: IDENTITY_RESTORATION_IMAGE,
        welcomeVideo: "", // REPLACED: Stock footage removed
        prompts: ["Cultural heritage mapping", "Restorative identity narrative", "Healing through oral history analysis"]
    },
    {
        id: "professional-wellness-forge",
        name: "Wellness Forge",
        description: "Trauma-informed learning and mental health protocols. A digital sanctuary for collective healing.",
        icon: Flame,
        color: "#4a044e", // Fuchsia-950
        avatar: AVATARS.COUNSELOR,
        heroImage: WELLNESS_FORGE_IMAGE,
        welcomeVideo: "", // REPLACED: Stock footage removed
        prompts: ["Stress management for leaders", "Trauma-informed classroom audit", "Emotional intelligence growth plan"]
    },
    {
        id: "global-learning-channel-architect",
        name: "Global Learning Specialist",
        description: "Design original series, documentaries, and story-based curricula. Expanding the AI Knowledge Academy.",
        icon: Video,
        color: "#1e1b4b", // Indigo-950
        avatar: AVATARS.CURRICULUM,
        heroImage: GLOBAL_LEARNING_IMAGE,
        welcomeVideo: "", // REPLACED: Stock footage removed
        prompts: ["Documentary series outline on History", "Global curriculum for STEM excellence", "Transmedia storytelling for adult learners"]
    },
    {
        id: "faith-and-community-liaison",
        name: "Faith Oracle",
        description: "Connecting schools with faith communities through shared values and professional strategy.",
        icon: HeartHandshake,
        color: "#1e3a8a", // Blue-900
        avatar: AVATARS.PRINCIPAL,
        heroImage: FAITH_ORACLE_IMAGE,
        welcomeVideo: "", // REPLACED: Stock footage removed
        prompts: ["Faith community partnership strategy", "Values-based restorative justice guide", "Spiritual nourishment protocol for leaders"]
    },

    // --- TEMPLE OF WISDOM: LIVING AI EDUCATORS ---
    // These are responsive, deep-knowledge avatars that evolve with the student.
    {
        id: "ai-philosopher",
        name: "AI Philosopher",
        description: "Explore deep ethical queries, logic, and existential frameworks with a digital sage.",
        icon: Brain,
        color: "#1e1b4b", // Indigo-950
        avatar: AVATARS.CURRICULUM,
        heroImage: AI_PHILOSOPHER_IMAGE,
        welcomeVideo: "", // REPLACED: Stock footage removed
        voiceWelcome: "/voice-profiles/prophetic_voice.wav",
        prompts: ["The ethics of artificial consciousness", "Metaphysics of digital reality", "Socratic dialogue on leadership"]
    },
    {
        id: "ai-historian",
        name: "AI Historian",
        description: "Journey through filtered time. Reconstructing histories with cultural depth.",
        icon: History,
        color: "#451a03", // Orange-950
        avatar: AVATARS.COMPLIANCE,
        heroImage: AI_HISTORIAN_IMAGE,
        welcomeVideo: "", // REPLACED: Stock footage removed
        prompts: ["Pre-colonial African administrative systems", "The industrial revolution fallback analysis", "Oral traditions vs. Recorded history"]
    },
    {
        id: "ai-futurist",
        name: "AI Futurist",
        description: "Projecting professional futures. Mapping the intersection of technology and humanity.",
        icon: Sparkles,
        color: "#4c1d95", // Violet-950
        avatar: AVATARS.PRINCIPAL,
        heroImage: AI_FUTURIST_IMAGE,
        welcomeVideo: "", // REPLACED: Stock footage removed
        prompts: ["Education in the 2050s", "Post-scarcity economic models", "The evolution of human-AI symbiosis"]
    },
    {
        id: "ai-wellness-guide",
        name: "AI Wellness Guide",
        description: "Emotional intelligence and cultural mindfulness. A guide for the mental journey.",
        icon: Heart,
        color: "#701a75", // Fuchsia-950
        avatar: AVATARS.COUNSELOR,
        heroImage: WELLNESS_FORGE_IMAGE,
        welcomeVideo: "", // REPLACED: Stock footage removed
        prompts: ["Restorative breathing for educators", "Overcoming digital burnout", "Mindfulness through an African-centric lens"]
    },
    {
        id: "ai-storyteller",
        name: "AI Storyteller",
        description: "Generating infinite narratives. Cultural myths and prophetic tales.",
        icon: ScrollText,
        color: "#164e63", // Cyan-950
        avatar: AVATARS.CURRICULUM,
        heroImage: AI_STORYTELLER_IMAGE,
        welcomeVideo: "", // REPLACED: Stock footage removed
        prompts: ["Fable about the Lion and the Satellite", "Professional myth-making session", "The story of the Digital Ancestors"]
    },
    {
        id: "district-budget-optimizer",
        name: "District Budget Optimizer",
        description: "Capital recovery and financial intelligence for district leadership.",
        icon: HandCoins,
        color: "#1d4ed8",
        avatar: AVATARS.FINANCE,
        heroVideo: "", // REPLACED: Stock footage removed
        welcomeVideo: "", // REPLACED: Stock footage removed
        prompts: ["Analyze capital recovery opportunities", "Draft financial intelligence brief", "Audit district spending ROI"]
    },
    {
        id: "literacy-coach-center",
        name: "Literacy Coach AI",
        description: "Advanced literacy science and comprehension architect.",
        icon: BookMarked,
        color: "#7e22ce",
        avatar: AVATARS.LITERACY,
        heroVideo: "/videos/features/lesson-planner-demo.mp4",
        welcomeVideo: "", // REPLACED: Stock footage removed
        prompts: ["Generate phonics routine", "Draft comprehension assessment", "Audit literacy curriculum"]
    },
    {
        id: "special-ed-law-compliance-auditor",
        name: "Special Ed Law Auditor",
        description: "IDEA compliance and legal defensibility for educational documentation.",
        icon: Scale,
        color: "#b45309",
        avatar: AVATARS.COMPLIANCE,
        heroVideo: "/videos/features/iep-architect-demo.mp4",
        welcomeVideo: "", // REPLACED: Stock footage removed
        prompts: ["Audit IEP for IDEA compliance", "Draft legal defensibility brief", "Verify parental rights validation"]
    },
    {
        id: 'risk-analyzer',
        name: 'Litigation Risk Audit',
        description: 'Instant legal exposure analysis. Calculate potential liability scores and get mitigation steps before you get sued.',
        icon: Scale,
        color: 'from-red-500 to-orange-600',
        avatar: AVATARS.COMPLIANCE,
        prompts: [
            "Perform a litigation risk audit for a district-wide discipline policy change.",
            "Calculate potential liability score for a student transport incident.",
            "Draft a mitigation plan for a pending SPED legal challenge."
        ]
    },
    {
        id: 'district-strategy',
        name: 'District Strategy Command',
        description: 'Generate board-level turnaround briefs. Operational strategy diagnosis for Superintendents.',
        icon: TrendingUp,
        color: 'from-amber-500 to-orange-600',
        avatar: AVATARS.PRINCIPAL,
        prompts: [
            "Generate a board-level briefing for a district turnaround strategy.",
            "Analyze operational efficiency for the central office staff.",
            "Draft a 5-year strategic roadmap for academic excellence."
        ]
    }
];

export const GENERATORS = generators;
