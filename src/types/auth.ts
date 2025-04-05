
import { User } from '@supabase/supabase-js';
import { Database } from '@/integrations/supabase/types';

export interface UserProfile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  email: string;
  avatar_url: string | null;
  role: 'admin' | 'member';
  created_at: string;
  updated_at: string;
}

export interface AuthState {
  user: User | null;
  profile: UserProfile | null;
  isLoading: boolean;
  error: string | null;
}

export type ProfileWithMembership = UserProfile & {
  memberships: MemberMembership[] | null;
};

export type MemberMembership = Database['public']['Tables']['member_memberships']['Row'] & {
  membership: Database['public']['Tables']['memberships']['Row'];
};
