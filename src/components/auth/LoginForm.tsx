
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CardContent, CardFooter, CardHeader, CardDescription, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { signIn } = useAuth();
  
  // Login form state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await signIn(loginEmail, loginPassword);
    } catch (error: any) {
      console.error("Login error:", error);
      // Error is already handled by useAuth
    } finally {
      setIsLoading(false);
    }
  };
  
  // Input and button styles for transparent form
  const inputClasses = "bg-white/10 border-white/20 text-white placeholder:text-white/50";
  const buttonClasses = "w-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm border border-white/30";

  return (
    <form onSubmit={handleLogin}>
      <CardHeader>
        <CardTitle className="text-2xl text-white">Bienvenido de nuevo</CardTitle>
        <CardDescription className="text-white/80">
          Ingresa tus credenciales para acceder a tu cuenta
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-white">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="email@ejemplo.com"
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
            required
            className={inputClasses}
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password" className="text-white">Contraseña</Label>
            <a href="#" className="text-xs text-primary hover:underline">
              ¿Olvidaste tu contraseña?
            </a>
          </div>
          <Input
            id="password"
            type="password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
            required
            className={inputClasses}
          />
        </div>
      </CardContent>
      
      <CardFooter>
        <Button type="submit" className={buttonClasses} disabled={isLoading}>
          {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
        </Button>
      </CardFooter>
    </form>
  );
}
