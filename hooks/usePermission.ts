'use client';

import { useAuthStore } from '@/stores/authStore';
import { hasPermission, hasAnyPermission } from '@/lib/auth/permissions';
import type { Permission } from '@/types/auth.types';

export function usePermission() {
  const user = useAuthStore((s) => s.user);

  return {
    can: (permission: Permission) => user ? hasPermission(user.role, permission) : false,
    canAny: (permissions: Permission[]) => user ? hasAnyPermission(user.role, permissions) : false,
    role: user?.role ?? null,
  };
}
