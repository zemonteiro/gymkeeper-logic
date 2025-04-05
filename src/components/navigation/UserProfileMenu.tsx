
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, User, LogIn } from 'lucide-react';
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
import { useAuth } from '@/context';

const UserProfileMenu: React.FC = () => {
  const navigate = useNavigate();
  const { user, profile, signOut } = useAuth();
  
  // Get user initials for avatar
  const getUserInitials = () => {
    if (!profile) return 'GK';
    
    const firstInitial = profile.first_name ? profile.first_name[0] : '';
    const lastInitial = profile.last_name ? profile.last_name[0] : '';
    
    return `${firstInitial}${lastInitial}`.toUpperCase();
  };
  
  return (
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
  );
};

export default UserProfileMenu;
