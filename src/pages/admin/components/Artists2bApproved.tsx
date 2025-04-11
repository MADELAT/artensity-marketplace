import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, XCircle, Eye } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast as sonnerToast } from "sonner";

interface PendingArtist {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  avatar_url?: string;
  bio?: string;
  website?: string;
  instagram?: string;
  created_at: string;
  portfolio_url?: string;
  artistic_statement?: string;
}

export default function Artists2bApproved() {
  const { toast } = useToast();
  const [rejectReason, setRejectReason] = useState("");
  const [pendingArtists, setPendingArtists] = useState<PendingArtist[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedArtist, setSelectedArtist] = useState<PendingArtist | null>(
    null
  );
  const [viewMode, setViewMode] = useState<"details" | "reject">("details");

  useEffect(() => {
    fetchPendingArtists();
  }, []);

  const fetchPendingArtists = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("status", "pending")
        .eq("role", "artist");

      if (error) throw error;
      setPendingArtists(data || []);
    } catch (error) {
      console.error("Error fetching pending artists:", error);
      toast({
        title: "Error",
        description: "No se pudieron cargar los artistas pendientes",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (artist: PendingArtist) => {
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          status: "approved",
          approved_at: new Date().toISOString(),
        })
        .eq("id", artist.id);

      if (error) throw error;

      setPendingArtists((prev) => prev.filter((a) => a.id !== artist.id));
      setDialogOpen(false);

      sonnerToast.success("Artista aprobado", {
        description: `${artist.first_name} ${artist.last_name} ha sido aprobado`,
      });
    } catch (error) {
      console.error("Error approving artist:", error);
      sonnerToast.error("Error", {
        description: "No se pudo aprobar al artista",
      });
    }
  };

  const handleReject = async (artist: PendingArtist) => {
    if (!rejectReason) {
      sonnerToast.error("Error", {
        description: "Por favor proporciona una razón para el rechazo",
      });
      return;
    }

    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          status: "rejected",
          rejection_reason: rejectReason,
          rejected_at: new Date().toISOString(),
        })
        .eq("id", artist.id);

      if (error) throw error;

      setPendingArtists((prev) => prev.filter((a) => a.id !== artist.id));
      setRejectReason("");
      setDialogOpen(false);

      sonnerToast.success("Artista rechazado", {
        description: `${artist.first_name} ${artist.last_name} ha sido rechazado`,
      });
    } catch (error) {
      console.error("Error rejecting artist:", error);
      sonnerToast.error("Error", {
        description: "No se pudo rechazar al artista",
      });
    }
  };

  const openArtistDetails = (artist: PendingArtist) => {
    setSelectedArtist(artist);
    setViewMode("details");
    setDialogOpen(true);
  };

  const openRejectDialog = (artist: PendingArtist) => {
    setSelectedArtist(artist);
    setViewMode("reject");
    setDialogOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Aprobación de Artistas</h2>
        <Button onClick={fetchPendingArtists} variant="outline">
          Actualizar
        </Button>
      </div>

      {loading ? (
        <div className="text-center py-10">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary border-r-transparent"></div>
          <p className="mt-2 text-sm text-muted-foreground">
            Cargando artistas pendientes...
          </p>
        </div>
      ) : pendingArtists.length === 0 ? (
        <div className="text-center py-8 bg-muted/30 rounded-lg border">
          <p className="text-muted-foreground">
            No hay artistas pendientes de aprobación
          </p>
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Avatar</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Teléfono</TableHead>
                <TableHead>Registro</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pendingArtists.map((artist) => (
                <TableRow key={artist.id}>
                  <TableCell>
                    <img
                      src={
                        artist.avatar_url || "https://via.placeholder.com/150"
                      }
                      alt={`${artist.first_name} ${artist.last_name}`}
                      className="w-12 h-12 object-cover rounded-full"
                    />
                  </TableCell>
                  <TableCell className="font-medium">
                    {artist.first_name} {artist.last_name}
                  </TableCell>
                  <TableCell>{artist.email}</TableCell>
                  <TableCell>{artist.phone || "No disponible"}</TableCell>
                  <TableCell>
                    {new Date(artist.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openArtistDetails(artist)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        Ver
                      </Button>
                      <Button
                        variant="default"
                        size="sm"
                        onClick={() => handleApprove(artist)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Aprobar
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => openRejectDialog(artist)}
                      >
                        <XCircle className="h-4 w-4 mr-1" />
                        Rechazar
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl">
          {selectedArtist && viewMode === "details" && (
            <>
              <DialogHeader>
                <DialogTitle>Detalles del Artista</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="flex items-center gap-4">
                  <img
                    src={
                      selectedArtist.avatar_url ||
                      "https://via.placeholder.com/150"
                    }
                    alt={`${selectedArtist.first_name} ${selectedArtist.last_name}`}
                    className="w-24 h-24 object-cover rounded-full"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">
                      {selectedArtist.first_name} {selectedArtist.last_name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {selectedArtist.email}
                    </p>
                  </div>
                </div>

                {selectedArtist.bio && (
                  <div>
                    <h4 className="font-medium mb-1">Biografía</h4>
                    <p className="text-sm text-muted-foreground">
                      {selectedArtist.bio}
                    </p>
                  </div>
                )}

                {selectedArtist.artistic_statement && (
                  <div>
                    <h4 className="font-medium mb-1">Declaración Artística</h4>
                    <p className="text-sm text-muted-foreground">
                      {selectedArtist.artistic_statement}
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  {selectedArtist.website && (
                    <div>
                      <h4 className="font-medium mb-1">Sitio Web</h4>
                      <a
                        href={selectedArtist.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:underline"
                      >
                        {selectedArtist.website}
                      </a>
                    </div>
                  )}

                  {selectedArtist.instagram && (
                    <div>
                      <h4 className="font-medium mb-1">Instagram</h4>
                      <a
                        href={`https://instagram.com/${selectedArtist.instagram}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:underline"
                      >
                        @{selectedArtist.instagram}
                      </a>
                    </div>
                  )}
                </div>

                {selectedArtist.portfolio_url && (
                  <div>
                    <h4 className="font-medium mb-1">Portfolio</h4>
                    <a
                      href={selectedArtist.portfolio_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:underline"
                    >
                      Ver portfolio completo
                    </a>
                  </div>
                )}

                <div className="flex justify-end gap-2 mt-4">
                  <Button
                    variant="outline"
                    onClick={() => setDialogOpen(false)}
                  >
                    Cerrar
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => setViewMode("reject")}
                  >
                    Rechazar
                  </Button>
                  <Button
                    onClick={() => handleApprove(selectedArtist)}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Aprobar
                  </Button>
                </div>
              </div>
            </>
          )}

          {selectedArtist && viewMode === "reject" && (
            <>
              <DialogHeader>
                <DialogTitle>
                  Rechazar a {selectedArtist.first_name}{" "}
                  {selectedArtist.last_name}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <Textarea
                  placeholder="Proporciona una razón para el rechazo..."
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                />
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setViewMode("details")}
                  >
                    Volver
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => handleReject(selectedArtist)}
                  >
                    Confirmar rechazo
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
