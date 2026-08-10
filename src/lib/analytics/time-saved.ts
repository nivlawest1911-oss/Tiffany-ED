/**
 * Client helper to log time saved events.
 * It catches errors so it won't break the UI if analytics fails.
 */
export async function logTimeSavedClient(actionType: string, metadata?: Record<string, any>) {
  try {
    // Heuristic values from requirements
    const heuristicMinutes: Record<string, number> = {
      differentiate: 12,
      group_regen: 8,
      lesson_pack: 25,
      export: 5,
      tiffany: 15,
    };

    const minutesSaved = heuristicMinutes[actionType] || 5;

    await fetch('/api/analytics/time-saved', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ actionType, minutesSaved, metadata }),
    });
  } catch (error) {
    console.error('Failed to log time saved event:', error);
  }
}
