'use client';
import { useState } from 'react';

export default function ParentalOptIn() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: 'auto', fontFamily: 'Inter, sans-serif' }}>
      <header style={{ borderBottom: '3px solid #003366', paddingBottom: '15px', marginBottom: '30px' }}>
        <h1 style={{ color: '#003366' }}>Alabama SB 101 Compliance Portal</h1>
        <h3>Annual Mental Health Services Opt-In Form (FY26)</h3>
      </header>

      {submitted ? (
        <div style={{ backgroundColor: '#e6f7ff', padding: '30px', borderRadius: '15px', textAlign: 'center' }}>
          <h2>? Consent Successfully Archived</h2>
          <p>Digital signature verified for the Continuous Learning Center vault.</p>
        </div>
      ) : (
        <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} style={{ lineHeight: '1.6' }}>
          <p>As per <strong>Alabama Act 2025-455</strong>, written parental permission is required for students under 16 to receive school counseling services. Exceptions apply only for imminent threats or grief counseling.</p>
          
          <div style={{ backgroundColor: '#f4f4f4', padding: '20px', borderRadius: '10px', margin: '20px 0' }}>
            <p><strong>Please select authorized services:</strong></p>
            <label style={{ display: 'block' }}><input type="checkbox" required /> Individual Behavioral Coaching (CLC Protocol)</label>
            <label style={{ display: 'block' }}><input type="checkbox" required /> Mental Health Screeners & Assessments</label>
            <label style={{ display: 'block' }}><input type="checkbox" required /> Small Group Social-Emotional Learning</label>
          </div>

          <label style={{ display: 'block', fontWeight: 'bold' }}>Parent/Guardian Full Name:</label>
          <input type="text" style={{ width: '100%', padding: '10px', marginBottom: '20px' }} required />
          
          <label style={{ display: 'block', fontWeight: 'bold' }}>Student Name:</label>
          <input type="text" style={{ width: '100%', padding: '10px', marginBottom: '30px' }} required />

          <button type="submit" style={{ width: '100%', padding: '20px', backgroundColor: '#003366', color: '#fff', borderRadius: '12px', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>
            Digitally Sign Annual Opt-In
          </button>
        </form>
      )}
    </div>
  );
}
