
import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { ArtworkGrid } from "@/components/artwork/ArtworkGrid";
import { ArtworkFilters, FilterValues } from "@/components/artwork/ArtworkFilters";
import { useIsMobile } from "@/hooks/use-mobile";

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
      <div className="container mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-bold mb-2">Explore Artworks</h1>
          <p className="text-muted-foreground">
            Discover and collect contemporary art from around the world
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {!isMobile && (
            <div className="w-full md:w-1/4">
              <ArtworkFilters onFilterChange={handleFilterChange} />
            </div>
          )}
          
          <div className="w-full md:w-3/4">
            {isMobile && <ArtworkFilters onFilterChange={handleFilterChange} />}
            <ArtworkGrid 
              category={filters.category !== "all" ? filters.category : ""} 
              style={filters.style !== "all" ? filters.style : ""} 
              technique={filters.technique !== "all" ? filters.technique : ""} 
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}
