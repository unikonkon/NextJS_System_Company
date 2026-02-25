'use client';

import { useParams, useRouter } from 'next/navigation';
import { mockProjects } from '@/lib/mock/projects';
import { mockTasks } from '@/lib/mock/tasks';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ArrowLeft } from 'lucide-react';
import { TaskStatus } from '@/types/project.types';

const COLUMNS: { status: TaskStatus; label: string; color: string }[] = [
  { status: 'BACKLOG', label: 'Backlog', color: 'bg-gray-200' },
  { status: 'TODO', label: 'To Do', color: 'bg-blue-200' },
  { status: 'IN_PROGRESS', label: 'In Progress', color: 'bg-yellow-200' },
  { status: 'REVIEW', label: 'Review', color: 'bg-purple-200' },
  { status: 'TESTING', label: 'Testing', color: 'bg-indigo-200' },
  { status: 'DONE', label: 'Done', color: 'bg-green-200' },
];

export default function KanbanBoardPage() {
  const params = useParams();
  const router = useRouter();
  const project = mockProjects.find(p => p.id === params.id);
  const projectTasks = mockTasks.filter(t => t.projectId === params.id);

  if (!project) return <div className="p-8 text-center">Project not found</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => router.push(`/projects/${params.id}`)}>
          <ArrowLeft className="h-4 w-4 mr-1" /> Back
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Kanban Board</h1>
          <p className="text-muted-foreground">{project.name}</p>
        </div>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4">
        {COLUMNS.map(col => {
          const tasks = projectTasks.filter(t => t.status === col.status);
          return (
            <div key={col.status} className="min-w-[280px] flex-shrink-0">
              <div className="flex items-center gap-2 mb-3">
                <div className={`h-3 w-3 rounded-full ${col.color}`} />
                <h3 className="font-medium text-sm">{col.label}</h3>
                <span className="text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded-full">{tasks.length}</span>
              </div>
              <div className="space-y-2">
                {tasks.map(task => (
                  <Card key={task.id} className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardContent className="p-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <StatusBadge status={task.priority} />
                        <span className="text-xs text-muted-foreground">{task.id.slice(0, 8)}</span>
                      </div>
                      <p className="font-medium text-sm">{task.title}</p>
                      {task.dueDate && <p className="text-xs text-muted-foreground">Due: {task.dueDate}</p>}
                      <div className="flex items-center justify-between">
                        {task.assigneeName ? (
                          <div className="flex items-center gap-1">
                            <Avatar className="h-5 w-5">
                              <AvatarFallback className="text-[8px]">{task.assigneeName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <span className="text-xs text-muted-foreground">{task.assigneeName}</span>
                          </div>
                        ) : <span />}
                        <div className="flex gap-1">
                          {task.tags.slice(0, 2).map(tag => (
                            <span key={tag} className="text-[10px] bg-muted px-1.5 py-0.5 rounded">{tag}</span>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                {tasks.length === 0 && (
                  <div className="text-center py-8 text-sm text-muted-foreground border border-dashed rounded-lg">
                    No tasks
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
