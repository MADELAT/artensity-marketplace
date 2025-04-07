import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart2, Eye, Heart } from 'lucide-react';
import { StatisticsChart } from '@/components/artist/StatisticsChart';
import { EnhancedStatCard } from '@/components/artist/EnhancedStatCard';

export function StatisticsSection() {
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