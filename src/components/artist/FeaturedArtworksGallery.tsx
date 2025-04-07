import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Eye, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Artwork as SupabaseArtwork } from '@/types/supabase';

interface Artwork extends SupabaseArtwork {
  likes: number;
  views: number;
}

interface FeaturedArtworksGalleryProps {
  artworks: Artwork[];
  onUploadArtwork?: () => void;
  onViewArtwork?: (id: string) => void;
}

export function FeaturedArtworksGallery({
  artworks,
  onUploadArtwork,
  onViewArtwork
}: FeaturedArtworksGalleryProps) {
  const [hoveredArtwork, setHoveredArtwork] = useState<string | null>(null);

  if (artworks.length === 0) {
    return (
      <div className="bg-card rounded-lg p-6 text-center">
        <p className="text-muted-foreground mb-4">No hay obras destacadas aún</p>
        <Button onClick={onUploadArtwork}>
          <Plus className="w-4 h-4 mr-2" />
          Subir primera obra
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {artworks.map((artwork) => (
        <div
          key={artwork.id}
          className="relative group rounded-lg overflow-hidden bg-card"
          onMouseEnter={() => setHoveredArtwork(artwork.id)}
          onMouseLeave={() => setHoveredArtwork(null)}
        >
          <img
            src={artwork.image_url}
            alt={artwork.title}
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
          <div className="absolute inset-0 p-4 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <div>
              <h3 className="text-lg font-semibold text-white">{artwork.title}</h3>
              <p className="text-sm text-white/80">{artwork.description}</p>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center text-white">
                  <Eye className="w-4 h-4 mr-1" />
                  <span className="text-sm">{artwork.views}</span>
                </div>
                <div className="flex items-center text-white">
                  <Heart className="w-4 h-4 mr-1" />
                  <span className="text-sm">{artwork.likes}</span>
                </div>
              </div>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => onViewArtwork?.(artwork.id)}
              >
                Ver detalles
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 