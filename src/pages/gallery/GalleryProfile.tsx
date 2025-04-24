const inspirationalQuotes = [
  "Art enables us to find ourselves and lose ourselves at the same time.",
  "Creativity takes courage.",
  "Art is not what you see, but what you make others see.",
  "Every artist was first an amateur.",
  "Art speaks where words are unable to explain.",
  "The purpose of art is washing the dust of daily life off our souls.",
  "Art is the lie that enables us to realize the truth.",
  "To create one’s own world takes courage.",
  "Art should comfort the disturbed and disturb the comfortable.",
  "Creativity is allowing yourself to make mistakes. Art is knowing which ones to keep.",
];
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/contexts/AuthContext";
import { Instagram, Globe, Facebook } from "lucide-react";

interface GalleryProfile {
  id: string;
  username: string;
  name: string;
  first_name?: string;
  last_name?: string;
  bio: string;
  founded: string;
  city: string;
  country: string;
  website: string;
  instagram: string;
  facebook: string;
  avatar_url: string;
  featured_image: string;
}

interface Artwork {
  id: string;
  title: string;
  artist_name: string;
  technique: string;
  year: number;
  image_url: string;
}

interface Artist {
  id: string;
  name: string;
  avatar_url: string;
  username: string;
}

export default function GalleryProfile() {
  const { username } = useParams();
  const { user } = useAuth();

  const [gallery, setGallery] = useState<GalleryProfile | null>(null);
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [artists, setArtists] = useState<Artist[]>([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [activeSection, setActiveSection] = useState("artworks");

  // Filters
  const [artistFilter, setArtistFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const [techniqueFilter, setTechniqueFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchGalleryProfile = async () => {
      const { data: galleryData, error: galleryError } = await supabase
        .from("profiles")
        .select("*")
        .eq("role", "gallery")
        .eq("username", username)
        .single();

      if (galleryError) {
        console.error("Error fetching gallery:", galleryError);
        return;
      }

      setGallery(galleryData);

      // Fetch artworks
      const { data: artworksData } = await supabase
        .from("public_artworks")
        .select("*")
        .eq("created_by", galleryData.id)
        .eq("status", "approved");

      if (artworksData) {
        setArtworks(artworksData);
      }

      // Fetch represented artists
      const { data: artistsData } = await supabase
        .from("profiles")
        .select("*")
        .eq("created_by", galleryData.id)
        .eq("role", "artist");

      if (artistsData) {
        setArtists(artistsData);
      }

      // Check if user is following
      if (user) {
        const { data: followData } = await supabase
          .from("follows")
          .select("*")
          .eq("follower_id", user.id)
          .eq("following_id", galleryData.id)
          .single();

        setIsFollowing(!!followData);
      }
    };

    fetchGalleryProfile();
  }, [username, user]);

  const handleFollow = async () => {
    if (!user || !gallery) return;

    if (isFollowing) {
      await supabase
        .from("follows")
        .delete()
        .eq("follower_id", user.id)
        .eq("following_id", gallery.id);
    } else {
      await supabase
        .from("follows")
        .insert([{ follower_id: user.id, following_id: gallery.id }]);
    }

    setIsFollowing(!isFollowing);
  };

  if (!gallery) return <div>Loading...</div>;

  // ─── Friendly display name ───────────────────────────────────────────────────
  const displayName =
    (gallery?.name && gallery.name.trim()) ||
    `${gallery?.first_name ?? ""} ${gallery?.last_name ?? ""}`.trim() ||
    "Galería sin nombre";

  const displayLocation = [gallery.city, gallery.country]
    .filter(Boolean)
    .join(", ");

  // Inspirational quote (same logic as ArtistProfile)
  const randomQuote =
    inspirationalQuotes[Math.floor(Math.random() * inspirationalQuotes.length)];

  const filteredArtworks = artworks.filter((artwork) => {
    const matchesArtist = artistFilter
      ? artwork.artist_name.toLowerCase().includes(artistFilter.toLowerCase())
      : true;
    const matchesYear = yearFilter
      ? artwork.year.toString() === yearFilter
      : true;
    const matchesTechnique = techniqueFilter
      ? artwork.technique.toLowerCase().includes(techniqueFilter.toLowerCase())
      : true;
    const matchesSearch = searchQuery
      ? artwork.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        artwork.artist_name.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    return matchesArtist && matchesYear && matchesTechnique && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* ─────────────────────  HERO  ───────────────────── */}
      <header
        className="relative h-[90vh] w-full overflow-hidden bg-fixed bg-center bg-cover"
        style={{
          backgroundImage: `url(${
            gallery.featured_image || gallery.avatar_url
          })`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        {/* Blur + gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/30 backdrop-blur-[2px] z-0" />

        {/* Centered title and quote */}
        <div className="absolute inset-0 flex flex-col justify-between items-center text-center z-10 py-16">
          <h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-white drop-shadow-lg font-serif"
            style={{ fontFamily: '"Playfair Display", serif' }}
          >
            {displayName}
          </h1>
          <p className="text-lg italic text-gray-200 max-w-3xl px-4">
            {randomQuote}
          </p>
        </div>
      </header>

      {/* ───────────── Identity strip (logo + name + follow) ───────────── */}
      <section className="relative -mt-24 md:-mt-40 bg-background">
        <div className="container mx-auto px-4 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo / avatar */}
          <div className="flex items-center gap-6">
            <img
              src={gallery.avatar_url}
              alt={gallery.name}
              className="h-28 w-28 rounded-md object-cover shadow-lg ring-2 ring-white"
            />
            <div className="text-left">
              <h2 className="text-2xl font-medium">{displayName}</h2>
              <p className="text-muted-foreground">{displayLocation}</p>
            </div>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-4">
            {gallery.website && (
              <a
                href={gallery.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Globe className="h-5 w-5" />
              </a>
            )}
            {gallery.instagram && (
              <a
                href={`https://instagram.com/${gallery.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
            )}
            {gallery.facebook && (
              <a
                href={gallery.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
            )}
            <Button
              onClick={handleFollow}
              variant="ghost"
              className="ml-4 px-6 py-2 border border-muted-foreground text-muted-foreground hover:bg-muted/10 transition"
            >
              {isFollowing ? "Following" : "Follow"}
            </Button>
          </div>
        </div>
      </section>

      {/* ───────────────── Navigation ───────────────── */}
      <nav className="sticky top-0 z-20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b">
        <div className="container mx-auto px-4">
          <ul className="flex space-x-8 overflow-x-auto md:overflow-visible py-4 scrollbar-hide">
            {["artworks", "artists", "viewing-rooms", "contact"].map(
              (section) => (
                <li key={section}>
                  <button
                    onClick={() => setActiveSection(section)}
                    className={`relative pb-1 capitalize whitespace-nowrap transition-colors ${
                      activeSection === section
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {section.replace("-", " ")}
                    <span
                      className={`absolute left-0 -bottom-0.5 h-0.5 w-full bg-primary transition-transform ${
                        activeSection === section ? "scale-x-100" : "scale-x-0"
                      } origin-left`}
                    />
                  </button>
                </li>
              )
            )}
          </ul>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-12 gap-8">
          {/* Left Sidebar - Filters */}
          <div className="col-span-3">
            <Card className="p-6 sticky top-32">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Search</h3>
                  <Input
                    placeholder="Search artworks..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full"
                  />
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">
                    Filter by Artist
                  </h3>
                  <Select value={artistFilter} onValueChange={setArtistFilter}>
                    <option value="">All Artists</option>
                    {artists.map((artist) => (
                      <option key={artist.id} value={artist.name}>
                        {artist.name}
                      </option>
                    ))}
                  </Select>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Filter by Year</h3>
                  <Select value={yearFilter} onValueChange={setYearFilter}>
                    <option value="">All Years</option>
                    {Array.from(new Set(artworks.map((a) => a.year)))
                      .sort()
                      .map((year) => (
                        <option key={year} value={year.toString()}>
                          {year}
                        </option>
                      ))}
                  </Select>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">
                    Filter by Technique
                  </h3>
                  <Select
                    value={techniqueFilter}
                    onValueChange={setTechniqueFilter}
                  >
                    <option value="">All Techniques</option>
                    {Array.from(new Set(artworks.map((a) => a.technique)))
                      .sort()
                      .map((technique) => (
                        <option key={technique} value={technique}>
                          {technique}
                        </option>
                      ))}
                  </Select>
                </div>
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="col-span-9">
            {activeSection === "artworks" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredArtworks.map((artwork) => (
                  <Card
                    key={artwork.id}
                    className="overflow-hidden group hover:shadow-lg transition-shadow"
                  >
                    <div className="aspect-square relative">
                      <img
                        src={artwork.image_url}
                        alt={artwork.title}
                        className="object-cover w-full h-full transition-transform group-hover:scale-105"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold">{artwork.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {artwork.artist_name}
                      </p>
                      <div className="flex gap-2 mt-2">
                        <Badge>{artwork.technique}</Badge>
                        <Badge variant="outline">{artwork.year}</Badge>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {activeSection === "artists" && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {artists.map((artist) => (
                  <Card
                    key={artist.id}
                    className="overflow-hidden group hover:shadow-lg transition-shadow"
                  >
                    <div className="aspect-square relative">
                      <img
                        src={artist.avatar_url}
                        alt={artist.name}
                        className="object-cover w-full h-full transition-transform group-hover:scale-105"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold">{artist.name}</h3>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {activeSection === "contact" && (
              <Card className="p-8">
                <h2 className="text-3xl font-bold mb-8">{displayName}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Location</h3>
                      <p className="text-muted-foreground">
                        {gallery.city}, {gallery.country}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Founded</h3>
                      <p className="text-muted-foreground">{gallery.founded}</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Contact</h3>
                      <div className="space-y-2">
                        {gallery.website && (
                          <a
                            href={gallery.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-primary hover:underline"
                          >
                            <Globe className="h-4 w-4" />
                            {gallery.website}
                          </a>
                        )}
                        {gallery.instagram && (
                          <a
                            href={`https://instagram.com/${gallery.instagram}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-primary hover:underline"
                          >
                            <Instagram className="h-4 w-4" />@
                            {gallery.instagram}
                          </a>
                        )}
                        {gallery.facebook && (
                          <a
                            href={gallery.facebook}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-primary hover:underline"
                          >
                            <Facebook className="h-4 w-4" />
                            {gallery.facebook}
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-4">About</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {gallery.bio}
                    </p>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
