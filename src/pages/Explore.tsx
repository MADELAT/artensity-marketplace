
import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { ArtworkGrid } from "@/components/artwork/ArtworkGrid";
import { ArtworkFilters, FilterValues } from "@/components/artwork/ArtworkFilters";
import { useIsMobile } from "@/hooks/use-mobile";
import { SlidingFilterPanel } from "@/components/artist/SlidingFilterPanel";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
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
        title="Explora ArTendency"
        subtitle="Descubre y colecciona arte contemporáneo de todo el mundo"
      />

      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row gap-6">
          {!isMobile && (
            <div className="w-full md:w-1/4">
              {/* Standard filters - visible on desktop */}
              <ArtworkFilters onFilterChange={handleFilterChange} />
              
              {/* Advanced filters */}
              <div className="mt-6">
                <SlidingFilterPanel 
                  onFilterChange={handleFilterChange} 
                  initialFilters={filters}
                />
              </div>
            </div>
          )}
          
          <div className="w-full md:w-3/4">
            {isMobile && (
              <div className="flex flex-wrap gap-3 mb-4">
                {/* Mobile filters */}
                <ArtworkFilters onFilterChange={handleFilterChange} />
                
                {/* Mobile sliding filter panel */}
                <Drawer>
                  <DrawerTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2">
                      <Filter className="h-4 w-4" />
                      <span>Advanced Filters</span>
                    </Button>
                  </DrawerTrigger>
                  <DrawerContent>
                    <div className="px-4 py-6">
                      <SlidingFilterPanel onFilterChange={handleFilterChange} initialFilters={filters} />
                    </div>
                  </DrawerContent>
                </Drawer>
              </div>
            )}
            
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
