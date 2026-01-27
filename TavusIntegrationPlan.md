# MISSION: Integrate Tavus Phoenix-3 High-Definition Avatar into EdIntel

## Role & Context
**Role:** EdIntel Lead Engineer
**Goal:** Integrate Tavus CVI (Conversational Video Interface) v2 for 4K digital advisory avatars.
**Target Audience:** Mobile County School District Administrators.

## Technical Stack
- **Frontend:** React / Tailwind CSS / Shadcn/ui
- **Backend:** Node.js (TypeScript) / Next.js API Routes
- **Avatar Engine:** Tavus Phoenix-3 (API v2)
- **Library:** `@tavus/cvi-ui` (if available) or direct WebRTC HLS stream handling.

## Implementation Tasks

### Phase 1: Service Layer (Replica Management)
- [ ] Create `src/services/tavus-service.ts` to encapsulate Tavus API v2 interaction.
    - `createConversation(replicaId, context)`: Initialize a session.
    - `getConversationStream(conversationId)`: Retrieve WebRTC/HLS endpoints.
    - `sendUpdate(conversationId, context)`: Inject real-time data logs.

### Phase 2: UI Component (High-Fidelity Player)
- [ ] Create `src/components/TavusPlayer.tsx`.
    - Implement full-screen or overlaid video player.
    - Support **Transparent Background** (Chroma Key logic if raw stream, or CSS/GL blending) to overlay on charts.
    - **Latency Optimization:** Implement logic to handle low-latency WebRTC connection (<600ms).

### Phase 3: Sovereign Persona Configuration
- [ ] Configure the System Prompt injection in `createConversation`.
    - Load context from `sovereign_vibe.md`.
    - Inject current session user data (school district, role).

### Phase 4: Real-Time Data Injection
- [ ] Implement `useTavusContext` hook.
    - Monitor `onTokenDeduct` and `onXPGain` events.
    - Push updates to the active Tavus conversation silently to update the avatar's context (e.g., "User just spent 5 tokens on an IEP audit").

### Phase 5: Verification
- [ ] Browser verification of stream startup time and latency.
- [ ] Visual check of overlay transparency.

## Constraints Checklist
- [ ] Resolution: 4K (Ultra HD).
- [ ] Latency: Sub-600ms.
- [ ] Persona: Aligned with Dr. Alvin West.
