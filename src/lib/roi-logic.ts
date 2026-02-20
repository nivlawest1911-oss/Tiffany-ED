/**
 * Metric types for ROI calculation
 */
export interface UsageMetrics {
    legalDocumentsReviewed: number;
    gradingHoursSaved: number;
    administrativeTasksAutomated: number;
    complianceChecksRun: number;
}

export interface SavingsReport {
    totalSavings: number;
    hoursReclaimed: number;
    complianceRiskMitigated: number; // Estimated value of avoided fines/lawsuits
    breakdown: {
        legal: number;
        grading: number;
        admin: number;
        compliance: number;
    };
}

// Estimated hourly rates for traditional human work
const RATES = {
    LEGAL: 250, // $/hr for legal counsel
    TEACHER: 50, // $/hr for grading/planning
    ADMIN: 60, // $/hr for administrative tasks
    COMPLIANCE_RISK: 5000, // Estimated value per detected high-risk issue
};

/**
 * Calculates the Sovereign Savings based on usage metrics.
 * @param metrics Usage metrics from the system.
 * @returns SavingsReport object.
 */
export function calculateSovereignSavings(metrics: UsageMetrics): SavingsReport {
    const legalSavings = metrics.legalDocumentsReviewed * 2 * RATES.LEGAL; // Assume 2 hrs per doc
    const gradingSavings = metrics.gradingHoursSaved * RATES.TEACHER;
    const adminSavings = metrics.administrativeTasksAutomated * 0.5 * RATES.ADMIN; // Assume 30 mins per task
    const complianceSavings = metrics.complianceChecksRun * 0.05 * RATES.COMPLIANCE_RISK; // Assume 5% find a critical issue

    const totalSavings = legalSavings + gradingSavings + adminSavings + complianceSavings;
    const hoursReclaimed = (metrics.legalDocumentsReviewed * 2) + metrics.gradingHoursSaved + (metrics.administrativeTasksAutomated * 0.5);

    return {
        totalSavings,
        hoursReclaimed,
        complianceRiskMitigated: complianceSavings,
        breakdown: {
            legal: legalSavings,
            grading: gradingSavings,
            admin: adminSavings,
            compliance: complianceSavings,
        },
    };
}

/**
 * Formats a currency amount.
 */
export function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
    }).format(amount);
}
