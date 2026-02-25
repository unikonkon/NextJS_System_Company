'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, Column } from '@/components/shared/DataTable';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { mockEmployees } from '@/lib/mock/employees';
import { Employee } from '@/types/hr.types';
import { Plus, Grid3X3, List } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function EmployeesPage() {
  const router = useRouter();
  const [view, setView] = useState<'table' | 'grid'>('table');

  const columns: Column<Employee>[] = [
    {
      key: 'employeeCode',
      label: 'Code',
      sortable: true,
      render: (emp) => <span className="font-mono text-sm">{emp.employeeCode}</span>,
    },
    {
      key: 'firstName',
      label: 'Name',
      sortable: true,
      render: (emp) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="text-xs">{emp.firstName[0]}{emp.lastName[0]}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{emp.firstName} {emp.lastName}</p>
            <p className="text-xs text-muted-foreground">{emp.nickname}</p>
          </div>
        </div>
      ),
    },
    { key: 'department', label: 'Department', sortable: true },
    { key: 'position', label: 'Position', sortable: true },
    {
      key: 'role',
      label: 'Role',
      render: (emp) => <StatusBadge status={emp.role} />,
    },
    {
      key: 'status',
      label: 'Status',
      render: (emp) => <StatusBadge status={emp.status} />,
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Employees"
        description="Manage your team members"
        action={{ label: 'Add Employee', onClick: () => router.push('/hr/employees/new'), icon: Plus }}
      >
        <div className="flex gap-1 border rounded-lg p-1">
          <Button variant={view === 'table' ? 'secondary' : 'ghost'} size="sm" onClick={() => setView('table')}>
            <List className="h-4 w-4" />
          </Button>
          <Button variant={view === 'grid' ? 'secondary' : 'ghost'} size="sm" onClick={() => setView('grid')}>
            <Grid3X3 className="h-4 w-4" />
          </Button>
        </div>
      </PageHeader>

      {view === 'table' ? (
        <DataTable
          data={mockEmployees}
          columns={columns}
          searchPlaceholder="Search employees..."
          onRowClick={(emp) => router.push(`/hr/employees/${emp.id}`)}
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {mockEmployees.map(emp => (
            <Card key={emp.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => router.push(`/hr/employees/${emp.id}`)}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback>{emp.firstName[0]}{emp.lastName[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{emp.firstName} {emp.lastName}</p>
                    <p className="text-sm text-muted-foreground">{emp.position}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{emp.department}</span>
                  <StatusBadge status={emp.role} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}