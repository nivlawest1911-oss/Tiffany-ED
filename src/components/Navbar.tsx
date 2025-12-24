'use client';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav style={{ padding: '20px', borderBottom: '1px solid #222', display: 'flex', justifyContent: 'space-between' }}>
      <Link href="/" style={{ fontWeight: 'bold', color: '#fff', textDecoration: 'none' }}>EDINTEL US</Link>
      <div style={{ display: 'flex', gap: '20px' }}>
        <Link href="/pricing" style={{ color: '#888', textDecoration: 'none' }}>Pricing</Link>
        <Link href="/affiliate" style={{ color: '#00d1b2', textDecoration: 'none' }}>Partner Program</Link>
        <Link href="/login" style={{ color: '#0070f3', textDecoration: 'none' }}>Login</Link>
      </div>
    </nav>
  );
}
