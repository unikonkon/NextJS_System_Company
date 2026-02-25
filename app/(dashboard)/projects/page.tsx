'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PageHeader } from '@/components/shared/PageHeader';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { SearchInput } from '@/components/shared/SearchInput';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { mockProjects } from '@/lib/mock/projects';
import { Plus, Calendar, DollarSign } from 'lucide-react';

export default function ProjectsPage() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const filtered = mockProjects.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.clientName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Projects"
        description="Manage all agency projects"
        action={{ label: 'New Project', onClick: () => router.push('/projects/new'), icon: Plus }}
      />
      <SearchInput value={search} onChange={setSearch} placeholder="Search projects..." className="max-w-sm" />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map(project => (
          <Card key={project.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => router.push(`/projects/${project.id}`)}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <StatusBadge status={project.status} />
                <StatusBadge status={project.priority} />
              </div>
              <CardTitle className="text-lg mt-2">{project.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{project.clientName}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Progress</span>
                  <span className="font-medium">{project.progress}%</span>
                </div>
                <Progress value={project.progress} />
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  <span>{project.endDate}</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <DollarSign className="h-3 w-3" />
                  <span>฿{(project.budget / 1000).toFixed(0)}K</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Team:</span>
                <div className="flex -space-x-2">
                  {project.members.slice(0, 4).map(m => (
                    <Avatar key={m.id} className="h-6 w-6 border-2 border-background">
                      <AvatarFallback className="text-[10px]">{m.employeeName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                  ))}
                  {project.members.length > 4 && (
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-[10px] border-2 border-background">
                      +{project.members.length - 4}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
