
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ShoppingCart, Bell, MessageSquare, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();
  const { user } = useAuth();

  // Close mobile menu when changing routes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "py-2 bg-black/70 backdrop-blur-lg" : "py-4 bg-transparent"}`}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-serif font-light text-white tracking-wider">
          ArTendency
        </Link>

        {isMobile ? (
          <>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)} className="text-white">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>

            {isOpen && (
              <div className="absolute top-full left-0 w-full bg-black/90 backdrop-blur-lg p-4 border-t border-white/10 animate-fade-in">
                <nav className="flex flex-col space-y-4">
                  <Link to="/explore" className="text-lg px-2 py-1 text-white hover:text-primary transition-colors">
                    Explore
                  </Link>
                  <Link to="/artists" className="text-lg px-2 py-1 text-white hover:text-primary transition-colors">
                    Artists
                  </Link>
                  <Link to="/galleries" className="text-lg px-2 py-1 text-white hover:text-primary transition-colors">
                    Galleries
                  </Link>
                  <Link to="/about" className="text-lg px-2 py-1 text-white hover:text-primary transition-colors">
                    About
                  </Link>
                  <div className="pt-2 border-t border-white/10">
                    <Link to="/login">
                      <Button className="w-full bg-transparent border border-white hover:bg-white/20 text-white">
                        {user ? 'Profile' : 'Register / Login'}
                      </Button>
                    </Link>
                  </div>
                </nav>
              </div>
            )}
          </>
        ) : (
          <div className="flex items-center">
            <nav className="hidden md:flex items-center mr-6 space-x-8">
              <Link to="/explore" className="text-sm font-medium text-white hover:text-primary transition-colors">
                Explore
              </Link>
              <Link to="/artists" className="text-sm font-medium text-white hover:text-primary transition-colors">
                Artists
              </Link>
              <Link to="/galleries" className="text-sm font-medium text-white hover:text-primary transition-colors">
                Galleries
              </Link>
              <Link to="/about" className="text-sm font-medium text-white hover:text-primary transition-colors">
                About
              </Link>
            </nav>
            
            <div className="flex items-center space-x-3">
              {user && (
                <>
                  <Link to="/cart">
                    <Button variant="ghost" size="icon" className="relative text-white">
                      <ShoppingCart className="h-5 w-5" />
                      <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0">0</Badge>
                    </Button>
                  </Link>
                  <Link to="/notifications">
                    <Button variant="ghost" size="icon" className="relative text-white">
                      <Bell className="h-5 w-5" />
                    </Button>
                  </Link>
                  <Link to="/messages">
                    <Button variant="ghost" size="icon" className="relative text-white">
                      <MessageSquare className="h-5 w-5" />
                    </Button>
                  </Link>
                </>
              )}
              <Link to={user ? "/profile" : "/login"}>
                <Button variant={isScrolled ? "ghost" : "outline"} size="icon" className={`text-white ${!isScrolled && "border-white hover:bg-white/20"}`}>
                  <User className="h-5 w-5" />
                </Button>
              </Link>
              {!user && (
                <Link to="/login">
                  <Button className="bg-transparent border border-white hover:bg-white/20 text-white ml-2">
                    Register / Login
                  </Button>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
