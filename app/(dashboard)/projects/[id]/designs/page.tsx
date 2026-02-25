'use client';

import { useParams, useRouter } from 'next/navigation';
import { mockProjects } from '@/lib/mock/projects';
import { PageHeader } from '@/components/shared/PageHeader';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Upload, Image, MessageSquare } from 'lucide-react';
import { toast } from 'sonner';

const mockDesigns = [
  { id: '1', name: 'Homepage Design v2', status: 'APPROVED', version: 2, uploadedBy: 'Icenipa Artcharoen', comments: 5, date: '2026-02-10' },
  { id: '2', name: 'Product Listing Page', status: 'REVIEW', version: 1, uploadedBy: 'Bambimol Paisarn', comments: 3, date: '2026-02-12' },
  { id: '3', name: 'User Dashboard', status: 'DRAFT', version: 1, uploadedBy: 'Icenipa Artcharoen', comments: 0, date: '2026-02-15' },
  { id: '4', name: 'Checkout Flow', status: 'REVISION', version: 3, uploadedBy: 'Gunticha Lamsam', comments: 8, date: '2026-02-18' },
];

export default function DesignsPage() {
  const params = useParams();
  const router = useRouter();
  const project = mockProjects.find(p => p.id === params.id);

  if (!project) return <div className="p-8 text-center">Project not found</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => router.push(`/projects/${params.id}`)}>
          <ArrowLeft className="h-4 w-4 mr-1" /> Back
        </Button>
        <PageHeader title="Designs" description={project.name} action={{ label: 'Upload Design', onClick: () => toast.info('Upload coming soon'), icon: Upload }} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {mockDesigns.map(design => (
          <Card key={design.id} className="cursor-pointer hover:shadow-md transition-shadow">
            <div className="aspect-video bg-muted flex items-center justify-center rounded-t-lg">
              <Image className="h-12 w-12 text-muted-foreground" />
            </div>
            <CardContent className="p-4 space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-sm">{design.name}</h3>
                <StatusBadge status={design.status} />
              </div>
              <p className="text-xs text-muted-foreground">v{design.version} | By {design.uploadedBy}</p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <MessageSquare className="h-3 w-3" />{design.comments} comments
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
