import { create } from 'zustand';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  href?: string;
  createdAt: string;
}

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, 'id' | 'read' | 'createdAt'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  removeNotification: (id: string) => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [
    { id: '1', title: 'New Task Assigned', message: 'You have been assigned to "Homepage Redesign"', type: 'info', read: false, href: '/projects', createdAt: '2026-02-25T09:00:00Z' },
    { id: '2', title: 'Leave Approved', message: 'Your leave request has been approved', type: 'success', read: false, href: '/hr/leave', createdAt: '2026-02-25T08:30:00Z' },
    { id: '3', title: 'Invoice Overdue', message: 'Invoice #INV-2026-003 is overdue', type: 'warning', read: true, href: '/finance/invoices', createdAt: '2026-02-24T14:00:00Z' },
    { id: '4', title: 'New Message', message: 'Tanakorn sent a message in #project-alpha', type: 'info', read: true, href: '/chat', createdAt: '2026-02-24T11:00:00Z' },
  ],
  unreadCount: 2,
  addNotification: (notification) => set((s) => {
    const newNotification: Notification = {
      ...notification, id: Date.now().toString(), read: false, createdAt: new Date().toISOString(),
    };
    return { notifications: [newNotification, ...s.notifications], unreadCount: s.unreadCount + 1 };
  }),
  markAsRead: (id) => set((s) => ({
    notifications: s.notifications.map(n => n.id === id ? { ...n, read: true } : n),
    unreadCount: Math.max(0, s.unreadCount - (s.notifications.find(n => n.id === id && !n.read) ? 1 : 0)),
  })),
  markAllAsRead: () => set((s) => ({
    notifications: s.notifications.map(n => ({ ...n, read: true })),
    unreadCount: 0,
  })),
  removeNotification: (id) => set((s) => ({
    notifications: s.notifications.filter(n => n.id !== id),
    unreadCount: s.unreadCount - (s.notifications.find(n => n.id === id && !n.read) ? 1 : 0),
  })),
}));
