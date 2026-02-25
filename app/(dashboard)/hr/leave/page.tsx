'use client';

import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, Column } from '@/components/shared/DataTable';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { mockLeaveRequests } from '@/lib/mock/employees';
import { LeaveRequest } from '@/types/hr.types';
import { Button } from '@/components/ui/button';
import { Plus, Check, X } from 'lucide-react';
import { toast } from 'sonner';

export default function LeavePage() {
  const columns: Column<LeaveRequest>[] = [
    { key: 'employeeName', label: 'Employee', sortable: true },
    { key: 'type', label: 'Type', render: (l) => <StatusBadge status={l.type} /> },
    { key: 'startDate', label: 'Start Date', sortable: true },
    { key: 'endDate', label: 'End Date' },
    { key: 'days', label: 'Days' },
    { key: 'reason', label: 'Reason', render: (l) => <span className="truncate max-w-[200px] block">{l.reason}</span> },
    { key: 'status', label: 'Status', render: (l) => <StatusBadge status={l.status} /> },
    {
      key: 'actions',
      label: 'Actions',
      render: (l) => l.status === 'PENDING' ? (
        <div className="flex gap-1">
          <Button size="sm" variant="ghost" className="text-green-600 h-7 px-2" onClick={() => toast.success('Leave approved')}>
            <Check className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="ghost" className="text-red-600 h-7 px-2" onClick={() => toast.success('Leave rejected')}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : null,
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Leave Management"
        description="Manage leave requests and approvals"
        action={{ label: 'Request Leave', onClick: () => toast.info('Leave form coming soon'), icon: Plus }}
      />
      <DataTable
        data={mockLeaveRequests}
        columns={columns}
        searchPlaceholder="Search leave requests..."
      />
    </div>
  );
}