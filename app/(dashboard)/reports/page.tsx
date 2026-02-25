'use client';

import { PageHeader } from '@/components/shared/PageHeader';
import { StatsCard } from '@/components/shared/StatsCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, FolderKanban, DollarSign, Star, TrendingUp, Clock } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

const teamProductivity = [
  { team: 'Dev', tasks: 42, hours: 320 },
  { team: 'Design', tasks: 28, hours: 210 },
  { team: 'QA', tasks: 35, hours: 180 },
  { team: 'PM', tasks: 15, hours: 160 },
];

const projectTypeData = [
  { type: 'Website', count: 3 },
  { type: 'Web App', count: 2 },
  { type: 'E-Commerce', count: 1 },
];

const COLORS = ['#3b82f6', '#22c55e', '#f59e0b', '#8b5cf6'];

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Reports & Analytics" description="Company-wide performance metrics" />
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
        <StatsCard title="Team Size" value={20} icon={Users} />
        <StatsCard title="Active Projects" value={4} icon={FolderKanban} />
        <StatsCard title="Monthly Revenue" value="฿2.5M" icon={DollarSign} />
        <StatsCard title="Avg Satisfaction" value="4.6/5" icon={Star} />
        <StatsCard title="Revenue Growth" value="+12.5%" icon={TrendingUp} />
        <StatsCard title="Avg Work Hours" value="8.2h" icon={Clock} />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle className="text-base">Team Productivity</CardTitle></CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={teamProductivity}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="team" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="tasks" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Tasks Completed" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">Project Types</CardTitle></CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={projectTypeData} cx="50%" cy="50%" outerRadius={100} dataKey="count" nameKey="type" label>
                    {projectTypeData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
