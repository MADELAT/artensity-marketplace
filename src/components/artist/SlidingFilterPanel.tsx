// SlidingFilterPanel.tsx

import { useState, useEffect, useMemo } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import countryList from "react-select-country-list";
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
  const [filters, setFilters] = useState<FilterValues>(initialFilters);
  const [open, setOpen] = useState(false);
  const [availableSeries, setAvailableSeries] = useState<string[]>(["All Series"]);

  const availableTechniques = [
    "all", "Oil", "Acrylic", "Watercolor", "Mixed Media",
    "Graphite", "Pencil", "Carving", "Casting",
    "Serigraphy", "Digital", "Other"
  ];

  const availableStyles = [
    "all", "Abstract", "Minimalism", "Conceptual", "Expressionism",
    "Figurative", "Surrealism", "Pop Art", "Realism",
    "Geometric", "HyperRealism", "Street Art", "Other"
  ];

  const availableCategories = filterOptions.categories || [
    "all", "Painting", "Sculpture", "Photography", "Drawing", "Engraving",
    "Printmaking", "Digital art", "Collage", "Conceptual art", "Textile art",
    "Installation", "Art object", "Video art", "Other"
  ];

  const [availableYears, setAvailableYears] = useState<number[]>(
    filterOptions.years || Array.from({ length: 50 }, (_, i) => new Date().getFullYear() - i)
  );

  const countryOptions = useMemo(() => {
    const options = countryList().getData();
    return [{ label: "All Countries", value: "all" }, ...options];
  }, []);

  const [availableCountries] = useState<string[]>(
    countryOptions.map((c) => c.label)
  );

  const [availableLocations, setAvailableLocations] = useState<string[]>(["All Locations"]);
  const rarityOptions = ["Unique piece", "Limited edition", "Open edition"];
  const [priceRange, setPriceRange] = useState<[number, number]>(
    filters.priceRange || [0, 10000]
  );

  useEffect(() => {
    const fetchSeries = async () => {
      const { data, error } = await supabase
        .from("public_series")
        .select("series");

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

    const fetchLocations = async () => {
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

    fetchSeries();
    fetchLocations();
  }, []);

  const applyFilters = () => {
    onFilterChange(filters);
    setOpen(false);
  };

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

  const handleFilterChange = (field: string, value: any) => {
    setFilters({ ...filters, [field]: value });
    if (field === 'priceRange') setPriceRange(value);
  };

  return (
    <>
      <Button
        variant="outline"
        className="flex items-center gap-2 mb-4"
        onClick={() => setOpen(true)}
        id={id || `${Math.random().toString(36).substring(2, 9)}-filter-button`}
      >
        <SlidersHorizontal className="w-4 h-4" />
        <span>Filter</span>
      </Button>

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
            {[
              { label: "Series", field: "series", options: availableSeries },
              { label: "Technique", field: "technique", options: availableTechniques },
              { label: "Category", field: "category", options: availableCategories },
              { label: "Style", field: "style", options: availableStyles },
              { label: "Dimensions", field: "dimension", options: ["all", "small", "medium", "large"] },
              { label: "Location", field: "location", options: availableLocations },
              { label: "Country", field: "country", options: availableCountries },
            ].map(({ label, field, options }) => (
              <div key={field} className="space-y-2">
                <h3 className="text-sm font-medium">{label}</h3>
                <Select
                  value={filters[field] || options[0]}
                  onValueChange={(value) => handleFilterChange(field, value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={`Select ${label.toLowerCase()}`} />
                  </SelectTrigger>
                  <SelectContent>
                    {options.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ))}

            {/* Year */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Year</h3>
              <Select
                value={filters.year?.toString() || "all_years"}
                onValueChange={(value) =>
                  handleFilterChange("year", value === "all_years" ? undefined : parseInt(value))
                }
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

            {/* Price Range */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Price Range</h3>
              <div className="px-2">
                <Slider
                  defaultValue={priceRange}
                  max={10000}
                  step={100}
                  value={priceRange}
                  onValueChange={(value) =>
                    handleFilterChange("priceRange", value as [number, number])
                  }
                  className="mb-6"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
            </div>

            {/* Rarity */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Rarity</h3>
              <div className="flex flex-wrap gap-2">
                {rarityOptions.map((rarity) => (
                  <Badge
                    key={rarity}
                    variant={filters.rarity === rarity ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() =>
                      handleFilterChange(
                        "rarity",
                        filters.rarity === rarity ? undefined : rarity
                      )
                    }
                  >
                    {rarity}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <SheetFooter className="absolute bottom-0 left-0 right-0 bg-background p-4 border-t">
            <div className="flex justify-between w-full gap-2">
              <Button variant="outline" className="flex-1" onClick={resetFilters}>
                Reset
              </Button>
              <Button variant="default" className="flex-1" onClick={applyFilters}>
                Apply Filters
              </Button>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
};
