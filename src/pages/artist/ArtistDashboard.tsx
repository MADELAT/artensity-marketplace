
import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { useAuth } from '@/contexts/AuthContext';
import { Card } from '@/components/ui/card';
import { Palette, Clock, ShoppingCart, BarChart, Image, Plus, Loader2 } from 'lucide-react';
import { ArtworkUploadForm } from '@/components/artwork/ArtworkUploadForm';
import { ArtworkGrid } from '@/components/artwork/ArtworkGrid';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';

export default function ArtistDashboard() {
  const { profile, user } = useAuth();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [isLoadingArtworks, setIsLoadingArtworks] = useState(false);
  const [artworks, setArtworks] = useState<any[]>([]);
  const [pendingArtworks, setPendingArtworks] = useState<any[]>([]);
  const [soldArtworks, setSoldArtworks] = useState<any[]>([]);
  
  // Fetch artist's artworks
  useEffect(() => {
    if (user) {
      fetchArtworks();
      fetchPendingArtworks();
    }
  }, [user]);
  
  const fetchArtworks = async () => {
    if (!user) return;
    
    setIsLoadingArtworks(true);
    try {
      const { data, error } = await supabase
        .from('artworks')
        .select('*')
        .eq('artist_id', user.id);
        
      if (error) {
        console.error("Error fetching artworks:", error);
      } else {
        console.log("Fetched artworks:", data);
        const sold = data?.filter(art => art.is_sold) || [];
        const active = data?.filter(art => !art.is_sold) || [];
        setArtworks(active);
        setSoldArtworks(sold);
      }
    } catch (error) {
      console.error("Error in fetchArtworks:", error);
    } finally {
      setIsLoadingArtworks(false);
    }
  };
  
  const fetchPendingArtworks = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('pending_artworks')
        .select('*')
        .eq('artist_id', user.id)
        .order('created_at', { ascending: false });
        
      if (error) {
        console.error("Error fetching pending artworks:", error);
      } else {
        console.log("Fetched pending artworks:", data);
        setPendingArtworks(data || []);
      }
    } catch (error) {
      console.error("Error in fetchPendingArtworks:", error);
    }
  };
  
  return (
    <DashboardLayout userType="artist">
      <div className="flex flex-col space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Artist Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {profile?.first_name || 'Artist'}
          </p>
        </div>

        <Tabs defaultValue="dashboard" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 md:grid-cols-5 w-full">
            <TabsTrigger value="dashboard">Overview</TabsTrigger>
            <TabsTrigger value="artworks">My Artworks</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="sales">Sales</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard" className="space-y-6 mt-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <StatCard 
                title="Active Artworks" 
                value={artworks.length.toString()}
                description="Listed in gallery"
                icon={<Palette className="h-4 w-4 text-blue-500" />}
              />
              <StatCard 
                title="Pending Approval" 
                value={pendingArtworks.length.toString()} 
                description="Under review"
                icon={<Clock className="h-4 w-4 text-amber-500" />} 
              />
              <StatCard 
                title="Sold Artworks" 
                value={soldArtworks.length.toString()} 
                description="Total sales"
                icon={<ShoppingCart className="h-4 w-4 text-green-500" />} 
              />
              <StatCard 
                title="Revenue" 
                value={`$${soldArtworks.reduce((sum, art) => sum + (parseFloat(art.price) || 0), 0).toLocaleString()}`} 
                description="Total earnings"
                icon={<BarChart className="h-4 w-4 text-purple-500" />} 
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Card className="p-6">
                <h3 className="text-lg font-medium mb-4">Popular Artworks</h3>
                <div className="space-y-4">
                  {artworks.length > 0 ? (
                    <div className="grid grid-cols-2 gap-4">
                      {artworks.slice(0, 4).map(artwork => (
                        <div key={artwork.id} className="aspect-square rounded-md overflow-hidden relative group">
                          <img 
                            src={artwork.image_url} 
                            alt={artwork.title}
                            className="w-full h-full object-cover transition-transform group-hover:scale-105"
                          />
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                            <p className="text-white text-xs truncate">{artwork.title}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-center py-8">
                      No tienes obras activas. ¡Sube tu primera obra!
                    </p>
                  )}
                </div>
              </Card>
              <Card className="p-6">
                <h3 className="text-lg font-medium mb-4">Recent Sales</h3>
                <div className="space-y-4">
                  {soldArtworks.length > 0 ? (
                    <div className="divide-y">
                      {soldArtworks.slice(0, 5).map(artwork => (
                        <div key={artwork.id} className="py-2 flex items-center gap-3">
                          <div className="h-10 w-10 rounded-md overflow-hidden">
                            <img 
                              src={artwork.image_url} 
                              alt={artwork.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{artwork.title}</p>
                            <p className="text-xs text-muted-foreground">{new Date(artwork.updated_at).toLocaleDateString()}</p>
                          </div>
                          <p className="font-medium">${parseFloat(artwork.price).toLocaleString()}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-center py-8">
                      No has vendido ninguna obra aún
                    </p>
                  )}
                </div>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="artworks" className="space-y-6 mt-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Mis Obras</h3>
              <Button onClick={() => setShowUploadForm(!showUploadForm)}>
                {showUploadForm ? (
                  'Cancelar'
                ) : (
                  <>
                    <Plus className="h-4 w-4 mr-1" /> Subir nueva obra
                  </>
                )}
              </Button>
            </div>
            
            {showUploadForm ? (
              <ArtworkUploadForm />
            ) : (
              <>
                {isLoadingArtworks ? (
                  <div className="flex justify-center p-12">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : artworks.length > 0 ? (
                  <ArtworkGrid artworks={artworks} />
                ) : (
                  <Card className="p-6">
                    <div className="text-center py-12 space-y-4">
                      <Image className="h-16 w-16 text-muted-foreground mx-auto" />
                      <h3 className="text-lg font-medium">No tienes obras publicadas</h3>
                      <p className="text-muted-foreground max-w-md mx-auto">
                        Comienza a subir tus obras para que los coleccionistas puedan descubrirlas
                      </p>
                      <Button onClick={() => setShowUploadForm(true)}>
                        <Plus className="h-4 w-4 mr-1" /> Subir obra
                      </Button>
                    </div>
                  </Card>
                )}
              </>
            )}
          </TabsContent>
          
          <TabsContent value="pending" className="space-y-6 mt-6">
            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4">Obras Pendientes de Aprobación</h3>
              {pendingArtworks.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {pendingArtworks.map(artwork => (
                    <div key={artwork.id} className="border rounded-lg overflow-hidden">
                      <div className="aspect-[4/3] relative">
                        <img 
                          src={artwork.image_url} 
                          alt={artwork.title} 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 right-2">
                          <span className="bg-amber-500/90 text-white text-xs px-2 py-1 rounded-full">
                            Pendiente
                          </span>
                        </div>
                      </div>
                      <div className="p-4">
                        <h4 className="font-medium truncate">{artwork.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          Enviado el {new Date(artwork.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-8">
                  No tienes obras pendientes de aprobación
                </p>
              )}
            </Card>
          </TabsContent>
          
          <TabsContent value="sales" className="space-y-6 mt-6">
            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4">Historial de Ventas</h3>
              {soldArtworks.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-2">Obra</th>
                        <th className="text-left py-3 px-2">Fecha</th>
                        <th className="text-right py-3 px-2">Precio</th>
                      </tr>
                    </thead>
                    <tbody>
                      {soldArtworks.map(artwork => (
                        <tr key={artwork.id} className="border-b">
                          <td className="py-3 px-2">
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 rounded-md overflow-hidden">
                                <img 
                                  src={artwork.image_url} 
                                  alt={artwork.title}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <span className="font-medium">{artwork.title}</span>
                            </div>
                          </td>
                          <td className="py-3 px-2 text-muted-foreground">
                            {new Date(artwork.updated_at).toLocaleDateString()}
                          </td>
                          <td className="py-3 px-2 text-right font-medium">
                            ${parseFloat(artwork.price).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-8">
                  No has vendido obras aún
                </p>
              )}
            </Card>
          </TabsContent>
          
          <TabsContent value="settings" className="space-y-6 mt-6">
            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4">Configuración del Perfil</h3>
              {/* Profile settings will be implemented soon */}
              <p className="text-muted-foreground text-center py-8">
                La configuración de perfil estará disponible próximamente
              </p>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
