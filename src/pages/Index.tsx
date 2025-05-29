import React from 'react';
import CorrectedMainAppLayout from '@/components/layout/MainAppLayout';
import TabSwitcher from '@/components/Dashboard/TabSwitcher';
import FunnelCard from '@/components/Dashboard/FunnelCard';
import PieChartCard from '@/components/Dashboard/PieChartCard';
import LeadsTrackingChart from '@/components/Dashboard/LeadsTrackingChart';
import LeadsSummary from '@/components/Dashboard/LeadsSummary';

const DashboardPage: React.FC = () => {
  const [activeMainTab, setActiveMainTab] = React.useState<'sales' | 'leads'>('leads' as const);

  const handleMainTabChange = (tab: 'sales' | 'leads') => {
    setActiveMainTab(tab);
    // In a real application, you might fetch different data 
    // or update other components based on this tab selection.
  };

  return (
    <CorrectedMainAppLayout pageTitle="Dashboard">
      {/* 
        The main content area within CorrectedMainAppLayout already has p-6. 
        This flex container organizes the TabSwitcher and the main content grid vertically.
      */}
      <div className="flex flex-col space-y-6">
        <TabSwitcher 
          activeTab={activeMainTab}
          onTabChange={handleMainTabChange}
        />
        
        {/* 
          This grid implements the 'Layout Requirements.mainContent.container: grid grid-cols-2 gap-6'.
          It's responsive: 1 column on small screens, 2 columns on large screens (lg breakpoint).
        */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Row 1: FunnelCard and PieChartCard */}
          <FunnelCard /> 
          <PieChartCard />
          
          {/* 
            Row 2: LeadsTrackingChart.
            The LeadsTrackingChart component is designed to span 2 columns on md screens and up.
            It will naturally flow into the next available space in the grid.
          */}
          <LeadsTrackingChart />
          
          {/* 
            Row 3: LeadsSummary.
            The LeadsSummary component itself contains a 2-column layout for its internal cards.
            This wrapper div ensures that the LeadsSummary component as a whole spans 
            both columns of this parent grid on large screens.
          */}
          <div className="lg:col-span-2">
             <LeadsSummary />
          </div>
        </div>
      </div>
    </CorrectedMainAppLayout>
  );
};

export default DashboardPage;
