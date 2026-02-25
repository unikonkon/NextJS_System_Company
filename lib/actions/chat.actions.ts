'use server';

import { revalidatePath } from 'next/cache';

export async function sendMessage(channelId: string, content: string) {
  // TODO: Insert message into Supabase
  revalidatePath(`/chat/${channelId}`);
  return { success: true };
}

export async function createChannel(formData: FormData) {
  // TODO: Insert channel into Supabase
  revalidatePath('/chat');
  return { success: true };
}

export async function createAnnouncement(formData: FormData) {
  // TODO: Insert announcement into Supabase
  revalidatePath('/announcements');
  return { success: true };
}

export async function createWikiArticle(formData: FormData) {
  // TODO: Insert wiki article into Supabase
  revalidatePath('/wiki');
  return { success: true };
}

export async function updateWikiArticle(slug: string, formData: FormData) {
  // TODO: Update wiki article in Supabase
  revalidatePath(`/wiki/${slug}`);
  return { success: true };
}
