
import React from 'react';
import { useLocation } from 'react-router-dom';
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
  const { profile, user, setAsAdmin } = useAuth();
  const { toggleSidebar } = useNavigation();
  const isMobile = useIsMobile();
  
  // Close the sidebar when clicking a link on mobile
  const handleNavClick = () => {
    if (isMobile) {
      toggleSidebar();
    }
  };
  
  // For testing: Temporarily show all navigation items
  // In a production environment, you would remove this and properly check roles
  const isAdminUser = true; // Temporary override for testing
  
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
    
    // Temporary: Always include admin items for testing
    return [...commonItems, ...adminItems];
  };
  
  const navItems = getNavItems();
  
  // Add console logs to help with debugging
  console.log('User profile:', profile);
  console.log('Is admin override:', isAdminUser);
  console.log('Navigation items:', navItems);
  
  return (
    <div>
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
      
      {/* Add a button to set as admin for testing */}
      {user && !profile?.role && (
        <div className="mt-6 px-4">
          <button 
            onClick={() => setAsAdmin()} 
            className="text-xs text-gym-muted hover:text-gym-primary w-full text-left px-2 py-1 rounded-md hover:bg-gym-secondary"
          >
            Set as admin (Testing)
          </button>
        </div>
      )}
    </div>
  );
};

// Create separate AuthNavItem component
export const AuthNavItem: React.FC<{expanded: boolean}> = ({ expanded }) => {
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
