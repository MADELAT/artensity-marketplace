
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
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { supabase } from '@/integrations/supabase/client';
import { Link } from 'react-router-dom';
import { Search, Filter, MapPin } from 'lucide-react';

// Mock artist data
const mockArtists = [
  {
    id: '1',
    first_name: 'Carmen',
    last_name: 'Herrera',
    country: 'Cuba',
    style: 'Abstracto geométrico',
    bio: 'Pionera del arte minimalista y abstracto, Carmen Herrera desarrolló un estilo distintivo basado en formas geométricas y colores contrastantes.',
    featured_artwork: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?q=80&w=858',
    avatar_url: 'https://images.unsplash.com/photo-1584184924103-e310d9dc31f7?q=80&w=1000',
  },
  {
    id: '2',
    first_name: 'Miguel',
    last_name: 'Ángel Rojas',
    country: 'Colombia',
    style: 'Arte conceptual',
    bio: 'Artista conceptual colombiano que trabaja con diversos medios, incluyendo fotografía, video e instalación, abordando temas sociales y políticos.',
    featured_artwork: 'https://images.unsplash.com/photo-1578926288207-32356bf60f27?q=80&w=987',
    avatar_url: 'https://images.unsplash.com/photo-1567784177951-6fa58317e16b?q=80&w=800',
  },
  {
    id: '3',
    first_name: 'Doris',
    last_name: 'Salcedo',
    country: 'Colombia',
    style: 'Instalación',
    bio: 'Escultora e instaladora reconocida por sus obras que abordan temas de pérdida, trauma y memoria en contextos políticos y sociales.',
    featured_artwork: 'https://images.unsplash.com/photo-1579541591970-e5943b6845fe?q=80&w=870',
    avatar_url: 'https://images.unsplash.com/photo-1607462109225-6b64ae2dd3cb?q=80&w=774',
  },
  {
    id: '4',
    first_name: 'Oscar',
    last_name: 'Murillo',
    country: 'Colombia',
    style: 'Arte contemporáneo',
    bio: 'Artista multidisciplinar que trabaja con pintura, instalación, performance y video, explorando temas de identidad, migración y globalización.',
    featured_artwork: 'https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?q=80&w=2070',
    avatar_url: 'https://images.unsplash.com/photo-1577720580479-7d839d829c73?q=80&w=870',
  },
  {
    id: '5',
    first_name: 'Beatriz',
    last_name: 'Milhazes',
    country: 'Brasil',
    style: 'Neoconcreto',
    bio: 'Pintora brasileña conocida por sus composiciones vibrantes que combinan referencias al modernismo brasileño, cultura popular y motivos barrocos.',
    featured_artwork: 'https://images.unsplash.com/photo-1551913902-c92207136625?q=80&w=1974',
    avatar_url: 'https://images.unsplash.com/photo-1591084728795-1149f32d9866?q=80&w=1000',
  },
  {
    id: '6',
    first_name: 'Gabriel',
    last_name: 'Orozco',
    country: 'México',
    style: 'Arte conceptual',
    bio: 'Artista conceptual mexicano que trabaja con fotografía, escultura, instalación y pintura, explorando la relación entre objetos cotidianos y el espacio.',
    featured_artwork: 'https://images.unsplash.com/photo-1550684376-efcbd6e3a031?q=80&w=1000',
    avatar_url: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1000',
  },
  {
    id: '7',
    first_name: 'Lygia',
    last_name: 'Clark',
    country: 'Brasil',
    style: 'Neoconcreto',
    bio: 'Artista brasileña pionera en el arte participativo, conocida por sus obras que exploran la relación entre el objeto, el cuerpo y la percepción.',
    featured_artwork: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?q=80&w=1000',
    avatar_url: 'https://images.unsplash.com/photo-1614604824107-567fe3eddba1?q=80&w=1000',
  },
  {
    id: '8',
    first_name: 'Tarsila',
    last_name: 'do Amaral',
    country: 'Brasil',
    style: 'Modernismo',
    bio: 'Pintora brasileña fundamental en el desarrollo del modernismo latinoamericano, conocida por sus paisajes estilizados y figuras inspiradas en la cultura brasileña.',
    featured_artwork: 'https://images.unsplash.com/photo-1590452224879-867e8012a828?q=80&w=1000',
    avatar_url: 'https://images.unsplash.com/photo-1594946501449-35798d8e8f95?q=80&w=1000',
  },
];

// Available styles for filtering
const styles = [
  'Todos los estilos',
  'Abstracto geométrico',
  'Arte conceptual',
  'Instalación',
  'Arte contemporáneo',
  'Neoconcreto',
  'Modernismo',
];

// Available countries for filtering
const countries = [
  'Todos los países',
  'Cuba',
  'Colombia',
  'Brasil',
  'México',
];

export default function Artists() {
  const [artists, setArtists] = useState(mockArtists);
  const [loading, setLoading] = useState(true);
  const [styleFilter, setStyleFilter] = useState('Todos los estilos');
  const [countryFilter, setCountryFilter] = useState('Todos los países');
  const [searchTerm, setSearchTerm] = useState('');
  const [featuredOnly, setFeaturedOnly] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    fetchArtists();
  }, []);
  
  const fetchArtists = async () => {
    try {
      setLoading(true);
      
      // Attempt to fetch real artists from Supabase
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('role', 'artist');
        
      if (error) throw error;
      
      // If we got real data, use it; otherwise, use mock data
      if (data && data.length > 0) {
        setArtists(data);
      } else {
        setArtists(mockArtists);
      }
    } catch (error) {
      console.error('Error fetching artists:', error);
      // Fallback to mock data in case of error
      setArtists(mockArtists);
      toast({
        title: "Información de ejemplo",
        description: "Mostrando artistas de ejemplo",
      });
    } finally {
      setLoading(false);
    }
  };
  
  // Filter artists based on selected filters
  const filteredArtists = artists.filter((artist) => {
    const matchesStyle = styleFilter === 'Todos los estilos' || artist.style === styleFilter;
    const matchesCountry = countryFilter === 'Todos los países' || artist.country === countryFilter;
    const matchesSearch = searchTerm === '' || 
      `${artist.first_name} ${artist.last_name}`.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFeatured = !featuredOnly || (featuredOnly && artist.featured_artwork);
    
    return matchesStyle && matchesCountry && matchesSearch && matchesFeatured;
  });
  
  return (
    <Layout>
      <div className="relative min-h-screen">
        {/* Background */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?q=80&w=2070"
            alt="Art Gallery Background"
            className="absolute inset-0 h-full w-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/90 to-background/95"></div>
        </div>
        
        <div className="container px-4 py-12 mx-auto">
          <h1 className="text-4xl font-serif font-light mb-2 text-center">Artistas ArTendency</h1>
          <p className="text-lg text-muted-foreground mb-8 text-center max-w-2xl mx-auto">
            Descubre artistas emergentes y consolidados de todo el mundo, con estilos y perspectivas únicas.
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
                    placeholder="Buscar artistas..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-medium mb-3 flex items-center gap-2">
                    <Filter className="h-4 w-4" /> Filtros
                  </h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Estilo</p>
                      <Select 
                        value={styleFilter} 
                        onValueChange={setStyleFilter}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {styles.map((style) => (
                            <SelectItem key={style} value={style}>{style}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">País</p>
                      <Select 
                        value={countryFilter} 
                        onValueChange={setCountryFilter}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {countries.map((country) => (
                            <SelectItem key={country} value={country}>{country}</SelectItem>
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
                        Solo artistas destacados
                      </label>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    setStyleFilter('Todos los estilos');
                    setCountryFilter('Todos los países');
                    setSearchTerm('');
                    setFeaturedOnly(false);
                  }}
                >
                  Limpiar filtros
                </Button>
              </div>
            </div>
            
            {/* Artists grid */}
            <div className="md:col-span-3">
              {loading ? (
                <div className="flex justify-center items-center py-20">
                  <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary border-r-transparent"></div>
                  <span className="ml-2">Cargando artistas...</span>
                </div>
              ) : filteredArtists.length === 0 ? (
                <div className="text-center py-20 bg-white/50 backdrop-blur-sm rounded-lg border border-gray-100">
                  <p className="text-xl text-muted-foreground">No se encontraron artistas</p>
                  <Button 
                    variant="link" 
                    className="mt-2"
                    onClick={() => {
                      setStyleFilter('Todos los estilos');
                      setCountryFilter('Todos los países');
                      setSearchTerm('');
                      setFeaturedOnly(false);
                    }}
                  >
                    Limpiar filtros
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredArtists.map((artist) => (
                    <Link to={`/artist/${artist.id}`} key={artist.id}>
                      <Card className="overflow-hidden h-full transition-all hover:shadow-lg">
                        <div className="aspect-[3/2] relative">
                          {artist.featured_artwork ? (
                            <img
                              src={artist.featured_artwork}
                              alt={`${artist.first_name} ${artist.last_name} - Obra destacada`}
                              className="object-cover h-full w-full"
                            />
                          ) : artist.avatar_url ? (
                            <img
                              src={artist.avatar_url}
                              alt={`${artist.first_name} ${artist.last_name}`}
                              className="object-cover h-full w-full"
                            />
                          ) : (
                            <div className="h-full w-full bg-muted flex items-center justify-center">
                              <span className="text-4xl font-light font-serif">
                                {artist.first_name?.charAt(0)}{artist.last_name?.charAt(0)}
                              </span>
                            </div>
                          )}
                          
                          {/* Artist avatar overlay */}
                          <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur-sm rounded-full p-1">
                            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white">
                              {artist.avatar_url ? (
                                <img
                                  src={artist.avatar_url}
                                  alt={`${artist.first_name} ${artist.last_name}`}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                                  <span className="text-xl font-serif">
                                    {artist.first_name?.charAt(0)}{artist.last_name?.charAt(0)}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <CardContent className="pt-4">
                          <h3 className="text-lg font-medium">
                            {artist.first_name} {artist.last_name}
                          </h3>
                          
                          <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                            <MapPin className="h-3.5 w-3.5" />
                            <span>{artist.country || "Internacional"}</span>
                          </div>
                          
                          {artist.style && (
                            <Badge variant="outline" className="mt-2">
                              {artist.style}
                            </Badge>
                          )}
                          
                          <p className="text-sm text-muted-foreground mt-3 line-clamp-2">
                            {artist.bio || "Artista contemporáneo en ArTendency"}
                          </p>
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
