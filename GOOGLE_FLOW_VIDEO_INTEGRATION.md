# Google Labs Flow Video Integration Guide

## 📹 How to Integrate Your Google Labs Flow Video

### Step 1: Export Your Video from Google Labs Flow

1. **Open your Flow project**: https://labs.google/fx/tools/flow/project/6c531069-d3a8-4128-bd94-020588a9b1d9/scenes/57aaf7bd-c18c-4c60-93dd-411f731aaca3
2. **Export the video**:
   - Click the "Export" or "Download" button in Flow
   - Choose your preferred format (MP4 recommended)
   - Select quality (1080p or 4K for best results)
   - Download the video file

### Step 2: Add Video to Your Project

#### Option A: Local Storage (Recommended for Development)
```bash
# Create videos directory
mkdir public/videos

# Move your downloaded video
# Place your video file in: public/videos/flow-demo.mp4
```

#### Option B: Cloud Storage (Recommended for Production)
Upload to:
- **Vercel Blob Storage**
- **Cloudinary**
- **AWS S3**
- **Google Cloud Storage**

### Step 3: Update Video URLs

Edit `src/app/video-gallery/page.tsx`:

```typescript
const videos = [
    {
        id: 1,
        url: '/videos/flow-demo.mp4', // Your Flow video
        title: 'EdIntel AI Platform Overview',
        description: 'AI-powered educational leadership platform',
        thumbnail: '/images/flow-thumb.jpg' // Optional thumbnail
    },
    // Add more videos...
];
```

### Step 4: Use the VideoShowcase Component Anywhere

```tsx
import VideoShowcase from '@/components/VideoShowcase';

<VideoShowcase
    videoUrl="/videos/your-video.mp4"
    title="Your Video Title"
    description="Video description"
    autoPlay={true}
    loop={true}
    muted={true}
/>
```

## 🎨 Integration Examples

### Example 1: Homepage Hero Video
```tsx
// src/app/page.tsx or src/components/ModernHomePage.tsx
import VideoShowcase from '@/components/VideoShowcase';

<section className="py-20">
    <VideoShowcase
        videoUrl="/videos/flow-demo.mp4"
        title="Welcome to EdIntel"
        description="AI-Powered Educational Leadership"
        autoPlay={true}
        className="max-w-6xl mx-auto"
    />
</section>
```

### Example 2: About Page Feature
```tsx
// src/app/about/page.tsx
<VideoShowcase
    videoUrl="/videos/flow-demo.mp4"
    title="Our Story"
    description="How EdIntel is transforming education"
    autoPlay={false}
/>
```

### Example 3: Professional Center
```tsx
// src/app/professional/page.tsx
<VideoShowcase
    videoUrl="/videos/flow-demo.mp4"
    title="Professional Development Suite"
    description="Comprehensive AI tools for educators"
/>
```

## 🎯 Component Features

### VideoShowcase Component Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `videoUrl` | string | required | URL to video file |
| `title` | string | required | Video title |
| `description` | string | optional | Video description |
| `thumbnail` | string | optional | Poster image URL |
| `autoPlay` | boolean | false | Auto-play on load |
| `loop` | boolean | true | Loop video |
| `muted` | boolean | true | Start muted |
| `className` | string | '' | Additional CSS classes |

### Built-in Features

✅ **Custom Controls**
- Play/Pause button
- Volume control
- Fullscreen toggle
- Progress bar with seek

✅ **Animations**
- Smooth fade-in
- Hover effects
- Control animations

✅ **Responsive Design**
- Mobile-friendly
- Touch controls
- Adaptive layout

✅ **Professional Styling**
- Gradient overlays
- Glassmorphism effects
- Purple/pink theme

## 📍 Where to Add Videos

### Recommended Locations:

1. **Homepage** (`src/components/ModernHomePage.tsx`)
   - Hero section
   - Features showcase
   - Testimonials

2. **About Page** (`src/app/about/page.tsx`)
   - Company story
   - Team introduction
   - Mission statement

3. **Professional Center** (`src/app/professional/page.tsx`)
   - Platform overview
   - Feature demonstrations

4. **Enterprise Page** (`src/app/enterprise/page.tsx`)
   - Enterprise features
   - Case studies

5. **Video Gallery** (`src/app/video-gallery/page.tsx`)
   - Dedicated video showcase
   - Multiple videos

6. **AI Hub** (`src/app/ai-hub/page.tsx`)
   - AI capabilities
   - Technology demos

## 🚀 Quick Start

1. **Download your Flow video**
2. **Place in** `public/videos/flow-demo.mp4`
3. **Visit** `http://localhost:3000/video-gallery`
4. **See your video** beautifully integrated!

## 🎬 Video Optimization Tips

### File Size
- **Compress** videos before upload
- Use **H.264** codec for best compatibility
- Target **10-20 MB** for web videos

### Quality
- **1080p** (1920x1080) recommended
- **30 FPS** for smooth playback
- **MP4** format for universal support

### Performance
- Add **poster images** for faster loading
- Use **lazy loading** for multiple videos
- Consider **streaming** for long videos

## 🔗 Live Examples

Once deployed, your videos will be available at:
- **Video Gallery**: https://edintel-app.vercel.app/video-gallery
- **Homepage**: https://edintel-app.vercel.app
- **Professional Center**: https://edintel-app.vercel.app/professional

## 💡 Pro Tips

1. **Create thumbnails** for better UX
2. **Add captions** for accessibility
3. **Use multiple formats** (MP4, WebM) for compatibility
4. **Optimize for mobile** with lower resolution versions
5. **Track analytics** to see engagement

## 🎨 Customization

### Change Colors
Edit `src/components/VideoShowcase.tsx`:
```tsx
// Change gradient colors
className="bg-gradient-to-r from-purple-500 to-pink-500"
// to
className="bg-gradient-to-r from-blue-500 to-cyan-500"
```

### Adjust Layout
```tsx
// Full width
<VideoShowcase className="w-full" />

// Centered with max width
<VideoShowcase className="max-w-4xl mx-auto" />

// Grid layout
<div className="grid md:grid-cols-2 gap-6">
    <VideoShowcase ... />
    <VideoShowcase ... />
</div>
```

## 📞 Need Help?

If you need assistance:
1. Check the component props
2. Review the examples above
3. Test in development first
4. Deploy to production

---

**Your Google Labs Flow video is ready to shine in EdIntel!** 🌟
