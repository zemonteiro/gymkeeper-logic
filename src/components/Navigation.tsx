
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Activity, 
  Users, 
  Calendar, 
  BarChart3, 
  Menu, 
  ChevronLeft, 
  ChevronRight, 
  Dumbbell, 
  Droplets, 
  LayoutDashboard, 
  Eye, 
  KeySquare, 
  ShoppingCart,
  LogOut,
  User,
  LogIn
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/context/AuthContext';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

const Navigation = () => {
  const [expanded, setExpanded] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { user, profile, signOut } = useAuth();
  
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
  
  // Get user initials for avatar
  const getUserInitials = () => {
    if (!profile) return 'GK';
    
    const firstInitial = profile.first_name ? profile.first_name[0] : '';
    const lastInitial = profile.last_name ? profile.last_name[0] : '';
    
    return `${firstInitial}${lastInitial}`.toUpperCase();
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
    
      {/* User profile/login in top right */}
      <div className="fixed top-4 right-4 z-50 lg:absolute lg:top-8 lg:right-8">
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative rounded-full h-10 w-10 p-0">
                <Avatar>
                  <AvatarFallback className="bg-gym-primary text-white">
                    {getUserInitials()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>
                {profile?.first_name} {profile?.last_name}
                <p className="text-xs text-muted-foreground">{profile?.email}</p>
                <p className="text-xs text-muted-foreground mt-1 capitalize">Role: {profile?.role}</p>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate('/client-view')}>
                <User className="mr-2 h-4 w-4" />
                <span>My Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={signOut}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log Out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button 
            variant="outline" 
            className="flex items-center gap-2 lg:bg-white"
            onClick={() => navigate('/auth')}
          >
            <LogIn size={18} />
            <span className="hidden sm:inline">Sign In</span>
          </Button>
        )}
      </div>
    
      {/* Navigation sidebar */}
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
          
          <nav className="flex-1 px-4 overflow-y-auto">
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
              
              {/* Login/Signup link for unauthenticated users */}
              {!user && (
                <li>
                  <Link
                    to="/auth"
                    onClick={handleNavClick}
                    className={cn(
                      "flex items-center py-3 px-4 rounded-lg transition-all duration-200 mt-4",
                      !expanded && "lg:justify-center",
                      location.pathname === '/auth'
                        ? "bg-gym-primary text-white" 
                        : "text-gym-muted hover:bg-gym-secondary hover:text-gym-primary"
                    )}
                  >
                    <LogIn size={20} className={expanded ? "mr-3" : "mx-auto"} />
                    {expanded && <span>Sign In</span>}
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
};

export default Navigation;
