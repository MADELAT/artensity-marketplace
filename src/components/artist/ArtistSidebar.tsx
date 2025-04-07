import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { 
  Home,
  Palette,
  BarChart2,
  Settings,
  MessageSquare,
  LogOut
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ArtistSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export function ArtistSidebar({ activeSection, onSectionChange }: ArtistSidebarProps) {
  const navigate = useNavigate();
  const { signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  const sections = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'artworks', label: 'Mis Obras', icon: Palette },
    { id: 'inquiries', label: 'Consultas', icon: MessageSquare },
    { id: 'statistics', label: 'Estadísticas', icon: BarChart2 },
    { id: 'settings', label: 'Configuración', icon: Settings }
  ];

  return (
    <aside className="fixed inset-y-0 left-0 z-50 w-16 md:w-64 bg-background border-r">
      <div className="flex h-full flex-col">
        <div className="flex h-16 items-center justify-center border-b">
          <span className="text-xl font-bold">Artensity</span>
        </div>
        <nav className="flex-1 space-y-1 p-2">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <Button
                key={section.id}
                variant={activeSection === section.id ? 'secondary' : 'ghost'}
                className={cn(
                  'w-full justify-start gap-2',
                  activeSection === section.id && 'bg-primary/10'
                )}
                onClick={() => onSectionChange(section.id)}
              >
                <Icon className="h-4 w-4" />
                <span className="hidden md:inline">{section.label}</span>
              </Button>
            );
          })}
        </nav>
        <div className="border-t p-2">
          <Button
            variant="ghost"
            className="w-full justify-start gap-2 text-destructive hover:text-destructive"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden md:inline">Cerrar Sesión</span>
          </Button>
        </div>
      </div>
    </aside>
  );
} 