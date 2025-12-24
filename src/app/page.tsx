'use client';
import Link from 'next/link';
import TrialStatusGuard from '@/components/TrialStatusGuard';

export default function Home() {
  const tools = [
    { title: 'IEP Architect', desc: 'Strategic IEP & Grant drafting engine.', link: '/cognitive', color: '#d4af37' },
    { title: 'Student Neural View', desc: 'Holistic performance & literacy analytics.', link: '/student', color: '#0070f3' },
    { title: 'Fitness Library', desc: 'Leadership & Emotional fitness protocols.', link: '/fitness', color: '#7b1fa2' },
    { title: 'Compliance Guard', desc: 'SB 101 Public Consent Gateway.', link: '/consent', color: '#00d1b2' },
    { title: 'Executive Vault', desc: 'Secure district audit repository.', link: '/archive', color: '#444' },
    { title: 'Board Hub', desc: 'District Intelligence & Fiscal ROI Reports.', link: '/board', color: '#ff3860' }
  ];

  return (
    <div style={{ padding: '40px 20px', maxWidth: '1200px', margin: 'auto' }}>
      <header style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1 className="gradient-text" style={{ fontSize: '3.5rem', fontWeight: 'bold' }}>EDINTEL EXECUTIVE</h1>
        <p style={{ fontSize: '1.2rem', color: '#888' }}>Continuous Learning Center | Evaluation Phase</p>
      </header>

      <TrialStatusGuard />

      <div className="bento-grid">
        {tools.map((tool) => (
          <Link href={tool.link} key={tool.title} style={{ textDecoration: 'none' }}>
            <div className="glass-card" style={{ padding: '30px', height: '100%', borderTop: `4px solid ${tool.color}` }}>
              <h2 style={{ color: '#fff', fontSize: '1.4rem', marginBottom: '10px' }}>{tool.title}</h2>
              <p style={{ color: '#aaa', fontSize: '0.9rem', lineHeight: '1.6' }}>{tool.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
