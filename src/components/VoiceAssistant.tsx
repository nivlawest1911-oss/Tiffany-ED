'use client';
import { useState } from 'react';

export default function VoiceAssistant() {
  const [isListening, setIsListening] = useState(false);
  
  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return alert("Voice not supported in this browser.");
    
    const recognition = new SpeechRecognition();
    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      console.log("AI Avatar captured:", transcript);
      // Logic to pipe this into the IEP Architect textarea
      document.dispatchEvent(new CustomEvent('voice-input', { detail: transcript }));
      setIsListening(false);
    };
    recognition.start();
  };

  return (
    <div onClick={startListening} style={{
      position: 'fixed', bottom: '30px', right: '30px',
      width: '60px', height: '60px', borderRadius: '50%',
      background: isListening ? '#ff3860' : '#0070f3',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      cursor: 'pointer', boxShadow: '0 0 20px rgba(0,112,243,0.5)', zIndex: 1000
    }}>
      <span style={{ fontSize: '24px' }}>{isListening ? '🛑' : '🎙️'}</span>
      {isListening && <div className="pulse-ring"></div>}
    </div>
  );
}
