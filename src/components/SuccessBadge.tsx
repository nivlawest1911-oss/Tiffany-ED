'use client';
'use client';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function SuccessBadge() {
  const searchParams = useSearchParams();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (searchParams.get('session_id')) {
      setShow(true);
      const timer = setTimeout(() => setShow(false), 10000);
      return () => clearTimeout(timer);
    }
  }, [searchParams]);

  if (!show) return null;

  return (
    <div style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 1000, background: 'linear-gradient(135deg, #52c41a 0%, #237804 100%)', color: 'white', padding: '15px 25px', borderRadius: '12px', boxShadow: '0 10px 20px rgba(0,0,0,0.2)' }}>
      <div style={{ fontWeight: 'bold' }}>Professional Tier Active</div>
      <div style={{ fontSize: '0.8rem', opacity: 0.9 }}>Global Strategic Suite Enabled</div>
    </div>
  );
}
