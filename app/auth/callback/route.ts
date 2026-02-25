import { NextResponse } from 'next/server';

// Placeholder for Supabase auth callback
export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  return NextResponse.redirect(requestUrl.origin);
}
