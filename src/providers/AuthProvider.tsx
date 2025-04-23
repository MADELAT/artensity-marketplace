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

        if (allowRedirect) {
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

      // 1. Solo registrar el usuario en Auth
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        console.error("Error en signup:", error);
        toast({
          title: "Error de registro",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }

      if (!data?.user?.id) {
        throw new Error("No se pudo obtener el ID del usuario");
      }

      // 2. Esperar un momento para asegurar que el usuario está registrado
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // 3. Crear el perfil completo de una sola vez
      const timestamp = new Date().toISOString();
      const { error: profileError } = await supabase.from("profiles").upsert(
        {
          id: data.user.id,
          email: email,
          first_name: userData.first_name || null,
          last_name: userData.last_name || null,
          role: userData.role || "artist",
          telephone: userData.telephone || null,
          country: userData.country || null,
          created_at: timestamp,
          updated_at: timestamp,
          status: "approved",
        },
        { onConflict: "id" }
      );

      if (profileError) {
        console.error("Error creando perfil:", profileError);
        // Si falla la creación del perfil, intentamos hacer logout
        await supabase.auth.signOut();
        toast({
          title: "Error al crear perfil",
          description: "No se pudo completar el registro",
          variant: "destructive",
        });
        throw profileError;
      }

      toast({
        title: "¡Registro exitoso!",
        description: "Tu cuenta ha sido creada.",
      });

      await fetchUserProfileData(data.user.id, true);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      setError(error.message);
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
