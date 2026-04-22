/**
 * EdIntel Video Utilities
 * Manages video metadata and playback utilities
 */

export interface VideoMeta {
  id: string;
  title: string;
  description?: string;
  src: string;
  thumbnail?: string;
  duration?: string;
  category?: string;
  createdAt?: string;
}

// Static video library - these are served from /public/videos
// In production, this could be fetched from a database or API
export const VIDEO_LIBRARY: VideoMeta[] = [
  {
    id: 'intro',
    title: 'EdIntel Introduction',
    description: 'An overview of the EdIntel platform and its capabilities.',
    src: '/videos/intro.mp4',
    thumbnail: '/videos/thumbnails/intro.jpg',
    category: 'Overview',
  },
  {
    id: 'demo',
    title: 'Platform Demo',
    description: 'A comprehensive demonstration of EdIntel features.',
    src: '/videos/demo.mp4',
    thumbnail: '/videos/thumbnails/demo.jpg',
    category: 'Tutorial',
  },
  {
    id: 'analytics',
    title: 'Analytics Dashboard',
    description: 'Learn how to use the powerful analytics dashboard.',
    src: '/videos/analytics.mp4',
    thumbnail: '/videos/thumbnails/analytics.jpg',
    category: 'Tutorial',
  },
];

/**
 * Get all videos from the library
 */
export function getAllVideos(): VideoMeta[] {
  return VIDEO_LIBRARY;
}

/**
 * Get a video by ID
 */
export function getVideoById(id: string): VideoMeta | undefined {
  return VIDEO_LIBRARY.find((video) => video.id === id);
}

/**
 * Get videos by category
 */
export function getVideosByCategory(category: string): VideoMeta[] {
  return VIDEO_LIBRARY.filter((video) => video.category === category);
}

/**
 * Get unique categories
 */
export function getCategories(): string[] {
  const categories = VIDEO_LIBRARY.map((video) => video.category).filter(Boolean);
  return [...new Set(categories)] as string[];
}

/**
 * Format video duration from seconds
 */
export function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}
