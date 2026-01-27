'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { tavusService } from '@/services/tavus-service';
import { useAuth } from '@/context/AuthContext';
// import { useToast } from '@/components/ui/use-toast';

interface TavusContextType {
    isSessionActive: boolean;
    isConnecting: boolean;
    startAdvisorySession: () => Promise<void>;
    endAdvisorySession: () => void;
    conversationUrl: string | null;
    pushContextUpdate: (event: string, data: any) => void;
}

const TavusContext = createContext<TavusContextType | undefined>(undefined);

export function TavusProvider({ children }: { children: React.ReactNode }) {
    const { user } = useAuth();
    // const { toast } = useToast();

    const [isSessionActive, setIsSessionActive] = useState(false);
    const [isConnecting, setIsConnecting] = useState(false);
    const [conversationUrl, setConversationUrl] = useState<string | null>(null);
    const [conversationId, setConversationId] = useState<string | null>(null);

    // Hardcoded Replica ID for Dr. Alvin West (Phoenix-3 Model)
    // In production, fetch this from Sovereign Vault
    const REPLICA_ID = process.env.NEXT_PUBLIC_TAVUS_REPLICA_ID || 'r79e1c033f';

    const pushContextUpdate = useCallback(async (event: string, data: any) => {
        if (!conversationId || !isSessionActive) return;
        console.log(`[Tavus Bridge] Pushing Event: ${event}`, data);
        try {
            await tavusService.updateContext(conversationId, JSON.stringify({ event, data }));
        } catch (e) {
            console.error("Failed to push context context", e);
        }
    }, [conversationId, isSessionActive]);

    const startAdvisorySession = useCallback(async () => {
        if (isSessionActive) return;

        setIsConnecting(true);
        console.log("Establishing Secure Uplink: Connecting to Phoenix-3 High-Fidelity Advisor...");
        /* toast({
            title: "Establishing Secure Uplink",
            description: "Connecting to Phoenix-3 High-Fidelity Advisor...",
        }); */

        try {
            // Load Persona from Sovereign Vibe Source of Truth
            // In a real app, this would be read from the file or database.
            // We are hardcoding the detailed prompt here to ensure fidelity.
            // RAG INTELLIGENCE LAYER: Inject Real-time Context
            // In a production app, we would fetch this from Vector DB or SQL
            const recentLogs = "User Alert: Compliance Audit Overdue (Prichard). User Alert: 14 New Signups (District 4).";

            const systemPrompt = `
IDENTITY: DR. ALVIN WEST, JR.
- Credentials: DBA (Analytic Finance), MBA (Corporate Finance).
- Role: EdIntel Lead Analytics Advisor.
- Voice: Authoritative yet accessible. A "Sovereign Advisor" bridging data and holistic wellness.

MISSION:
- Serve Mobile County, Alabama (Whistler, Prichard).
- Provide "Administrative Intelligence" to automate burdens.
- Focus: School metrics, $79 conversions, usage tokens.

PHILOSOPHY:
- Holistic Integration: Data reflects academic, financial, and mental wellness.
- Balance: Always balance metrics with social-emotional health.

DIRECTIVES:
1. Speak in Solutions: Never present a problem without a data-backed path.
2. Acknowledge Locality: Mention "Elite 3", Prichard, Mobile context.
3. Use Brand Terms: "Sovereign", "Transcend", "Legacy Achievement".

CONTEXTUAL REASONING (CRITICAL):
4. Memory Buffer: Do NOT repeat the phrase "In Mobile County" or "As an advisor" if it was established in the last 3 turns. Assume context is known.
5. Adaptive Conciseness: If the user asks for a number, give the number first, then context. 
6. Multimodal Sync: If you are showing a chart, refer to it as "this data" rather than describing it fully.

RAG KNOWLEDGE (ACTIVE MEMORY):
- CURRENT ALERTS: ${recentLogs}
- CURRENT USER: ${(user as any)?.user_metadata?.first_name || 'Administrator'}
- ROLE: ${(user as any)?.email?.includes('west') ? 'DIRECTOR (Full Access)' : 'EDUCATOR (Standard)'}

PROACTIVE AGENT PROTOCOL:
At the end of every helpful response, offer a discreet, one-click action.
Example: "I can draft that email for you now, shall I?" or "Would you like to see the breakdown?"
`;

            const session = await tavusService.createConversation(
                REPLICA_ID,
                { userId: user?.id, district: 'Mobile County' },
                systemPrompt
            );

            if (session.conversation_url) {
                setConversationUrl(session.conversation_url);
                setConversationId(session.conversation_id);
                setIsSessionActive(true);
            }
        } catch (error: any) {
            console.error("Connection Failed", error);
            /* toast({
                variant: "destructive",
                title: "Connection Failed",
                description: error.message || "Could not link to Tavus Network."
            }); */
        } finally {
            setIsConnecting(false);
        }
    }, [user, isSessionActive]); // Removed toast from dependencies

    const endAdvisorySession = useCallback(async () => {
        if (conversationId) {
            await tavusService.endConversation(conversationId);
        }
        setConversationUrl(null);
        setConversationId(null);
        setIsSessionActive(false);
    }, [conversationId]);

    return (
        <TavusContext.Provider value={{
            isSessionActive,
            isConnecting,
            startAdvisorySession,
            endAdvisorySession,
            conversationUrl,
            pushContextUpdate
        }}>
            {children}
        </TavusContext.Provider>
    );
}

export function useTavus() {
    const context = useContext(TavusContext);
    if (context === undefined) {
        throw new Error('useTavus must be used within a TavusProvider');
    }
    return context;
}
