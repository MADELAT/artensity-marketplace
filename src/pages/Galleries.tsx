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
import { MapPin } from 'lucide-react';

export default function Galleries() {
  const [galleries, setGalleries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterLocation, setFilterLocation] = useState('all');
  const { toast } = useToast();
  
  useEffect(() => {
    fetchGalleries();
  }, []);
  
  const fetchGalleries = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('role', 'gallery');
        
      if (error) throw error;
      
      setGalleries(data || []);
    } catch (error) {
      console.error('Error fetching galleries:', error);
      toast({
        title: "Error",
        description: "No se pudieron cargar las galerías",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  // Filter galleries - this is a placeholder until we have complete gallery data
  const filteredGalleries = filterLocation === 'all' 
    ? galleries 
    : galleries.filter((gallery: any) => gallery.location === filterLocation);
  
  return (
    <Layout>
      <div className="relative min-h-screen">
        {/* Background */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1577720580479-7d839d829c73?q=80&w=2070"
            alt="Gallery Interior Background"
            className="absolute inset-0 h-full w-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 to-background/95"></div>
        </div>
        
        <div className="container px-4 py-12 mx-auto">
          <h1 className="text-4xl font-serif font-light mb-2 text-center">Galerías de Arte</h1>
          <p className="text-lg text-muted-foreground mb-8 text-center max-w-2xl mx-auto">
            Explora las galerías más exclusivas, desde espacios consagrados hasta proyectos emergentes con propuestas innovadoras.
          </p>
          
          <div className="mb-8 flex flex-wrap gap-4 justify-center">
            <div className="w-full max-w-xs">
              <Select value={filterLocation} onValueChange={setFilterLocation}>
                <SelectTrigger>
                  <SelectValue placeholder="Filtrar por ubicación" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las ubicaciones</SelectItem>
                  <SelectItem value="madrid">Madrid</SelectItem>
                  <SelectItem value="barcelona">Barcelona</SelectItem>
                  <SelectItem value="valencia">Valencia</SelectItem>
                  <SelectItem value="malaga">Málaga</SelectItem>
                  <SelectItem value="bilbao">Bilbao</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary border-r-transparent"></div>
              <span className="ml-2">Cargando galerías...</span>
            </div>
          ) : galleries.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-muted-foreground">No se encontraron galerías</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredGalleries.map((gallery: any) => (
                <Link to={`/gallery/${gallery.id}`} key={gallery.id}>
                  <Card className="overflow-hidden h-full transition-all hover:shadow-lg">
                    <div className="aspect-video relative">
                      {gallery.avatar_url ? (
                        <img
                          src={gallery.avatar_url}
                          alt={gallery.first_name}
                          className="object-cover h-full w-full"
                        />
                      ) : (
                        <div className="h-full w-full bg-muted flex items-center justify-center">
                          <span className="text-4xl font-light font-serif">
                            {gallery.first_name?.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>
                    <CardContent className="pt-4">
                      <h3 className="text-lg font-medium">
                        {gallery.first_name}
                      </h3>
                      
                      {gallery.location && (
                        <div className="flex items-center mt-2 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span>{gallery.location || "España"}</span>
                        </div>
                      )}
                      
                      <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                        {gallery.bio || "Galería de arte contemporáneo"}
                      </p>
                      
                      <div className="mt-3">
                        <Badge variant="secondary">
                          {Math.floor(Math.random() * 30) + 5} artistas
                        </Badge>
                      </div>
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
