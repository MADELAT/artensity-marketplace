import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Grid, 
  List, 
  Plus,
  Edit2,
  Eye,
  BarChart2,
  Trash2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ArtworkGridCard } from './ArtworkGridCard';

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

interface ArtworkGridProps {
  artworks: Artwork[];
  onUploadArtwork: () => void;
  onEditArtwork: (id: string) => void;
  onViewArtwork: (id: string) => void;
  onViewStats: (id: string) => void;
  onDeleteArtwork: (id: string) => void;
}

export function ArtworkGrid({
  artworks,
  onUploadArtwork,
  onEditArtwork,
  onViewArtwork,
  onViewStats,
  onDeleteArtwork
}: ArtworkGridProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  if (artworks.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center p-6">
          <p className="text-muted-foreground mb-4">
            No tienes obras publicadas aún
          </p>
          <Button onClick={onUploadArtwork}>
            <Plus className="h-4 w-4 mr-2" />
            Subir Nueva Obra
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
            size="icon"
            onClick={() => setViewMode('grid')}
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'secondary' : 'ghost'}
            size="icon"
            onClick={() => setViewMode('list')}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className={cn(
        "grid gap-4",
        viewMode === 'grid' ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"
      )}>
        {artworks.map((artwork) => (
          <ArtworkGridCard
            key={artwork.id}
            artwork={artwork}
            viewMode={viewMode}
            onEdit={() => onEditArtwork(artwork.id)}
            onView={() => onViewArtwork(artwork.id)}
            onViewStats={() => onViewStats(artwork.id)}
            onDelete={() => onDeleteArtwork(artwork.id)}
          />
        ))}
      </div>
    </div>
  );
} 