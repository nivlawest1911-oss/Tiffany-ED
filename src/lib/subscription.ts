import { organizations, User } from '@/generated/prisma';

/**
 * Checks if a trial is currently active for an organization.
 */
export const isOrganizationTrialActive = (org: organizations) => {
    const now = new Date();
    return now < org.trial_ends_at && !org.is_trial_converted;
};

/**
 * Checks if a trial is currently active for an individual user (fallback).
 */
export const isUserTrialActive = (user: User) => {
    if (!user.trial_ends_at) return false;
    const now = new Date();
    return now < user.trial_ends_at && !user.is_trial_converted;
};

/**
 * Calculates remaining days in trial.
 */
export const getTrialDaysRemaining = (endDate: Date | null) => {
    if (!endDate) return 0;
    const now = new Date();
    const diff = endDate.getTime() - now.getTime();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
};

/**
 * Configuration for the 14-day trial.
 */
export const TRIAL_CONFIG = {
    DURATION_DAYS: 30, // Updated to 30 days as per Quantum Studio protocol
    INITIAL_TOKENS: 50,
    PRICE_PER_MONTH: 79, // School Site Pro License
};
