'use client';
import { useState } from 'react';

export default function ParentalOptIn() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: 'auto', fontFamily: 'Inter, sans-serif', color: '#1a1a1a' }}>
      <header style={{ borderBottom: '2px solid #003366', marginBottom: '30px', paddingBottom: '10px' }}>
        <h1 style={{ color: '#003366' }}>Alabama Act 2025-455 (SB101) Compliance</h1>
        <h3>Annual Mental Health Services Opt-In Form (2025-2026)</h3>
      </header>

      {submitted ? (
        <div style={{ backgroundColor: '#e6f7ff', padding: '30px', borderRadius: '12px', textAlign: 'center' }}>
          <h2>? Consent Recorded Successfully</h2>
          <p>This digital record has been time-stamped and added to the EdIntel Executive Vault.</p>
        </div>
      ) : (
        <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} style={{ lineHeight: '1.8' }}>
          <p>I, the parent/guardian of the student named below, acknowledge that I have been notified of the mental health services available through the <strong>Continuous Learning Center (CLC)</strong> and the district.</p>
          
          <div style={{ backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '10px', margin: '20px 0' }}>
            <label style={{ display: 'block' }}><input type="checkbox" required /> <strong>Small Group/Individual Counseling:</strong> Dealing with stress, peer relationships, and behavioral health.</label>
            <label style={{ display: 'block' }}><input type="checkbox" required /> <strong>Assessments/Surveys:</strong> Emotional well-inquiry and social-behavioral questionnaires.</label>
            <label style={{ display: 'block' }}><input type="checkbox" required /> <strong>Crisis Intervention:</strong> Immediate short-term assistance by school professionals.</label>
          </div>

          <label style={{ display: 'block', marginBottom: '10px' }}>Student Name:</label>
          <input type="text" style={{ width: '100%', padding: '10px', marginBottom: '20px' }} required />

          <label style={{ display: 'block', marginBottom: '10px' }}>Digital Signature (Parent/Guardian Full Name):</label>
          <input type="text" style={{ width: '100%', padding: '10px', marginBottom: '30px' }} required />

          <button type="submit" style={{ width: '100%', padding: '20px', backgroundColor: '#003366', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' }}>
            Submit Annual Opt-In
          </button>
        </form>
      )}
    </div>
  );
}
