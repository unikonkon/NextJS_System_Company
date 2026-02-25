'use client';

import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, Column } from '@/components/shared/DataTable';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { mockClients } from '@/lib/mock/clients';
import { Client } from '@/types/crm.types';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';

export default function ClientsPage() {
  const columns: Column<Client>[] = [
    { key: 'name', label: 'Company', sortable: true, render: (c) => <span className="font-medium">{c.name}</span> },
    { key: 'contactPerson', label: 'Contact Person' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
    { key: 'totalProjects', label: 'Projects', sortable: true },
    { key: 'totalRevenue', label: 'Revenue', sortable: true, render: (c) => <span>฿{c.totalRevenue.toLocaleString()}</span> },
    { key: 'status', label: 'Status', render: (c) => <StatusBadge status={c.status} /> },
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="Clients" description="Manage client relationships" action={{ label: 'Add Client', onClick: () => toast.info('Add client form coming soon'), icon: Plus }} />
      <DataTable data={mockClients} columns={columns} searchPlaceholder="Search clients..." />
    </div>
  );
}
