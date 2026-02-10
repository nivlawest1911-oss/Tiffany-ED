'use client';

import { Eye, CheckCircle2, Activity } from 'lucide-react';
import EdIntelNode from './layout/EdIntelNode';

interface Observation {
    id: string;
    title: string;
    status: 'RESOLVED' | 'SYNCED' | 'MONITORING' | 'ACTIVE';
    timestamp: string;
}

interface EdIntelIntelligenceNodeProps {
    observations?: Observation[];
}

export default function EdIntelIntelligenceNode({ observations = [] }: EdIntelIntelligenceNodeProps) {
    const defaultObservations: Observation[] = [
        { id: '1', title: 'Student engagement metrics optimized', status: 'RESOLVED', timestamp: new Date().toISOString() },
        { id: '2', title: 'Attendance patterns synchronized', status: 'SYNCED', timestamp: new Date().toISOString() },
        { id: '3', title: 'Behavioral intervention protocols active', status: 'MONITORING', timestamp: new Date().toISOString() },
        { id: '4', title: 'Academic performance tracking live', status: 'ACTIVE', timestamp: new Date().toISOString() },
    ];

    const displayObservations = observations.length > 0 ? observations : defaultObservations;

    const getStatusColor = (status: Observation['status']) => {
        switch (status) {
            case 'RESOLVED': return 'text-green-400 border-green-500/30 bg-green-950/20';
            case 'SYNCED': return 'text-blue-400 border-blue-500/30 bg-blue-950/20';
            case 'MONITORING': return 'text-yellow-400 border-yellow-500/30 bg-yellow-950/20';
            case 'ACTIVE': return 'text-purple-400 border-purple-500/30 bg-purple-950/20';
            default: return 'text-gray-400 border-gray-500/30 bg-gray-950/20';
        }
    };

    const getStatusIcon = (status: Observation['status']) => {
        switch (status) {
            case 'RESOLVED': return <CheckCircle2 className="w-4 h-4" />;
            case 'SYNCED': return <CheckCircle2 className="w-4 h-4" />;
            case 'MONITORING': return <Eye className="w-4 h-4" />;
            case 'ACTIVE': return <Activity className="w-4 h-4" />;
            default: return <Eye className="w-4 h-4" />;
        }
    };

    return (
        <EdIntelNode
            title="INTELLIGENCE NODE // SURVEILLANCE"
            videoSrc="/videos/District Command Update.mp4"
            fallbackImage="/images/dashboard/surveillance-fallback.jpg"
            actionText="OPEN FULL INTELLIGENCE"
            onAction={() => console.log('Opening intelligence...')}
            delay={0.1}
        >
            <div className="space-y-3">
                {displayObservations.map((obs) => (
                    <div
                        key={obs.id}
                        className={`p-3 border rounded-lg transition-all hover:scale-[1.02] ${getStatusColor(obs.status)}`}
                    >
                        <div className="flex items-start gap-3">
                            <div className="mt-0.5 flex-shrink-0">
                                {getStatusIcon(obs.status)}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium">{obs.title}</p>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="text-xs opacity-60">
                                        {new Date(obs.timestamp).toLocaleString()}
                                    </span>
                                    <span className="text-xs px-2 py-0.5 rounded-full bg-black/30 border border-current/20">
                                        {obs.status}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </EdIntelNode>
    );
}
