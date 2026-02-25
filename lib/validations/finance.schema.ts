import { z } from 'zod';

const quotationItemSchema = z.object({
  description: z.string().min(1, 'Description is required'),
  quantity: z.number().positive(),
  unitPrice: z.number().positive(),
});

export const quotationSchema = z.object({
  clientId: z.string().min(1, 'Client is required'),
  projectName: z.string().min(1, 'Project name is required'),
  items: z.array(quotationItemSchema).min(1, 'At least one item is required'),
  discount: z.number().min(0).default(0),
  validUntil: z.string().min(1, 'Valid until date is required'),
  notes: z.string().optional(),
});

export const expenseSchema = z.object({
  description: z.string().min(1, 'Description is required'),
  category: z.enum(['OFFICE', 'EQUIPMENT', 'SOFTWARE', 'TRAVEL', 'MARKETING', 'UTILITIES', 'OTHER']),
  amount: z.number().positive('Amount must be positive'),
  date: z.string().min(1, 'Date is required'),
  notes: z.string().optional(),
});

export type QuotationFormData = z.infer<typeof quotationSchema>;
export type ExpenseFormData = z.infer<typeof expenseSchema>;
