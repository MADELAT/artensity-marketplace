import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { ArtworkGrid } from '@/components/artist/ArtworkGrid';
import { useState } from 'react';

interface Artwork {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  price: number;
  status: 'available' | 'sold' | 'reserved';
  views: number;
  likes: number;
  createdAt: Date;
}

const exampleArtworks: Artwork[] = [
  {
    id: '1',
    title: 'Atardecer en la playa',
    description: 'Óleo sobre lienzo, 60x80cm',
    imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=500&auto=format&fit=crop&q=60',
    price: 1200,
    status: 'available',
    views: 156,
    likes: 23,
    createdAt: new Date('2024-01-15')
  },
  {
    id: '2',
    title: 'Retrato urbano',
    description: 'Acrílico sobre madera, 40x40cm',
    imageUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b9a4?w=500&auto=format&fit=crop&q=60',
    price: 800,
    status: 'sold',
    views: 89,
    likes: 12,
    createdAt: new Date('2024-01-10')
  }
];

export function ArtworksSection() {
  const navigate = useNavigate();
  const [artworks, setArtworks] = useState<Artwork[]>(exampleArtworks);

  const handleUploadArtwork = () => {
    navigate('/dashboard/artist/artworks/upload');
  };

  const handleEditArtwork = (id: string) => {
    navigate(`/dashboard/artist/artworks/${id}/edit`);
  };

  const handleViewArtwork = (id: string) => {
    navigate(`/artwork/${id}`);
  };

  const handleViewStats = (id: string) => {
    navigate(`/dashboard/artist/artworks/${id}/stats`);
  };

  const handleDeleteArtwork = async (id: string) => {
    setArtworks(prev => prev.filter(artwork => artwork.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Mis Obras</h2>
        <Button onClick={handleUploadArtwork}>
          <Plus className="h-4 w-4 mr-2" />
          Subir Nueva Obra
        </Button>
      </div>

      <ArtworkGrid
        artworks={artworks}
        onUploadArtwork={handleUploadArtwork}
        onEditArtwork={handleEditArtwork}
        onViewArtwork={handleViewArtwork}
        onViewStats={handleViewStats}
        onDeleteArtwork={handleDeleteArtwork}
      />
    </div>
  );
} 