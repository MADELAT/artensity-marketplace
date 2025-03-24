
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Separator } from "@/components/ui/separator";
import { Heart, Share2, ShoppingCart, ArrowLeft, User, Building } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ArtworkGrid } from "@/components/artwork/ArtworkGrid";

// Mock artwork interface
interface Artwork {
  id: string;
  title: string;
  artist: string;
  artistId: string;
  gallery?: string;
  galleryId?: string;
  price: number;
  imageUrl: string;
  year: number;
  medium: string;
  dimensions: string;
  description: string;
  category: string;
  style: string;
  technique: string;
}

export default function ArtworkDetail() {
  const { id } = useParams<{ id: string }>();
  const [artwork, setArtwork] = useState<Artwork | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const { toast } = useToast();

  // Fetch artwork details (mock data for now)
  useEffect(() => {
    const fetchArtwork = async () => {
      setLoading(true);
      
      try {
        // Mock API call with a timeout
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data for the requested artwork
        const mockArtwork: Artwork = {
          id: id || "artwork-1",
          title: "Harmony in Blue",
          artist: "Emma Roberts",
          artistId: "artist-1",
          gallery: "Modern Vision Gallery",
          galleryId: "gallery-1",
          price: 4800,
          imageUrl: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=1200&q=80",
          year: 2023,
          medium: "Oil on canvas",
          dimensions: "100 × 80 cm",
          description: "This piece explores the relationship between color, form, and emotion. Inspired by the natural world and urban landscapes, the artwork invites viewers to contemplate the harmony that can exist between seemingly opposing forces. The layered textures and bold brushstrokes create a dynamic surface that changes with different lighting conditions.",
          category: "Painting",
          style: "Abstract",
          technique: "Oil"
        };
        
        setArtwork(mockArtwork);
        
        // Check if this artwork is in favorites
        const savedFavorites = localStorage.getItem("favorites");
        if (savedFavorites) {
          const favorites = JSON.parse(savedFavorites);
          setIsFavorite(favorites.includes(id));
        }
      } catch (error) {
        console.error("Error fetching artwork:", error);
        toast({
          title: "Error",
          description: "Failed to load artwork details. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchArtwork();
  }, [id, toast]);
  
  const handleToggleFavorite = () => {
    setIsFavorite(prev => !prev);
    
    const savedFavorites = localStorage.getItem("favorites");
    let favorites = savedFavorites ? JSON.parse(savedFavorites) : [];
    
    if (isFavorite) {
      favorites = favorites.filter((favId: string) => favId !== id);
      toast({
        title: "Removed from favorites",
        description: "Artwork removed from your favorites",
      });
    } else {
      favorites.push(id);
      toast({
        title: "Added to favorites",
        description: "Artwork added to your favorites",
      });
    }
    
    localStorage.setItem("favorites", JSON.stringify(favorites));
  };
  
  const handleAddToCart = () => {
    // Get current cart or initialize empty array
    const savedCart = localStorage.getItem("cart");
    const cart = savedCart ? JSON.parse(savedCart) : [];
    
    // Check if already in cart
    const isInCart = cart.some((item: any) => item.id === id);
    
    if (!isInCart && artwork) {
      // Add to cart
      cart.push({
        id: artwork.id,
        title: artwork.title,
        artist: artwork.artist,
        price: artwork.price,
        imageUrl: artwork.imageUrl,
        quantity: 1
      });
      
      // Save to localStorage
      localStorage.setItem("cart", JSON.stringify(cart));
      
      toast({
        title: "Added to cart",
        description: `${artwork.title} has been added to your cart`,
      });
    } else {
      toast({
        title: "Already in cart",
        description: "This artwork is already in your cart",
      });
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto py-10 px-4">
          <div className="animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-200 rounded-lg aspect-[3/4]"></div>
              <div>
                <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-6"></div>
                <div className="h-6 bg-gray-200 rounded w-1/4 mb-6"></div>
                <div className="h-10 bg-gray-200 rounded w-full mb-4"></div>
                <div className="h-10 bg-gray-200 rounded w-full"></div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!artwork) {
    return (
      <Layout>
        <div className="container mx-auto py-20 px-4 text-center">
          <h1 className="text-2xl font-medium mb-4">Artwork not found</h1>
          <p className="text-muted-foreground mb-6">
            The artwork you're looking for doesn't exist or has been removed.
          </p>
          <Button asChild>
            <Link to="/explore">Back to Explore</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto py-10 px-4">
        <Button variant="ghost" className="mb-6 -ml-2" asChild>
          <Link to="/explore" className="flex items-center text-muted-foreground">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Explore
          </Link>
        </Button>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="md:sticky md:top-24 self-start">
            <AspectRatio ratio={3/4} className="bg-white rounded-lg overflow-hidden shadow-sm">
              <img
                src={artwork.imageUrl}
                alt={artwork.title}
                className="w-full h-full object-cover"
              />
            </AspectRatio>
          </div>
          
          <div>
            <h1 className="text-3xl font-serif font-bold mb-2">{artwork.title}</h1>
            
            <div className="flex items-center space-x-4 mb-6">
              <Link 
                to={`/artist/${artwork.artistId}`}
                className="flex items-center text-primary hover:underline"
              >
                <User className="mr-1 h-4 w-4" />
                {artwork.artist}
              </Link>
              
              {artwork.gallery && (
                <Link 
                  to={`/gallery/${artwork.galleryId}`}
                  className="flex items-center text-muted-foreground hover:text-primary"
                >
                  <Building className="mr-1 h-4 w-4" />
                  {artwork.gallery}
                </Link>
              )}
            </div>
            
            <p className="text-muted-foreground mb-6">
              {artwork.description}
            </p>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <h3 className="text-sm font-medium">Year</h3>
                <p className="text-muted-foreground">{artwork.year}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium">Medium</h3>
                <p className="text-muted-foreground">{artwork.medium}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium">Dimensions</h3>
                <p className="text-muted-foreground">{artwork.dimensions}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium">Category</h3>
                <p className="text-muted-foreground">{artwork.category}</p>
              </div>
            </div>
            
            <div className="mb-6">
              <h2 className="text-2xl font-serif font-bold">${artwork.price.toLocaleString()}</h2>
            </div>
            
            <div className="flex flex-col space-y-3">
              <Button onClick={handleAddToCart} className="w-full">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
              
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" onClick={handleToggleFavorite}>
                  <Heart className={`mr-2 h-4 w-4 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
                  {isFavorite ? "Saved" : "Save"}
                </Button>
                
                <Button variant="outline" onClick={() => {
                  navigator.share({
                    title: artwork.title,
                    text: `Check out ${artwork.title} by ${artwork.artist} on Artendency`,
                    url: window.location.href
                  }).catch(() => 
                    toast({
                      title: "Share not supported",
                      description: "Web Share API is not supported in your browser"
                    })
                  );
                }}>
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </div>
            </div>
            
            <Separator className="my-8" />
            
            <div>
              <h3 className="text-lg font-medium mb-2">Shipping & Returns</h3>
              <p className="text-sm text-muted-foreground mb-4">
                This artwork includes professional packaging, insurance, and tracked shipping. Returns accepted within 14 days of delivery.
              </p>
              
              <h3 className="text-lg font-medium mb-2">Authenticity</h3>
              <p className="text-sm text-muted-foreground">
                This artwork comes with a certificate of authenticity signed by the artist.
              </p>
            </div>
          </div>
        </div>
        
        <Separator className="my-16" />
        
        <div>
          <h2 className="text-2xl font-serif font-bold mb-8">More by {artwork.artist}</h2>
          <ArtworkGrid artistId={artwork.artistId} />
        </div>
      </div>
    </Layout>
  );
}
