import { NextRequest, NextResponse } from 'next/server';
import { streamText } from 'ai';
import { google as aiGoogle } from '@ai-sdk/google';
import { openai as aiOpenAI } from '@ai-sdk/openai';
import { getSession } from '@/lib/auth';
import { TokenService } from '@/lib/services/token-service';
import { ALABAMA_STRATEGIC_DIRECTIVE } from '@/lib/ai-resilience';
import { lexileToGrade } from '@/types/differentiation';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const { 
      sourceInput, 
      targetLexile, 
      dokLevel, 
      gradeLevel, 
      subject, 
      language 
    } = await request.json();

    if (!sourceInput || !targetLexile || !gradeLevel) {
      return NextResponse.json(
        { error: 'Missing required parameters. Required: sourceInput, targetLexile, gradeLevel' },
        { status: 400 }
      );
    }

    // 1. AUTHENTICATE
    const session = await getSession();
    let user: any = session?.user;

    // Fallback to Bearer token if session cookie fails
    if (!user) {
      const authHeader = request.headers.get('Authorization');
      if (authHeader?.startsWith('Bearer ')) {
        user = { id: 'fallback-user', name: 'Authorized User', tier: 'free' };
      }
    }

    if (!user) {
      user = { id: 'guest-user', name: 'Guest Visitor', tier: 'free' };
    }

    // 2. DEDUCT TOKENS (75 tokens)
    const tokenCost = 75;
    if (user.id !== 'guest-user') {
      const hasFunds = await TokenService.deductTokens(
        user.id, 
        tokenCost, 
        {
          transactionType: 'DIFFERENTIATION_STREAM',
          description: `Streaming Differentiation: ${sourceInput.substring(0, 30)}...`
        }, 
        user.tier
      );

      if (!hasFunds) {
        return NextResponse.json(
          {
            error: 'Insufficient Tokens',
            message: 'Your strategic reserves are depleted. Please refill your token wallet to continue.'
          },
          { status: 402 }
        );
      }
    }

    // 3. BUILD PROMPT WITH COMPLIANCE DIRECTIVE
    const systemPrompt = `
${ALABAMA_STRATEGIC_DIRECTIVE}

[ROLE]
You are a highly skilled Curriculum Architect & Literacy Specialist. You excel at Science of Reading (SOR) principles and the Alabama Literacy Act (ALA) mandates.

[TASK]
Differentiate the following text or topic into a reading passage.
Target Lexile level: ${targetLexile}L (approx. equivalent to ${lexileToGrade(Number(targetLexile))})
Target Grade Level: ${gradeLevel}
Subject: ${subject || 'General'}
Language: ${language || 'en'}

[PASSAGE REQUIREMENTS]
- Adjust vocabulary complexity, sentence length, and syntax structure to fit the Lexile level of exactly ${targetLexile}L.
- Do not return any JSON, headers, questions, vocabulary or graphic organizers.
- Stream ONLY the pure differentiated reading passage itself.
`;

    // Initialize provider models with resilience
    const googleApiKey = (process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GOOGLE_API_KEY || '').trim();
    const openaiApiKey = (process.env.OPENAI_API_KEY || '').trim();

    if (!googleApiKey && !openaiApiKey) {
      // Offline simulation fallback for presentation safety
      const encoder = new TextEncoder();
      const readableStream = new ReadableStream({
        async start(controller) {
          const simulatedResponse = `[SIMULATION PROTOCOL: OFFLINE DEMO] 
Welcome to the EdIntel Sovereign Differentiation Engine.
Differentiating topic "${sourceInput.substring(0, 45)}" for Grade ${gradeLevel} at target Lexile ${targetLexile}L.

Reading Passage:
The water cycle is the continuous movement of water on, above, and below the surface of the Earth. Water evaporates from the surface, rises into the atmosphere, cools and condenses into rain or snow in clouds, and falls again to the surface as precipitation. The cycle repeats forever, ensuring all living organisms have access to water. In South Alabama, rivers like the Mobile River carry water back to the Gulf of Mexico, completing this gorgeous natural loop.`;
          
          const words = simulatedResponse.split(' ');
          for (const word of words) {
            controller.enqueue(encoder.encode(word + ' '));
            await new Promise(resolve => setTimeout(resolve, 30));
          }
          controller.close();
        }
      });
      return new Response(readableStream, {
        headers: { 'Content-Type': 'text/plain; charset=utf-8' }
      });
    }

    // Use Gemini as primary and OpenAI as fallback
    try {
      const result = await streamText({
        model: googleApiKey ? aiGoogle('gemini-1.5-flash') : aiOpenAI('gpt-4o'),
        system: systemPrompt,
        prompt: `Differentiate this content to target Lexile ${targetLexile}L:\n\n${sourceInput}`,
        temperature: 0.5,
      });

      return result.toTextStreamResponse();
    } catch (streamError: any) {
      console.warn('[Stream Failover] Primary stream failed, pivoting. Error:', streamError.message);
      // Failover to secondary
      const result = await streamText({
        model: googleApiKey && openaiApiKey ? aiOpenAI('gpt-4o') : aiGoogle('gemini-1.5-flash'),
        system: systemPrompt,
        prompt: `Differentiate this content to target Lexile ${targetLexile}L:\n\n${sourceInput}`,
        temperature: 0.5,
      });

      return result.toTextStreamResponse();
    }
  } catch (error: any) {
    console.error('[API Differentiate Stream] Error:', error);
    return NextResponse.json(
      { error: error.message || 'Stream processing failed' },
      { status: 500 }
    );
  }
}
