export interface PodcastEpisode {
    id: string;
    title: string;
    description: string;
    host: string;
    duration: string; // e.g., "45:00"
    publishDate: string;
    category: "Leadership" | "Pedagogy" | "Technology" | "Wellness";
    audioUrl: string; // Placeholder or actual URL
    imageUrl: string; // Cover art
}

export const mockPodcasts: PodcastEpisode[] = [
    {
        id: "ep-101",
        title: "The Future of AI in IEP Generation",
        description: "Dr. Eleanor Vance discusses how generative AI is transforming special education compliance and the emotional bandwidth of educators.",
        host: "EdIntel Sovereign",
        duration: "42:15",
        publishDate: "2026-03-01",
        category: "Technology",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", // Free placeholder audio
        imageUrl: "/images/branding/edintel_logo_sovereign.png",
    },
    {
        id: "ep-102",
        title: "Data-Driven Staff Resiliency",
        description: "Principal Marcus Thorne breaks down how shifting from reactive discipline to proactive, data-informed wellness checks improved teacher retention by 40%.",
        host: "EdIntel Sovereign",
        duration: "38:50",
        publishDate: "2026-02-15",
        category: "Leadership",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
        imageUrl: "/images/branding/edintel_logo_sovereign.png",
    },
    {
        id: "ep-103",
        title: "Differentiating Instruction at Scale",
        description: "A deep dive into using Tier 2 interventions systematically without burning out your instructional coaches.",
        host: "EdIntel Sovereign",
        duration: "55:20",
        publishDate: "2026-01-28",
        category: "Pedagogy",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
        imageUrl: "/images/branding/edintel_logo_sovereign.png",
    },
    {
        id: "ep-104",
        title: "Navigating Title I Compliance",
        description: "Strategic frameworks for ensuring ESSA compliance while maintaining creative freedom in targeted assistance programs.",
        host: "EdIntel Sovereign",
        duration: "48:10",
        publishDate: "2026-01-10",
        category: "Leadership",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
        imageUrl: "/images/branding/edintel_logo_sovereign.png",
    }
];
