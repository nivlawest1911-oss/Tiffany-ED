declare module '@heygen/streaming-avatar' {
    export enum AvatarQuality {
        Low = "low",
        Medium = "medium",
        High = "high"
    }
    export enum StreamingEvents {
        AVATAR_START_TALKING = "avatar_start_talking",
        AVATAR_STOP_TALKING = "avatar_stop_talking",
        STREAM_READY = "stream_ready",
        STREAM_DISCONNECTED = "stream_disconnected",
        USER_START = "user_start",
        USER_STOP = "user_stop"
    }
    export enum TaskType {
        REPEAT = "repeat"
    }
    export enum VoiceEmotion {
        FRIENDLY = "friendly"
    }
    export default class StreamingAvatar {
        constructor(config: { token: string });
        on(event: string, callback: (...args: any[]) => void): void;
        createStartAvatar(config: any): Promise<any>;
        stopAvatar(): Promise<any>;
        speak(config: any): Promise<any>;
        interrupt(): Promise<any>;
    }
}
