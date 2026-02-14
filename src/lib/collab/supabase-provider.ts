import * as Y from 'yjs';
import { RealtimeChannel, SupabaseClient } from '@supabase/supabase-js';

export class SupabaseYjsProvider {
    private doc: Y.Doc;
    private channel: RealtimeChannel;
    private supabase: SupabaseClient;
    private channelName: string;

    constructor(doc: Y.Doc, supabase: SupabaseClient, channelName: string) {
        this.doc = doc;
        this.supabase = supabase;
        this.channelName = `collab:${channelName}`;

        this.channel = this.supabase.channel(this.channelName, {
            config: {
                broadcast: { self: false },
                presence: { key: 'user' },
            },
        });

        this.setupHandlers();
        this.connect();
    }

    private setupHandlers() {
        // Handle local document updates
        this.doc.on('update', (update: Uint8Array, origin: any) => {
            if (origin !== this) {
                // Broadcast the update to other clients
                this.channel.send({
                    type: 'broadcast',
                    event: 'update',
                    payload: { update: Buffer.from(update).toString('base64') },
                });
            }
        });

        // Handle incoming broadcast updates
        this.channel.on('broadcast', { event: 'update' }, ({ payload }) => {
            const update = Buffer.from(payload.update, 'base64');
            Y.applyUpdate(this.doc, update, this);
        });

        // Handle presence (optional: for live cursors/users)
        this.channel.on('presence', { event: 'sync' }, () => {
            const newState = this.channel.presenceState();
            console.log('[Collab] Presence Sync:', newState);
        });
    }

    private connect() {
        this.channel.subscribe((status) => {
            console.log(`[Collab] Channel Status: ${status}`);
            if (status === 'SUBSCRIBED') {
                // Initial sync could happen here if we had persistence
            }
        });
    }

    public disconnect() {
        this.channel.unsubscribe();
    }
}
