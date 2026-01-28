import { Organization, User } from '@prisma/client';

/**
 * Checks if a trial is currently active for an organization.
 */
export const isOrganizationTrialActive = (org: Organization) => {
    const now = new Date();
    return now < org.trialEndsAt && !org.isTrialConverted;
};

/**
 * Checks if a trial is currently active for an individual user (fallback).
 */
export const isUserTrialActive = (user: User) => {
    if (!user.trialEndsAt) return false;
    const now = new Date();
    return now < user.trialEndsAt && !user.isTrialConverted;
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
    DURATION_DAYS: 14,
    INITIAL_TOKENS: 50,
    PRICE_PER_MONTH: 79,
};
