
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { toast as sonnerToast } from 'sonner';
import { Profile } from '@/types/supabase';
import { AuthContext, AuthProviderProps } from '@/contexts/AuthContext';
import { fetchUserProfile } from '@/utils/profileUtils';
import { redirectUserBasedOnRole } from '@/utils/authRedirect';

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<any | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("Auth state changed:", event, session?.user?.id);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Fetch user profile when authenticated
          // Using setTimeout to avoid Supabase auth deadlock
          setTimeout(() => {
            fetchUserProfileData(session.user.id);
          }, 0);
        } else {
          setProfile(null);
          setIsLoading(false);
          setError(null);
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("Checking existing session:", session?.user?.id);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        fetchUserProfileData(session.user.id);
      } else {
        setIsLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  const fetchUserProfileData = async (userId: string) => {
    try {
      setError(null);
      const userProfile = await fetchUserProfile(userId);
      
      if (userProfile) {
        console.log("User profile loaded:", userProfile);
        setProfile(userProfile);
        
        // Redirect based on role if on login page or homepage
        if (window.location.pathname === '/login' || window.location.pathname === '/') {
          redirectUserBasedOnRole(userProfile.role, navigate);
        }
      } else {
        console.log("No user profile found");
        setError("No se pudo cargar el perfil del usuario");
      }
    } catch (err) {
      console.error("Error fetching user profile:", err);
      setError("Error al cargar el perfil del usuario");
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) {
        toast({
          title: "Error de inicio de sesión",
          description: error.message,
          variant: "destructive",
        });
        setError(error.message);
        setIsLoading(false);
        throw error;
      }
      
      toast({
        title: "¡Bienvenido de nuevo!",
        description: "Has iniciado sesión correctamente.",
      });
    } catch (error: any) {
      console.error('Error de inicio de sesión:', error.message);
      setIsLoading(false);
      throw error;
    }
  };

  const signUp = async (email: string, password: string, userData: Partial<Profile>) => {
    try {
      console.log("Signing up with data:", { email, userData });
      setIsLoading(true);
      setError(null);
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: userData.first_name,
            last_name: userData.last_name,
            role: userData.role || 'buyer',
            telephone: userData.telephone
          }
        }
      });

      if (error) {
        toast({
          title: "Error de registro",
          description: error.message,
          variant: "destructive",
        });
        setError(error.message);
        setIsLoading(false);
        throw error;
      }
      
      console.log("Sign up successful:", data);
      
      // Show toast notification
      sonnerToast.success("¡Registro exitoso!", {
        description: "Accediendo a tu dashboard...",
        duration: 3000,
      });
      
      // Explicitly navigate based on the role chosen during registration
      if (userData.role) {
        // Add small delay to ensure profile is created
        setTimeout(() => {
          redirectUserBasedOnRole(userData.role, navigate);
          setIsLoading(false);
        }, 1500);
      }
    } catch (error: any) {
      console.error('Error de registro:', error.message);
      setIsLoading(false);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      setError(null);
      await supabase.auth.signOut();
      navigate('/');
      toast({
        title: "Sesión cerrada",
        description: "Has cerrado sesión correctamente.",
      });
    } catch (error: any) {
      console.error('Error al cerrar sesión:', error.message);
      setError(error.message);
      toast({
        title: "Error al cerrar sesión",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      profile, 
      isLoading, 
      error,
      signIn, 
      signUp, 
      signOut 
    }}>
      {children}
    </AuthContext.Provider>
  );
}
