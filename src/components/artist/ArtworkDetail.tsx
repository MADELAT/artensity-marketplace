import { FC, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Edit, Eye, Heart, DollarSign } from 'lucide-react';
import { Loader2 } from 'lucide-react';

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

export const ArtworkDetail: FC = () => {
  const { artworkId } = useParams<{ artworkId: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [artwork, setArtwork] = useState<Artwork | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArtwork = async () => {
      if (!artworkId || !user?.id) return;

      try {
        const { data, error } = await supabase
          .from('artworks')
          .select('*')
          .eq('id', artworkId)
          .eq('artist_id', user.id)
          .single();

        if (error) throw error;
        if (!data) {
          setError('Obra no encontrada');
          return;
        }

        setArtwork(data);
      } catch (error) {
        console.error('Error fetching artwork:', error);
        setError('Error al cargar la obra');
      } finally {
        setIsLoading(false);
      }
    };

    fetchArtwork();
  }, [artworkId, user]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleEdit = () => {
    if (artwork) {
      navigate(`/dashboard/artist/artworks/${artwork.id}/edit`);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    );
  }

  if (error || !artwork) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500 mb-4">{error || 'Obra no encontrada'}</p>
        <Button onClick={handleBack} variant="outline">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <Button onClick={handleBack} variant="outline">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver
        </Button>
        {artwork.status !== 'sold' && (
          <Button onClick={handleEdit} className="bg-[#C4A484] hover:bg-[#B39476] text-white">
            <Edit className="h-4 w-4 mr-2" />
            Editar Obra
          </Button>
        )}
      </div>

      <Card>
        <div className="aspect-video w-full relative">
          <img
            src={artwork.image_url}
            alt={artwork.title}
            className="w-full h-full object-contain"
          />
        </div>
        <CardHeader>
          <CardTitle className="text-3xl">{artwork.title}</CardTitle>
          <div className="flex items-center gap-4 text-gray-500">
            <span className="flex items-center">
              <Eye className="h-4 w-4 mr-1" />
              {artwork.views || 0} vistas
            </span>
            <span className="flex items-center">
              <Heart className="h-4 w-4 mr-1" />
              {artwork.likes || 0} me gusta
            </span>
            <span className="flex items-center text-green-600 font-medium">
              <DollarSign className="h-4 w-4 mr-1" />
              ${artwork.price}
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Descripción</h3>
              <p className="text-gray-600">{artwork.description || 'Sin descripción'}</p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Estado</h3>
              <span className={`px-3 py-1 rounded-full text-sm ${
                artwork.status === 'active' ? 'bg-green-100 text-green-800' :
                artwork.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {artwork.status === 'active' ? 'Activa' :
                 artwork.status === 'pending' ? 'Pendiente' : 'Vendida'}
              </span>
            </div>
            <div>
              <h3 className="font-medium mb-2">Fecha de creación</h3>
              <p className="text-gray-600">
                {new Date(artwork.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}; 