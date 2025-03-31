
import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from './use-toast';
import { toast as sonnerToast } from 'sonner';
import { Profile } from '@/types/supabase';

interface AuthContextType {
  user: any | null;
  profile: Profile | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, userData: Partial<Profile>) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Redirect user based on role
  const redirectUserBasedOnRole = (role: string) => {
    console.log("Redirecting user based on role:", role);
    switch (role) {
      case 'admin':
        navigate('/admin');
        break;
      case 'artist':
        navigate('/artist-dashboard');
        break;
      case 'gallery':
        navigate('/gallery-dashboard');
        break;
      case 'buyer':
      default:
        navigate('/buyer-dashboard');
        break;
    }
  };

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("Auth state changed:", event, session?.user?.id);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Fetch user profile when authenticated
          setTimeout(() => {
            fetchUserProfile(session.user.id);
          }, 0);
        } else {
          setProfile(null);
          setIsLoading(false);
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("Checking existing session:", session?.user?.id);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        fetchUserProfile(session.user.id);
      } else {
        setIsLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  const fetchUserProfile = async (userId: string) => {
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
        setIsLoading(false);
      } else {
        console.log("Profile fetched:", data);
        setProfile(data as Profile);
        
        // Redirect based on role if on login page or homepage
        if (data && (window.location.pathname === '/login' || window.location.pathname === '/')) {
          redirectUserBasedOnRole(data.role);
        }
        setIsLoading(false);
      }
    } catch (err) {
      console.error("Error in fetchUserProfile:", err);
      setIsLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) {
        toast({
          title: "Error de inicio de sesión",
          description: error.message,
          variant: "destructive",
        });
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
        setIsLoading(false);
        throw error;
      }
      
      console.log("Sign up successful:", data);
      
      // Show toast notification
      sonnerToast.success("¡Registro exitoso!", {
        description: "Accediendo a tu dashboard...",
        duration: 3000,
      });
      
      // Don't rely on auth state change for first redirect after signup
      // Explicitly navigate based on the role chosen during registration
      if (userData.role) {
        setTimeout(() => {
          redirectUserBasedOnRole(userData.role);
          setIsLoading(false);
        }, 1000);
      }
    } catch (error: any) {
      console.error('Error de registro:', error.message);
      setIsLoading(false);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/');
      toast({
        title: "Sesión cerrada",
        description: "Has cerrado sesión correctamente.",
      });
    } catch (error: any) {
      console.error('Error al cerrar sesión:', error.message);
      toast({
        title: "Error al cerrar sesión",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <AuthContext.Provider value={{ user, profile, isLoading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
