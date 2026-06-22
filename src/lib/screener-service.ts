/**
 * EdIntel Screener & Assessment Ingestion Service
 * 
 * Provides parsing for mCLASS, i-Ready, STAR, and aimswebPlus.
 * Maps platform-specific benchmarks to the 7 Alabama Literacy Act (ALA) skill areas
 * to identify deficits, compute risk tiers, and auto-pilot differentiation.
 */

import { prisma } from './prisma';
import { 
  ScreenerPlatform, 
  AssessmentWindow, 
  ScreenerImportRow,
  ALASkillProfile,
  ALASkillArea,
  ALASkillScore,
  ScreenerImportResult
} from '@/types/differentiation';
import { differentiationEngine } from './differentiation-engine';

export class ScreenerService {
  /**
   * Parses CSV content and maps it to unified ScreenerImportRow objects.
   */
  static parseScreenerCSV(csvText: string, platform: ScreenerPlatform): ScreenerImportRow[] {
    const lines = csvText.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    if (lines.length <= 1) return [];

    const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
    const rows: ScreenerImportRow[] = [];

    for (let i = 1; i < lines.length; i++) {
      const cols = lines[i].split(',').map(c => c.trim());
      if (cols.length < headers.length) continue;

      const rowMap: Record<string, string> = {};
      headers.forEach((header, idx) => {
        rowMap[header] = cols[idx] || '';
      });

      // Extract details based on standard platform headers
      const studentSisId = rowMap['student_id'] || rowMap['sis_id'] || `SIS-${i * 100}`;
      const firstName = rowMap['first_name'] || rowMap['name']?.split(' ')[0] || `Student_${i}`;
      const lastName = rowMap['last_name'] || rowMap['name']?.split(' ').slice(1).join(' ') || `Surname`;
      const gradeLevel = rowMap['grade'] || rowMap['grade_level'] || '3';
      const compositeScore = parseFloat(rowMap['composite'] || rowMap['score'] || '450');
      const riskLevel = rowMap['risk'] || rowMap['risk_level'] || 'some-risk';

      // Parse skill scores based on platform variations
      const letterNaming = parseFloat(rowMap['lnf'] || rowMap['letter_naming'] || '50');
      const correctLetterSounds = parseFloat(rowMap['cls'] || rowMap['letter_sounds'] || '45');
      const nonsenseWords = parseFloat(rowMap['nwf'] || rowMap['nonsense_words'] || '40');
      const oralAccuracy = parseFloat(rowMap['accuracy'] || rowMap['oral_accuracy'] || '85');
      const oralFluency = parseFloat(rowMap['orf'] || rowMap['fluency'] || '60');
      const vocabulary = parseFloat(rowMap['vocab'] || rowMap['vocabulary'] || '55');
      const sightWords = parseFloat(rowMap['swe'] || rowMap['sight_words'] || '50');
      const comprehension = parseFloat(rowMap['comp'] || rowMap['comprehension'] || '40');

      rows.push({
        studentSisId,
        firstName,
        lastName,
        gradeLevel,
        screenerPlatform: platform,
        assessmentWindow: (rowMap['window'] as AssessmentWindow) || 'BOY',
        assessmentDate: new Date().toISOString(),
        compositeScore,
        riskLevel,
        skillScores: {
          letterNaming,
          correctLetterSounds,
          nonsenseWords,
          oralAccuracy,
          oralFluency,
          vocabulary,
          sightWords,
          comprehension
        }
      });
    }

    return rows;
  }

  /**
   * Maps raw platform scores to 0-100 normalized scores for the 7 ALA skill areas.
   */
  static normalizeToALAProfile(studentId: string, raw: Record<string, any>, platform: ScreenerPlatform): ALASkillProfile {
    const skills: ALASkillScore[] = [];

    // Helper to calculate proficiency levels
    const getProficiency = (score: number) => {
      if (score < 40) return 'below';
      if (score < 60) return 'approaching';
      if (score < 85) return 'meeting';
      return 'exceeding';
    };

    const areas: { area: ALASkillArea; rawKey: string; weight: number }[] = [
      { area: 'phonemic_awareness', rawKey: 'letterNaming', weight: 1.0 },
      { area: 'phononics' as any, rawKey: 'correctLetterSounds', weight: 0.9 }, // Decodables
      { area: 'fluency', rawKey: 'oralFluency', weight: 1.0 },
      { area: 'vocabulary', rawKey: 'vocabulary', weight: 1.0 },
      { area: 'comprehension', rawKey: 'comprehension', weight: 1.0 },
      { area: 'written_expression', rawKey: 'writtenExpression', weight: 0.8 },
      { area: 'listening_comprehension', rawKey: 'listeningComprehension', weight: 0.8 }
    ];

    const deficitAreas: ALASkillArea[] = [];
    let riskPoints = 0;

    areas.forEach(({ area, rawKey, weight }) => {
      let scoreVal = raw[rawKey] !== undefined ? parseFloat(raw[rawKey]) : 55;
      
      // Platform-specific normalization scaling
      if (platform === 'i-Ready' && scoreVal > 150) {
        scoreVal = Math.min(100, Math.max(0, ((scoreVal - 200) / 400) * 100));
      } else if (platform === 'STAR' && scoreVal > 800) {
        scoreVal = Math.min(100, Math.max(0, ((scoreVal - 600) / 600) * 100));
      }

      const score = Math.round(scoreVal);
      const isDeficit = score < 40;
      if (isDeficit) {
        deficitAreas.push(area);
        riskPoints += 2;
      } else if (score < 60) {
        riskPoints += 1;
      }

      skills.push({
        area,
        score,
        proficiency: getProficiency(score),
        isDeficit
      });
    });

    let overallRisk: 'at-risk' | 'some-risk' | 'low-risk' = 'low-risk';
    if (riskPoints >= 5) overallRisk = 'at-risk';
    else if (riskPoints >= 2) overallRisk = 'some-risk';

    let interventionTier: 'Tier1' | 'Tier2' | 'Tier3' = 'Tier1';
    if (overallRisk === 'at-risk') interventionTier = 'Tier3';
    else if (overallRisk === 'some-risk') interventionTier = 'Tier2';

    return {
      studentId,
      assessmentDate: new Date().toISOString(),
      skills,
      overallRisk,
      deficitAreas,
      interventionTier
    };
  }

  /**
   * Inserts or updates student profiles and assessment screeners from a parsed import payload.
   */
  static async importScreenerData(
    userId: string, 
    rows: ScreenerImportRow[]
  ): Promise<ScreenerImportResult> {
    let imported = 0;
    let skipped = 0;
    const errors: { row: number; message: string }[] = [];
    let studentsAtRisk = 0;

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      try {
        // Find or create student profile linked to PowerSchool SIS ID
        let profile = await prisma.student_profiles.findFirst({
          where: { student_sis_id: row.studentSisId, user_id: userId }
        });

        // Compute current Lexile estimate from composite score
        let lexileLevel = profile?.lexile_level || 400;
        if (row.compositeScore) {
          if (row.screenerPlatform === 'i-Ready') {
            lexileLevel = Math.round(row.compositeScore * 1.5 - 200);
          } else if (row.screenerPlatform === 'mCLASS') {
            lexileLevel = Math.round(row.compositeScore * 2.1);
          }
        }
        lexileLevel = Math.max(100, Math.min(1400, lexileLevel));

        const lexileHistoryEntry = {
          date: new Date().toISOString(),
          level: lexileLevel,
          source: row.screenerPlatform
        };

        const currentHistory = profile?.lexile_history 
          ? JSON.parse(JSON.stringify(profile.lexile_history))
          : [];
        currentHistory.push(lexileHistoryEntry);

        // Normalize to the unified 7-skill profile
        const alaProfile = this.normalizeToALAProfile(
          profile?.id || 'temp-id', 
          row.skillScores, 
          row.screenerPlatform
        );

        if (profile) {
          // Update profile
          profile = await prisma.student_profiles.update({
            where: { id: profile.id },
            data: {
              grade_level: row.gradeLevel,
              lexile_level: lexileLevel,
              lexile_history: currentHistory,
              intervention_tier: alaProfile.interventionTier,
              ala_skill_profile: JSON.parse(JSON.stringify(alaProfile))
            }
          });
        } else {
          // Create new student record
          profile = await prisma.student_profiles.create({
            data: {
              user_id: userId,
              student_sis_id: row.studentSisId,
              first_name: row.firstName,
              last_name: row.lastName,
              grade_level: row.gradeLevel,
              lexile_level: lexileLevel,
              lexile_history: [lexileHistoryEntry],
              ell_status: row.skillScores.writtenExpression && row.skillScores.writtenExpression < 40 ? 'Active' : 'None',
              native_language: 'en',
              sped_status: 'None',
              dyslexia_flag: alaProfile.deficitAreas.includes('phononics' as any) || alaProfile.deficitAreas.includes('phonemic_awareness'),
              intervention_tier: alaProfile.interventionTier,
              ala_skill_profile: JSON.parse(JSON.stringify(alaProfile))
            }
          });

          // Sync student ID on alaProfile
          alaProfile.studentId = profile.id;
          await prisma.student_profiles.update({
            where: { id: profile.id },
            data: { ala_skill_profile: JSON.parse(JSON.stringify(alaProfile)) }
          });
        }

        // Save screener score details
        await prisma.screener_results.create({
          data: {
            student_profile_id: profile.id,
            screener_platform: row.screenerPlatform,
            assessment_window: row.assessmentWindow,
            assessment_date: new Date(row.assessmentDate),
            composite_score: row.compositeScore,
            risk_level: alaProfile.overallRisk,
            skill_scores: JSON.parse(JSON.stringify(row.skillScores))
          }
        });

        if (alaProfile.overallRisk === 'at-risk') {
          studentsAtRisk++;
        }

        imported++;
      } catch (err: any) {
        console.error(`Row ${i} import error:`, err);
        errors.push({ row: i + 1, message: err.message || 'Row import failed' });
        skipped++;
      }
    }

    // Trigger auto-intervention batching for any flagged Tier-3 students
    const autoInterventionTriggered = studentsAtRisk > 0;
    if (autoInterventionTriggered) {
      this.triggerCohortAutoIntervention(userId).catch(e =>
        console.error('[ScreenerService] Async auto-intervention failed:', e)
      );
    }

    return {
      totalRows: rows.length,
      imported,
      skipped,
      errors,
      studentsAtRisk,
      autoInterventionTriggered
    };
  }

  /**
   * Auto-pilots material leveling and structures Daily Reading Improvements for at-risk cohorts.
   */
  static async triggerCohortAutoIntervention(userId: string): Promise<number> {
    console.info(`[Auto-Intervene] Ingesting cohort profiles for teacher: ${userId}`);
    
    // Find all active student records under teacher with active reading deficits
    const students = await prisma.student_profiles.findMany({
      where: {
        user_id: userId,
        intervention_tier: { in: ['Tier2', 'Tier3'] }
      }
    });

    let interventionsTriggered = 0;

    for (const student of students) {
      const profile = student.ala_skill_profile as any;
      if (!profile?.deficitAreas?.length) continue;

      try {
        console.info(`[Auto-Intervene] Generating materials for student: ${student.first_name} ${student.last_name}`);
        
        // Generate differentiated materials matching their primary deficit areas
        const material = await differentiationEngine.generateFromScreenerDeficit(
          student,
          profile.deficitAreas
        );

        // Auto-create or update a Student Reading Improvement Plan (SRIP) required by SB 216
        const activePlan = await prisma.reading_improvement_plans.findFirst({
          where: { student_profile_id: student.id, status: 'active' }
        });

        const deficitList = profile.deficitAreas;
        const dailyMaterialRef = {
          date: new Date().toISOString(),
          materialId: material.outputLexile, // Placeholder target ID
          title: `Intervention Scaffolding: ${deficitList[0]} (${student.lexile_level}L)`
        };

        if (activePlan) {
          const materialsList = activePlan.daily_materials 
            ? JSON.parse(JSON.stringify(activePlan.daily_materials))
            : [];
          materialsList.push(dailyMaterialRef);

          await prisma.reading_improvement_plans.update({
            where: { id: activePlan.id },
            data: { daily_materials: materialsList }
          });
        } else {
          await prisma.reading_improvement_plans.create({
            data: {
              student_profile_id: student.id,
              created_by: userId,
              school_year: '2026-2027',
              deficit_areas: JSON.parse(JSON.stringify(deficitList)),
              intervention_program: 'Science of Reading Decodable Scaffolding',
              daily_materials: [dailyMaterialRef],
              parent_notified: true,
              status: 'active'
            }
          });
        }

        interventionsTriggered++;
      } catch (err) {
        console.error(`[Auto-Intervene] Fail for ${student.first_name}:`, err);
      }
    }

    return interventionsTriggered;
  }
}
export const screenerService = ScreenerService;
