'use client';
import { useState } from 'react';
import { auth } from '@/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/archive'); // Redirect to the vault upon success
    } catch (err: any) {
      setError('Invalid Executive Credentials.');
    }
  };

  return (
    <div style={{ 
      height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', 
      backgroundColor: '#f4f7f6', fontFamily: 'sans-serif' 
    }}>
      <form onSubmit={handleLogin} style={{ 
        padding: '40px', backgroundColor: '#fff', borderRadius: '12px', 
        boxShadow: '0 10px 25px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px' 
      }}>
        <h2 style={{ textAlign: 'center', color: '#1a1a1a', marginBottom: '10px' }}>EdIntel Portal</h2>
        <p style={{ textAlign: 'center', color: '#666', marginBottom: '30px' }}>District Executive Login</p>
        
        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
        
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Executive Email</label>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          style={{ width: '100%', padding: '12px', marginBottom: '20px', borderRadius: '6px', border: '1px solid #ddd' }}
          required 
        />

        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Access Key</label>
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          style={{ width: '100%', padding: '12px', marginBottom: '30px', borderRadius: '6px', border: '1px solid #ddd' }}
          required 
        />

        <button type="submit" style={{ 
          width: '100%', padding: '14px', backgroundColor: '#0070f3', color: '#fff', 
          border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' 
        }}>
          Secure Sign In
        </button>
      </form>
    </div>
  );
}
