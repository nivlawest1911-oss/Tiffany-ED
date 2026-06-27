'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function MessagesPage() {
  const [selectedChat, setSelectedChat] = useState(0);

  const conversations = [
    { id: 0, name: 'Ms. Rivera (4th Grade)', lastMessage: 'Thanks for the grouping update!', time: '2m ago' },
    { id: 1, name: 'Dr. Lopez (Principal)', lastMessage: 'Can we review the Tier 3 students?', time: '1h ago' },
    { id: 2, name: 'District Admin', lastMessage: 'New Science of Reading training available', time: 'Yesterday' },
  ];

  const messages = [
    { from: 'them', text: 'Hi, I saw the new groups you created for my class.' },
    { from: 'me', text: 'Yes! Let me know if you want to adjust any of them.' },
    { from: 'them', text: 'Looks good overall. Can we move Liam into Tier 2?' },
  ];

  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-semibold tracking-[-2px] mb-8">Messages</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Conversations List */}
          <Card className="bg-white/[0.03] border-white/10 lg:col-span-1">
            <CardContent className="p-0">
              <div className="p-4 border-b border-white/10">
                <Input placeholder="Search conversations..." className="bg-white/5 border-white/10" />
              </div>
              <div className="divide-y divide-white/10">
                {conversations.map((chat, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedChat(index)}
                    className={`p-4 cursor-pointer hover:bg-white/5 ${selectedChat === index ? 'bg-white/5' : ''}`}
                  >
                    <div className="flex justify-between">
                      <p className="font-medium">{chat.name}</p>
                      <span className="text-xs text-white/50">{chat.time}</span>
                    </div>
                    <p className="text-sm text-white/60 truncate mt-1">{chat.lastMessage}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Chat Window */}
          <Card className="bg-white/[0.03] border-white/10 lg:col-span-2 flex flex-col">
            <CardHeader className="border-b border-white/10">
              <CardTitle>{conversations[selectedChat].name}</CardTitle>
            </CardHeader>

            <CardContent className="flex-1 p-6 space-y-4 overflow-y-auto">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.from === 'me' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                      msg.from === 'me'
                        ? 'bg-[#C5A46E] text-[#0A0F1C]'
                        : 'bg-white/10'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </CardContent>

            {/* Message Input */}
            <div className="p-4 border-t border-white/10">
              <div className="flex gap-3">
                <Input 
                  placeholder="Type a message..." 
                  className="bg-white/5 border-white/10 flex-1" 
                />
                <Button className="bg-[#C5A46E] hover:bg-[#A67C52] text-[#0A0F1C]">
                  Send
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
