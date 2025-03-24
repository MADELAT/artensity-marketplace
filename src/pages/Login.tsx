
import { AuthForm } from "@/components/auth/AuthForm";
import { Layout } from "@/components/layout/Layout";

export default function Login() {
  return (
    <Layout>
      <div className="container mx-auto py-16 px-4">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-serif font-bold text-center mb-8">
            Welcome to Artendency
          </h1>
          <AuthForm />
        </div>
      </div>
    </Layout>
  );
}
