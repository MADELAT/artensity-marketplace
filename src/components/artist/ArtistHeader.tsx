import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Bell, Search, LogOut } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { NotificationCenter } from './NotificationCenter';
import { useNotifications } from '@/hooks/useNotifications';
import { useNavigate } from 'react-router-dom';

const inspirationalQuotes = [
  "El arte es la expresión más pura de la libertad humana.",
  "Cada pincelada cuenta una historia única.",
  "La creatividad es la inteligencia divirtiéndose.",
  "El arte no es lo que ves, sino lo que haces ver a los demás.",
  "La belleza está en el ojo del espectador, pero la pasión está en el corazón del artista.",
];

export function ArtistHeader() {
  const { user, profile, isLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const { notifications, markAsRead, clearAll } = useNotifications(user?.id || '');
  const randomQuote = inspirationalQuotes[Math.floor(Math.random() * inspirationalQuotes.length)];

  if (isLoading) {
    return (
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-24 items-center">
          <div className="flex items-center gap-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-48" />
            </div>
          </div>
        </div>
      </header>
    );
  }

  const initials = profile?.first_name && profile?.last_name
    ? `${profile.first_name[0]}${profile.last_name[0]}`
    : user?.email?.[0].toUpperCase() || 'A';

  const handleNotificationClick = (notification: any) => {
    markAsRead(notification.id);
    if (notification.artworkId) {
      navigate(`/artwork/${notification.artworkId}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-24 items-center">
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={profile?.avatar_url || undefined} alt={profile?.first_name || 'Artista'} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-xl font-semibold">
              {profile?.first_name && profile?.last_name
                ? `${profile.first_name} ${profile.last_name}`
                : user?.email || 'Artista'}
            </h1>
            <p className="text-sm text-muted-foreground italic">
              {randomQuote}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <NotificationCenter
            notifications={notifications}
            onMarkAsRead={markAsRead}
            onClearAll={clearAll}
            onNotificationClick={handleNotificationClick}
          />
          
          <Button
            variant="ghost"
            size="icon"
            onClick={signOut}
            className="ml-2"
          >
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
} 