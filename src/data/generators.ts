import {
    FileText, MessageSquare, GraduationCap, Shield, Brain, Lightbulb, Sparkles, Send, Copy, Check, Loader2, BookOpen, Users,
    Mic, Volume2, Accessibility, Code, Database, Megaphone, Palette, Calendar, ClipboardCheck, TrendingUp, Award, Target,
    Briefcase, GraduationCap as StudentCap, BookMarked, PenTool, Video, Beaker, Calculator, HandCoins, Bus, ClipboardList,
    PieChart, Layers, Gamepad2, ShieldAlert, Mail, ScrollText, Map, UserCheck, FileJson, Table, HeartHandshake, Smile,
    GanttChart, Trophy, Glasses
} from "lucide-react"

// Map specific tools to "Delegate" avatars for the human feel
const AVATARS = {
    PRINCIPAL: "/images/avatars/executive_leader.png", // Dr. West
    COUNSELOR: "/images/avatars/behavior_specialist.png",
    CURRICULUM: "/images/avatars/curriculum_strategist.png",
    DATA: "/images/avatars/executive_leader.png",
    COMPLIANCE: "/images/avatars/iep_architect.png"
}

export const generators = [
    // --- EXISTING TOOLS ---
    {
        id: "iep-architect",
        name: "IEP Architect",
        description: "Generate compliant IEP drafts with SMART goals",
        icon: FileText,
        color: "#00d2ff",
        avatar: AVATARS.COMPLIANCE,
        prompts: ["Generate annual IEP goals for...", "Create transition plan for...", "Draft accommodations for..."]
    },
    {
        id: "lesson-planner",
        name: "Lesson Planner",
        description: "Standards-aligned lesson plans in seconds",
        icon: GraduationCap,
        color: "#d4af37",
        avatar: AVATARS.CURRICULUM,
        heroImage: "/images/features/sovereign_educator_planner.png",
        prompts: ["Alabama Course of Study aligned", "Differentiated instruction", "Project-based learning"]
    },
    {
        id: "grant-writer",
        name: "Grant Writer Studio",
        description: "Secure funding",
        icon: HandCoins,
        color: "#10b981",
        avatar: AVATARS.DATA,
        heroImage: "/images/features/executive_grant_writer.png",
        prompts: ["Grant proposal draft"]
    },
    {
        id: "data-detective",
        name: "Data Detective",
        description: "Data visualization",
        icon: Database,
        color: "#a855f7",
        avatar: AVATARS.DATA,
        heroImage: "/images/features/collaborative_intelligence_team.png",
        prompts: ["Analyze attendance trends"]
    },
    {
        id: "behavior-coach",
        name: "Behavior Coach",
        description: "Positive behavior intervention strategies and PBIS support",
        icon: Award,
        color: "#14b8a6",
        avatar: AVATARS.COUNSELOR,
        heroImage: "/images/features/behavior_intervention_specialist.png",
        prompts: ["Create behavior intervention plan", "PBIS reward system", "De-escalation techniques"]
    },
    // ... (Many existing ones would be here, mapped to avatars)

    // --- NEW FREE TOOLS ---
    {
        id: "recommendation-writer",
        name: "Recommendation Writer",
        description: "Draft powerful letters of recommendation for students and staff",
        icon: ScrollText,
        color: "#f472b6",
        avatar: AVATARS.PRINCIPAL,
        prompts: ["College recommendation letter", "Colleague endorsement", "Student leadership reference"]
    },
    {
        id: "field-trip-architect",
        name: "Field Trip Architect",
        description: "Plan educational excursions with logistics and safety checklists",
        icon: Map,
        color: "#22c55e",
        avatar: AVATARS.CURRICULUM,
        heroImage: "/images/features/field_trip_logistics_commander.png",
        prompts: ["Science museum trip plan", "Permission slip template", "Chaperone guidelines"]
    },
    {
        id: "substitute-binder-pro",
        name: "Substitute Binder Pro",
        description: "Generate a complete day-of substitute teacher packet instantly",
        icon: ClipboardList,
        color: "#f59e0b",
        avatar: AVATARS.PRINCIPAL,
        prompts: ["Emergency lesson plan", "Class roster template", "School procedures sheet"]
    },
    {
        id: "grant-compliance-auditor",
        name: "Grant Auditor",
        description: "Check spending and documentation against grant requirements",
        icon: FileJson,
        color: "#8b5cf6",
        avatar: AVATARS.DATA,
        prompts: ["Audit Title I spending", "Grant reporting checklist", "Allowable cost check"]
    },
    {
        id: "rubric-maker",
        name: "Rubric Maker",
        description: "Create detailed grading rubrics for any assignment",
        icon: Table,
        color: "#06b6d4",
        avatar: AVATARS.CURRICULUM,
        prompts: ["Essay rubric 9th grade", "Oral presentation rubric", "Science project criteria"]
    },
    {
        id: "conflict-mediator",
        name: "Conflict Mediator",
        description: "Scripts and strategies for resolving student or staff conflicts",
        icon: HeartHandshake,
        color: "#ec4899",
        avatar: AVATARS.COUNSELOR,
        prompts: ["Student conflict script", "Parent-Teacher mediation", "Restorative circle guide"]
    },
    {
        id: "icebreaker-specialist",
        name: "Icebreaker Specialist",
        description: "Fun, engaging activities to build classroom community",
        icon: Smile,
        color: "#eab308",
        avatar: AVATARS.COUNSELOR,
        prompts: ["First day of school activity", "Staff meeting icebreaker", "Team building game"]
    },
    {
        id: "schedule-optimizer",
        name: "Master Schedule Optimizer",
        description: "Analyze and suggest improvements for class schedules",
        icon: GanttChart,
        color: "#6366f1",
        avatar: AVATARS.PRINCIPAL,
        prompts: ["Optimize lunch waves", "Teacher prep period logic", "Block schedule ideas"]
    },
    {
        id: "sports-eligibility-tracker",
        name: "Athletic Compliance",
        description: "Track student athlete eligibility and grade requirements",
        icon: Trophy,
        color: "#f97316",
        avatar: AVATARS.COMPLIANCE,
        prompts: ["Eligibility checklist", "GPA tracking template", "NCAA requirement guide"]
    },
    {
        id: "dyslexia-resource-gen",
        name: "Dyslexia Resource Gen",
        description: "Specialized interventions and fonts for reading support",
        icon: Glasses,
        color: "#3b82f6",
        avatar: AVATARS.CURRICULUM,
        prompts: ["Dyslexia-friendly worksheet", "Reading intervention list", "Parent resource guide"]
    },
    // Re-adding essential existing ones for the demo to work fully
    { id: "email-composer", name: "Email Composer", description: "Professional communications", icon: MessageSquare, color: "#10b981", avatar: AVATARS.PRINCIPAL, heroImage: "/images/features/sovereign_communications_director.png", prompts: ["Parent conference follow-up", "Staff announcement"] },
    { id: "policy-advisor", name: "Policy Advisor", description: "Navigate regulations", icon: Shield, color: "#8b5cf6", avatar: AVATARS.COMPLIANCE, prompts: ["IDEA compliance check", "504 plan requirements"] },
    { id: "cognitive-coach", name: "Cognitive Coach", description: "Executive function strategies", icon: Brain, color: "#ec4899", avatar: AVATARS.COUNSELOR, prompts: ["Working memory activities"] },
    { id: "idea-generator", name: "Idea Generator", description: "Creative solutions", icon: Lightbulb, color: "#f59e0b", avatar: AVATARS.CURRICULUM, prompts: ["Engagement strategies"] },
    { id: "code-commander", name: "Code Commander", description: "Learn coding", icon: Code, color: "#06b6d4", avatar: AVATARS.DATA, prompts: ["Debug my Python code"] },
    { id: "data-detective", name: "Data Detective", description: "Data visualization", icon: Database, color: "#a855f7", avatar: AVATARS.DATA, prompts: ["Analyze attendance trends"] },
    { id: "comms-director", name: "Comms Director", description: "PR content", icon: Megaphone, color: "#f97316", avatar: AVATARS.PRINCIPAL, prompts: ["Draft school newsletter"] },
    { id: "design-studio", name: "Design Studio", description: "Creative layout", icon: Palette, color: "#e11d48", avatar: AVATARS.CURRICULUM, prompts: ["Yearbook layout ideas"] },
    { id: "meeting-prep", name: "Meeting Prep", description: "Agendas & talking points", icon: Briefcase, color: "#0ea5e9", avatar: AVATARS.PRINCIPAL, prompts: ["Board meeting agenda"] },
    { id: "assessment-builder", name: "Assessment Builder", description: "Create assessments", icon: ClipboardCheck, color: "#8b5cf6", avatar: AVATARS.CURRICULUM, prompts: ["Multiple choice quiz"] },
    { id: "differentiation-planner", name: "Differentiation", description: "Tiered activities", icon: Target, color: "#ec4899", avatar: AVATARS.CURRICULUM, prompts: ["Tier 1, 2, 3 activities"] },
    { id: "data-analyzer", name: "Data Analyzer", description: "Interpret data", icon: TrendingUp, color: "#10b981", avatar: AVATARS.DATA, prompts: ["Analyze benchmark results"] },
    { id: "parent-communicator", name: "Parent Communicator", description: "Communication logs", icon: MessageSquare, color: "#f59e0b", avatar: AVATARS.COUNSELOR, prompts: ["Weekly progress update"] },
    { id: "student-goal-setter", name: "Student Goal Setter", description: "SMART goals", icon: StudentCap, color: "#06b6d4", avatar: AVATARS.COUNSELOR, prompts: ["Academic goal template"] },
    { id: "study-guide-maker", name: "Study Guide Maker", description: "Review materials", icon: BookMarked, color: "#a855f7", avatar: AVATARS.CURRICULUM, prompts: ["Chapter summary"] },
    { id: "writing-coach", name: "Writing Coach", description: "Essay feedback", icon: PenTool, color: "#f97316", avatar: AVATARS.CURRICULUM, prompts: ["Essay outline help"] },
    { id: "video-lesson-planner", name: "Video Lesson Planner", description: "Video scripts", icon: Video, color: "#d946ef", avatar: AVATARS.CURRICULUM, prompts: ["Flipped classroom script"] },
    { id: "college-essay-coach", name: "College Essay Coach", description: "Ivy League feedback", icon: StudentCap, color: "#d4af37", avatar: AVATARS.COUNSELOR, prompts: ["Review college essay draft"] },
    { id: "science-fair-mentor", name: "Science Fair Mentor", description: "Project ideas", icon: Beaker, color: "#0ea5e9", avatar: AVATARS.CURRICULUM, prompts: ["Science fair project ideas"] },
    { id: "math-tutor-pro", name: "Math Tutor Pro", description: "Math help", icon: Calculator, color: "#f59e0b", avatar: AVATARS.CURRICULUM, prompts: ["Explain math problem"] },
    { id: "debate-prep", name: "Debate Prep", description: "Argument builder", icon: Mic, color: "#ef4444", avatar: AVATARS.CURRICULUM, prompts: ["Argument builder"] },
    { id: "grant-writer", name: "Grant Writer Studio", description: "Secure funding", icon: HandCoins, color: "#10b981", avatar: AVATARS.DATA, prompts: ["Grant proposal draft"] },
    { id: "bus-route-optimizer", name: "Transport Logistics", description: "Route efficiency", icon: Bus, color: "#f59e0b", avatar: AVATARS.DATA, prompts: ["Optimize bus route"] },
    { id: "budget-allocator", name: "Budget Allocator", description: "Finance modeling", icon: PieChart, color: "#06b6d4", avatar: AVATARS.DATA, prompts: ["Budget analysis"] },
    { id: "project-pbl-architect", name: "PBL Architect", description: "Project design", icon: Layers, color: "#ec4899", avatar: AVATARS.CURRICULUM, prompts: ["PBL unit plan"] },
    { id: "quiz-gamifier", name: "Quiz Gamifier", description: "Gamification", icon: Gamepad2, color: "#8b5cf6", avatar: AVATARS.CURRICULUM, prompts: ["Gamify quiz review"] },
    { id: "safety-drill-master", name: "Safety Drill Master", description: "Crisis planning", icon: ShieldAlert, color: "#ef4444", avatar: AVATARS.COMPLIANCE, prompts: ["Fire drill procedure"] },
    { id: "newsletter-wizard", name: "Newsletter Wizard", description: "Community updates", icon: Mail, color: "#3b82f6", avatar: AVATARS.PRINCIPAL, heroImage: "/images/features/sovereign_communications_director.png", prompts: ["Weekly newsletter"] },
]
