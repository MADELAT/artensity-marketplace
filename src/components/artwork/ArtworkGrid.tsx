
import { useState, useEffect } from "react";
import { ArtworkCard } from "./ArtworkCard";
import { useToast } from "@/hooks/use-toast";
import { Artwork } from "@/types/supabase";

// Interface for the component props
export interface ArtworkGridProps {
  category?: string;
  artistId?: string;
  style?: string;
  technique?: string;
  artworks?: Artwork[]; // Added artworks prop
}

// Create a temporary mock artwork interface that matches what ArtworkCard expects
interface ArtworkCardData {
  id: string;
  title: string;
  artist: string;
  artistId: string;
  price: number;
  imageUrl: string;
  year: number | null;
  medium: string;
  isFavorite?: boolean;
}

export function ArtworkGrid({ category, artistId, style, technique, artworks: providedArtworks }: ArtworkGridProps) {
  const [artworks, setArtworks] = useState<ArtworkCardData[]>([]);
  const [loading, setLoading] = useState(!providedArtworks);
  const [favorites, setFavorites] = useState<string[]>([]);
  const { toast } = useToast();

  // Use provided artworks or fetch them
  useEffect(() => {
    if (providedArtworks) {
      // Map Supabase Artwork type to ArtworkCardData type
      const mappedArtworks: ArtworkCardData[] = providedArtworks.map(artwork => ({
        id: artwork.id,
        title: artwork.title,
        artist: artwork.artist_id, // Note: This is just an ID, we would normally fetch artist name
        artistId: artwork.artist_id,
        price: artwork.price,
        imageUrl: artwork.image_url || '',
        year: artwork.year,
        medium: artwork.technique || 'Unknown',
      }));
      setArtworks(mappedArtworks);
      setLoading(false);
      return;
    }

    const fetchArtworks = async () => {
      setLoading(true);
      
      try {
        // Mock API call with a timeout to simulate fetching
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Generate mock data
        const mockArtworks: ArtworkCardData[] = Array.from({ length: 12 }).map((_, index) => ({
          id: `artwork-${index + 1}`,
          title: [
            "Harmony in Blue", 
            "Urban Reflections", 
            "Silent Echo", 
            "Abstract Thought",
            "Coastal Dreams",
            "Fractured Reality",
            "Ephemeral Moment",
            "Whispers of Color",
            "Radiant Shadows",
            "Inner Landscape",
            "Forgotten Memory",
            "Chromatic Vision"
          ][index] || `Artwork ${index + 1}`,
          artist: [
            "Emma Roberts",
            "Michael Chen",
            "Sofia Garcia",
            "James Wilson",
            "Aisha Johnson",
            "David Park",
            "Lucia Mendez",
            "Thomas Wright"
          ][index % 8],
          artistId: `artist-${index % 8 + 1}`,
          price: Math.floor(Math.random() * 9000) + 1000,
          imageUrl: `https://images.unsplash.com/photo-${[
            "1579783900882-c0d3dad7b119",
            "1579541471570-9e79861f3573",
            "1518796745738-9aad3fd3e9a6",
            "1501472312651-d5d40d26c419",
            "1554050857-c84121d72c98",
            "1549289809-a4d0ac2f1e2f",
            "1561214115-f2f134cc4912",
            "1482160549825-59d1b23cb208",
            "1460661377888-c89a6f7a09a8",
            "1461344577544-4e5dc9487184",
            "1547891654-e66ed7ebb968",
            "1512551980221-a768947bc085"
          ][index] || "1579783900882-c0d3dad7b119"}?auto=format&fit=crop&w=800&q=80`,
          year: Math.floor(Math.random() * 5) + 2019,
          medium: [
            "Oil on canvas",
            "Acrylic on panel",
            "Mixed media",
            "Digital print",
            "Watercolor",
            "Sculpture",
            "Photography",
            "Installation"
          ][index % 8],
        }));
        
        // Filter by props if provided
        let filteredArtworks = mockArtworks;
        
        if (category && category.length > 0) {
          filteredArtworks = filteredArtworks.filter(artwork => {
            const artworkCategory = [
              "Painting", "Sculpture", "Photography", "Digital", "Mixed Media"
            ][parseInt(artwork.id.split('-')[1]) % 5];
            return artworkCategory === category;
          });
        }
        
        if (artistId && artistId.length > 0) {
          filteredArtworks = filteredArtworks.filter(artwork => artwork.artistId === artistId);
        }
        
        if (style && style.length > 0) {
          filteredArtworks = filteredArtworks.filter(artwork => {
            const artworkStyle = [
              "Abstract", "Contemporary", "Minimalist", "Figurative", "Expressionist"
            ][parseInt(artwork.id.split('-')[1]) % 5];
            return artworkStyle === style;
          });
        }
        
        if (technique && technique.length > 0) {
          filteredArtworks = filteredArtworks.filter(artwork => {
            const artworkTechnique = [
              "Oil", "Acrylic", "Watercolor", "Digital", "Mixed Media"
            ][parseInt(artwork.id.split('-')[1]) % 5];
            return artworkTechnique === technique;
          });
        }
        
        setArtworks(filteredArtworks);
      } catch (error) {
        console.error("Error fetching artworks:", error);
        toast({
          title: "Error",
          description: "Failed to load artworks. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchArtworks();
  }, [category, artistId, style, technique, toast, providedArtworks]);
  
  // Load saved favorites from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem("favorites");
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);
  
  // Toggle favorite status
  const handleToggleFavorite = (id: string) => {
    setFavorites(prev => {
      const newFavorites = prev.includes(id)
        ? prev.filter(favId => favId !== id)
        : [...prev, id];
      
      // Save to localStorage
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
      
      // Show toast
      toast({
        title: prev.includes(id) ? "Removed from favorites" : "Added to favorites",
        description: prev.includes(id) 
          ? "Artwork removed from your favorites" 
          : "Artwork added to your favorites",
      });
      
      return newFavorites;
    });
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="bg-gray-200 rounded-lg aspect-[3/4]"></div>
            <div className="mt-2 bg-gray-200 h-4 rounded w-3/4"></div>
            <div className="mt-1 bg-gray-200 h-3 rounded w-1/2"></div>
            <div className="mt-2 bg-gray-200 h-4 rounded w-1/4"></div>
          </div>
        ))}
      </div>
    );
  }

  if (artworks.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium">No artworks found</h3>
        <p className="text-muted-foreground mt-2">Try changing your filters or check back later.</p>
      </div>
    );
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
