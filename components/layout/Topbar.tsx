'use client';

import { useAuthStore } from '@/stores/authStore';
import { useSidebarStore } from '@/stores/sidebarStore';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { NotificationBell } from './NotificationBell';
import { UserMenu } from './UserMenu';
import { Breadcrumb } from './Breadcrumb';

export function Topbar() {
  const { toggleMobile } = useSidebarStore();
  const user = useAuthStore((s) => s.user);

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b bg-background px-4 lg:px-6">
      <Button variant="ghost" size="sm" className="lg:hidden h-8 w-8 p-0" onClick={toggleMobile}>
        <Menu className="h-5 w-5" />
      </Button>

      <Breadcrumb />

      <div className="ml-auto flex items-center gap-2">
        <NotificationBell />
        <UserMenu />
      </div>
    </header>
  );
}
