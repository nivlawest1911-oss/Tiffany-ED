import { ROIDashboard } from '@/components/admin/ROIDashboard';
import { UsageMetrics } from '@/lib/roi-logic';

export default function AdminROIPage() {
    // Mock Data - In a real app, fetch this from DB/Analytics
    const mockMetrics: UsageMetrics = {
        legalDocumentsReviewed: 45,
        gradingHoursSaved: 120,
        administrativeTasksAutomated: 350,
        complianceChecksRun: 15,
    };

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight text-white">Administrator ROI Dashboard</h2>
                <div className="flex items-center space-x-2">
                    {/* Calendar Date Picker could go here */}
                </div>
            </div>
            <ROIDashboard metrics={mockMetrics} />
        </div>
    );
}
