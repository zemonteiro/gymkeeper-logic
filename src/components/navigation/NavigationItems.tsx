
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

const NavigationItems: React.FC = () => {
  const location = useLocation();
  const { user, profile } = useAuth();
  const { expanded, toggleSidebar } = useNavigation();
  const isMobile = window.innerWidth < 768;
  
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
  
  // Close the sidebar when clicking a link on mobile
  const handleNavClick = () => {
    if (isMobile) {
      toggleSidebar();
    }
  };
  
  return (
    <nav className="flex-1 px-4 overflow-y-auto">
      <ul className="space-y-2">
        {navItems.map((item) => (
          <NavItem
            key={item.name}
            name={item.name}
            path={item.path}
            icon={item.icon}
            isActive={location.pathname === item.path}
            onClick={handleNavClick}
          />
        ))}
        
        {/* Login/Signup link for unauthenticated users */}
        {!user && (
          <NavItem
            name="Sign In"
            path="/auth"
            icon={LogIn}
            isActive={location.pathname === '/auth'}
            onClick={handleNavClick}
          />
        )}
      </ul>
    </nav>
  );
};

export default NavigationItems;
