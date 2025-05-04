import { useState, useEffect, useMemo } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import countryList from "react-select-country-list";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { X, SlidersHorizontal } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

/* ──────────────────────────────────────────────────────────
   Types
   ────────────────────────────────────────────────────────── */
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
  tags?: string[];
}

export interface FilterValues {
  series?: string;
  technique?: string;
  category?: string;
  style?: string;
  dimension?: string;
  /* ⇢ ahora puede recibir varios años */
  years?: number[];
  priceRange?: [number, number];
  location?: string;
  country?: string;
  rarity?: string;
  tag?: string;
  sortBy?: string;
  [key: string]: any;
}

interface SlidingFilterPanelProps {
  onFilterChange: (filters: FilterValues) => void;
  initialFilters?: FilterValues;
  filterOptions?: FilterOptions;
  id?: string;
}

/* ──────────────────────────────────────────────────────────
   Component
   ────────────────────────────────────────────────────────── */
export const SlidingFilterPanel = ({
  onFilterChange,
  initialFilters = {},
  filterOptions = {},
  id,
}: SlidingFilterPanelProps) => {
  /* ── State ─────────────────────────────────────────────── */
  const [filters, setFilters] = useState<FilterValues>({
    ...initialFilters,
    years: initialFilters.years ?? [],
  });
  const [open, setOpen] = useState(false);
  const [availableSeries, setAvailableSeries] = useState<string[]>(["All Series"]);
  const [availableTags, setAvailableTags] = useState<string[]>(["All tags"]);

  /* ── Static lists ──────────────────────────────────────── */
  const availableTechniques = [
    "all",
    "Oil",
    "Acrylic",
    "Watercolor",
    "Mixed Media",
    "Graphite",
    "Pencil",
    "Carving",
    "Casting",
    "Serigraphy",
    "Digital",
    "Other",
  ];

  const availableStyles = [
    "all",
    "Abstract",
    "Minimalism",
    "Conceptual",
    "Expressionism",
    "Figurative",
    "Surrealism",
    "Pop Art",
    "Realism",
    "Geometric",
    "HyperRealism",
    "Street Art",
    "Other",
  ];

  const availableCategories = filterOptions.categories || [
    "all",
    "Painting",
    "Sculpture",
    "Photography",
    "Drawing",
    "Engraving",
    "Printmaking",
    "Digital art",
    "Collage",
    "Conceptual art",
    "Textile art",
    "Installation",
    "Art object",
    "Video art",
    "Other",
  ];

  const [availableYears] = useState<number[]>(
    filterOptions.years ||
      Array.from({ length: 50 }, (_, i) => new Date().getFullYear() - i)
  );

  /* ── Countries & locations ─────────────────────────────── */
  const countryOptions = useMemo(() => {
    const options = countryList().getData();
    return [{ label: "All Countries", value: "all" }, ...options];
  }, []);

  const [availableCountries] = useState<string[]>(
    countryOptions.map((c) => c.label)
  );

  const [availableLocations, setAvailableLocations] = useState<string[]>([
    "All Locations",
  ]);
  const rarityOptions = ["Unique piece", "Limited edition", "Open edition"];

  const [priceRange, setPriceRange] = useState<[number, number]>(
    filters.priceRange || [0, 10000]
  );

  /* ── Fetch dynamic data ────────────────────────────────── */
  useEffect(() => {
    /* Series */
    const fetchSeries = async () => {
      const { data, error } = await supabase.from("public_series").select("series");
      if (!error && data) {
        const seriesList = data
          .map((r) => r.series)
          .filter((s): s is string => !!s)
          .sort();
        setAvailableSeries(["All Series", ...seriesList]);
      }
    };

    /* Locations */
    const fetchLocations = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("city")
        .not("city", "is", null);
      if (!error && data) {
        const uniqueCities = Array.from(
          new Set(data.map((item) => item.city))
        ).sort();
        setAvailableLocations(["All Locations", ...uniqueCities]);
      }
    };

    /* Tags */
    const fetchTags = async () => {
      const { data, error } = await supabase.from("tags").select("name");
      if (!error && data) {
        const tagNames = data
          .map((t) => t.name)
          .sort((a, b) => a.localeCompare(b));
        setAvailableTags(["all", ...tagNames]);
      }
    };

    fetchSeries();
    fetchLocations();
    fetchTags();
  }, []);

  /* ── Handlers ──────────────────────────────────────────── */
  const handleFilterChange = (field: string, value: any) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
    if (field === "priceRange") setPriceRange(value);
  };

  const toggleYear = (year: number) => {
    setFilters((prev) => {
      const years = prev.years ?? [];
      const exists = years.includes(year);
      return {
        ...prev,
        years: exists ? years.filter((y) => y !== year) : [...years, year],
      };
    });
  };

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
      years: [],
      priceRange: [0, 10000],
      location: "All Locations",
      country: "All Countries",
      rarity: undefined,
      tag: "all",
      sortBy: "newest",
    });
    setPriceRange([0, 10000]);
  };

  /* ── Render ────────────────────────────────────────────── */
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
        <SheetContent
          side="left"
          className="w-full sm:w-[350px] overflow-y-auto pb-20"
        >
          {/* Header */}
          <SheetHeader>
            <SheetTitle className="flex items-center justify-between">
              <span>Filter Options</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </SheetTitle>
          </SheetHeader>

          {/* Filters */}
          <div className="space-y-6 mt-6">
            {/* Simple selects */}
            {[
              { label: "Series", field: "series", options: availableSeries },
              { label: "Category", field: "category", options: availableCategories },
              { label: "Technique", field: "technique", options: availableTechniques },
              { label: "Style", field: "style", options: availableStyles },
              { label: "Tag", field: "tag", options: availableTags },
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
                    <SelectValue placeholder={`Select ${label}`} />
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

            {/* Dimensions */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-medium">Dimensions</h3>
                <span className="text-xs text-muted-foreground text-right leading-snug">
                  Small: ≤ 50&nbsp;cm
                  <br />
                  Medium: 51–120&nbsp;cm
                  <br />
                  Large: &gt; 120&nbsp;cm
                </span>
              </div>
              <Select
                value={filters.dimension || "All"}
                onValueChange={(val) => handleFilterChange("dimension", val)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select dimension" />
                </SelectTrigger>
                <SelectContent>
                  {["All", "Small", "Medium", "Large"].map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Years – multiselect via badges */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Years&nbsp;(multi‑select)</h3>
              <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto pr-2">
                {availableYears.map((year) => (
                  <Badge
                    key={year}
                    variant={
                      filters.years?.includes(year) ? "default" : "outline"
                    }
                    className="cursor-pointer"
                    onClick={() => toggleYear(year)}
                  >
                    {year}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Price range */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Price Range</h3>
              <div className="px-2">
                <Slider
                  defaultValue={priceRange}
                  max={50000}
                  step={100}
                  value={priceRange}
                  onValueChange={(val) =>
                    handleFilterChange("priceRange", val as [number, number])
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

          {/* Footer */}
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
