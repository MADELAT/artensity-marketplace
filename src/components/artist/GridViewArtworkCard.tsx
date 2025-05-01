
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Edit2,
  Eye,
  BarChart2,
  Trash2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ArtworkProps } from './ArtworkCardProps';

interface GridViewArtworkCardProps {
  artwork: ArtworkProps;
  onEdit: () => void;
  onView: () => void;
  onViewStats: () => void;
  onDelete: () => void;
}

export function GridViewArtworkCard({
  artwork,
  onEdit,
  onView,
  onViewStats,
  onDelete
}: GridViewArtworkCardProps) {
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

  return (
    <Card className="group aspect-square">
      <div className="relative aspect-square">
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

      <CardContent className="p-4">
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

        <div className="flex gap-2 mt-4">
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
