'use client';

import { useRouter } from 'next/navigation';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Save } from 'lucide-react';
import { toast } from 'sonner';

export default function NewProjectPage() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Project created successfully (mock)');
    router.push('/projects');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4 mr-1" /> Back
        </Button>
        <PageHeader title="Create New Project" />
      </div>
      <Card>
        <CardHeader><CardTitle>Project Details</CardTitle></CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2 sm:col-span-2">
                <Label>Project Name</Label>
                <Input placeholder="Project name" required />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label>Description</Label>
                <Textarea placeholder="Project description" rows={3} />
              </div>
              <div className="space-y-2">
                <Label>Client</Label>
                <Select><SelectTrigger><SelectValue placeholder="Select client" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="abc">ABC Corp</SelectItem>
                    <SelectItem value="xyz">XYZ Ltd</SelectItem>
                    <SelectItem value="thai">Thai Finance Bank</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Type</Label>
                <Select><SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                  <SelectContent>
                    {['WEBSITE','WEB_APP','MOBILE_APP','E_COMMERCE','LANDING_PAGE','MAINTENANCE'].map(t => (
                      <SelectItem key={t} value={t}>{t.replace(/_/g, ' ')}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2"><Label>Start Date</Label><Input type="date" required /></div>
              <div className="space-y-2"><Label>End Date</Label><Input type="date" required /></div>
              <div className="space-y-2"><Label>Budget (THB)</Label><Input type="number" placeholder="0" /></div>
              <div className="space-y-2">
                <Label>Priority</Label>
                <Select><SelectTrigger><SelectValue placeholder="Select priority" /></SelectTrigger>
                  <SelectContent>
                    {['LOW','MEDIUM','HIGH','URGENT'].map(p => (
                      <SelectItem key={p} value={p}>{p}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
              <Button type="submit"><Save className="mr-2 h-4 w-4" /> Create Project</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
