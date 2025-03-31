
import { AuthForm } from "@/components/auth/AuthForm";
import { Layout } from "@/components/layout/Layout";

export default function Login() {
  return (
    <Layout>
      <div className="relative min-h-screen flex items-center justify-center py-12 px-4">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            alt="Abstract Art Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
        </div>
        
        <div className="w-full max-w-md z-10">
          <h1 className="text-4xl font-serif font-light text-white text-center mb-8 tracking-wider">
            Welcome to ArTendency
          </h1>
          <div className="glass-auth-form">
            <AuthForm />
          </div>
        </div>
      </div>
    </Layout>
  );
}
