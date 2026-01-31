export type ActionResult<T> =
    | { success: true; data: T; timestamp: number }
    | { success: false; error: string; code?: string; timestamp: number };

/**
 * Standardized wrapper for server actions to ensure consistent error handling
 * and premium response structure.
 */
export async function createSafeAction<T>(
    action: () => Promise<T>,
    errorMessage: string = 'Operation failed'
): Promise<ActionResult<T>> {
    const timestamp = Date.now();
    try {
        const data = await action();
        return { success: true, data, timestamp };
    } catch (error: any) {
        console.error(`[Sovereign Action Error]:`, error);
        return {
            success: false,
            error: error.message || errorMessage,
            code: error.code || 'UNKNOWN_ERROR',
            timestamp
        };
    }
}
