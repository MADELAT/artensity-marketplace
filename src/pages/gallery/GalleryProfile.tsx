
// GalleryProfile.tsx – usa ParallaxHeroGallery como componente externo

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Instagram, Facebook, Globe, Filter } from "lucide-react";
import ParallaxHeroGallery from "@/components/gallery/ParallaxHeroGallery";
import { SlidingFilterPanel, FilterValues } from "@/components/artist/SlidingFilterPanel";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";

const inspirationalQuotes = [
  "Every work of art is an act of defiance.",
  "Art is the lie that reveals the truth.",
  "Creativity is contagious—pass it on.",
  "Art does not depict the visible; it makes visible.",
  "Art is the bridge between the seen and the unseen.",
  "The artist is not a maker, but a revealer.",
  "To create is to believe in something that doesn't exist—yet.",
  "Art is a wound turned into light.",
  "Through art, we remember what it means to feel.",
  "Great art whispers what cannot be screamed.",
  "Art is the silence between words, the breath between thoughts.",
  "True art does not decorate; it disrupts.",
  "To create is to risk everything for something invisible.",
  "Art is the most beautiful form of resistance.",
  "Artists paint what others are too afraid to say.",
  "Art is not a mirror—it's a hammer.",
  "What we dare not live, we paint.",
  "Art heals what logic cannot touch.",
  "A single line drawn with truth is worth a thousand perfect strokes.",
  "In a world gone blind, the artist still sees.",
  "In times of destruction, an Artist transcends by creating.",
  "Creativity is allowing oneself to make mistakes. Art is knowing which ones to keep.",
  "An artist doesn't just create art, but an extraordinary way to look into the ordinary."
];

const fallbackImages = [
  "https://unsplash.com/photos/91HeDF6fjVQ/download?force=true",
  "https://unsplash.com/photos/UsUfpYMBgRo/download?force=true",
  "https://unsplash.com/photos/zZPeoLxLRyM/download?force=true",
  "https://unsplash.com/photos/yRmlkP9VShE/download?force=true",
  "https://unsplash.com/photos/ieHjFj4lZvo/download?force=true",
  "https://unsplash.com/photos/9I2W5-7Kp4k/download?force=true",
  "https://unsplash.com/photos/sfDf_z-iJ1c/download?force=true",
  "https://unsplash.com/photos/e5LdlAMpkEw/download?force=true",
  "https://unsplash.com/photos/C5s_V9SNXmI/download?force=true",
  "https://unsplash.com/photos/2Y3AhqTIqNo/download?force=true",
  "https://unsplash.com/photos/NAOlAo6ufxA/download?force=true",
  "https://unsplash.com/photos/wQLAGv4_OYs/download?force=true",
  "https://unsplash.com/photos/zKnQnyARggY/download?force=true",
  "https://unsplash.com/photos/-MCrF6hnojU/download?force=true"
];

export default function GalleryProfile() {
  const { username } = useParams();
  const { user } = useAuth();
  const isMobile = useIsMobile();

  const [gallery, setGallery] = useState(null);
  const [featuredArtwork, setFeaturedArtwork] = useState(null);
  const [activeTab, setActiveTab] = useState('Overview');
  const [filters, setFilters] = useState<FilterValues>({
    category: "all",
    style: "all",
    technique: "all",
    priceRange: [0, 10000],
    sortBy: "newest",
  });

  const handleFilterChange = (newFilters: FilterValues) => {
    setFilters(newFilters);
    // Here you would typically fetch filtered data
    console.log("Applied filters:", newFilters);
  };

  useEffect(() => {
    const fetchGallery = async () => {
      const { data: profile, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("username", username)
        .eq("role", "gallery")
        .single();

      if (!profile || error) return;
      setGallery(profile);

      const { data: featured } = await supabase
        .from("artworks")
        .select("image_url")
        .eq("created_by", profile.id)
        .eq("status", "approved")
        .eq("is_featured", true);

      if (featured && featured.length > 0) {
        setFeaturedArtwork(featured[Math.floor(Math.random() * featured.length)].image_url);
      } else {
        setFeaturedArtwork(fallbackImages[Math.floor(Math.random() * fallbackImages.length)]);
      }
    };

    fetchGallery();
  }, [username]);

  if (!gallery) return <div className="text-center py-20">Loading gallery...</div>;

  const quote = inspirationalQuotes[Math.floor(Math.random() * inspirationalQuotes.length)];
  const fullName = `${gallery.first_name ?? ""} ${gallery.last_name ?? ""}`.trim();

  const mockArtists = Array.from({ length: 20 }, (_, i) => ({
    name: `Artist ${i + 1}`,
    country: "France",
    style: "Contemporary"
  }));

  return (
    <div className="min-h-screen bg-white text-black">
      <ParallaxHeroGallery
        image={featuredArtwork}
        name={fullName || gallery.username}
        quote={quote}
      />

      <section className="-mt-24 z-10 relative bg-white">
        <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row items-center gap-6">
          <img
            src={gallery.avatar_url}
            alt={fullName}
            className="h-28 w-28 rounded-md object-cover ring-2 ring-white shadow-md"
          />
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-semibold">{fullName}</h2>
            <p className="text-gray-500">{gallery.city}, {gallery.country}</p>
          </div>
          <Button
            variant="ghost"
            className="border border-gray-300 text-gray-500 hover:bg-gray-100 ml-auto"
          >
            Follow
          </Button>
        </div>
      </section>

      <nav className="border-t border-b bg-white sticky top-0 z-20">
        <ul className="flex justify-center space-x-8 py-4 text-gray-600">
          {['Overview', 'Artists', 'Artworks', 'Events', 'Contact'].map((item) => (
            <li
              key={item}
              className={`hover:text-black transition-colors cursor-pointer text-sm md:text-base ${
                activeTab === item ? "font-medium text-black" : ""
              }`}
              onClick={() => setActiveTab(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* Filter integration */}
        <div className="mb-6">
          {isMobile ? (
            <Drawer>
              <DrawerTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <span>Filter</span>
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <div className="px-4 py-6">
                  <SlidingFilterPanel onFilterChange={handleFilterChange} initialFilters={filters} />
                </div>
              </DrawerContent>
            </Drawer>
          ) : (
            <SlidingFilterPanel onFilterChange={handleFilterChange} initialFilters={filters} />
          )}
        </div>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockArtists.map((artist, i) => (
            <div
              key={i}
              className="border border-gray-200 p-4 rounded-lg shadow-sm hover:shadow-md transition">
              <h3 className="text-lg font-semibold mb-1">{artist.name}</h3>
              <p className="text-sm text-gray-500">{artist.country}</p>
              <p className="text-xs text-gray-400 italic">{artist.style}</p>
            </div>
          ))}
        </section>
      </div>

      <footer className="border-t py-8 text-center">
        <div className="flex justify-center space-x-4 text-gray-500">
          {gallery.website && (
            <a href={gallery.website} target="_blank" rel="noreferrer">
              <Globe className="w-5 h-5" />
            </a>
          )}
          {gallery.instagram && (
            <a href={`https://instagram.com/${gallery.instagram}`} target="_blank" rel="noreferrer">
              <Instagram className="w-5 h-5" />
            </a>
          )}
          {gallery.facebook && (
            <a href={gallery.facebook} target="_blank" rel="noreferrer">
              <Facebook className="w-5 h-5" />
            </a>
          )}
        </div>
      </footer>
    </div>
  );
}
