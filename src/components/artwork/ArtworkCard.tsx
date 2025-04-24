import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { cn } from "@/lib/utils";

interface ArtworkCardProps {
  id: string;
  title: string;
  artist: string;
  artistId: string;
  price: number;
  imageUrl: string;
  year: number;
  medium: string;
  category: string;
  series: string;
  technique: string;
  className?: string;
  isFavorite?: boolean;
  onToggleFavorite?: (id: string) => void;
}

export function ArtworkCard({
  id,
  title,
  artist,
  artistId,
  price,
  imageUrl,
  year,
  medium,
  category,
  series,
  technique,
  className,
  isFavorite = false,
  onToggleFavorite,
}: ArtworkCardProps) {
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onToggleFavorite) {
      onToggleFavorite(id);
    }
  };

  return (
    <div className={cn("group relative", className)}>
      <Link to={`/artwork/${id}`}>
        <div className="overflow-hidden rounded-lg bg-white shadow-sm transition-all duration-300 group-hover:shadow-md">
          <div className="relative">
            <AspectRatio ratio={3 / 4} className="overflow-hidden">
              <img
                src={imageUrl}
                alt={title}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </AspectRatio>

            {onToggleFavorite && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm hover:bg-white"
                onClick={handleFavoriteClick}
              >
                <Heart
                  className={cn(
                    "h-5 w-5",
                    isFavorite ? "fill-red-500 text-red-500" : "text-gray-500"
                  )}
                />
              </Button>
            )}
          </div>

          <div className="p-4">
            <h3 className="text-base font-medium line-clamp-1">{title}</h3>
            <Link
              to={`/artist/${artistId}`}
              className="text-sm text-muted-foreground hover:text-primary"
            >
              {artist}
            </Link>
            <div className="mt-1 text-xs text-muted-foreground">
              {year} • {medium}
            </div>
            <div className="text-xs text-muted-foreground italic">
              {category} • {series} • {technique}
            </div>
            <div className="mt-2 font-medium">${price.toLocaleString()}</div>
          </div>
        </div>
      </Link>
    </div>
  );
}
