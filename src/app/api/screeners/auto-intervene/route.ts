import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { screenerService } from '@/lib/screener-service';
import { prisma } from '@/lib/prisma';
import { differentiationEngine } from '@/lib/differentiation-engine';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    let user: any = session?.user;

    if (!user) {
      user = { id: 'guest-user', name: 'Guest Visitor' };
    }

    const body = await request.json().catch(() => ({}));
    const { studentProfileIds } = body;

    let studentsToIntervene = [];

    if (studentProfileIds?.length) {
      studentsToIntervene = await prisma.student_profiles.findMany({
        where: { id: { in: studentProfileIds }, user_id: user.id }
      });
    } else {
      // Run for all Tier 2 / Tier 3 students under this teacher
      studentsToIntervene = await prisma.student_profiles.findMany({
        where: { user_id: user.id, intervention_tier: { in: ['Tier2', 'Tier3'] } }
      });
    }

    let count = 0;

    for (const student of studentsToIntervene) {
      const profile = student.ala_skill_profile as any;
      if (!profile?.deficitAreas?.length) continue;

      try {
        // Generate differentiated materials matching their primary deficit areas
        const material = await differentiationEngine.generateFromScreenerDeficit(
          student,
          profile.deficitAreas
        );

        // Update or create active reading plan
        const activePlan = await prisma.reading_improvement_plans.findFirst({
          where: { student_profile_id: student.id, status: 'active' }
        });

        const dailyMaterialRef = {
          date: new Date().toISOString(),
          materialId: material.outputLexile || 500,
          title: `Auto-Scaffold: ${profile.deficitAreas[0]} (${student.lexile_level}L)`
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
              created_by: user.id,
              school_year: '2026-2027',
              deficit_areas: JSON.parse(JSON.stringify(profile.deficitAreas)),
              intervention_program: 'Orton-Gillingham Adaptive Alignment',
              daily_materials: [dailyMaterialRef],
              parent_notified: true,
              status: 'active'
            }
          });
        }

        count++;
      } catch (err) {
        console.error(`[Auto-Intervene API Fail] For student ${student.first_name}:`, err);
      }
    }

    return NextResponse.json({
      success: true,
      studentsEvaluated: studentsToIntervene.length,
      interventionsTriggered: count
    });
  } catch (error: any) {
    console.error('[API Auto Intervene] Error:', error);
    return NextResponse.json(
      { error: error.message || 'Auto-intervention cohort loop failed' },
      { status: 500 }
    );
  }
}
