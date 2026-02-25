export type UserRole = 'SUPER_ADMIN' | 'ADMIN' | 'HR' | 'PM' | 'DEVELOPER' | 'DESIGNER' | 'QA' | 'SALES' | 'FINANCE';

export type Permission =
  | 'dashboard:view'
  | 'hr:view' | 'hr:create' | 'hr:edit' | 'hr:delete' | 'hr:approve'
  | 'project:view' | 'project:create' | 'project:edit' | 'project:delete' | 'project:manage'
  | 'task:view' | 'task:create' | 'task:edit' | 'task:delete' | 'task:assign'
  | 'finance:view' | 'finance:create' | 'finance:edit' | 'finance:delete' | 'finance:approve'
  | 'crm:view' | 'crm:create' | 'crm:edit' | 'crm:delete'
  | 'chat:view' | 'chat:create' | 'chat:manage'
  | 'settings:view' | 'settings:edit'
  | 'reports:view';

export interface AuthUser {
  id: string;
  email: string;
  role: UserRole;
  employeeId: string;
  employeeCode: string;
  firstName: string;
  lastName: string;
  avatarUrl?: string;
}
