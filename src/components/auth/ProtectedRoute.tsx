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
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          <p className="text-muted-foreground">Cargando su perfil...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // ✅ Permitir al usuario logueado navegar en páginas públicas
  const isPublicPath = ['/', '/explore', '/home', '/about', '/artists', '/galleries'].includes(location.pathname);
  if (profile && !allowedRoles.includes(profile.role) && !isPublicPath) {
    if (location.pathname.startsWith('/dashboard/')) {
      switch (profile.role) {
        case 'admin':
          return <Navigate to="/dashboard/admin" replace />;
        case 'artist':
          return <Navigate to="/dashboard/artist" replace />;
        case 'gallery':
          return <Navigate to="/dashboard/gallery" replace />;
        case 'buyer':
        default:
          return <Navigate to="/home" replace />;
      }
    }

    return <Navigate to="/explore" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;