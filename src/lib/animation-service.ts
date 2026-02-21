
export type AnimationState = 'idle' | 'thinking' | 'speaking' | 'listening' | 'alert';

class AnimationService {
    private currentState: AnimationState = 'idle';
    private listeners: ((state: AnimationState) => void)[] = [];

    setState(state: AnimationState) {
        this.currentState = state;
        this.listeners.forEach(l => l(state));
    }

    getState() {
        return this.currentState;
    }

    subscribe(listener: (state: AnimationState) => void) {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter(l => l !== listener);
        };
    }

    /**
     * Orchestrates the avatar behavior based on AI interaction status.
     */
    async coordinateBehavior(action: () => Promise<any>) {
        this.setState('thinking');
        try {
            const result = await action();
            this.setState('speaking');
            // Simulate speaking duration or coordinate with audio
            setTimeout(() => this.setState('idle'), 3000);
            return result;
        } catch (error) {
            this.setState('alert');
            setTimeout(() => this.setState('idle'), 2000);
            throw error;
        }
    }
}

export const animationService = new AnimationService();
