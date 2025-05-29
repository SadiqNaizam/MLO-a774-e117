import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { CalendarDays, ChevronDown } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, AreaChart, Area } from 'recharts';

interface LeadsTrackingDataPoint {
  month: string;
  closedWon: number;
  closedLost: number;
}

const leadsTrackingData: LeadsTrackingDataPoint[] = [
  { month: 'Jan', closedWon: 65, closedLost: 45 },
  { month: 'Feb', closedWon: 59, closedLost: 42 },
  { month: 'March', closedWon: 80, closedLost: 68 },
  { month: 'April', closedWon: 31, closedLost: 38 },
  { month: 'May', closedWon: 92, closedLost: 40 },
  { month: 'June', closedWon: 75, closedLost: 5 },
  { month: 'July', closedWon: 60, closedLost: 45 },
  { month: 'August', closedWon: 95, closedLost: 32 },
];

const LeadsTrackingChart: React.FC = () => {
  const totalClosed = 680;
  const totalLost = 70;

  return (
    <Card className="col-span-1 md:col-span-2">
      <CardHeader className="flex flex-row items-start justify-between">
        <div>
          <CardTitle>Leads tracking</CardTitle>
          <div className="mt-2 text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">{totalClosed}</span> total closed
            <span className="mx-2">·</span>
            <span className="font-semibold text-foreground">{totalLost}</span> total lost
          </div>
        </div>
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
      <CardContent className="p-6 h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={leadsTrackingData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
            <defs>
              <linearGradient id="colorClosedWon" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#14B8A6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#14B8A6" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorClosedLost" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
            <XAxis 
              dataKey="month" 
              tickLine={false} 
              axisLine={false} 
              tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
              dy={10}
            />
            <YAxis 
              tickLine={false} 
              axisLine={false} 
              tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} 
              tickFormatter={(value) => `${value}`}
              dx={-10}
            />
            <Tooltip 
              contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)'}}
              labelStyle={{ color: 'hsl(var(--foreground))' }}
            />
            <Legend 
              verticalAlign="bottom" 
              height={40}
              iconType="circle"
              iconSize={8}
              formatter={(value, entry) => <span className="text-xs text-muted-foreground ml-1">{value}</span>}
            />
            <Area type="monotone" dataKey="closedWon" name="Closed won" stroke="#14B8A6" fillOpacity={1} fill="url(#colorClosedWon)" strokeWidth={2} dot={{ r: 4, fill: '#14B8A6', strokeWidth: 0 }} activeDot={{ r: 6, strokeWidth: 0 }} />
            <Area type="monotone" dataKey="closedLost" name="Closed lost" stroke="#EF4444" fillOpacity={1} fill="url(#colorClosedLost)" strokeWidth={2} dot={{ r: 4, fill: '#EF4444', strokeWidth: 0 }} activeDot={{ r: 6, strokeWidth: 0 }} />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default LeadsTrackingChart;
