const CAPTIONS_API_URL = 'https://api.mirage.app/v1'; // Base URL for the new Mirage/Captions API
const CAPTIONS_API_KEY = process.env.CAPTIONS_API_KEY;

export async function getCaptionsProject(stableId: string) {
    if (!CAPTIONS_API_KEY) {
        throw new Error('CAPTIONS_API_KEY is not configured');
    }

    const response = await fetch(`${CAPTIONS_API_URL}/operations/${stableId}`, {
        method: 'GET',
        headers: {
            'x-api-key': CAPTIONS_API_KEY,
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to fetch Captions project');
    }

    const data = await response.json();
    return data;
}

export async function listCaptionsProjects() {
    if (!CAPTIONS_API_KEY) {
        throw new Error('CAPTIONS_API_KEY is not configured');
    }

    const response = await fetch(`${CAPTIONS_API_URL}/operations`, {
        method: 'GET',
        headers: {
            'x-api-key': CAPTIONS_API_KEY,
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Failed to list Captions projects');
    }

    const data = await response.json();
    return data.operations;
}
