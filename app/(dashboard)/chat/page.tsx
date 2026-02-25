'use client';

import { useRouter } from 'next/navigation';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { mockChannels } from '@/lib/mock/chat';
import { Hash, Lock, User } from 'lucide-react';

export default function ChatPage() {
  const router = useRouter();

  const getIcon = (type: string) => {
    if (type === 'PRIVATE') return <Lock className="h-4 w-4" />;
    if (type === 'DIRECT') return <User className="h-4 w-4" />;
    return <Hash className="h-4 w-4" />;
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Chat" description="Team communication channels" />
      <div className="grid gap-3">
        {mockChannels.map(channel => (
          <Card key={channel.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => router.push(`/chat/${channel.id}`)}>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                {getIcon(channel.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-medium">{channel.name}</p>
                  <Badge variant="secondary" className="text-xs">{channel.type}</Badge>
                </div>
                {channel.description && <p className="text-sm text-muted-foreground truncate">{channel.description}</p>}
                {channel.lastMessage && <p className="text-xs text-muted-foreground truncate mt-1">{channel.lastMessage}</p>}
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="text-xs text-muted-foreground">{channel.memberCount} members</span>
                {channel.unreadCount > 0 && (
                  <Badge className="bg-primary text-primary-foreground h-5 w-5 p-0 flex items-center justify-center rounded-full text-[10px]">
                    {channel.unreadCount}
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
