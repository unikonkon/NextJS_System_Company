'use client';

import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, Column } from '@/components/shared/DataTable';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { mockAttendance } from '@/lib/mock/employees';
import { Attendance } from '@/types/hr.types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, LogIn, LogOut } from 'lucide-react';
import { toast } from 'sonner';

export default function AttendancePage() {
  const columns: Column<Attendance>[] = [
    { key: 'employeeName', label: 'Employee', sortable: true },
    { key: 'date', label: 'Date', sortable: true },
    { key: 'checkIn', label: 'Check In', render: (a) => <span>{a.checkIn || '-'}</span> },
    { key: 'checkOut', label: 'Check Out', render: (a) => <span>{a.checkOut || '-'}</span> },
    { key: 'status', label: 'Status', render: (a) => <StatusBadge status={a.status} /> },
    { key: 'overtime', label: 'OT (hrs)', render: (a) => <span>{a.overtime || 0}</span> },
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="Attendance" description="Track daily attendance" />
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="rounded-lg bg-green-100 p-3"><LogIn className="h-5 w-5 text-green-600" /></div>
            <div>
              <p className="text-sm text-muted-foreground">Check In</p>
              <Button size="sm" className="mt-1" onClick={() => toast.success('Checked in at ' + new Date().toLocaleTimeString())}>
                Check In Now
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="rounded-lg bg-red-100 p-3"><LogOut className="h-5 w-5 text-red-600" /></div>
            <div>
              <p className="text-sm text-muted-foreground">Check Out</p>
              <Button size="sm" variant="outline" className="mt-1" onClick={() => toast.success('Checked out at ' + new Date().toLocaleTimeString())}>
                Check Out Now
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="rounded-lg bg-blue-100 p-3"><Clock className="h-5 w-5 text-blue-600" /></div>
            <div>
              <p className="text-sm text-muted-foreground">Today</p>
              <p className="text-lg font-bold">{new Date().toLocaleDateString('th-TH', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
          </CardContent>
        </Card>
      </div>
      <DataTable
        data={mockAttendance}
        columns={columns}
        searchPlaceholder="Search attendance..."
      />
    </div>
  );
}