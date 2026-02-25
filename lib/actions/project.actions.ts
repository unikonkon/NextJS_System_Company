'use server';

import { revalidatePath } from 'next/cache';

export async function createProject(formData: FormData) {
  // TODO: Insert into Supabase
  revalidatePath('/projects');
  return { success: true };
}

export async function updateProject(id: string, formData: FormData) {
  // TODO: Update in Supabase
  revalidatePath(`/projects/${id}`);
  return { success: true };
}

export async function deleteProject(id: string) {
  // TODO: Delete from Supabase
  revalidatePath('/projects');
  return { success: true };
}

export async function createTask(formData: FormData) {
  // TODO: Insert task into Supabase
  const projectId = formData.get('projectId') as string;
  revalidatePath(`/projects/${projectId}/tasks`);
  revalidatePath(`/projects/${projectId}/board`);
  return { success: true };
}

export async function updateTask(id: string, data: Record<string, unknown>) {
  // TODO: Update task in Supabase
  return { success: true };
}

export async function updateTaskStatus(id: string, status: string) {
  // TODO: Update task status in Supabase
  return { success: true };
}

export async function deleteTask(id: string) {
  // TODO: Delete task from Supabase
  return { success: true };
}

export async function addProjectMember(projectId: string, employeeId: string, role: string) {
  // TODO: Insert project member
  revalidatePath(`/projects/${projectId}`);
  return { success: true };
}

export async function removeProjectMember(projectId: string, memberId: string) {
  // TODO: Remove project member
  revalidatePath(`/projects/${projectId}`);
  return { success: true };
}
