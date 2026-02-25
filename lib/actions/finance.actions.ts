'use server';

import { revalidatePath } from 'next/cache';

export async function createQuotation(formData: FormData) {
  // TODO: Insert into Supabase
  revalidatePath('/finance/quotations');
  return { success: true };
}

export async function updateQuotationStatus(id: string, status: string) {
  // TODO: Update quotation status
  revalidatePath('/finance/quotations');
  return { success: true };
}

export async function createInvoice(formData: FormData) {
  // TODO: Insert into Supabase
  revalidatePath('/finance/invoices');
  return { success: true };
}

export async function updateInvoiceStatus(id: string, status: string) {
  // TODO: Update invoice status
  revalidatePath('/finance/invoices');
  return { success: true };
}

export async function createReceipt(invoiceId: string, paymentMethod: string) {
  // TODO: Insert receipt into Supabase
  revalidatePath('/finance/receipts');
  revalidatePath('/finance/invoices');
  return { success: true };
}

export async function createExpense(formData: FormData) {
  // TODO: Insert expense into Supabase
  revalidatePath('/finance/expenses');
  return { success: true };
}

export async function approveExpense(id: string) {
  // TODO: Update expense status
  revalidatePath('/finance/expenses');
  return { success: true };
}

export async function rejectExpense(id: string) {
  // TODO: Update expense status
  revalidatePath('/finance/expenses');
  return { success: true };
}
