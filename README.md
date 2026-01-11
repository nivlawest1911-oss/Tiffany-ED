# EdIntel Sovereign
**Cognitive Leadership Platform**

![Vercel Deploy](https://therealsj.github.io/vercel-badge/vercel-deploy-button.svg)

A Vercel-native, sovereign education intelligence platform connecting directly to Google Cloud's Generative AI.

## 🏗️ Architecture
- **Host**: Vercel (Next.js App Router)
- **Intelligence**: Google Cloud Vertex AI / Gemini (`generativelanguage.googleapis.com`)
- **Database**: Sovereign Mode (Simulated / Local State)
- **Analytics**: Vercel Analytics & Speed Insights

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Vercel CLI (`npm i -g vercel`)
- Google Cloud API Key (`GOOGLE_GENAI_API_KEY`)

### Installation

1.  **Clone & Install**:
    ```bash
    git clone https://github.com/nivlawest1911-oss/Tiffany-ED.git
    cd edintel-app
    npm install
    ```

2.  **Dev Environment**:
    ```bash
    npm run dev
    ```

3.  **Deploy**:
    ```bash
    npx vercel --prod
    ```

## 🔐 Environment Variables
Set these in your Vercel Project Settings:
- `GOOGLE_GENAI_API_KEY`: Required for AI generation.
- `STRIPE_SECRET_KEY`: Optional for payment links.

## 🛡️ License
Proprietary / Sovereign.
