
import { supabase } from '@/integrations/supabase/client';
import { Profile } from '@/types/supabase';
import { toast } from 'sonner';

export const fetchUserProfile = async (userId: string): Promise<Profile | null> => {
  try {
    console.log("Fetching profile for user:", userId);
    
    // Allow a little time for the database to be updated after signup
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
      
    if (error) {
      console.error('Error fetching profile:', error);
      if (error.code === 'PGRST116') {
        console.log("No matching profile found - may be a new signup");
        
        // For a new signup, give the database trigger time to complete
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Try one more time
        const retryResult = await supabase
          .from('profiles')
          .select('*')
          .eq('id', userId)
          .single();
          
        if (retryResult.error) {
          console.error('Retry error fetching profile:', retryResult.error);
          return null;
        }
        
        return retryResult.data as Profile;
      }
      
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

export const updateUserProfile = async (userId: string, profileData: Partial<Profile>): Promise<{success: boolean, message: string, profile?: Profile}> => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .update(profileData)
      .eq('id', userId)
      .select()
      .single();
      
    if (error) {
      console.error('Error updating profile:', error);
      return { success: false, message: error.message };
    }
    
    return { success: true, message: 'Perfil actualizado correctamente', profile: data as Profile };
  } catch (err: any) {
    console.error("Error in updateUserProfile:", err);
    return { success: false, message: err.message || 'Error al actualizar el perfil' };
  }
};
