'use client';
import Link from 'next/link';

export default function Home() {
  const tools = [
    { title: 'Executive Vault', desc: 'Secure SB 101 records and audit history.', link: '/archive', color: '#0070f3' },
    { title: 'Cognitive AI', desc: 'Generate IEPs and strategic behavior audits.', link: '/cognitive', color: '#d4af37' },
    { title: 'Compliance Portal', desc: 'Public-facing parental consent gateway.', link: '/consent', color: '#00d1b2' },
    { title: 'Board Hub', desc: 'District oversight and ROI reporting.', link: '/board', color: '#ff3860' },
    { title: 'Licensing', desc: 'Scale EdIntel to neighboring districts.', link: '/pricing', color: '#7b1fa2' },
    { title: 'Resources', desc: 'Alabama state standards and guides.', link: '/resources/alabama', color: '#ffdd57' }
  ];

  return (
    <div style={{ padding: '40px 20px', maxWidth: '1200px', margin: 'auto' }}>
      <header style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h1 className="gradient-text" style={{ fontSize: '3.5rem', fontWeight: 'bold' }}>EDINTEL US</h1>
        <p style={{ fontSize: '1.2rem', color: '#888' }}>District-Wide Intelligence & Compliance Infrastructure</p>
      </header>

      <div className="bento-grid">
        {tools.map((tool) => (
          <Link href={tool.link} key={tool.title} style={{ textDecoration: 'none' }}>
            <div className="glass-card" style={{ padding: '30px', height: '100%', transition: '0.3s' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: tool.color, marginBottom: '15px' }}></div>
              <h2 style={{ color: '#fff', fontSize: '1.5rem', marginBottom: '10px' }}>{tool.title}</h2>
              <p style={{ color: '#aaa', fontSize: '0.95rem', lineHeight: '1.5' }}>{tool.desc}</p>
            </div>
          </Link>
        ))}
      </div>

      <footer style={{ marginTop: '80px', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px' }}>
        <p style={{ color: '#444' }}>&copy; 2025 EdIntel US. Developed for the Continuous Learning Center.</p>
      </footer>
    </div>
  );
}
