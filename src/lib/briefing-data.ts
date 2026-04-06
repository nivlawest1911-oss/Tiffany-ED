export interface Chapter {
    timestamp: string;
    title: string;
    context: string;
    links?: { label: string; url: string }[];
}

export interface Episode {
    id: string;
    slug: string;
    number: number;
    title: string;
    summary: string;
    fullReport: string; // The "Deep Dive" content
    audioUrl: string;
    duration: string;
    date: string;
    chapters: Chapter[];
    tags: string[];
    thumbnail?: string;
    isPremium?: boolean;
}

export const EPISODES: Episode[] = [
    {
        id: '1',
        slug: 'mobile-county-enrollment-trends-2026',
        number: 1,
        title: 'Mobile County Enrollment Trends 2026',
        summary: 'An investigative look at local enrollment shifts across Mobile County Public Schools and their impact on future funding.',
        fullReport: `
# Deep Dive: Mobile County Enrollment Dynamics
## Strategic Intelligence Report

Our analysis indicates a 3.4% shift in student population toward the eastern corridors of Mobile County. This migration is putting unique pressure on facility utilization and Title I eligibility markers.

### Key Data Points:
- **Projected ADM (Average Daily Membership)**: Stabilizing at 52,400 students.
- **Funding Impact**: Potential increase in $2.1M for digital infrastructure through State Foundation Program adjustments.
- **Checklist**:
    1. [ ] Review current zone capacity vs. projected growth.
    2. [ ] Map professional development resources to high-growth clusters.
    3. [ ] Audit E-rate compliance for expanded wireless nodes.
        `,
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', // Placeholder
        duration: '18:45',
        date: '2026-03-31',
        chapters: [
            {
                timestamp: '00:00',
                title: 'Introduction: The Data Landscape',
                context: 'A high-level overview of the 2026 census data for Alabama education.'
            },
            {
                timestamp: '04:15',
                title: 'Local Enrollment Clusters',
                context: 'Breaking down the student migration trends in Mobile County.',
                links: [{ label: 'View Real-time Enrollment Map', url: '/dashboard/analytics/enrollment' }]
            },
            {
                timestamp: '12:30',
                title: 'Funding Framework Alpha',
                context: 'How the State Foundation Program is shifting based on new population markers.'
            }
        ],
        tags: ['Mobile County', 'Enrollment', 'Funding', 'Alabama'],
        isPremium: true
    },
    {
        id: '2',
        slug: 'alabama-literacy-act-compliance-briefing',
        number: 2,
        title: 'Alabama Literacy Act: Compliance Briefing',
        summary: 'Expert strategy for navigating the latest updates to the Alabama Literacy Act and ensuring Title I alignment.',
        fullReport: `
# Implementation Briefing: Alabama Literacy Act
## Executive Compliance Strategy

Focusing on the K-3 literacy intervention requirements for the upcoming fiscal cycle. Ensure all screening protocols are vectorized and logged within the EdIntel Vault.

### Strategic Priorities:
- **Vectorized Logging**: All reading interventions must be timestamped and stored.
- **Parental Notification Nodes**: Automate the delivery of Individualized Reading Plans (IRPs).
- **Audit Preparedness**: Ready your Strategic Vault for upcoming ALSDE reviews.
        `,
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', // Placeholder
        duration: '22:10',
        date: '2026-03-24',
        chapters: [
            {
                timestamp: '00:00',
                title: 'Compliance Overview',
                context: 'Reviewing the latest legislative amendments.'
            },
            {
                timestamp: '08:45',
                title: 'Title I Synchronization',
                context: 'Aligning literacy goals with federal funding requirements.'
            }
        ],
        tags: ['Compliance', 'Literacy Act', 'Alabama', 'Leadership'],
        isPremium: true
    }
];
