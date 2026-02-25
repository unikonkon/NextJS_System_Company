'use client';

import { useParams, useRouter } from 'next/navigation';
import { mockProjects } from '@/lib/mock/projects';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Upload, FileText, Download } from 'lucide-react';
import { toast } from 'sonner';

const mockDocuments = [
  { id: '1', name: 'Project Brief.pdf', type: 'PDF', size: '2.4 MB', uploadedBy: 'Tanakorn', date: '2026-01-15' },
  { id: '2', name: 'Requirements Spec.docx', type: 'DOCX', size: '1.8 MB', uploadedBy: 'Fernlada', date: '2026-01-20' },
  { id: '3', name: 'Wireframes.fig', type: 'FIG', size: '15.2 MB', uploadedBy: 'Icenipa', date: '2026-02-01' },
  { id: '4', name: 'Database Schema.sql', type: 'SQL', size: '12 KB', uploadedBy: 'Bankitti', date: '2026-02-05' },
];

export default function DocumentsPage() {
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
        <PageHeader title="Documents" description={project.name} action={{ label: 'Upload', onClick: () => toast.info('Upload coming soon'), icon: Upload }} />
      </div>
      <div className="grid gap-3">
        {mockDocuments.map(doc => (
          <Card key={doc.id}>
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-muted p-2"><FileText className="h-5 w-5" /></div>
                <div>
                  <p className="font-medium text-sm">{doc.name}</p>
                  <p className="text-xs text-muted-foreground">{doc.size} | Uploaded by {doc.uploadedBy} on {doc.date}</p>
                </div>
              </div>
              <Button variant="ghost" size="sm"><Download className="h-4 w-4" /></Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
