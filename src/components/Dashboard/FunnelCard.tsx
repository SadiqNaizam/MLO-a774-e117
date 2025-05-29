import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface FunnelStage {
  id: string;
  name: string;
  count: number;
  value: number;
  timeAtStage: string;
  color: string; // Tailwind color class e.g., 'bg-red-500'
  percentage: number; // Percentage of total for progress bar width
}

const funnelData: FunnelStage[] = [
  { id: 'discovery', name: 'Discovery', count: 200, value: 200, timeAtStage: '2 days', color: 'bg-red-500', percentage: 33.33 },
  { id: 'qualified', name: 'Qualified', count: 100, value: 100, timeAtStage: '2 days', color: 'bg-yellow-400', percentage: 16.67 },
  { id: 'inConversation', name: 'In conversation', count: 50, value: 100, timeAtStage: '5 days', color: 'bg-indigo-600', percentage: 8.33 },
  { id: 'negotiations', name: 'Negotiations', count: 20, value: 50, timeAtStage: '8 days', color: 'bg-green-500', percentage: 3.33 },
  { id: 'closedWon', name: 'Closed won', count: 20, value: 50, timeAtStage: '10 days', color: 'bg-purple-600', percentage: 3.33 },
];

// Calculate remaining percentage for 'active leads' part of the bar, sum of percentages from data is ~65%
const totalFunnelPercentage = funnelData.reduce((sum, stage) => sum + stage.percentage, 0);
// The bar represents active leads, so other stages are part of this. We'll use the percentages to segment the bar.
// Let's assume the percentages define segments within the bar, not the total filled portion.

const FunnelCard: React.FC = () => {
  const totalActiveLeads = 600;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Funnel count</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 p-6">
        <div>
          <span className="text-4xl font-bold">{totalActiveLeads}</span>
          <span className="ml-2 text-muted-foreground">active leads</span>
        </div>

        <div className="w-full h-3 flex rounded-full overflow-hidden">
          {funnelData.map((stage) => (
            <div
              key={stage.id}
              className={cn('h-full', stage.color)}
              style={{ width: `${stage.percentage}%` }}
            />
          ))}
          {/* Remaining part of the bar if percentages don't sum to 100, representing other active leads not in these specific stages */} 
          {totalFunnelPercentage < 100 && (
             <div className="h-full bg-gray-200" style={{ width: `${100 - totalFunnelPercentage}%` }} />
          )}
        </div>

        <ul className="space-y-3">
          {funnelData.map((stage, index) => (
            <li key={stage.id} className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                <span className={cn('w-3 h-3 rounded-sm mr-3', stage.color)} />
                <span>{stage.name}</span>
              </div>
              <div className="flex items-center space-x-6 text-right">
                <span className="w-12 text-muted-foreground">{stage.count}</span>
                <span className="w-16 text-muted-foreground">$ {stage.value.toLocaleString()}</span>
                {stage.name === 'Qualified' ? (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="w-20 text-muted-foreground cursor-default">{stage.timeAtStage}</span>
                      </TooltipTrigger>
                      <TooltipContent className="bg-slate-800 text-white text-xs p-2 rounded-md">
                        <p>average time on this stage</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ) : (
                  <span className="w-20 text-muted-foreground">{stage.timeAtStage}</span>
                )}
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default FunnelCard;
