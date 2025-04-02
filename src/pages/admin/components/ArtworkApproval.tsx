
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

export default function ArtworkApproval() {
  const { toast } = useToast();
  const [rejectReason, setRejectReason] = useState('');
  const [pendingArtworks, setPendingArtworks] = useState([]);
  const [loading, setLoading] = useState(true);

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
      
      toast({
        title: "Obra Aprobada",
        description: `La obra "${artwork.title}" ha sido aprobada y publicada`,
        variant: "default",
      });
    } catch (error) {
      console.error('Error approving artwork:', error);
      toast({
        title: "Error",
        description: "No se pudo aprobar la obra",
        variant: "destructive",
      });
    }
  };

  const handleReject = async (artwork) => {
    if (!rejectReason) {
      toast({
        title: "Error en el rechazo",
        description: "Por favor proporciona una razón para el rechazo",
        variant: "destructive",
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
      
      setRejectReason('');
      
      toast({
        title: "Obra Rechazada",
        description: `La obra "${artwork.title}" ha sido rechazada`,
        variant: "default",
      });
    } catch (error) {
      console.error('Error rejecting artwork:', error);
      toast({
        title: "Error",
        description: "No se pudo rechazar la obra",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Aprobación de Obras</h2>
        <Button onClick={fetchPendingArtworks}>Actualizar</Button>
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
                      className="w-16 h-16 object-cover rounded"
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
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-1" />
                            Ver
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>{artwork.title}</DialogTitle>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="aspect-square relative max-h-96">
                              <img 
                                src={artwork.image_url || "https://via.placeholder.com/800"} 
                                alt={artwork.title} 
                                className="w-full h-full object-contain rounded-md"
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm font-medium">Artista</p>
                                <p className="text-sm">{artwork.profiles?.first_name} {artwork.profiles?.last_name}</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium">Precio</p>
                                <p className="text-sm">${artwork.price}</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium">Categoría</p>
                                <p className="text-sm">{artwork.category || "No especificada"}</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium">Enviada</p>
                                <p className="text-sm">{new Date(artwork.created_at).toLocaleDateString()}</p>
                              </div>
                              {artwork.technique && (
                                <div>
                                  <p className="text-sm font-medium">Técnica</p>
                                  <p className="text-sm">{artwork.technique}</p>
                                </div>
                              )}
                              {artwork.dimensions && (
                                <div>
                                  <p className="text-sm font-medium">Dimensiones</p>
                                  <p className="text-sm">{artwork.dimensions}</p>
                                </div>
                              )}
                            </div>
                            
                            {artwork.description && (
                              <div>
                                <p className="text-sm font-medium mb-1">Descripción</p>
                                <p className="text-sm text-muted-foreground">{artwork.description}</p>
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
                                onClick={() => handleReject(artwork)}
                              >
                                <XCircle className="h-4 w-4 mr-1" />
                                Rechazar
                              </Button>
                              <Button onClick={() => handleApprove(artwork)}>
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Aprobar
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                      
                      <Button 
                        variant="default" 
                        size="sm"
                        onClick={() => handleApprove(artwork)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Aprobar
                      </Button>
                      
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="destructive" size="sm">
                            <XCircle className="h-4 w-4 mr-1" />
                            Rechazar
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Rechazar Obra</DialogTitle>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <p>Por favor proporciona una razón para rechazar esta obra:</p>
                            <Textarea
                              placeholder="Motivo del rechazo..."
                              value={rejectReason}
                              onChange={(e) => setRejectReason(e.target.value)}
                            />
                            <Button 
                              variant="destructive"
                              onClick={() => handleReject(artwork)}
                            >
                              Confirmar Rechazo
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
