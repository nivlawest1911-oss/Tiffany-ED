'use client';

export default function ParentInsight() {
  const weeklyInsight = {
    student: "Marcus",
    cognitive: "Strong focus on music-based literacy",
    emotional: "Improving self-regulation during transitions",
    actionable: "Ask Marcus about the 'Neural Hook' he created for his reading list today."
  };

  return (
    <div className="glass-card" style={{ padding: '30px', borderLeft: '5px solid #00d1b2', background: '#050505' }}>
      <h3 style={{ color: '#00d1b2' }}>Sovereign Weekly Insight: {weeklyInsight.student}</h3>
      
      <div style={{ marginTop: '20px' }}>
        <p style={{ fontSize: '0.9rem', color: '#888' }}>
          <strong>Cognitive Fitness:</strong> {weeklyInsight.cognitive}
        </p>
        <p style={{ fontSize: '0.9rem', color: '#888' }}>
          <strong>Emotional Intelligence:</strong> {weeklyInsight.emotional}
        </p>
      </div>

      <div style={{ marginTop: '20px', padding: '15px', background: 'rgba(212,175,55,0.1)', borderRadius: '10px' }}>
        <p style={{ margin: 0, color: '#d4af37', fontWeight: 'bold' }}>💡 Parent Connection Tip:</p>
        <p style={{ margin: '5px 0', fontSize: '0.85rem' }}>{weeklyInsight.actionable}</p>
      </div>
    </div>
  );
}
