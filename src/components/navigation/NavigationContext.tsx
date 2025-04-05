
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

type NavigationContextType = {
  expanded: boolean;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  toggleSidebar: () => void;
};

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [expanded, setExpanded] = useState(true);
  const isMobile = useIsMobile();
  
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
    <NavigationContext.Provider value={{ expanded, setExpanded, toggleSidebar }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = (): NavigationContextType => {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};
