# 🚀 EdIntel Sovereign - Multimodal Live Avatar Architecture

## Overview

EdIntel Sovereign implements a cutting-edge **Vercel + Google Cloud + GitHub** architecture for AI-powered educational intelligence. This system delivers sub-second latency avatar interactions with enterprise-grade security and privacy.

---

## 🏗️ Architecture Layers

### 1. **Presentation Layer (Vercel)**
- **Framework**: Next.js 14 with App Router
- **Edge Functions**: Vercel AI SDK for streaming UI
- **CDN**: Global edge network for <100ms response times
- **WebRTC**: Real-time avatar video streaming

### 2. **Cognitive Layer (Google Cloud)**
- **Vertex AI (Gemini 1.5 Pro)**: Avatar's brain for educational intelligence
- **Cloud Run**: Containerized WebSocket server for persistent connections
- **Cloud SQL (Postgres + pgvector)**: Semantic memory and evidence folders
- **Cloud Storage**: Secure document storage with signed URLs

### 3. **Pipeline Layer (GitHub)**
- **GitHub Actions**: Automated CI/CD for dual deployment
- **Container Registry**: Docker images for Cloud Run
- **Secrets Management**: Secure credential handling

---

## 🎯 Key Features

| Feature | Technology | Implementation |
|---------|-----------|----------------|
| **Real-Time Lip Sync** | LiveAvatar (GPU-enabled Cloud Run) | Drives avatar from Gemini voice output |
| **Generative UI** | Vercel AI SDK | Creates visual strategy maps and budget tables live |
| **Voice Cloning** | ElevenLabs API | Professional voice narration for Dr. West |
| **Semantic Memory** | pgvector (Cloud SQL) | Remembers previous observations for legal defense |
| **Sub-Second Latency** | WebSocket + Edge CDN | <500ms response time (Tavus-grade) |
| **Privacy-First** | Google Cloud VPC | Full control over sensitive student records |

---

## 📊 Database Schema (Cloud SQL)

### Core Tables

#### `users`
- Authentication and subscription management
- District/school affiliation
- Token balance and XP tracking

#### `avatar_sessions`
- WebSocket session tracking
- Performance metrics (latency, sentiment)
- Conversation logs
- GCP integration metadata

#### `evidence_folders`
- Student observation collections
- AI-generated insights and risk scoring
- Vector embeddings for semantic search
- Compliance tracking

#### `observations`
- Detailed teacher documentation
- Multi-modal attachments (audio/video/images)
- AI analysis and suggested actions
- Legal compliance flags

#### `documents`
- Secure file storage in GCP buckets
- Encrypted with signed URL access
- AI text extraction and summarization
- Vector embeddings for search

---

## 🔄 Data Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    USER (Teacher/Admin)                      │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│              VERCEL (Presentation Layer)                     │
│  • Next.js App Router                                        │
│  • WebRTC Video Stream                                       │
│  • Vercel AI SDK (Generative UI)                            │
└────────────────────────┬────────────────────────────────────┘
                         │ WebSocket
                         ▼
┌─────────────────────────────────────────────────────────────┐
│          GOOGLE CLOUD RUN (Cognitive Layer)                  │
│  • WebSocket Server                                          │
│  • Vertex AI (Gemini 1.5 Pro)                               │
│  • Session Management                                        │
└────────────────────────┬────────────────────────────────────┘
                         │
        ┌────────────────┼────────────────┐
        ▼                ▼                ▼
┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│  Cloud SQL   │ │Cloud Storage │ │  Vertex AI   │
│  (Postgres)  │ │  (Evidence)  │ │  Embeddings  │
│  + pgvector  │ │              │ │              │
└──────────────┘ └──────────────┘ └──────────────┘
```

---

## 🚀 Deployment

### Prerequisites

1. **Google Cloud Project**
   ```bash
   gcloud projects create edintel-sovereign
   gcloud config set project edintel-sovereign
   ```

2. **Enable Required APIs**
   ```bash
   gcloud services enable \
     run.googleapis.com \
     sqladmin.googleapis.com \
     storage.googleapis.com \
     aiplatform.googleapis.com \
     containerregistry.googleapis.com
   ```

3. **Create Cloud SQL Instance**
   ```bash
   gcloud sql instances create edintel-db \
     --database-version=POSTGRES_15 \
     --tier=db-custom-2-7680 \
     --region=us-central1
   ```

4. **Install pgvector Extension**
   ```sql
   CREATE EXTENSION IF NOT EXISTS vector;
   ```

### GitHub Secrets Configuration

Add these secrets to your GitHub repository:

```
GCP_PROJECT_ID=edintel-sovereign
GCP_SA_KEY=<service-account-json>
DATABASE_URL=postgresql://user:pass@host/db
GOOGLE_GENERATIVE_AI_API_KEY=<vertex-ai-key>
VERCEL_TOKEN=<vercel-deploy-token>
VERCEL_ORG_ID=<your-org-id>
VERCEL_PROJECT_ID=<your-project-id>
```

### Automated Deployment

Push to `main` branch triggers:
1. ✅ Build and test
2. 🚀 Deploy to Vercel (presentation layer)
3. ☁️ Deploy to Cloud Run (cognitive layer)
4. 🗄️ Run database migrations
5. 🔒 Security scanning

---

## 💰 Cost Optimization

### Why This Surpasses SaaS Tools

| Aspect | EdIntel Sovereign | Enterprise SaaS (HeyGen, D-ID) |
|--------|-------------------|--------------------------------|
| **Cost Model** | Pay-per-compute (GCP) | $79-299/month subscription |
| **Data Privacy** | Private GCP VPC | Third-party servers |
| **Customization** | Full control | Limited to platform features |
| **Scalability** | Auto-scaling Cloud Run | Fixed tier limits |
| **Vendor Lock-in** | None | High |

### Estimated Monthly Costs (1000 users)

- **Vercel Pro**: $20/month
- **Cloud Run**: ~$50/month (auto-scaling)
- **Cloud SQL**: ~$100/month (db-custom-2-7680)
- **Vertex AI**: ~$200/month (usage-based)
- **Cloud Storage**: ~$10/month
- **Total**: ~$380/month vs. $79,000/month for enterprise SaaS

---

## 🔐 Security & Compliance

### Data Protection
- ✅ **FERPA Compliant**: Student data never leaves GCP VPC
- ✅ **Encryption**: At-rest (Cloud SQL) and in-transit (TLS 1.3)
- ✅ **Access Control**: IAM roles and signed URLs
- ✅ **Audit Logs**: Cloud Logging for all operations

### Privacy Features
- **Local Rendering**: DUIX.Avatar option for 100% offline processing
- **Sovereign Shield**: No third-party data sharing
- **Evidence Folder**: Legally defensible observation logs

---

## 📈 Performance Metrics

### Target Latencies
- **Avatar Response**: <500ms (Tavus-grade)
- **Memory Retrieval**: <100ms (pgvector)
- **Document Upload**: <2s (Cloud Storage)
- **UI Rendering**: <50ms (Vercel Edge)

### Monitoring
```bash
# View Cloud Run logs
gcloud run services logs read edintel-avatar-engine --limit=50

# Monitor database performance
gcloud sql operations list --instance=edintel-db

# Check Vercel deployment status
vercel inspect <deployment-url>
```

---

## 🛠️ Development

### Local Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Setup Environment Variables**
   ```bash
   cp .env.example .env.local
   # Add your GCP credentials
   ```

3. **Run Database Migrations**
   ```bash
   npx prisma migrate dev
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```

5. **Test Cloud Run Locally**
   ```bash
   cd cloud/avatar-engine
   node server.js
   ```

### Testing

```bash
# Run unit tests
npm test

# Run E2E tests
npm run test:e2e

# Test WebSocket connection
wscat -c ws://localhost:8080
```

---

## 📚 API Reference

### WebSocket Messages

#### Client → Server

**INIT_SESSION**
```json
{
  "type": "INIT_SESSION",
  "data": {
    "userId": "user_123",
    "avatarName": "Dr. Alvin",
    "avatarRole": "Superintendent Delegate",
    "engine": "tavus"
  }
}
```

**USER_SPEECH**
```json
{
  "type": "USER_SPEECH",
  "data": {
    "text": "How do I create a compliant IEP?"
  }
}
```

#### Server → Client

**RESPONSE_CHUNK**
```json
{
  "type": "RESPONSE_CHUNK",
  "data": {
    "text": "To create a compliant IEP..."
  }
}
```

**RESPONSE_COMPLETE**
```json
{
  "type": "RESPONSE_COMPLETE",
  "data": {
    "latency": 450,
    "sentiment": "neutral",
    "fullResponse": "..."
  }
}
```

---

## 🎓 Mobile County Schools Integration

### District-Specific Features
- **ALCOS Standards**: Alabama Course of Study alignment
- **IDEA Part B**: Special education compliance
- **Local Legislation**: Mobile County policy integration
- **Evidence Folders**: Legal defense documentation

### Deployment for Mobile County
```bash
# Set district-specific environment
export DISTRICT_ID="mobile-county"
export COMPLIANCE_FRAMEWORK="alabama-alcos"

# Deploy with district branding
vercel deploy --prod --env DISTRICT_ID=mobile-county
```

---

## 🤝 Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for development guidelines.

---

## 📄 License

Proprietary - EdIntel Sovereign © 2026

---

## 🆘 Support

- **Documentation**: https://docs.edintel.app
- **Email**: support@edintel.app
- **Discord**: https://discord.gg/edintel

---

**Built with ❤️ for educators by educators**
