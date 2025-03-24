
import { useState, useEffect } from "react";
import { Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";

interface ArtworkFiltersProps {
  onFilterChange: (filters: FilterValues) => void;
}

export interface FilterValues {
  category: string;
  style: string;
  technique: string;
  priceRange: [number, number];
  sortBy: string;
}

export function ArtworkFilters({ onFilterChange }: ArtworkFiltersProps) {
  const isMobile = useIsMobile();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [filters, setFilters] = useState<FilterValues>({
    category: "all",
    style: "all",
    technique: "all",
    priceRange: [0, 10000],
    sortBy: "newest",
  });

  // Apply filters when they change
  useEffect(() => {
    onFilterChange(filters);
  }, [filters, onFilterChange]);

  const handleReset = () => {
    setFilters({
      category: "all",
      style: "all",
      technique: "all",
      priceRange: [0, 10000],
      sortBy: "newest",
    });
    
    if (isMobile) {
      setIsSheetOpen(false);
    }
  };

  const updateFilter = (key: keyof FilterValues, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const FiltersContent = () => (
    <div className="space-y-6">
      <div>
        <Label htmlFor="category">Category</Label>
        <Select
          value={filters.category}
          onValueChange={(value) => updateFilter("category", value)}
        >
          <SelectTrigger id="category" className="mt-1.5">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="Painting">Painting</SelectItem>
            <SelectItem value="Sculpture">Sculpture</SelectItem>
            <SelectItem value="Photography">Photography</SelectItem>
            <SelectItem value="Digital">Digital</SelectItem>
            <SelectItem value="Mixed Media">Mixed Media</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="style">Style</Label>
        <Select
          value={filters.style}
          onValueChange={(value) => updateFilter("style", value)}
        >
          <SelectTrigger id="style" className="mt-1.5">
            <SelectValue placeholder="All Styles" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Styles</SelectItem>
            <SelectItem value="Abstract">Abstract</SelectItem>
            <SelectItem value="Contemporary">Contemporary</SelectItem>
            <SelectItem value="Minimalist">Minimalist</SelectItem>
            <SelectItem value="Figurative">Figurative</SelectItem>
            <SelectItem value="Expressionist">Expressionist</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="technique">Technique</Label>
        <Select
          value={filters.technique}
          onValueChange={(value) => updateFilter("technique", value)}
        >
          <SelectTrigger id="technique" className="mt-1.5">
            <SelectValue placeholder="All Techniques" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Techniques</SelectItem>
            <SelectItem value="Oil">Oil</SelectItem>
            <SelectItem value="Acrylic">Acrylic</SelectItem>
            <SelectItem value="Watercolor">Watercolor</SelectItem>
            <SelectItem value="Digital">Digital</SelectItem>
            <SelectItem value="Mixed Media">Mixed Media</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <Label>Price Range</Label>
          <span className="text-sm">
            ${filters.priceRange[0]} - ${filters.priceRange[1]}
          </span>
        </div>
        <Slider
          defaultValue={[0, 10000]}
          min={0}
          max={10000}
          step={100}
          value={filters.priceRange}
          onValueChange={(value) => updateFilter("priceRange", value)}
          className="my-4"
        />
      </div>

      <div>
        <Label htmlFor="sortBy">Sort By</Label>
        <Select
          value={filters.sortBy}
          onValueChange={(value) => updateFilter("sortBy", value)}
        >
          <SelectTrigger id="sortBy" className="mt-1.5">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="price_low">Price: Low to High</SelectItem>
            <SelectItem value="price_high">Price: High to Low</SelectItem>
            <SelectItem value="popularity">Popularity</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {isMobile && (
        <div className="pt-4 border-t">
          <Button onClick={handleReset} variant="outline" className="w-full mb-2">
            <X className="mr-2 h-4 w-4" /> Reset Filters
          </Button>
          <Button onClick={() => setIsSheetOpen(false)} className="w-full">
            View Results
          </Button>
        </div>
      )}
    </div>
  );

  return isMobile ? (
    <div className="mb-6 flex justify-between items-center">
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" /> Filters
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-full sm:max-w-md">
          <SheetHeader className="mb-5">
            <SheetTitle>Filters</SheetTitle>
            <SheetDescription>
              Refine your artwork search
            </SheetDescription>
          </SheetHeader>
          <FiltersContent />
        </SheetContent>
      </Sheet>
      
      <Select
        value={filters.sortBy}
        onValueChange={(value) => updateFilter("sortBy", value)}
      >
        <SelectTrigger id="sortByMobile" className="w-[180px]">
          <SelectValue placeholder="Sort By" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="newest">Newest</SelectItem>
          <SelectItem value="price_low">Price: Low to High</SelectItem>
          <SelectItem value="price_high">Price: High to Low</SelectItem>
          <SelectItem value="popularity">Popularity</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ) : (
    <div className="space-y-6 p-6 bg-white rounded-lg shadow-sm mb-6">
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-lg">Filters</h3>
        <Button onClick={handleReset} variant="ghost" size="sm">
          <X className="h-4 w-4 mr-2" /> Reset
        </Button>
      </div>
      <FiltersContent />
    </div>
  );
}
