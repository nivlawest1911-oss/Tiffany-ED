import { NextResponse, NextRequest } from 'next/server';
export const dynamic = 'force-dynamic';
import { DistrictService } from '@/lib/DistrictService';
import { getSession } from '@/lib/auth';
import { logAuditEvent, AuditCategory, AuditAction } from '@/lib/audit';

// Simple in-memory cache for fleet metrics (with role-based keying)
const fleetCache: Map<string, {
    data: any;
    timestamp: number;
}> = new Map();

const CACHE_TTL = 5000; // 5 seconds cache

export async function GET(req: NextRequest) {
    try {
        const session = await getSession({
            headers: req.headers
        });

        if (!session?.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const user = session.user as any;
        const role = user.role;
        const allowedRoles = ['SUPERINTENDENT', 'EXECUTIVE', 'ADMIN', 'PRINCIPAL'];

        if (!allowedRoles.includes(role)) {
            return NextResponse.json({ error: 'Access Restricted' }, { status: 403 });
        }

        // 1. Institutional Audit: Record Fleet Access
        await logAuditEvent({
            userId: user.id,
            category: AuditCategory.FLEET_COMMAND,
            action: AuditAction.FLEET_ACCESS,
            label: `Fleet View: ${role}`,
            ipAddress: req.headers.get('x-forwarded-for')?.split(',')[0] || undefined,
            userAgent: req.headers.get('user-agent') || undefined,
            metadata: {
                role,
                scope: role === 'PRINCIPAL' ? 'School' : 'District'
            }
        });

        const { searchParams } = new URL(req.url);
        const days = parseInt(searchParams.get('days') || '7');
        const now = Date.now();
        
        // Cache key based on role, schoolId (if principal), and timeframe
        const schoolFilter = role === 'PRINCIPAL' ? user.school_id : null;
        const cacheKey = `${role}_${schoolFilter || 'all'}_${days}`;

        const cached = fleetCache.get(cacheKey);
        if (cached && (now - cached.timestamp) < CACHE_TTL) {
            return NextResponse.json(cached.data);
        }

        // Fetch nodes - filtered if PRINCIPAL
        let nodes = await DistrictService.getAllNodesAcrossDistricts();
        if (role === 'PRINCIPAL' && user.school_id) {
            nodes = nodes.filter(n => n.school_id === user.school_id || n.id === user.school_id);
        }

        // Fetch aggregated intelligence metrics
        const intelligence = await DistrictService.getFleetIntelligence(schoolFilter, days);
        
        // Calculate regional metrics
        const totalActiveNodes = nodes.filter(n => n.status !== 'offline').length;
        const averageIntelligenceLoad = nodes.length > 0 
            ? Math.round(nodes.reduce((acc, n) => acc + n.intelligenceLoad, 0) / nodes.length)
            : 0;
            
        const regionalComplianceScore = nodes.length > 0
            ? Math.round(nodes.reduce((acc, n) => acc + (n.vaultCompliance || 0), 0) / nodes.length)
            : 100;
            
        const responseData = {
            nodes,
            metrics: {
                totalActiveNodes,
                averageIntelligenceLoad,
                regionalComplianceScore,
                activeDirectives: 12,
                intelligence,
                metadata: {
                    role,
                    scope: schoolFilter ? 'School' : 'District',
                    timeframe: `${days}d`
                }
            }
        };

        // Update cache
        fleetCache.set(cacheKey, {
            data: responseData,
            timestamp: now
        });
            
        return NextResponse.json(responseData);
    } catch (error) {
        console.error('Fleet API Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
