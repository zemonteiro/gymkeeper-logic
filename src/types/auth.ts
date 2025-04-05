
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

// For now, we'll simplify these types to avoid the dependency on Database types
// We'll update them properly when user memberships are implemented
export type ProfileWithMembership = UserProfile & {
  memberships: any[] | null;
};

export type MemberMembership = {
  id: string;
  user_id: string;
  membership_id: string;
  start_date: string;
  end_date: string;
  payment_status: string;
  created_at: string;
  membership: {
    id: string;
    name: string;
    description: string | null;
    price: number;
    duration_days: number;
    features: any | null;
    is_active: boolean | null;
  };
};
