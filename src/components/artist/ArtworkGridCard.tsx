
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Edit2,
  Eye,
  BarChart2,
  Trash2,
  MoreVertical
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Artwork {
  id: string;
  title: string;
  description: string;
  image_url: string;
  price: number;
  status: 'active' | 'pending' | 'sold';
  views: number;
  likes: number;
  created_at: string;
}

// Create a string literal type to ensure only these values are accepted
type ViewMode = 'grid' | 'list';

interface ArtworkGridCardProps {
  artwork: Artwork;
  viewMode: ViewMode;
  onEdit: () => void;
  onView: () => void;
  onViewStats: () => void;
  onDelete: () => void;
}

export function ArtworkGridCard({
  artwork,
  viewMode,
  onEdit,
  onView,
  onViewStats,
  onDelete
}: ArtworkGridCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const statusColors = {
    active: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    sold: 'bg-blue-100 text-blue-800'
  };

  const statusText = {
    active: 'Activa',
    pending: 'Pendiente',
    sold: 'Vendida'
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);
  };

  if (viewMode === 'list') {
    return (
      <Card className="group">
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="relative w-24 h-24 flex-shrink-0">
              <img
                src={artwork.image_url}
                alt={artwork.title}
                className="w-full h-full object-cover rounded-lg"
              />
              <div className={cn(
                "absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium",
                statusColors[artwork.status]
              )}>
                {statusText[artwork.status]}
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium truncate">{artwork.title}</h3>
              <p className="text-sm text-muted-foreground truncate">
                {artwork.description}
              </p>
              <div className="flex items-center gap-4 mt-2">
                <span className="text-sm font-medium">
                  {formatPrice(artwork.price)}
                </span>
                <span className="text-sm text-muted-foreground">
                  {artwork.views} vistas
                </span>
                <span className="text-sm text-muted-foreground">
                  {artwork.likes} me gusta
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={onView}
              >
                <Eye className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={onViewStats}
              >
                <BarChart2 className="h-4 w-4" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={onEdit}>
                    <Edit2 className="h-4 w-4 mr-2" />
                    Editar
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-destructive"
                    onClick={onDelete}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Eliminar
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      className={cn(
        "group",
        viewMode === 'grid' ? "aspect-square" : "w-48"
      )}
    >
      <div className={cn(
        "relative",
        viewMode === 'grid' ? "aspect-square" : "w-48"
      )}>
        <img
          src={artwork.image_url || '/placeholder.svg'}
          alt={artwork.title}
          className="w-full h-full object-cover"
        />
        <div className={cn(
          "absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium",
          statusColors[artwork.status]
        )}>
          {statusText[artwork.status]}
        </div>
      </div>

      <CardContent className={cn(
        "p-4",
        viewMode === 'list' && "flex-1"
      )}>
        <div className="space-y-2">
          <h3 className="font-medium truncate">{artwork.title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {artwork.description}
          </p>
          <p className="font-medium">${artwork.price}</p>
          <div className="text-sm text-muted-foreground">
            {new Date(artwork.created_at).toLocaleDateString()}
          </div>
        </div>

        <div className={cn(
          "flex gap-2 mt-4",
          viewMode === 'list' && "justify-end"
        )}>
          <Button variant="outline" size="icon" onClick={onEdit}>
            <Edit2 className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={onView}>
            <Eye className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={onViewStats}>
            <BarChart2 className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={onDelete}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
