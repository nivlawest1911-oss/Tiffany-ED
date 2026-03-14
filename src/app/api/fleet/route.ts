import { NextRequest, NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import { getSession } from '@/lib/auth';
import { DistrictService } from '@/lib/DistrictService';

// Simple in-memory cache for fleet metrics
let fleetCache: {
    data: any;
    timestamp: number;
} | null = null;

const CACHE_TTL = 3000; // 3 seconds cache

export async function GET() {
    try {
        const now = Date.now();
        if (fleetCache && (now - fleetCache.timestamp) < CACHE_TTL) {
            return NextResponse.json(fleetCache.data);
        }

        const nodes = await DistrictService.getAllNodesAcrossDistricts();
        
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
                activeDirectives: 12
            }
        };

        // Update cache
        fleetCache = {
            data: responseData,
            timestamp: now
        };
            
        return NextResponse.json(responseData);
    } catch (error) {
        console.error('Fleet API Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
