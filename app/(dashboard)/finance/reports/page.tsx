'use client';

import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatsCard } from '@/components/shared/StatsCard';
import { DollarSign, TrendingUp, TrendingDown, Percent } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const monthlyData = [
  { month: 'Sep', income: 1800000, expense: 1200000, profit: 600000 },
  { month: 'Oct', income: 2100000, expense: 1350000, profit: 750000 },
  { month: 'Nov', income: 1950000, expense: 1280000, profit: 670000 },
  { month: 'Dec', income: 2300000, expense: 1450000, profit: 850000 },
  { month: 'Jan', income: 2200000, expense: 1380000, profit: 820000 },
  { month: 'Feb', income: 2450000, expense: 1420000, profit: 1030000 },
];

const categoryExpenses = [
  { category: 'Salaries', amount: 980000 },
  { category: 'Software', amount: 120000 },
  { category: 'Office', amount: 85000 },
  { category: 'Marketing', amount: 150000 },
  { category: 'Utilities', amount: 45000 },
  { category: 'Equipment', amount: 40000 },
];

export default function FinanceReportsPage() {
  const totalIncome = monthlyData.reduce((sum, d) => sum + d.income, 0);
  const totalExpense = monthlyData.reduce((sum, d) => sum + d.expense, 0);
  const totalProfit = totalIncome - totalExpense;
  const profitMargin = ((totalProfit / totalIncome) * 100).toFixed(1);

  return (
    <div className="space-y-6">
      <PageHeader title="Financial Reports" description="Financial overview and analytics" />
      <div className="grid gap-4 md:grid-cols-4">
        <StatsCard title="Total Income (6M)" value={`฿${(totalIncome / 1000000).toFixed(1)}M`} icon={TrendingUp} />
        <StatsCard title="Total Expenses (6M)" value={`฿${(totalExpense / 1000000).toFixed(1)}M`} icon={TrendingDown} />
        <StatsCard title="Net Profit (6M)" value={`฿${(totalProfit / 1000000).toFixed(1)}M`} icon={DollarSign} />
        <StatsCard title="Profit Margin" value={`${profitMargin}%`} icon={Percent} />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle className="text-base">Income vs Expenses</CardTitle></CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={(v) => `${(v / 1000000).toFixed(1)}M`} />
                  <Tooltip formatter={(value) => `฿${Number(value).toLocaleString()}`} />
                  <Bar dataKey="income" fill="#22c55e" radius={[4, 4, 0, 0]} name="Income" />
                  <Bar dataKey="expense" fill="#ef4444" radius={[4, 4, 0, 0]} name="Expenses" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">Profit Trend</CardTitle></CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={(v) => `${(v / 1000000).toFixed(1)}M`} />
                  <Tooltip formatter={(value) => `฿${Number(value).toLocaleString()}`} />
                  <Line type="monotone" dataKey="profit" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} name="Profit" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-base">Expense Breakdown (This Month)</CardTitle></CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryExpenses} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" tickFormatter={(v) => `฿${(v / 1000).toFixed(0)}K`} />
                <YAxis type="category" dataKey="category" width={80} />
                <Tooltip formatter={(value) => `฿${Number(value).toLocaleString()}`} />
                <Bar dataKey="amount" fill="#8b5cf6" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
