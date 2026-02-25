'use client';

import { useParams, useRouter } from 'next/navigation';
import { mockProjects } from '@/lib/mock/projects';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Circle, CheckCircle2 } from 'lucide-react';

export default function TimelinePage() {
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
        <div>
          <h1 className="text-2xl font-bold">Project Timeline</h1>
          <p className="text-muted-foreground">{project.name}</p>
        </div>
      </div>

      <div className="relative ml-4">
        <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-border" />
        <div className="space-y-6">
          {project.phases.map((phase, idx) => (
            <div key={phase.id} className="relative pl-10">
              <div className="absolute left-0 top-1">
                {phase.status === 'COMPLETED' ? (
                  <CheckCircle2 className="h-6 w-6 text-green-500 fill-green-100" />
                ) : phase.status === 'IN_PROGRESS' ? (
                  <div className="h-6 w-6 rounded-full border-2 border-yellow-500 bg-yellow-100 flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-yellow-500" />
                  </div>
                ) : (
                  <Circle className="h-6 w-6 text-muted-foreground" />
                )}
              </div>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">{phase.name}</h3>
                    <StatusBadge status={phase.status} />
                  </div>
                  {phase.description && <p className="text-sm text-muted-foreground mb-2">{phase.description}</p>}
                  <p className="text-xs text-muted-foreground">{phase.startDate} - {phase.endDate}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
