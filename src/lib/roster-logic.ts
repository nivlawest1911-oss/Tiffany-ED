import { differenceInDays, parseISO } from 'date-fns';

export type DeadlineStatus = 'critical' | 'urgent' | 'stable';

/**
 * Calculates the urgency status of a deadline.
 * @param date The deadline date (Date object or ISO string).
 * @returns 'critical' | 'urgent' | 'stable'
 */
export function getDeadlineStatus(date: Date | string): DeadlineStatus {
    const targetDate = typeof date === 'string' ? parseISO(date) : date;
    const today = new Date();
    const daysRemaining = differenceInDays(targetDate, today);

    if (daysRemaining <= 3) {
        return 'critical';
    } else if (daysRemaining <= 7) {
        return 'urgent';
    } else {
        return 'stable';
    }
}

/**
 * Returns the Tailwind CSS color classes for a given deadline status.
 * @param status The deadline status.
 * @returns Tailwind CSS class string.
 */
export function getStatusColor(status: DeadlineStatus): string {
    switch (status) {
        case 'critical':
            return 'text-red-500 bg-red-500/10 border-red-500/20';
        case 'urgent':
            return 'text-amber-500 bg-amber-500/10 border-amber-500/20';
        case 'stable':
            return 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20';
        default:
            return 'text-zinc-500 bg-zinc-500/10 border-zinc-500/20';
    }
}
