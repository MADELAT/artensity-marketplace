import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Instagram, Facebook, Globe, ExternalLink, Star } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function ArtistsPanel() {
  const [artists, setArtists] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedLetter, setSelectedLetter] = useState("A");

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  useEffect(() => {
    fetchArtistsWithStats();
  }, []);

  const fetchArtistsWithStats = async () => {
    const { data: profiles } = await supabase
      .from("profiles")
      .select("*")
      .eq("role", "artist");

    const { data: artworks } = await supabase
      .from("artworks")
      .select("id, artist_id, image_url, is_sold, created_at")
      .eq("status", "approved");

    const enriched = profiles.map((artist) => {
      const artistArtworks = artworks.filter((a) => a.artist_id === artist.id);
      const sold = artistArtworks.filter((a) => a.is_sold).length;
      const lastActivity = artistArtworks
        .map((a) => new Date(a.created_at))
        .sort((a, b) => b.getTime() - a.getTime())[0];

      return {
        ...artist,
        artworks: artistArtworks,
        stats: {
          approved: artistArtworks.length,
          sold,
          lastActivity: lastActivity
            ? lastActivity.toLocaleDateString()
            : "N/A",
        },
      };
    });

    setArtists(enriched);
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
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <img
                      src={placeholderImage}
                      alt={`${artist.first_name} ${artist.last_name}`}
                      className="object-cover w-full h-full"
                    />
                    {artist.is_featured && (
                      <div className="absolute top-2 right-2 bg-yellow-400 text-white px-2 py-1 text-xs font-bold rounded shadow">
                        <Star className="h-4 w-4 inline mr-1" />
                        Featured
                      </div>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium capitalize">
                        {artist.first_name} {artist.last_name}
                      </h3>
                      {artist.bio && (
                        <Tooltip>
                          <TooltipTrigger>
                            <span className="text-xs text-muted-foreground underline cursor-help">
                              Info
                            </span>
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs text-xs">
                            {artist.bio}
                          </TooltipContent>
                        </Tooltip>
                      )}
                    </div>

                    <p className="text-sm text-muted-foreground mb-1">
                      {artist.country || "Internacional"}
                    </p>

                    {artist.style && (
                      <Badge variant="outline" className="text-xs mb-2">
                        {artist.style}
                      </Badge>
                    )}

                    <div className="text-xs space-y-1 mt-2">
                      <p>
                        Obras aprobadas:{" "}
                        <span className="font-semibold">
                          {artist.stats?.approved}
                        </span>
                      </p>
                      <p>
                        Vendidas:{" "}
                        <span className="font-semibold">
                          {artist.stats?.sold}
                        </span>
                      </p>
                      <p>
                        Última actividad:{" "}
                        <span className="font-semibold">
                          {artist.stats?.lastActivity}
                        </span>
                      </p>
                    </div>

                    <div className="flex justify-between items-center mt-4">
                      <div className="flex gap-3">
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
                      <Link
                        to={`/artist/${artist.id}`}
                        className="text-xs text-primary underline hover:opacity-90 flex items-center gap-1"
                      >
                        Ver perfil
                        <ExternalLink className="h-3 w-3" />
                      </Link>
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
