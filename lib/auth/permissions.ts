import type { UserRole, Permission } from '@/types/auth.types';

const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  SUPER_ADMIN: [
    'dashboard:view', 'hr:view', 'hr:create', 'hr:edit', 'hr:delete', 'hr:approve',
    'project:view', 'project:create', 'project:edit', 'project:delete', 'project:manage',
    'task:view', 'task:create', 'task:edit', 'task:delete', 'task:assign',
    'finance:view', 'finance:create', 'finance:edit', 'finance:delete', 'finance:approve',
    'crm:view', 'crm:create', 'crm:edit', 'crm:delete',
    'chat:view', 'chat:create', 'chat:manage',
    'settings:view', 'settings:edit', 'reports:view',
  ],
  ADMIN: [
    'dashboard:view', 'hr:view', 'hr:create', 'hr:edit', 'hr:approve',
    'project:view', 'project:create', 'project:edit', 'project:manage',
    'task:view', 'task:create', 'task:edit', 'task:assign',
    'finance:view', 'finance:create', 'finance:edit', 'finance:approve',
    'crm:view', 'crm:create', 'crm:edit',
    'chat:view', 'chat:create', 'chat:manage',
    'settings:view', 'settings:edit', 'reports:view',
  ],
  HR: [
    'dashboard:view', 'hr:view', 'hr:create', 'hr:edit', 'hr:approve',
    'project:view', 'task:view',
    'chat:view', 'chat:create', 'reports:view',
  ],
  PM: [
    'dashboard:view', 'hr:view',
    'project:view', 'project:create', 'project:edit', 'project:manage',
    'task:view', 'task:create', 'task:edit', 'task:delete', 'task:assign',
    'finance:view', 'finance:create', 'finance:edit',
    'crm:view', 'crm:create', 'crm:edit',
    'chat:view', 'chat:create', 'reports:view',
  ],
  DEVELOPER: [
    'dashboard:view', 'project:view', 'task:view', 'task:create', 'task:edit',
    'chat:view', 'chat:create',
  ],
  DESIGNER: [
    'dashboard:view', 'project:view', 'task:view', 'task:create', 'task:edit',
    'chat:view', 'chat:create',
  ],
  QA: [
    'dashboard:view', 'project:view', 'task:view', 'task:create', 'task:edit',
    'chat:view', 'chat:create',
  ],
  SALES: [
    'dashboard:view', 'project:view',
    'finance:view', 'finance:create',
    'crm:view', 'crm:create', 'crm:edit',
    'chat:view', 'chat:create', 'reports:view',
  ],
  FINANCE: [
    'dashboard:view',
    'finance:view', 'finance:create', 'finance:edit', 'finance:approve',
    'chat:view', 'chat:create', 'reports:view',
  ],
};

export function hasPermission(role: UserRole, permission: Permission): boolean {
  return ROLE_PERMISSIONS[role]?.includes(permission) ?? false;
}

export function getPermissions(role: UserRole): Permission[] {
  return ROLE_PERMISSIONS[role] ?? [];
}

export function hasAnyPermission(role: UserRole, permissions: Permission[]): boolean {
  return permissions.some(p => hasPermission(role, p));
}
