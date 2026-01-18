# 🦅 HOW TO DEPLOY: "THE BRAIN" TO GOOGLE CLOUD
**Objective:** Deploy your Python AI Backend (`google-cloud-brain`) to Google Cloud Run.

## Prerequisites
1.  **Google Cloud Account** (You mentioned you use it).
2.  **gcloud CLI** installed (or simply use the Cloud Console in the browser).

## 🚀 Option 1: The "Click-Ops" Method (Easiest)
1.  Go to the [Google Cloud Console](https://console.cloud.google.com).
2.  Search for **"Cloud Run"**.
3.  Click **"Create Service"**.
4.  **Source:** Choose "Continuously deploy new revisions from a source repository".
5.  **Connect Repo:** Select your GitHub Repo (`Tiffany-ED`).
6.  **Directory:** Set this to `/google-cloud-brain` (Very Important! Tell it where the Dockerfile is).
7.  **Authentication:** Allow unauthenticated invocations (or set up secure tokens if you prefer).
8.  **Create:** Google will build your Docker container and deploy it.

## 💻 Option 2: The Command Line (Professional)
Run these commands in your terminal:

```bash
# 1. Login
gcloud auth login

# 2. Set Project
gcloud config set project YOUR_PROJECT_ID

# 3. Deploy
cd google-cloud-brain
gcloud run deploy sovereign-brain --source . --allow-unauthenticated
```

## 🔗 The Uplink
Once deployed, Google will give you a URL (e.g., `https://sovereign-brain-xyz.a.run.app`).

1.  Copy that URL.
2.  Go to your **Vercel Project Settings**.
3.  Add an Environment Variable:
    - **Key:** `NEXT_PUBLIC_SOVEREIGN_BRAIN_URL`
    - **Value:** `https://sovereign-brain-xyz.a.run.app`

## 🧠 Result
Your Vercel frontend will now automatically detect the Brain is online and start routing heavy AI tasks to Google Cloud!
