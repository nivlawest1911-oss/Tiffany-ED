'use client';
import AuditChart from '@/components/AuditChart';
import ResourceMap from '@/components/ResourceMap';
import BoardReport from '@/components/BoardReport';
import RevenueDashboard from '@/components/RevenueDashboard';

export default function BoardView() {
  return (
    <div style={{ padding: '40px', maxWidth: '1000px', margin: 'auto', backgroundColor: '#050505', minHeight: '100vh', color: '#fff' }}>
      <header style={{ textAlign: 'center', marginBottom: '50px' }}>
        <h1 className="gradient-text" style={{ fontSize: '2.5rem' }}>EdIntel Strategic Oversight</h1>
        <p style={{ color: '#888' }}>Mobile County District Data Visualization</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '40px' }}>
        <BoardReport />
        <RevenueDashboard />
        <AuditChart />
        <ResourceMap />
      </div>

      <footer style={{ marginTop: '60px', textAlign: 'center', color: '#444', fontSize: '0.8rem' }}>
        <hr style={{ border: '0', borderTop: '1px solid #222', marginBottom: '20px' }} />
        Dr. West Leadership Suite | <a href="/login" style={{ color: '#444', textDecoration: 'none' }}>Executive Portal</a>
      </footer>
    </div>
  );
}
