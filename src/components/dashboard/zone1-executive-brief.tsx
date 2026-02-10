'use client';

import React, { useState, useEffect } from 'react';
import { EdIntelBriefing } from './EdIntelBriefing';

const DEFAULT_BRIEFING = `DISTRICT: Mobile County Schools
STATUS: Initializing Neural Link...
ALERT: Awaiting EdIntel credentials.
ACTION: Initialize tactical interface.`;

export function ExecutiveBrief() {
    const [summary, setSummary] = useState(DEFAULT_BRIEFING);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchBriefing = async () => {
            try {
                const response = await fetch('/api/generate', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        prompt: "Generate a 4-line executive briefing for a School District Superintendent. Format: LINE1: [District/Status], LINE2: [Operational Metric], LINE3: [Alert/Insight], LINE4: [Action Directive]. Keep it professional, urgent, and strategic.",
                        generatorId: 'dashboard-briefing'
                    })
                });

                if (!response.ok) throw new Error('Generation failed');

                // For streaming response, we might need a better parser if we want to stream into the briefing
                // but for now we'll just get the text.
                const text = await response.text();
                if (text) setSummary(text);
            } catch (error) {
                console.error("Briefing Error:", error);
                setSummary(`CONNECTION: Neural Link Interrupted
STATUS: Safeguards Active
ALERT: API Config Required
ACTION: Check Cloud Console`);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBriefing();
    }, []);

    return (
        <div className="grid grid-cols-1 gap-6 mb-8">
            <EdIntelBriefing
                summary={summary}
                loading={isLoading}
                videoSrc="/videos/District_Command_Update.mp4"
            />
        </div>
    );
}
