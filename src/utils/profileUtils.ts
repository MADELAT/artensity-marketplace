
import { supabase } from '@/integrations/supabase/client';
import { Profile } from '@/types/supabase';
import { toast } from '@/hooks/use-toast';

export const fetchUserProfile = async (userId: string): Promise<Profile | null> => {
  try {
    console.log("Fetching profile for user:", userId);
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
      
    if (error) {
      console.error('Error fetching profile:', error);
      toast({
        title: "Error",
        description: "No se pudo cargar el perfil del usuario",
        variant: "destructive"
      });
      return null;
    } else {
      console.log("Profile fetched:", data);
      return data as Profile;
    }
  } catch (err) {
    console.error("Error in fetchUserProfile:", err);
    return null;
  }
};
