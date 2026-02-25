import { z } from 'zod';

export const employeeSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  firstNameTh: z.string().optional(),
  lastNameTh: z.string().optional(),
  nickname: z.string().optional(),
  email: z.string().email('Invalid email'),
  phone: z.string().optional(),
  department: z.string().min(1, 'Department is required'),
  position: z.string().min(1, 'Position is required'),
  role: z.enum(['SUPER_ADMIN', 'ADMIN', 'HR', 'PM', 'DEVELOPER', 'DESIGNER', 'QA', 'SALES', 'FINANCE']),
  startDate: z.string().min(1, 'Start date is required'),
  salary: z.number().positive().optional(),
});

export const leaveRequestSchema = z.object({
  type: z.enum(['ANNUAL', 'SICK', 'PERSONAL', 'MATERNITY', 'UNPAID']),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  reason: z.string().min(1, 'Reason is required'),
});

export type EmployeeFormData = z.infer<typeof employeeSchema>;
export type LeaveRequestFormData = z.infer<typeof leaveRequestSchema>;
