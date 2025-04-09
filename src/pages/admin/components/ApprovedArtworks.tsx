import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Artwork {
  id: string;
  title: string;
  image_url: string;
  artist_id: string;
  status: string;
  price: number;
  category: string;
  created_at: string;
}

interface ArtistGroup {
  artist_id: string;
  artist_name: string;
  artworks: Artwork[];
}

export default function ApprovedArtworks() {
  const { toast } = useToast();
  const [groupedArtworks, setGroupedArtworks] = useState<ArtistGroup[]>([]);
  const [activeArtistId, setActiveArtistId] = useState<string | null>(null);

  useEffect(() => {
    fetchApprovedArtworks();
  }, []);

  const fetchApprovedArtworks = async () => {
    const { data, error } = await supabase
      .from("artworks")
      .select("*, profiles:artist_id(first_name, last_name)")
      .eq("status", "approved");

    if (error) {
      console.error("Error fetching artworks:", error);
      toast({
        title: "Error",
        description: "No se pudieron cargar las obras aprobadas",
        variant: "destructive",
      });
      return;
    }

    const grouped: { [key: string]: ArtistGroup } = {};

    data.forEach((artwork: any) => {
      const artistId = artwork.artist_id;
      const artistName = `${artwork.profiles?.first_name || "Artista"} ${artwork.profiles?.last_name || ""}`;
      if (!grouped[artistId]) {
        grouped[artistId] = {
          artist_id: artistId,
          artist_name: artistName,
          artworks: [],
        };
      }
      grouped[artistId].artworks.push(artwork);
    });

    setGroupedArtworks(Object.values(grouped));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Obras Aprobadas</h2>
        <Button onClick={fetchApprovedArtworks} variant="outline">Actualizar</Button>
      </div>

      <Tabs value={activeArtistId ?? undefined} onValueChange={setActiveArtistId}>
        <TabsList className="overflow-x-auto flex gap-2">
          {groupedArtworks.map((group) => (
            <TabsTrigger key={group.artist_id} value={group.artist_id}>
              {group.artist_name}
            </TabsTrigger>
          ))}
        </TabsList>

        {groupedArtworks.map((group) => (
          <TabsContent key={group.artist_id} value={group.artist_id} className="pt-6">
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {group.artworks.map((artwork) => (
                <Card key={artwork.id} className="hover:shadow-md transition-shadow">
                  <img
                    src={artwork.image_url || "https://via.placeholder.com/400"}
                    alt={artwork.title}
                    className="rounded-t-md h-48 w-full object-cover"
                  />
                  <CardHeader>
                    <CardTitle className="text-md font-semibold">{artwork.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm space-y-1">
                    <p><strong>Precio:</strong> ${artwork.price}</p>
                    <p><strong>Categoría:</strong> {artwork.category}</p>
                    <p><strong>Enviada:</strong> {new Date(artwork.created_at).toLocaleDateString()}</p>
                    <Button variant="secondary" size="sm" className="mt-2 w-full">
                      <Eye className="h-4 w-4 mr-1" />
                      Ver detalles del artista
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}