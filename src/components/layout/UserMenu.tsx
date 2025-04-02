
import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, LogOut, Home, Settings, PieChart } from 'lucide-react';

export function UserMenu() {
  const { user, profile, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Format user name initials
  const getUserInitials = () => {
    if (profile?.first_name && profile?.last_name) {
      return `${profile.first_name[0]}${profile.last_name[0]}`.toUpperCase();
    }
    return user ? user.email[0].toUpperCase() : '?';
  };

  // Get dashboard link based on user role
  const getDashboardLink = () => {
    if (!profile) return '/';
    
    switch (profile.role) {
      case 'admin':
        return '/admin';
      case 'artist':
        return '/artist-dashboard';
      case 'gallery':
        return '/gallery-dashboard';
      case 'buyer':
      default:
        return '/buyer-dashboard';
    }
  };

  // Get display name
  const getDisplayName = () => {
    if (profile?.first_name && profile?.last_name) {
      return `${profile.first_name} ${profile.last_name}`;
    }
    return user?.email || 'Usuario';
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      setIsOpen(false);
      await signOut();
      navigate('/');
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  // If not logged in, return null
  if (!user) return null;
  
  return (
    <div className="relative" ref={menuRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center focus:outline-none"
        aria-label="Open user menu"
      >
        <Avatar className="h-9 w-9 cursor-pointer border border-white/20">
          {profile?.avatar_url ? (
            <AvatarImage src={profile.avatar_url} alt={getDisplayName()} />
          ) : (
            <AvatarFallback className="bg-primary text-primary-foreground">
              {getUserInitials()}
            </AvatarFallback>
          )}
        </Avatar>
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl border border-white/20 overflow-hidden z-50">
          <div className="py-2 px-4 border-b border-gray-100 dark:border-gray-800">
            <p className="text-sm font-medium">{getDisplayName()}</p>
            <p className="text-xs text-muted-foreground truncate">{user.email}</p>
          </div>
          <div className="py-1">
            <Link
              to={getDashboardLink()}
              className="px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-2"
              onClick={() => setIsOpen(false)}
            >
              <Home className="h-4 w-4" />
              Dashboard
            </Link>
            <Link
              to="/profile"
              className="px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-2"
              onClick={() => setIsOpen(false)}
            >
              <User className="h-4 w-4" />
              Mi perfil
            </Link>
            {profile?.role === 'admin' && (
              <Link
                to="/admin"
                className="px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-2"
                onClick={() => setIsOpen(false)}
              >
                <PieChart className="h-4 w-4" />
                Admin Panel
              </Link>
            )}
            <Link
              to="/settings"
              className="px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-2"
              onClick={() => setIsOpen(false)}
            >
              <Settings className="h-4 w-4" />
              Ajustes
            </Link>
          </div>
          <div className="border-t border-gray-100 dark:border-gray-800">
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm text-red-500 hover:bg-gray-100 dark:hover:bg-gray-800 w-full text-left flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              Cerrar sesión
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
