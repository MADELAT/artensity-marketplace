
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";

export function AuthForm() {
  return (
    <Card className="bg-transparent backdrop-blur-sm border-white/10 text-white">
      <Tabs defaultValue="login">
        <TabsList className="grid w-full grid-cols-2 bg-white/5 border-b border-white/10">
          <TabsTrigger value="login" className="data-[state=active]:bg-white/10 text-white">Iniciar sesión</TabsTrigger>
          <TabsTrigger value="register" className="data-[state=active]:bg-white/10 text-white">Registrarse</TabsTrigger>
        </TabsList>
        
        <TabsContent value="login">
          <LoginForm />
        </TabsContent>
        
        <TabsContent value="register">
          <RegisterForm />
        </TabsContent>
      </Tabs>
    </Card>
  );
}
