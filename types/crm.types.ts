export type ClientStatus = 'ACTIVE' | 'INACTIVE' | 'PROSPECT';
export type LeadStatus = 'NEW' | 'CONTACTED' | 'QUALIFIED' | 'PROPOSAL' | 'NEGOTIATION' | 'WON' | 'LOST';
export type ContractStatus = 'DRAFT' | 'ACTIVE' | 'EXPIRED' | 'TERMINATED';
export type TicketPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
export type TicketStatus = 'OPEN' | 'IN_PROGRESS' | 'WAITING' | 'RESOLVED' | 'CLOSED';

export interface Client {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  address?: string;
  website?: string;
  industry?: string;
  status: ClientStatus;
  totalProjects: number;
  totalRevenue: number;
  accountManager?: string;
  accountManagerName?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Lead {
  id: string;
  companyName: string;
  contactName: string;
  email: string;
  phone?: string;
  source: string;
  status: LeadStatus;
  estimatedValue: number;
  probability: number;
  assignedTo: string;
  assignedToName: string;
  nextFollowUp?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Contract {
  id: string;
  contractNumber: string;
  clientId: string;
  clientName: string;
  projectName: string;
  value: number;
  startDate: string;
  endDate: string;
  status: ContractStatus;
  type: string;
  signedAt?: string;
  documentUrl?: string;
  createdAt: string;
}

export interface SupportTicket {
  id: string;
  ticketNumber: string;
  clientId: string;
  clientName: string;
  subject: string;
  description: string;
  priority: TicketPriority;
  status: TicketStatus;
  assignedTo?: string;
  assignedToName?: string;
  category: string;
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string;
}
