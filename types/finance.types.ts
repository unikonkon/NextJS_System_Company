import { ApprovalStatus } from './common.types';

export type QuotationStatus = 'DRAFT' | 'SENT' | 'APPROVED' | 'REJECTED' | 'EXPIRED';
export type InvoiceStatus = 'DRAFT' | 'SENT' | 'PAID' | 'OVERDUE' | 'CANCELLED';
export type ExpenseCategory = 'OFFICE' | 'EQUIPMENT' | 'SOFTWARE' | 'TRAVEL' | 'MARKETING' | 'UTILITIES' | 'OTHER';
export type PaymentMethod = 'BANK_TRANSFER' | 'CREDIT_CARD' | 'CASH' | 'CHECK' | 'PROMPTPAY';

export interface QuotationItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Quotation {
  id: string;
  quotationNumber: string;
  clientId: string;
  clientName: string;
  projectName: string;
  items: QuotationItem[];
  subtotal: number;
  discount: number;
  vat: number;
  total: number;
  status: QuotationStatus;
  validUntil: string;
  notes?: string;
  createdBy: string;
  createdByName: string;
  createdAt: string;
  updatedAt: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  quotationId?: string;
  clientId: string;
  clientName: string;
  projectName: string;
  items: QuotationItem[];
  subtotal: number;
  discount: number;
  vat: number;
  total: number;
  status: InvoiceStatus;
  dueDate: string;
  paidAt?: string;
  paymentMethod?: PaymentMethod;
  notes?: string;
  createdBy: string;
  createdByName: string;
  createdAt: string;
}

export interface Receipt {
  id: string;
  receiptNumber: string;
  invoiceId: string;
  invoiceNumber: string;
  clientName: string;
  amount: number;
  paymentMethod: PaymentMethod;
  paidAt: string;
  createdBy: string;
  createdByName: string;
  createdAt: string;
}

export interface Expense {
  id: string;
  description: string;
  category: ExpenseCategory;
  amount: number;
  receipt?: string;
  date: string;
  requestedBy: string;
  requestedByName: string;
  status: ApprovalStatus;
  approvedBy?: string;
  approvedByName?: string;
  notes?: string;
  createdAt: string;
}
