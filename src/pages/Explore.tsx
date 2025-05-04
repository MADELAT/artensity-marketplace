
import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { ArtworkGrid } from "@/components/artwork/ArtworkGrid";
import { FilterValues } from "@/components/artwork/ArtworkFilters";
import { useIsMobile } from "@/hooks/use-mobile";
import { SlidingFilterPanel } from "@/components/artist/SlidingFilterPanel";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import ParallaxHero from "@/components/common/ParallaxHero";

export default function Explore() {
  const isMobile = useIsMobile();
  const [filters, setFilters] = useState<FilterValues>({
    category: "all",
    style: "all",
    technique: "all",
    priceRange: [0, 10000],
    sortBy: "newest",
  });

  const handleFilterChange = (newFilters: FilterValues) => {
    setFilters(newFilters);
  };

  return (
    <Layout>
      {/* Parallax Hero */}
      <ParallaxHero
        title="Explore ArtTrendy"
        subtitle="Discover and collect contemporary art from around the world"
      />

      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-center mb-8">
          <SlidingFilterPanel 
            onFilterChange={handleFilterChange} 
            initialFilters={filters}
          />
        </div>
        
        <ArtworkGrid 
          category={filters.category !== "all" ? filters.category : ""} 
          style={filters.style !== "all" ? filters.style : ""} 
          technique={filters.technique !== "all" ? filters.technique : ""} 
        />
      </div>
    </Layout>
  );
}
