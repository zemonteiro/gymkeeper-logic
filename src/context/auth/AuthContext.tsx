
import React, { createContext, useContext, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { AuthContextType } from './AuthTypes';
import { useAuthService } from './useAuthService';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { 
    state, 
    setState, 
    fetchUserProfile, 
    signIn, 
    signUp, 
    signOut, 
    setAsAdmin 
  } = useAuthService();

  // Handle auth state changes
  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setState(state => ({ ...state, isLoading: true }));

        if (session?.user) {
          // User is signed in
          const profile = await fetchUserProfile(session.user.id);
          
          setState({
            user: session.user,
            session,
            profile,
            isLoading: false,
            error: null,
          });
        } else {
          // User is signed out
          setState({
            user: null,
            session: null,
            profile: null,
            isLoading: false,
            error: null,
          });
        }
      }
    );

    // THEN check for existing session
    const initializeAuth = async () => {
      const { data } = await supabase.auth.getSession();
      
      if (data.session?.user) {
        const profile = await fetchUserProfile(data.session.user.id);
        
        setState({
          user: data.session.user,
          session: data.session,
          profile,
          isLoading: false,
          error: null,
        });
      } else {
        setState(state => ({ ...state, isLoading: false }));
      }
    };

    initializeAuth();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const contextValue: AuthContextType = {
    ...state,
    signIn,
    signUp,
    signOut,
    setAsAdmin,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
