
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { AuthState, UserProfile } from '@/types/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface AuthContextType extends AuthState {
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
  signOut: () => Promise<void>;
  setAsAdmin: () => Promise<void>;
}

const initialState: AuthState = {
  user: null,
  profile: null,
  isLoading: true,
  error: null,
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const [state, setState] = useState<AuthState>(initialState);
  const [session, setSession] = useState<Session | null>(null);

  // Fetch user profile data from the profiles table
  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching user profile:', error);
        return null;
      }

      return data as UserProfile;
    } catch (error) {
      console.error('Error in fetchUserProfile:', error);
      return null;
    }
  };

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
            profile,
            isLoading: false,
            error: null,
          });
        } else {
          // User is signed out
          setState({
            user: null,
            profile: null,
            isLoading: false,
            error: null,
          });
        }
        
        setSession(session);
      }
    );

    // THEN check for existing session
    const initializeAuth = async () => {
      const { data } = await supabase.auth.getSession();
      
      if (data.session?.user) {
        const profile = await fetchUserProfile(data.session.user.id);
        
        setState({
          user: data.session.user,
          profile,
          isLoading: false,
          error: null,
        });
        
        setSession(data.session);
      } else {
        setState(state => ({ ...state, isLoading: false }));
      }
    };

    initializeAuth();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Sign in with email and password
  const signIn = async (email: string, password: string) => {
    try {
      setState(state => ({ ...state, isLoading: true, error: null }));
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setState(state => ({ ...state, isLoading: false, error: error.message }));
        toast.error(error.message);
        return;
      }

      if (data.user) {
        const profile = await fetchUserProfile(data.user.id);
        setState({
          user: data.user,
          profile,
          isLoading: false,
          error: null,
        });
        
        toast.success('Signed in successfully');
        navigate('/');
      }
    } catch (error: any) {
      setState(state => ({ ...state, isLoading: false, error: error.message }));
      toast.error('Failed to sign in');
    }
  };

  // Sign up with email and password
  const signUp = async (email: string, password: string, firstName: string, lastName: string) => {
    try {
      setState(state => ({ ...state, isLoading: true, error: null }));
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
          },
        },
      });

      if (error) {
        setState(state => ({ ...state, isLoading: false, error: error.message }));
        toast.error(error.message);
        return;
      }

      setState(state => ({ ...state, isLoading: false }));
      toast.success('Signed up successfully. Please check your email for confirmation.');
      navigate('/auth');
    } catch (error: any) {
      setState(state => ({ ...state, isLoading: false, error: error.message }));
      toast.error('Failed to sign up');
    }
  };

  // Sign out
  const signOut = async () => {
    try {
      setState(state => ({ ...state, isLoading: true }));
      
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        setState(state => ({ ...state, isLoading: false, error: error.message }));
        toast.error(error.message);
        return;
      }

      setState({
        user: null,
        profile: null,
        isLoading: false,
        error: null,
      });
      
      toast.success('Signed out successfully');
      navigate('/');
    } catch (error: any) {
      setState(state => ({ ...state, isLoading: false, error: error.message }));
      toast.error('Failed to sign out');
    }
  };

  // Set a user as admin (for testing purposes)
  const setAsAdmin = async () => {
    if (!state.user) {
      toast.error('You need to be logged in');
      return;
    }

    try {
      const { error } = await supabase
        .from('profiles')
        .update({ role: 'admin' })
        .eq('id', state.user.id);

      if (error) {
        toast.error('Failed to set as admin');
        return;
      }

      // Refresh profile
      const profile = await fetchUserProfile(state.user.id);
      setState(current => ({ ...current, profile }));
      
      toast.success('You are now an admin');
    } catch (error) {
      toast.error('Failed to set as admin');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signIn,
        signUp,
        signOut,
        setAsAdmin,
      }}
    >
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
