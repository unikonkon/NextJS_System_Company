import {
  LayoutDashboard, Users, Clock, CalendarOff, DollarSign, Star,
  FolderKanban, FileText, Receipt, CreditCard, BarChart3,
  Building2, Target, FileCheck, HeadphonesIcon,
  MessageSquare, Megaphone, BookOpen, Settings, TrendingUp
} from 'lucide-react';

export const DEPARTMENTS = [
  'Management', 'Human Resources', 'Project Management', 'Development',
  'Design', 'Quality Assurance', 'Sales', 'Finance & Accounting'
] as const;

export const SIDEBAR_MENU = [
  {
    label: 'Dashboard',
    href: '/',
    icon: LayoutDashboard,
    roles: ['ALL']
  },
  {
    label: 'HR & People',
    icon: Users,
    roles: ['SUPER_ADMIN', 'ADMIN', 'HR'],
    children: [
      { label: 'Employees', href: '/hr/employees', icon: Users },
      { label: 'Attendance', href: '/hr/attendance', icon: Clock },
      { label: 'Leave', href: '/hr/leave', icon: CalendarOff },
      { label: 'Payroll', href: '/hr/payroll', icon: DollarSign },
      { label: 'Performance', href: '/hr/performance', icon: Star },
    ]
  },
  {
    label: 'Projects',
    icon: FolderKanban,
    roles: ['ALL'],
    children: [
      { label: 'All Projects', href: '/projects', icon: FolderKanban },
    ]
  },
  {
    label: 'Finance',
    icon: Receipt,
    roles: ['SUPER_ADMIN', 'ADMIN', 'FINANCE', 'PM'],
    children: [
      { label: 'Quotations', href: '/finance/quotations', icon: FileText },
      { label: 'Invoices', href: '/finance/invoices', icon: Receipt },
      { label: 'Receipts', href: '/finance/receipts', icon: CreditCard },
      { label: 'Expenses', href: '/finance/expenses', icon: DollarSign },
      { label: 'Reports', href: '/finance/reports', icon: BarChart3 },
    ]
  },
  {
    label: 'CRM',
    icon: Building2,
    roles: ['SUPER_ADMIN', 'ADMIN', 'SALES', 'PM'],
    children: [
      { label: 'Clients', href: '/crm/clients', icon: Building2 },
      { label: 'Leads', href: '/crm/leads', icon: Target },
      { label: 'Contracts', href: '/crm/contracts', icon: FileCheck },
      { label: 'Support', href: '/crm/support', icon: HeadphonesIcon },
    ]
  },
  {
    label: 'Chat',
    href: '/chat',
    icon: MessageSquare,
    roles: ['ALL']
  },
  {
    label: 'Announcements',
    href: '/announcements',
    icon: Megaphone,
    roles: ['ALL']
  },
  {
    label: 'Wiki',
    href: '/wiki',
    icon: BookOpen,
    roles: ['ALL']
  },
  {
    label: 'Reports',
    href: '/reports',
    icon: TrendingUp,
    roles: ['SUPER_ADMIN', 'ADMIN', 'PM', 'FINANCE']
  },
  {
    label: 'Settings',
    href: '/settings',
    icon: Settings,
    roles: ['SUPER_ADMIN', 'ADMIN']
  },
];

export const STATUS_COLORS: Record<string, string> = {
  // Project
  PLANNING: 'bg-blue-100 text-blue-800',
  IN_PROGRESS: 'bg-yellow-100 text-yellow-800',
  ON_HOLD: 'bg-orange-100 text-orange-800',
  REVIEW: 'bg-purple-100 text-purple-800',
  COMPLETED: 'bg-green-100 text-green-800',
  CANCELLED: 'bg-red-100 text-red-800',
  // Task
  BACKLOG: 'bg-gray-100 text-gray-800',
  TODO: 'bg-blue-100 text-blue-800',
  TESTING: 'bg-indigo-100 text-indigo-800',
  DONE: 'bg-green-100 text-green-800',
  // General
  ACTIVE: 'bg-green-100 text-green-800',
  INACTIVE: 'bg-gray-100 text-gray-800',
  PENDING: 'bg-yellow-100 text-yellow-800',
  APPROVED: 'bg-green-100 text-green-800',
  REJECTED: 'bg-red-100 text-red-800',
  // Finance
  DRAFT: 'bg-gray-100 text-gray-800',
  SENT: 'bg-blue-100 text-blue-800',
  PAID: 'bg-green-100 text-green-800',
  OVERDUE: 'bg-red-100 text-red-800',
  EXPIRED: 'bg-orange-100 text-orange-800',
  // Lead
  NEW: 'bg-blue-100 text-blue-800',
  CONTACTED: 'bg-cyan-100 text-cyan-800',
  QUALIFIED: 'bg-indigo-100 text-indigo-800',
  PROPOSAL: 'bg-purple-100 text-purple-800',
  NEGOTIATION: 'bg-yellow-100 text-yellow-800',
  WON: 'bg-green-100 text-green-800',
  LOST: 'bg-red-100 text-red-800',
  // Priority
  LOW: 'bg-gray-100 text-gray-800',
  MEDIUM: 'bg-blue-100 text-blue-800',
  HIGH: 'bg-orange-100 text-orange-800',
  URGENT: 'bg-red-100 text-red-800',
  CRITICAL: 'bg-red-100 text-red-800',
  // Ticket
  OPEN: 'bg-blue-100 text-blue-800',
  WAITING: 'bg-yellow-100 text-yellow-800',
  RESOLVED: 'bg-green-100 text-green-800',
  CLOSED: 'bg-gray-100 text-gray-800',
  // Attendance
  PRESENT: 'bg-green-100 text-green-800',
  ABSENT: 'bg-red-100 text-red-800',
  LATE: 'bg-orange-100 text-orange-800',
  LEAVE: 'bg-purple-100 text-purple-800',
  HALF_DAY: 'bg-cyan-100 text-cyan-800',
  WORK_FROM_HOME: 'bg-teal-100 text-teal-800',
  // Announcement
  NORMAL: 'bg-blue-100 text-blue-800',
  IMPORTANT: 'bg-orange-100 text-orange-800',
  // Design
  REVISION: 'bg-yellow-100 text-yellow-800',
};

export const PRIORITY_COLORS: Record<string, string> = {
  LOW: 'text-gray-500',
  MEDIUM: 'text-blue-500',
  HIGH: 'text-orange-500',
  URGENT: 'text-red-500',
};
