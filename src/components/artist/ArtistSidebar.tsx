import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  Palette, 
  BarChart2, 
  Settings,
  Menu,
  X
} from 'lucide-react';

interface ArtistSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const menuItems = [
  {
    name: 'Dashboard',
    path: 'dashboard',
    icon: LayoutDashboard
  },
  {
    name: 'Mis Obras',
    path: 'artworks',
    icon: Palette
  },
  {
    name: 'Estadísticas',
    path: 'statistics',
    icon: BarChart2
  },
  {
    name: 'Configuración',
    path: 'settings',
    icon: Settings
  }
];

export function ArtistSidebar({ activeSection, onSectionChange }: ArtistSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  // Colapsar automáticamente en mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsCollapsed(true);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={cn(
      "fixed left-0 top-0 h-screen bg-background border-r transition-all duration-300",
      isCollapsed ? "w-16" : "w-64"
    )}>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          {!isCollapsed && <h1 className="text-xl font-bold">Artensity</h1>}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="ml-auto"
          >
            {isCollapsed ? <Menu className="h-5 w-5" /> : <X className="h-5 w-5" />}
          </Button>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname.includes(item.path);
            
            return (
              <Link
                key={item.path}
                to={`/dashboard/artist/${item.path}`}
                onClick={() => onSectionChange(item.path)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                  isActive 
                    ? "bg-primary text-primary-foreground" 
                    : "hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <Icon className="h-5 w-5" />
                {!isCollapsed && <span>{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        {!isCollapsed && (
          <div className="p-4 border-t">
            <p className="text-xs text-muted-foreground">
              © 2024 Artensity. Todos los derechos reservados.
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 