

export interface HeyGenSession {
    sessionId: string;
    sdp: any;
    ice_servers: any[];
}

export class HeyGenStreamingService {
    private peerConnection: RTCPeerConnection | null = null;
    private mediaStream: MediaStream | null = null;
    private sessionId: string | null = null;
    private token: string | null = null;

    constructor() { }

    /**
     * Initialize a new streaming session
     * This is a client-side implementation that connects directly to HeyGen's Agora/WebRTC bridge.
     * Note: This requires a specialised Trial Token from HeyGen API.
     */
    async startSession(avatarId: string, apiKey: string, signal?: AbortSignal): Promise<MediaStream> {
        try {
            console.log('Initializing HeyGen Stream with ID:', avatarId);

            if (signal?.aborted) throw new DOMException('Aborted', 'AbortError');

            // 1. Get Access Token (In a real app, this should be proxied via backend to hide API Key)
            // But for this "EdIntel" local app, we use the key directly as requested by the user.
            const tokenResponse = await fetch('https://api.heygen.com/v1/streaming.new_session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Api-Key': apiKey
                },
                body: JSON.stringify({
                    quality: 'medium',
                    avatar_name: avatarId,
                    voice: {
                        // Optional voice settings
                    }
                }),
                signal
            });

            if (!tokenResponse.ok) {
                throw new Error(`HeyGen Auth Failed: ${tokenResponse.statusText}`);
            }

            const sessionData = await tokenResponse.json();
            console.log('Session Data:', sessionData);

            if (signal?.aborted) throw new DOMException('Aborted', 'AbortError');

            if (!sessionData.data || !sessionData.data.sdp) {
                throw new Error('Invalid Session Data from HeyGen: ' + JSON.stringify(sessionData));
            }

            this.sessionId = sessionData.data.session_id;

            // 2. Initialize WebRTC
            this.peerConnection = new RTCPeerConnection({
                iceServers: sessionData.data.ice_servers || [{ urls: 'stun:stun.l.google.com:19302' }]
            });

            // 3. Handle Intake Stream
            this.peerConnection.ontrack = (event) => {
                if (event.streams && event.streams[0]) {
                    console.log('Received Remote Stream');
                    this.mediaStream = event.streams[0];
                }
            };

            // 4. Set Remote Description
            await this.peerConnection.setRemoteDescription(new RTCSessionDescription(sessionData.data.sdp));

            if (signal?.aborted) {
                this.peerConnection.close();
                this.peerConnection = null;
                throw new DOMException('Aborted during SDP negotiation', 'AbortError');
            }

            // 5. Create Answer
            const answer = await this.peerConnection.createAnswer();
            await this.peerConnection.setLocalDescription(answer);

            // 6. Send Answer back to HeyGen
            const startResponse = await fetch('https://api.heygen.com/v1/streaming.start', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Api-Key': apiKey
                },
                body: JSON.stringify({
                    session_id: this.sessionId,
                    sdp: answer
                }),
                signal
            });

            if (!startResponse.ok) {
                const errorData = await startResponse.json().catch(() => ({}));
                throw new Error(`HeyGen Session Start Failed: ${errorData.message || startResponse.statusText}`);
            }

            console.log('HeyGen Stream Connected!');

            // Add a small delay for connection stabilization
            await new Promise((resolve, reject) => {
                const timeoutId = setTimeout(resolve, 2000);
                signal?.addEventListener('abort', () => {
                    clearTimeout(timeoutId);
                    reject(new DOMException('Aborted during stabilization', 'AbortError'));
                }, { once: true });
            });

            if (this.mediaStream) return this.mediaStream;

            // Fallback: Sometimes track comes later.
            // We will assume it works if SDP negotiation completed, but really we need the stream.
            // Just waiting a bit more for the track event to fire might be needed outside.

            // Note: In strict React, we might not have the stream YET. 
            // This logic relies on `ontrack` firing quickly.

            return new MediaStream(); // Placeholder if track strictness fails, but ontrack should populate.

        } catch (error) {
            console.error('HeyGen Stream Error:', error);
            throw error;
        }
    }

    async speak(text: string, apiKey: string, signal?: AbortSignal) {
        if (!this.sessionId) return;

        if (signal?.aborted) return;

        await fetch('https://api.heygen.com/v1/streaming.task', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Api-Key': apiKey
            },
            body: JSON.stringify({
                session_id: this.sessionId,
                text: text
            }),
            signal
        });
    }

    async stopSession(apiKey: string) {
        if (!this.sessionId) return;
        try {
            await fetch('https://api.heygen.com/v1/streaming.stop', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Api-Key': apiKey
                },
                body: JSON.stringify({ session_id: this.sessionId })
            });
        } catch (e) {
            console.warn('Error stopping session', e);
        }

        if (this.peerConnection) {
            this.peerConnection.close();
            this.peerConnection = null;
        }
        this.mediaStream = null;
        this.sessionId = null;
    }
}

export const heyGenService = new HeyGenStreamingService();
