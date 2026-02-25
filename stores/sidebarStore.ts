import { create } from 'zustand';

interface SidebarState {
  isCollapsed: boolean;
  isMobileOpen: boolean;
  expandedItems: string[];
  toggle: () => void;
  setCollapsed: (collapsed: boolean) => void;
  toggleMobile: () => void;
  setMobileOpen: (open: boolean) => void;
  toggleExpanded: (item: string) => void;
}

export const useSidebarStore = create<SidebarState>((set) => ({
  isCollapsed: false,
  isMobileOpen: false,
  expandedItems: [],
  toggle: () => set((s) => ({ isCollapsed: !s.isCollapsed })),
  setCollapsed: (isCollapsed) => set({ isCollapsed }),
  toggleMobile: () => set((s) => ({ isMobileOpen: !s.isMobileOpen })),
  setMobileOpen: (isMobileOpen) => set({ isMobileOpen }),
  toggleExpanded: (item) => set((s) => ({
    expandedItems: s.expandedItems.includes(item)
      ? s.expandedItems.filter(i => i !== item)
      : [...s.expandedItems, item],
  })),
}));
