
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { useAuth } from '@/contexts/AuthContext';
import { PieChart, LineChart, Users, Image, ShoppingBag, Plus } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

// Mock artist data for demonstration
const mockArtists = [
  {
    id: "1",
    name: "Carmen Herrera",
    avatar: "https://images.unsplash.com/photo-1584184924103-e310d9dc31f7?q=80&w=1000",
    style: "Abstracto geométrico",
    artworks: 24,
    sales: 12
  },
  {
    id: "2",
    name: "Miguel Ángel Rojas",
    avatar: "https://images.unsplash.com/photo-1567784177951-6fa58317e16b?q=80&w=800",
    style: "Arte conceptual",
    artworks: 18,
    sales: 8
  },
  {
    id: "3",
    name: "Doris Salcedo",
    avatar: "https://images.unsplash.com/photo-1607462109225-6b64ae2dd3cb?q=80&w=774", 
    style: "Instalación",
    artworks: 9,
    sales: 5
  },
  {
    id: "4",
    name: "Oscar Murillo",
    avatar: "https://images.unsplash.com/photo-1577720580479-7d839d829c73?q=80&w=870",
    style: "Arte contemporáneo",
    artworks: 32,
    sales: 17
  }
];

// Mock recent artworks data
const mockRecentArtworks = [
  {
    id: "101",
    title: "Estructura en Azul",
    artist: "Carmen Herrera",
    price: 12500,
    image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?q=80&w=858",
    date: "2023-09-15"
  },
  {
    id: "102",
    title: "Reflejo Urbano",
    artist: "Miguel Ángel Rojas",
    price: 8900,
    image: "https://images.unsplash.com/photo-1578926288207-32356bf60f27?q=80&w=987",
    date: "2023-10-02"
  },
  {
    id: "103",
    title: "Memorias del Silencio",
    artist: "Doris Salcedo",
    price: 15700,
    image: "https://images.unsplash.com/photo-1579541591970-e5943b6845fe?q=80&w=870",
    date: "2023-10-12"
  }
];

export default function GalleryDashboard() {
  const { profile } = useAuth();
  const [activeTab, setActiveTab] = useState("dashboard");
  const { toast } = useToast();
  
  const handleAddArtist = () => {
    toast({
      title: "Función en desarrollo",
      description: "La función para agregar artistas estará disponible próximamente.",
    });
  };
  
  const handleUploadArtwork = () => {
    toast({
      title: "Función en desarrollo",
      description: "La función para subir obras estará disponible próximamente.",
    });
  };
  
  return (
    <DashboardLayout userType="gallery">
      <div className="flex flex-col space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Dashboard de Galería</h1>
          <p className="text-muted-foreground">
            Bienvenido/a, {profile?.first_name || 'Galería'}
          </p>
        </div>

        <Tabs defaultValue="dashboard" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 md:grid-cols-6 w-full">
            <TabsTrigger value="dashboard">Resumen</TabsTrigger>
            <TabsTrigger value="artists">Artistas</TabsTrigger>
            <TabsTrigger value="artworks">Obras</TabsTrigger>
            <TabsTrigger value="sales">Ventas</TabsTrigger>
            <TabsTrigger value="exhibitions">Exposiciones</TabsTrigger>
            <TabsTrigger value="settings">Ajustes</TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard" className="space-y-6 mt-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <StatCard 
                title="Artistas Representados" 
                value={mockArtists.length.toString()}
                description="Diversos estilos y técnicas"
                icon={<Users className="h-4 w-4 text-blue-500" />}
              />
              <StatCard 
                title="Obras" 
                value="83" 
                description="62 obras en exhibición"
                icon={<Image className="h-4 w-4 text-green-500" />} 
              />
              <StatCard 
                title="Ventas Mensuales" 
                value="€14,580" 
                description="Este mes"
                icon={<LineChart className="h-4 w-4 text-purple-500" />} 
              />
              <StatCard 
                title="Comisiones" 
                value="€2,840" 
                description="Este mes"
                icon={<ShoppingBag className="h-4 w-4 text-amber-500" />} 
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-medium">Artistas Destacados</CardTitle>
                  <CardDescription>
                    Artistas representados en tu galería
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockArtists.slice(0, 3).map((artist) => (
                    <div key={artist.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={artist.avatar} alt={artist.name} />
                          <AvatarFallback>{artist.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{artist.name}</p>
                          <p className="text-xs text-muted-foreground">{artist.style}</p>
                        </div>
                      </div>
                      <div className="text-sm">
                        <p>{artist.artworks} obras</p>
                        <p className="text-xs text-muted-foreground">{artist.sales} vendidas</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full" onClick={handleAddArtist}>
                    <Plus className="h-4 w-4 mr-2" /> Agregar artista
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-medium">Obras Recientes</CardTitle>
                  <CardDescription>
                    Últimas obras añadidas a tu galería
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockRecentArtworks.map((artwork) => (
                    <div key={artwork.id} className="flex gap-3">
                      <div className="h-16 w-16 rounded-md overflow-hidden">
                        <img 
                          src={artwork.image} 
                          alt={artwork.title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{artwork.title}</p>
                        <p className="text-xs text-muted-foreground">{artwork.artist}</p>
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-sm font-medium">€{artwork.price.toLocaleString()}</span>
                          <Badge variant="outline">{artwork.date}</Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full" onClick={handleUploadArtwork}>
                    <Plus className="h-4 w-4 mr-2" /> Subir nueva obra
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-medium">Actividad Reciente</CardTitle>
                <CardDescription>
                  Movimientos y eventos en tu galería
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-l-2 border-primary pl-4 py-1">
                    <p className="font-medium">Nueva obra subida</p>
                    <p className="text-sm text-muted-foreground">Carmen Herrera subió "Estructura en Azul"</p>
                    <p className="text-xs text-muted-foreground">Hace 3 días</p>
                  </div>
                  <div className="border-l-2 border-green-500 pl-4 py-1">
                    <p className="font-medium">Venta completada</p>
                    <p className="text-sm text-muted-foreground">"Reflejo Urbano" fue vendido por €8,900</p>
                    <p className="text-xs text-muted-foreground">Hace 5 días</p>
                  </div>
                  <div className="border-l-2 border-blue-500 pl-4 py-1">
                    <p className="font-medium">Nuevo artista</p>
                    <p className="text-sm text-muted-foreground">Oscar Murillo se ha unido a tu galería</p>
                    <p className="text-xs text-muted-foreground">Hace 1 semana</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="artists" className="space-y-6 mt-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-medium">Artistas Representados</h2>
              <Button onClick={handleAddArtist}>
                <Plus className="h-4 w-4 mr-2" /> Nuevo artista
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockArtists.map((artist) => (
                <Link to={`/gallery/artists/${artist.id}`} key={artist.id} className="block">
                  <Card className="h-full transition-shadow hover:shadow-md">
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={artist.avatar} alt={artist.name} />
                          <AvatarFallback>{artist.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">{artist.name}</CardTitle>
                          <CardDescription>{artist.style}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex justify-between text-sm">
                        <span><strong>{artist.artworks}</strong> obras</span>
                        <span><strong>{artist.sales}</strong> vendidas</span>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" size="sm">Gestionar obras</Button>
                      <Button variant="secondary" size="sm">Ver perfil</Button>
                    </CardFooter>
                  </Card>
                </Link>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="artworks" className="space-y-6 mt-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-medium">Obras en tu galería</h2>
              <Button onClick={handleUploadArtwork}>
                <Plus className="h-4 w-4 mr-2" /> Subir obra
              </Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {mockRecentArtworks.concat(mockRecentArtworks).map((artwork, index) => (
                <Card key={`${artwork.id}-${index}`} className="overflow-hidden">
                  <div className="aspect-[4/3] relative">
                    <img 
                      src={artwork.image} 
                      alt={artwork.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <CardContent className="pt-4">
                    <h3 className="font-medium">{artwork.title}</h3>
                    <p className="text-sm text-muted-foreground">{artwork.artist}</p>
                    <p className="text-sm font-medium mt-1">€{artwork.price.toLocaleString()}</p>
                  </CardContent>
                  <CardFooter className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">Editar</Button>
                    <Button variant="secondary" size="sm" className="flex-1">Ver</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="sales" className="space-y-6 mt-6">
            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4">Historial de ventas</h3>
              <div className="space-y-4">
                <p className="text-center py-8 text-muted-foreground">
                  El historial de ventas estará disponible próximamente.
                </p>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="exhibitions" className="space-y-6 mt-6">
            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4">Exposiciones</h3>
              <div className="space-y-4">
                <p className="text-center py-8 text-muted-foreground">
                  La gestión de exposiciones estará disponible próximamente.
                </p>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings" className="space-y-6 mt-6">
            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4">Ajustes de la galería</h3>
              <div className="space-y-4">
                <p className="text-center py-8 text-muted-foreground">
                  Los ajustes de la galería estarán disponibles próximamente.
                </p>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
