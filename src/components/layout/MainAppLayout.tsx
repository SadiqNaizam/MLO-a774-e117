import React from 'react';
import Sidebar from './Sidebar';
import TopHeader from './TopHeader';
import { cn } from '@/lib/utils';

interface MainAppLayoutProps {
  children: React.ReactNode;
  pageTitle: string;
}

const MainAppLayout: React.FC<MainAppLayoutProps> = ({ children, pageTitle }) => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Sidebar />
      <div className="ml-72 flex flex-col h-screen">
        <TopHeader pageTitle={pageTitle} />
        <main 
          className={cn(
            'flex-1 overflow-y-auto p-6',
            'bg-background' // Ensures main content area has the correct background
            // mt-[70px] is effectively handled by flex structure and fixed TopHeader taking space
          )}
          // The mt-[70px] should be applied to the scrollable container, not here if TopHeader isn't part of this flex item's flow
          // Let's re-evaluate: TopHeader is fixed. Main content needs margin-top.
        >
          {/* Content from 'Layout Requirements.mainContent.layout: p-6 mt-[70px]' */}
          {/* The above structure is wrong. TopHeader is fixed OUTSIDE this div flow. */}
          {/* Corrected structure based on fixed positioning: */}
          {/* Sidebar is fixed. TopHeader is fixed. Main content area needs margins. */}
        </main>
      </div>
    </div>
  );
};

// Corrected MainAppLayout based on revised thought process:
const CorrectedMainAppLayout: React.FC<MainAppLayoutProps> = ({ children, pageTitle }) => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Sidebar />
      {/* TopHeader is fixed and its position is relative to viewport, offsetting by sidebar width (left-72) */}
      <TopHeader pageTitle={pageTitle} /> 
      <main 
        className={cn(
          'ml-72 mt-[70px] p-6 overflow-y-auto',
          'bg-background'
        )}
        style={{ height: 'calc(100vh - 70px)' }} // Ensures main is scrollable within remaining viewport height
      >
        {children}
      </main>
    </div>
  );
};

export default CorrectedMainAppLayout;
