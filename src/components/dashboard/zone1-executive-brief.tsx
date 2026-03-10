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
    const [source, setSource] = useState<'SWARM' | 'LLM'>('LLM');

    useEffect(() => {
        const fetchBriefing = async () => {
            try {
                // Check if we have a fresh swarm result (Phase 4)
                const swarmResultStr = localStorage.getItem('edintel_swarm_result');
                if (swarmResultStr) {
                    const swarmResult = JSON.parse(swarmResultStr);
                    if (swarmResult.finalSynthesis) {
                        setSummary(swarmResult.finalSynthesis);
                        setSource('SWARM');
                        setIsLoading(false);
                        return;
                    }
                }

                // Fallback to dynamic prompt generation
                // Check for onboarding context
                const onboardingDataStr = localStorage.getItem('edintel_onboarding_data');
                const onboardingData = onboardingDataStr ? JSON.parse(onboardingDataStr) : null;

                let dynamicPrompt = "Generate a 4-line executive briefing for a School District Superintendent. Format: LINE1: [District/Status], LINE2: [Operational Metric], LINE3: [Alert/Insight], LINE4: [Action Directive]. Keep it professional, urgent, and strategic.";

                if (onboardingData) {
                    const { role, districtName, objective, swarmAuthorized } = onboardingData;
                    const swarmStatus = swarmAuthorized ? "SWARM STATUS: ACTIVE" : "SWARM STATUS: STANDBY";

                    dynamicPrompt = `Generate a 4-line tactical briefing for an EdIntel ${role}. Site: ${districtName}. 
                    Primary Objective: ${objective}. 
                    ${swarmStatus}.
                    Format: 
                    LINE1: [${districtName} // ${role} Status // ${swarmStatus}], 
                    LINE2: [Strategic Metric for ${objective}], 
                    LINE3: [Insight related to ${objective}], 
                    LINE4: [Immediate Action Directive]. 
                    Keep it cinematic, high-fidelity, and relevant to the objective.`;
                }

                const response = await fetch('/api/generate', {
                    method: 'POST',
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        prompt: dynamicPrompt,
                        generatorId: 'dashboard-briefing'
                    })
                });

                if (!response.ok) throw new Error('Generation failed');

                const text = await response.text();
                if (text) {
                    setSummary(text);
                    setSource('LLM');
                }
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
                source={source}
                videoSrc="/videos/District_Command_Update.mp4"
            />
        </div>
    );
}
