
import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles: string[];
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { user, profile, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    // Display loading state
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          <p className="text-muted-foreground">Cargando su perfil...</p>
        </div>
      </div>
    );
  }

  // If not logged in, redirect to login with return path
  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // If user doesn't have the required role, redirect to appropriate dashboard or home
  if (profile && !allowedRoles.includes(profile.role)) {
    // Redirect based on user role if they're accessing the wrong dashboard
    if (location.pathname.startsWith('/dashboard/')) {
      switch (profile.role) {
        case 'admin':
          return <Navigate to="/dashboard/admin" replace />;
        case 'artist':
          return <Navigate to="/dashboard/artist" replace />;
        case 'gallery':
          return <Navigate to="/dashboard/gallery" replace />;
        case 'buyer':
          return <Navigate to="/home" replace />;
        default:
          return <Navigate to="/home" replace />;
      }
    }
    
    // For other protected pages, just go to /explore
    return <Navigate to="/explore" replace />;
  }

  // If the user is logged in and has the right role, show the protected content
  return <>{children}</>;
};

export default ProtectedRoute;
