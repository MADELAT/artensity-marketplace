import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Palette } from 'lucide-react';
import { ArtworkGridCard } from './ArtworkGridCard';
import { cn } from '@/lib/utils';
import { Artwork as SupabaseArtwork } from '@/types/supabase';

interface Artwork extends SupabaseArtwork {
  status: 'active' | 'pending';
  views: number;
}

interface ArtworkGridProps {
  artworks: Artwork[];
  onUploadArtwork?: () => void;
  onEditArtwork?: (id: string) => void;
  onViewArtwork?: (id: string) => void;
  onViewStats?: (id: string) => void;
  onDeleteArtwork?: (id: string) => void;
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
      <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
        <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-6">
          <Palette className="h-12 w-12 text-primary" />
        </div>
        <h3 className="text-xl font-medium mb-2">Tu galería está vacía</h3>
        <p className="text-muted-foreground mb-6 max-w-md">
          Comparte tu arte con el mundo. Sube tu primera obra y comienza tu viaje artístico.
        </p>
        {onUploadArtwork && (
          <Button onClick={onUploadArtwork}>
            <Plus className="h-4 w-4 mr-2" />
            Subir mi primera obra
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Controles */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('grid')}
          >
            Grid
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('list')}
          >
            Lista
          </Button>
        </div>
        {onUploadArtwork && (
          <Button onClick={onUploadArtwork}>
            <Plus className="h-4 w-4 mr-2" />
            Subir nueva obra
          </Button>
        )}
      </div>

      {/* Grid de obras */}
      <div className={cn(
        "grid gap-4",
        viewMode === 'grid' 
          ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          : "grid-cols-1"
      )}>
        {artworks.map(artwork => (
          <ArtworkGridCard
            key={artwork.id}
            artwork={artwork}
            onEdit={onEditArtwork}
            onView={onViewArtwork}
            onViewStats={onViewStats}
            onDelete={onDeleteArtwork}
          />
        ))}
      </div>
    </div>
  );
} 