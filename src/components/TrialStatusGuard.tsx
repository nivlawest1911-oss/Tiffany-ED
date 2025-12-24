'use client';
import { useState, useEffect } from 'react';

export default function TrialStatusGuard() {
  const [trialData, setTrialData] = useState({ daysLeft: 14, tokensLeft: 50000, isActive: true });

  useEffect(() => {
    // Logic: Fetch trial data from Firebase User Profile
    // For now, we simulate the 'Deep Trail' logic
    const startDate = new Date('2025-12-24'); // Current Date
    const today = new Date();
    const diff = 14 - Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
    setTrialData(prev => ({ ...prev, daysLeft: diff > 0 ? diff : 0 }));
  }, []);

  if (trialData.daysLeft <= 0) return (
    <div className="glass-card" style={{ border: '2px solid #ff3860', padding: '20px', textAlign: 'center' }}>
      <h3 style={{ color: '#ff3860' }}>Trial Epoch Expired</h3>
      <p>Your district intelligence reservoir is empty. Contact the CLC Administrator to authorize a Sovereign Subscription.</p>
      <button className="primary-btn">Upgrade to Sovereign Tier</button>
    </div>
  );

  return (
    <div style={{ background: 'rgba(0,112,243,0.1)', padding: '10px 20px', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
      <div>
        <span style={{ color: '#0070f3', fontWeight: 'bold' }}>TRAIL MODE ACTIVE: </span>
        <span style={{ color: '#aaa' }}>{trialData.daysLeft} Days Remaining in Sovereign Evaluation</span>
      </div>
      <div style={{ color: '#d4af37' }}>
        {trialData.tokensLeft.toLocaleString()} / 50,000 Tokens Available
      </div>
    </div>
  );
}
