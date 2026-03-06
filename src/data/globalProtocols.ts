import {
    Brain, Zap, Globe, MessageSquare, Video
} from "lucide-react";
import { CORE_AVATARS } from './avatars';

const AVATAR_MAP = Object.fromEntries(CORE_AVATARS.map(a => [a.id, a.avatar]));

export const globalProtocols = [
    {
        id: "meta-ai",
        name: "Meta AI (Llama)",
        category: "Global",
        description: "Chat with Llama 3.3 70B for educational content, quizzes, and analysis. High-throughput reasoning for rapid synthesis.",
        icon: Brain,
        color: "#3b82f6",
        avatar: AVATAR_MAP['EdIntel_1'] || "/images/avatars/Dr._alvin_west.png",
        status: "Active",
        prompts: [
            "Draft a quiz based on recent 4th-grade math standards focusing on fractions.",
            "Analyze this student work sample for common misconceptions in algebraic thinking.",
            "Generate a multi-tiered lesson plan for a 10th-grade ELA unit on 'The Great Gatsby'."
        ],
        type: "chat",
        platform: "meta"
    },
    {
        id: "grok-ai",
        name: "X.AI (Grok)",
        category: "Global",
        description: "Advanced reasoning and real-time information with Grok-1. Optimized for truth-seeking and sovereign research.",
        icon: Zap,
        color: "#fbbf24",
        avatar: AVATAR_MAP['delegate_3'] || "/images/avatars/dr_isaiah_vance_premium.png",
        status: "Active",
        prompts: [
            "Provide a real-time summary of the latest trends in educational technology policy.",
            "Analyze the intersection of blockchain and student data sovereignty.",
            "Draft a tactical memo on institutional resilience for the current academic quarter."
        ],
        type: "chat",
        platform: "xai"
    },
    {
        id: "google-gemini",
        name: "Google Gemini",
        category: "Global",
        description: "Multimodal AI for text, images, and code. Deep integration with the Sovereign Workspace ecosystem.",
        icon: Globe,
        color: "#10b981",
        avatar: AVATAR_MAP['delegate_5'] || "/images/avatars/emily_robinson_premium.png",
        status: "Active",
        prompts: [
            "Sync my recent lesson plans with the Sovereign Workspace.",
            "Generate a multimodal presentation for a community stakeholders meeting.",
            "Analyze these classroom videos for student engagement metrics."
        ],
        type: "link",
        href: "/gemini-workspace"
    },
    {
        id: "live-avatar",
        name: "Sovereign Avatar",
        category: "Global",
        description: "Real-time interactive AI communication. Direct neural interface with high-fidelity streaming educators.",
        icon: MessageSquare,
        color: "#a855f7",
        avatar: AVATAR_MAP['delegate_2'] || "/images/avatars/keisha_reynolds_premium.png",
        status: "Ready",
        prompts: [
            "Initiate a live briefing on my current student caseload.",
            "Practice a difficult parent-teacher conference scenario.",
            "Conduct a mock principal interview for professional development."
        ],
        type: "avatar-stream"
    },
    {
        id: "avatar-video-gen",
        name: "Avatar Video",
        category: "Visual",
        description: "Create professional avatar videos from scripts. 100+ avatars and 300+ voices for institutional high-fidelity media.",
        icon: Video,
        color: "#ec4899",
        avatar: AVATAR_MAP['delegate_6'] || "/images/avatars/maya_washington_premium.png",
        status: "Ready",
        prompts: [
            "Generate a greeting video for the new school year.",
            "Transform this science curriculum into a series of short educational videos.",
            "Create a multilingual safety briefing for staff and parents."
        ],
        type: "video-gen",
        provider: "heygen"
    }
];
