
import React from 'react';
import { NavigationProvider } from './NavigationContext';
import MobileMenuButton from './MobileMenuButton';
import UserProfileMenu from './UserProfileMenu';
import Sidebar from './Sidebar';

const Navigation: React.FC = () => {
  return (
    <NavigationProvider>
      <MobileMenuButton />
      <UserProfileMenu />
      <Sidebar />
    </NavigationProvider>
  );
};

export default Navigation;
