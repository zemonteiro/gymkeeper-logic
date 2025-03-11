
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Activity, Users, Calendar, BarChart3, Menu, ChevronLeft, ChevronRight, Dumbbell, Spray, LayoutDashboard, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

const Navigation = () => {
  const [expanded, setExpanded] = useState(true);
  const location = useLocation();
  const isMobile = useIsMobile();
  
  // Auto-collapse on mobile devices
  useEffect(() => {
    if (isMobile) {
      setExpanded(false);
    } else {
      setExpanded(true);
    }
  }, [isMobile]);
  
  const toggleSidebar = () => {
    setExpanded(!expanded);
  };
  
  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Members', path: '/members', icon: Users },
    { name: 'Classes', path: '/classes', icon: Calendar },
    { name: 'Statistics', path: '/stats', icon: BarChart3 },
    { name: 'Equipment', path: '/equipment', icon: Dumbbell },
    { name: 'Cleaning', path: '/cleaning', icon: Spray },
    { name: 'Client View', path: '/client-view', icon: Eye },
  ];
  
  // Close the sidebar when clicking a link on mobile
  const handleNavClick = () => {
    if (isMobile) {
      setExpanded(false);
    }
  };
  
  return (
    <>
      {/* Mobile menu button */}
      <button 
        onClick={toggleSidebar} 
        className="lg:hidden fixed top-4 left-4 z-50 rounded-full p-2 bg-white shadow-subtle"
        aria-label={expanded ? "Close menu" : "Open menu"}
      >
        {expanded ? <ChevronLeft size={20} /> : <Menu size={20} />}
      </button>
    
      {/* Navigation sidebar */}
      <aside
        className={cn(
          "fixed lg:relative z-40 h-screen transition-all duration-300 ease-in-out glass-morphism",
          expanded 
            ? "w-64 shadow-elevated" 
            : "w-0 lg:w-20 overflow-hidden",
          isMobile && !expanded && "translate-x-[-100%] lg:translate-x-0"
        )}
      >
        <div className="flex flex-col h-full py-8">
          <div className={cn(
            "px-6 mb-8 flex items-center justify-between",
            !expanded && "lg:justify-center"
          )}>
            <h1 className={cn(
              "font-bold text-gym-primary transition-all duration-300",
              expanded ? "text-2xl" : "text-center text-xl"
            )}>
              {expanded ? "GymKeeper" : "GK"}
            </h1>
            <button
              onClick={toggleSidebar}
              className="hidden lg:flex items-center justify-center rounded-lg text-gym-muted hover:text-gym-primary hover:bg-gym-secondary transition-colors"
              aria-label={expanded ? "Collapse sidebar" : "Expand sidebar"}
            >
              {expanded ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
            </button>
          </div>
          
          <nav className="flex-1 px-4">
            <ul className="space-y-2">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                const ItemIcon = item.icon;
                
                return (
                  <li key={item.name}>
                    <Link
                      to={item.path}
                      onClick={handleNavClick}
                      className={cn(
                        "flex items-center py-3 px-4 rounded-lg transition-all duration-200",
                        !expanded && "lg:justify-center",
                        isActive 
                          ? "bg-gym-primary text-white" 
                          : "text-gym-muted hover:bg-gym-secondary hover:text-gym-primary"
                      )}
                      aria-label={expanded ? item.name : `${item.name} (Icon only)`}
                    >
                      <ItemIcon size={20} className={expanded ? "mr-3" : "mx-auto"} />
                      {expanded && <span>{item.name}</span>}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          
          <div className="px-6 mt-auto hidden">
            <button
              onClick={toggleSidebar}
              className="hidden lg:flex items-center justify-center w-full p-2 rounded-lg text-gym-muted hover:text-gym-primary hover:bg-gym-secondary transition-colors"
              aria-label={expanded ? "Collapse sidebar" : "Expand sidebar"}
            >
              {expanded ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Navigation;
