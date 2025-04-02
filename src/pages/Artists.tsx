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
import { useToast } from "@/hooks/use-toast";
import { supabase } from '@/integrations/supabase/client';
import { Link } from 'react-router-dom';

export default function Artists() {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const { toast } = useToast();
  
  useEffect(() => {
    fetchArtists();
  }, []);
  
  const fetchArtists = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('role', 'artist');
        
      if (error) throw error;
      
      setArtists(data || []);
    } catch (error) {
      console.error('Error fetching artists:', error);
      toast({
        title: "Error",
        description: "No se pudieron cargar los artistas",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  // Filter artists - this is a placeholder since we don't have the complete data yet
  const filteredArtists = filter === 'all' 
    ? artists 
    : artists.filter((artist: any) => artist.style === filter);
  
  return (
    <Layout>
      <div className="relative min-h-screen">
        {/* Background */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?q=80&w=2070"
            alt="Art Gallery Background"
            className="absolute inset-0 h-full w-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 to-background/95"></div>
        </div>
        
        <div className="container px-4 py-12 mx-auto">
          <h1 className="text-4xl font-serif font-light mb-2 text-center">Nuestros Artistas</h1>
          <p className="text-lg text-muted-foreground mb-8 text-center max-w-2xl mx-auto">
            Descubre artistas emergentes y consolidados de todo el mundo, con estilos y perspectivas únicas.
          </p>
          
          <div className="mb-8 flex flex-wrap gap-4 justify-center">
            <div className="w-full max-w-xs">
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filtrar por estilo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los estilos</SelectItem>
                  <SelectItem value="abstracto">Abstracto</SelectItem>
                  <SelectItem value="figurativo">Figurativo</SelectItem>
                  <SelectItem value="impresionismo">Impresionismo</SelectItem>
                  <SelectItem value="expresionismo">Expresionismo</SelectItem>
                  <SelectItem value="surrealismo">Surrealismo</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary border-r-transparent"></div>
              <span className="ml-2">Cargando artistas...</span>
            </div>
          ) : artists.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-muted-foreground">No se encontraron artistas</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredArtists.map((artist: any) => (
                <Link to={`/artist/${artist.id}`} key={artist.id}>
                  <Card className="overflow-hidden h-full transition-all hover:shadow-lg">
                    <div className="aspect-[3/4] relative">
                      {artist.avatar_url ? (
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
                    </div>
                    <CardContent className="pt-4">
                      <h3 className="text-lg font-medium">
                        {artist.first_name} {artist.last_name}
                      </h3>
                      {artist.style && (
                        <Badge variant="outline" className="mt-2">
                          {artist.style}
                        </Badge>
                      )}
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                        {artist.bio || "Artista contemporáneo"}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
