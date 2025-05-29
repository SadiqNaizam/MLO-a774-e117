import React from 'react';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import {
  Shapes,
  Menu,
  LayoutGrid,
  Users,
  UserCircle2,
  FileText,
  Receipt,
  ShoppingBag,
  Mail,
  Archive,
  CalendarDays,
  HelpCircle,
  Settings,
  CircleUserRound
} from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  href: string;
  isActive?: boolean; // For demonstrating active state, in a real app, this would come from router
}

const mainNavItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid, href: '#', isActive: true },
  { id: 'leads', label: 'Leads', icon: Users, href: '#' },
  { id: 'customers', label: 'Customers', icon: UserCircle2, href: '#' },
  { id: 'proposals', label: 'Proposals', icon: FileText, href: '#' },
  { id: 'invoices', label: 'Invoices', icon: Receipt, href: '#' },
  { id: 'items', label: 'Items', icon: ShoppingBag, href: '#' },
  { id: 'mail', label: 'Mail', icon: Mail, href: '#' },
  { id: 'shoebox', label: 'Shoebox', icon: Archive, href: '#' },
  { id: 'calendar', label: 'Calendar', icon: CalendarDays, href: '#' },
];

const footerNavItems: NavItem[] = [
  { id: 'help', label: 'Help', icon: HelpCircle, href: '#' },
  { id: 'settings', label: 'Settings', icon: Settings, href: '#' },
];

const Sidebar: React.FC = () => {
  const [activeItemId, setActiveItemId] = React.useState<string>('dashboard');

  const handleNavItemClick = (id: string) => {
    setActiveItemId(id);
    // In a real app, you'd navigate here, e.g., router.push(href)
  };

  return (
    <aside className={cn(
      'fixed top-0 left-0 z-20 h-screen w-72 flex flex-col',
      'bg-sidebar text-sidebar-foreground border-r border-sidebar-border'
    )}>
      <div className="flex items-center h-[70px] px-4 border-b border-sidebar-border">
        <Button variant="ghost" size="icon" className="mr-2 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
          <Menu className="h-6 w-6" />
        </Button>
        <Shapes className="h-8 w-8 text-primary" />
        <h1 className="ml-2 text-xl font-semibold text-sidebar-foreground">BO</h1>
      </div>

      <ScrollArea className="flex-1 py-4">
        <nav className="px-4 space-y-1">
          {mainNavItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              onClick={() => handleNavItemClick(item.id)}
              className={cn(
                'flex items-center px-3 py-2.5 rounded-md text-sm font-medium',
                'transition-colors duration-150 ease-in-out',
                item.id === activeItemId
                  ? 'bg-primary/10 text-primary' // Using a light primary background and primary text for active state
                  : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
              )}
            >
              <item.icon className={cn('mr-3 h-5 w-5', item.id === activeItemId ? 'text-primary' : 'text-sidebar-foreground/80')} />
              {item.label}
            </a>
          ))}
        </nav>
      </ScrollArea>

      <div className="mt-auto p-4 border-t border-sidebar-border space-y-1">
        {footerNavItems.map((item) => (
          <a
            key={item.id}
            href={item.href}
            onClick={() => handleNavItemClick(item.id)} // Assuming footer items can also be 'active'
            className={cn(
              'flex items-center px-3 py-2.5 rounded-md text-sm font-medium',
              'transition-colors duration-150 ease-in-out',
              item.id === activeItemId
                ? 'bg-primary/10 text-primary'
                : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
            )}
          >
            <item.icon className={cn('mr-3 h-5 w-5', item.id === activeItemId ? 'text-primary' : 'text-sidebar-foreground/80')} />
            {item.label}
          </a>
        ))}
        <div className="flex items-center p-2 mt-2 border-t border-sidebar-border pt-3">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback><CircleUserRound className="h-5 w-5 text-sidebar-foreground/80"/></AvatarFallback>
          </Avatar>
          <div className="ml-3">
            <p className="text-sm font-medium text-sidebar-foreground">User Name</p>
            <p className="text-xs text-sidebar-foreground/70">user@example.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

// Minimal Avatar components if not globally available or to avoid full shadcn/ui dep here
// For production, ensure these are correctly imported from '@/components/ui/avatar'
const Avatar: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className }) => (
  <div className={cn('relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full', className)}>{children}</div>
);
const AvatarImage: React.FC<{src: string, alt: string, className?: string}> = ({src, alt, className}) => (
  <img src={src} alt={alt} className={cn('aspect-square h-full w-full', className)} />
);
const AvatarFallback: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className }) => (
  <div className={cn('flex h-full w-full items-center justify-center rounded-full bg-muted', className)}>{children}</div>
);


export default Sidebar;
