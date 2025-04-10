import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  artist_avatar?: string;
  firstLetter: string;
  artworks: Artwork[];
}

export default function ApprovedArtworks() {
  const { toast } = useToast();
  const [groupedArtworks, setGroupedArtworks] = useState<ArtistGroup[]>([]);
  const [activeArtistId, setActiveArtistId] = useState<string | null>(null);
  const [selectedLetter, setSelectedLetter] = useState("A");

  const alphabet = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"];

  useEffect(() => {
    fetchApprovedArtworks();
  }, []);

  const fetchApprovedArtworks = async () => {
    const { data, error } = await supabase
      .from("artworks")
      .select(
        "id, title, image_url, artist_id, status, price, category, created_at"
      )
      .eq("status", "approved");

    if (error || !data) {
      console.error("Error fetching artworks:", error);
      toast({
        title: "Error",
        description: "No se pudieron cargar las obras aprobadas",
        variant: "destructive",
      });
      return;
    }

    const artistMap: { [key: string]: ArtistGroup } = {};

    for (const artwork of data) {
      const artistId = artwork.artist_id;
      if (!artistMap[artistId]) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("first_name, last_name, avatar_url")
          .eq("id", artistId)
          .single();

        const fullName = `${profile?.first_name || "Artista"} ${
          profile?.last_name || ""
        }`.trim();
        const firstLetter = fullName.charAt(0).toUpperCase();

        artistMap[artistId] = {
          artist_id: artistId,
          artist_name: fullName,
          artist_avatar: profile?.avatar_url ?? artwork.image_url,
          firstLetter,
          artworks: [],
        };
      }

      artistMap[artistId].artworks.push(artwork);
    }

    const artists = Object.values(artistMap);
    setGroupedArtworks(artists);
    const filteredByLetter = artists.filter(
      (a) => a.firstLetter === selectedLetter
    );
    if (filteredByLetter.length > 0) {
      setActiveArtistId(filteredByLetter[0].artist_id);
    }
  };

  const filteredArtists = groupedArtworks.filter(
    (a) => a.firstLetter === selectedLetter
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Obras Aprobadas</h2>
        <Button onClick={fetchApprovedArtworks} variant="outline">
          Actualizar
        </Button>
      </div>

      {/* Filtro A-Z */}
      <div className="flex flex-col space-y-1 fixed top-[140px]">
        {alphabet.map((letter) => (
          <Button
            key={letter}
            size="sm"
            variant={selectedLetter === letter ? "default" : "ghost"}
            onClick={() => {
              setSelectedLetter(letter);
              const match = groupedArtworks.find(
                (a) => a.firstLetter === letter
              );
              if (match) setActiveArtistId(match.artist_id);
            }}
          >
            {letter}
          </Button>
        ))}
      </div>

      {/* Avatars */}
      <div className="ml-10 flex overflow-x-auto gap-6 pb-2 pt-4">
        {filteredArtists.map((artist) => (
          <div
            key={artist.artist_id}
            onClick={() => setActiveArtistId(artist.artist_id)}
            className={`flex flex-col items-center cursor-pointer transition-transform hover:scale-105 ${
              activeArtistId === artist.artist_id
                ? "border-2 border-primary rounded-full p-1"
                : ""
            }`}
          >
            <img
              src={artist.artist_avatar || "https://via.placeholder.com/80"}
              alt={artist.artist_name}
              className="w-20 h-20 rounded-full object-cover"
            />
            <span className="text-xs text-center mt-1">
              {artist.artist_name}
            </span>
          </div>
        ))}
      </div>

      {/* Obras */}
      <div className="ml-10 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {groupedArtworks
          .find((group) => group.artist_id === activeArtistId)
          ?.artworks.map((artwork) => (
            <Card
              key={artwork.id}
              className="hover:shadow-md transition-shadow"
            >
              <img
                src={artwork.image_url || "https://via.placeholder.com/400"}
                alt={artwork.title}
                className="rounded-t-md h-48 w-full object-cover"
              />
              <CardHeader>
                <CardTitle className="text-md font-semibold">
                  {artwork.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-1">
                <p>
                  <strong>Precio:</strong> ${artwork.price}
                </p>
                <p>
                  <strong>Categoría:</strong> {artwork.category}
                </p>
                <p>
                  <strong>Enviada:</strong>{" "}
                  {new Date(artwork.created_at).toLocaleDateString()}
                </p>
                <Button variant="secondary" size="sm" className="mt-2 w-full">
                  <Eye className="h-4 w-4 mr-1" />
                  Ver detalles del artista
                </Button>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  );
}
