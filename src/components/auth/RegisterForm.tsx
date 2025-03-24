
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/hooks/useAuth";

export function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { signUp } = useAuth();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [telephone, setTelephone] = useState("");
  const [userType, setUserType] = useState<"buyer" | "artist" | "gallery">("buyer");
  
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      if (!email || !password || !firstName || !lastName || !userType) {
        toast({
          title: "Error de registro",
          description: "Por favor completa todos los campos requeridos.",
          variant: "destructive",
        });
        return;
      }
      
      await signUp(email, password, {
        first_name: firstName,
        last_name: lastName,
        telephone: telephone,
        role: userType,
      });
      
      toast({
        title: "Registro exitoso",
        description: "Tu cuenta ha sido creada. Por favor inicia sesión.",
      });
      
      // Reset form
      setEmail("");
      setPassword("");
      setFirstName("");
      setLastName("");
      setTelephone("");
      setUserType("buyer");
      
    } catch (error: any) {
      console.error("Registration error:", error);
      toast({
        title: "Error de registro",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <CardHeader>
        <CardTitle className="text-2xl">Crear una cuenta</CardTitle>
        <CardDescription>
          Únete a Artendency para comenzar tu viaje en el arte
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">Nombre</Label>
            <Input
              id="firstName"
              type="text"
              placeholder="Juan"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="lastName">Apellido</Label>
            <Input
              id="lastName"
              type="text"
              placeholder="Pérez"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="register-email">Email</Label>
          <Input
            id="register-email"
            type="email"
            placeholder="email@ejemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="telephone">Teléfono</Label>
          <Input
            id="telephone"
            type="tel"
            placeholder="+34 123 456 789"
            value={telephone}
            onChange={(e) => setTelephone(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="register-password">Contraseña</Label>
          <Input
            id="register-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="user-type">Tipo de cuenta</Label>
          <Select value={userType} onValueChange={(value: "buyer" | "artist" | "gallery") => setUserType(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Selecciona tu rol" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="buyer">Coleccionista/Comprador</SelectItem>
              <SelectItem value="artist">Artista</SelectItem>
              <SelectItem value="gallery">Galería</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
      
      <CardFooter>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Creando cuenta..." : "Crear cuenta"}
        </Button>
      </CardFooter>
    </form>
  );
}
