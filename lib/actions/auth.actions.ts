'use server';

import { redirect } from 'next/navigation';

export async function loginAction(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  // TODO: Replace with Supabase auth
  if (!email || !password) {
    return { error: 'Email and password are required' };
  }

  // Mock: redirect to dashboard
  redirect('/');
}

export async function logoutAction() {
  // TODO: Replace with Supabase signOut
  redirect('/login');
}

export async function getCurrentEmployee() {
  // TODO: Replace with Supabase query
  return null;
}
