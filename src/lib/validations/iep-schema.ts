/**
 * IEP Validation Schemas (Zod)
 * 
 * Runtime validation for IEP documents with:
 * - SMART goal validation
 * - FERPA-compliant identifier patterns
 * - Alabama-specific compliance checks
 */

import { z } from 'zod';
import {
  ExceptionalityCategory,
  GoalDomain,
  ServiceType,
  AccommodationCategory,
  LREPlacement,
  IEPStatus,
} from '@/types/iep';

// ============================================================================
// ENUM SCHEMAS
// ============================================================================

export const exceptionalityCategorySchema = z.nativeEnum(ExceptionalityCategory);
export const goalDomainSchema = z.nativeEnum(GoalDomain);
export const serviceTypeSchema = z.nativeEnum(ServiceType);
export const accommodationCategorySchema = z.nativeEnum(AccommodationCategory);
export const lrePlacementSchema = z.nativeEnum(LREPlacement);
export const iepStatusSchema = z.nativeEnum(IEPStatus);

// ============================================================================
// ACOS STANDARD SCHEMA
// ============================================================================

export const acosStandardSchema = z.object({
  id: z.string(),
  code: z.string().regex(/^[A-Z]+\.\d+\.[A-Z]+\.?\d*$/i, 'Invalid ACOS code format'),
  subject: z.enum(['ELA', 'MATH', 'SCIENCE', 'SOCIAL_STUDIES']),
  gradeLevel: z.string(),
  strand: z.string(),
  standardText: z.string().min(10, 'Standard text must be at least 10 characters'),
  keywords: z.array(z.string()),
  literacyActAligned: z.boolean(),
  numeracyActAligned: z.boolean(),
});

// ============================================================================
// STUDENT SCHEMA
// ============================================================================

/**
 * FERPA-compliant student identifier pattern
 * Allows: initials, student IDs, coded identifiers
 * Disallows: full names, SSN patterns
 */
const ferpaIdentifierPattern = /^(?!.*\d{3}-\d{2}-\d{4})[A-Z0-9\-\.]{2,20}$/i;

export const iepStudentSchema = z.object({
  identifier: z
    .string()
    .min(2, 'Identifier must be at least 2 characters')
    .max(20, 'Identifier must be at most 20 characters')
    .regex(ferpaIdentifierPattern, 'Invalid identifier format (use initials or student ID)'),
  gradeLevel: z.enum(['K', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']),
  dateOfBirth: z.string().optional(),
  primaryExceptionality: exceptionalityCategorySchema,
  secondaryExceptionality: exceptionalityCategorySchema.optional(),
  school: z.string().optional(),
  district: z.string().optional(),
});

// ============================================================================
// SHORT-TERM OBJECTIVE SCHEMA
// ============================================================================

export const shortTermObjectiveSchema = z.object({
  id: z.string(),
  objectiveText: z.string().min(20, 'Objective must be at least 20 characters'),
  targetDate: z.string(),
  criteria: z.string().min(10, 'Criteria must be at least 10 characters'),
  evaluationMethod: z.string().min(5, 'Evaluation method is required'),
});

// ============================================================================
// GOAL SCHEMA (with SMART validation)
// ============================================================================

/**
 * SMART Goal Validation
 * Checks that annual goals contain measurable, time-bound language
 */
const smartGoalPattern = /(\d+%?|percent|increase|decrease|improve|achieve|demonstrate|complete|master|maintain)/i;
const timeFramePattern = /(by|within|during|after|throughout|end of|annually|quarterly|monthly|weekly|daily)/i;

export const iepGoalSchema = z.object({
  id: z.string(),
  domain: goalDomainSchema,
  baseline: z
    .string()
    .min(30, 'Baseline statement must be at least 30 characters')
    .describe('Current performance level with data'),
  annualGoal: z
    .string()
    .min(50, 'Annual goal must be at least 50 characters')
    .refine(
      (val) => smartGoalPattern.test(val),
      'Annual goal must include measurable criteria (e.g., percentage, specific achievement)'
    )
    .refine(
      (val) => timeFramePattern.test(val),
      'Annual goal must include a time frame'
    ),
  shortTermObjectives: z
    .array(shortTermObjectiveSchema)
    .min(1, 'At least one short-term objective is required')
    .max(5, 'Maximum 5 short-term objectives per goal'),
  measurementCriteria: z.string().min(20, 'Measurement criteria must be detailed'),
  evaluationSchedule: z.string().min(10, 'Evaluation schedule is required'),
  acosStandards: z.array(acosStandardSchema).default([]),
  progressReportingFrequency: z.string().optional(),
});

// ============================================================================
// SERVICE SCHEMA
// ============================================================================

export const iepServiceSchema = z.object({
  id: z.string(),
  serviceType: serviceTypeSchema,
  frequency: z
    .string()
    .min(3, 'Frequency is required')
    .regex(/\d+\s*(times?|x|sessions?|minutes?|hours?)/i, 'Include numeric frequency'),
  duration: z
    .string()
    .min(3, 'Duration is required')
    .regex(/\d+\s*(minutes?|hours?|mins?|hrs?)/i, 'Include duration in minutes or hours'),
  location: z.string().min(3, 'Service location is required'),
  provider: z.string().optional(),
  startDate: z.string(),
  endDate: z.string(),
  description: z.string().optional(),
}).refine(
  (data) => new Date(data.endDate) > new Date(data.startDate),
  { message: 'End date must be after start date', path: ['endDate'] }
);

// ============================================================================
// ACCOMMODATION SCHEMA
// ============================================================================

export const iepAccommodationSchema = z.object({
  id: z.string(),
  category: accommodationCategorySchema,
  description: z.string().min(10, 'Accommodation description is required'),
  assessmentIncluded: z.boolean().default(false),
  classroomIncluded: z.boolean().default(true),
  notes: z.string().optional(),
});

// ============================================================================
// MODIFICATION SCHEMA
// ============================================================================

export const iepModificationSchema = z.object({
  id: z.string(),
  area: z.string().min(3, 'Area is required'),
  description: z.string().min(20, 'Modification description must be detailed'),
  rationale: z.string().min(20, 'Rationale for modification is required'),
});

// ============================================================================
// PLAAFP SCHEMA
// ============================================================================

export const plaafpSectionSchema = z.object({
  academicAchievement: z.object({
    reading: z.string().optional(),
    writing: z.string().optional(),
    math: z.string().optional(),
    science: z.string().optional(),
    socialStudies: z.string().optional(),
    other: z.string().optional(),
  }),
  functionalPerformance: z.object({
    communication: z.string().optional(),
    socialEmotional: z.string().optional(),
    behavior: z.string().optional(),
    dailyLiving: z.string().optional(),
    motor: z.string().optional(),
    other: z.string().optional(),
  }),
  evaluationSummary: z.string().optional(),
  strengthsAndInterests: z.string().optional(),
  effectOnProgress: z.string().optional(),
}).refine(
  (data) => {
    const academic = Object.values(data.academicAchievement).some(v => v && v.length > 0);
    const functional = Object.values(data.functionalPerformance).some(v => v && v.length > 0);
    return academic || functional;
  },
  { message: 'At least one academic or functional area must be completed' }
);

// ============================================================================
// LRE JUSTIFICATION SCHEMA
// ============================================================================

export const lreJustificationSchema = z.object({
  placement: lrePlacementSchema,
  percentageInGenEd: z.number().min(0).max(100),
  justification: z.string().min(50, 'LRE justification must be at least 50 characters'),
  supplementaryAidsConsidered: z.array(z.string()).min(1, 'List supplementary aids considered'),
  removalExplanation: z.string().optional(),
  nonacademicActivities: z.string().optional(),
}).refine(
  (data) => {
    // If placement is less than 80% general ed, removal explanation is required
    if (data.percentageInGenEd < 80 && !data.removalExplanation) {
      return false;
    }
    return true;
  },
  { message: 'Explanation required when student is removed from general education more than 20% of the day', path: ['removalExplanation'] }
);

// ============================================================================
// TRANSITION PLAN SCHEMA
// ============================================================================

export const transitionPlanSchema = z.object({
  appropriateAssessmentsUsed: z.array(z.string()).min(1, 'At least one assessment is required'),
  postsecondaryGoals: z.object({
    education: z.string().optional(),
    employment: z.string().optional(),
    independentLiving: z.string().optional(),
  }).refine(
    (data) => data.education || data.employment || data.independentLiving,
    'At least one postsecondary goal area is required'
  ),
  courseOfStudy: z.string().min(20, 'Course of study description is required'),
  transitionServices: z.array(z.string()).min(1, 'At least one transition service is required'),
  agencyParticipation: z.array(z.string()).optional(),
  studentInvolvement: z.string().min(20, 'Description of student involvement is required'),
});

// ============================================================================
// COMPLETE IEP DOCUMENT SCHEMA
// ============================================================================

export const iepDocumentSchema = z.object({
  id: z.string(),
  userId: z.string(),
  
  // Student Information
  student: iepStudentSchema,
  
  // Dates
  meetingDate: z.string(),
  annualReviewDate: z.string(),
  reevaluationDate: z.string().optional(),
  
  // Core Sections
  plaafp: plaafpSectionSchema,
  goals: z.array(iepGoalSchema).min(1, 'At least one goal is required'),
  services: z.array(iepServiceSchema).min(1, 'At least one service is required'),
  accommodations: z.array(iepAccommodationSchema).default([]),
  modifications: z.array(iepModificationSchema).default([]),
  
  // LRE
  lreJustification: lreJustificationSchema,
  
  // Transition (required for students 16+)
  transitionPlan: transitionPlanSchema.optional(),
  
  // Additional Considerations
  parentConcerns: z.string().optional(),
  proceduralSafeguards: z.string().min(20, 'Procedural safeguards statement is required'),
  extendedSchoolYear: z.object({
    eligible: z.boolean(),
    justification: z.string().optional(),
    services: z.array(z.string()).optional(),
  }).optional(),
  behaviorPlan: z.object({
    needed: z.boolean(),
    summary: z.string().optional(),
  }).optional(),
  assistiveTechnology: z.object({
    needed: z.boolean(),
    description: z.string().optional(),
  }).optional(),
  
  // Metadata
  status: iepStatusSchema,
  aiModel: z.string().optional(),
  tokensUsed: z.number().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

// ============================================================================
// FORM INPUT SCHEMAS (for step-by-step form)
// ============================================================================

export const iepStudentFormSchema = z.object({
  identifier: z
    .string()
    .min(2, 'Identifier must be at least 2 characters')
    .max(20, 'Identifier must be at most 20 characters'),
  gradeLevel: z.enum(['K', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']),
  dateOfBirth: z.string().optional(),
  primaryExceptionality: exceptionalityCategorySchema,
  secondaryExceptionality: exceptionalityCategorySchema.optional(),
});

export const iepPlaafpFormSchema = z.object({
  academicReading: z.string().optional(),
  academicWriting: z.string().optional(),
  academicMath: z.string().optional(),
  functionalCommunication: z.string().optional(),
  functionalSocialEmotional: z.string().optional(),
  functionalBehavior: z.string().optional(),
  evaluationSummary: z.string().optional(),
  strengthsAndInterests: z.string().optional(),
  parentConcerns: z.string().optional(),
});

export const iepGoalFormSchema = z.object({
  domain: goalDomainSchema,
  baseline: z.string().min(20, 'Baseline is required'),
  annualGoal: z.string().min(30, 'Annual goal is required'),
  shortTermObjectives: z.array(z.object({
    objectiveText: z.string().min(10, 'Objective text is required'),
    targetDate: z.string(),
    criteria: z.string().min(5, 'Criteria is required'),
  })).min(1, 'At least one objective is required'),
  measurementCriteria: z.string().min(10, 'Measurement criteria is required'),
  evaluationSchedule: z.string().min(5, 'Evaluation schedule is required'),
  acosStandardCodes: z.array(z.string()).default([]),
});

export const iepServicesFormSchema = z.object({
  services: z.array(z.object({
    serviceType: serviceTypeSchema,
    frequency: z.string().min(3, 'Frequency is required'),
    duration: z.string().min(3, 'Duration is required'),
    location: z.string().min(3, 'Location is required'),
  })).min(1, 'At least one service is required'),
  accommodations: z.array(z.object({
    category: accommodationCategorySchema,
    description: z.string().min(5, 'Description is required'),
    assessmentIncluded: z.boolean().default(false),
  })).default([]),
});

export const iepLreFormSchema = z.object({
  placement: lrePlacementSchema,
  justification: z.string().min(30, 'Justification is required'),
  supplementaryAidsConsidered: z.array(z.string()).min(1, 'List aids considered'),
});

export const iepCompleteFormSchema = z.object({
  student: iepStudentFormSchema,
  meetingDate: z.string(),
  annualReviewDate: z.string(),
  plaafp: iepPlaafpFormSchema,
  goals: z.array(iepGoalFormSchema).min(1, 'At least one goal is required'),
  services: iepServicesFormSchema,
  lre: iepLreFormSchema,
});

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type IEPStudentFormData = z.infer<typeof iepStudentFormSchema>;
export type IEPPlaafpFormData = z.infer<typeof iepPlaafpFormSchema>;
export type IEPGoalFormData = z.infer<typeof iepGoalFormSchema>;
export type IEPServicesFormData = z.infer<typeof iepServicesFormSchema>;
export type IEPLreFormData = z.infer<typeof iepLreFormSchema>;
export type IEPCompleteFormData = z.infer<typeof iepCompleteFormSchema>;
export type IEPDocumentData = z.infer<typeof iepDocumentSchema>;
export type ACOSStandardData = z.infer<typeof acosStandardSchema>;
