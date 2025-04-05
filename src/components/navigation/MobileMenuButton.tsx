
import React from 'react';
import { ChevronLeft, Menu } from 'lucide-react';
import { useNavigation } from './NavigationContext';

const MobileMenuButton: React.FC = () => {
  const { expanded, toggleSidebar } = useNavigation();
  
  return (
    <button 
      onClick={toggleSidebar} 
      className="lg:hidden fixed top-4 left-4 z-50 rounded-full p-2 bg-white shadow-subtle"
      aria-label={expanded ? "Close menu" : "Open menu"}
    >
      {expanded ? <ChevronLeft size={20} /> : <Menu size={20} />}
    </button>
  );
};

export default MobileMenuButton;
