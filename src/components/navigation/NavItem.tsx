
import React from 'react';
import { Link } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItemProps {
  to: string;
  isActive: boolean;
  expanded: boolean;
  onClick?: () => void;
  icon: LucideIcon;
  label: string;
}

const NavItem: React.FC<NavItemProps> = ({ 
  to, 
  isActive, 
  expanded, 
  onClick, 
  icon: Icon, 
  label 
}) => {
  return (
    <li>
      <Link
        to={to}
        onClick={onClick}
        className={cn(
          "flex items-center py-3 px-4 rounded-lg transition-all duration-200",
          !expanded && "lg:justify-center",
          isActive 
            ? "bg-gym-primary text-white" 
            : "text-gym-muted hover:bg-gym-secondary hover:text-gym-primary"
        )}
        aria-label={expanded ? label : `${label} (Icon only)`}
      >
        <Icon size={20} className={expanded ? "mr-3" : "mx-auto"} />
        {expanded && <span>{label}</span>}
      </Link>
    </li>
  );
};

export default NavItem;
