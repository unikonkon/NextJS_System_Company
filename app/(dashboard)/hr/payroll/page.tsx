'use client';

import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, Column } from '@/components/shared/DataTable';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { StatsCard } from '@/components/shared/StatsCard';
import { mockPayroll } from '@/lib/mock/employees';
import { Payroll } from '@/types/hr.types';
import { DollarSign, Users, FileText, Calculator } from 'lucide-react';

export default function PayrollPage() {
  const totalPayroll = mockPayroll.reduce((sum, p) => sum + p.netSalary, 0);
  const paidCount = mockPayroll.filter(p => p.status === 'PAID').length;

  const columns: Column<Payroll>[] = [
    { key: 'employeeCode', label: 'Code', sortable: true },
    { key: 'employeeName', label: 'Employee', sortable: true },
    { key: 'department', label: 'Department' },
    { key: 'baseSalary', label: 'Base Salary', render: (p) => <span>฿{p.baseSalary.toLocaleString()}</span> },
    { key: 'overtime', label: 'OT', render: (p) => <span>฿{p.overtime.toLocaleString()}</span> },
    { key: 'deductions', label: 'Deductions', render: (p) => <span className="text-red-600">-฿{(p.deductions + p.tax + p.socialSecurity).toLocaleString()}</span> },
    { key: 'netSalary', label: 'Net Salary', render: (p) => <span className="font-bold">฿{p.netSalary.toLocaleString()}</span> },
    { key: 'status', label: 'Status', render: (p) => <StatusBadge status={p.status} /> },
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="Payroll" description="Monthly payroll management" />
      <div className="grid gap-4 md:grid-cols-4">
        <StatsCard title="Total Payroll" value={`฿${(totalPayroll / 1000).toFixed(0)}K`} icon={DollarSign} />
        <StatsCard title="Employees" value={mockPayroll.length} icon={Users} />
        <StatsCard title="Paid" value={paidCount} icon={FileText} />
        <StatsCard title="Pending" value={mockPayroll.length - paidCount} icon={Calculator} />
      </div>
      <DataTable
        data={mockPayroll}
        columns={columns}
        searchPlaceholder="Search payroll..."
      />
    </div>
  );
}