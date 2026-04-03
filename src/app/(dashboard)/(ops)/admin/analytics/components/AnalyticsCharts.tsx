'use client';

import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell,
    PieChart,
    Pie,
    AreaChart,
    Area
} from 'recharts';

const TOOLTIP_STYLE = {
    backgroundColor: 'rgba(5, 5, 8, 0.98)',
    border: '1px solid rgba(197,164,126,0.5)',
    borderRadius: '24px',
    boxShadow: '0 40px 100px rgba(0,0,0,0.9)',
    fontSize: '9px',
    fontWeight: '900',
    textTransform: 'uppercase',
    padding: '20px',
    backdropFilter: 'blur(30px)',
} as React.CSSProperties;

const COLORS = ['#C5A47E', '#8E795E', '#D9C1A3', '#6A5A46', '#B09677', '#E5D5C0', '#4A3D2F'];

interface AnalyticsChartsProps {
    data: any[];
}

export function AttendanceBarChart({ data }: AnalyticsChartsProps) {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
                <CartesianGrid strokeDasharray="10 10" stroke="rgba(255,255,255,0.01)" vertical={false} />
                <XAxis
                    dataKey="school_name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: 'rgba(255,255,255,0.2)', fontSize: 9, fontWeight: 900, textAnchor: 'middle' }}
                    dy={15}
                />
                <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: 'rgba(255,255,255,0.2)', fontSize: 9, fontWeight: 900 }}
                />
                <Tooltip
                    cursor={{ fill: 'rgba(197,164,126,0.03)' }}
                    contentStyle={TOOLTIP_STYLE}
                />
                <Bar dataKey="avg_attendance" radius={[12, 12, 0, 0]}>
                    {data.map((entry, index) => (
                        <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                            opacity={0.7}
                            className="transition-all hover:opacity-100 cursor-pointer"
                        />
                    ))}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    );
}

export function CapacityPieChart({ data }: AnalyticsChartsProps) {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <PieChart>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={95}
                    paddingAngle={8}
                    dataKey="total_students"
                    stroke="none"
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} className="hover:opacity-60 transition-opacity cursor-pointer" />
                    ))}
                </Pie>
                <Tooltip contentStyle={TOOLTIP_STYLE} />
            </PieChart>
        </ResponsiveContainer>
    );
}

export function ThroughputAreaChart({ data }: AnalyticsChartsProps) {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
                <defs>
                    <linearGradient id="neuralGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#C5A47E" stopOpacity={0.6} />
                        <stop offset="50%" stopColor="#C5A47E" stopOpacity={0.15} />
                        <stop offset="100%" stopColor="#C5A47E" stopOpacity={0} />
                    </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="20 20" stroke="rgba(255,255,255,0.01)" vertical={false} />
                <XAxis dataKey="school_name" hide={true} />
                <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: 'rgba(255,255,255,0.15)', fontSize: 9, fontWeight: 900 }}
                    dx={-10}
                />
                <Tooltip contentStyle={TOOLTIP_STYLE} />
                <Area
                    type="monotone"
                    dataKey="total_students"
                    stroke="#C5A47E"
                    strokeWidth={4}
                    fillOpacity={1}
                    fill="url(#neuralGradient)"
                    animationDuration={4000}
                    strokeLinecap="round"
                />
            </AreaChart>
        </ResponsiveContainer>
    );
}
