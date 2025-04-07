import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Skeleton } from '@/components/ui/skeleton';

interface StatisticsChartProps {
  data?: {
    date: string;
    views: number;
    sales: number;
  }[];
  onViewMore?: () => void;
}

const generateDummyData = () => {
  const dates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return date.toLocaleDateString('es-ES', { weekday: 'short' });
  }).reverse();

  return dates.map(date => ({
    date,
    views: Math.floor(Math.random() * 100) + 20,
    sales: Math.floor(Math.random() * 20) + 5,
  }));
};

export function StatisticsChart({ 
  data,
  onViewMore 
}: StatisticsChartProps) {
  const [hoveredBar, setHoveredBar] = useState<string | null>(null);
  const chartData = data || generateDummyData();

  if (!chartData.length) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Tendencia de Vistas</h3>
          {onViewMore && (
            <Button variant="ghost" size="sm" onClick={onViewMore}>
              Ver más estadísticas
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          )}
        </div>
        <div className="h-64 flex items-center justify-center">
          <Skeleton className="h-full w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Tendencia de Vistas</h3>
        {onViewMore && (
          <Button variant="ghost" size="sm" onClick={onViewMore}>
            Ver más estadísticas
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        )}
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => value.toLocaleString()}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--background))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '0.5rem',
              }}
              formatter={(value: number) => [value.toLocaleString(), '']}
            />
            <Bar
              dataKey="views"
              fill="hsl(var(--primary))"
              radius={[4, 4, 0, 0]}
              onMouseEnter={() => setHoveredBar('views')}
              onMouseLeave={() => setHoveredBar(null)}
              className={hoveredBar === 'views' ? 'opacity-100' : 'opacity-70'}
            />
            <Bar
              dataKey="sales"
              fill="hsl(var(--secondary))"
              radius={[4, 4, 0, 0]}
              onMouseEnter={() => setHoveredBar('sales')}
              onMouseLeave={() => setHoveredBar(null)}
              className={hoveredBar === 'sales' ? 'opacity-100' : 'opacity-70'}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
        <div className="flex items-center space-x-2">
          <div className="h-3 w-3 rounded-full bg-primary" />
          <span>Vistas</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="h-3 w-3 rounded-full bg-secondary" />
          <span>Ventas</span>
        </div>
      </div>
    </div>
  );
} 