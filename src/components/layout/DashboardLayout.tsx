
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
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar />
      <main className={cn(
        "flex-1 p-6 transition-all duration-300 ease-in-out",
        isMobile ? "ml-16" : "ml-64"
      )}>
        {children}
      </main>
    </div>
  );
}
