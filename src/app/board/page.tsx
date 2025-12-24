'use client';
import AuditChart from '@/components/AuditChart';
import ResourceMap from '@/components/ResourceMap';

export default function BoardView() {
  return (
    <div style={{ 
      padding: '40px', 
      fontFamily: 'sans-serif', 
      maxWidth: '1000px', 
      margin: 'auto', 
      backgroundColor: '#fdfdfd', 
      minHeight: '100vh' 
    }}>
      <header style={{ textAlign: 'center', marginBottom: '50px' }}>
        <h1 style={{ fontSize: '2.5rem', color: '#1a1a1a' }}>EdIntel Strategic Oversight</h1>
        <p style={{ fontSize: '1.1rem', color: '#666' }}>Mobile County District Data Visualization - Project Alpha</p>
        <div style={{ 
          display: 'inline-block', 
          padding: '5px 15px', 
          backgroundColor: '#e6f7ff', 
          color: '#0070f3', 
          borderRadius: '20px', 
          fontSize: '0.8rem', 
          fontWeight: 'bold' 
        }}>
          READ-ONLY EXECUTIVE SUMMARY
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '40px' }}>
        <section>
          <h2 style={{ borderLeft: '5px solid #0070f3', paddingLeft: '15px' }}>Audit Activity Trends</h2>
          <AuditChart />
        </section>

        <section>
          <h2 style={{ borderLeft: '5px solid #1a1a1a', paddingLeft: '15px' }}>Resource Support Hotspots</h2>
          <ResourceMap />
        </section>
      </div>

      <footer style={{ marginTop: '60px', textAlign: 'center', color: '#999', fontSize: '0.9rem' }}>
        <hr style={{ border: '0', borderTop: '1px solid #eee', marginBottom: '20px' }} />
        Powered by EdIntel AI Twin Technology | Dr. West Leadership Suite | <a href="/login" style="color: #999; text-decoration: none;">Executive Portal</a>
      </footer>
    </div>
  );
}
