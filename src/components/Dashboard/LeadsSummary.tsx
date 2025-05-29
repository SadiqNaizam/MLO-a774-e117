import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface ReasonLost {
  id: string;
  percentage: number;
  description: string;
}

const reasonsLostData: ReasonLost[] = [
  { id: 'proposalUnclear1', percentage: 40, description: 'The proposal is unclear' },
  { id: 'venturePursuit', percentage: 20, description: 'However venture pursuit' },
  { id: 'other', percentage: 10, description: 'Other' },
  { id: 'proposalUnclear2', percentage: 30, description: 'The proposal is not a fit' }, // Changed description to be unique
];

interface OtherStat {
  id: string;
  value: string;
  description: string;
  hasInfo?: boolean;
  infoText?: string;
}

const otherDataStats: OtherStat[] = [
  { id: 'totalLeads', value: '900', description: 'total leads count' },
  { id: 'avgConversionTime', value: '12', description: 'days in average to convert lead' },
  { id: 'inactiveLeads', value: '30', description: 'inactive leads', hasInfo: true, infoText: 'Leads that have not shown activity in the last 30 days.' },
];

const LeadsSummary: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Reasons of leads lost</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          {reasonsLostData.map((reason) => (
            <div key={reason.id}>
              <p className="text-3xl font-semibold">{reason.percentage}%</p>
              <p className="text-sm text-muted-foreground">{reason.description}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Other data</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8 p-6">
          {otherDataStats.map((stat) => (
            <div key={stat.id}>
              <p className="text-3xl font-semibold">{stat.value}</p>
              <div className="flex items-center text-sm text-muted-foreground">
                <span>{stat.description}</span>
                {stat.hasInfo && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 ml-1.5 text-muted-foreground cursor-pointer" />
                      </TooltipTrigger>
                      <TooltipContent className="bg-slate-800 text-white text-xs p-2 rounded-md max-w-xs">
                        <p>{stat.infoText}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default LeadsSummary;
