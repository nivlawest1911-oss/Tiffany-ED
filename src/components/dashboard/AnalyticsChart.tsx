'use client';

import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
    ChartOptions
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

// Custom Label Wrapping Logic for constraints > 16 chars
const wrapLabel = (str: string, maxLen: number) => {
    if (str.length <= maxLen) return str;
    const words = str.split(' ');
    const lines = [];
    let currentLine = words[0];

    for (let i = 1; i < words.length; i++) {
        if (currentLine.length + 1 + words[i].length <= maxLen) {
            currentLine += ' ' + words[i];
        } else {
            lines.push(currentLine);
            currentLine = words[i];
        }
    }
    lines.push(currentLine);
    return lines;
};

const labels = [
    'Strategic Planning',
    'Compliance Scanning',
    'Curriculum Alignment',
    'Leadership Synthetics',
    'Cognitive Optimizations',
    'Resource Allocation'
];

// Apply wrapping
const wrappedLabels = labels.map(l => Array.isArray(l) ? l : wrapLabel(l, 16));

interface AnalyticsChartProps {
    data?: any;
}

export default function AnalyticsChart({ data: dynamicData }: AnalyticsChartProps) {
    const options: ChartOptions<'line'> = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
                labels: {
                    color: '#94a3b8',
                    font: {
                        family: 'Inter, sans-serif',
                        size: 10
                    }
                }
            },
            tooltip: {
                backgroundColor: 'rgba(2, 6, 23, 0.9)',
                titleColor: '#06b6d4',
                bodyColor: '#cbd5e1',
                borderColor: 'rgba(6, 182, 212, 0.2)',
                borderWidth: 1,
                padding: 12,
                titleFont: { family: 'Inter', weight: 'bold' },
                bodyFont: { family: 'Inter' },
                displayColors: false,
                callbacks: {
                    title: function (context) {
                        const label = context[0].label;
                        // Handle array labels (multiline) for tooltip title
                        if (Array.isArray(label)) {
                            return label.join(' ');
                        }
                        return label;
                    },
                    label: function (context) {
                        return ' ' + context.parsed.y + '% Efficiency';
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: 'rgba(255, 255, 255, 0.02)',
                    drawTicks: false
                },
                ticks: { color: '#64748b', font: { size: 10 }, padding: 10 },
                border: { display: false }
            },
            x: {
                grid: { display: false },
                ticks: {
                    color: '#64748b',
                    font: { size: 9 },
                    autoSkip: false,
                    maxRotation: 0,
                    minRotation: 0
                },
                border: { display: false }
            }
        },
        elements: {
            line: {
                tension: 0.4
            },
            point: {
                radius: 0,
                hitRadius: 20,
                hoverRadius: 4
            }
        }
    };

    const data = dynamicData || {
        labels: wrappedLabels,
        datasets: [
            {
                label: 'District Efficiency',
                data: [65, 72, 78, 85, 92, 98],
                borderColor: '#6366f1',
                backgroundColor: 'rgba(99, 102, 241, 0.1)',
                fill: true,
            },
            {
                label: 'Admin Overhead',
                data: [80, 70, 60, 45, 30, 15],
                borderColor: '#f43f5e',
                backgroundColor: 'transparent',
                borderDash: [5, 5],
            },
        ],
    };

    return (
        <div className="w-full p-4 bg-slate-900/50 rounded-2xl border border-slate-800 backdrop-blur-sm">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Strategic Velocity</h3>
            <Line options={options} data={data} />
        </div>
    );
}
