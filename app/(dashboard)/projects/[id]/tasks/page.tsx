'use client';

import { useParams, useRouter } from 'next/navigation';
import { mockProjects } from '@/lib/mock/projects';
import { mockTasks } from '@/lib/mock/tasks';
import { DataTable, Column } from '@/components/shared/DataTable';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Plus } from 'lucide-react';
import { Task } from '@/types/project.types';
import { toast } from 'sonner';

export default function TaskListPage() {
  const params = useParams();
  const router = useRouter();
  const project = mockProjects.find(p => p.id === params.id);
  const projectTasks = mockTasks.filter(t => t.projectId === params.id);

  if (!project) return <div className="p-8 text-center">Project not found</div>;

  const columns: Column<Task>[] = [
    { key: 'title', label: 'Title', sortable: true, render: (t) => <span className="font-medium">{t.title}</span> },
    { key: 'status', label: 'Status', render: (t) => <StatusBadge status={t.status} /> },
    { key: 'priority', label: 'Priority', render: (t) => <StatusBadge status={t.priority} /> },
    { key: 'assigneeName', label: 'Assignee', render: (t) => t.assigneeName ? (
      <div className="flex items-center gap-2"><Avatar className="h-6 w-6"><AvatarFallback className="text-[10px]">{t.assigneeName.split(' ').map(n => n[0]).join('')}</AvatarFallback></Avatar><span className="text-sm">{t.assigneeName}</span></div>
    ) : <span className="text-muted-foreground">Unassigned</span> },
    { key: 'dueDate', label: 'Due Date', sortable: true },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => router.push(`/projects/${params.id}`)}>
            <ArrowLeft className="h-4 w-4 mr-1" /> Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Tasks</h1>
            <p className="text-muted-foreground">{project.name}</p>
          </div>
        </div>
        <Button onClick={() => toast.info('Add task form coming soon')}><Plus className="mr-2 h-4 w-4" /> Add Task</Button>
      </div>
      <DataTable
        data={projectTasks}
        columns={columns}
        searchPlaceholder="Search tasks..."
      />
    </div>
  );
}
