'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { mockChannels, mockMessages } from '@/lib/mock/chat';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Hash } from 'lucide-react';

export default function ChannelPage() {
  const params = useParams();
  const [newMessage, setNewMessage] = useState('');
  const channel = mockChannels.find(c => c.id === params.channelId);
  const messages = mockMessages.filter(m => m.channelId === params.channelId);

  if (!channel) return <div className="p-8 text-center">Channel not found</div>;

  const handleSend = () => {
    if (!newMessage.trim()) return;
    setNewMessage('');
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <div className="flex items-center gap-3 border-b pb-4 mb-4">
        <Hash className="h-5 w-5 text-muted-foreground" />
        <div>
          <h2 className="font-semibold">{channel.name}</h2>
          {channel.description && <p className="text-xs text-muted-foreground">{channel.description}</p>}
        </div>
      </div>

      <ScrollArea className="flex-1 pr-4">
        <div className="space-y-4">
          {messages.map(msg => (
            <div key={msg.id} className="flex gap-3">
              <Avatar className="h-8 w-8 shrink-0">
                <AvatarFallback className="text-xs">{msg.senderName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{msg.senderName}</span>
                  <span className="text-xs text-muted-foreground">{new Date(msg.createdAt).toLocaleTimeString()}</span>
                </div>
                <p className="text-sm mt-0.5">{msg.content}</p>
                {msg.reactions.length > 0 && (
                  <div className="flex gap-1 mt-1">
                    {msg.reactions.map((r, i) => (
                      <span key={i} className="text-xs bg-muted px-1.5 py-0.5 rounded">{r.emoji} {r.users.length}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
          {messages.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <p>No messages yet. Start the conversation!</p>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="flex gap-2 pt-4 border-t mt-4">
        <Input
          placeholder={`Message #${channel.name}...`}
          value={newMessage}
          onChange={e => setNewMessage(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
        />
        <Button onClick={handleSend} disabled={!newMessage.trim()}>
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
