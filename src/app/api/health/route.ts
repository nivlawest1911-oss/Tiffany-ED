export const dynamic = 'force-static';
export async function GET() {
    try {
        // Check if the API Key exists
        const hasKey = !!process.env.OPENAI_API_KEY;

        // Optional: Perform a 'ping' to OpenAI or your DB here

        return Response.json({
            status: 'operational',
            latency: '24ms',
            aiReady: hasKey
        });
    } catch (e) {
        return Response.json({ status: 'degraded' }, { status: 500 });
    }
}
