// ✅ Artist Profile Page con Follow y Hero Estético
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Instagram,
  Facebook,
  Globe,
  ChevronDown,
  ChevronUp,
  Heart,
} from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface Profile {
  id: string;
  full_name: string;
  avatar_url: string;
  bio: string;
  country: string;
  instagram_url?: string;
  facebook_url?: string;
  website_url?: string;
}

interface Artwork {
  id: string;
  title: string;
  description: string;
  image_url: string;
  series: string;
  technique: string;
  category: string;
  year: number;
  dimensions: string;
  price: number;
}

type FilterKey = "series" | "technique" | "category" | "year";

const inspirationalQuotes = [
  "Every work of art is an act of defiance.",
  "Art is the lie that reveals the truth.",
  "Creativity is contagious—pass it on.",
  "Art does not depict the visible; it makes visible.",
  "Art is the bridge between the seen and the unseen.",
  "The artist is not a maker, but a revealer.",
  "To create is to believe in something that doesn’t exist—yet.",
  "Art is a wound turned into light.",
  "Through art, we remember what it means to feel.",
  "Great art whispers what cannot be screamed.",
  "Art is the silence between words, the breath between thoughts.",
  "True art does not decorate; it disrupts.",
  "To create is to risk everything for something invisible.",
  "Art is the most beautiful form of resistance.",
  "Artists paint what others are too afraid to say.",
  "Art is not a mirror—it’s a hammer.",
  "What we dare not live, we paint.",
  "Art heals what logic cannot touch.",
  "A single line drawn with truth is worth a thousand perfect strokes.",
  "In a world gone blind, the artist still sees.",
  "In times of destruction, an Artist transcends by creating.",
  "Creativity is allowing oneself to make mistakes. Art is knowing which ones to keep.",
  "An artist doesn't just create art, but an extraordinary way to look into the ordinary.",
];

export default function ArtistProfile() {
  const { username } = useParams<{ username: string }>();
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showBio, setShowBio] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  const [filters, setFilters] = useState<
    Record<FilterKey, (string | number)[]>
  >({
    series: [],
    technique: [],
    category: [],
    year: [],
  });

  const toggleFilter = (type: FilterKey, value: string | number) => {
    setFilters((prev) => ({
      ...prev,
      [type]: prev[type].includes(value)
        ? prev[type].filter((v) => v !== value)
        : [...prev[type], value],
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      // Choose table based on authentication
      const tableName = user ? "profiles" : "public_profiles";
      try {
        // Get profile by username
        const { data: profileData, error: profileError } = await supabase
          .from(tableName)
          .select("*")
          .eq("username", username)
          .single();
        if (profileError) throw profileError;

        // choose artworks table/view based on authentication
        const artworksTable = user ? "artworks" : "public_artworks";
        // Then get artworks by artist_id (profile id)
        const { data: artworksData, error: artworksError } = await supabase
          .from(artworksTable)
          .select("*")
          .eq("artist_id", profileData.id)
          .eq("status", "approved");
        if (artworksError) throw artworksError;

        setProfile({
          ...profileData,
          full_name:
            profileData.full_name ??
            `${profileData.first_name ?? ""} ${
              profileData.last_name ?? ""
            }`.trim(),
        });
        setArtworks(artworksData || []);

        if (user) {
          const { data: followData } = await supabase
            .from("follows")
            .select("*")
            .eq("follower_id", user.id)
            .eq("followed_id", profileData.id)
            .maybeSingle();
          setIsFollowing(!!followData);
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load artist profile");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username, user]);

  const handleFollow = async () => {
    if (!user) {
      toast({
        title: "Login required",
        description: "Please log in to follow this artist",
        variant: "destructive",
      });
      return;
    }

    try {
      if (!profile) return;
      if (isFollowing) {
        const { error } = await supabase
          .from("follows")
          .delete()
          .eq("follower_id", user.id)
          .eq("followed_id", profile.id);
        if (error) throw error;
        toast({
          title: "Unfollowed",
          description: "You unfollowed this artist",
        });
      } else {
        const { error } = await supabase.from("follows").insert({
          follower_id: user.id,
          followed_id: profile.id,
        });
        if (error) throw error;
        toast({
          title: "Following",
          description: "You are now following this artist",
        });
      }
      setIsFollowing(!isFollowing);
    } catch (err) {
      console.error("Follow error:", err);
      toast({ title: "Error", description: "Could not update follow status" });
    }
  };

  const featuredArtwork = artworks[0] || {
    image_url: "/placeholder-artwork.jpg",
    title: "Featured Work",
  };

  const randomQuote =
    inspirationalQuotes[Math.floor(Math.random() * inspirationalQuotes.length)];

  const filteredArtworks = artworks.filter((a) => {
    return (
      (filters.series.length === 0 || filters.series.includes(a.series)) &&
      (filters.technique.length === 0 ||
        filters.technique.includes(a.technique)) &&
      (filters.category.length === 0 ||
        filters.category.includes(a.category)) &&
      (filters.year.length === 0 || filters.year.includes(a.year))
    );
  });

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <ParallaxHero
        featuredArtwork={featuredArtwork}
        profile={profile}
        randomQuote={randomQuote}
      />

      {/* Info */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col items-center gap-6">
          <Avatar className="h-32 w-32 ring ring-white shadow-lg">
            <AvatarImage
              src={profile.avatar_url || featuredArtwork.image_url}
              alt={profile.full_name}
            />
            <AvatarFallback>{profile.full_name?.[0] || "A"}</AvatarFallback>
          </Avatar>

          <Button
            onClick={handleFollow}
            variant={isFollowing ? "outline" : "default"}
            className="flex items-center gap-2"
          >
            <Heart className="h-4 w-4" />
            {isFollowing ? "Following" : "Follow"}
          </Button>
        </div>

        {/* Bio + Redes */}
        <div className="text-center mt-8">
          <p className="text-xl font-serif mb-1">{profile.country}</p>
          <div className="flex justify-center gap-4 my-4">
            {profile.instagram_url && (
              <a href={profile.instagram_url} target="_blank" rel="noreferrer">
                <Instagram />
              </a>
            )}
            {profile.facebook_url && (
              <a href={profile.facebook_url} target="_blank" rel="noreferrer">
                <Facebook />
              </a>
            )}
            {profile.website_url && (
              <a href={profile.website_url} target="_blank" rel="noreferrer">
                <Globe />
              </a>
            )}
          </div>

          <Button
            variant="outline"
            onClick={() => setShowBio(!showBio)}
            className="mt-2"
          >
            {showBio ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
            {showBio ? "Hide Bio" : "View Bio"}
          </Button>

          {showBio && (
            <div className="max-w-2xl mx-auto mt-6 text-gray-700">
              <p>{profile.bio}</p>
            </div>
          )}
        </div>

        {/* Filters y obras */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-16">
          <div className="space-y-6">
            <h3 className="text-xl font-serif">Filters</h3>
            {(
              [
                {
                  label: "Series",
                  values: [...new Set(artworks.map((a) => a.series))],
                  key: "series",
                },
                {
                  label: "Technique",
                  values: [...new Set(artworks.map((a) => a.technique))],
                  key: "technique",
                },
                {
                  label: "Category",
                  values: [...new Set(artworks.map((a) => a.category))],
                  key: "category",
                },
                {
                  label: "Year",
                  values: [...new Set(artworks.map((a) => a.year))].sort(
                    (a, b) => b - a
                  ),
                  key: "year",
                },
              ] as {
                label: string;
                values: (string | number)[];
                key: FilterKey;
              }[]
            ).map(({ label, values, key }) => (
              <div key={key}>
                <h4 className="font-medium">{label}</h4>
                <div className="flex flex-wrap gap-2">
                  {values.map((val) => (
                    <Badge
                      key={val ? val.toString() : `empty-${key}`}
                      onClick={() => val && toggleFilter(key, val)}
                      variant={
                        val && filters[key].includes(val)
                          ? "default"
                          : "outline"
                      }
                      className={`cursor-pointer ${
                        !val ? "opacity-50 pointer-events-none" : ""
                      }`}
                    >
                      {val ?? "N/A"}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Obras */}
          <div className="md:col-span-3">
            {filteredArtworks.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredArtworks.map((a) => (
                  <Card key={a.id}>
                    <img
                      src={a.image_url}
                      alt={a.title}
                      className="w-full h-64 object-cover"
                    />
                    <CardContent className="p-4">
                      <h3 className="text-xl font-serif">{a.title}</h3>
                      <p className="text-sm text-gray-600">
                        {a.series} · {a.technique} · {a.year}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center mt-8">
                This artist has not uploaded any approved artworks yet.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ParallaxHero component

function ParallaxHero({
  featuredArtwork,
  profile,
  randomQuote,
}: {
  featuredArtwork: { image_url: string };
  profile: { full_name: string };
  randomQuote: string;
}) {
  return (
    <div className="relative h-[80vh] bg-black text-white overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${featuredArtwork.image_url})`,
          backgroundAttachment: "fixed",
          backgroundPosition: "center",
          backgroundSize: "cover",
          filter: "blur(2px)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
      <div className="relative z-20 flex flex-col justify-between h-full max-w-7xl mx-auto px-6 py-16 text-center pointer-events-none">
        <div />
        <h1 className="text-6xl md:text-8xl font-serif font-bold leading-tight tracking-wide drop-shadow-xl text-white">
          {profile.full_name}
        </h1>
        <p className="text-lg italic text-gray-200 mb-8">{randomQuote}</p>
      </div>
    </div>
  );
}
