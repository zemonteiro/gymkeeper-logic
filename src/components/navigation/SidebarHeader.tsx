
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNavigation } from './NavigationContext';

const SidebarHeader: React.FC = () => {
  const { expanded, toggleSidebar } = useNavigation();
  
  return (
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
  );
};

export default SidebarHeader;
