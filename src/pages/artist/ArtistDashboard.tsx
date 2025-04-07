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
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Plus, 
  User, 
  BarChart2,
  Palette
} from 'lucide-react';
import { ArtistWelcome } from '@/components/artist/ArtistWelcome';
import { supabase } from '@/integrations/supabase/client';
import { DashboardHome } from './DashboardHome';
import { ArtworksSection } from './ArtworksSection';
import { StatisticsSection } from './StatisticsSection';
import { SettingsSection } from './SettingsSection';
import { Inquiries } from './Inquiries';
import { ArtworkUploadForm } from '@/components/artist/ArtworkUploadForm';

export default function ArtistDashboard() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const navigate = useNavigate();
  const location = useLocation();

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
        "ml-16 md:ml-64"
      )}>
        <ArtistHeader />
        <div className="mt-6">
          <Routes>
            <Route path="/" element={<DashboardHome />} />
            <Route path="/dashboard" element={<DashboardHome />} />
            <Route path="/artworks" element={<ArtworksSection />} />
            <Route path="/artworks/upload" element={<ArtworkUploadForm />} />
            <Route path="/inquiries" element={<Inquiries />} />
            <Route path="/statistics" element={<StatisticsSection />} />
            <Route path="/settings" element={<SettingsSection />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}
