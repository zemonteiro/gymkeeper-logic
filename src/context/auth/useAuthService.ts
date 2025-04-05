
import { useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { AuthState } from './AuthTypes';
import { UserProfile } from '@/types/auth';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const initialState: AuthState = {
  user: null,
  session: null,
  profile: null,
  isLoading: true,
  error: null,
};

export const useAuthService = () => {
  const navigate = useNavigate();
  const [state, setState] = useState<AuthState>(initialState);

  // Fetch user profile data from the profiles table
  const fetchUserProfile = async (userId: string): Promise<UserProfile | null> => {
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
          session: data.session,
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
        session: null,
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

  return {
    state,
    setState,
    fetchUserProfile,
    signIn,
    signUp,
    signOut,
    setAsAdmin,
  };
};
