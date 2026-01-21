import { LucideIcon } from 'lucide-react';

export interface AvatarDefinition {
    id: string;
    name?: string; // Optional because some entries might rely on defaults or have structure issues I need to align
    role: string;
    status?: string; // Legacy prop support
    clearance?: string; // Legacy prop support
    avatar: string;
    video: string; // Path to idle/intro video
    voiceId?: string; // ElevenLabs or system voice ID
    heygenId?: string; // For video generation
    color: string;
    specialty: string;
    description: string;
    achievements: string[];
    icon?: LucideIcon; // Optional as I see it's missing in the array
}

export const CORE_AVATARS: AvatarDefinition[] = [
    {
        id: 'sovereign_1',
        role: 'Strategic Crisis Lead',
        status: 'offline',
        avatar: '/images/avatars/dr_alvin_west_premium.png',
        specialty: 'District Safety & Crisis Communication',
        heygenId: 'josh_lite3_20230714',
        clearance: 'Quantum',
        video: '/videos/briefings/principal_briefing.mp4',
        description: 'High-stakes crisis management and strategic communication director. Ensures district stability during critical periods.',
        achievements: ['Crisis Protocol Author', 'Safe Schools Liaison', 'Strategic Stability Expert'],
        color: 'from-red-600 to-zinc-900'
    },
    {
        id: 'delegate_2',
        name: 'Keisha Reynolds',
        role: 'Secondary Principal',
        status: 'active',
        avatar: '/images/avatars/keisha_reynolds_premium.png',
        specialty: 'Instructional Leadership & Culture',
        heygenId: '36506d33758b4563a948259b37a4e57d',
        clearance: 'L3',
        video: '/videos/briefings/counselor_briefing.mp4',
        description: 'Leadership strategist for school culture and teacher efficacy. Keisha specializes in high-impact instructional coaching and building resilient school communities.',
        achievements: ['M.Ed School Leadership', 'National Principal Finalist', '15+ Years Mastery'],
        color: 'from-emerald-600 to-emerald-900'
    },
    {
        id: 'delegate_3',
        name: 'Dr. Isaiah Vance',
        role: 'Associate Superintendent',
        status: 'busy',
        avatar: '/images/avatars/isaiah_vance_premium.png',
        specialty: 'Policy & Governance',
        heygenId: '135ea5597b4f4c8c83e02c637a7b9868',
        clearance: 'L3',
        video: '/videos/briefings/principal_briefing.mp4',
        description: 'Elite policy strategist focused on district governance and legislative compliance. Dr. Vance ensures administrative actions are professional, transparent, and aligned with standards.',
        achievements: ['Ed.D Policy & Law', 'State Governance Lead', '400+ Policies Authored'],
        color: 'from-zinc-600 to-zinc-900'
    },
    {
        id: 'delegate_4',
        name: 'Andre Patterson',
        role: 'Behavior Intervention Lead',
        status: 'active',
        avatar: '/images/avatars/andre_patterson_premium.png',
        specialty: 'School Climate & Tiered Support',
        heygenId: 'josh_lite3_20230714',
        clearance: 'L2',
        video: '/videos/briefings/counselor_briefing.mp4',
        description: 'Lead strategist for positive behavior environments. Andre develops frameworks that improve school climate and student outcomes through data-informed empathy.',
        achievements: ['Expert PBIS Trainer', 'FBA Specialist', '200+ Schools Transformed'],
        color: 'from-orange-600 to-red-800'
    },
    {
        id: 'delegate_5',
        name: 'Dr. Emily Robinson',
        role: 'Literacy & Data Specialist',
        status: 'active',
        avatar: '/images/avatars/emily_robinson_premium.png',
        specialty: 'Literacy Optimization',
        heygenId: '36506d33758b4563a948259b37a4e57d',
        clearance: 'L2',
        video: '/videos/briefings/data_briefing.mp4',
        description: 'Specialist in literacy and student performance analytics. Dr. Robinson bridges the gap between data and actionable classroom intervention strategies.',
        achievements: ['PhD English Education', 'Data Science Specialist', 'Literacy Grant Lead'],
        color: 'from-violet-600 to-purple-800'
    },
    {
        id: 'delegate_6',
        name: 'Dr. Maya Washington',
        role: 'Special Education Lead',
        status: 'active',
        avatar: '/images/avatars/maya_washington_premium.png',
        specialty: 'IEP Development & Compliance',
        heygenId: '36506d33758b4563a948259b37a4e57d',
        clearance: 'L3',
        video: '/videos/briefings/data_briefing.mp4',
        description: 'Expert in special education policy and inclusive learning. Dr. Washington ensures every learner has a clear, data-backed success path that honors their unique needs.',
        achievements: ['BCBA-D Certified', 'PhD Behavioral Science', '5000+ IEP Audits'],
        color: 'from-pink-600 to-rose-800'
    }
];
