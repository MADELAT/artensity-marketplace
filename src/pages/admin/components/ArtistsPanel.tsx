import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Instagram, Facebook, Globe } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";

export default function ArtistsPanel() {
  const [artists, setArtists] = useState([]);
  const [artworks, setArtworks] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedLetter, setSelectedLetter] = useState("A");

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  useEffect(() => {
    fetchArtistsAndArtworks();
  }, []);

  const fetchArtistsAndArtworks = async () => {
    const { data: profiles, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("role", "artist");

    const { data: artworksData, error: artworksError } = await supabase
      .from("artworks")
      .select("id, artist_id, image_url")
      .eq("status", "approved");

    if (profiles && artworksData) {
      const enrichedArtists = profiles.map((artist) => {
        const artistArtworks = artworksData.filter(
          (a) => a.artist_id === artist.id
        );
        return {
          ...artist,
          artworks: artistArtworks,
        };
      });

      setArtists(enrichedArtists);
      setArtworks(artworksData);
    }
  };

  const filteredArtists = artists
    .filter((a) =>
      `${a.first_name} ${a.last_name}`
        .toLowerCase()
        .includes(search.toLowerCase())
    )
    .filter((a) => a.last_name?.toUpperCase().startsWith(selectedLetter));

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <h2 className="text-2xl font-bold">Artistas</h2>
        <Input
          placeholder="Buscar artista..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-80"
        />
      </div>

      <div className="flex flex-wrap gap-2 overflow-x-auto no-scrollbar">
        {alphabet.map((letter) => (
          <Badge
            key={letter}
            variant={selectedLetter === letter ? "default" : "outline"}
            onClick={() => setSelectedLetter(letter)}
            className="cursor-pointer"
          >
            {letter}
          </Badge>
        ))}
      </div>

      <Separator />

      {filteredArtists.length === 0 ? (
        <p className="text-muted-foreground">
          No hay artistas con esa inicial.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredArtists.map((artist) => {
            const placeholderImage =
              artist.avatar_url ||
              artist.artworks?.[0]?.image_url ||
              "https://via.placeholder.com/300x200?text=Sin+imagen";

            return (
              <motion.div
                key={artist.id}
                whileHover={{ scale: 1.02 }}
                className="group relative"
              >
                <Card className="overflow-hidden h-full border border-muted">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={placeholderImage}
                      alt={`${artist.first_name} ${artist.last_name}`}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="text-lg font-medium capitalize">
                      {artist.first_name} {artist.last_name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {artist.country || "Internacional"}
                    </p>

                    {artist.style && (
                      <Badge variant="outline" className="text-xs mb-2">
                        {artist.style}
                      </Badge>
                    )}

                    {artist.bio && (
                      <div className="text-xs text-muted-foreground mt-2 line-clamp-3">
                        {artist.bio}
                      </div>
                    )}

                    <div className="flex items-center gap-3 mt-4">
                      {artist.instagram && (
                        <a
                          href={artist.instagram}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <Instagram className="h-4 w-4 hover:text-primary" />
                        </a>
                      )}
                      {artist.facebook && (
                        <a
                          href={artist.facebook}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <Facebook className="h-4 w-4 hover:text-primary" />
                        </a>
                      )}
                      {artist.website && (
                        <a
                          href={artist.website}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <Globe className="h-4 w-4 hover:text-primary" />
                        </a>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
