# 🎬 Talking Avatar Video Integration Guide

## 🎯 **OBJECTIVE**
Replace static avatar images with **real talking avatar videos** using HeyGen API throughout the EdIntel application.

---

## 🚀 **IMPLEMENTATION STRATEGY**

### **Phase 1: HeyGen API Setup**

1. **Sign up for HeyGen**:
   - Visit: https://www.heygen.com
   - Create account
   - Get API key from dashboard

2. **Add to Vercel Environment Variables**:
   ```bash
   HEYGEN_API_KEY=your_heygen_api_key_here
   ```

3. **Select Avatar IDs**:
   - Browse HeyGen avatar library
   - Choose professional-looking avatars
   - Copy Avatar IDs for each delegate

---

## 📋 **AVATAR MAPPING**

### **Current Delegates → HeyGen Avatars**

| Delegate | Current Image | HeyGen Avatar ID | Voice ID |
|----------|--------------|------------------|----------|
| Dr. Alvin West | dr_alvin_west_premium.png | `Abigail_expressive_2024112501` | Deep, authoritative |
| Sarah Connors | sarah_connors_premium.png | `Anna_public_3_20240108` | Clinical, precise |
| Marcus Aurelius | marcus_aurelius_premium.png | `Tyler_front_20220721` | Grave, stoic |
| André State | andre_state_premium.png | `josh_lite3_20230714` | Innovative, energetic |
| Keisha Reynolds | keisha_reynolds_premium.png | `Monica_public_3_20240108` | Authoritative, warm |
| Emily Robinson | emily_robinson_premium.png | `Susan_public_2_20240328` | Warm, educational |
| Isaiah Vance | isaiah_vance_premium.png | `Wayne_20240711` | Tech-savvy, modern |

---

## 🎥 **VIDEO GENERATION WORKFLOW**

### **Option 1: Pre-generate Videos (Recommended)**

1. **Create greeting videos** for each avatar:
   ```typescript
   // Use src/lib/heygen-avatar.ts
   const video = await createAvatarVideo({
       avatarId: 'Abigail_expressive_2024112501',
       voiceId: 'en-US-JennyNeural',
       text: 'Director, the District Connection is synchronized. How shall we architect the legacy of your schools today?',
       ratio: '16:9',
       quality: 'high'
   });
   ```

2. **Download and store** in `/public/videos/avatars/`:
   - `dr_alvin_west_talking.mp4`
   - `sarah_connors_talking.mp4`
   - `marcus_aurelius_talking.mp4`
   - etc.

3. **Update components** to use video instead of static images

### **Option 2: Real-time Generation**

Generate videos on-demand when user interacts with avatar:
- Slower (30-60 seconds generation time)
- More flexible (custom messages)
- Higher API costs

---

## 🔧 **COMPONENT UPDATES NEEDED**

### **1. Dashboard Delegates**
**File**: `src/app/dashboard/page.tsx`

```typescript
const DELEGATES = [
    {
        id: 'alvin',
        name: 'Dr. Alvin West',
        role: 'District Visionary',
        img: '/images/avatars/dr_alvin_west_premium.png',
        video: '/videos/avatars/dr_alvin_west_talking.mp4', // ADD THIS
        heygenId: 'Abigail_expressive_2024112501', // ADD THIS
        // ... rest
    },
    // ... other delegates
];
```

### **2. AI Avatar Gallery**
**File**: `src/components/AIAvatarGallery.tsx`

Replace static images with `TalkingAvatarVideo` component:

```typescript
import TalkingAvatarVideo from './TalkingAvatarVideo';

// In render:
<TalkingAvatarVideo
    videoSrc={avatar.video}
    posterImage={avatar.img}
    name={avatar.name}
    role={avatar.role}
    autoPlay={false}
    loop={true}
    showControls={true}
/>
```

### **3. Holographic Briefing**
**File**: `src/components/HolographicBriefing.tsx`

Add video background to briefings:

```typescript
<TalkingAvatarVideo
    videoSrc={briefingVideo}
    posterImage={avatarImage}
    name={role}
    autoPlay={true}
    muted={false}
    className="absolute inset-0 z-0"
/>
```

### **4. Sovereign Delegate**
**File**: `src/components/SovereignDelegate.tsx`

Replace static avatars with talking videos in delegate cards.

---

## 📦 **VERCEL BLOB STORAGE (For Videos)**

Since videos are large files, use Vercel Blob Storage:

1. **Install Vercel Blob**:
   ```bash
   npm install @vercel/blob
   ```

2. **Upload videos**:
   ```typescript
   import { put } from '@vercel/blob';
   
   const blob = await put('avatars/dr_alvin_west.mp4', file, {
       access: 'public',
   });
   
   console.log(blob.url); // Use this URL in components
   ```

3. **Update video paths** to use Blob URLs

---

## 🎨 **GOOGLE CLOUD VERTEX AI INTEGRATION**

For even more advanced avatars, use Google Cloud:

### **Vertex AI Video Generation**

```typescript
import { VertexAI } from '@google-cloud/vertexai';

const vertexAI = new VertexAI({
    project: process.env.GOOGLE_CLOUD_PROJECT,
    location: 'us-central1'
});

const model = vertexAI.preview.getGenerativeModel({
    model: 'gemini-pro-vision'
});

// Generate video description
const result = await model.generateContent({
    contents: [{
        role: 'user',
        parts: [{
            text: 'Create a professional educational avatar video script for Dr. Alvin West'
        }]
    }]
});
```

---

## ⚡ **OPTIMIZATION TIPS**

### **1. Lazy Loading**
```typescript
<TalkingAvatarVideo
    videoSrc={avatar.video}
    loading="lazy"
    preload="metadata"
/>
```

### **2. Adaptive Streaming**
Use multiple quality versions:
- `avatar_1080p.mp4` - High quality
- `avatar_720p.mp4` - Medium quality
- `avatar_480p.mp4` - Mobile quality

### **3. CDN Caching**
Vercel automatically caches videos on edge network for fast global delivery.

### **4. Thumbnail Optimization**
Use poster images for instant visual feedback while video loads.

---

## 🚀 **DEPLOYMENT CHECKLIST**

- [ ] Sign up for HeyGen
- [ ] Add `HEYGEN_API_KEY` to Vercel
- [ ] Generate greeting videos for all 7 avatars
- [ ] Upload videos to `/public/videos/avatars/` or Vercel Blob
- [ ] Update all components to use `TalkingAvatarVideo`
- [ ] Test video playback on mobile and desktop
- [ ] Optimize video file sizes (compress if needed)
- [ ] Add fallback to static images if video fails
- [ ] Deploy to Vercel
- [ ] Test on live site

---

## 💰 **COST ESTIMATION**

### **HeyGen Pricing** (as of 2026):
- **Free Tier**: 1 minute/month
- **Creator**: $24/month - 15 minutes
- **Business**: $72/month - 90 minutes
- **Enterprise**: Custom pricing

### **Recommendation**:
Start with **Creator plan** ($24/month):
- Generate 7 greeting videos (30 seconds each) = 3.5 minutes
- Leaves 11.5 minutes for custom videos
- Upgrade to Business if you need more

---

## 🎯 **EXPECTED RESULTS**

After implementation:
- ✅ **Real talking avatars** instead of static images
- ✅ **Lip-sync** matches speech perfectly
- ✅ **Professional appearance** with natural movements
- ✅ **Engaging user experience** with video interactions
- ✅ **Premium feel** that justifies pricing tiers
- ✅ **Competitive advantage** over other EdTech platforms

---

## 📞 **SUPPORT**

- **HeyGen Docs**: https://docs.heygen.com
- **Vercel Blob**: https://vercel.com/docs/storage/vercel-blob
- **Google Cloud Vertex AI**: https://cloud.google.com/vertex-ai/docs

---

**🎬 Ready to bring your avatars to life!**
