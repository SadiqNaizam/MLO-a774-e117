import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown, PlusCircle, FileText, CalendarPlus } from 'lucide-react';

interface TopHeaderProps {
  pageTitle: string;
}

const TopHeader: React.FC<TopHeaderProps> = ({ pageTitle }) => {
  return (
    <header className={cn(
      'fixed top-0 left-72 right-0 z-10 h-[70px]',
      'flex items-center justify-between px-6',
      'bg-card border-b border-border'
    )}>
      <h1 className="text-2xl font-semibold text-foreground">{pageTitle}</h1>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="default">
            Create
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuItem>
            <PlusCircle className="mr-2 h-4 w-4" />
            <span>New Lead</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <FileText className="mr-2 h-4 w-4" />
            <span>New Proposal</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CalendarPlus className="mr-2 h-4 w-4" />
            <span>New Event</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem disabled>
            <span>More options...</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};

export default TopHeader;
