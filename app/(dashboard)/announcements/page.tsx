'use client';

import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { mockAnnouncements } from '@/lib/mock/chat';
import { Plus, Pin } from 'lucide-react';
import { toast } from 'sonner';

export default function AnnouncementsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Announcements" description="Company announcements and updates" action={{ label: 'New Announcement', onClick: () => toast.info('New announcement form coming soon'), icon: Plus }} />
      <div className="space-y-4">
        {mockAnnouncements.map(ann => (
          <Card key={ann.id}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {ann.isPinned && <Pin className="h-4 w-4 text-primary" />}
                  <CardTitle className="text-base">{ann.title}</CardTitle>
                </div>
                <StatusBadge status={ann.priority} />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-4">{ann.content}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6"><AvatarFallback className="text-[10px]">{ann.authorName.split(' ').map(n => n[0]).join('')}</AvatarFallback></Avatar>
                  <span className="text-xs text-muted-foreground">{ann.authorName}</span>
                </div>
                <span className="text-xs text-muted-foreground">{new Date(ann.createdAt).toLocaleDateString()}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
