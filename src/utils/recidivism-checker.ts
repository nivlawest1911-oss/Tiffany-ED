export interface RecidivismAlert {
    detected: boolean;
    patternType?: 'frequency' | 'severity' | 'escalation';
    incidentCount?: number;
    period?: string;
    intensity?: 'low' | 'medium' | 'high';
    message?: string;
}

// Mock database of incident history
const MOCK_INCIDENT_HISTORY: Record<string, { date: string; type: string; severity: 'low' | 'medium' | 'high' }[]> = {
    '1': [ // Student A - Frequent disruptions
        { date: '2023-10-25', type: 'Disruption', severity: 'low' },
        { date: '2023-10-28', type: 'Disruption', severity: 'low' },
        { date: '2023-11-01', type: 'Disruption', severity: 'medium' },
    ],
    '2': [ // Student B - Escalating aggression
        { date: '2023-10-20', type: 'Verbal', severity: 'low' },
        { date: '2023-11-02', type: 'Verbal', severity: 'high' },
    ],
    '3': [], // Student C - Clean record
};

export async function checkRecidivism(studentId: string, incidentType: string): Promise<RecidivismAlert> {
    // Simulate DB lookup delay
    await new Promise(resolve => setTimeout(resolve, 300));

    const history = MOCK_INCIDENT_HISTORY[studentId] || [];

    // 1. Frequency Check: 3+ incidents in history
    if (history.length >= 3) {
        return {
            detected: true,
            patternType: 'frequency',
            incidentCount: history.length + 1, // Including current
            period: '2 weeks',
            intensity: 'high',
            message: `Pattern Detected: ${history.length + 1}th incident in 2 weeks.`,
        };
    }

    // 2. Escalation Check: Last incident was high severity
    const lastIncident = history[history.length - 1];
    if (lastIncident && lastIncident.severity === 'high') {
        return {
            detected: true,
            patternType: 'escalation',
            incidentCount: history.length + 1,
            period: '1 month',
            intensity: 'high',
            message: 'Escalation Alert: Follows a high-severity incident.',
        }
    }

    return { detected: false };
}
