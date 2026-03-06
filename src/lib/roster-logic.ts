import { differenceInDays, parseISO } from 'date-fns';
export type DeadlineStatus = 'overdue' | 'critical' | 'urgent' | 'warning' | 'stable';

/**
 * Calculates the urgency status of a deadline.
 * @param date The deadline date (Date object or ISO string).
 * @returns DeadlineStatus
 */
export function getDeadlineStatus(date: Date | string): DeadlineStatus {
    const targetDate = typeof date === 'string' ? parseISO(date) : date;
    const today = new Date();
    const daysRemaining = differenceInDays(targetDate, today);

    if (daysRemaining < 0) {
        return 'overdue';
    } else if (daysRemaining <= 3) {
        return 'critical';
    } else if (daysRemaining <= 7) {
        return 'urgent';
    } else if (daysRemaining <= 14) {
        return 'warning';
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
        case 'overdue':
            return 'text-rose-600 bg-rose-600/10 border-rose-600/20';
        case 'critical':
            return 'text-red-500 bg-red-500/10 border-red-500/20';
        case 'urgent':
            return 'text-amber-500 bg-amber-500/10 border-amber-500/20';
        case 'warning':
            return 'text-indigo-500 bg-indigo-500/10 border-indigo-500/20';
        case 'stable':
            return 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20';
        default:
            return 'text-zinc-500 bg-zinc-500/10 border-zinc-500/20';
    }
}
