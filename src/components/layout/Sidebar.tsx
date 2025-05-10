
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  Package, 
  PlusCircle, 
  Percent, 
  Handshake, 
  Menu, 
  X, 
  LogOut,
  User,
  Settings
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  href: string;
  active?: boolean;
}

const SidebarItem = ({ icon: Icon, label, href, active }: SidebarItemProps) => {
  return (
    <Link to={href}>
      <Button
        variant="ghost"
        className={cn(
          'w-full justify-start gap-2 mb-1',
          active 
            ? 'bg-kwetche-100 text-kwetche-800 hover:bg-kwetche-200 hover:text-kwetche-800' 
            : 'hover:bg-kwetche-50 hover:text-kwetche-800'
        )}
      >
        <Icon className="h-5 w-5" />
        <span>{label}</span>
      </Button>
    </Link>
  );
};

interface SidebarDividerProps {
  title?: string;
}

const SidebarDivider = ({ title }: SidebarDividerProps) => (
  <div className="my-4">
    {title && <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">{title}</h3>}
    <hr className="border-t border-gray-200" />
  </div>
);

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();

  const toggleSidebar = () => setCollapsed(!collapsed);

  // If we're on mobile and the sidebar is not explicitly collapsed, we'll show it collapsed by default
  const effectiveCollapsed = isMobile ? true : collapsed;

  return (
    <>
      {/* Mobile overlay */}
      {!effectiveCollapsed && isMobile && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleSidebar}
        />
      )}

      <aside 
        className={cn(
          "h-screen bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ease-in-out z-50",
          effectiveCollapsed 
            ? "w-16 fixed" 
            : isMobile 
              ? "w-64 fixed" 
              : "w-64"
        )}
      >
        <div className="flex items-center justify-between p-4">
          {!effectiveCollapsed && (
            <div className="flex items-center">
              <span className="text-xl font-bold text-kwetche-800">Kwetché</span>
            </div>
          )}
          <Button size="icon" variant="ghost" onClick={toggleSidebar} className="ml-auto">
            {effectiveCollapsed ? <Menu className="h-5 w-5" /> : <X className="h-5 w-5" />}
          </Button>
        </div>

        <div className={cn("flex-1 overflow-auto px-3 py-2", effectiveCollapsed && "px-1")}>
          {effectiveCollapsed ? (
            <div className="flex flex-col items-center gap-4">
              <Link to="/dashboard">
                <Button size="icon" variant={location.pathname === '/dashboard' ? 'secondary' : 'ghost'}>
                  <LayoutDashboard className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/dashboard/offres">
                <Button 
                  size="icon" 
                  variant={location.pathname.includes('/dashboard/offres') && !location.pathname.includes('/ajouter') ? 'secondary' : 'ghost'}
                >
                  <Package className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/dashboard/offre/ajouter">
                <Button size="icon" variant={location.pathname === '/dashboard/offre/ajouter' ? 'secondary' : 'ghost'}>
                  <PlusCircle className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/dashboard/reductions">
                <Button size="icon" variant={location.pathname === '/dashboard/reductions' ? 'secondary' : 'ghost'}>
                  <Percent className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/dashboard/partenariats">
                <Button size="icon" variant={location.pathname === '/dashboard/partenariats' ? 'secondary' : 'ghost'}>
                  <Handshake className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          ) : (
            <>
              <SidebarItem 
                icon={LayoutDashboard} 
                label="Accueil" 
                href="/dashboard" 
                active={location.pathname === '/dashboard'} 
              />
              <SidebarItem 
                icon={Package} 
                label="Gérer les offres" 
                href="/dashboard/offres" 
                active={location.pathname.includes('/dashboard/offres') || (location.pathname.includes('/dashboard/offre/') && !location.pathname.includes('/ajouter'))} 
              />
              <SidebarItem 
                icon={PlusCircle} 
                label="Ajouter une offre" 
                href="/dashboard/offre/ajouter" 
                active={location.pathname === '/dashboard/offre/ajouter'} 
              />
              <SidebarItem 
                icon={Percent} 
                label="Réductions" 
                href="/dashboard/reductions" 
                active={location.pathname === '/dashboard/reductions'} 
              />
              <SidebarItem 
                icon={Handshake} 
                label="Partenariats" 
                href="/dashboard/partenariats" 
                active={location.pathname === '/dashboard/partenariats'} 
              />
            </>
          )}
        </div>

        <div className={cn("border-t border-gray-200 p-3", effectiveCollapsed && "p-1")}>
          {effectiveCollapsed ? (
            <div className="flex flex-col items-center gap-4">
              <Button size="icon" variant="ghost">
                <User className="h-5 w-5" />
              </Button>
              <Button size="icon" variant="ghost">
                <Settings className="h-5 w-5" />
              </Button>
              <Button size="icon" variant="ghost" className="text-red-500 hover:text-red-700">
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2 mb-3 p-2">
                <div className="h-8 w-8 rounded-full bg-kwetche-200 flex items-center justify-center text-kwetche-700 font-medium">
                  AD
                </div>
                <div>
                  <p className="text-sm font-medium">Admin User</p>
                  <p className="text-xs text-gray-500">admin@kwetche.com</p>
                </div>
              </div>
              <div className="flex justify-between">
                <Button size="sm" variant="ghost" className="w-full justify-start gap-2">
                  <Settings className="h-4 w-4" />
                  <span>Paramètres</span>
                </Button>
                <Button size="sm" variant="ghost" className="text-red-500 hover:text-red-700">
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            </>
          )}
        </div>
      </aside>

      {/* Spacer for collapsed sidebar on mobile */}
      {isMobile && effectiveCollapsed && (
        <div className="w-16" />
      )}
    </>
  );
}
