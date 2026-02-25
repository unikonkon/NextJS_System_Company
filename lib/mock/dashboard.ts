// ──────────────────────────────────────────────
// Dashboard Mock Data
// ──────────────────────────────────────────────

export const mockKPIs = {
  totalEmployees: 20,
  activeProjects: 4,
  monthlyRevenue: 2450000,
  revenueGrowth: 12.5,
  pendingInvoices: 3,
  pendingInvoicesAmount: 875000,
  tasksCompleted: 45,
  tasksTotal: 78,
  clientSatisfaction: 4.6,
  attendanceRate: 95,
};

export const mockRevenueChart = [
  { month: 'Sep', revenue: 1800000, expenses: 1200000 },
  { month: 'Oct', revenue: 2100000, expenses: 1350000 },
  { month: 'Nov', revenue: 1950000, expenses: 1280000 },
  { month: 'Dec', revenue: 2300000, expenses: 1450000 },
  { month: 'Jan', revenue: 2200000, expenses: 1380000 },
  { month: 'Feb', revenue: 2450000, expenses: 1420000 },
];

export const mockProjectStatusChart = [
  { status: 'Planning', count: 1 },
  { status: 'In Progress', count: 3 },
  { status: 'Review', count: 1 },
  { status: 'Completed', count: 1 },
];

export const mockRecentActivity = [
  { id: '1', type: 'task', message: 'Peemwit completed "Homepage responsive design"', time: '10 min ago' },
  { id: '2', type: 'project', message: 'Tanakorn updated project "E-Commerce Platform" progress to 65%', time: '30 min ago' },
  { id: '3', type: 'finance', message: 'Invoice #INV-2026-004 has been paid by ABC Corp', time: '1 hour ago' },
  { id: '4', type: 'hr', message: 'Mintita requested annual leave (Mar 1-3)', time: '2 hours ago' },
  { id: '5', type: 'crm', message: 'New lead "Digital Commerce Co" added by Joyrada', time: '3 hours ago' },
  { id: '6', type: 'chat', message: 'New announcement: "Monthly Team Meeting - Feb 28"', time: '4 hours ago' },
  { id: '7', type: 'task', message: 'Bankitti moved "API rate limiting" to Review', time: '5 hours ago' },
  { id: '8', type: 'hr', message: 'Nida approved leave request for Oatpiya', time: '6 hours ago' },
];
