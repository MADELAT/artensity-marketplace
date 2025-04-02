
import { useState, useEffect } from 'react';
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
import { CheckCircle, XCircle, Eye } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from "@/components/ui/textarea";
import { supabase } from '@/integrations/supabase/client';
import { toast as sonnerToast } from 'sonner';

export default function ArtworkApproval() {
  const { toast } = useToast();
  const [rejectReason, setRejectReason] = useState('');
  const [pendingArtworks, setPendingArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedArtwork, setSelectedArtwork] = useState(null);

  useEffect(() => {
    fetchPendingArtworks();
  }, []);

  const fetchPendingArtworks = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('pending_artworks')
        .select('*, profiles:artist_id(first_name, last_name)')
        .eq('status', 'pending');

      if (error) throw error;
      setPendingArtworks(data || []);
    } catch (error) {
      console.error('Error fetching pending artworks:', error);
      toast({
        title: "Error",
        description: "No se pudieron cargar las obras pendientes",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (artwork) => {
    try {
      // Add to approved artworks
      const { error: insertError } = await supabase
        .from('artworks')
        .insert([
          {
            title: artwork.title,
            artist_id: artwork.artist_id,
            price: artwork.price,
            description: artwork.description,
            image_url: artwork.image_url,
            technique: artwork.technique,
            dimensions: artwork.dimensions,
            category: artwork.category,
            style: artwork.style,
            year: artwork.year
          }
        ]);
      
      if (insertError) throw insertError;

      // Update status in pending_artworks
      const { error: updateError } = await supabase
        .from('pending_artworks')
        .update({ status: 'approved' })
        .eq('id', artwork.id);
      
      if (updateError) throw updateError;

      // Update local state
      setPendingArtworks(pendingArtworks.filter(a => a.id !== artwork.id));
      
      // Close dialog if open
      setDialogOpen(false);
      
      // Show toast notification
      sonnerToast.success('Obra aprobada', {
        description: `La obra "${artwork.title}" ha sido aprobada y publicada`,
      });
    } catch (error) {
      console.error('Error approving artwork:', error);
      sonnerToast.error('Error', {
        description: "No se pudo aprobar la obra",
      });
    }
  };

  const handleReject = async (artwork) => {
    if (!rejectReason) {
      sonnerToast.error('Error', {
        description: "Por favor proporciona una razón para el rechazo",
      });
      return;
    }
    
    try {
      const { error } = await supabase
        .from('pending_artworks')
        .update({ 
          status: 'rejected',
          admin_comment: rejectReason
        })
        .eq('id', artwork.id);
      
      if (error) throw error;
      
      // Update local state
      setPendingArtworks(pendingArtworks.filter(a => a.id !== artwork.id));
      
      // Reset form and close dialog
      setRejectReason('');
      setDialogOpen(false);
      
      // Show toast notification
      sonnerToast.success('Obra rechazada', {
        description: `La obra "${artwork.title}" ha sido rechazada`,
      });
    } catch (error) {
      console.error('Error rejecting artwork:', error);
      sonnerToast.error('Error', {
        description: "No se pudo rechazar la obra",
      });
    }
  };

  const openArtworkDetails = (artwork) => {
    setSelectedArtwork(artwork);
    setDialogOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Aprobación de Obras</h2>
        <Button onClick={fetchPendingArtworks} variant="outline">Actualizar</Button>
      </div>
      
      {loading ? (
        <div className="text-center py-10">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary border-r-transparent"></div>
          <p className="mt-2 text-sm text-muted-foreground">Cargando obras pendientes...</p>
        </div>
      ) : pendingArtworks.length === 0 ? (
        <div className="text-center py-8 bg-muted/30 rounded-lg border">
          <p className="text-muted-foreground">No hay obras pendientes de aprobación</p>
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Vista previa</TableHead>
                <TableHead>Título</TableHead>
                <TableHead>Artista</TableHead>
                <TableHead>Precio</TableHead>
                <TableHead>Categoría</TableHead>
                <TableHead>Enviada</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pendingArtworks.map((artwork) => (
                <TableRow key={artwork.id}>
                  <TableCell>
                    <img 
                      src={artwork.image_url || "https://via.placeholder.com/150"}
                      alt={artwork.title} 
                      className="w-16 h-16 object-cover rounded-md cursor-pointer hover:opacity-80 transition-opacity"
                      onClick={() => openArtworkDetails(artwork)}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{artwork.title}</TableCell>
                  <TableCell>
                    {artwork.profiles?.first_name} {artwork.profiles?.last_name}
                  </TableCell>
                  <TableCell>${artwork.price}</TableCell>
                  <TableCell>{artwork.category}</TableCell>
                  <TableCell>{new Date(artwork.created_at).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => openArtworkDetails(artwork)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        Ver
                      </Button>
                      
                      <Button 
                        variant="default" 
                        size="sm"
                        onClick={() => handleApprove(artwork)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Aprobar
                      </Button>
                      
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => {
                          setSelectedArtwork(artwork);
                          setDialogOpen(true);
                        }}
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

      {/* Artwork Detail Modal */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl">
          {selectedArtwork && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedArtwork.title}</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="aspect-square relative max-h-96">
                  <img 
                    src={selectedArtwork.image_url || "https://via.placeholder.com/800"} 
                    alt={selectedArtwork.title} 
                    className="w-full h-full object-contain rounded-md"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium">Artista</p>
                    <p className="text-sm">{selectedArtwork.profiles?.first_name} {selectedArtwork.profiles?.last_name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Precio</p>
                    <p className="text-sm">${selectedArtwork.price}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Categoría</p>
                    <p className="text-sm">{selectedArtwork.category || "No especificada"}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Enviada</p>
                    <p className="text-sm">{new Date(selectedArtwork.created_at).toLocaleDateString()}</p>
                  </div>
                  {selectedArtwork.technique && (
                    <div>
                      <p className="text-sm font-medium">Técnica</p>
                      <p className="text-sm">{selectedArtwork.technique}</p>
                    </div>
                  )}
                  {selectedArtwork.dimensions && (
                    <div>
                      <p className="text-sm font-medium">Dimensiones</p>
                      <p className="text-sm">{selectedArtwork.dimensions}</p>
                    </div>
                  )}
                </div>
                
                {selectedArtwork.description && (
                  <div>
                    <p className="text-sm font-medium mb-1">Descripción</p>
                    <p className="text-sm text-muted-foreground">{selectedArtwork.description}</p>
                  </div>
                )}
                
                <div>
                  <p className="text-sm font-medium mb-2">Comentario del administrador</p>
                  <Textarea
                    placeholder="Proporciona feedback para el artista..."
                    value={rejectReason}
                    onChange={(e) => setRejectReason(e.target.value)}
                  />
                </div>
                
                <div className="flex justify-end gap-2">
                  <Button 
                    variant="outline" 
                    onClick={() => handleReject(selectedArtwork)}
                  >
                    <XCircle className="h-4 w-4 mr-1" />
                    Rechazar
                  </Button>
                  <Button onClick={() => handleApprove(selectedArtwork)}>
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Aprobar
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
