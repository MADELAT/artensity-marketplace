
import { useState, useEffect } from 'react';
import { Layout } from "@/components/layout/Layout";
import { supabase } from '@/integrations/supabase/client';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Loader2, Search } from 'lucide-react';

export default function Artists() {
  const [artists, setArtists] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [countryFilter, setCountryFilter] = useState('');
  const [styleFilter, setStyleFilter] = useState('');
  
  // Fetch artists on component mount
  useEffect(() => {
    fetchArtists();
  }, []);
  
  const fetchArtists = async () => {
    try {
      setIsLoading(true);
      
      // Fetch profiles with role 'artist'
      const { data: artistData, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('role', 'artist');
        
      if (error) {
        throw error;
      }
      
      // For each artist, fetch their artworks
      if (artistData) {
        const artistsWithArtworks = await Promise.all(
          artistData.map(async (artist) => {
            const { data: artworks } = await supabase
              .from('artworks')
              .select('*')
              .eq('artist_id', artist.id)
              .limit(4);
              
            return {
              ...artist,
              artworks: artworks || [],
            };
          })
        );
        
        setArtists(artistsWithArtworks);
      }
    } catch (error) {
      console.error("Error fetching artists:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Filter artists based on search term and filters
  const filteredArtists = artists.filter(artist => {
    const matchesSearch = searchTerm === '' || 
      (artist.first_name && artist.first_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (artist.last_name && artist.last_name.toLowerCase().includes(searchTerm.toLowerCase()));
      
    // Add more filter conditions here as needed
    // For this example, we're not implementing all filters yet
      
    return matchesSearch;
  });
  
  return (
    <Layout>
      <div className="relative min-h-screen">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1578926288207-a90a5366759d?q=80&w=2070"
            alt="Gallery Interior"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
        </div>
        
        <div className="container mx-auto px-4 py-24 relative z-10">
          <div className="max-w-5xl mx-auto text-white space-y-10">
            <div className="text-center space-y-4">
              <h1 className="text-5xl font-serif font-light tracking-wider">Artistas</h1>
              <p className="text-xl text-white/80 max-w-2xl mx-auto">
                Descubre artistas emergentes y establecidos de todo el mundo
              </p>
            </div>
            
            {/* Filters */}
            <div className="backdrop-blur-sm bg-white/5 p-6 rounded-lg border border-white/10 space-y-4">
              <h2 className="text-xl font-serif">Filtrar artistas</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
                    <Input 
                      placeholder="Buscar por nombre"
                      className="pl-9 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <Select value={countryFilter} onValueChange={setCountryFilter}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="País" />
                    </SelectTrigger>
                    <SelectContent className="bg-black/90 border-white/20 text-white">
                      <SelectItem value="" className="focus:bg-white/10 focus:text-white">Todos los países</SelectItem>
                      <SelectItem value="es" className="focus:bg-white/10 focus:text-white">España</SelectItem>
                      <SelectItem value="fr" className="focus:bg-white/10 focus:text-white">Francia</SelectItem>
                      <SelectItem value="it" className="focus:bg-white/10 focus:text-white">Italia</SelectItem>
                      <SelectItem value="us" className="focus:bg-white/10 focus:text-white">Estados Unidos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Select value={styleFilter} onValueChange={setStyleFilter}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="Estilo" />
                    </SelectTrigger>
                    <SelectContent className="bg-black/90 border-white/20 text-white">
                      <SelectItem value="" className="focus:bg-white/10 focus:text-white">Todos los estilos</SelectItem>
                      <SelectItem value="abstract" className="focus:bg-white/10 focus:text-white">Abstracto</SelectItem>
                      <SelectItem value="figurative" className="focus:bg-white/10 focus:text-white">Figurativo</SelectItem>
                      <SelectItem value="conceptual" className="focus:bg-white/10 focus:text-white">Conceptual</SelectItem>
                      <SelectItem value="surrealist" className="focus:bg-white/10 focus:text-white">Surrealista</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            {/* Artist list */}
            {isLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-12 w-12 animate-spin text-white/50" />
              </div>
            ) : filteredArtists.length > 0 ? (
              <div className="space-y-8">
                {filteredArtists.map(artist => (
                  <div key={artist.id} className="backdrop-blur-sm bg-white/5 p-6 rounded-lg border border-white/10">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="md:w-1/3">
                        <div className="flex items-center gap-4">
                          <Avatar className="h-16 w-16 border-2 border-white/20">
                            {artist.avatar_url ? (
                              <AvatarImage src={artist.avatar_url} alt={`${artist.first_name} ${artist.last_name}`} />
                            ) : (
                              <AvatarFallback className="bg-primary text-xl">
                                {artist.first_name?.[0]}{artist.last_name?.[0]}
                              </AvatarFallback>
                            )}
                          </Avatar>
                          <div>
                            <h3 className="text-xl font-medium">{artist.first_name} {artist.last_name}</h3>
                            <p className="text-sm text-white/70">
                              {artist.country || 'Artista internacional'}
                            </p>
                          </div>
                        </div>
                        
                        <div className="mt-4 space-y-2">
                          <p className="text-sm text-white/80">
                            {artist.bio || 'Este artista aún no ha completado su biografía.'}
                          </p>
                          
                          <Link to={`/artists/${artist.id}`}>
                            <Button variant="outline" className="mt-2 text-white border-white/30 bg-white/10 hover:bg-white/20">
                              Ver perfil completo
                            </Button>
                          </Link>
                        </div>
                      </div>
                      
                      <div className="md:w-2/3">
                        <h4 className="text-sm font-medium mb-3">Obras destacadas</h4>
                        {artist.artworks && artist.artworks.length > 0 ? (
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                            {artist.artworks.map((artwork: any) => (
                              <Link key={artwork.id} to={`/artwork/${artwork.id}`} className="group">
                                <div className="aspect-square rounded overflow-hidden">
                                  <img 
                                    src={artwork.image_url}
                                    alt={artwork.title}
                                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                                  />
                                </div>
                                <p className="text-xs mt-1 truncate">{artwork.title}</p>
                              </Link>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm text-white/60 italic">
                            Este artista aún no ha subido obras.
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 backdrop-blur-sm bg-white/5 rounded-lg border border-white/10">
                <p className="text-white/80">No se encontraron artistas con los filtros seleccionados.</p>
                <Button 
                  variant="outline" 
                  className="mt-4 text-white border-white/30 bg-white/10 hover:bg-white/20"
                  onClick={() => {
                    setSearchTerm('');
                    setCountryFilter('');
                    setStyleFilter('');
                  }}
                >
                  Limpiar filtros
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
