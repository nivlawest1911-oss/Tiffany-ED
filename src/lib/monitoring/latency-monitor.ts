/**
 * EdIntel Latency Monitor
 * Performance tracking for Edge and Serverless functions
 */

export interface LatencyMetric {
    name: string;
    duration: number; // ms
    startTime: number;
    endTime: number;
    metadata?: Record<string, any>;
    isEdge?: boolean;
}

export class LatencyMonitor {
    /**
     * Measures the execution time of a function
     */
    static async measure<T>(
        name: string,
        fn: () => Promise<T>,
        metadata?: Record<string, any>
    ): Promise<T> {
        const startTime = performance.now();
        const startTimestamp = Date.now();

        try {
            const result = await fn();
            const endTime = performance.now();
            const endTimestamp = Date.now();
            const duration = endTime - startTime;

            // Log telemetry (In a full implementation, this goes to BigQuery/Segment)
            console.log(`[LATENCY] ${name}: ${duration.toFixed(2)}ms`, {
                ...metadata,
                duration,
                startTime: startTimestamp,
                endTime: endTimestamp,
                isEdge: typeof EdgeRuntime !== 'undefined'
            });

            return result;
        } catch (error) {
            console.error(`[LATENCY ERROR] ${name} failed:`, error);
            throw error;
        }
    }

    /**
     * Simple timer for manual tracking
     */
    static start(name: string) {
        return {
            name,
            startTime: performance.now(),
            stop: function () {
                const duration = performance.now() - this.startTime;
                console.log(`[LATENCY] ${this.name} manual stop: ${duration.toFixed(2)}ms`);
                return duration;
            }
        };
    }
}

// Global declaration for EdgeRuntime check
declare const EdgeRuntime: string | undefined;
