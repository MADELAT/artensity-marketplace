import { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

interface LayoutProps {
  children: ReactNode;
  removePadding?: boolean;
}

export function Layout({ children, removePadding = false }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className={`flex-grow ${removePadding ? '' : 'pt-20'}`}>
        {children}
      </main>
      <Footer />
    </div>
  );
}
