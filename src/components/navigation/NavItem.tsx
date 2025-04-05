
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useNavigation } from './NavigationContext';
import { LucideIcon } from 'lucide-react';

interface NavItemProps {
  name: string;
  path: string;
  icon: LucideIcon;
  isActive: boolean;
  onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ 
  name, 
  path, 
  icon: Icon, 
  isActive,
  onClick 
}) => {
  const { expanded } = useNavigation();
  
  return (
    <li key={name}>
      <Link
        to={path}
        onClick={onClick}
        className={cn(
          "flex items-center py-3 px-4 rounded-lg transition-all duration-200",
          !expanded && "lg:justify-center",
          isActive 
            ? "bg-gym-primary text-white" 
            : "text-gym-muted hover:bg-gym-secondary hover:text-gym-primary"
        )}
        aria-label={expanded ? name : `${name} (Icon only)`}
      >
        <Icon size={20} className={expanded ? "mr-3" : "mx-auto"} />
        {expanded && <span>{name}</span>}
      </Link>
    </li>
  );
};

export default NavItem;
