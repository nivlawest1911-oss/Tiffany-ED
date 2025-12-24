"use client";
import React, { useState } from 'react';

export default function Page() {
  const [input, setInput] = useState('Draft a functional IEP goal for a 3rd grader struggling with reading comprehension.');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const triggerAudit = async () => {
    setLoading(true);
    try {
      const res = await fetch('https://generateiep-fqwxpzrnba-uc.a.run.app', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: input }),
      });
      const data = await res.json();
      setResponse(data.text || "AI Twin connection established.");
    } catch (err) {
      setResponse("Error: Ensure your Firebase Emulator is running on Port 5001.");
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: "40px", fontFamily: "sans-serif", backgroundColor: "#f8fafc", minHeight: "100vh" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto", backgroundColor: "white", padding: "30px", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
        <h1 style={{ color: "#004a99" }}>EdIntel Strategic Suite</h1>
        <p style={{ color: "#64748b" }}>Dr. West AI Twin: Project Alpha v1.0</p>
        <textarea 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ width: "100%", height: "100px", padding: "12px", borderRadius: "8px", border: "1px solid #cbd5e1" }}
        />
        <button 
          onClick={triggerAudit}
          disabled={loading}
          style={{ marginTop: "15px", backgroundColor: loading ? "#94a3b8" : "#004a99", color: "white", padding: "12px 24px", border: "none", borderRadius: "6px", cursor: "pointer" }}
        >
          {loading ? "Twin is Thinking..." : "Trigger AI Audit"}
        </button>
        {response && <div style={{ marginTop: "30px", padding: "20px", backgroundColor: "#f1f5f9", borderRadius: "8px" }}>{response}</div>}
      </div>
    </div>
  );
}
