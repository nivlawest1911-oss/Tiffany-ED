import { analyzeLessonFriction } from '@/utils/lesson-friction';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const { lessonPlan } = await req.json();

        if (!lessonPlan) {
            return new NextResponse("Lesson plan text is required", { status: 400 });
        }

        const analysis = await analyzeLessonFriction(lessonPlan);
        return NextResponse.json(analysis);

    } catch (error) {
        console.error("Friction API Error:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
