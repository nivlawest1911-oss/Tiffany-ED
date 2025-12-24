'use client';
import { useState } from 'react';

export default function UniversalFitnessHub() {
  const pillars = [
    { title: 'Cognitive', goal: 'Literacy & Logic', icon: '🧠', color: '#0070f3', task: 'Neural Scaffolding Drill' },
    { title: 'Emotional', goal: 'Regulation & EQ', icon: '🧘', color: '#00d1b2', task: '30-Second Reset' },
    { title: 'Leadership', goal: 'Strategy & Empathy', icon: '👑', color: '#d4af37', task: 'Restorative Audit' }
  ];

  return (
    <div style={{ padding: '40px', background: '#000', minHeight: '100vh' }}>
      <h1 className="gradient-text" style={{ fontSize: '3rem', textAlign: 'center' }}>Sovereign Fitness Suite</h1>
      <p style={{ color: '#888', textAlign: 'center', marginBottom: '50px' }}>Universal Intelligence Optimization for the CLC Ecosystem</p>
      
      <div className="bento-grid" style={{ maxWidth: '1200px', margin: 'auto' }}>
        {pillars.map((p) => (
          <div key={p.title} className="glass-card" style={{ padding: '30px', borderTop: `4px solid ${p.color}` }}>
            <div style={{ fontSize: '3rem' }}>{p.icon}</div>
            <h2 style={{ margin: '15px 0' }}>{p.title} Intelligence</h2>
            <p style={{ color: '#aaa', fontSize: '0.9rem' }}>Primary Goal: {p.goal}</p>
            <div style={{ marginTop: '20px', padding: '15px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px' }}>
              <span style={{ fontSize: '0.8rem', color: p.color }}>ACTIVE PROTOCOL:</span>
              <p style={{ margin: '5px 0', fontWeight: 'bold' }}>{p.task}</p>
            </div>
            <button className="primary-btn" style={{ width: '100%', marginTop: '20px', background: p.color, color: '#000' }}>
              Begin Session
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
