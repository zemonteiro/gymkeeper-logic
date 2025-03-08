import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Activity, Users, Calendar, BarChart3, Menu, X, Wrench, Bath, LayoutDashboard, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navigation = () => {
  const [expanded, setExpanded] = useState(true);
  const location = useLocation();
  
  const toggleSidebar = () => {
    setExpanded(!expanded);
  };
  
  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Members', path: '/members', icon: Users },
    { name: 'Classes', path: '/classes', icon: Calendar },
    { name: 'Statistics', path: '/stats', icon: BarChart3 },
    { name: 'Maintenance', path: '/maintenance', icon: Wrench },
    { name: 'Cleaning', path: '/cleaning', icon: Bath },
    { name: 'Client View', path: '/client-view', icon: Eye },
  ];
  
  return (
    <>
      {/* Mobile menu button */}
      <button 
        onClick={toggleSidebar} 
        className="lg:hidden fixed top-4 left-4 z-50 rounded-full p-2 bg-white shadow-subtle"
      >
        {expanded ? <X size={20} /> : <Menu size={20} />}
      </button>
    
      {/* Navigation sidebar */}
      <aside
        className={cn(
          "fixed lg:relative z-40 h-screen transition-all duration-300 ease-in-out glass-morphism",
          expanded ? "w-64" : "w-0 lg:w-20 overflow-hidden"
        )}
      >
        <div className="flex flex-col h-full py-8">
          <div className="px-6 mb-8">
            <h1 className={cn(
              "font-bold text-gym-primary transition-all duration-300",
              expanded ? "text-2xl" : "text-center text-xl"
            )}>
              {expanded ? "GymKeeper" : "GK"}
            </h1>
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
                      className={cn(
                        "flex items-center py-3 px-4 rounded-lg transition-all duration-200",
                        isActive 
                          ? "bg-gym-primary text-white" 
                          : "text-gym-muted hover:bg-gym-secondary hover:text-gym-primary"
                      )}
                    >
                      <ItemIcon size={20} className={expanded ? "mr-3" : "mx-auto"} />
                      {expanded && <span>{item.name}</span>}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          
          <div className="px-6 mt-auto">
            <button
              onClick={toggleSidebar}
              className="hidden lg:flex items-center justify-center w-full p-2 rounded-lg text-gym-muted hover:text-gym-primary hover:bg-gym-secondary transition-colors"
            >
              {expanded ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Navigation;
