
import { useState, useEffect } from 'react';
import { Layout } from "@/components/layout/Layout";
import { supabase } from '@/integrations/supabase/client';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Search, MapPin } from 'lucide-react';

export default function Galleries() {
  const [galleries, setGalleries] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  
  // Fetch galleries on component mount
  useEffect(() => {
    fetchGalleries();
  }, []);
  
  const fetchGalleries = async () => {
    try {
      setIsLoading(true);
      
      // Fetch profiles with role 'gallery'
      const { data: galleryData, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('role', 'gallery');
        
      if (error) {
        throw error;
      }
      
      // For each gallery, fetch their artists/artworks
      if (galleryData) {
        // In a real implementation, we would fetch associated artists
        // For now, we'll just show the gallery profiles
        setGalleries(galleryData);
      }
    } catch (error) {
      console.error("Error fetching galleries:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Filter galleries based on search term and filters
  const filteredGalleries = galleries.filter(gallery => {
    const nameMatch = searchTerm === '' || 
      (gallery.first_name && gallery.first_name.toLowerCase().includes(searchTerm.toLowerCase()));
      
    // Location filter would be implemented here
      
    return nameMatch;
  });
  
  return (
    <Layout>
      <div className="relative min-h-screen">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1577720643272-265f29459feb?q=80&w=2062"
            alt="Art Gallery"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
        </div>
        
        <div className="container mx-auto px-4 py-24 relative z-10">
          <div className="max-w-5xl mx-auto text-white space-y-10">
            <div className="text-center space-y-4">
              <h1 className="text-5xl font-serif font-light tracking-wider">Galerías</h1>
              <p className="text-xl text-white/80 max-w-2xl mx-auto">
                Explora galerías de arte contemporáneo de todo el mundo
              </p>
            </div>
            
            {/* Filters */}
            <div className="backdrop-blur-sm bg-white/5 p-6 rounded-lg border border-white/10 space-y-4">
              <h2 className="text-xl font-serif">Filtrar galerías</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                  <Select value={locationFilter} onValueChange={setLocationFilter}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="Ubicación" />
                    </SelectTrigger>
                    <SelectContent className="bg-black/90 border-white/20 text-white">
                      <SelectItem value="" className="focus:bg-white/10 focus:text-white">Todas las ubicaciones</SelectItem>
                      <SelectItem value="madrid" className="focus:bg-white/10 focus:text-white">Madrid</SelectItem>
                      <SelectItem value="barcelona" className="focus:bg-white/10 focus:text-white">Barcelona</SelectItem>
                      <SelectItem value="paris" className="focus:bg-white/10 focus:text-white">París</SelectItem>
                      <SelectItem value="london" className="focus:bg-white/10 focus:text-white">Londres</SelectItem>
                      <SelectItem value="new_york" className="focus:bg-white/10 focus:text-white">Nueva York</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            {/* Galleries list */}
            {isLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-12 w-12 animate-spin text-white/50" />
              </div>
            ) : filteredGalleries.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredGalleries.map(gallery => (
                  <Link key={gallery.id} to={`/galleries/${gallery.id}`} className="group">
                    <div className="backdrop-blur-sm bg-white/5 p-6 rounded-lg border border-white/10 h-full transition-all duration-300 hover:bg-white/10">
                      <div className="aspect-video rounded-md overflow-hidden mb-4">
                        <img 
                          src={gallery.avatar_url || "https://images.unsplash.com/photo-1577720580449-a8286d0d0dbb?q=80&w=1974"}
                          alt={gallery.first_name || "Gallery"}
                          className="w-full h-full object-cover transition-transform group-hover:scale-105"
                        />
                      </div>
                      
                      <h3 className="text-xl font-medium line-clamp-1 group-hover:text-primary transition-colors">
                        {gallery.first_name || "Galería sin nombre"}
                      </h3>
                      
                      <div className="flex items-center mt-2 text-white/70">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span className="text-sm">
                          {gallery.location || "Ubicación no especificada"}
                        </span>
                      </div>
                      
                      <p className="mt-3 text-sm text-white/80 line-clamp-3">
                        {gallery.bio || "Esta galería aún no ha completado su descripción."}
                      </p>
                      
                      <div className="mt-4">
                        <span className="text-xs font-medium bg-white/10 px-2 py-1 rounded">
                          {Math.floor(Math.random() * 30) + 5} artistas
                        </span>
                        <span className="text-xs font-medium bg-white/10 px-2 py-1 rounded ml-2">
                          {Math.floor(Math.random() * 200) + 20} obras
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 backdrop-blur-sm bg-white/5 rounded-lg border border-white/10">
                <p className="text-white/80">No se encontraron galerías con los filtros seleccionados.</p>
                <Button 
                  variant="outline" 
                  className="mt-4 text-white border-white/30 bg-white/10 hover:bg-white/20"
                  onClick={() => {
                    setSearchTerm('');
                    setLocationFilter('');
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
