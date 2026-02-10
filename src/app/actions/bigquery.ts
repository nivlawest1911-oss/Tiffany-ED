'use server'

import { BigQuery } from '@google-cloud/bigquery';
import { createSafeAction, ActionResult } from '@/lib/server-utils';

const bigquery = new BigQuery({
    projectId: process.env.GCP_PROJECT_ID || 'edintel-EdIntel',
    credentials: {
        client_email: process.env.GCP_CLIENT_EMAIL,
        private_key: process.env.GCP_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
});

export async function getDistrictAnalytics(): Promise<ActionResult<any[]>> {
    return createSafeAction(async () => {
        // Return mock data if credentials are missing for the build process/v0 preview
        if (!process.env.GCP_PRIVATE_KEY) {
            console.warn('BigQuery: Missing credentials, returning mock data.');
            return [
                { school_name: 'Mobile High School', avg_attendance: 94.2, total_students: 1250 },
                { school_name: 'Gulf Coast Elementary', avg_attendance: 98.1, total_students: 840 },
                { school_name: 'Azalea Middle School', avg_attendance: 91.5, total_students: 920 },
                { school_name: 'Semmes Academy', avg_attendance: 96.4, total_students: 1100 },
                { school_name: 'LeFlore Magnet', avg_attendance: 93.8, total_students: 750 }
            ];
        }

        const query = `
          SELECT 
            school_name, 
            AVG(attendance_rate) as avg_attendance, 
            COUNT(student_id) as total_students
          FROM \`${process.env.GCP_PROJECT_ID}.mobile_county_data.student_stats\`
          GROUP BY school_name
          ORDER BY avg_attendance DESC
          LIMIT 10
        `;

        const options = {
            query: query,
            location: 'US',
        };

        const [rows] = await bigquery.query(options);
        return rows;
    }, 'Failed to synchronize with BigQuery analytics lake');
}
