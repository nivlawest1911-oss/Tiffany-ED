/**
 * Sovereign Logic: Core Calculations
 * Centralized business logic for Financial ROI and Social Compliance.
 */

export const SOVEREIGN_FORMULAS = {
    /**
     * Calculates the projected ROI of an intervention.
     * @param investAmount - The cost of the intervention (e.g., $5,000 for NBCT).
     * @param studentCount - Number of students impacted.
     * @param efficacyRate - Expected success rate (0.0 - 1.0).
     * @returns Projected dollar value of saved operational costs.
     */
    calculateROI: (investAmount: number, studentCount: number, efficacyRate: number): number => {
        // Base assumption: Reducing recidivism saves $12,000/student/year in diverse learning costs.
        const SAVINGS_PER_STUDENT = 12000;
        const grossSavings = studentCount * efficacyRate * SAVINGS_PER_STUDENT;
        return grossSavings - investAmount;
    },

    /**
     * Calculates the "Fragility Score" of a cohort.
     * @param attendanceRate - Average attendance % (0-100).
     * @param incidents - Number of discipline incidents.
     * @param failingGrades - Number of core failures.
     * @returns Score 1-100 (Higher is more fragile/at-risk).
     */
    calculateFragility: (attendanceRate: number, incidents: number, failingGrades: number): number => {
        const attendanceFactor = (100 - attendanceRate) * 1.5;
        const incidentFactor = incidents * 5;
        const gradeFactor = failingGrades * 10;

        const score = attendanceFactor + incidentFactor + gradeFactor;
        return Math.min(100, Math.max(0, score));
    }
};
