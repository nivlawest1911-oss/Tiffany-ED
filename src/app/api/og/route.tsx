import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);

    const schoolName = searchParams.get('school') || 'Your School';
    const plan = searchParams.get('plan') || 'Professional';
    const price = searchParams.get('price') || '$39.99';
    const generator = searchParams.get('generator') || '';

    return new ImageResponse(
        (
            <div
                style={{
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#0a0a0f',
                    backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(168, 85, 247, 0.15) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(236, 72, 153, 0.15) 0%, transparent 50%)',
                }}
            >
                {/* EdIntel Logo & Title */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '20px',
                        marginBottom: '48px',
                    }}
                >
                    <div
                        style={{
                            width: '80px',
                            height: '80px',
                            background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
                            borderRadius: '16px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 20px 40px rgba(168, 85, 247, 0.4)',
                        }}
                    >
                        <span style={{ fontSize: '48px' }}>✨</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <h1
                            style={{
                                fontSize: '56px',
                                fontWeight: 'bold',
                                color: 'white',
                                margin: 0,
                                lineHeight: 1,
                            }}
                        >
                            EdIntel
                        </h1>
                        <span
                            style={{
                                fontSize: '28px',
                                background: 'linear-gradient(90deg, #a855f7 0%, #ec4899 100%)',
                                backgroundClip: 'text',
                                color: 'transparent',
                                fontWeight: '600',
                            }}
                        >
                            Professional
                        </span>
                    </div>
                </div>

                {/* School Name */}
                {schoolName !== 'Your School' && (
                    <h2
                        style={{
                            fontSize: '42px',
                            color: '#c4b5fd',
                            margin: '0 0 32px 0',
                            textAlign: 'center',
                            fontWeight: '600',
                        }}
                    >
                        {schoolName}
                    </h2>
                )}

                {/* Generator Name */}
                {generator && (
                    <div
                        style={{
                            fontSize: '28px',
                            color: '#e9d5ff',
                            marginBottom: '32px',
                            padding: '12px 32px',
                            background: 'rgba(168, 85, 247, 0.15)',
                            borderRadius: '12px',
                            border: '2px solid rgba(168, 85, 247, 0.3)',
                        }}
                    >
                        {generator}
                    </div>
                )}

                {/* Plan & Price Cards */}
                <div
                    style={{
                        display: 'flex',
                        gap: '48px',
                        marginTop: '24px',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            padding: '32px 48px',
                            background: 'rgba(168, 85, 247, 0.1)',
                            borderRadius: '20px',
                            border: '3px solid rgba(168, 85, 247, 0.4)',
                            boxShadow: '0 10px 30px rgba(168, 85, 247, 0.2)',
                        }}
                    >
                        <span style={{ fontSize: '22px', color: '#d8b4fe', marginBottom: '8px' }}>
                            Plan
                        </span>
                        <span style={{ fontSize: '38px', fontWeight: 'bold', color: 'white' }}>
                            {plan}
                        </span>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            padding: '32px 48px',
                            background: 'rgba(236, 72, 153, 0.1)',
                            borderRadius: '20px',
                            border: '3px solid rgba(236, 72, 153, 0.4)',
                            boxShadow: '0 10px 30px rgba(236, 72, 153, 0.2)',
                        }}
                    >
                        <span style={{ fontSize: '22px', color: '#fbcfe8', marginBottom: '8px' }}>
                            Price
                        </span>
                        <span style={{ fontSize: '38px', fontWeight: 'bold', color: 'white' }}>
                            {price}
                        </span>
                    </div>
                </div>

                {/* Tagline */}
                <p
                    style={{
                        fontSize: '26px',
                        color: '#c4b5fd',
                        marginTop: '48px',
                        textAlign: 'center',
                        maxWidth: '900px',
                        lineHeight: 1.4,
                    }}
                >
                    AI-Powered Education Platform • Mobile County Schools
                </p>

                {/* Badge */}
                <div
                    style={{
                        marginTop: '32px',
                        padding: '12px 28px',
                        background: 'linear-gradient(90deg, #a855f7 0%, #ec4899 100%)',
                        borderRadius: '24px',
                        fontSize: '20px',
                        fontWeight: '600',
                        color: 'white',
                        boxShadow: '0 8px 24px rgba(168, 85, 247, 0.4)',
                    }}
                >
                    30-Day Free Trial
                </div>
            </div>
        ),
        {
            width: 1200,
            height: 630,
        }
    );
}
