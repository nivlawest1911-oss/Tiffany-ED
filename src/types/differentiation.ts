/**
 * EdIntel Sovereign Differentiation Engine — Core Type Definitions
 * 
 * This file defines all TypeScript interfaces for the differentiation engine,
 * screener ingestion, district listening, and VIGIApp infrastructure monitoring.
 * 
 * These types surpass Diffit's capability scope by integrating student-level
 * screener data, IEP linkage, and district-level analytics into a unified system.
 */

// ═══════════════════════════════════════════════════════════════
// DIFFERENTIATION ENGINE TYPES
// ═══════════════════════════════════════════════════════════════

/** Content types the differentiation engine can generate */
export type DifferentiationContentType =
  | 'reading_passage'
  | 'vocabulary'
  | 'assessment'
  | 'graphic_organizer'
  | 'full_bundle';

/** DOK (Depth of Knowledge) levels 1-4 */
export type DOKLevel = 1 | 2 | 3 | 4;

/** Question format types */
export type QuestionFormat = 'multiple_choice' | 'short_answer' | 'open_ended' | 'true_false';

/** Graphic organizer types */
export type OrganizerType = '3-2-1' | 'semantic_map' | 'concept_web' | 'venn_diagram' | 'kwl' | 'cause_effect';

/** Request payload for generating differentiated content */
export interface DifferentiationRequest {
  /** The topic, URL, or raw text to differentiate */
  sourceInput: string;
  /** Target Lexile measure (e.g., 400, 600, 800) */
  targetLexile: number;
  /** DOK level for questions (1=Recall, 2=Skill/Concept, 3=Strategic Thinking, 4=Extended Thinking) */
  dokLevel: DOKLevel;
  /** Target grade level (e.g., "3", "5", "9-10") */
  gradeLevel: string;
  /** What type of content to generate */
  contentType: DifferentiationContentType;
  /** Alabama Course of Study standard code (optional) */
  academicStandard?: string;
  /** Subject area */
  subject?: string;
  /** Target language for MLL/ELL support (ISO 639-1 code) */
  language?: string;
  /** Optional student profile ID for auto-targeting Lexile and deficits */
  studentProfileId?: string;
  /** Number of questions to generate */
  questionCount?: number;
  /** Specific question formats to include */
  questionFormats?: QuestionFormat[];
  /** Type of graphic organizer to generate */
  organizerType?: OrganizerType;
  /** Number of vocabulary terms to extract */
  vocabularyCount?: number;
}

/** Batch request for generating materials for multiple students/levels */
export interface BatchDifferentiationRequest {
  sourceInput: string;
  /** Array of target Lexile levels to generate for */
  targetLexiles: number[];
  /** Or array of student profile IDs */
  studentProfileIds?: string[];
  dokLevel: DOKLevel;
  gradeLevel: string;
  contentType: DifferentiationContentType;
  academicStandard?: string;
  subject?: string;
  language?: string;
}

/** Generated vocabulary term */
export interface VocabularyTerm {
  term: string;
  definition: string;
  exampleSentence: string;
  /** Cognate in student's native language (for MLL/ELL) */
  cognate?: string;
  /** Part of speech */
  partOfSpeech: string;
  /** Pronunciation guide */
  pronunciation?: string;
  /** Tier level (Tier 1=everyday, Tier 2=academic, Tier 3=domain-specific) */
  tier: 1 | 2 | 3;
}

/** Generated assessment question */
export interface AssessmentQuestion {
  id: string;
  question: string;
  dokLevel: DOKLevel;
  format: QuestionFormat;
  /** Answer choices for multiple choice */
  choices?: string[];
  /** Correct answer */
  correctAnswer: string;
  /** Explanation of the correct answer */
  rationale: string;
  /** Alabama Course of Study standard this question aligns to */
  standardAlignment?: string;
}

/** Generated graphic organizer data */
export interface GraphicOrganizer {
  type: OrganizerType;
  title: string;
  /** Structured data for the organizer (varies by type) */
  data: Record<string, any>;
  /** Instructions for the student */
  instructions: string;
}

/** Full response from the differentiation engine */
export interface DifferentiationResponse {
  /** The differentiated reading passage */
  passage: string;
  /** Measured output Lexile level */
  outputLexile: number;
  /** Word count of the passage */
  wordCount: number;
  /** Flesch-Kincaid grade level */
  fleschKincaid: number;
  /** Source citations */
  citations: string[];
  /** Extracted vocabulary terms */
  vocabulary: VocabularyTerm[];
  /** Assessment questions */
  questions: AssessmentQuestion[];
  /** Graphic organizer data */
  graphicOrganizer?: GraphicOrganizer;
  /** AI model used for generation */
  modelUsed: string;
  /** Tokens consumed */
  tokensUsed: number;
  /** Generation time in milliseconds */
  generationTimeMs: number;
}

// ═══════════════════════════════════════════════════════════════
// LEXILE FRAMEWORK TYPES
// ═══════════════════════════════════════════════════════════════

/** Lexile range mapped to grade level */
export interface LexileGradeMapping {
  grade: string;
  minLexile: number;
  maxLexile: number;
  label: string;
}

/** Standard Lexile-to-grade mapping table */
export const LEXILE_GRADE_MAP: LexileGradeMapping[] = [
  { grade: 'K', minLexile: -100, maxLexile: 200, label: 'Kindergarten' },
  { grade: '1', minLexile: 100, maxLexile: 400, label: '1st Grade' },
  { grade: '2', minLexile: 300, maxLexile: 500, label: '2nd Grade' },
  { grade: '3', minLexile: 415, maxLexile: 760, label: '3rd Grade' },
  { grade: '4', minLexile: 635, maxLexile: 950, label: '4th Grade' },
  { grade: '5', minLexile: 770, maxLexile: 1010, label: '5th Grade' },
  { grade: '6', minLexile: 855, maxLexile: 1065, label: '6th Grade' },
  { grade: '7', minLexile: 925, maxLexile: 1120, label: '7th Grade' },
  { grade: '8', minLexile: 985, maxLexile: 1155, label: '8th Grade' },
  { grade: '9', minLexile: 1040, maxLexile: 1210, label: '9th Grade' },
  { grade: '10', minLexile: 1085, maxLexile: 1260, label: '10th Grade' },
  { grade: '11-12', minLexile: 1130, maxLexile: 1400, label: '11th-12th Grade' },
];

/** Get grade-level label for a Lexile measure */
export function lexileToGrade(lexile: number): string {
  for (const mapping of LEXILE_GRADE_MAP) {
    if (lexile >= mapping.minLexile && lexile <= mapping.maxLexile) {
      return mapping.label;
    }
  }
  return lexile > 1400 ? 'College+' : 'Pre-K';
}

// ═══════════════════════════════════════════════════════════════
// ALABAMA LITERACY ACT (ALA) SKILL PROFILE
// ═══════════════════════════════════════════════════════════════

/** The 7 Alabama Literacy Act skill areas */
export type ALASkillArea =
  | 'phonemic_awareness'
  | 'phonics'
  | 'fluency'
  | 'vocabulary'
  | 'comprehension'
  | 'written_expression'
  | 'listening_comprehension';

/** Descriptive labels for ALA skill areas */
export const ALA_SKILL_LABELS: Record<ALASkillArea, string> = {
  phonemic_awareness: 'Phonemic Awareness',
  phonics: 'Phonics (Decoding)',
  fluency: 'Fluency (Oral Reading)',
  vocabulary: 'Vocabulary',
  comprehension: 'Comprehension',
  written_expression: 'Written Expression',
  listening_comprehension: 'Listening Comprehension',
};

/** Skill score with proficiency level */
export interface ALASkillScore {
  area: ALASkillArea;
  score: number;       // 0-100 normalized score
  proficiency: 'below' | 'approaching' | 'meeting' | 'exceeding';
  isDeficit: boolean;  // true if below benchmark
}

/** Complete ALA 7-skill profile for a student */
export interface ALASkillProfile {
  studentId: string;
  assessmentDate: string;
  skills: ALASkillScore[];
  overallRisk: 'at-risk' | 'some-risk' | 'low-risk';
  deficitAreas: ALASkillArea[];
  /** Recommended intervention tier */
  interventionTier: 'Tier1' | 'Tier2' | 'Tier3';
}

// ═══════════════════════════════════════════════════════════════
// SCREENER & ASSESSMENT TYPES
// ═══════════════════════════════════════════════════════════════

/** Supported screener platforms */
export type ScreenerPlatform = 'mCLASS' | 'i-Ready' | 'STAR' | 'aimswebPlus';

/** Assessment windows */
export type AssessmentWindow = 'BOY' | 'MOY' | 'EOY';

/** Raw screener skill scores (platform-normalized) */
export interface ScreenerSkillScores {
  letterNaming?: number;
  correctLetterSounds?: number;
  nonsenseWords?: number;
  oralAccuracy?: number;
  oralFluency?: number;
  vocabulary?: number;
  sightWords?: number;
  comprehension?: number;
  writtenExpression?: number;
  listeningComprehension?: number;
}

/** Screener import payload (single student row) */
export interface ScreenerImportRow {
  studentSisId: string;
  firstName: string;
  lastName: string;
  gradeLevel: string;
  screenerPlatform: ScreenerPlatform;
  assessmentWindow: AssessmentWindow;
  assessmentDate: string;
  compositeScore?: number;
  riskLevel?: string;
  skillScores: ScreenerSkillScores;
}

/** Screener import result */
export interface ScreenerImportResult {
  totalRows: number;
  imported: number;
  skipped: number;
  errors: { row: number; message: string }[];
  studentsAtRisk: number;
  autoInterventionTriggered: boolean;
}

/** Student profile summary for UI display */
export interface StudentProfileSummary {
  id: string;
  sisId: string;
  firstName: string;
  lastName: string;
  gradeLevel: string;
  lexileLevel: number | null;
  lexileTrend: 'up' | 'down' | 'flat';
  riskLevel: 'at-risk' | 'some-risk' | 'low-risk';
  interventionTier: string | null;
  ellStatus: string | null;
  spedStatus: string | null;
  dyslexiaFlag: boolean;
  alaProfile: ALASkillProfile | null;
  lastScreenerDate: string | null;
  materialCount: number;
}

/** Reading Improvement Plan (SRIP) */
export interface ReadingImprovementPlan {
  id: string;
  studentProfileId: string;
  schoolYear: string;
  status: 'active' | 'completed' | 'archived';
  deficitAreas: ALASkillArea[];
  interventionProgram: string | null;
  progressNotes: { date: string; note: string; progress: string }[];
  parentNotified: boolean;
  createdAt: string;
  updatedAt: string;
}

// ═══════════════════════════════════════════════════════════════
// DISTRICT LISTENING TYPES
// ═══════════════════════════════════════════════════════════════

/** Virtual Readiness Score breakdown */
export interface VirtualReadinessScore {
  overall: number; // 1-5
  hardware: number;
  broadband: number;
  teacherTraining: number;
  lmsAdoption: number;
}

/** EdTech tool adoption data */
export interface EdTechAdoption {
  name: string;
  category: string;
  adoptionPct: number;
  activeUsers: number;
  lastActivity: string;
}

/** District Listening snapshot for UI */
export interface DistrictListeningSnapshot {
  id: string;
  districtId: string;
  districtName: string;
  snapshotDate: string;
  virtualReadiness: VirtualReadinessScore;
  titleIRevenue: number | null;
  erateCat2Budget: number | null;
  erateCat2Used: number | null;
  enrollmentTotal: number | null;
  freeReducedPct: number | null;
  elaProficiencyPct: number | null;
  mathProficiencyPct: number | null;
  edtechTools: EdTechAdoption[];
}

// ═══════════════════════════════════════════════════════════════
// VIGIAPP INFRASTRUCTURE MONITORING TYPES
// ═══════════════════════════════════════════════════════════════

/** Infrastructure device types */
export type InfraDeviceType = 'UPS' | 'GENERATOR' | 'SERVER_RACK' | 'HVAC' | 'TELECOM_HUB';

/** Device status levels */
export type InfraStatus = 'normal' | 'warning' | 'critical' | 'offline';

/** Alert severity levels */
export type AlertSeverity = 'info' | 'warning' | 'critical';

/** Device metrics (varies by device type) */
export interface InfraMetrics {
  temperature?: number;        // Celsius
  loadPct?: number;            // 0-100
  batteryPct?: number;         // 0-100 (UPS)
  fuelLevelPct?: number;       // 0-100 (Generator)
  uptimeHours?: number;
  inputVoltage?: number;
  outputVoltage?: number;
  humidity?: number;           // 0-100
  transferTimeMs?: number;     // UPS transfer time
  networkLatencyMs?: number;   // Telecom
}

/** Device registration config */
export interface InfraDeviceConfig {
  schoolId: string;
  deviceType: InfraDeviceType;
  deviceName: string;
  location?: string;
  alertThresholds?: {
    temperatureMax?: number;
    loadPctMax?: number;
    batteryPctMin?: number;
    fuelLevelPctMin?: number;
  };
}

/** Infrastructure device with current status */
export interface InfraDevice {
  id: string;
  schoolId: string;
  schoolName?: string;
  deviceType: InfraDeviceType;
  deviceName: string;
  location: string | null;
  status: InfraStatus;
  metrics: InfraMetrics | null;
  lastHeartbeat: string;
  alertCount: number;
}

/** Infrastructure alert */
export interface InfraAlert {
  id: string;
  monitorId: string;
  deviceName: string;
  deviceType: InfraDeviceType;
  severity: AlertSeverity;
  message: string;
  metricSnapshot: InfraMetrics | null;
  acknowledged: boolean;
  acknowledgedBy: string | null;
  resolvedAt: string | null;
  createdAt: string;
}

/** School-level infrastructure health score */
export interface SchoolHealthScore {
  schoolId: string;
  schoolName: string;
  overallHealth: number; // 0-100
  deviceCount: number;
  activeAlerts: number;
  criticalAlerts: number;
  lastUpdate: string;
}

// ═══════════════════════════════════════════════════════════════
// EVENT ORCHESTRATOR TYPES
// ═══════════════════════════════════════════════════════════════

/** Event types for the cross-system orchestrator */
export type OrchestratorEventType =
  | 'SCREENER_IMPORTED'
  | 'DEFICIT_DETECTED'
  | 'DIFFERENTIATION_GENERATED'
  | 'READING_PLAN_CREATED'
  | 'DISTRICT_DEFICIT_DETECTED'
  | 'INFRA_ALERT_TRIGGERED'
  | 'INFRA_ALERT_RESOLVED';

/** Event payload for the orchestrator */
export interface OrchestratorEvent {
  type: OrchestratorEventType;
  timestamp: string;
  userId: string;
  payload: Record<string, any>;
}
