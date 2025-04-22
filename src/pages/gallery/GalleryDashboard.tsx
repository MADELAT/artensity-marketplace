import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// Removed Tabs components import as manual tab system is used instead
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import NotificationsCenter from "@/pages/admin/components/NotificationsCenter";
import { StatCard } from "@/components/dashboard/StatCard";
import { useAuth } from "@/contexts/AuthContext";
import {
  PieChart,
  LineChart,
  Users,
  Image,
  ShoppingBag,
  Plus,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import NewArtistForm from "@/components/artist/NewArtistForm";

// Mock artist data for demonstration
const mockArtists = [
  {
    id: "1",
    name: "Carmen Herrera",
    avatar:
      "https://images.unsplash.com/photo-1584184924103-e310d9dc31f7?q=80&w=1000",
    style: "Abstracto geométrico",
    artworks: 24,
    sales: 12,
  },
  {
    id: "2",
    name: "Miguel Ángel Rojas",
    avatar:
      "https://images.unsplash.com/photo-1567784177951-6fa58317e16b?q=80&w=800",
    style: "Arte conceptual",
    artworks: 18,
    sales: 8,
  },
  {
    id: "3",
    name: "Doris Salcedo",
    avatar:
      "https://images.unsplash.com/photo-1607462109225-6b64ae2dd3cb?q=80&w=774",
    style: "Instalación",
    artworks: 9,
    sales: 5,
  },
  {
    id: "4",
    name: "Oscar Murillo",
    avatar:
      "https://images.unsplash.com/photo-1577720580479-7d839d829c73?q=80&w=870",
    style: "Arte contemporáneo",
    artworks: 32,
    sales: 17,
  },
];

// Mock recent artworks data
const mockRecentArtworks = [
  {
    id: "101",
    title: "Estructura en Azul",
    artist: "Carmen Herrera",
    price: 12500,
    image:
      "https://images.unsplash.com/photo-1541961017774-22349e4a1262?q=80&w=858",
    date: "2023-09-15",
  },
  {
    id: "102",
    title: "Reflejo Urbano",
    artist: "Miguel Ángel Rojas",
    price: 8900,
    image:
      "https://images.unsplash.com/photo-1578926288207-32356bf60f27?q=80&w=987",
    date: "2023-10-02",
  },
  {
    id: "103",
    title: "Memorias del Silencio",
    artist: "Doris Salcedo",
    price: 15700,
    image:
      "https://images.unsplash.com/photo-1579541591970-e5943b6845fe?q=80&w=870",
    date: "2023-10-12",
  },
];

export default function GalleryDashboard() {
  const { profile } = useAuth();
  const [activeTab, setActiveTab] = useState("dashboard");
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const [showNewArtistModal, setShowNewArtistModal] = useState(false);

  const tabs = [
    { value: "dashboard", label: "Overview" },
    { value: "artists", label: "Artists" },
    { value: "artworks", label: "Artworks" },
    { value: "sales", label: "Sales" },
    { value: "exhibitions", label: "Exhibitions" },
    { value: "settings", label: "Settings" },
    { value: "notifications", label: "Notifications" },
  ];

  const handleAddArtist = () => {
    setShowNewArtistModal(true);
  };

  const handleUploadArtwork = () => {
    navigate("/gallery/artworks/upload");
  };

  return (
    <>
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <Link
              to="/"
              className="text-2xl font-serif text-[#C4A484] hover:text-[#B39476]"
            >
              Artendency
            </Link>
          </div>
        </div>
      </header>
      <DashboardLayout>
        <div className="flex flex-col space-y-6">
          <div>
            <h1 className="text-3xl font-bold">Gallery Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome, {profile?.last_name || "Gallery"}
            </p>
          </div>

          <div className="bg-white p-1 rounded-xl shadow-sm overflow-x-auto mb-6">
            <div className="flex">
              {tabs.map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => setActiveTab(tab.value)}
                  className={`flex-1 py-3 px-4 text-center whitespace-nowrap transition-colors ${
                    activeTab === tab.value
                      ? "bg-gray-100 text-gray-900 font-medium"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {activeTab === "dashboard" && (
            <div className="space-y-6 mt-6">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatCard
                  title="Represented Artists"
                  value={mockArtists.length.toString()}
                  description="Diverse styles & techniques"
                  icon={<Users className="h-4 w-4 text-blue-500" />}
                />
                <StatCard
                  title="Artworks"
                  value="83"
                  description="62 Artworks in exhibition"
                  icon={<Image className="h-4 w-4 text-green-500" />}
                />
                <StatCard
                  title="Monthly sales"
                  value="€14,580"
                  description="This month"
                  icon={<LineChart className="h-4 w-4 text-purple-500" />}
                />
                <StatCard
                  title="Commissions"
                  value="€2,840"
                  description="This month"
                  icon={<ShoppingBag className="h-4 w-4 text-amber-500" />}
                />
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg font-medium">
                      Featured Artists
                    </CardTitle>
                    <CardDescription>
                      Artists featured in your gallery
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {mockArtists.slice(0, 3).map((artist) => (
                      <div
                        key={artist.id}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage
                              src={artist.avatar}
                              alt={artist.name}
                            />
                            <AvatarFallback>
                              {artist.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{artist.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {artist.style}
                            </p>
                          </div>
                        </div>
                        <div className="text-sm">
                          <p>{artist.artworks} artworks</p>
                          <p className="text-xs text-muted-foreground">
                            {artist.sales} sold
                          </p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={handleAddArtist}
                    >
                      <Plus className="h-4 w-4 mr-2" /> New artist
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg font-medium">
                      Recent Artworks
                    </CardTitle>
                    <CardDescription>
                      Newest pieces in your gallery
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
                          <p className="text-xs text-muted-foreground">
                            {artwork.artist}
                          </p>
                          <div className="flex justify-between items-center mt-1">
                            <span className="text-sm font-medium">
                              €{artwork.price.toLocaleString()}
                            </span>
                            <Badge variant="outline">{artwork.date}</Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={handleUploadArtwork}
                    >
                      <Plus className="h-4 w-4 mr-2" /> Upload new artwork
                    </Button>
                  </CardFooter>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-medium">
                    Recent Activity
                  </CardTitle>
                  <CardDescription>
                    Recent movements and events in your gallery
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border-l-2 border-primary pl-4 py-1">
                      <p className="font-medium">New artwork uploaded</p>
                      <p className="text-sm text-muted-foreground">
                        Carmen Herrera subió "Estructura en Azul"
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Hace 3 días
                      </p>
                    </div>
                    <div className="border-l-2 border-green-500 pl-4 py-1">
                      <p className="font-medium">Completed sale</p>
                      <p className="text-sm text-muted-foreground">
                        "Reflejo Urbano" fue vendido por €8,900
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Hace 5 días
                      </p>
                    </div>
                    <div className="border-l-2 border-blue-500 pl-4 py-1">
                      <p className="font-medium">New artist joined</p>
                      <p className="text-sm text-muted-foreground">
                        Oscar Murillo se ha unido a tu galería
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Hace 1 semana
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "artists" && (
            <div className="space-y-6 mt-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-medium">Represented Artists</h2>
                <Button onClick={handleAddArtist}>
                  <Plus className="h-4 w-4 mr-2" /> New Artist
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockArtists.map((artist) => (
                  <Link
                    to={`/gallery/artists/${artist.id}`}
                    key={artist.id}
                    className="block"
                  >
                    <Card className="h-full transition-shadow hover:shadow-md">
                      <CardHeader className="pb-2">
                        <div className="flex items-center gap-4">
                          <Avatar className="h-12 w-12">
                            <AvatarImage
                              src={artist.avatar}
                              alt={artist.name}
                            />
                            <AvatarFallback>
                              {artist.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle className="text-lg">
                              {artist.name}
                            </CardTitle>
                            <CardDescription>{artist.style}</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="flex justify-between text-sm">
                          <span>
                            <strong>{artist.artworks}</strong> artworks
                          </span>
                          <span>
                            <strong>{artist.sales}</strong> sold
                          </span>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button variant="outline" size="sm">
                          Manage artworks
                        </Button>
                        <Button variant="secondary" size="sm">
                          View profile
                        </Button>
                      </CardFooter>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {activeTab === "artworks" && (
            <div className="space-y-6 mt-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-medium">
                  Artworks in your gallery
                </h2>
                <Button onClick={handleUploadArtwork}>
                  <Plus className="h-4 w-4 mr-2" /> Upload artwork
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {mockRecentArtworks
                  .concat(mockRecentArtworks)
                  .map((artwork, index) => (
                    <Card
                      key={`${artwork.id}-${index}`}
                      className="overflow-hidden"
                    >
                      <div className="aspect-[4/3] relative">
                        <img
                          src={artwork.image}
                          alt={artwork.title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <CardContent className="pt-4">
                        <h3 className="font-medium">{artwork.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {artwork.artist}
                        </p>
                        <p className="text-sm font-medium mt-1">
                          €{artwork.price.toLocaleString()}
                        </p>
                      </CardContent>
                      <CardFooter className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          Edit
                        </Button>
                        <Button
                          variant="secondary"
                          size="sm"
                          className="flex-1"
                        >
                          View
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </div>
          )}

          {activeTab === "sales" && (
            <div className="space-y-6 mt-6">
              <Card className="p-6">
                <h3 className="text-lg font-medium mb-4">Sales history</h3>
                <div className="space-y-4">
                  <p className="text-center py-8 text-muted-foreground">
                    The sales history will be available soon.
                  </p>
                </div>
              </Card>
            </div>
          )}

          {activeTab === "exhibitions" && (
            <div className="space-y-6 mt-6">
              <Card className="p-6">
                <h3 className="text-lg font-medium mb-4">Exhibitions</h3>
                <div className="space-y-4">
                  <p className="text-center py-8 text-muted-foreground">
                    The exhibitions management will be available soon.
                  </p>
                </div>
              </Card>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="space-y-6 mt-6">
              <Card className="p-6">
                <h3 className="text-lg font-medium mb-4">Gallery settings</h3>
                <div className="space-y-4">
                  <p className="text-center py-8 text-muted-foreground">
                    The gallery settings will be available soon.
                  </p>
                </div>
              </Card>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="space-y-6 mt-6">
              <NotificationsCenter />
            </div>
          )}
        </div>
      </DashboardLayout>
      {/* Modal for New Artist Form */}
      {showNewArtistModal && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center px-4"
          onClick={() => setShowNewArtistModal(false)}
        >
          <div
            className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-lg relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-xl font-bold"
              onClick={() => setShowNewArtistModal(false)}
            >
              &times;
            </button>
            <NewArtistForm onSuccess={() => setShowNewArtistModal(false)} />
          </div>
        </div>
      )}
    </>
  );
}
