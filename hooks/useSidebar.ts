'use client';

import { useSidebarStore } from '@/stores/sidebarStore';

export function useSidebar() {
  return useSidebarStore();
}
