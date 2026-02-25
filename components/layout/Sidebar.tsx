'use client';

import { useSidebarStore } from '@/stores/sidebarStore';
import { useAuthStore } from '@/stores/authStore';
import { SidebarNav } from './SidebarNav';
import { SIDEBAR_MENU } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent } from '@/components/ui/sheet';

export function Sidebar() {
  const { isCollapsed, isMobileOpen, toggle, setMobileOpen } = useSidebarStore();
  const user = useAuthStore((s) => s.user);
  const userRole = user?.role ?? 'DEVELOPER';

  const filteredMenu = SIDEBAR_MENU.filter(item =>
    item.roles.includes('ALL') || item.roles.includes(userRole)
  );

  const sidebarContent = (
    <div className="flex h-full flex-col">
      <div className={cn(
        'flex h-16 items-center border-b px-4',
        isCollapsed ? 'justify-center' : 'justify-between'
      )}>
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm">
              W
            </div>
            <span className="font-bold text-lg">WAMS</span>
          </div>
        )}
        <Button variant="ghost" size="sm" onClick={toggle} className="h-8 w-8 p-0 hidden lg:flex">
          <ChevronLeft className={cn('h-4 w-4 transition-transform', isCollapsed && 'rotate-180')} />
        </Button>
      </div>
      <ScrollArea className="flex-1 px-3 py-4">
        <SidebarNav items={filteredMenu} isCollapsed={isCollapsed} />
      </ScrollArea>
      {!isCollapsed && (
        <div className="border-t p-4">
          <p className="text-xs text-muted-foreground text-center">WAMS v3.0</p>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className={cn(
        'hidden lg:flex h-screen flex-col border-r bg-card transition-all duration-300 fixed left-0 top-0 z-30',
        isCollapsed ? 'w-16' : 'w-64'
      )}>
        {sidebarContent}
      </aside>

      {/* Mobile sidebar */}
      <Sheet open={isMobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="w-64 p-0">
          {sidebarContent}
        </SheetContent>
      </Sheet>
    </>
  );
}
