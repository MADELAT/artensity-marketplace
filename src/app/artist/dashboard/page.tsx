import { StatisticsCards } from '@/components/artist/StatisticsCards';
import { StatisticsChart } from '@/components/artist/StatisticsChart';
import { ArtworkGrid } from '@/components/artist/ArtworkGrid';
import { ArtistLayout } from '@/components/artist/ArtistLayout';
import { Artwork } from '@/types/supabase';

// Datos de ejemplo para las obras
const sampleArtworks = [
  {
    id: '1',
    title: 'Obra Maestra',
    description: 'Una descripción detallada de la obra',
    image_url: 'https://via.placeholder.com/300',
    price: 1000,
    technique: 'Óleo sobre lienzo',
    dimensions: '100x100 cm',
    year: 2024,
    category: 'Pintura',
    style: 'Contemporáneo',
    is_sold: false,
    created_at: '2024-03-20T10:00:00Z',
    updated_at: '2024-03-20T10:00:00Z',
    artist_id: '1',
    status: 'active' as const,
    views: 1500,
  },
  {
    id: '2',
    title: 'Naturaleza Viva',
    description: 'Paisaje natural en acuarela',
    image_url: 'https://via.placeholder.com/300',
    price: 800,
    technique: 'Acuarela',
    dimensions: '50x70 cm',
    year: 2024,
    category: 'Pintura',
    style: 'Naturalista',
    is_sold: false,
    created_at: '2024-03-19T15:30:00Z',
    updated_at: '2024-03-19T15:30:00Z',
    artist_id: '1',
    status: 'active' as const,
    views: 900,
  },
];

export default function ArtistDashboardPage() {
  const handleSearch = (query: string) => {
    // Implementar la lógica de búsqueda
    console.log('Búsqueda:', query);
  };

  const handleUploadArtwork = () => {
    // Implementar la lógica de subida
    console.log('Subir obra');
  };

  const handleEditArtwork = (id: string) => {
    // Implementar la lógica de edición
    console.log('Editar obra:', id);
  };

  const handleViewArtwork = (id: string) => {
    // Implementar la lógica de visualización
    console.log('Ver obra:', id);
  };

  const handleDeleteArtwork = (id: string) => {
    // Implementar la lógica de eliminación
    console.log('Eliminar obra:', id);
  };

  return (
    <ArtistLayout
      artistName="Nombre del Artista"
      artistAvatar="https://via.placeholder.com/150"
      onSearch={handleSearch}
    >
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">
            Bienvenido a tu panel de control personalizado
          </p>
        </div>

        <StatisticsCards />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-card rounded-lg p-6">
            <StatisticsChart />
          </div>
          <div className="bg-card rounded-lg p-6">
            <h3 className="text-lg font-medium mb-4">Actividad Reciente</h3>
            {/* Aquí iría el componente de actividad reciente */}
          </div>
        </div>

        <div className="bg-card rounded-lg p-6">
          <h3 className="text-lg font-medium mb-4">Mis Obras</h3>
          <ArtworkGrid
            artworks={sampleArtworks}
            onUploadArtwork={handleUploadArtwork}
            onEditArtwork={handleEditArtwork}
            onViewArtwork={handleViewArtwork}
            onDeleteArtwork={handleDeleteArtwork}
          />
        </div>
      </div>
    </ArtistLayout>
  );
} 