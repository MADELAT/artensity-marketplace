
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ShoppingCart, Bell, MessageSquare, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { Badge } from "@/components/ui/badge";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();

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
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "py-2 bg-white/90 backdrop-blur-lg shadow-sm" : "py-4 bg-transparent"}`}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-serif font-bold text-art-black">
          Artendency
        </Link>

        {isMobile ? (
          <>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>

            {isOpen && (
              <div className="absolute top-full left-0 w-full bg-white/95 backdrop-blur-lg shadow-lg p-4 border-t border-art-gray-light animate-fade-in">
                <nav className="flex flex-col space-y-4">
                  <Link to="/explore" className="text-lg px-2 py-1 hover:text-primary transition-colors">
                    Explore
                  </Link>
                  <Link to="/artists" className="text-lg px-2 py-1 hover:text-primary transition-colors">
                    Artists
                  </Link>
                  <Link to="/galleries" className="text-lg px-2 py-1 hover:text-primary transition-colors">
                    Galleries
                  </Link>
                  <Link to="/about" className="text-lg px-2 py-1 hover:text-primary transition-colors">
                    About
                  </Link>
                  <div className="pt-2 border-t border-art-gray-light">
                    <Link to="/login">
                      <Button className="w-full">Sign in</Button>
                    </Link>
                  </div>
                </nav>
              </div>
            )}
          </>
        ) : (
          <div className="flex items-center">
            <nav className="hidden md:flex items-center mr-6 space-x-6">
              <Link to="/explore" className="text-sm font-medium hover:text-primary transition-colors">
                Explore
              </Link>
              <Link to="/artists" className="text-sm font-medium hover:text-primary transition-colors">
                Artists
              </Link>
              <Link to="/galleries" className="text-sm font-medium hover:text-primary transition-colors">
                Galleries
              </Link>
              <Link to="/about" className="text-sm font-medium hover:text-primary transition-colors">
                About
              </Link>
            </nav>
            
            <div className="flex items-center space-x-3">
              <Link to="/cart">
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0">0</Badge>
                </Button>
              </Link>
              <Link to="/notifications">
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/messages">
                <Button variant="ghost" size="icon" className="relative">
                  <MessageSquare className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
