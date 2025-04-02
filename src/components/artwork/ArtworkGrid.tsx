
import { ArtworkCard } from "./ArtworkCard";
import { ArtworkGridSkeleton } from "./ArtworkGridSkeleton";
import { ArtworkEmptyState } from "./ArtworkEmptyState";
import { useArtworks, ArtworkCardData } from "@/hooks/useArtworks";
import { Artwork } from "@/types/supabase";

// Interface for the component props
export interface ArtworkGridProps {
  category?: string;
  artistId?: string;
  style?: string;
  technique?: string;
  artworks?: Artwork[]; // Added artworks prop
}

export function ArtworkGrid({ category, artistId, style, technique, artworks: providedArtworks }: ArtworkGridProps) {
  const { 
    artworks, 
    loading, 
    favorites, 
    handleToggleFavorite 
  } = useArtworks({
    category,
    artistId,
    style,
    technique,
    providedArtworks
  });

  if (loading) {
    return <ArtworkGridSkeleton />;
  }

  if (artworks.length === 0) {
    return <ArtworkEmptyState />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {artworks.map((artwork) => (
        <ArtworkCard
          key={artwork.id}
          id={artwork.id}
          title={artwork.title}
          artist={artwork.artist}
          artistId={artwork.artistId}
          price={artwork.price}
          imageUrl={artwork.imageUrl}
          year={artwork.year || 0}
          medium={artwork.medium}
          isFavorite={favorites.includes(artwork.id)}
          onToggleFavorite={handleToggleFavorite}
        />
      ))}
    </div>
  );
}
