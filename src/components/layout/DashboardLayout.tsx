
import React, { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <main className={cn(
        "flex-1 p-6 transition-all duration-300 ease-in-out",
        isMobile ? "ml-16" : "ml-0"
      )}>
        {children}
      </main>
    </div>
  );
}
