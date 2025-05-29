import React from 'react';
import { cn } from '@/lib/utils';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface TabSwitcherProps {
  className?: string;
  activeTab?: 'sales' | 'leads';
  onTabChange?: (tab: 'sales' | 'leads') => void;
}

const TabSwitcher: React.FC<TabSwitcherProps> = ({
  className,
  activeTab = 'leads',
  onTabChange,
}) => {
  const [currentTab, setCurrentTab] = React.useState<'sales' | 'leads'>(activeTab);

  React.useEffect(() => {
    setCurrentTab(activeTab);
  }, [activeTab]);

  const handleValueChange = (value: string) => {
    const newTab = value as 'sales' | 'leads';
    setCurrentTab(newTab);
    if (onTabChange) {
      onTabChange(newTab);
    }
  };

  return (
    <div className={cn(className)}>
      <Tabs value={currentTab} onValueChange={handleValueChange} className="w-auto">
        <TabsList className="grid w-full grid-cols-2 sm:w-[200px] bg-transparent p-0">
          <TabsTrigger 
            value="sales"
            className={cn(
              "pb-2.5 rounded-none border-b-2 border-transparent text-muted-foreground data-[state=active]:text-primary data-[state=active]:border-primary data-[state=active]:shadow-none",
              "focus-visible:ring-0 focus-visible:ring-offset-0"
            )}
          >
            Sales
          </TabsTrigger>
          <TabsTrigger 
            value="leads"
            className={cn(
              "pb-2.5 rounded-none border-b-2 border-transparent text-muted-foreground data-[state=active]:text-primary data-[state=active]:border-primary data-[state=active]:shadow-none",
              "focus-visible:ring-0 focus-visible:ring-offset-0"
            )}
          >
            Leads
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default TabSwitcher;
