# HeyGen, Captions.ai & InVideo AI Integration Guide

## 🎬 Complete Video AI Integration for EdIntel

This document provides comprehensive guidance on integrating and using HeyGen, Captions.ai, and InVideo AI in the EdIntel application.

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Setup & Configuration](#setup--configuration)
3. [HeyGen Integration](#heygen-integration)
4. [Captions.ai Integration](#captionsai-integration)
5. [InVideo AI Integration](#invideo-ai-integration)
6. [Usage Examples](#usage-examples)
7. [API Reference](#api-reference)
8. [Best Practices](#best-practices)

---

## Overview

### Platform Capabilities

| Platform | Primary Use | Key Features |
|----------|-------------|--------------|
| **HeyGen** | AI Avatars | Streaming avatars, video generation, photo avatars, translation |
| **Captions.ai** | Video Editing | Auto-captions, AI editing, smart trimming, effects |
| **InVideo AI** | Video Creation | Text-to-video, templates, stock footage, voiceovers |

### Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    EdIntel Frontend                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │   HeyGen     │  │  Captions.ai │  │  InVideo AI  │  │
│  │  Components  │  │  Components  │  │  Components  │  │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘  │
│         │                  │                  │          │
└─────────┼──────────────────┼──────────────────┼──────────┘
          │                  │                  │
          ▼                  ▼                  ▼
┌─────────────────────────────────────────────────────────┐
│                    API Routes Layer                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │ /api/heygen  │  │ /api/captions│  │ /api/invideo │  │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘  │
└─────────┼──────────────────┼──────────────────┼──────────┘
          │                  │                  │
          ▼                  ▼                  ▼
┌─────────────────────────────────────────────────────────┐
│                   Client Libraries                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │ HeyGenClient │  │CaptionsClient│  │InVideoClient │  │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘  │
└─────────┼──────────────────┼──────────────────┼──────────┘
          │                  │                  │
          ▼                  ▼                  ▼
     External APIs      External APIs      External APIs
```

---

## Setup & Configuration

### 1. Environment Variables

Add the following to your `.env.local` file:

```bash
# HeyGen Configuration
HEYGEN_API_KEY=your_heygen_api_key_here

# Captions.ai Configuration
CAPTIONS_API_KEY=your_captions_api_key_here

# InVideo AI Configuration
INVIDEO_API_KEY=your_invideo_api_key_here

# Optional: Custom API endpoints
HEYGEN_API_URL=https://api.heygen.com
CAPTIONS_API_URL=https://api.captions.ai
INVIDEO_API_URL=https://api.invideo.io
```

### 2. Get API Keys

#### HeyGen
1. Visit [HeyGen](https://www.heygen.com)
2. Sign up for an account
3. Navigate to Settings → API
4. Generate a new API key
5. Copy and paste into `.env.local`

#### Captions.ai
1. Visit [Captions.ai](https://www.captions.ai)
2. Create an account
3. Go to Developer Settings
4. Generate API credentials
5. Add to `.env.local`

#### InVideo AI
1. Visit [InVideo AI](https://ai.invideo.io)
2. Sign up for an account
3. Access API settings
4. Generate API key
5. Configure in `.env.local`

### 3. Install Dependencies

All required dependencies are already installed:

```json
{
  "@heygen/streaming-avatar": "^2.1.0",
  "framer-motion": "^12.29.0",
  "lucide-react": "^0.454.0"
}
```

---

## HeyGen Integration

### Features Implemented

#### 1. Streaming Avatar (Real-time)
- **Component**: `HeyGenStreamingAvatar`
- **Location**: `/src/components/heygen/StreamingAvatar.tsx`
- **Use Case**: Interactive avatar communication

```tsx
import { HeyGenStreamingAvatar } from '@/components/heygen/StreamingAvatar';

<HeyGenStreamingAvatar
  avatarId="professional_female"
  voiceId="en-US-JennyNeural"
  quality="high"
  autoStart={false}
  onReady={() => console.log('Avatar ready')}
  onError={(error) => console.error(error)}
/>
```

#### 2. Video Generator
- **Component**: `HeyGenVideoGenerator`
- **Location**: `/src/components/heygen/VideoGenerator.tsx`
- **Use Case**: Create avatar videos from scripts

```tsx
import { HeyGenVideoGenerator } from '@/components/heygen/VideoGenerator';

<HeyGenVideoGenerator className="w-full" />
```

### API Endpoints

#### Generate Video
```typescript
POST /api/heygen/generate-video
{
  "script": "Welcome to EdIntel...",
  "avatarId": "professional_female",
  "voiceId": "en-US-JennyNeural",
  "title": "Educational Content",
  "aspectRatio": "16:9"
}
```

#### Get Video Status
```typescript
GET /api/heygen/generate-video?videoId=abc123
```

#### Create Streaming Token
```typescript
POST /api/heygen/streaming-token
```

### Client Library Usage

```typescript
import { getHeyGenClient, generateTalkingAvatar } from '@/lib/heygen/client';

// Method 1: Using client directly
const client = getHeyGenClient();
const avatars = await client.listAvatars();
const voices = await client.listVoices();

// Method 2: Using utility function
const videoUrl = await generateTalkingAvatar(
  'professional_female',
  'en-US-JennyNeural',
  'Your script here',
  { aspectRatio: '16:9' }
);
```

---

## Captions.ai Integration

### Features Implemented

#### 1. Video Editor
- **Component**: `CaptionsEditor`
- **Location**: `/src/components/captions/VideoEditor.tsx`
- **Use Case**: AI-powered video editing and captioning

```tsx
import { CaptionsEditor } from '@/components/captions/VideoEditor';

<CaptionsEditor className="w-full" />
```

### API Endpoints

#### Generate Captions
```typescript
POST /api/captions/generate
{
  "videoUrl": "https://example.com/video.mp4",
  "language": "en",
  "style": {
    "font_family": "Inter",
    "font_size": 48,
    "position": "bottom",
    "animation": "fade"
  },
  "autoHighlight": true
}
```

#### AI Edit Video
```typescript
POST /api/captions/ai-edit
{
  "videoUrl": "https://example.com/video.mp4",
  "prompt": "Add captions, remove silence, enhance audio",
  "style": "professional",
  "includeCaptions": true,
  "includeMusic": false
}
```

### Client Library Usage

```typescript
import { getCaptionsClient, quickCaption, enhanceVideo } from '@/lib/captions/client';

// Method 1: Quick caption generation
const captionedVideoUrl = await quickCaption(
  'https://example.com/video.mp4',
  {
    font_family: 'Inter',
    position: 'bottom',
    animation: 'fade'
  }
);

// Method 2: AI enhancement
const enhancedVideoUrl = await enhanceVideo(
  'https://example.com/video.mp4',
  'Make it professional with smooth transitions',
  {
    addCaptions: true,
    addMusic: true,
    style: 'professional'
  }
);

// Method 3: Using client directly
const client = getCaptionsClient();
const transcription = await client.transcribeVideo(videoUrl);
const project = await client.generateCaptions(videoUrl);
```

---

## InVideo AI Integration

### Features Implemented

#### 1. Video Creator
- **Component**: `InVideoCreator`
- **Location**: `/src/components/invideo/VideoCreator.tsx`
- **Use Case**: Generate complete videos from text prompts

```tsx
import { InVideoCreator } from '@/components/invideo/VideoCreator';

<InVideoCreator className="w-full" />
```

### API Endpoints

#### Create Video from Prompt
```typescript
POST /api/invideo/create
{
  "prompt": "Create an educational video about photosynthesis",
  "style": "educational",
  "aspectRatio": "16:9",
  "duration": 60,
  "includeMusic": true
}
```

#### Get Project Status
```typescript
GET /api/invideo/create?projectId=abc123
```

### Client Library Usage

```typescript
import { getInVideoClient, quickCreateVideo } from '@/lib/invideo/client';

// Method 1: Quick video creation
const videoUrl = await quickCreateVideo(
  'Create an educational video about the solar system for 5th graders',
  {
    style: 'educational',
    aspectRatio: '16:9',
    duration: 90
  }
);

// Method 2: Using client directly
const client = getInVideoClient();
const project = await client.createFromPrompt({
  prompt: 'Your video description',
  style: 'professional',
  aspect_ratio: '16:9'
});

const completed = await client.waitForVideo(project.id, {
  onProgress: (progress) => console.log(`${progress}%`)
});
```

---

## Usage Examples

### Example 1: Create Educational Content

```typescript
// 1. Generate script with AI
const script = await generateScript('Explain photosynthesis');

// 2. Create avatar video
const avatarVideo = await generateTalkingAvatar(
  'professional_female',
  'en-US-JennyNeural',
  script
);

// 3. Add captions
const captionedVideo = await quickCaption(avatarVideo);

// Result: Professional educational video with avatar and captions
```

### Example 2: Complete Video Production

```typescript
// 1. Create base video with InVideo AI
const baseVideo = await quickCreateVideo(
  'Create a video about water conservation for students'
);

// 2. Enhance with Captions.ai
const enhancedVideo = await enhanceVideo(
  baseVideo,
  'Add professional captions and smooth transitions'
);

// Result: Polished educational video
```

### Example 3: Interactive Avatar Session

```tsx
function InteractiveLearning() {
  return (
    <HeyGenStreamingAvatar
      avatarId="teacher_avatar"
      voiceId="en-US-JennyNeural"
      quality="high"
      autoStart={true}
      onReady={() => {
        console.log('Avatar ready for interaction');
      }}
    />
  );
}
```

---

## API Reference

### HeyGen Client Methods

```typescript
class HeyGenClient {
  listAvatars(): Promise<{ avatars: HeyGenAvatar[] }>
  listVoices(): Promise<{ voices: HeyGenVoice[] }>
  generateVideo(request: VideoGenerationRequest): Promise<VideoGenerationResponse>
  getVideoStatus(videoId: string): Promise<VideoGenerationResponse>
  waitForVideo(videoId: string, options): Promise<VideoGenerationResponse>
  createStreamingToken(config): Promise<{ token: string }>
  translateVideo(videoUrl: string, targetLanguage: string): Promise<any>
}
```

### Captions Client Methods

```typescript
class CaptionsClient {
  generateCaptions(videoUrl: string, options): Promise<any>
  transcribeVideo(videoUrl: string, language: string): Promise<TranscriptionResult>
  aiEdit(request: AIEditRequest): Promise<any>
  smartTrim(videoUrl: string, options): Promise<any>
  exportVideo(projectId: string, options): Promise<any>
}
```

### InVideo Client Methods

```typescript
class InVideoClient {
  createFromPrompt(request: VideoCreationRequest): Promise<VideoProject>
  createFromScript(request: ScriptToVideoRequest): Promise<VideoProject>
  getProject(projectId: string): Promise<VideoProject>
  editVideo(request: EditRequest): Promise<VideoProject>
  waitForVideo(projectId: string, options): Promise<VideoProject>
  listVoices(language?: string): Promise<any>
}
```

---

## Best Practices

### 1. Error Handling

```typescript
try {
  const video = await generateTalkingAvatar(avatarId, voiceId, script);
} catch (error) {
  if (error.message.includes('quota')) {
    // Handle quota exceeded
  } else if (error.message.includes('timeout')) {
    // Handle timeout
  } else {
    // Handle other errors
  }
}
```

### 2. Progress Tracking

```typescript
const video = await client.waitForVideo(videoId, {
  onProgress: (status) => {
    updateUI(`Processing: ${status.status}`);
  },
  maxAttempts: 120,
  intervalMs: 5000
});
```

### 3. Resource Management

```typescript
// Always clean up streaming sessions
useEffect(() => {
  return () => {
    if (avatarSession) {
      avatarSession.stopAvatar();
    }
  };
}, []);
```

### 4. Caching

```typescript
// Cache frequently used data
const avatarCache = new Map();

async function getAvatar(id: string) {
  if (avatarCache.has(id)) {
    return avatarCache.get(id);
  }
  const avatar = await client.getAvatar(id);
  avatarCache.set(id, avatar);
  return avatar;
}
```

---

## Video Studio Page

Access all features in one place:

```
/video-studio
```

Features:
- **Live Avatar**: Interactive streaming avatars
- **Avatar Video**: Generate avatar videos from scripts
- **Video Editor**: AI-powered editing and captioning
- **AI Creator**: Generate complete videos from prompts

---

## Support & Resources

- **HeyGen Docs**: https://docs.heygen.com
- **Captions.ai**: https://www.captions.ai
- **InVideo AI**: https://ai.invideo.io
- **EdIntel Support**: Contact your administrator

---

## Changelog

### v1.0.0 (2026-01-22)
- ✅ HeyGen streaming avatar integration
- ✅ HeyGen video generation
- ✅ Captions.ai video editing
- ✅ Captions.ai auto-captioning
- ✅ InVideo AI video creation
- ✅ Unified Video Studio interface
- ✅ Complete API layer
- ✅ Client libraries for all platforms
- ✅ Comprehensive documentation

---

**Ready to create amazing educational content! 🎬✨**
