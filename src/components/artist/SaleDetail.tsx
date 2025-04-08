import { FC, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, DollarSign, Calendar, User } from 'lucide-react';
import { Loader2 } from 'lucide-react';

interface Sale {
  id: string;
  artwork_id: string;
  buyer_id: string;
  price: number;
  created_at: string;
  artwork: {
    id: string;
    title: string;
    image_url: string;
    description?: string;
  };
  buyer: {
    id: string;
    first_name: string;
    last_name: string;
    avatar_url?: string;
  };
}

export const SaleDetail: FC = () => {
  const { saleId } = useParams<{ saleId: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [sale, setSale] = useState<Sale | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSale = async () => {
      if (!saleId || !user?.id) return;

      try {
        const { data, error } = await supabase
          .from('sales')
          .select(`
            *,
            artwork:artworks (
              id,
              title,
              image_url,
              description
            ),
            buyer:profiles (
              id,
              first_name,
              last_name,
              avatar_url
            )
          `)
          .eq('id', saleId)
          .eq('artist_id', user.id)
          .single();

        if (error) throw error;
        if (!data) {
          setError('Venta no encontrada');
          return;
        }

        setSale(data);
      } catch (error) {
        console.error('Error fetching sale:', error);
        setError('Error al cargar la venta');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSale();
  }, [saleId, user]);

  const handleBack = () => {
    navigate(-1);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    );
  }

  if (error || !sale) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500 mb-4">{error || 'Venta no encontrada'}</p>
        <Button onClick={handleBack} variant="outline">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Button onClick={handleBack} variant="outline">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">Detalles de la Venta</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <img
                src={sale.artwork.image_url}
                alt={sale.artwork.title}
                className="w-full aspect-square object-cover rounded-lg"
              />
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-medium mb-2">{sale.artwork.title}</h3>
                <p className="text-gray-600">{sale.artwork.description}</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="text-sm text-gray-500">Precio de venta</p>
                    <p className="font-medium text-green-600">${sale.price}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-500">Fecha de venta</p>
                    <p className="font-medium">
                      {new Date(sale.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <User className="h-5 w-5 text-purple-600" />
                  <div>
                    <p className="text-sm text-gray-500">Comprador</p>
                    <p className="font-medium">
                      {sale.buyer.first_name} {sale.buyer.last_name}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}; 