
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Activity, 
  Users, 
  Calendar, 
  BarChart3, 
  Dumbbell, 
  Droplets, 
  LayoutDashboard, 
  Eye, 
  KeySquare, 
  ShoppingCart,
  LogIn
} from 'lucide-react';
import { useAuth } from '@/context';
import NavItem from './NavItem';
import { useNavigation } from './NavigationContext';
import { useIsMobile } from '@/hooks/use-mobile';

interface NavigationItemsProps {
  expanded: boolean;
}

const NavigationItems: React.FC<NavigationItemsProps> = ({ expanded }) => {
  const location = useLocation();
  const { profile } = useAuth();
  const { toggleSidebar } = useNavigation();
  const isMobile = useIsMobile();
  
  // Close the sidebar when clicking a link on mobile
  const handleNavClick = () => {
    if (isMobile) {
      toggleSidebar();
    }
  };
  
  // Define navigation items based on user role
  const getNavItems = () => {
    const commonItems = [
      { name: 'Dashboard', path: '/', icon: LayoutDashboard },
      { name: 'Classes', path: '/classes', icon: Calendar },
    ];
    
    const adminItems = [
      { name: 'Members', path: '/members', icon: Users },
      { name: 'Sales', path: '/sales', icon: ShoppingCart },
      { name: 'Statistics', path: '/stats', icon: BarChart3 },
      { name: 'Equipment', path: '/equipment', icon: Dumbbell },
      { name: 'Cleaning', path: '/cleaning', icon: Droplets },
      { name: 'Access Control', path: '/access-control', icon: KeySquare },
      { name: 'Client View', path: '/client-view', icon: Eye },
    ];
    
    // Only show admin items if user has admin role
    if (profile && profile.role === 'admin') {
      return [...commonItems, ...adminItems];
    }
    
    return commonItems;
  };
  
  const navItems = getNavItems();
  
  return (
    <ul className="space-y-2">
      {navItems.map((item) => (
        <NavItem
          key={item.name}
          to={item.path}
          isActive={location.pathname === item.path}
          expanded={expanded}
          onClick={handleNavClick}
          icon={item.icon}
          label={item.name}
        />
      ))}
    </ul>
  );
};

// Add auth item as a separate component to avoid conditional rendering issues
NavigationItems.AuthItem = function AuthNavItem({ expanded }: { expanded: boolean }) {
  const location = useLocation();
  const { toggleSidebar } = useNavigation();
  const isMobile = useIsMobile();
  
  const handleNavClick = () => {
    if (isMobile) {
      toggleSidebar();
    }
  };
  
  return (
    <ul className="space-y-2 mt-4">
      <NavItem
        to="/auth"
        isActive={location.pathname === '/auth'}
        expanded={expanded}
        onClick={handleNavClick}
        icon={LogIn}
        label="Sign In"
      />
    </ul>
  );
};

export default NavigationItems;
