import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'EdIntel — AI Operating System for Education Leaders';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'linear-gradient(145deg, #0a0a0a 0%, #050505 50%, #0d0d0d 100%)',
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                {/* Subtle grid overlay */}
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundImage:
                            'linear-gradient(rgba(212,175,55,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.03) 1px, transparent 1px)',
                        backgroundSize: '60px 60px',
                        display: 'flex',
                    }}
                />

                {/* Gold glow */}
                <div
                    style={{
                        position: 'absolute',
                        width: '500px',
                        height: '500px',
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(212,175,55,0.12) 0%, transparent 70%)',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        display: 'flex',
                    }}
                />

                {/* Top accent line */}
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '4px',
                        background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)',
                        display: 'flex',
                    }}
                />

                {/* Logo / brand mark */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '80px',
                        height: '80px',
                        borderRadius: '24px',
                        border: '2px solid rgba(212,175,55,0.3)',
                        background: 'rgba(212,175,55,0.08)',
                        marginBottom: '32px',
                    }}
                >
                    <div
                        style={{
                            fontSize: '36px',
                            fontWeight: 900,
                            color: '#D4AF37',
                            display: 'flex',
                        }}
                    >
                        E
                    </div>
                </div>

                {/* Title */}
                <div
                    style={{
                        fontSize: '72px',
                        fontWeight: 900,
                        color: '#FFFFFF',
                        letterSpacing: '-2px',
                        textTransform: 'uppercase',
                        marginBottom: '16px',
                        display: 'flex',
                    }}
                >
                    EdIntel
                </div>

                {/* Subtitle */}
                <div
                    style={{
                        fontSize: '18px',
                        fontWeight: 600,
                        color: '#D4AF37',
                        letterSpacing: '8px',
                        textTransform: 'uppercase',
                        marginBottom: '48px',
                        display: 'flex',
                    }}
                >
                    AI Operating System for Education
                </div>

                {/* Bottom tagline */}
                <div
                    style={{
                        fontSize: '14px',
                        color: 'rgba(255,255,255,0.4)',
                        letterSpacing: '4px',
                        textTransform: 'uppercase',
                        display: 'flex',
                    }}
                >
                    Institutional Intelligence • Sovereign Analytics • Neural Delegation
                </div>

                {/* Bottom accent line */}
                <div
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '4px',
                        background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)',
                        display: 'flex',
                    }}
                />
            </div>
        ),
        {
            ...size,
        }
    );
}
