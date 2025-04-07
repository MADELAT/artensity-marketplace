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
  imageUrl: string;
  price: number;
  status: 'available' | 'sold' | 'reserved';
  views: number;
  likes: number;
  createdAt: Date;
}

interface ArtworkGridCardProps {
  artwork: Artwork;
  viewMode: 'grid' | 'list';
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

  const getStatusColor = (status: Artwork['status']) => {
    switch (status) {
      case 'available':
        return 'bg-green-500';
      case 'sold':
        return 'bg-red-500';
      case 'reserved':
        return 'bg-yellow-500';
    }
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
                src={artwork.imageUrl}
                alt={artwork.title}
                className="w-full h-full object-cover rounded-lg"
              />
              <div className={cn(
                "absolute top-2 right-2 w-2 h-2 rounded-full",
                getStatusColor(artwork.status)
              )} />
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
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-0">
        <div className="relative aspect-square">
          <img
            src={artwork.imageUrl}
            alt={artwork.title}
            className="w-full h-full object-cover rounded-t-lg"
          />
          <div className={cn(
            "absolute top-2 right-2 w-2 h-2 rounded-full",
            getStatusColor(artwork.status)
          )} />
          <div className={cn(
            "absolute inset-0 bg-black/50 flex items-center justify-center gap-2 opacity-0 transition-opacity",
            isHovered && "opacity-100"
          )}>
            <Button
              variant="secondary"
              size="icon"
              onClick={onView}
            >
              <Eye className="h-4 w-4" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              onClick={onViewStats}
            >
              <BarChart2 className="h-4 w-4" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary" size="icon">
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
        <div className="p-4">
          <h3 className="font-medium truncate">{artwork.title}</h3>
          <p className="text-sm text-muted-foreground truncate">
            {artwork.description}
          </p>
          <div className="flex items-center justify-between mt-2">
            <span className="font-medium">
              {formatPrice(artwork.price)}
            </span>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>{artwork.views} vistas</span>
              <span>•</span>
              <span>{artwork.likes} me gusta</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 