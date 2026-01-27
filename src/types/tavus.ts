export interface TavusConversation {
    conversation_id: string;
    conversation_url: string; // The URL to embed the Daily.co or WebRTC room
    status: 'active' | 'ended' | 'error';
    callback_url?: string;
    expires_at?: string;
}

export interface TavusReplica {
    replica_id: string;
    replica_name: string;
    training_status: 'ready' | 'training';
}
