import { PriorityLevel } from './common.types';

export type ProjectStatus = 'PLANNING' | 'IN_PROGRESS' | 'ON_HOLD' | 'REVIEW' | 'COMPLETED' | 'CANCELLED';
export type TaskStatus = 'BACKLOG' | 'TODO' | 'IN_PROGRESS' | 'REVIEW' | 'TESTING' | 'DONE';
export type ProjectType = 'WEBSITE' | 'WEB_APP' | 'MOBILE_APP' | 'E_COMMERCE' | 'LANDING_PAGE' | 'MAINTENANCE';

export interface Project {
  id: string;
  name: string;
  description: string;
  clientId: string;
  clientName: string;
  type: ProjectType;
  status: ProjectStatus;
  priority: PriorityLevel;
  startDate: string;
  endDate: string;
  budget: number;
  spent: number;
  progress: number;
  managerId: string;
  managerName: string;
  members: ProjectMember[];
  phases: ProjectPhase[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ProjectMember {
  id: string;
  employeeId: string;
  employeeName: string;
  role: string;
  avatarUrl?: string;
}

export interface ProjectPhase {
  id: string;
  name: string;
  description?: string;
  startDate: string;
  endDate: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
  order: number;
}

export interface Task {
  id: string;
  projectId: string;
  projectName: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: PriorityLevel;
  assigneeId?: string;
  assigneeName?: string;
  assigneeAvatar?: string;
  reporterId: string;
  reporterName: string;
  dueDate?: string;
  estimatedHours?: number;
  actualHours?: number;
  tags: string[];
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectDocument {
  id: string;
  projectId: string;
  name: string;
  type: string;
  url: string;
  size: number;
  uploadedBy: string;
  uploadedByName: string;
  createdAt: string;
}

export interface DesignFile {
  id: string;
  projectId: string;
  name: string;
  thumbnailUrl: string;
  fileUrl: string;
  version: number;
  status: 'DRAFT' | 'REVIEW' | 'APPROVED' | 'REVISION';
  uploadedBy: string;
  uploadedByName: string;
  comments: number;
  createdAt: string;
}
