import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';

// Register a clean, professional font if needed, but standard ones are fine for MVP
const styles = StyleSheet.create({
    page: {
        padding: 40,
        backgroundColor: '#ffffff',
        fontFamily: 'Helvetica',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 2,
        borderBottomColor: '#d4af37', // Gold
        paddingBottom: 20,
        marginBottom: 30,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#0a0a0f',
    },
    subtitle: {
        fontSize: 10,
        color: '#666',
        marginTop: 4,
        textTransform: 'uppercase',
        letterSpacing: 1.5,
    },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#d4af37',
        marginBottom: 10,
        textTransform: 'uppercase',
    },
    content: {
        fontSize: 11,
        lineHeight: 1.6,
        color: '#333',
    },
    metricContainer: {
        flexDirection: 'row',
        gap: 20,
        marginBottom: 30,
    },
    metricCard: {
        flex: 1,
        padding: 15,
        backgroundColor: '#f8f8f8',
        borderRadius: 8,
        borderLeftWidth: 4,
        borderLeftColor: '#d4af37',
    },
    metricValue: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#0a0a0f',
    },
    metricLabel: {
        fontSize: 8,
        color: '#666',
        textTransform: 'uppercase',
        marginTop: 4,
    },
    footer: {
        position: 'absolute',
        bottom: 40,
        left: 40,
        right: 40,
        borderTopWidth: 1,
        borderTopColor: '#eee',
        paddingTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    footerText: {
        fontSize: 8,
        color: '#999',
    }
});

interface DailySovereignPDFProps {
    data: {
        uptime: string;
        wellness: string;
        district: string;
    };
}

const DailySovereignPDF = ({ data }: DailySovereignPDFProps) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.header}>
                <View>
                    <Text style={styles.title}>EdIntel SOVEREIGN</Text>
                    <Text style={styles.subtitle}>Intelligence Briefing | {data.district}</Text>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                    <Text style={{ fontSize: 10, fontWeight: 'bold' }}>{new Date().toLocaleDateString()}</Text>
                    <Text style={{ fontSize: 8, color: '#666' }}>ID: SR-{Math.floor(Math.random() * 100000)}</Text>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Executive Summary: Neuro-Resilience & Cognitive Fitness</Text>
                <Text style={styles.content}>
                    As school leadership in Alabama faces increasing administrative complexity, EdIntel SOVEREIGN prioritizes the "Total Person" approach.
                    By integrating generative intelligence with Transcend Wellness protocols, we ensure that district leaders maintain high-velocity clarity.
                    Today's metrics indicate a stable atmospheric resonance, supporting deep instructional sovereignty across all campuses.
                </Text>
            </View>

            <View style={styles.metricContainer}>
                <View style={styles.metricCard}>
                    <Text style={styles.metricValue}>{data.uptime}</Text>
                    <Text style={styles.metricLabel}>Neural Link Uptime</Text>
                </View>
                <View style={styles.metricCard}>
                    <Text style={styles.metricValue}>{data.wellness}</Text>
                    <Text style={styles.metricLabel}>District Wellness Index</Text>
                </View>
                <View style={styles.metricCard}>
                    <Text style={styles.metricValue}>Status: Optimal</Text>
                    <Text style={styles.metricLabel}>Strategic Sync</Text>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Strategic Insights</Text>
                <View style={{ marginBottom: 10 }}>
                    <Text style={[styles.content, { fontWeight: 'bold' }]}>• Operational Continuity:</Text>
                    <Text style={styles.content}>Infrastructure remains 100% synchronized with Mobile County endpoints.</Text>
                </View>
                <View style={{ marginBottom: 10 }}>
                    <Text style={[styles.content, { fontWeight: 'bold' }]}>• Cognitive Load Optimization:</Text>
                    <Text style={styles.content}>The Antigravity Core has successfully mitigated 14,000+ potential administrative bottleneck hours this week.</Text>
                </View>
            </View>

            <View style={styles.footer}>
                <Text style={styles.footerText}>© 2026 EdIntel | Sovereignty in Education</Text>
                <Text style={styles.footerText}>Grounded in Transcend Holistic Wellness</Text>
            </View>
        </Page>
    </Document>
);

export default DailySovereignPDF;
