import { useState, useEffect } from "react";
import { 
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import countryList from "react-select-country-list";
import CountrySelect from "react-select";
import { useMemo } from "react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { X, SlidersHorizontal } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export interface FilterOptions {
  series?: string[];
  techniques?: string[];
  categories?: string[];
  styles?: string[];
  dimensions?: string[];
  years?: number[];
  priceRange?: [number, number];
  locations?: string[];
  countries?: string[];
  rarities?: string[];
}

export interface FilterValues {
  series?: string;
  technique?: string;
  category?: string;
  style?: string;
  dimension?: string;
  year?: number;
  priceRange?: [number, number];
  location?: string;
  country?: string;
  rarity?: string;
  sortBy?: string;
  [key: string]: any;
}

interface SlidingFilterPanelProps {
  onFilterChange: (filters: FilterValues) => void;
  initialFilters?: FilterValues;
  filterOptions?: FilterOptions;
  id?: string;
}

export const SlidingFilterPanel = ({
  onFilterChange,
  initialFilters = {},
  filterOptions = {},
  id
}: SlidingFilterPanelProps) => {
  // State for managing the filters
  const [filters, setFilters] = useState<FilterValues>(initialFilters);
  const [open, setOpen] = useState(false);
  
  // Dynamic filter options
  const [availableSeries, setAvailableSeries] = useState<string[]>(["All Series"]);

  useEffect(() => {
    const fetchSeries = async () => {
      const { data, error } = await supabase
        .from("public_series")   // ← ahora consultamos la vista
        .select("series");       // la vista ya viene depurada

      if (error) {
        console.error("Error fetching series:", error);
        return;
      }

      const uniqueSeries = data
        .map((row) => row.series)
        .filter((s): s is string => !!s)
        .sort((a, b) => a.localeCompare(b));

      setAvailableSeries(["All Series", ...uniqueSeries]);
    };

    fetchSeries();
  }, []);
  
  const [availableTechniques, setAvailableTechniques] = useState<string[]>(
    filterOptions.techniques || ["all", "Oil", "Acrylic", "Watercolor", "Mixed Media", "Graphite", "Pencil", "Carving", "Casting", "Serigraphy", "Digital", "Other"]
  );
  const [availableCategories, setAvailableCategories] = useState<string[]>(
    filterOptions.categories || ["all", "Painting", "Sculpture", "Printmaking", "Collage", "Textile", "Photography", "Installation", "Drawing", "VideoArt", "Other"]
  );
  const [availableStyles, setAvailableStyles] = useState<string[]>(
    filterOptions.styles || ["all", "Contemporary", "Abstract", "Figurative", "Minimalist", "Conceptual", "Surrealist", "HiperRealist", "Expressionist", "Realist", "Pop Art", "Geometric", "Street Art", "Other"]
  );
  const [availableYears, setAvailableYears] = useState<number[]>(
    filterOptions.years || Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i)
  );
  const countryOptions = useMemo(() => {
    const options = countryList().getData();
    return [{ label: "All Countries", value: "all" }, ...options];
  }, []);
  
  const [availableCountries, setAvailableCountries] = useState<string[]>(
    countryOptions.map((c) => c.label)
  );
  
  const [availableLocations, setAvailableLocations] = useState<string[]>(["All Locations"]);

  useEffect(() => {
    const fetchLocationsFromProfiles = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("city")
        .not("city", "is", null);

      if (error) {
        console.error("Error fetching locations:", error);
        return;
      }

      const uniqueCities = Array.from(new Set(data.map((item) => item.city))).sort();
      setAvailableLocations(["All Locations", ...uniqueCities]);
    };

    fetchLocationsFromProfiles();
  }, []);
  const rarityOptions = ["Unique piece", "Limited edition", "Open edition"];
  
  // Min and max price for the range slider
  const [priceRange, setPriceRange] = useState<[number, number]>(
    filters.priceRange || [0, 10000]
  );

  useEffect(() => {
    // Fetch series data from Supabase
    const fetchSeries = async () => {
      try {
        const { data, error } = await supabase
          .from('artworks')
          .select('series')
          .not('series', 'is', null);
        
        if (error) throw error;
        
        if (data && data.length > 0) {
          // Extract unique series
          const uniqueSeries = [...new Set(data.map(item => item.series).filter(Boolean))];
          setAvailableSeries(["All Series", ...uniqueSeries]);
        }
      } catch (error) {
        console.error('Error fetching series:', error);
      }
    };

    // Fetch techniques data from Supabase
    const fetchTechniques = async () => {
      try {
        const { data, error } = await supabase
          .from('artworks')
          .select('technique')
          .not('technique', 'is', null);
        
        if (error) throw error;
        
        if (data && data.length > 0) {
          // Extract unique techniques
          const uniqueTechniques = [...new Set(data.map(item => item.technique).filter(Boolean))];
          setAvailableTechniques(["all", ...uniqueTechniques]);
        }
      } catch (error) {
        console.error('Error fetching techniques:', error);
      }
    };

    fetchSeries();
    fetchTechniques();
  }, []);

  // Apply filters
  const applyFilters = () => {
    onFilterChange(filters);
    setOpen(false);
  };

  // Reset filters
  const resetFilters = () => {
    setFilters({
      series: "All Series",
      technique: "all",
      category: "all",
      style: "all",
      dimension: "all",
      year: undefined,
      priceRange: [0, 10000],
      location: "All Locations",
      country: "All Countries",
      rarity: undefined,
      sortBy: "newest"
    });
    setPriceRange([0, 10000]);
  };

  // Handle filter changes
  const handleFilterChange = (field: string, value: any) => {
    setFilters({ ...filters, [field]: value });
    
    // Special handling for price range
    if (field === 'priceRange') {
      setPriceRange(value);
    }
  };

  return (
    <>
      {/* Trigger button */}
      <Button 
        variant="outline" 
        className="flex items-center gap-2 mb-4"
        onClick={() => setOpen(true)}
        id={id || `${Math.random().toString(36).substring(2, 9)}-filter-button`}
      >
        <SlidersHorizontal className="w-4 h-4" />
        <span>Filter</span>
      </Button>

      {/* Sheet component for sliding panel */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-full sm:w-[350px] overflow-y-auto pb-20">
          <SheetHeader>
            <SheetTitle className="flex items-center justify-between">
              <span>Filter Options</span>
              <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </SheetTitle>
          </SheetHeader>

          <div className="space-y-6 mt-6">
            {/* Series */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Series</h3>
              <Select 
                value={filters.series || "All Series"} 
                onValueChange={(value) => handleFilterChange('series', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select series" />
                </SelectTrigger>
                <SelectContent>
                  {availableSeries.map((series) => (
                    <SelectItem key={series} value={series}>{series}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Separator />

            {/* Technique */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Technique</h3>
              <Select 
                value={filters.technique || "all"} 
                onValueChange={(value) => handleFilterChange('technique', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select technique" />
                </SelectTrigger>
                <SelectContent>
                  {availableTechniques.map((technique) => (
                    <SelectItem key={technique} value={technique}>
                      {technique === 'all' ? 'All Techniques' : technique}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Separator />

            {/* Category */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Category</h3>
              <Select 
                value={filters.category || "all"} 
                onValueChange={(value) => handleFilterChange('category', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {availableCategories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Separator />

            {/* Style */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Style</h3>
              <Select 
                value={filters.style || "all"} 
                onValueChange={(value) => handleFilterChange('style', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select style" />
                </SelectTrigger>
                <SelectContent>
                  {availableStyles.map((style) => (
                    <SelectItem key={style} value={style}>
                      {style === 'all' ? 'All Styles' : style}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Separator />

            {/* Dimensions */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Dimensions</h3>
              <Select 
                value={filters.dimension || "all"} 
                onValueChange={(value) => handleFilterChange('dimension', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select dimension" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sizes</SelectItem>
                  <SelectItem value="small">Small (up to 30cm)</SelectItem>
                  <SelectItem value="medium">Medium (30-100cm)</SelectItem>
                  <SelectItem value="large">Large (over 100cm)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Separator />

            {/* Year */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Year</h3>
              <Select 
                value={filters.year?.toString() || "all_years"} 
                onValueChange={(value) => handleFilterChange('year', value === "all_years" ? undefined : parseInt(value))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all_years">All Years</SelectItem>
                  {availableYears.map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Separator />

            {/* Price Range */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Price Range</h3>
              <div className="px-2">
                <Slider
                  defaultValue={priceRange}
                  max={10000}
                  step={100}
                  value={priceRange}
                  onValueChange={(value) => handleFilterChange('priceRange', value as [number, number])}
                  className="mb-6"
                />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">${priceRange[0]}</span>
                  <span className="text-sm text-muted-foreground">${priceRange[1]}</span>
                </div>
              </div>
            </div>

            <Separator />

            {/* Location */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Location</h3>
              <Select 
                value={filters.location || "All Locations"} 
                onValueChange={(value) => handleFilterChange('location', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  {availableLocations.map((location) => (
                    <SelectItem key={location} value={location}>{location}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Separator />

            {/* Country */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Country</h3>
              <Select 
                value={filters.country || "All Countries"} 
                onValueChange={(value) => handleFilterChange('country', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  {availableCountries.map((country) => (
                    <SelectItem key={country} value={country}>{country}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Separator />

            {/* Rarity */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Rarity</h3>
              <div className="flex flex-wrap gap-2">
                {rarityOptions.map((rarity) => (
                  <Badge 
                    key={rarity}
                    variant={filters.rarity === rarity ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => handleFilterChange('rarity', filters.rarity === rarity ? undefined : rarity)}
                  >
                    {rarity}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <SheetFooter className="absolute bottom-0 left-0 right-0 bg-background p-4 border-t">
            <div className="flex justify-between w-full gap-2">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={resetFilters}
              >
                Reset
              </Button>
              <Button 
                variant="default" 
                className="flex-1"
                onClick={applyFilters}
              >
                Apply Filters
              </Button>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
};

