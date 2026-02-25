'use client';

import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, Column } from '@/components/shared/DataTable';
import { mockReceipts } from '@/lib/mock/finance';
import { Receipt } from '@/types/finance.types';

export default function ReceiptsPage() {
  const columns: Column<Receipt>[] = [
    { key: 'receiptNumber', label: 'Receipt #', sortable: true, render: (r) => <span className="font-mono text-sm">{r.receiptNumber}</span> },
    { key: 'invoiceNumber', label: 'Invoice #', render: (r) => <span className="font-mono text-sm">{r.invoiceNumber}</span> },
    { key: 'clientName', label: 'Client', sortable: true },
    { key: 'amount', label: 'Amount', sortable: true, render: (r) => <span className="font-medium">฿{r.amount.toLocaleString()}</span> },
    { key: 'paymentMethod', label: 'Payment', render: (r) => <span className="text-sm">{r.paymentMethod.replace(/_/g, ' ')}</span> },
    { key: 'paidAt', label: 'Paid Date', sortable: true },
    { key: 'createdByName', label: 'Created By' },
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="Receipts" description="Payment receipts" />
      <DataTable
        data={mockReceipts}
        columns={columns}
        searchPlaceholder="Search receipts..."
      />
    </div>
  );
}
