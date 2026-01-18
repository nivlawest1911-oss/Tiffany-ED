# 🧠 Sovereign Cloud Uplink
# Bridge between Vercel Frontend and Google Cloud Brain

const GOOGLE_CLOUD_URL = process.env.NEXT_PUBLIC_SOVEREIGN_BRAIN_URL || "http://localhost:8080";

interface DeepThinkResponse {
    task_id: string;
    status: 'processing' | 'completed' | 'failed';
    result?: string;
    progress?: number;
}

export const sovereignCloud = {
    /**
     * Health Check: Verifies if the Google Cloud Brain is online.
     */
    async checkConnection(): Promise<boolean> {
        try {
            const res = await fetch(`${GOOGLE_CLOUD_URL}/`);
            return res.ok;
        } catch (e) {
            console.warn("Sovereign Cloud Uplink Offline - Falling back to local neural engine.");
            return false;
        }
    },

    /**
     * Ignite Synapse: Sends a heavy payload to the cloud for processing.
     */
    async igniteSynapse(prompt: string, modelId: string = "sovereign-70b"): Promise<DeepThinkResponse> {
        try {
            const res = await fetch(`${GOOGLE_CLOUD_URL}/generate`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt, model_id: modelId })
            });

            if (!res.ok) throw new Error("Cloud Synapse Failed");
            return await res.json();
        } catch (e) {
            throw new Error("Sovereign Cloud unreachable");
        }
    },

    /**
     * Neural Poll: Checks the status of a long-running thought process.
     */
    async checkNeuralStatus(taskId: string): Promise<DeepThinkResponse> {
        const res = await fetch(`${GOOGLE_CLOUD_URL}/status/${taskId}`);
        return await res.json();
    }
};
