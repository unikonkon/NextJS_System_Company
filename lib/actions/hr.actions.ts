'use server';

import { revalidatePath } from 'next/cache';

export async function createEmployee(formData: FormData) {
  // TODO: Insert into Supabase
  revalidatePath('/hr/employees');
  return { success: true };
}

export async function updateEmployee(id: string, formData: FormData) {
  // TODO: Update in Supabase
  revalidatePath(`/hr/employees/${id}`);
  return { success: true };
}

export async function deleteEmployee(id: string) {
  // TODO: Delete from Supabase
  revalidatePath('/hr/employees');
  return { success: true };
}

export async function checkIn(employeeId: string) {
  // TODO: Insert attendance record
  revalidatePath('/hr/attendance');
  return { success: true, time: new Date().toISOString() };
}

export async function checkOut(employeeId: string) {
  // TODO: Update attendance record
  revalidatePath('/hr/attendance');
  return { success: true, time: new Date().toISOString() };
}

export async function submitLeaveRequest(formData: FormData) {
  // TODO: Insert leave request
  revalidatePath('/hr/leave');
  return { success: true };
}

export async function approveLeaveRequest(id: string) {
  // TODO: Update leave request status
  revalidatePath('/hr/leave');
  return { success: true };
}

export async function rejectLeaveRequest(id: string) {
  // TODO: Update leave request status
  revalidatePath('/hr/leave');
  return { success: true };
}

export async function approvePayroll(id: string) {
  // TODO: Update payroll status
  revalidatePath('/hr/payroll');
  return { success: true };
}
