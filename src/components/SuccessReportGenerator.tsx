'use client';
export default function SuccessReportGenerator() {
  return (
    <div className="glass-card" style={{ padding: '40px', borderTop: '5px solid #00d1b2' }}>
      <h2 className="gradient-text">Board Success Report Generator</h2>
      <p style={{ color: '#888' }}>Convert raw cognitive data into District-wide ROI narratives.</p>
      
      <div style={{ marginTop: '30px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div style={{ padding: '20px', background: '#111', borderRadius: '15px' }}>
          <h4>Strategic Wins</h4>
          <ul style={{ fontSize: '0.9rem', color: '#aaa' }}>
            <li>Zero suspensions in Grade 8 (CLC North)</li>
            <li>$45,000 saved in Alternative Placement costs</li>
            <li>100% SB 101 Compliance across all sites</li>
          </ul>
        </div>
        <div style={{ padding: '20px', background: '#111', borderRadius: '15px' }}>
          <h4>Narrative Case Study</h4>
          <p style={{ fontSize: '0.8rem', color: '#666 italic' }}>
            "Student #882: Behavioral outburst diverted via Music-Based Literacy Hook. Resulted in first-ever Lexile gain (+120pts) instead of 5-day suspension."
          </p>
        </div>
      </div>

      <button className="primary-btn" style={{ width: '100%', marginTop: '30px', background: 'linear-gradient(90deg, #00d1b2, #0070f3)' }}>
        EXPORT TO PDF FOR BOARD MEETING
      </button>
    </div>
  );
}
