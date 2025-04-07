import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { 
  Edit2,
  BarChart2,
  Trash2,
  Eye,
  Clock,
  CheckCircle2
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

interface ArtworkGridCardProps {
  artwork: {
    id: string;
    title: string;
    image_url: string;
    status: 'active' | 'pending';
    created_at: string;
    views: number;
  };
  onEdit?: (id: string) => void;
  onViewStats?: (id: string) => void;
  onDelete?: (id: string) => void;
  onView?: (id: string) => void;
}

export function ArtworkGridCard({
  artwork,
  onEdit,
  onViewStats,
  onDelete,
  onView
}: ArtworkGridCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDelete = () => {
    if (showDeleteConfirm && onDelete) {
      onDelete(artwork.id);
    } else {
      setShowDeleteConfirm(true);
      setTimeout(() => setShowDeleteConfirm(false), 3000);
    }
  };

  return (
    <div 
      className="group relative aspect-square rounded-lg overflow-hidden border bg-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Imagen de la obra */}
      <img
        src={artwork.image_url}
        alt={artwork.title}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />

      {/* Overlay de hover */}
      <div 
        className={cn(
          "absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent",
          "opacity-0 transition-opacity duration-300",
          isHovered ? "opacity-100" : "opacity-0"
        )}
      />

      {/* Contenido */}
      <div className="absolute inset-0 p-4 flex flex-col justify-between">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-2">
            {artwork.status === 'active' ? (
              <CheckCircle2 className="h-4 w-4 text-green-500" />
            ) : (
              <Clock className="h-4 w-4 text-amber-500" />
            )}
            <span className="text-xs font-medium text-white/90">
              {artwork.status === 'active' ? 'Activa' : 'Pendiente'}
            </span>
          </div>
          <div className="flex items-center space-x-1 text-white/90">
            <Eye className="h-3 w-3" />
            <span className="text-xs">{artwork.views}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="space-y-2">
          <h3 className="text-white font-medium line-clamp-1">
            {artwork.title}
          </h3>
          <p className="text-xs text-white/70">
            Subida {formatDistanceToNow(new Date(artwork.created_at), { locale: es, addSuffix: true })}
          </p>
        </div>

        {/* Acciones */}
        <div 
          className={cn(
            "absolute inset-0 flex items-center justify-center space-x-2",
            "opacity-0 transition-opacity duration-300",
            isHovered ? "opacity-100" : "opacity-0"
          )}
        >
          <Button
            variant="secondary"
            size="sm"
            className="bg-white/90 hover:bg-white"
            onClick={() => onView?.(artwork.id)}
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            variant="secondary"
            size="sm"
            className="bg-white/90 hover:bg-white"
            onClick={() => onEdit?.(artwork.id)}
          >
            <Edit2 className="h-4 w-4" />
          </Button>
          <Button
            variant="secondary"
            size="sm"
            className="bg-white/90 hover:bg-white"
            onClick={() => onViewStats?.(artwork.id)}
          >
            <BarChart2 className="h-4 w-4" />
          </Button>
          <Button
            variant="destructive"
            size="sm"
            className={cn(
              "bg-red-500/90 hover:bg-red-500",
              showDeleteConfirm && "bg-red-600"
            )}
            onClick={handleDelete}
          >
            <Trash2 className="h-4 w-4" />
            {showDeleteConfirm && (
              <span className="ml-1 text-xs">¿Seguro?</span>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
} 