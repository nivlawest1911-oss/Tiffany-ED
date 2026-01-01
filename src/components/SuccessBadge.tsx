'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function SuccessBadge() {
  const searchParams = useSearchParams();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (searchParams.get('session_id')) {
      setShow(true);
      // Auto-hide after 10 seconds
      const timer = setTimeout(() => setShow(false), 10000);
      return () => clearTimeout(timer);
    }
  }, [searchParams]);

  if (!show) return null;

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      zIndex: 1000,
      background: 'linear-gradient(135deg, #52c41a 0%, #237804 100%)',
      color: 'white',
      padding: '15px 25px',
      borderRadius: '12px',
      boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
      border: '1px solid rgba(255,255,255,0.2)',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      animation: 'slideIn 0.5s ease-out'
    }}>
      <style>{
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      }</style>
      <span style={{ fontSize: '1.5rem' }}>???</span>
      <div>
        <div style={{ fontWeight: 'bold' }}>Professional Tier Active</div>
        <div style={{ fontSize: '0.8rem', opacity: 0.9 }}>Global Strategic Suite Enabled</div>
      </div>
    </div>
  );
}
