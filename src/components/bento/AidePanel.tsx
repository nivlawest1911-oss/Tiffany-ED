'use client';
import { useState } from 'react';
import { X, Send, Sparkles } from 'lucide-react';

interface AidePanelProps {
  isOpen: boolean;
  mode: 'aide' | 'iep';
  onClose: () => void;
}

export default function AidePanel({ isOpen, mode, onClose }: AidePanelProps) {
  const [input, setInput] = useState('');
  const [chatLog, setChatLog] = useState<{ role: 'user' | 'ai', text: string }[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  if (!isOpen) return null;

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = input;
    setInput('');
    setChatLog(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    try {
      const response = await fetch('/api/classroom', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg, mode: mode }) // Passing mode for logic branch
      });

      const data = await response.json();
      setChatLog(prev => [...prev, { role: 'ai', text: data.text }]);
    } catch (err) {
      setChatLog(prev => [...prev, { role: 'ai', text: "System Error: Neural link interrupted." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className={`fixed inset-y-0 right-0 w-96 bg-white dark:bg-zinc-900 shadow-2xl z-50 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'} border-l border-zinc-200 dark:border-zinc-800 flex flex-col`}>
      {/* Header */}
      <div className="p-4 border-b dark:border-zinc-800 flex justify-between items-center bg-zinc-50 dark:bg-zinc-900/50">
        <div className="flex items-center gap-2">
          <Sparkles className="text-blue-500" size={20} />
          <h2 className="font-bold uppercase tracking-widest text-sm">{mode === 'aide' ? 'Classroom Aide' : 'IEP Architect'}</h2>
        </div>
        <button onClick={onClose} className="p-1 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-full"><X size={20} /></button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {chatLog.map((msg, i) => (
          <div key={i} className={`p-3 rounded-lg text-sm ${msg.role === 'user' ? 'bg-blue-50 ml-8 text-blue-900' : 'bg-zinc-100 mr-8 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100'}`}>
            {msg.text}
          </div>
        ))}
        {isTyping && <div className="text-xs text-zinc-400 animate-pulse">Aide is processing...</div>}
      </div>

      {/* Input */}
      <div className="p-4 border-t dark:border-zinc-800">
        <div className="relative">
          <input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder={`Ask the ${mode}...`}
            className="w-full bg-zinc-100 dark:bg-zinc-800 border-none rounded-xl py-3 pl-4 pr-12 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <button onClick={handleSendMessage} className="absolute right-2 top-2 p-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}