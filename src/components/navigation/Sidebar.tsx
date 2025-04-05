
import React from 'react';
import { cn } from '@/lib/utils';
import { useNavigation } from './NavigationContext';
import { useIsMobile } from '@/hooks/use-mobile';
import SidebarHeader from './SidebarHeader';
import NavigationItems from './NavigationItems';
import { useAuth } from '@/context';

const Sidebar: React.FC = () => {
  const { expanded } = useNavigation();
  const isMobile = useIsMobile();
  const { user } = useAuth();

  return (
    <aside
      className={cn(
        "fixed lg:relative z-40 h-screen transition-all duration-300 ease-in-out glass-morphism flex flex-col",
        expanded 
          ? "w-64 shadow-elevated" 
          : "w-0 lg:w-20 overflow-hidden",
        isMobile && !expanded && "translate-x-[-100%] lg:translate-x-0"
      )}
    >
      <div className="flex flex-col h-full py-8">
        <SidebarHeader />
        
        <nav className="flex-1 px-4 overflow-y-auto">
          <NavigationItems expanded={expanded} />
          
          {/* Login/Signup link for unauthenticated users */}
          {!user && <NavigationItems.AuthItem expanded={expanded} />}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
