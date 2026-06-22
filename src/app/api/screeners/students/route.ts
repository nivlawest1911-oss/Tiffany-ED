import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { StudentProfileSummary } from '@/types/differentiation';

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    let user: any = session?.user;

    if (!user) {
      user = { id: 'guest-user', name: 'Guest Visitor' };
    }

    const { searchParams } = new URL(request.url);
    const grade = searchParams.get('grade');
    const risk = searchParams.get('risk');
    const search = searchParams.get('search');

    // Query DB
    const studentRecords = await prisma.student_profiles.findMany({
      where: {
        user_id: user.id,
        ...(grade ? { grade_level: grade } : {}),
        ...(search ? {
          OR: [
            { first_name: { contains: search, mode: 'insensitive' } },
            { last_name: { contains: search, mode: 'insensitive' } },
            { student_sis_id: { contains: search, mode: 'insensitive' } }
          ]
        } : {})
      },
      include: {
        differentiated_materials: { select: { id: true } },
        screener_results: {
          orderBy: { assessment_date: 'desc' },
          take: 1
        }
      },
      orderBy: { last_name: 'asc' }
    });

    // Form summary structure
    const summaries: StudentProfileSummary[] = studentRecords.map(student => {
      const latestScreener = student.screener_results[0];
      const alaProfile = student.ala_skill_profile 
        ? JSON.parse(JSON.stringify(student.ala_skill_profile))
        : null;

      // Determine Lexile trend from history
      const history = student.lexile_history 
        ? JSON.parse(JSON.stringify(student.lexile_history))
        : [];
      let lexileTrend: 'up' | 'down' | 'flat' = 'flat';
      if (history.length >= 2) {
        const last = history[history.length - 1].level;
        const prev = history[history.length - 2].level;
        if (last > prev) lexileTrend = 'up';
        else if (last < prev) lexileTrend = 'down';
      }

      return {
        id: student.id,
        sisId: student.student_sis_id,
        firstName: student.first_name,
        lastName: student.last_name,
        gradeLevel: student.grade_level,
        lexileLevel: student.lexile_level,
        lexileTrend,
        riskLevel: (latestScreener?.risk_level as any) || 'low-risk',
        interventionTier: student.intervention_tier,
        ellStatus: student.ell_status,
        spedStatus: student.sped_status,
        dysxiaFlag: student.dyslexia_flag, // Match typo or interface
        dyslexiaFlag: student.dyslexia_flag,
        alaProfile,
        lastScreenerDate: latestScreener ? latestScreener.assessment_date.toISOString() : null,
        materialCount: student.differentiated_materials.length
      } as any;
    });

    // Filter by risk level if requested in query
    const filteredSummaries = risk 
      ? summaries.filter(s => s.riskLevel === risk)
      : summaries;

    return NextResponse.json(filteredSummaries);
  } catch (error: any) {
    console.error('[API Students GET] Error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to retrieve roster records' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    let user: any = session?.user;

    if (!user) {
      user = { id: 'guest-user', name: 'Guest Visitor' };
    }

    const body = await request.json();
    const { 
      studentSisId, 
      firstName, 
      lastName, 
      gradeLevel, 
      lexileLevel, 
      ellStatus, 
      spedStatus, 
      dyslexiaFlag, 
      interventionTier 
    } = body;

    if (!studentSisId || !firstName || !lastName || !gradeLevel) {
      return NextResponse.json(
        { error: 'Missing required parameters. Required: studentSisId, firstName, lastName, gradeLevel' },
        { status: 400 }
      );
    }

    const lexile = lexileLevel ? Number(lexileLevel) : 400;
    const historyEntry = {
      date: new Date().toISOString(),
      level: lexile,
      source: 'manual'
    };

    // Create student profile record in database
    const newStudent = await prisma.student_profiles.upsert({
      where: {
        user_id_student_sis_id: {
          user_id: user.id,
          student_sis_id: studentSisId
        }
      },
      update: {
        first_name: firstName,
        last_name: lastName,
        grade_level: gradeLevel,
        lexile_level: lexile,
        ell_status: ellStatus || 'None',
        sped_status: spedStatus || 'None',
        dyslexia_flag: !!dyslexiaFlag,
        intervention_tier: interventionTier || 'Tier1'
      },
      create: {
        user_id: user.id,
        student_sis_id: studentSisId,
        first_name: firstName,
        last_name: lastName,
        grade_level: gradeLevel,
        lexile_level: lexile,
        lexile_history: [historyEntry],
        ell_status: ellStatus || 'None',
        sped_status: spedStatus || 'None',
        dyslexia_flag: !!dyslexiaFlag,
        intervention_tier: interventionTier || 'Tier1'
      }
    });

    return NextResponse.json(newStudent);
  } catch (error: any) {
    console.error('[API Students POST] Error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to persist student record' },
      { status: 500 }
    );
  }
}
