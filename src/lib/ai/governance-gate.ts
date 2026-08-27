/**
 * EdIntel AI Governance Gate
 * 
 * Implements human-in-the-loop controls, clear AI-use disclosure,
 * and safeguards against unconfirmed auto-finalization of high-stakes educational,
 * legal, compliance, and fiscal determinations.
 */

export const AI_DISCLOSURE_NOTICE = 
  "This document was generated with AI assistance. Professional educator review and verification are required prior to official adoption or institutional finalization.";

export const HIGH_STAKES_DOMAINS = [
  'iep',
  'compliance',
  'sentinel',
  'state_report',
  'fiscal_determination',
  'discipline_restorative',
  'legal_audit',
  'student_portfolio_compliance'
] as const;

export type HighStakesDomain = typeof HIGH_STAKES_DOMAINS[number] | string;

export interface GovernanceMetadata {
  humanReviewRequired: boolean;
  aiAssisted: boolean;
  aiDisclosure: string;
  finalized: boolean;
  finalizedAt: string | null;
  finalizedBy: string | null;
  reviewerNotes?: string | null;
  policyVersion: string;
  governanceTag: string;
}

export type GovernanceEnveloped<T> = T & {
  _governance: GovernanceMetadata;
};

export interface GovernanceEnvelopeOptions {
  domain: HighStakesDomain;
  isHighStakes?: boolean;
  studentId?: string;
  finalized?: boolean;
  finalizedBy?: string | null;
  reviewerNotes?: string | null;
}

/**
 * Checks if a context, action, or domain is classified as high-stakes.
 */
export function isHighStakes(
  context: string | { domain?: string; type?: string; action?: string }
): boolean {
  if (!context) return false;
  const target = typeof context === 'string' 
    ? context.toLowerCase() 
    : `${context.domain || ''} ${context.type || ''} ${context.action || ''}`.toLowerCase();

  return HIGH_STAKES_DOMAINS.some(domain => target.includes(domain));
}

/**
 * Envelopes structured AI outputs with required governance, disclosure, and review flags.
 */
export function withGovernanceEnvelope<T extends Record<string, any>>(
  data: T,
  options: GovernanceEnvelopeOptions
): GovernanceEnveloped<T> {
  const highStakes = options.isHighStakes !== undefined 
    ? options.isHighStakes 
    : isHighStakes(options.domain);

  const metadata: GovernanceMetadata = {
    humanReviewRequired: highStakes,
    aiAssisted: true,
    aiDisclosure: AI_DISCLOSURE_NOTICE,
    finalized: options.finalized ?? false,
    finalizedAt: options.finalized ? new Date().toISOString() : null,
    finalizedBy: options.finalizedBy ?? null,
    reviewerNotes: options.reviewerNotes ?? null,
    policyVersion: "2026.1-AL-SDE-ALIGNMENT",
    governanceTag: highStakes ? "EDINTEL_HIGH_STAKES_REVIEW_MANDATORY" : "EDINTEL_STANDARD_AI_ASSISTED"
  };

  return {
    ...data,
    _governance: metadata
  };
}

export interface HumanFinalizeConfirmation {
  confirmedByHuman?: boolean;
  reviewerId?: string;
  reviewerRole?: string;
  notes?: string;
  timestamp?: string;
}

/**
 * Asserts that a high-stakes decision has received explicit human confirmation.
 * Returns { valid: true } or { valid: false, error: string }.
 */
export function assertHumanFinalized(
  input: HumanFinalizeConfirmation
): { valid: boolean; error?: string } {
  if (!input || input.confirmedByHuman !== true) {
    return {
      valid: false,
      error: "High-stakes determinations require explicit human educator confirmation before finalization."
    };
  }

  if (!input.reviewerId) {
    return {
      valid: false,
      error: "Reviewer identifier is mandatory for finalized high-stakes records."
    };
  }

  return { valid: true };
}
