'use client';
import { useState } from 'react';
import { db } from '@/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function ParentalOptIn() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ studentName: '', parentName: '', school: 'Continuous Learning Center' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'parentalConsents'), {
        ...formData,
        timestamp: serverTimestamp(),
        status: 'ACTIVE',
        to: 'nivlawest1911@gmail.com',
        message: {
          subject: `🚀 EdIntel Compliance Alert: ${formData.studentName}`,
          html: `<h3>New SB 101 Consent Signed</h3><p>Student: ${formData.studentName}</p><p>School: ${formData.school}</p><a href="https://edintelus.web.app/archive">Verify in Vault</a>`
        }
      });
      setSubmitted(true);
    } catch (err) { alert("Sync Error."); }
  };

  return (
    <div style={{ padding: '60px 20px', maxWidth: '800px', margin: 'auto' }}>
      <div className="glass-card" style={{ padding: '40px', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.1)' }}>
        <h1 className="gradient-text">Alabama SB 101 Portal</h1>
        {submitted ? <h2 style={{ color: '#52c41a' }}>✅ Consent Archived & Dr. West Notified</h2> : (
          <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '15px' }}>
            <input type="text" placeholder="Student Name" className="input-field" style={{ padding: '12px', background: '#111', color: '#fff', borderRadius: '8px' }} onChange={(e) => setFormData({...formData, studentName: e.target.value})} required />
            <select className="input-field" style={{ padding: '12px', background: '#111', color: '#fff', borderRadius: '8px' }} onChange={(e) => setFormData({...formData, school: e.target.value})}>
              <option>Continuous Learning Center</option>
              <option>Whistler Elementary</option>
              <option>Vigor High</option>
            </select>
            <input type="text" placeholder="Parent Digital Signature" className="input-field" style={{ padding: '12px', background: '#111', color: '#fff', borderRadius: '8px' }} onChange={(e) => setFormData({...formData, parentName: e.target.value})} required />
            <button type="submit" className="primary-btn">Submit Compliance Record</button>
          </form>
        )}
      </div>
    </div>
  );
}
