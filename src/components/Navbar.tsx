'use client';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="glass-card" style={{ 
      margin: '20px auto', 
      maxWidth: '1100px', 
      padding: '15px 30px', 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      position: 'sticky',
      top: '20px',
      zIndex: 1000
    }}>
      <Link href="/" style={{ textDecoration: 'none' }}>
        <strong className="gradient-text" style={{ fontSize: '1.5rem' }}>EdIntel v1.0</strong>
      </Link>
      <div style={{ display: 'flex', gap: '25px', alignItems: 'center' }}>
        <Link href="/board" style={{ color: '#ccc', textDecoration: 'none', fontSize: '0.9rem' }}>Board View</Link>
        <Link href="/archive" style={{ color: '#ccc', textDecoration: 'none', fontSize: '0.9rem' }}>Executive Vault</Link>
        <Link href="/consent" style={{ color: '#ccc', textDecoration: 'none', fontSize: '0.9rem' }}>SB 101 Portal</Link>
        <Link href="/pricing" className="primary-btn" style={{ textDecoration: 'none', padding: '8px 20px', fontSize: '0.8rem' }}>Upgrade Tier</Link>
      </div>
    </nav>
  );
}
