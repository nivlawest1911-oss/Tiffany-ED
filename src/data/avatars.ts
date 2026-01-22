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

/**
 * CORE_AVATARS - The single source of truth for all AI delegates.
 * To integrate user-provided videos:
 * 1. Upload .mp4 to gs://edintel-evidence-edintel-sovereign-2027/
 * 2. Update the 'video' field with: https://storage.googleapis.com/edintel-evidence-edintel-sovereign-2027/filename.mp4
 */
export const CORE_AVATARS: AvatarDefinition[] = [
    {
        id: 'sovereign_1',
        name: 'Dr. Alvin West',
        role: 'Strategic Crisis Lead',
        status: 'offline',
        avatar: '/images/avatars/dr_alvin_west_premium.png',
        specialty: 'District Safety & Crisis Communication',
        heygenId: 'josh_lite3_20230714',
        voiceId: 'TxGEqnSArWdgf43uNMcG', // Josh
        clearance: 'Quantum',
        video: 'https://storage.googleapis.com/edintel-evidence-edintel-sovereign-2027/principal_briefing.mp4',
        description: 'High-stakes crisis management and strategic communication director. Ensures district stability during critical periods.',
        achievements: ['Crisis Protocol Author', 'Safe Schools Liaison', 'Strategic Stability Expert'],
        color: 'from-amber-600 to-zinc-900'
    },
    {
        id: 'delegate_2',
        name: 'Keisha Reynolds',
        role: 'Secondary Principal',
        status: 'active',
        avatar: '/images/avatars/keisha_reynolds_premium.png',
        specialty: 'Instructional Leadership & Culture',
        heygenId: '36506d33758b4563a948259b37a4e57d',
        voiceId: '21m00Tcm4TlvDq8ikWAM', // Rachel
        clearance: 'L3',
        video: 'https://storage.googleapis.com/edintel-evidence-edintel-sovereign-2027/principal_briefing.mp4',
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
        voiceId: 'ErXw9S197X3R3mTSST9C', // Antoni
        clearance: 'L3',
        video: 'https://storage.googleapis.com/edintel-evidence-edintel-sovereign-2027/principal_briefing.mp4',
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
        voiceId: 'ODq5zOfpSjrW7G7A6iY8', // James
        clearance: 'L2',
        video: 'https://storage.googleapis.com/edintel-evidence-edintel-sovereign-2027/counselor_briefing.mp4',
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
        voiceId: 'EXAVITQu4vr4xnSDxMaL', // Bella
        clearance: 'L2',
        video: 'https://storage.googleapis.com/edintel-evidence-edintel-sovereign-2027/data_briefing.mp4',
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
        voiceId: 'MF3mGyEYCl7XYW7LpInj', // Elli
        clearance: 'L3',
        video: 'https://storage.googleapis.com/edintel-evidence-edintel-sovereign-2027/data_briefing.mp4',
        description: 'Expert in special education policy and inclusive learning. Dr. Washington ensures every learner has a clear, data-backed success path that honors their unique needs.',
        achievements: ['BCBA-D Certified', 'PhD Behavioral Science', '5000+ IEP Audits'],
        color: 'from-pink-600 to-rose-800'
    },
    {
        id: 'delegate_7',
        name: 'Director Nova',
        role: 'Capital Recovery Lead',
        status: 'active',
        avatar: '/images/avatars/executive_leader.png',
        specialty: 'Fiscal Solvency & Resource Recovery',
        heygenId: 'josh_lite3_20230714',
        voiceId: 'AZnzlk1XjtbaicYn0nS5', // Nicole
        clearance: 'L3',
        video: 'https://storage.googleapis.com/edintel-evidence-edintel-sovereign-2027/data_briefing.mp4',
        description: 'Strategic lead for budget optimization and capital recovery. Director Nova specializes in identified zero-waste implementation and ROI maximization.',
        achievements: ['Fiscal Architect', 'Grant Recovery Specialist', '$10M+ Capital Reclaimed'],
        color: 'from-emerald-600 to-teal-900'
    }


];
