import { z } from 'zod';

export const clientSchema = z.object({
  name: z.string().min(1, 'Company name is required'),
  contactPerson: z.string().min(1, 'Contact person is required'),
  email: z.string().email('Invalid email'),
  phone: z.string().min(1, 'Phone is required'),
  address: z.string().optional(),
  website: z.string().url().optional().or(z.literal('')),
  industry: z.string().optional(),
});

export const leadSchema = z.object({
  companyName: z.string().min(1, 'Company name is required'),
  contactName: z.string().min(1, 'Contact name is required'),
  email: z.string().email('Invalid email'),
  phone: z.string().optional(),
  source: z.string().min(1, 'Source is required'),
  estimatedValue: z.number().positive(),
  assignedTo: z.string().min(1, 'Assign to someone'),
});

export const supportTicketSchema = z.object({
  clientId: z.string().min(1, 'Client is required'),
  subject: z.string().min(1, 'Subject is required'),
  description: z.string().min(1, 'Description is required'),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']),
  category: z.string().min(1, 'Category is required'),
});

export type ClientFormData = z.infer<typeof clientSchema>;
export type LeadFormData = z.infer<typeof leadSchema>;
export type SupportTicketFormData = z.infer<typeof supportTicketSchema>;
