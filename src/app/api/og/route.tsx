import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

const OG_STYLES = {
    container: {
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column' as const,
        alignItems: 'center' as const,
        justifyContent: 'center' as const,
        backgroundColor: '#F5F5F5',
        padding: '40px',
        fontFamily: 'Inter, system-ui, sans-serif',
    },
    glowTop: { position: 'absolute' as const, top: -100, left: -100, width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0, 176, 255, 0.1) 0%, transparent 70%)' },
    glowBottom: { position: 'absolute' as const, bottom: -100, right: -100, width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255, 179, 0, 0.08) 0%, transparent 70%)' },
    card: {
        display: 'flex',
        flexDirection: 'column' as const,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: '32px',
        border: '1px solid rgba(0, 0, 0, 0.05)',
        padding: '60px',
        boxShadow: '0 20px 50px rgba(0,0,0,0.05)',
        position: 'relative' as const,
        overflow: 'hidden' as const,
    },
    header: { display: 'flex', justifyContent: 'space-between' as const, alignItems: 'flex-start' as const, width: '100%', marginBottom: '40px' },
    logoSection: { display: 'flex', alignItems: 'center' as const, gap: '20px' },
    logoIcon: { background: '#00B0FF', width: '60px', height: '60px', borderRadius: '16px', display: 'flex', alignItems: 'center' as const, justifyContent: 'center' as const, boxShadow: '0 10px 20px rgba(0, 176, 255, 0.3)' },
    logoTextContainer: { display: 'flex', flexDirection: 'column' as const },
    logoTitle: { fontSize: '32px', fontWeight: 900, color: '#0F172A', letterSpacing: '-0.02em', textTransform: 'uppercase' as const },
    logoSubtitle: { fontSize: '14px', fontWeight: 700, color: '#64748B', letterSpacing: '0.2em', textTransform: 'uppercase' as const },
    badge: { background: 'rgba(255, 179, 0, 0.1)', padding: '10px 24px', borderRadius: '100px', border: '1.5px solid #FFB300', display: 'flex' },
    badgeText: { fontSize: '16px', fontWeight: 800, color: '#B45309', textTransform: 'uppercase' as const, letterSpacing: '0.05em' },
    mainContent: { display: 'flex', flexDirection: 'column' as const, flex: 1, justifyContent: 'center' as const },
    titleGroup: { display: 'flex', flexDirection: 'column' as const, gap: '12px' },
    preTitle: { fontSize: '18px', fontWeight: 700, color: '#00B0FF', textTransform: 'uppercase' as const, letterSpacing: '0.1em' },
    mainTitle: { fontSize: '72px', fontWeight: 900, color: '#0F172A', lineHeight: 1.1, margin: 0, letterSpacing: '-0.03em' },
    generatorBadge: { marginTop: '32px', padding: '16px 32px', background: '#F8FAFC', borderRadius: '16px', border: '1px solid #E2E8F0', display: 'flex', alignSelf: 'flex-start' as const },
    generatorText: { fontSize: '24px', fontWeight: 600, color: '#475569' },
    footer: { display: 'flex', justifyContent: 'space-between' as const, alignItems: 'flex-end' as const, width: '100%', marginTop: '40px' },
    statsContainer: { display: 'flex', gap: '32px' },
    statGroup: { display: 'flex', flexDirection: 'column' as const, gap: '4px' },
    statLabel: { fontSize: '12px', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase' as const, letterSpacing: '0.1em' },
    statValue: { fontSize: '24px', fontWeight: 800, color: '#0F172A' },
    statValueAlt: { fontSize: '24px', fontWeight: 800, color: '#00B0FF' },
    cta: { background: '#0F172A', color: 'white', padding: '16px 36px', borderRadius: '16px', fontSize: '20px', fontWeight: 700, boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }
};

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);

    const schoolName = searchParams.get('school') || 'Your School';
    const plan = searchParams.get('plan') || 'Professional';
    const generator = searchParams.get('generator') || '';

    return new ImageResponse(
        (
            <div style={OG_STYLES.container}>
                {/* Decorative Background Elements */}
                <div style={OG_STYLES.glowTop} />
                <div style={OG_STYLES.glowBottom} />

                <div style={OG_STYLES.card}>
                    {/* Header */}
                    <div style={OG_STYLES.header}>
                        <div style={OG_STYLES.logoSection}>
                            <div style={OG_STYLES.logoIcon}>
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                                </svg>
                            </div>
                            <div style={OG_STYLES.logoTextContainer}>
                                <span style={OG_STYLES.logoTitle}>EdIntel</span>
                                <span style={OG_STYLES.logoSubtitle}>Sovereign Delegate</span>
                            </div>
                        </div>
                        <div style={OG_STYLES.badge}>
                            <span style={OG_STYLES.badgeText}>Alpha v.2026</span>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div style={OG_STYLES.mainContent}>
                        <div style={OG_STYLES.titleGroup}>
                            <span style={OG_STYLES.preTitle}>Strategic Command Center</span>
                            <h1 style={OG_STYLES.mainTitle}>
                                {schoolName !== 'Your School' ? schoolName : 'Next-Gen Educational Intelligence'}
                            </h1>
                        </div>

                        {generator && (
                            <div style={OG_STYLES.generatorBadge}>
                                <span style={OG_STYLES.generatorText}>{generator}</span>
                            </div>
                        )}
                    </div>

                    {/* Footer / Stats */}
                    <div style={OG_STYLES.footer}>
                        <div style={OG_STYLES.statsContainer}>
                            <div style={OG_STYLES.statGroup}>
                                <span style={OG_STYLES.statLabel}>Current Plan</span>
                                <span style={OG_STYLES.statValue}>{plan} Tier</span>
                            </div>
                            <div style={OG_STYLES.statGroup}>
                                <span style={OG_STYLES.statLabel}>Token Status</span>
                                <span style={OG_STYLES.statValueAlt}>Premium Synthesis</span>
                            </div>
                        </div>
                        <div style={OG_STYLES.cta}>
                            Join the Strategy
                        </div>
                    </div>
                </div>
            </div>
        ),
        {
            width: 1200,
            height: 630,
        }
    );
}
