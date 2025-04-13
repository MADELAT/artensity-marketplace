import { FC, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Grid, List, Plus } from "lucide-react";

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

interface ArtworksSectionProps {
  artworks: Artwork[];
  filterStatus?: "pending" | "active" | "sold" | "approved";
  onUpload?: () => void;
}

export const ArtworksSection: FC<ArtworksSectionProps> = ({
  artworks,
  filterStatus,
  onUpload,
}) => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const handleEditArtwork = (artworkId: string) => {
    navigate(`/dashboard/artist/artworks/${artworkId}/edit`);
  };

  const handleViewArtwork = (artworkId: string) => {
    navigate(`/dashboard/artist/artworks/${artworkId}`);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <CardTitle className="text-2xl">
          {filterStatus === "pending"
            ? "Obras Pendientes"
            : filterStatus === "sold"
            ? "Obras Vendidas"
            : "Mis Obras"}
        </CardTitle>
        <div className="flex gap-2">
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            onClick={() => setViewMode("grid")}
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            onClick={() => setViewMode("list")}
          >
            <List className="h-4 w-4" />
          </Button>
          {onUpload && (
            <Button
              onClick={onUpload}
              className="bg-[#C4A484] hover:bg-[#B39476] text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Nueva Obra
            </Button>
          )}
        </div>
      </div>

      {artworks.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center text-muted-foreground">
            No hay obras{" "}
            {filterStatus ? `en estado ${filterStatus}` : "disponibles"}
          </CardContent>
        </Card>
      ) : (
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
              : "space-y-4"
          }
        >
          {artworks.map((artwork) => (
            <Card key={artwork.id} className="overflow-hidden">
              <img
                src={artwork.image_url}
                alt={artwork.title}
                className="w-full h-48 object-cover cursor-pointer"
                onClick={() => handleViewArtwork(artwork.id)}
              />
              <CardHeader>
                <CardTitle>{artwork.title}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {artwork.description}
                </p>
                <div className="flex items-center justify-between mt-2">
                  <span className="font-medium">${artwork.price}</span>
                  <span
                    className={`px-2 py-1 text-xs rounded ${
                      artwork.status === "active"
                        ? "bg-green-100 text-green-800"
                        : artwork.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {artwork.status === "active"
                      ? "Activa"
                      : artwork.status === "pending"
                      ? "Pendiente"
                      : "Vendida"}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  {artwork.status !== "sold" && (
                    <Button
                      variant="outline"
                      onClick={() => handleEditArtwork(artwork.id)}
                    >
                      Editar
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    onClick={() => handleViewArtwork(artwork.id)}
                  >
                    Ver Detalles
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
