
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
          'w-full justify-start gap-2 mb-1 text-white',
          active 
            ? 'bg-bemi-transition text-white hover:bg-bemi-transition hover:text-white' 
            : 'hover:bg-bemi-700 hover:text-white'
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
    {title && <h3 className="px-3 text-xs font-semibold text-white uppercase tracking-wider mb-1">{title}</h3>}
    <hr className="border-t border-sidebar-border" />
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
          "h-screen bg-sidebar border-r border-sidebar-border flex flex-col transition-all duration-300 ease-in-out z-50",
          effectiveCollapsed 
            ? "w-16 fixed" 
            : isMobile 
              ? "w-64 fixed" 
              : "w-64"
        )}
      >
        <div className="flex items-center justify-between p-4">
          {!effectiveCollapsed ? (
            <div className="flex items-center">
              <img 
                src="/lovable-uploads/logo_bemi.png" 
                alt="bè mi Logo" 
                className="h-10 w-10 mr-2" 
              />
              <span className="text-xl font-bold text-white">bè mi</span>
            </div>
          ) : (
            <div className="flex items-center justify-center w-full">
              <img 
                src="/lovable-uploads/logo_bemi.png" 
                alt="bè mi Logo" 
                className="h-8 w-8" 
              />
            </div>
          )}
          <Button size="icon" variant="ghost" onClick={toggleSidebar} className={cn("text-white", !effectiveCollapsed && "ml-auto")}>
            {effectiveCollapsed ? <Menu className="h-5 w-5" /> : <X className="h-5 w-5" />}
          </Button>
        </div>

        <div className={cn("flex-1 overflow-auto px-3 py-2", effectiveCollapsed && "px-1")}>
          {effectiveCollapsed ? (
            <div className="flex flex-col items-center gap-4">
              <Link to="/dashboard">
                <Button size="icon" variant={location.pathname === '/dashboard' ? 'secondary' : 'ghost'} className="text-white hover:text-white hover:bg-bemi-700">
                  <LayoutDashboard className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/dashboard/offres">
                <Button 
                  size="icon" 
                  variant={location.pathname.includes('/dashboard/offres') && !location.pathname.includes('/ajouter') ? 'secondary' : 'ghost'}
                  className="text-white hover:text-white hover:bg-bemi-700"
                >
                  <Package className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/dashboard/offre/ajouter">
                <Button 
                  size="icon" 
                  variant={location.pathname === '/dashboard/offre/ajouter' ? 'secondary' : 'ghost'} 
                  className="text-white hover:text-white hover:bg-bemi-700"
                >
                  <PlusCircle className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/dashboard/reductions">
                <Button 
                  size="icon" 
                  variant={location.pathname === '/dashboard/reductions' ? 'secondary' : 'ghost'} 
                  className="text-white hover:text-white hover:bg-bemi-700"
                >
                  <Percent className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/dashboard/partenariats">
                <Button 
                  size="icon" 
                  variant={location.pathname === '/dashboard/partenariats' ? 'secondary' : 'ghost'} 
                  className="text-white hover:text-white hover:bg-bemi-700"
                >
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

        <div className={cn("border-t border-sidebar-border p-3", effectiveCollapsed && "p-1")}>
          {effectiveCollapsed ? (
            <div className="flex flex-col items-center gap-4">
              <Button size="icon" variant="ghost" className="text-white hover:text-white hover:bg-bemi-700">
                <User className="h-5 w-5" />
              </Button>
              <Button size="icon" variant="ghost" className="text-white hover:text-white hover:bg-bemi-700">
                <Settings className="h-5 w-5" />
              </Button>
              <Button size="icon" variant="ghost" className="text-red-300 hover:text-red-100 hover:bg-red-900/20">
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2 mb-3 p-2">
                <div className="h-8 w-8 rounded-full bg-bemi-secondary flex items-center justify-center text-white font-medium">
                  AD
                </div>
                <div className="text-white">
                  <p className="text-sm font-medium">Promoteur - 012</p>
                  <p className="text-xs text-white/80">promoteur.012@bemi.com</p>
                </div>
              </div>
              <div className="flex justify-between">
                <Button size="sm" variant="ghost" className="w-full justify-start gap-2 text-white hover:text-white hover:bg-bemi-700">
                  <Settings className="h-4 w-4" />
                  <span>Paramètres</span>
                </Button>
                <Button size="sm" variant="ghost" className="text-red-300 hover:text-red-100 hover:bg-red-900/20">
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
