import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { CalendarDays, ChevronDown, Info } from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip as RechartsTooltip } from 'recharts';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface SourceDataPoint {
  name: string;
  value: number;
  percentage: number;
  color: string;
}

const leadsCameData: SourceDataPoint[] = [
  { name: 'Clutch', value: 3000, percentage: 50, color: '#EF4444' }, // red-500
  { name: 'Behance', value: 1000, percentage: 20, color: '#F59E0B' }, // amber-500 (yellow in image)
  { name: 'Instagram', value: 1500, percentage: 25, color: '#14B8A6' }, // teal-500
  { name: 'Dribbble', value: 500, percentage: 5, color: '#84CC16' }, // lime-500 (light green in image)
];

const leadsConvertedData: SourceDataPoint[] = [
  { name: 'Clutch', value: 2500, percentage: 45, color: '#EF4444' },
  { name: 'Behance', value: 1200, percentage: 25, color: '#F59E0B' },
  { name: 'Instagram', value: 800, percentage: 20, color: '#14B8A6' },
  { name: 'Dribbble', value: 500, percentage: 10, color: '#84CC16' },
];

const totalDealsSizeData: SourceDataPoint[] = [
  { name: 'Clutch', value: 150000, percentage: 60, color: '#EF4444' },
  { name: 'Behance', value: 50000, percentage: 20, color: '#F59E0B' },
  { name: 'Instagram', value: 37500, percentage: 15, color: '#14B8A6' },
  { name: 'Dribbble', value: 12500, percentage: 5, color: '#84CC16' },
];

type TabValue = 'leadsCame' | 'leadsConverted' | 'totalDealsSize';

const dataMap: Record<TabValue, SourceDataPoint[]> = {
  leadsCame: leadsCameData,
  leadsConverted: leadsConvertedData,
  totalDealsSize: totalDealsSizeData,
};

const PieChartCard: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState<TabValue>('leadsConverted');
  const currentData = dataMap[activeTab];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Sources</CardTitle>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="text-xs h-8">
              <CalendarDays className="mr-2 h-3 w-3" />
              Last 6 months
              <ChevronDown className="ml-2 h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Last 30 days</DropdownMenuItem>
            <DropdownMenuItem>Last 6 months</DropdownMenuItem>
            <DropdownMenuItem>Last 12 months</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <RechartsTooltip 
                  formatter={(value: number, name: string, props: { payload: SourceDataPoint }) => [
                    `$${value.toLocaleString()} (${props.payload.percentage}%)`, 
                    name
                  ]}
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)'}}
                />
                <Pie data={currentData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} innerRadius={50} paddingAngle={2}>
                  {currentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <ul className="space-y-2 text-sm">
            {currentData.map((source) => (
              <li key={source.name} className="flex items-center justify-between">
                <div className="flex items-center">
                  <span style={{ backgroundColor: source.color }} className="w-2.5 h-2.5 rounded-full mr-2" />
                  {source.name}
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-muted-foreground w-16 text-right">{activeTab === 'totalDealsSize' ? '$' : ''}{source.value.toLocaleString()}</span>
                  {source.name === 'Dribbble' ? (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                            <span className="text-muted-foreground w-10 text-right cursor-default">{source.percentage}%</span>
                        </TooltipTrigger>
                        <TooltipContent className="bg-slate-800 text-white text-xs p-2 rounded-md">
                            <p>from {activeTab === 'leadsCame' ? 'leads came' : activeTab === 'leadsConverted' ? 'leads total' : 'total deals size'}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    ) : (
                        <span className="text-muted-foreground w-10 text-right">{source.percentage}%</span>
                    )
                  }
                </div>
              </li>
            ))}
          </ul>
        </div>
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as TabValue)} className="mt-6">
          <TabsList className="grid w-full grid-cols-3 h-12 bg-secondary">
            <TabsTrigger value="leadsCame" className="text-xs px-1 data-[state=active]:bg-card data-[state=active]:text-primary data-[state=active]:shadow-sm">Leads came</TabsTrigger>
            <TabsTrigger value="leadsConverted" className="text-xs px-1 data-[state=active]:bg-card data-[state=active]:text-primary data-[state=active]:shadow-sm">Leads Converted</TabsTrigger>
            <TabsTrigger value="totalDealsSize" className="text-xs px-1 data-[state=active]:bg-card data-[state=active]:text-primary data-[state=active]:shadow-sm">Total deals size</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default PieChartCard;
