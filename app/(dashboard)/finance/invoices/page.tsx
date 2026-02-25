'use client';

import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, Column } from '@/components/shared/DataTable';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { StatsCard } from '@/components/shared/StatsCard';
import { mockInvoices } from '@/lib/mock/finance';
import { Invoice } from '@/types/finance.types';
import { Plus, FileText, DollarSign, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

export default function InvoicesPage() {
  const totalAmount = mockInvoices.reduce((sum, inv) => sum + inv.total, 0);
  const paidAmount = mockInvoices.filter(i => i.status === 'PAID').reduce((sum, inv) => sum + inv.total, 0);
  const overdueCount = mockInvoices.filter(i => i.status === 'OVERDUE').length;

  const columns: Column<Invoice>[] = [
    { key: 'invoiceNumber', label: 'Invoice #', sortable: true, render: (i) => <span className="font-mono text-sm">{i.invoiceNumber}</span> },
    { key: 'clientName', label: 'Client', sortable: true },
    { key: 'projectName', label: 'Project' },
    { key: 'total', label: 'Amount', sortable: true, render: (i) => <span className="font-medium">฿{i.total.toLocaleString()}</span> },
    { key: 'status', label: 'Status', render: (i) => <StatusBadge status={i.status} /> },
    { key: 'dueDate', label: 'Due Date', sortable: true },
    { key: 'createdByName', label: 'Created By' },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Invoices"
        description="Track and manage invoices"
        action={{ label: 'New Invoice', onClick: () => toast.info('New invoice form coming soon'), icon: Plus }}
      />
      <div className="grid gap-4 md:grid-cols-4">
        <StatsCard title="Total Invoiced" value={`฿${(totalAmount / 1000).toFixed(0)}K`} icon={FileText} />
        <StatsCard title="Paid" value={`฿${(paidAmount / 1000).toFixed(0)}K`} icon={CheckCircle2} />
        <StatsCard title="Outstanding" value={`฿${((totalAmount - paidAmount) / 1000).toFixed(0)}K`} icon={DollarSign} />
        <StatsCard title="Overdue" value={overdueCount} icon={AlertTriangle} />
      </div>
      <DataTable
        data={mockInvoices}
        columns={columns}
        searchPlaceholder="Search invoices..."
      />
    </div>
  );
}
