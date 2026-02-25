'use client';

import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, Column } from '@/components/shared/DataTable';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { mockContracts } from '@/lib/mock/clients';
import { Contract } from '@/types/crm.types';

export default function ContractsPage() {
  const columns: Column<Contract>[] = [
    { key: 'contractNumber', label: 'Contract #', sortable: true, render: (c) => <span className="font-mono text-sm">{c.contractNumber}</span> },
    { key: 'clientName', label: 'Client', sortable: true },
    { key: 'projectName', label: 'Project' },
    { key: 'value', label: 'Value', sortable: true, render: (c) => <span className="font-medium">฿{c.value.toLocaleString()}</span> },
    { key: 'startDate', label: 'Start' },
    { key: 'endDate', label: 'End' },
    { key: 'status', label: 'Status', render: (c) => <StatusBadge status={c.status} /> },
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="Contracts" description="Manage client contracts" />
      <DataTable data={mockContracts} columns={columns} searchPlaceholder="Search contracts..." />
    </div>
  );
}
