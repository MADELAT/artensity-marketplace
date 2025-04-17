import { ArtworkEditForm } from "@/components/artist/ArtworkEditForm";
import { useState, useEffect } from "react";
import {
  useNavigate,
  useLocation,
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Plus,
  Settings,
  Palette,
  Clock,
  ShoppingCart,
  DollarSign,
  Eye,
  Heart,
  MessageSquare,
  TrendingUp,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Import components from index
import {
  ArtworkUploadForm,
  ArtworkDetail,
  SaleDetail,
  ArtistAvatar,
} from "@/components/artist";

// Import other components
import { ArtworksSection } from "@/pages/artist/ArtworksSection";
import { SettingsSection } from "@/pages/artist/SettingsSection";
import { InquiryCenter } from "@/pages/artist/InquiryCenter";
import { ArtworkUpload } from "@/pages/artist/ArtworkUpload";

interface Artwork {
  id: string;
  title: string;
  description?: string;
  image_url: string;
  price: number;
  status: string;
  artist_id: string;
  created_at: string;
  views?: number;
  likes?: number;
}

interface ArtworkBasic {
  id: string;
  title: string;
  image_url: string;
}

interface Sale {
  id: string;
  artwork_id: string;
  price: number;
  created_at: string;
  artwork: ArtworkBasic;
}

interface Message {
  id: string;
  content: string;
  sender_id: string;
  artwork_id: string;
  created_at: string;
  is_read: boolean;
}

interface ArtistProfile {
  id: string;
  first_name: string;
  last_name: string;
  avatar_url?: string;
  bio?: string;
}

const tabs = [
  { id: "resumen", label: "Resumen", path: "/dashboard/artist" },
  { id: "obras", label: "Mis Obras", path: "/dashboard/artist/artworks" },
  { id: "consultas", label: "Consultas", path: "/dashboard/artist/inquiries" },
  { id: "pendientes", label: "Pendientes", path: "/dashboard/artist/pending" },
  { id: "ventas", label: "Ventas", path: "/dashboard/artist/sales" },
  {
    id: "configuracion",
    label: "Configuración",
    path: "/dashboard/artist/settings",
  },
];

export default function ArtistDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [pendingArtworks, setPendingArtworks] = useState<Artwork[]>([]);
  const [sales, setSales] = useState<Sale[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [profile, setProfile] = useState<ArtistProfile | null>(null);

  // Mejorar la detección del tab activo
  const currentPath = location.pathname;
  let activeTab = "resumen"; // Default tab

  // Determinar el tab activo basado en la ruta actual
  if (currentPath === "/dashboard/artist/artworks") {
    activeTab = "obras";
  } else if (currentPath === "/dashboard/artist/inquiries") {
    activeTab = "consultas";
  } else if (currentPath === "/dashboard/artist/pending") {
    activeTab = "pendientes";
  } else if (currentPath === "/dashboard/artist/sales") {
    activeTab = "ventas";
  } else if (currentPath === "/dashboard/artist/settings") {
    activeTab = "configuracion";
  }

  useEffect(() => {
    const fetchData = async () => {
      if (!user?.id) {
        console.warn("User ID not available, skipping data fetch");
        return;
      }

      setIsLoading(true);
      let hasError = false;

      try {
        // Fetch artist profile
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        if (profileError) {
          console.error("Error fetching profile:", profileError.message);
          hasError = true;
        } else if (!profileData) {
          console.error("No profile found for user:", user.id);
          hasError = true;
        } else {
          setProfile(profileData);
        }

        // Fetch active artworks
        const { data: artworksData, error: artworksError } = await supabase
          .from("artworks")
          .select("*")
          .eq("artist_id", user.id)
          .eq("status", "approved");

        if (artworksError) {
          console.error("Error fetching artworks:", artworksError.message);
          hasError = true;
        } else {
          console.log("Artworks data from Supabase:", artworksData);
          setArtworks(artworksData as Artwork[]);
        }

        // Fetch pending artworks - with fallback if table doesn't exist
        try {
          const { data: pendingData, error: pendingError } = await supabase
            .from("pending_artworks")
            .select("*")
            .eq("artist_id", user.id)
            .eq("status", "pending");

          if (pendingError) {
            console.warn(
              "Error fetching pending artworks:",
              pendingError.message
            );
            // Don't set hasError here as pending artworks are non-essential
          } else {
            setPendingArtworks(pendingData as Artwork[]);
          }
        } catch (pendingError) {
          console.warn("Pending artworks table may not exist:", pendingError);
          // Continue without blocking the dashboard
        }

        // Fetch sales with artwork details
        const { data: salesData, error: salesError } = await supabase
          .from("sales")
          .select(
            `
            id,
            artwork_id,
            price,
            created_at,
            artwork:artworks (
              id,
              title,
              image_url
            )
          `
          )
          .eq("artist_id", user.id);

        if (salesError) {
          console.error("Error fetching sales:", salesError.message);
          hasError = true;
        } else {
          // Filter out sales without valid artwork data and ensure proper typing
          const validSales = (salesData?.filter(
            (sale) =>
              sale &&
              sale.artwork &&
              typeof sale.artwork === "object" &&
              !Array.isArray(sale.artwork) &&
              "id" in sale.artwork &&
              "title" in sale.artwork &&
              "image_url" in sale.artwork
          ) || []) as unknown as Sale[];
          setSales(validSales);
        }

        // Fetch messages
        const { data: messagesData, error: messagesError } = await supabase
          .from("messages")
          .select("*")
          .eq("recipient_id", user.id)
          .order("created_at", { ascending: false });

        if (messagesError) {
          console.error("Error fetching messages:", messagesError.message);
          hasError = true;
        } else {
          setMessages(messagesData as Message[]);
        }
      } catch (error) {
        console.error("Unexpected error during data fetch:", error);
        hasError = true;
      } finally {
        setIsLoading(false);
        if (hasError) {
          setError("Error al cargar los datos");
        } else {
          setError(null);
        }
      }
    };

    fetchData();
  }, [user]);

  // Calculate metrics from fetched data
  const metrics = {
    activeWorks: artworks.length,
    pendingWorks: pendingArtworks.length,
    soldWorks: sales.length,
    totalIncome: sales.reduce((sum, sale) => sum + (sale.price || 0), 0),
    views: artworks.reduce((sum, artwork) => sum + (artwork.views || 0), 0),
    likes: artworks.reduce((sum, artwork) => sum + (artwork.likes || 0), 0),
    messages: messages.length,
    salesTrend: calculateSalesTrend(sales),
  };

  // Calculate sales trend (current month vs previous month)
  function calculateSalesTrend(sales: Sale[]): number {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const currentMonthSales = sales
      .filter((sale) => {
        const saleDate = new Date(sale.created_at);
        return (
          saleDate.getMonth() === currentMonth &&
          saleDate.getFullYear() === currentYear
        );
      })
      .reduce((sum, sale) => sum + (sale.price || 0), 0);

    const prevMonthSales = sales
      .filter((sale) => {
        const saleDate = new Date(sale.created_at);
        return (
          saleDate.getMonth() === currentMonth - 1 &&
          saleDate.getFullYear() === currentYear
        );
      })
      .reduce((sum, sale) => sum + (sale.price || 0), 0);

    if (prevMonthSales === 0) {
      return currentMonthSales > 0 ? 100 : 0;
    }
    return Math.round(
      ((currentMonthSales - prevMonthSales) / prevMonthSales) * 100
    );
  }

  // Popular artworks sorted by views
  const popularArtworks = [...artworks]
    .sort((a, b) => (b.views || 0) - (a.views || 0))
    .slice(0, 5)
    .map((art) => ({
      id: art.id,
      title: art.title,
      imageUrl: art.image_url,
      views: art.views || 0,
      likes: art.likes || 0,
    }));

  // Recent sales with artwork details
  const recentSales = sales
    .filter((sale) => sale.artwork) // Ensure artwork exists
    .slice(0, 5)
    .map((sale) => ({
      id: sale.id,
      artworkId: sale.artwork_id,
      artworkTitle: sale.artwork.title,
      artworkImage: sale.artwork.image_url,
      price: sale.price,
      soldAt: new Date(sale.created_at).toLocaleDateString(),
    }));

  // Mejorar la función handleTabChange para asegurar la navegación correcta
  const handleTabChange = (value: string) => {
    const tab = tabs.find((t) => t.id === value);
    if (tab) {
      console.log(`Navigating to: ${tab.path}`);
      navigate(tab.path);
    }
  };

  const handleUploadArtwork = () => {
    navigate("artworks/upload");
  };

  const handleViewArtwork = (artworkId: string) => {
    navigate(`/dashboard/artist/artworks/${artworkId}`);
  };

  const handleViewSale = (saleId: string) => {
    navigate(`/dashboard/artist/sales/${saleId}`);
  };

  const handleSettings = () => {
    navigate("/dashboard/artist/settings");
  };

  const DashboardContent = () => (
    <div className="min-h-screen bg-gray-50 p-6 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-4">
              <img
                src={profile?.avatar_url || "/default-avatar.png"}
                alt="Admin Avatar"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <h1 className="font-serif text-3xl font-bold mb-2">
                  ¡Bienvenido/a, {profile?.first_name || "Artista"}!
                </h1>
                <p className="text-gray-600">
                  Tu espacio creativo en{" "}
                  <Link
                    to="/"
                    className="text-[#C4A484] hover:text-[#B39476] font-medium"
                  >
                    Artendency
                  </Link>
                  . Gestiona tus obras, conecta con coleccionistas y haz crecer
                  tu presencia artística.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={handleUploadArtwork}
                className="bg-[#C4A484] hover:bg-[#B39476] text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Nueva Obra
              </Button>
              <Button
                variant="ghost"
                onClick={handleSettings}
                className="text-gray-600"
              >
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-4 bg-white rounded-xl shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-gray-600 font-medium">Obras Activas</h3>
              <div className="p-2 bg-blue-50 rounded-full">
                <Palette className="h-4 w-4 text-blue-500" />
              </div>
            </div>
            <p className="text-2xl font-bold flex items-baseline">
              {metrics.activeWorks}
              <span className="text-sm text-gray-500 ml-2">En exposición</span>
            </p>
          </Card>

          <Card className="p-4 bg-white rounded-xl shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-gray-600 font-medium">Pendientes</h3>
              <div className="p-2 bg-orange-50 rounded-full">
                <Clock className="h-4 w-4 text-orange-500" />
              </div>
            </div>
            <p className="text-2xl font-bold flex items-baseline">
              {metrics.pendingWorks}
              <span className="text-sm text-gray-500 ml-2">En revisión</span>
            </p>
          </Card>

          <Card className="p-4 bg-white rounded-xl shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-gray-600 font-medium">Obras Vendidas</h3>
              <div className="p-2 bg-green-50 rounded-full">
                <ShoppingCart className="h-4 w-4 text-green-500" />
              </div>
            </div>
            <p className="text-2xl font-bold flex items-baseline">
              {metrics.soldWorks}
              <span className="text-sm text-gray-500 ml-2">Total ventas</span>
            </p>
          </Card>

          <Card className="p-4 bg-white rounded-xl shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-gray-600 font-medium">Ingresos Totales</h3>
              <div className="p-2 bg-purple-50 rounded-full">
                <DollarSign className="h-4 w-4 text-purple-500" />
              </div>
            </div>
            <p className="text-2xl font-bold flex items-baseline">
              ${metrics.totalIncome}
              <span className="text-sm text-gray-500 ml-2">
                Ganancias totales
              </span>
            </p>
          </Card>

          <Card className="p-4 bg-white rounded-xl shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-gray-600 font-medium">Visualizaciones</h3>
              <div className="p-2 bg-cyan-50 rounded-full">
                <Eye className="h-4 w-4 text-cyan-500" />
              </div>
            </div>
            <p className="text-2xl font-bold flex items-baseline">
              {metrics.views}
              <span className="text-sm text-gray-500 ml-2">Total vistas</span>
            </p>
          </Card>

          <Card className="p-4 bg-white rounded-xl shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-gray-600 font-medium">Me Gusta</h3>
              <div className="p-2 bg-red-50 rounded-full">
                <Heart className="h-4 w-4 text-red-500" />
              </div>
            </div>
            <p className="text-2xl font-bold flex items-baseline">
              {metrics.likes}
              <span className="text-sm text-gray-500 ml-2">
                Total favoritos
              </span>
            </p>
          </Card>

          <Card className="p-4 bg-white rounded-xl shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-gray-600 font-medium">Mensajes</h3>
              <div className="p-2 bg-indigo-50 rounded-full">
                <MessageSquare className="h-4 w-4 text-indigo-500" />
              </div>
            </div>
            <p className="text-2xl font-bold flex items-baseline">
              {metrics.messages}
              <span className="text-sm text-gray-500 ml-2">
                Conversaciones activas
              </span>
            </p>
          </Card>

          <Card className="p-4 bg-white rounded-xl shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-gray-600 font-medium">Tendencia de Ventas</h3>
              <div className="p-2 bg-emerald-50 rounded-full">
                <TrendingUp className="h-4 w-4 text-emerald-500" />
              </div>
            </div>
            <p className="text-2xl font-bold flex items-baseline">
              {metrics.salesTrend}%
              <span className="text-sm text-gray-500 ml-2">Último mes</span>
            </p>
          </Card>
        </div>

        {/* Bottom Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-bold mb-4">Obras Populares</h2>
            <div className="space-y-4">
              {popularArtworks.length > 0 ? (
                popularArtworks.map((artwork) => (
                  <div
                    key={artwork.id}
                    className="flex items-center gap-4 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
                    onClick={() => handleViewArtwork(artwork.id)}
                  >
                    <img
                      src={artwork.imageUrl}
                      alt={artwork.title}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div>
                      <h3 className="font-medium">{artwork.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center">
                          <Eye className="h-4 w-4 mr-1" />
                          {artwork.views}
                        </span>
                        <span className="flex items-center">
                          <Heart className="h-4 w-4 mr-1" />
                          {artwork.likes}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-500 py-8">
                  No hay obras populares aún
                </div>
              )}
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-bold mb-4">Ventas Recientes</h2>
            <div className="space-y-4">
              {recentSales.length > 0 ? (
                recentSales.map((sale) => (
                  <div
                    key={sale.id}
                    className="flex items-center gap-4 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
                    onClick={() => handleViewSale(sale.id)}
                  >
                    <img
                      src={sale.artworkImage}
                      alt={sale.artworkTitle}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div>
                      <h3 className="font-medium">{sale.artworkTitle}</h3>
                      <div className="flex flex-col text-sm">
                        <span className="text-green-600 font-medium">
                          ${sale.price}
                        </span>
                        <span className="text-gray-500">
                          Vendido el {sale.soldAt}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-500 py-8">
                  No hay ventas recientes
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-2">Error</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Artendency link */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <Link
              to="/"
              className="text-2xl font-serif text-[#C4A484] hover:text-[#B39476]"
            >
              Artendency
            </Link>
            <div className="flex items-center space-x-4">
              <ArtistAvatar
                avatarUrl={profile?.avatar_url}
                userId={user?.id}
                onAvatarUpdate={(url) =>
                  setProfile((prev) =>
                    prev ? { ...prev, avatar_url: url } : null
                  )
                }
              />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Routes for specific pages */}
        <Routes>
          {/* Ruta de upload debe ir primero para tener prioridad */}
          <Route path="artworks/upload" element={<ArtworkUpload />} />

          {/* Rutas dinámicas después */}
          <Route
            path="artworks/:artworkId/edit"
            element={<ArtworkEditForm />}
          />
          <Route path="artworks/:artworkId" element={<ArtworkDetail />} />
          <Route path="sales/:saleId" element={<SaleDetail />} />

          {/* Ruta por defecto para el dashboard */}
          <Route
            path="*"
            element={
              <>
                {/* Tabs navigation */}
                <div className="bg-white p-1 rounded-xl shadow-sm overflow-x-auto mb-6">
                  <div className="flex">
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => handleTabChange(tab.id)}
                        className={`flex-1 py-3 px-4 text-center whitespace-nowrap transition-colors ${
                          activeTab === tab.id
                            ? "bg-gray-100 text-gray-900 font-medium"
                            : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tab content */}
                {activeTab === "resumen" && <DashboardContent />}
                {activeTab === "obras" && (
                  <ArtworksSection
                    artworks={artworks}
                    onUpload={handleUploadArtwork}
                  />
                )}
                {activeTab === "consultas" && <InquiryCenter />}
                {activeTab === "pendientes" && (
                  <ArtworksSection
                    artworks={pendingArtworks}
                    filterStatus="pending"
                  />
                )}
                {activeTab === "ventas" && (
                  <ArtworksSection
                    artworks={artworks.filter((a) => a.status === "sold")}
                    filterStatus="sold"
                  />
                )}
                {activeTab === "configuracion" && <SettingsSection />}
              </>
            }
          />
        </Routes>
      </main>
    </div>
  );
}
