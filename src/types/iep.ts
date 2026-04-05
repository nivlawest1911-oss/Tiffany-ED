/**
 * IEP (Individualized Education Program) Type Definitions
 * 
 * Aligned with:
 * - IDEA 2004 (20 U.S.C. § 1400)
 * - Al. Admin. Code 290-8-9 (Alabama Special Education)
 * - Alabama Literacy Act (Act 2019-523)
 * - Alabama Numeracy Act (Act 2022-276)
 * 
 * FERPA-compliant: Uses identifiers instead of full student names
 */

// ============================================================================
// ENUMS
// ============================================================================

/**
 * IDEA 2004 Exceptionality Categories (13 Categories)
 * Reference: 34 CFR 300.8
 */
export enum ExceptionalityCategory {
  AUTISM = 'autism',
  DEAF_BLINDNESS = 'deaf_blindness',
  DEAFNESS = 'deafness',
  DEVELOPMENTAL_DELAY = 'developmental_delay',
  EMOTIONAL_DISTURBANCE = 'emotional_disturbance',
  HEARING_IMPAIRMENT = 'hearing_impairment',
  INTELLECTUAL_DISABILITY = 'intellectual_disability',
  MULTIPLE_DISABILITIES = 'multiple_disabilities',
  ORTHOPEDIC_IMPAIRMENT = 'orthopedic_impairment',
  OTHER_HEALTH_IMPAIRMENT = 'other_health_impairment',
  SPECIFIC_LEARNING_DISABILITY = 'specific_learning_disability',
  SPEECH_LANGUAGE_IMPAIRMENT = 'speech_language_impairment',
  TRAUMATIC_BRAIN_INJURY = 'traumatic_brain_injury',
  VISUAL_IMPAIRMENT = 'visual_impairment',
  // Alabama-specific additions
  GIFTED = 'gifted',
}

export const EXCEPTIONALITY_LABELS: Record<ExceptionalityCategory, string> = {
  [ExceptionalityCategory.AUTISM]: 'Autism Spectrum Disorder',
  [ExceptionalityCategory.DEAF_BLINDNESS]: 'Deaf-Blindness',
  [ExceptionalityCategory.DEAFNESS]: 'Deafness',
  [ExceptionalityCategory.DEVELOPMENTAL_DELAY]: 'Developmental Delay (ages 3-9)',
  [ExceptionalityCategory.EMOTIONAL_DISTURBANCE]: 'Emotional Disturbance',
  [ExceptionalityCategory.HEARING_IMPAIRMENT]: 'Hearing Impairment',
  [ExceptionalityCategory.INTELLECTUAL_DISABILITY]: 'Intellectual Disability',
  [ExceptionalityCategory.MULTIPLE_DISABILITIES]: 'Multiple Disabilities',
  [ExceptionalityCategory.ORTHOPEDIC_IMPAIRMENT]: 'Orthopedic Impairment',
  [ExceptionalityCategory.OTHER_HEALTH_IMPAIRMENT]: 'Other Health Impairment',
  [ExceptionalityCategory.SPECIFIC_LEARNING_DISABILITY]: 'Specific Learning Disability',
  [ExceptionalityCategory.SPEECH_LANGUAGE_IMPAIRMENT]: 'Speech or Language Impairment',
  [ExceptionalityCategory.TRAUMATIC_BRAIN_INJURY]: 'Traumatic Brain Injury',
  [ExceptionalityCategory.VISUAL_IMPAIRMENT]: 'Visual Impairment (including Blindness)',
  [ExceptionalityCategory.GIFTED]: 'Gifted',
};

/**
 * Goal Domains for IEP Goals
 */
export enum GoalDomain {
  ACADEMIC_READING = 'academic_reading',
  ACADEMIC_WRITING = 'academic_writing',
  ACADEMIC_MATH = 'academic_math',
  ACADEMIC_SCIENCE = 'academic_science',
  ACADEMIC_SOCIAL_STUDIES = 'academic_social_studies',
  FUNCTIONAL_COMMUNICATION = 'functional_communication',
  FUNCTIONAL_SOCIAL = 'functional_social',
  FUNCTIONAL_BEHAVIOR = 'functional_behavior',
  FUNCTIONAL_DAILY_LIVING = 'functional_daily_living',
  FUNCTIONAL_MOTOR = 'functional_motor',
  TRANSITION_EMPLOYMENT = 'transition_employment',
  TRANSITION_POSTSECONDARY = 'transition_postsecondary',
  TRANSITION_INDEPENDENT_LIVING = 'transition_independent_living',
}

export const GOAL_DOMAIN_LABELS: Record<GoalDomain, string> = {
  [GoalDomain.ACADEMIC_READING]: 'Reading',
  [GoalDomain.ACADEMIC_WRITING]: 'Written Expression',
  [GoalDomain.ACADEMIC_MATH]: 'Mathematics',
  [GoalDomain.ACADEMIC_SCIENCE]: 'Science',
  [GoalDomain.ACADEMIC_SOCIAL_STUDIES]: 'Social Studies',
  [GoalDomain.FUNCTIONAL_COMMUNICATION]: 'Communication',
  [GoalDomain.FUNCTIONAL_SOCIAL]: 'Social/Emotional',
  [GoalDomain.FUNCTIONAL_BEHAVIOR]: 'Behavior',
  [GoalDomain.FUNCTIONAL_DAILY_LIVING]: 'Daily Living Skills',
  [GoalDomain.FUNCTIONAL_MOTOR]: 'Motor Skills',
  [GoalDomain.TRANSITION_EMPLOYMENT]: 'Employment',
  [GoalDomain.TRANSITION_POSTSECONDARY]: 'Post-Secondary Education',
  [GoalDomain.TRANSITION_INDEPENDENT_LIVING]: 'Independent Living',
};

/**
 * Service Types for Special Education and Related Services
 */
export enum ServiceType {
  // Special Education
  SPECIAL_EDUCATION = 'special_education',
  RESOURCE = 'resource',
  SELF_CONTAINED = 'self_contained',
  CO_TEACHING = 'co_teaching',
  CONSULTATION = 'consultation',
  // Related Services
  SPEECH_LANGUAGE = 'speech_language',
  OCCUPATIONAL_THERAPY = 'occupational_therapy',
  PHYSICAL_THERAPY = 'physical_therapy',
  COUNSELING = 'counseling',
  SCHOOL_PSYCHOLOGY = 'school_psychology',
  SOCIAL_WORK = 'social_work',
  ASSISTIVE_TECHNOLOGY = 'assistive_technology',
  AUDIOLOGY = 'audiology',
  ORIENTATION_MOBILITY = 'orientation_mobility',
  TRANSPORTATION = 'transportation',
  INTERPRETING = 'interpreting',
  NURSING = 'nursing',
  // Alabama-specific
  BEHAVIOR_INTERVENTION = 'behavior_intervention',
  READING_INTERVENTION = 'reading_intervention',
}

export const SERVICE_TYPE_LABELS: Record<ServiceType, string> = {
  [ServiceType.SPECIAL_EDUCATION]: 'Special Education Instruction',
  [ServiceType.RESOURCE]: 'Resource Room',
  [ServiceType.SELF_CONTAINED]: 'Self-Contained Classroom',
  [ServiceType.CO_TEACHING]: 'Co-Teaching',
  [ServiceType.CONSULTATION]: 'Consultation Services',
  [ServiceType.SPEECH_LANGUAGE]: 'Speech-Language Pathology',
  [ServiceType.OCCUPATIONAL_THERAPY]: 'Occupational Therapy',
  [ServiceType.PHYSICAL_THERAPY]: 'Physical Therapy',
  [ServiceType.COUNSELING]: 'Counseling Services',
  [ServiceType.SCHOOL_PSYCHOLOGY]: 'School Psychology Services',
  [ServiceType.SOCIAL_WORK]: 'School Social Work',
  [ServiceType.ASSISTIVE_TECHNOLOGY]: 'Assistive Technology',
  [ServiceType.AUDIOLOGY]: 'Audiology Services',
  [ServiceType.ORIENTATION_MOBILITY]: 'Orientation & Mobility',
  [ServiceType.TRANSPORTATION]: 'Specialized Transportation',
  [ServiceType.INTERPRETING]: 'Interpreting Services',
  [ServiceType.NURSING]: 'School Nursing Services',
  [ServiceType.BEHAVIOR_INTERVENTION]: 'Behavior Intervention Services',
  [ServiceType.READING_INTERVENTION]: 'Reading Intervention (Literacy Act)',
};

/**
 * Accommodation Categories (aligned with Alabama state testing)
 */
export enum AccommodationCategory {
  PRESENTATION = 'presentation',
  RESPONSE = 'response',
  SETTING = 'setting',
  TIMING_SCHEDULING = 'timing_scheduling',
}

export const ACCOMMODATION_CATEGORY_LABELS: Record<AccommodationCategory, string> = {
  [AccommodationCategory.PRESENTATION]: 'Presentation',
  [AccommodationCategory.RESPONSE]: 'Response',
  [AccommodationCategory.SETTING]: 'Setting',
  [AccommodationCategory.TIMING_SCHEDULING]: 'Timing/Scheduling',
};

/**
 * Common accommodations by category
 */
export const ACCOMMODATIONS_BY_CATEGORY: Record<AccommodationCategory, string[]> = {
  [AccommodationCategory.PRESENTATION]: [
    'Large print materials',
    'Braille',
    'Audio/Read aloud',
    'Reduced items per page',
    'Highlighted key words',
    'Visual aids/graphic organizers',
    'Simplified language',
    'Repeat/clarify directions',
    'Sign language interpreter',
    'Tactile graphics',
  ],
  [AccommodationCategory.RESPONSE]: [
    'Oral responses',
    'Scribe',
    'Word processor/Computer',
    'Calculator',
    'Spell checker',
    'Speech-to-text',
    'Graphic organizer for written responses',
    'Point/gesture instead of verbal',
    'Extended response time',
    'Augmentative communication device',
  ],
  [AccommodationCategory.SETTING]: [
    'Preferential seating',
    'Small group setting',
    'Individual/separate setting',
    'Reduced distractions',
    'Study carrel',
    'Adaptive furniture',
    'Quiet testing environment',
    'Special lighting',
  ],
  [AccommodationCategory.TIMING_SCHEDULING]: [
    'Extended time (1.5x)',
    'Extended time (2x)',
    'Frequent breaks',
    'Multiple sessions',
    'Time of day flexibility',
    'Flexible scheduling',
    'Chunked assignments',
    'Additional processing time',
  ],
};

/**
 * LRE Placement Options (Least Restrictive Environment)
 * Reference: 34 CFR 300.114-120
 */
export enum LREPlacement {
  GENERAL_EDUCATION_FULL = 'general_education_full',
  GENERAL_EDUCATION_WITH_SUPPORT = 'general_education_with_support',
  RESOURCE_PART_TIME = 'resource_part_time',
  RESOURCE_MAJORITY = 'resource_majority',
  SELF_CONTAINED = 'self_contained',
  SEPARATE_SCHOOL = 'separate_school',
  RESIDENTIAL = 'residential',
  HOMEBOUND_HOSPITAL = 'homebound_hospital',
}

export const LRE_PLACEMENT_LABELS: Record<LREPlacement, string> = {
  [LREPlacement.GENERAL_EDUCATION_FULL]: 'General Education (80%+ of day)',
  [LREPlacement.GENERAL_EDUCATION_WITH_SUPPORT]: 'General Education with Support Services (80%+ of day)',
  [LREPlacement.RESOURCE_PART_TIME]: 'Resource Room (40-79% in general education)',
  [LREPlacement.RESOURCE_MAJORITY]: 'Resource Room (Less than 40% in general education)',
  [LREPlacement.SELF_CONTAINED]: 'Self-Contained Classroom',
  [LREPlacement.SEPARATE_SCHOOL]: 'Separate Day School',
  [LREPlacement.RESIDENTIAL]: 'Residential Facility',
  [LREPlacement.HOMEBOUND_HOSPITAL]: 'Homebound/Hospital',
};

/**
 * IEP Document Status
 */
export enum IEPStatus {
  DRAFT = 'DRAFT',
  PENDING_REVIEW = 'PENDING_REVIEW',
  FINALIZED = 'FINALIZED',
  ARCHIVED = 'ARCHIVED',
}

// ============================================================================
// INTERFACES
// ============================================================================

/**
 * ACOS (Alabama Course of Study) Standard
 */
export interface ACOSStandard {
  id: string;
  code: string;
  subject: 'ELA' | 'MATH' | 'SCIENCE' | 'SOCIAL_STUDIES';
  gradeLevel: string;
  strand: string;
  standardText: string;
  keywords: string[];
  literacyActAligned: boolean;
  numeracyActAligned: boolean;
}

/**
 * Student Profile (FERPA-compliant)
 */
export interface IEPStudent {
  identifier: string;
  gradeLevel: string;
  dateOfBirth?: string;
  primaryExceptionality: ExceptionalityCategory;
  secondaryExceptionality?: ExceptionalityCategory;
  school?: string;
  district?: string;
}

/**
 * Short-Term Objective (for breaking down annual goals)
 */
export interface ShortTermObjective {
  id: string;
  objectiveText: string;
  targetDate: string;
  criteria: string;
  evaluationMethod: string;
}

/**
 * IEP Goal
 */
export interface IEPGoal {
  id: string;
  domain: GoalDomain;
  baseline: string;
  annualGoal: string;
  shortTermObjectives: ShortTermObjective[];
  measurementCriteria: string;
  evaluationSchedule: string;
  acosStandards: ACOSStandard[];
  progressReportingFrequency?: string;
}

/**
 * Special Education Service
 */
export interface IEPService {
  id: string;
  serviceType: ServiceType;
  frequency: string;
  duration: string;
  location: string;
  provider?: string;
  startDate: string;
  endDate: string;
  description?: string;
}

/**
 * Accommodation
 */
export interface IEPAccommodation {
  id: string;
  category: AccommodationCategory;
  description: string;
  assessmentIncluded: boolean;
  classroomIncluded: boolean;
  notes?: string;
}

/**
 * Modification (changes to curriculum content)
 */
export interface IEPModification {
  id: string;
  area: string;
  description: string;
  rationale: string;
}

/**
 * Present Levels of Academic Achievement and Functional Performance (PLAAFP)
 */
export interface PLAAFPSection {
  academicAchievement: {
    reading?: string;
    writing?: string;
    math?: string;
    science?: string;
    socialStudies?: string;
    other?: string;
  };
  functionalPerformance: {
    communication?: string;
    socialEmotional?: string;
    behavior?: string;
    dailyLiving?: string;
    motor?: string;
    other?: string;
  };
  evaluationSummary?: string;
  strengthsAndInterests?: string;
  effectOnProgress?: string;
}

/**
 * LRE Justification
 */
export interface LREJustification {
  placement: LREPlacement;
  percentageInGenEd: number;
  justification: string;
  supplementaryAidsConsidered: string[];
  removalExplanation?: string;
  nonacademicActivities?: string;
}

/**
 * Transition Plan (for students 16+)
 */
export interface TransitionPlan {
  appropriateAssessmentsUsed: string[];
  postsecondaryGoals: {
    education?: string;
    employment?: string;
    independentLiving?: string;
  };
  courseOfStudy: string;
  transitionServices: string[];
  agencyParticipation?: string[];
  studentInvolvement: string;
}

/**
 * Complete IEP Document
 */
export interface IEPDocument {
  id: string;
  userId: string;
  
  // Student Information
  student: IEPStudent;
  
  // Dates
  meetingDate: string;
  annualReviewDate: string;
  reevaluationDate?: string;
  
  // Core Sections
  plaafp: PLAAFPSection;
  goals: IEPGoal[];
  services: IEPService[];
  accommodations: IEPAccommodation[];
  modifications: IEPModification[];
  
  // LRE
  lreJustification: LREJustification;
  
  // Transition (if applicable)
  transitionPlan?: TransitionPlan;
  
  // Additional Considerations
  parentConcerns?: string;
  proceduralSafeguards: string;
  extendedSchoolYear?: {
    eligible: boolean;
    justification?: string;
    services?: string[];
  };
  behaviorPlan?: {
    needed: boolean;
    summary?: string;
  };
  assistiveTechnology?: {
    needed: boolean;
    description?: string;
  };
  
  // Metadata
  status: IEPStatus;
  aiModel?: string;
  tokensUsed?: number;
  createdAt: string;
  updatedAt: string;
}

/**
 * IEP Generation Request (input to AI)
 */
export interface IEPGenerationRequest {
  student: IEPStudent;
  meetingDate: string;
  plaafp: Partial<PLAAFPSection>;
  goalDomains: GoalDomain[];
  selectedACOSStandards: ACOSStandard[];
  requestedServices: Partial<IEPService>[];
  requestedAccommodations: string[];
  lrePlacement: LREPlacement;
  parentConcerns?: string;
  additionalContext?: string;
}

/**
 * IEP Generation Response (output from AI)
 */
export interface IEPGenerationResponse {
  success: boolean;
  document?: Partial<IEPDocument>;
  goals?: IEPGoal[];
  plaafpNarrative?: PLAAFPSection;
  lreJustificationNarrative?: string;
  complianceNotes?: string[];
  tokensUsed: number;
  error?: string;
}

// ============================================================================
// FORM INPUT TYPES
// ============================================================================

/**
 * Step 1: Student Profile Form Input
 */
export interface IEPStudentFormInput {
  identifier: string;
  gradeLevel: string;
  dateOfBirth?: string;
  primaryExceptionality: ExceptionalityCategory;
  secondaryExceptionality?: ExceptionalityCategory;
}

/**
 * Step 2: PLAAFP Form Input
 */
export interface IEPPlaafpFormInput {
  academicReading?: string;
  academicWriting?: string;
  academicMath?: string;
  functionalCommunication?: string;
  functionalSocialEmotional?: string;
  functionalBehavior?: string;
  evaluationSummary?: string;
  strengthsAndInterests?: string;
  parentConcerns?: string;
}

/**
 * Step 3: Goal Form Input
 */
export interface IEPGoalFormInput {
  domain: GoalDomain;
  baseline: string;
  annualGoal: string;
  shortTermObjectives: {
    objectiveText: string;
    targetDate: string;
    criteria: string;
  }[];
  measurementCriteria: string;
  evaluationSchedule: string;
  acosStandardCodes: string[];
}

/**
 * Step 4: Services Form Input
 */
export interface IEPServicesFormInput {
  services: {
    serviceType: ServiceType;
    frequency: string;
    duration: string;
    location: string;
  }[];
  accommodations: {
    category: AccommodationCategory;
    description: string;
    assessmentIncluded: boolean;
  }[];
}

/**
 * Step 5: LRE Form Input
 */
export interface IEPLreFormInput {
  placement: LREPlacement;
  justification: string;
  supplementaryAidsConsidered: string[];
}

/**
 * Complete IEP Form Input (all steps combined)
 */
export interface IEPFormInput {
  student: IEPStudentFormInput;
  meetingDate: string;
  annualReviewDate: string;
  plaafp: IEPPlaafpFormInput;
  goals: IEPGoalFormInput[];
  services: IEPServicesFormInput;
  lre: IEPLreFormInput;
}

// ============================================================================
// UTILITY TYPES
// ============================================================================

export type GradeLevel = 'K' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12';

export const GRADE_LEVELS: GradeLevel[] = ['K', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

export type Subject = 'ELA' | 'MATH' | 'SCIENCE' | 'SOCIAL_STUDIES';

export const SUBJECTS: Subject[] = ['ELA', 'MATH', 'SCIENCE', 'SOCIAL_STUDIES'];

export const SUBJECT_LABELS: Record<Subject, string> = {
  ELA: 'English Language Arts',
  MATH: 'Mathematics',
  SCIENCE: 'Science',
  SOCIAL_STUDIES: 'Social Studies',
};
