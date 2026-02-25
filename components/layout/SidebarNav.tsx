'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSidebarStore } from '@/stores/sidebarStore';
import { cn } from '@/lib/utils';
import { ChevronDown, LucideIcon } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface MenuItem {
  label: string;
  href?: string;
  icon: LucideIcon;
  roles: string[];
  children?: { label: string; href: string; icon: LucideIcon }[];
}

interface SidebarNavProps {
  items: MenuItem[];
  isCollapsed: boolean;
}

export function SidebarNav({ items, isCollapsed }: SidebarNavProps) {
  const pathname = usePathname();
  const { expandedItems, toggleExpanded, setMobileOpen } = useSidebarStore();

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  const handleClick = () => {
    setMobileOpen(false);
  };

  return (
    <nav className="space-y-1">
      {items.map((item) => {
        if (item.children) {
          const isExpanded = expandedItems.includes(item.label);
          const hasActiveChild = item.children.some(c => isActive(c.href));

          if (isCollapsed) {
            return (
              <Tooltip key={item.label} delayDuration={0}>
                <TooltipTrigger asChild>
                  <div className={cn(
                    'flex h-10 w-10 items-center justify-center rounded-lg mx-auto cursor-pointer',
                    hasActiveChild ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                  )}>
                    <item.icon className="h-5 w-5" />
                  </div>
                </TooltipTrigger>
                <TooltipContent side="right" className="flex flex-col gap-1 p-2">
                  <p className="font-medium text-sm mb-1">{item.label}</p>
                  {item.children.map(child => (
                    <Link
                      key={child.href}
                      href={child.href}
                      onClick={handleClick}
                      className={cn(
                        'text-sm px-2 py-1 rounded hover:bg-accent',
                        isActive(child.href) && 'font-medium text-primary'
                      )}
                    >
                      {child.label}
                    </Link>
                  ))}
                </TooltipContent>
              </Tooltip>
            );
          }

          return (
            <div key={item.label}>
              <button
                onClick={() => toggleExpanded(item.label)}
                className={cn(
                  'flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
                  hasActiveChild ? 'text-primary' : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                )}
              >
                <item.icon className="h-5 w-5 shrink-0" />
                <span className="flex-1 text-left">{item.label}</span>
                <ChevronDown className={cn('h-4 w-4 transition-transform', isExpanded && 'rotate-180')} />
              </button>
              {isExpanded && (
                <div className="ml-4 mt-1 space-y-1 border-l pl-4">
                  {item.children.map(child => (
                    <Link
                      key={child.href}
                      href={child.href}
                      onClick={handleClick}
                      className={cn(
                        'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
                        isActive(child.href)
                          ? 'bg-primary/10 text-primary font-medium'
                          : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                      )}
                    >
                      <child.icon className="h-4 w-4 shrink-0" />
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        }

        // Simple link item
        if (isCollapsed) {
          return (
            <Tooltip key={item.label} delayDuration={0}>
              <TooltipTrigger asChild>
                <Link
                  href={item.href!}
                  onClick={handleClick}
                  className={cn(
                    'flex h-10 w-10 items-center justify-center rounded-lg mx-auto',
                    isActive(item.href!)
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                  )}
                >
                  <item.icon className="h-5 w-5" />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">{item.label}</TooltipContent>
            </Tooltip>
          );
        }

        return (
          <Link
            key={item.label}
            href={item.href!}
            onClick={handleClick}
            className={cn(
              'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
              isActive(item.href!)
                ? 'bg-primary/10 text-primary font-medium'
                : 'text-muted-foreground hover:bg-accent hover:text-foreground'
            )}
          >
            <item.icon className="h-5 w-5 shrink-0" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
