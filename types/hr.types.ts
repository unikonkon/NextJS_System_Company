import { UserRole } from './auth.types';
import { ActiveStatus, ApprovalStatus } from './common.types';

export type EmploymentType = 'FULL_TIME' | 'PART_TIME' | 'CONTRACT' | 'INTERN';
export type LeaveType = 'ANNUAL' | 'SICK' | 'PERSONAL' | 'MATERNITY' | 'UNPAID';
export type AttendanceStatus = 'PRESENT' | 'ABSENT' | 'LATE' | 'LEAVE' | 'HALF_DAY' | 'WORK_FROM_HOME';

export interface Employee {
  id: string;
  userId: string;
  employeeCode: string;
  firstName: string;
  lastName: string;
  firstNameTh: string;
  lastNameTh: string;
  nickname: string;
  email: string;
  phone?: string;
  role: UserRole;
  department: string;
  position: string;
  employmentType: EmploymentType;
  status: ActiveStatus;
  startDate: string;
  salary?: number;
  avatarUrl?: string;
  lineId?: string;
  address?: string;
  emergencyContact?: string;
  emergencyPhone?: string;
  bankAccount?: string;
  bankName?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Attendance {
  id: string;
  employeeId: string;
  employeeName: string;
  date: string;
  checkIn?: string;
  checkOut?: string;
  status: AttendanceStatus;
  note?: string;
  overtime?: number;
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  type: LeaveType;
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  status: ApprovalStatus;
  approvedBy?: string;
  approvedAt?: string;
  createdAt: string;
}

export interface Payroll {
  id: string;
  employeeId: string;
  employeeName: string;
  employeeCode: string;
  department: string;
  position: string;
  month: string;
  year: number;
  baseSalary: number;
  overtime: number;
  bonus: number;
  deductions: number;
  tax: number;
  socialSecurity: number;
  netSalary: number;
  status: 'DRAFT' | 'APPROVED' | 'PAID';
  paidAt?: string;
}

export interface PerformanceReview {
  id: string;
  employeeId: string;
  employeeName: string;
  reviewerId: string;
  reviewerName: string;
  period: string;
  score: number;
  maxScore: number;
  categories: { name: string; score: number; maxScore: number }[];
  strengths: string;
  improvements: string;
  goals: string;
  status: 'DRAFT' | 'SUBMITTED' | 'COMPLETED';
  createdAt: string;
}
