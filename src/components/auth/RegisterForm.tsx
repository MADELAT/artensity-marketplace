
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { toast as sonnerToast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CardContent, CardFooter, CardHeader, CardDescription, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/hooks/useAuth";

export function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { signUp } = useAuth();
  
  // Register form state
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [telephone, setTelephone] = useState("");
  const [userType, setUserType] = useState<"buyer" | "artist" | "gallery">("buyer");
  
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Validate form
      if (!registerEmail || !registerPassword || !firstName || !lastName || !userType) {
        toast({
          title: "Error de registro",
          description: "Por favor completa todos los campos requeridos.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }
      
      sonnerToast.loading("Creando tu cuenta...");
      
      await signUp(registerEmail, registerPassword, {
        first_name: firstName,
        last_name: lastName,
        telephone: telephone,
        role: userType,
      });
      
      // Reset form - though user will likely be redirected
      setRegisterEmail("");
      setRegisterPassword("");
      setFirstName("");
      setLastName("");
      setTelephone("");
      setUserType("buyer");
      
    } catch (error: any) {
      console.error("Registration error:", error.message);
      // Error already handled by useAuth
    } finally {
      setIsLoading(false);
    }
  };
  
  // Input and button styles for transparent form
  const inputClasses = "bg-white/10 border-white/20 text-white placeholder:text-white/50";
  const buttonClasses = "w-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm border border-white/30";

  return (
    <form onSubmit={handleRegister}>
      <CardHeader>
        <CardTitle className="text-2xl text-white">Crear una cuenta</CardTitle>
        <CardDescription className="text-white/80">
          Únete a Artendency para comenzar tu viaje en el arte
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName" className="text-white">Nombre</Label>
            <Input
              id="firstName"
              type="text"
              placeholder="Juan"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className={inputClasses}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="lastName" className="text-white">Apellido</Label>
            <Input
              id="lastName"
              type="text"
              placeholder="Pérez"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              className={inputClasses}
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="register-email" className="text-white">Email</Label>
          <Input
            id="register-email"
            type="email"
            placeholder="email@ejemplo.com"
            value={registerEmail}
            onChange={(e) => setRegisterEmail(e.target.value)}
            required
            className={inputClasses}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="telephone" className="text-white">Teléfono</Label>
          <Input
            id="telephone"
            type="tel"
            placeholder="+34 123 456 789"
            value={telephone}
            onChange={(e) => setTelephone(e.target.value)}
            className={inputClasses}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="register-password" className="text-white">Contraseña</Label>
          <Input
            id="register-password"
            type="password"
            value={registerPassword}
            onChange={(e) => setRegisterPassword(e.target.value)}
            required
            className={inputClasses}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="user-type" className="text-white">Tipo de cuenta</Label>
          <Select value={userType} onValueChange={(value: "buyer" | "artist" | "gallery") => setUserType(value)}>
            <SelectTrigger className="bg-white/10 border-white/20 text-white">
              <SelectValue placeholder="Selecciona tu rol" />
            </SelectTrigger>
            <SelectContent className="bg-black/90 border-white/20 text-white">
              <SelectItem value="buyer" className="focus:bg-white/10 focus:text-white">Coleccionista/Comprador</SelectItem>
              <SelectItem value="artist" className="focus:bg-white/10 focus:text-white">Artista</SelectItem>
              <SelectItem value="gallery" className="focus:bg-white/10 focus:text-white">Galería</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
      
      <CardFooter>
        <Button type="submit" className={buttonClasses} disabled={isLoading}>
          {isLoading ? "Creando cuenta..." : "Crear cuenta"}
        </Button>
      </CardFooter>
    </form>
  );
}
