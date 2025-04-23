import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface GalleryArtistCardProps {
  id: string;
  name: string;
  avatar_url?: string;
  country?: string;
  style?: string; // CSV: "Pintor,Escultor"
  artworksCount?: number;
  salesCount?: number;
  is_featured?: boolean;
  onToggleFeatured?: (id: string, newState: boolean) => void;
}

export default function GalleryArtistCard({
  id,
  name,
  avatar_url,
  country,
  style,
  artworksCount,
  salesCount,
  is_featured,
  onToggleFeatured,
}: GalleryArtistCardProps) {
  const styles = style?.split(",").map((s) => s.trim()) || [];

  return (
    <Card className="h-full transition-shadow hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={avatar_url || undefined} alt={name} />
            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-lg">{name}</CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              {country}
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0 text-sm text-muted-foreground">
        {styles.length > 0 && (
          <div className="mb-2 flex flex-wrap gap-2">
            {styles.map((s, idx) => (
              <span key={idx} className="text-xs bg-gray-100 px-2 py-1 rounded">
                {s}
              </span>
            ))}
          </div>
        )}
        <div className="flex justify-between">
          <span>
            <strong>{artworksCount ?? 0}</strong> artworks
          </span>
          <span>
            <strong>{salesCount ?? 0}</strong> sold
          </span>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col gap-2 items-start">
        {onToggleFeatured && (
          <Button
            variant="ghost"
            className={
              is_featured ? "border border-gray-400 text-gray-800" : ""
            }
            size="sm"
            onClick={() => onToggleFeatured(id, !is_featured)}
          >
            {is_featured ? "★ Featured" : "☆ Set as Featured"}
          </Button>
        )}
        <div className="flex gap-2 w-full justify-between">
          <Button variant="outline" size="sm">
            Manage artworks
          </Button>
          <Button variant="secondary" size="sm">
            View profile
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
