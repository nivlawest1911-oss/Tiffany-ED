import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { TokenService } from '@/lib/services/token-service';
import { differentiationEngine } from '@/lib/differentiation-engine';
import { BatchDifferentiationRequest, DifferentiationResponse } from '@/types/differentiation';
import { prisma } from '@/lib/prisma';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      sourceInput, 
      targetLexiles, 
      studentProfileIds, 
      dokLevel, 
      gradeLevel, 
      contentType, 
      academicStandard, 
      subject, 
      language 
    } = body as BatchDifferentiationRequest;

    if (!sourceInput || (!targetLexiles?.length && !studentProfileIds?.length)) {
      return NextResponse.json(
        { error: 'Missing parameters. Must provide sourceInput and either targetLexiles or studentProfileIds' },
        { status: 400 }
      );
    }

    // 1. AUTHENTICATE
    const session = await getSession();
    let user: any = session?.user;

    if (!user) {
      user = { id: 'guest-user', name: 'Guest Visitor', tier: 'free' };
    }

    // 2. RETRIEVE LEXILE TARGETS FROM STUDENT PROFILES IF PROVIDED
    let resolvedTargets: { lexile: number; studentId?: string; language?: string }[] = [];

    if (studentProfileIds?.length) {
      const students = await prisma.student_profiles.findMany({
        where: { id: { in: studentProfileIds } }
      });

      resolvedTargets = students.map(student => ({
        lexile: student.lexile_level || 500, // Fallback to 500
        studentId: student.id,
        language: student.native_language || language || 'en'
      }));
    } else if (targetLexiles?.length) {
      resolvedTargets = targetLexiles.map(lexile => ({
        lexile,
        language: language || 'en'
      }));
    }

    // 3. DEDUCT BATCH TOKENS (75 tokens per level generated)
    const uniqueLexiles = Array.from(new Set(resolvedTargets.map(t => t.lexile)));
    const batchCost = uniqueLexiles.length * 75;

    if (user.id !== 'guest-user') {
      const hasFunds = await TokenService.deductTokens(
        user.id, 
        batchCost, 
        {
          transactionType: 'BATCH_DIFFERENTIATION',
          description: `Batch AI Differentiation: ${uniqueLexiles.length} levels`
        }, 
        user.tier
      );

      if (!hasFunds) {
        return NextResponse.json(
          {
            error: 'Insufficient Tokens',
            message: `Your strategic reserves are depleted. Batch requires ${batchCost} tokens. Please refill.`
          },
          { status: 402 }
        );
      }
    }

    // 4. GENERATE MATERIALS PER UNIQUE LEXILE TARGET
    const resultsMap: Record<number, DifferentiationResponse> = {};
    
    for (const target of resolvedTargets) {
      if (!resultsMap[target.lexile]) {
        console.info(`[Batch Differentiate] Generating for Lexile: ${target.lexile}`);
        resultsMap[target.lexile] = await differentiationEngine.generate({
          sourceInput,
          targetLexile: target.lexile,
          dokLevel: Number(dokLevel || 2) as any,
          gradeLevel: gradeLevel || '3',
          contentType: contentType || 'full_bundle',
          academicStandard,
          subject,
          language: target.language || 'en',
          studentProfileId: target.studentId,
          questionCount: 4,
          questionFormats: ['multiple_choice'],
          organizerType: '3-2-1',
          vocabularyCount: 5
        });
      } else if (target.studentId) {
        // If we already generated this Lexile level, simply link the material to the student in the database
        const res = resultsMap[target.lexile];
        await prisma.differentiated_materials.create({
          data: {
            user_id: user.id !== 'guest-user' ? user.id : 'guest-user',
            student_profile_id: target.studentId,
            title: `Differentiation: ${sourceInput.substring(0, 40)} (${res.outputLexile}L)`,
            source_input: sourceInput,
            target_lexile: target.lexile,
            output_lexile: res.outputLexile,
            dok_level: Number(dokLevel || 2),
            content_type: contentType || 'full_bundle',
            generated_content: {
              passage: res.passage,
              vocabulary: res.vocabulary,
              questions: res.questions,
              graphicOrganizer: res.graphicOrganizer,
              citations: res.citations
            } as any,
            academic_standard: academicStandard,
            subject,
            grade_level: gradeLevel,
            language: target.language || 'en',
            tokens_used: Math.round(res.tokensUsed)
          }
        }).catch(err => console.error('[Batch Differentiate] Database link error:', err));
      }
    }

    // Map resolved targets back to results
    const responseList = resolvedTargets.map(target => ({
      studentId: target.studentId,
      lexile: target.lexile,
      result: resultsMap[target.lexile]
    }));

    return NextResponse.json({
      success: true,
      levelsGenerated: uniqueLexiles.length,
      tokensDeducted: batchCost,
      results: responseList
    });
  } catch (error: any) {
    console.error('[API Differentiate Batch] Error:', error);
    return NextResponse.json(
      { error: error.message || 'Batch processing failure' },
      { status: 500 }
    );
  }
}
