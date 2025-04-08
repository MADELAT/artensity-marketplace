import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, AlertCircle } from 'lucide-react';

interface Artwork {
  id: string;
  title: string;
  description: string;
  price: number;
  image_url: string;
  status: 'available' | 'sold';
  artist_id: string;
}

export function ArtworkEditForm() {
  const { artworkId } = useParams<{ artworkId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [artwork, setArtwork] = useState<Artwork | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    image: null as File | null,
  });

  useEffect(() => {
    const fetchArtwork = async () => {
      if (!artworkId) {
        setError('No artwork ID provided');
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('artworks')
          .select('*')
          .eq('id', artworkId)
          .single();

        if (error) throw error;
        if (!data) {
          setError('Artwork not found');
          setLoading(false);
          return;
        }

        setArtwork(data);
        setFormData({
          title: data.title,
          description: data.description,
          price: data.price.toString(),
          image: null,
        });
      } catch (err) {
        setError('Failed to load artwork');
        console.error('Error fetching artwork:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchArtwork();
  }, [artworkId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, image: e.target.files![0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!artworkId || !user) return;

    setSaving(true);
    setError(null);

    try {
      let imageUrl = artwork?.image_url;

      // Upload new image if provided
      if (formData.image) {
        const fileExt = formData.image.name.split('.').pop();
        const fileName = `${user.id}/${artworkId}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('artwork-images')
          .upload(fileName, formData.image, { upsert: true });

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('artwork-images')
          .getPublicUrl(fileName);

        imageUrl = publicUrl;
      }

      // Update artwork
      const { error: updateError } = await supabase
        .from('artworks')
        .update({
          title: formData.title,
          description: formData.description,
          price: parseFloat(formData.price),
          image_url: imageUrl,
        })
        .eq('id', artworkId)
        .eq('artist_id', user.id);

      if (updateError) throw updateError;

      navigate('/dashboard/artist/artworks');
    } catch (err) {
      setError('Failed to update artwork');
      console.error('Error updating artwork:', err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (!artwork) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>Artwork not found</AlertDescription>
      </Alert>
    );
  }

  const isSold = artwork.status === 'sold';

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Edit Artwork</CardTitle>
      </CardHeader>
      <CardContent>
        {isSold && (
          <Alert className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              This artwork has been sold and cannot be edited.
            </AlertDescription>
          </Alert>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              disabled={isSold}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              disabled={isSold}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              name="price"
              type="number"
              min="0"
              step="0.01"
              value={formData.price}
              onChange={handleInputChange}
              disabled={isSold}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Image</Label>
            <Input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              disabled={isSold}
            />
            {artwork.image_url && (
              <img
                src={artwork.image_url}
                alt={artwork.title}
                className="mt-2 max-h-48 rounded-md"
              />
            )}
          </div>

          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/dashboard/artist/artworks')}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSold || saving}>
              {saving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                'Save Changes'
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
} 