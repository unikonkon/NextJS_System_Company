'use client';

import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, Column } from '@/components/shared/DataTable';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { mockQuotations } from '@/lib/mock/finance';
import { Quotation } from '@/types/finance.types';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';

export default function QuotationsPage() {
  const columns: Column<Quotation>[] = [
    { key: 'quotationNumber', label: 'Number', sortable: true, render: (q) => <span className="font-mono text-sm">{q.quotationNumber}</span> },
    { key: 'clientName', label: 'Client', sortable: true },
    { key: 'projectName', label: 'Project' },
    { key: 'total', label: 'Total', sortable: true, render: (q) => <span className="font-medium">฿{q.total.toLocaleString()}</span> },
    { key: 'status', label: 'Status', render: (q) => <StatusBadge status={q.status} /> },
    { key: 'validUntil', label: 'Valid Until', sortable: true },
    { key: 'createdByName', label: 'Created By' },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Quotations"
        description="Manage quotations and proposals"
        action={{ label: 'New Quotation', onClick: () => toast.info('New quotation form coming soon'), icon: Plus }}
      />
      <DataTable
        data={mockQuotations}
        columns={columns}
        searchPlaceholder="Search quotations..."
      />
    </div>
  );
}
