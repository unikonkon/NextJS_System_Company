'use client';

import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, Column } from '@/components/shared/DataTable';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { mockSupportTickets } from '@/lib/mock/clients';
import { SupportTicket } from '@/types/crm.types';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';

export default function SupportPage() {
  const columns: Column<SupportTicket>[] = [
    { key: 'ticketNumber', label: 'Ticket #', sortable: true, render: (t) => <span className="font-mono text-sm">{t.ticketNumber}</span> },
    { key: 'subject', label: 'Subject', sortable: true, render: (t) => <span className="font-medium">{t.subject}</span> },
    { key: 'clientName', label: 'Client' },
    { key: 'category', label: 'Category' },
    { key: 'priority', label: 'Priority', render: (t) => <StatusBadge status={t.priority} /> },
    { key: 'status', label: 'Status', render: (t) => <StatusBadge status={t.status} /> },
    { key: 'assignedToName', label: 'Assigned To', render: (t) => <span>{t.assignedToName || 'Unassigned'}</span> },
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="Support Tickets" description="Manage client support requests" action={{ label: 'New Ticket', onClick: () => toast.info('New ticket form coming soon'), icon: Plus }} />
      <DataTable data={mockSupportTickets} columns={columns} searchPlaceholder="Search tickets..." />
    </div>
  );
}
