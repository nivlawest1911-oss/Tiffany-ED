'use client';
import { useState, useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { db } from '@/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function ParentalConsent() {
  const [parentName, setParentName] = useState('');
  const [studentName, setStudentName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const sigPad = useRef<any>(null);

  const saveConsent = async () => {
    if (!parentName || !studentName || sigPad.current.isEmpty()) {
      alert("Please complete all fields and provide a signature.");
      return;
    }

    const signatureData = sigPad.current.getTrimmedCanvas().toDataURL('image/png');

    await addDoc(collection(db, 'parental_consents'), {
      parentName,
      studentName,
      signature: signatureData,
      timestamp: serverTimestamp(),
      district: 'Mobile County',
      node: 'Prichard-01'
    });

    setSubmitted(true);
  };

  if (submitted) return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 text-center">
      <div className="bg-emerald-900/20 border border-emerald-500 p-8 rounded-3xl">
        <h2 className="text-3xl font-black text-white mb-4 uppercase">Consent Secured</h2>
        <p className="text-emerald-400 font-mono italic">Signature hashed and stored in the Sovereign Ledger.</p>
      </div>
    </div>
  );

  return (
    <main className="min-h-screen bg-[#050505] text-white p-6 md:p-20">
      <h1 className="text-4xl font-black italic uppercase tracking-tighter mb-8">
        Parental <span className="text-emerald-500">Opt-In</span> Portal
      </h1>
      
      <div className="max-w-xl bg-white/5 p-8 rounded-3xl border border-white/10">
        <div className="space-y-4 mb-8">
          <input 
            type="text" placeholder="Parent/Guardian Full Name" 
            className="w-full bg-black border border-white/20 p-4 rounded-xl focus:border-emerald-500 outline-none"
            onChange={(e) => setParentName(e.target.value)}
          />
          <input 
            type="text" placeholder="Student Full Name" 
            className="w-full bg-black border border-white/20 p-4 rounded-xl focus:border-emerald-500 outline-none"
            onChange={(e) => setStudentName(e.target.value)}
          />
        </div>

        <p className="text-xs text-gray-500 uppercase mb-2 tracking-widest">Digital Signature Area</p>
        <div className="bg-white rounded-xl overflow-hidden mb-6">
          <SignatureCanvas 
            ref={sigPad}
            penColor='black'
            canvasProps={{width: 500, height: 200, className: 'sigCanvas w-full h-48'}} 
          />
        </div>

        <button 
          onClick={saveConsent}
          className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 font-bold rounded-xl transition-all uppercase"
        >
          Authorize AI Integration
        </button>
      </div>
    </main>
  );
}
