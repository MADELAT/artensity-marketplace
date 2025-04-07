import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { ArtistSidebar } from '@/components/artist/ArtistSidebar';
import { ArtistHeader } from '@/components/artist/ArtistHeader';
import { StatisticsCards } from '@/components/artist/StatisticsCards';
import { StatisticsChart } from '@/components/artist/StatisticsChart';
import { ArtworkGrid } from '@/components/artist/ArtworkGrid';
import { FeaturedArtworksGallery } from '@/components/artist/FeaturedArtworksGallery';
import { EnhancedStatCard } from '@/components/artist/EnhancedStatCard';
import { QuickActions } from '@/components/artist/QuickActions';
import { Artwork as SupabaseArtwork } from '@/types/supabase';
import { cn } from '@/lib/utils';
import { EnhancedKPIs } from '@/components/artist/EnhancedKPIs';

// Datos de ejemplo para las obras en la galería destacada
const mockGalleryArtworks = [
  {
    id: '1',
    title: 'Obra de ejemplo 1',
    image_url: 'https://via.placeholder.com/400x300',
    likes: 42,
    views: 156,
    created_at: '2024-01-01',
    description: 'Una descripción detallada de la obra',
    price: 1000,
    technique: 'Óleo sobre lienzo',
    dimensions: '100x100 cm',
    year: 2024,
    category: 'Pintura',
    style: 'Abstracto',
    is_sold: false,
    updated_at: '2024-01-01',
    artist_id: '1'
  },
  {
    id: '2',
    title: 'Obra de ejemplo 2',
    image_url: 'https://via.placeholder.com/400x300',
    likes: 28,
    views: 98,
    created_at: '2024-01-02',
    description: 'Otra descripción detallada',
    price: 1500,
    technique: 'Acrílico sobre lienzo',
    dimensions: '120x80 cm',
    year: 2024,
    category: 'Pintura',
    style: 'Realismo',
    is_sold: false,
    updated_at: '2024-01-02',
    artist_id: '1'
  }
];

// Datos de ejemplo para la cuadrícula de obras
const mockGridArtworks = [
  {
    id: '1',
    title: 'Obra de ejemplo 1',
    description: 'Una descripción detallada de la obra',
    price: 1000,
    technique: 'Óleo sobre lienzo',
    dimensions: '100x100 cm',
    year: 2024,
    image_url: 'https://via.placeholder.com/400x300',
    category: 'Pintura',
    style: 'Abstracto',
    is_sold: false,
    created_at: '2024-01-01',
    updated_at: '2024-01-01',
    artist_id: '1',
    status: 'active' as const,
    views: 156
  },
  {
    id: '2',
    title: 'Obra de ejemplo 2',
    description: 'Otra descripción detallada',
    price: 1500,
    technique: 'Acrílico sobre lienzo',
    dimensions: '120x80 cm',
    year: 2024,
    image_url: 'https://via.placeholder.com/400x300',
    category: 'Pintura',
    style: 'Realismo',
    is_sold: false,
    created_at: '2024-01-02',
    updated_at: '2024-01-02',
    artist_id: '1',
    status: 'pending' as const,
    views: 98
  }
];

// Componentes de las secciones
function DashboardHome() {
  return (
    <div className="space-y-6">
      <EnhancedKPIs className="mb-6" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <StatisticsCards />
          <StatisticsChart />
        </div>
        <div className="space-y-6">
          <EnhancedStatCard 
            title="Obras Destacadas"
            description="Tus obras más vistas y valoradas"
            icon="star"
            value="5"
            trend={{ value: 2, isPositive: true }}
          />
          <FeaturedArtworksGallery 
            artworks={mockGalleryArtworks}
            onUploadArtwork={() => console.log('Upload artwork')}
            onViewArtwork={(id) => console.log('View artwork', id)}
          />
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Acciones Rápidas</h2>
        <QuickActions
          onUploadArtwork={() => console.log('Upload artwork')}
          onEditProfile={() => console.log('Edit profile')}
          onViewStats={() => console.log('View stats')}
        />
      </div>
    </div>
  );
}

function ArtworksSection() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Mis Obras</h2>
      <ArtworkGrid 
        artworks={mockGridArtworks}
        onUploadArtwork={() => console.log('Upload artwork')}
        onEditArtwork={(id) => console.log('Edit artwork', id)}
        onViewArtwork={(id) => console.log('View artwork', id)}
        onViewStats={(id) => console.log('View stats', id)}
        onDeleteArtwork={(id) => console.log('Delete artwork', id)}
      />
    </div>
  );
}

function StatisticsSection() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Estadísticas Detalladas</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <StatisticsChart />
        <div className="space-y-6">
          <EnhancedStatCard 
            title="Vistas Totales"
            description="Número total de vistas a tus obras"
            icon="eye"
            value="1.2K"
            trend={{ value: 15, isPositive: true }}
          />
          <EnhancedStatCard 
            title="Interacciones"
            description="Me gusta y comentarios"
            icon="heart"
            value="256"
            trend={{ value: 8, isPositive: true }}
          />
        </div>
      </div>
    </div>
  );
}

function SettingsSection() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Configuración</h2>
      <div className="bg-card rounded-lg p-6">
        <p className="text-muted-foreground">Configuración (próximamente)</p>
      </div>
    </div>
  );
}

export default function ArtistDashboard() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const navigate = useNavigate();
  const location = useLocation();

  // Actualizar la sección activa basada en la ruta actual
  useEffect(() => {
    const path = location.pathname.split('/').pop() || 'dashboard';
    setActiveSection(path);
  }, [location]);

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    navigate(`/dashboard/artist/${section}`);
  };

  return (
    <div className="flex min-h-screen">
      <ArtistSidebar 
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
      />
      <main className={cn(
        "flex-1 p-6 bg-muted transition-all duration-300",
        "ml-16 md:ml-64" // Ajuste para el sidebar colapsable
      )}>
        <ArtistHeader />
        <div className="mt-6">
          <Routes>
            <Route path="/" element={<DashboardHome />} />
            <Route path="/dashboard" element={<DashboardHome />} />
            <Route path="/artworks" element={<ArtworksSection />} />
            <Route path="/statistics" element={<StatisticsSection />} />
            <Route path="/settings" element={<SettingsSection />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}
