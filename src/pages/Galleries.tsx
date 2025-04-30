
import { useState, useEffect } from 'react';
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { supabase } from '@/integrations/supabase/client';
import { Link } from 'react-router-dom';
import { MapPin, Search, Filter, Building, Users } from 'lucide-react';
import { SlidingFilterPanel, FilterValues } from "@/components/artist/SlidingFilterPanel";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";

// Define the Gallery interface for type safety
interface Gallery {
  id: string;
  first_name: string;
  location: string;
  bio: string;
  avatar_url: string;
  specialization: string;
  founded: string;
  artists_count: number;
  featured_image: string;
}

// Mock gallery data
const mockGalleries: Gallery[] = [
  {
    id: '1',
    first_name: 'Galería Marlborough',
    location: 'Madrid',
    bio: 'Galería de arte contemporáneo con sede en Madrid, representando a artistas internacionales y españoles de primer nivel.',
    avatar_url: 'https://images.unsplash.com/photo-1633544325243-67f3ca0310dc?q=80&w=1974',
    specialization: 'Arte contemporáneo',
    founded: '1986',
    artists_count: 24,
    featured_image: 'https://images.unsplash.com/photo-1577720580479-7d839d829c73?q=80&w=870',
  },
  {
    id: '2',
    first_name: 'Galería Helga de Alvear',
    location: 'Madrid',
    bio: 'Una de las galerías más importantes de España, especializada en arte conceptual y multimedia contemporáneo.',
    avatar_url: 'https://images.unsplash.com/photo-1630483158106-b4abbce3324c?q=80&w=1974',
    specialization: 'Arte conceptual',
    founded: '1995',
    artists_count: 31,
    featured_image: 'https://images.unsplash.com/photo-1581362716668-0142af34025b?q=80&w=1000',
  },
  {
    id: '3',
    first_name: 'Galería Mayoral',
    location: 'Barcelona',
    bio: 'Especializada en las vanguardias históricas y arte español del siglo XX, con foco en Picasso, Miró y Dalí.',
    avatar_url: 'https://images.unsplash.com/photo-1570701123784-40934ddd1dfb?q=80&w=1000',
    specialization: 'Arte moderno',
    founded: '1989',
    artists_count: 18,
    featured_image: 'https://images.unsplash.com/photo-1633544325243-67f3ca0310dc?q=80&w=1974',
  },
  {
    id: '4',
    first_name: 'Galería Travesía Cuatro',
    location: 'Madrid',
    bio: 'Galería contemporánea con espacios en Madrid y Ciudad de México, enfocada en artistas latinoamericanos y españoles.',
    avatar_url: 'https://images.unsplash.com/photo-1577116772599-a34e0329e14b?q=80&w=1000',
    specialization: 'Arte contemporáneo',
    founded: '2003',
    artists_count: 22,
    featured_image: 'https://images.unsplash.com/photo-1603039078583-13468e35b7b9?q=80&w=1000',
  },
  {
    id: '5',
    first_name: 'Galería Juana de Aizpuru',
    location: 'Madrid',
    bio: 'Pionera del arte contemporáneo en España, fundadora de ARCO y promotora del arte conceptual desde los años 70.',
    avatar_url: 'https://images.unsplash.com/photo-1581101767113-1677fc2beaa8?q=80&w=1000',
    specialization: 'Arte conceptual',
    founded: '1970',
    artists_count: 16,
    featured_image: 'https://images.unsplash.com/photo-1545033131-485ea67fd7c3?q=80&w=1000',
  },
  {
    id: '6',
    first_name: 'Galería Carles Taché',
    location: 'Barcelona',
    bio: 'Galería de referencia en Barcelona, con una programación que alterna artistas consolidados y emergentes.',
    avatar_url: 'https://images.unsplash.com/photo-1536924430914-91f9e2041b83?q=80&w=1000',
    specialization: 'Arte contemporáneo',
    founded: '1986',
    artists_count: 27,
    featured_image: 'https://images.unsplash.com/photo-1616159988359-8578577de3c7?q=80&w=1000',
  },
  {
    id: '7',
    first_name: 'La Caja Negra',
    location: 'Madrid',
    bio: 'Especializada en obra gráfica y ediciones de artistas contemporáneos nacionales e internacionales.',
    avatar_url: 'https://images.unsplash.com/photo-1570037258450-39ef035e27e0?q=80&w=1000',
    specialization: 'Obra gráfica',
    founded: '2002',
    artists_count: 42,
    featured_image: 'https://images.unsplash.com/photo-1594639457311-9d15092c30b7?q=80&w=1000',
  },
  {
    id: '8',
    first_name: 'Galería Joan Prats',
    location: 'Barcelona',
    bio: 'Una de las galerías más veteranas de Barcelona, comprometida con el arte contemporáneo desde los años 70.',
    avatar_url: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?q=80&w=1000',
    specialization: 'Arte contemporáneo',
    founded: '1976',
    artists_count: 29,
    featured_image: 'https://images.unsplash.com/photo-1596394619971-7c59e6b1317b?q=80&w=1000',
  }
];

// Available locations for filtering
const locations = [
  'Todas las ciudades',
  'Madrid',
  'Barcelona',
  'Valencia',
  'Bilbao',
  'Málaga',
  'Sevilla',
];

// Available specializations for filtering
const specializations = [
  'Todas las especialidades',
  'Arte contemporáneo',
  'Arte conceptual',
  'Arte moderno',
  'Obra gráfica',
  'Fotografía',
];

export default function Galleries() {
  const [galleries, setGalleries] = useState<Gallery[]>(mockGalleries);
  const [loading, setLoading] = useState(true);
  const [locationFilter, setLocationFilter] = useState('Todas las ciudades');
  const [specializationFilter, setSpecializationFilter] = useState('Todas las especialidades');
  const [searchTerm, setSearchTerm] = useState('');
  const [featuredOnly, setFeaturedOnly] = useState(false);
  const [filters, setFilters] = useState<FilterValues>({});
  const { toast } = useToast();
  const isMobile = useIsMobile();
  
  useEffect(() => {
    fetchGalleries();
  }, []);
  
  const fetchGalleries = async () => {
    try {
      setLoading(true);
      
      // Attempt to fetch real galleries from Supabase
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('role', 'gallery');
        
      if (error) throw error;
      
      // If we got real data, use it; otherwise, use mock data
      if (data && data.length > 0) {
        // Transform the data to match our Gallery interface
        const transformedData: Gallery[] = data.map(profile => ({
          id: profile.id,
          first_name: profile.first_name || '',
          location: profile.city || 'Unknown',
          bio: profile.bio || 'Gallery on ArTendency',
          avatar_url: profile.avatar_url || '',
          specialization: profile.specialization || 'Arte contemporáneo',
          founded: profile.founded_year || '',
          artists_count: profile.artists_count || Math.floor(Math.random() * 30) + 5,
          featured_image: profile.featured_image || '',
        }));
        setGalleries(transformedData);
      } else {
        setGalleries(mockGalleries);
      }
    } catch (error) {
      console.error('Error fetching galleries:', error);
      // Fallback to mock data in case of error
      setGalleries(mockGalleries);
      toast({
        title: "Información de ejemplo",
        description: "Mostrando galerías de ejemplo",
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle filter changes from SlidingFilterPanel
  const handleFilterChange = (newFilters: FilterValues) => {
    setFilters(newFilters);
    
    // Update existing filters if applicable
    if (newFilters.location) {
      setLocationFilter(newFilters.location === 'All Locations' ? 'Todas las ciudades' : newFilters.location);
    }
    
    if (newFilters.style) {
      setSpecializationFilter(newFilters.style === 'all' ? 'Todas las especialidades' : newFilters.style);
    }
    
    console.log("Applied filters:", newFilters);
  };
  
  // Filter galleries based on selected filters
  const filteredGalleries = galleries.filter((gallery) => {
    const matchesLocation = locationFilter === 'Todas las ciudades' || gallery.location === locationFilter;
    const matchesSpecialization = specializationFilter === 'Todas las especialidades' || gallery.specialization === specializationFilter;
    const matchesSearch = searchTerm === '' || 
      gallery.first_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFeatured = !featuredOnly || (featuredOnly && gallery.featured_image);
    
    // Additional filters from SlidingFilterPanel
    const matchesExtraFilters = Object.entries(filters).every(([key, value]) => {
      if (!value || key === 'location' || key === 'style') return true;
      if (key === 'country' && value !== 'All Countries') {
        // For simplicity, we're assuming Spanish galleries unless specified otherwise
        return value === 'Spain';
      }
      return true;
    });
    
    return matchesLocation && matchesSpecialization && matchesSearch && matchesFeatured && matchesExtraFilters;
  });
  
  return (
    <Layout>
      <div className="relative min-h-screen">
        {/* Background */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1577720580479-7d839d829c73?q=80&w=2070"
            alt="Gallery Interior Background"
            className="absolute inset-0 h-full w-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/90 to-background/95"></div>
        </div>
        
        <div className="container px-4 py-12 mx-auto">
          <h1 className="text-4xl font-serif font-light mb-2 text-center">Galerías ArTendency</h1>
          <p className="text-lg text-muted-foreground mb-8 text-center max-w-2xl mx-auto">
            Explora las galerías más exclusivas, desde espacios consagrados hasta proyectos emergentes con propuestas innovadoras.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Filters sidebar */}
            <div className="bg-white/50 backdrop-blur-sm p-6 rounded-lg border border-gray-100 h-fit">
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-3 flex items-center gap-2">
                    <Search className="h-4 w-4" /> Buscar
                  </h3>
                  <Input 
                    placeholder="Buscar galerías..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <Separator />
                
                {/* New sliding filter panel integration */}
                <div className="mb-4">
                  {isMobile ? (
                    <Drawer>
                      <DrawerTrigger asChild>
                        <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                          <Filter className="h-4 w-4" />
                          <span>Filtros avanzados</span>
                        </Button>
                      </DrawerTrigger>
                      <DrawerContent>
                        <div className="px-4 py-6">
                          <SlidingFilterPanel onFilterChange={handleFilterChange} initialFilters={filters} />
                        </div>
                      </DrawerContent>
                    </Drawer>
                  ) : (
                    <Button 
                      variant="outline" 
                      className="w-full flex items-center justify-center gap-2"
                      onClick={() => document.getElementById('gallery-filter-button')?.click()}
                    >
                      <Filter className="h-4 w-4" />
                      <span>Filtros avanzados</span>
                    </Button>
                  )}
                </div>
                
                <div className="hidden">
                  <SlidingFilterPanel 
                    onFilterChange={handleFilterChange} 
                    initialFilters={filters} 
                  />
                </div>
                
                <div>
                  <h3 className="font-medium mb-3 flex items-center gap-2">
                    <Filter className="h-4 w-4" /> Filtros
                  </h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Ubicación</p>
                      <Select 
                        value={locationFilter} 
                        onValueChange={setLocationFilter}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {locations.map((location) => (
                            <SelectItem key={location} value={location}>{location}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Especialidad</p>
                      <Select 
                        value={specializationFilter} 
                        onValueChange={setSpecializationFilter}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {specializations.map((specialization) => (
                            <SelectItem key={specialization} value={specialization}>{specialization}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="featured" 
                        checked={featuredOnly}
                        onCheckedChange={(checked) => setFeaturedOnly(!!checked)}
                      />
                      <label
                        htmlFor="featured"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Solo galerías destacadas
                      </label>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    setLocationFilter('Todas las ciudades');
                    setSpecializationFilter('Todas las especialidades');
                    setSearchTerm('');
                    setFeaturedOnly(false);
                    setFilters({});
                  }}
                >
                  Limpiar filtros
                </Button>
              </div>
            </div>
            
            {/* Galleries grid */}
            <div className="md:col-span-3">
              {loading ? (
                <div className="flex justify-center items-center py-20">
                  <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary border-r-transparent"></div>
                  <span className="ml-2">Cargando galerías...</span>
                </div>
              ) : filteredGalleries.length === 0 ? (
                <div className="text-center py-20 bg-white/50 backdrop-blur-sm rounded-lg border border-gray-100">
                  <p className="text-xl text-muted-foreground">No se encontraron galerías</p>
                  <Button 
                    variant="link" 
                    className="mt-2"
                    onClick={() => {
                      setLocationFilter('Todas las ciudades');
                      setSpecializationFilter('Todas las especialidades');
                      setSearchTerm('');
                      setFeaturedOnly(false);
                      setFilters({});
                    }}
                  >
                    Limpiar filtros
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredGalleries.map((gallery) => (
                    <Link to={`/gallery/${gallery.id}`} key={gallery.id}>
                      <Card className="overflow-hidden h-full transition-all hover:shadow-lg">
                        <div className="aspect-[16/9] relative">
                          {gallery.featured_image ? (
                            <img
                              src={gallery.featured_image}
                              alt={gallery.first_name}
                              className="object-cover h-full w-full"
                            />
                          ) : gallery.avatar_url ? (
                            <img
                              src={gallery.avatar_url}
                              alt={gallery.first_name}
                              className="object-cover h-full w-full"
                            />
                          ) : (
                            <div className="h-full w-full bg-muted flex items-center justify-center">
                              <Building className="h-12 w-12 text-muted-foreground" />
                            </div>
                          )}
                          
                          {/* Gallery badge overlay */}
                          <div className="absolute top-4 right-4">
                            <Badge className="bg-white/80 backdrop-blur-sm text-foreground hover:bg-white/70">
                              {gallery.specialization || "Galería de arte"}
                            </Badge>
                          </div>
                        </div>
                        
                        <CardContent className="pt-4">
                          <div className="flex justify-between items-start">
                            <h3 className="text-lg font-medium">
                              {gallery.first_name}
                            </h3>
                            {gallery.founded && (
                              <Badge variant="outline" className="text-xs">
                                Desde {gallery.founded}
                              </Badge>
                            )}
                          </div>
                          
                          <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                            <MapPin className="h-3.5 w-3.5" />
                            <span>{gallery.location || "España"}</span>
                          </div>
                          
                          <p className="text-sm text-muted-foreground mt-3 line-clamp-2">
                            {gallery.bio || "Galería de arte contemporáneo en ArTendency"}
                          </p>
                          
                          <div className="mt-3 flex items-center gap-2">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{gallery.artists_count} artistas</span>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
