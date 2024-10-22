'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Message {
  id: number;
  sender: string;
  content: string;
  timestamp: Date;
}

const AppChatPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, sender: 'System', content: 'Welcome to the chat!', timestamp: new Date() },
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, {
        id: messages.length + 1,
        sender: 'You',
        content: newMessage.trim(),
        timestamp: new Date(),
      }]);
      setNewMessage('');
    }
  };

  return (
    <div className="p-6">
      <Card className="h-[calc(100vh-12rem)]">
        <CardHeader>
          <CardTitle>Chat</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col h-full">
          <ScrollArea className="flex-grow mb-4">
            {messages.map((message) => (
              <div key={message.id} className="mb-2">
                <strong>{message.sender}:</strong> {message.content}
                <div className="text-xs text-gray-500">
                  {message.timestamp.toLocaleTimeString()}
                </div>
              </div>
            ))}
          </ScrollArea>
          <div className="flex">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-grow mr-2"
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <Button onClick={handleSendMessage}>Send</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AppChatPage;
