
import { AuthForm } from "@/components/auth/AuthForm";
import { Layout } from "@/components/layout/Layout";

export default function Login() {
  return (
    <Layout>
      <div className="relative min-h-screen flex items-center justify-center py-12 px-4">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1567095761054-7a02e69e5c43"
            alt="Interior Art Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
        </div>
        
        <div className="w-full max-w-md z-10">
          <h1 className="text-4xl font-serif font-light text-white text-center mb-8 tracking-wider">
            Welcome to ArTendency
          </h1>
          <div className="bg-black/10 backdrop-blur-md border border-white/10 shadow-lg">
            <AuthForm />
          </div>
        </div>
      </div>
    </Layout>
  );
}
