import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { toast as sonnerToast } from "sonner";
import { Profile } from "@/types/supabase";
import { AuthContext, AuthProviderProps } from "@/contexts/AuthContext";
import { fetchUserProfile } from "@/utils/profileUtils";
import { redirectUserBasedOnRole } from "@/utils/authRedirect";

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<any | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const fetchUserProfileData = async (userId: string, allowRedirect = true) => {
    try {
      setError(null);
      const userProfile = await fetchUserProfile(userId);

      if (userProfile) {
        setProfile(userProfile);
        setIsLoading(false);

        const isLandingOrLogin = ["/", "/login"].includes(
          window.location.pathname
        );
        if (allowRedirect && isLandingOrLogin) {
          redirectUserBasedOnRole(userProfile.role, navigate);
        }
      } else {
        setError("No se pudo cargar el perfil del usuario");
        setIsLoading(false);
      }
    } catch (err) {
      console.error("Error fetching profile:", err);
      setError("Error al cargar el perfil del usuario");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);

      if (session?.user) {
        setTimeout(() => {
          fetchUserProfileData(session.user.id);
        }, 0);
      } else {
        setProfile(null);
        setIsLoading(false);
        setError(null);
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);

      if (session?.user) {
        fetchUserProfileData(session.user.id);
      } else {
        setIsLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const { error, data } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

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

      // Redirección directa post-login
      if (data.user) {
        await fetchUserProfileData(data.user.id);
      }
    } catch (error: any) {
      console.error("Error de inicio de sesión:", error.message);
      setIsLoading(false);
      throw error;
    }
  };

  const signUp = async (
    email: string,
    password: string,
    userData: Partial<Profile>
  ) => {
    try {
      setIsLoading(true);
      setError(null);
      console.log("📦 userData recibido en signUp:", userData);

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: userData.first_name,
            last_name: userData.last_name,
            role: userData.role || "buyer",
            telephone: userData.telephone,
            country: userData.country || "unspecified",
          },
        },
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

      sonnerToast.success("¡Registro exitoso!", {
        description: "Accediendo a tu dashboard...",
      });

      // Redirección tras signup
      if (data.user) {
        await fetchUserProfileData(data.user.id);
        await supabase.from("profiles").upsert(
          {
            id: data.user.id,
            country: userData.country || "unspecified",
          },
          { onConflict: "id" }
        );
      }

      setIsLoading(false);
    } catch (error: any) {
      console.error("Error de registro:", error.message);
      setIsLoading(false);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      setError(null);
      await supabase.auth.signOut();
      setUser(null);
      setProfile(null);
      toast({
        title: "Sesión cerrada",
        description: "Has cerrado sesión correctamente.",
      });
      navigate("/");
    } catch (error: any) {
      setError(error.message);
      toast({
        title: "Error al cerrar sesión",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        isLoading,
        error,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
