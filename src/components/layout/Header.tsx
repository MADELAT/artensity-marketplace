
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { UserMenu } from "./UserMenu";
import { useAuth } from "@/contexts/AuthContext";
import { Menu, X } from "lucide-react";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user } = useAuth();
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  // Close mobile menu when location changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);
  
  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        isScrolled 
          ? "bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md border-b border-gray-200 dark:border-gray-800" 
          : "bg-white/30 dark:bg-zinc-900/30 backdrop-blur-sm"
      }`}
    >
      <div className="container flex h-14 items-center px-4 md:px-6">
        <Link to="/" className="mr-6 flex items-center">
          <span className="text-xl font-serif">ArTendency</span>
        </Link>
        
        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-4 lg:space-x-6 flex-1">
          <Link 
            to="/explore" 
            className={`text-sm font-medium transition-colors hover:text-primary ${
              location.pathname === '/explore' ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            Explorar
          </Link>
          <Link 
            to="/artists" 
            className={`text-sm font-medium transition-colors hover:text-primary ${
              location.pathname === '/artists' ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            Artistas
          </Link>
          <Link 
            to="/galleries" 
            className={`text-sm font-medium transition-colors hover:text-primary ${
              location.pathname === '/galleries' ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            Galerías
          </Link>
          <Link 
            to="/about" 
            className={`text-sm font-medium transition-colors hover:text-primary ${
              location.pathname === '/about' ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            Acerca de
          </Link>
        </nav>
        
        <div className="hidden md:flex items-center ml-auto space-x-4">
          {user ? (
            <UserMenu />
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link to="/login">Iniciar sesión</Link>
              </Button>
              <Button asChild>
                <Link to="/login">Registrarse</Link>
              </Button>
            </>
          )}
        </div>
        
        {/* Mobile menu button */}
        <div className="md:hidden ml-auto flex items-center">
          {user && <UserMenu />}
          <Button
            variant="ghost"
            size="icon"
            className="ml-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>
      
      {/* Mobile navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-800 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md">
          <nav className="flex flex-col p-4 space-y-3">
            <Link 
              to="/explore" 
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                location.pathname === '/explore' 
                  ? 'bg-muted text-foreground' 
                  : 'text-muted-foreground hover:bg-muted/50'
              }`}
            >
              Explorar
            </Link>
            <Link 
              to="/artists" 
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                location.pathname === '/artists' 
                  ? 'bg-muted text-foreground' 
                  : 'text-muted-foreground hover:bg-muted/50'
              }`}
            >
              Artistas
            </Link>
            <Link 
              to="/galleries" 
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                location.pathname === '/galleries' 
                  ? 'bg-muted text-foreground' 
                  : 'text-muted-foreground hover:bg-muted/50'
              }`}
            >
              Galerías
            </Link>
            <Link 
              to="/about" 
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                location.pathname === '/about' 
                  ? 'bg-muted text-foreground' 
                  : 'text-muted-foreground hover:bg-muted/50'
              }`}
            >
              Acerca de
            </Link>
            
            {!user && (
              <div className="pt-3 border-t border-gray-200 dark:border-gray-800 space-y-2">
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/login">Iniciar sesión</Link>
                </Button>
                <Button className="w-full" asChild>
                  <Link to="/login">Registrarse</Link>
                </Button>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
