'use client';

import { useParams, useRouter } from 'next/navigation';
import { mockProjects } from '@/lib/mock/projects';
import { mockTasks } from '@/lib/mock/tasks';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Calendar, DollarSign, Users, BarChart3 } from 'lucide-react';
import Link from 'next/link';

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const project = mockProjects.find(p => p.id === params.id);

  if (!project) return <div className="p-8 text-center">Project not found</div>;

  const projectTasks = mockTasks.filter(t => t.projectId === project.id);
  const tasksByStatus = {
    BACKLOG: projectTasks.filter(t => t.status === 'BACKLOG').length,
    TODO: projectTasks.filter(t => t.status === 'TODO').length,
    IN_PROGRESS: projectTasks.filter(t => t.status === 'IN_PROGRESS').length,
    REVIEW: projectTasks.filter(t => t.status === 'REVIEW').length,
    TESTING: projectTasks.filter(t => t.status === 'TESTING').length,
    DONE: projectTasks.filter(t => t.status === 'DONE').length,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => router.push('/projects')}>
          <ArrowLeft className="h-4 w-4 mr-1" /> Projects
        </Button>
      </div>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-bold">{project.name}</h1>
            <StatusBadge status={project.status} />
          </div>
          <p className="text-muted-foreground">{project.clientName} | {project.type.replace(/_/g, ' ')}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild><Link href={`/projects/${project.id}/board`}>Kanban Board</Link></Button>
          <Button variant="outline" asChild><Link href={`/projects/${project.id}/tasks`}>Tasks</Link></Button>
          <Button variant="outline" asChild><Link href={`/projects/${project.id}/timeline`}>Timeline</Link></Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card><CardContent className="p-4"><div className="flex items-center gap-3"><BarChart3 className="h-5 w-5 text-blue-500" /><div><p className="text-sm text-muted-foreground">Progress</p><p className="text-lg font-bold">{project.progress}%</p></div></div></CardContent></Card>
        <Card><CardContent className="p-4"><div className="flex items-center gap-3"><DollarSign className="h-5 w-5 text-green-500" /><div><p className="text-sm text-muted-foreground">Budget</p><p className="text-lg font-bold">฿{(project.budget / 1000).toFixed(0)}K</p></div></div></CardContent></Card>
        <Card><CardContent className="p-4"><div className="flex items-center gap-3"><Calendar className="h-5 w-5 text-orange-500" /><div><p className="text-sm text-muted-foreground">Deadline</p><p className="text-lg font-bold">{project.endDate}</p></div></div></CardContent></Card>
        <Card><CardContent className="p-4"><div className="flex items-center gap-3"><Users className="h-5 w-5 text-purple-500" /><div><p className="text-sm text-muted-foreground">Team</p><p className="text-lg font-bold">{project.members.length} members</p></div></div></CardContent></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-base">Progress</CardTitle></CardHeader>
        <CardContent><Progress value={project.progress} className="h-3" /></CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader><CardTitle className="text-base">Task Overview</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {Object.entries(tasksByStatus).map(([status, count]) => (
              <div key={status} className="flex items-center justify-between text-sm">
                <StatusBadge status={status} />
                <span className="font-medium">{count}</span>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-base">Team Members</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {project.members.map(m => (
              <div key={m.id} className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="text-xs">{m.employeeName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{m.employeeName}</p>
                  <p className="text-xs text-muted-foreground">{m.role}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
