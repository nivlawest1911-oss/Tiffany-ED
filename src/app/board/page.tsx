'use client';
import DistrictROI from '@/components/DistrictROI';
import TokenSovereign from '@/components/TokenSovereign';

export default function BoardHub() {
  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: 'auto' }}>
      <h1 className="gradient-text" style={{ fontSize: '3rem' }}>District Governance Dashboard</h1>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '40px', marginTop: '30px' }}>
        <TokenSovereign />
        <DistrictROI />
      </div>
    </div>
  );
}
