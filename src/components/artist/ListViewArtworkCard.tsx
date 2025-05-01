
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
import { ArtworkProps } from './ArtworkCardProps';

interface ListViewArtworkCardProps {
  artwork: ArtworkProps;
  onEdit: () => void;
  onView: () => void;
  onViewStats: () => void;
  onDelete: () => void;
}

export function ListViewArtworkCard({
  artwork,
  onEdit,
  onView,
  onViewStats,
  onDelete
}: ListViewArtworkCardProps) {
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
