'use client';

import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, Column } from '@/components/shared/DataTable';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { mockExpenses } from '@/lib/mock/finance';
import { Expense } from '@/types/finance.types';
import { Plus, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function ExpensesPage() {
  const columns: Column<Expense>[] = [
    { key: 'description', label: 'Description', sortable: true },
    { key: 'category', label: 'Category', render: (e) => <StatusBadge status={e.category} /> },
    { key: 'amount', label: 'Amount', sortable: true, render: (e) => <span className="font-medium">฿{e.amount.toLocaleString()}</span> },
    { key: 'date', label: 'Date', sortable: true },
    { key: 'requestedByName', label: 'Requested By' },
    { key: 'status', label: 'Status', render: (e) => <StatusBadge status={e.status} /> },
    {
      key: 'actions', label: 'Actions',
      render: (e) => e.status === 'PENDING' ? (
        <div className="flex gap-1">
          <Button size="sm" variant="ghost" className="text-green-600 h-7 px-2" onClick={() => toast.success('Expense approved')}>
            <Check className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="ghost" className="text-red-600 h-7 px-2" onClick={() => toast.success('Expense rejected')}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : null,
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Expenses"
        description="Track and approve expense requests"
        action={{ label: 'New Expense', onClick: () => toast.info('New expense form coming soon'), icon: Plus }}
      />
      <DataTable
        data={mockExpenses}
        columns={columns}
        searchPlaceholder="Search expenses..."
      />
    </div>
  );
}
