import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart2 } from 'lucide-react';

const data = [
  { month: 'Ene', views: 120, likes: 45 },
  { month: 'Feb', views: 150, likes: 60 },
  { month: 'Mar', views: 180, likes: 75 },
  { month: 'Abr', views: 200, likes: 90 },
  { month: 'May', views: 220, likes: 100 },
  { month: 'Jun', views: 250, likes: 120 }
];

export function StatisticsChart() {
  const maxValue = Math.max(...data.map(d => Math.max(d.views, d.likes)));

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Evolución Mensual</CardTitle>
          <BarChart2 className="h-4 w-4 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] relative">
          <div className="absolute inset-0 flex items-end gap-2">
            {data.map((item, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div className="w-full flex gap-1">
                  <div
                    className="flex-1 bg-primary/20 rounded-t"
                    style={{ height: `${(item.views / maxValue) * 100}%` }}
                  />
                  <div
                    className="flex-1 bg-primary/40 rounded-t"
                    style={{ height: `${(item.likes / maxValue) * 100}%` }}
                  />
                </div>
                <span className="text-xs text-muted-foreground mt-2">
                  {item.month}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center gap-4 mt-4">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 bg-primary/20 rounded" />
            <span className="text-xs">Vistas</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 bg-primary/40 rounded" />
            <span className="text-xs">Me gusta</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 