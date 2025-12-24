'use client';
import DistrictROI from '@/components/DistrictROI';

export default function BoardHub() {
  return (
    <div style={{ padding: '40px' }}>
      <h1 className="gradient-text">Board Intelligence Portal</h1>
      <DistrictROI />
      {/* Other board components like usage logs would follow here */}
    </div>
  );
}
