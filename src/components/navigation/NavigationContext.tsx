
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

interface NavigationContextState {
  expanded: boolean;
  toggleSidebar: () => void;
}

const NavigationContext = createContext<NavigationContextState | undefined>(undefined);

export const NavigationProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [expanded, setExpanded] = useState(true);
  const isMobile = useIsMobile();
  
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
  
  return (
    <NavigationContext.Provider value={{ expanded, toggleSidebar }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = (): NavigationContextState => {
  const context = useContext(NavigationContext);
  
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  
  return context;
};
