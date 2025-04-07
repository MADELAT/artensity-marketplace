import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { 
  Eye, 
  MessageSquare, 
  DollarSign, 
  TrendingUp, 
  TrendingDown 
} from 'lucide-react';

interface KPI {
  title: string;
  value: string;
  change: number;
  icon: React.ReactNode;
  description: string;
}

interface EnhancedKPIsProps {
  className?: string;
}

export function EnhancedKPIs({ className }: EnhancedKPIsProps) {
  const kpis: KPI[] = [
    {
      title: 'Vistas Totales',
      value: '1,234',
      change: 12.5,
      icon: <Eye className="h-4 w-4" />,
      description: 'Vistas en los últimos 30 días'
    },
    {
      title: 'Consultas',
      value: '45',
      change: -2.3,
      icon: <MessageSquare className="h-4 w-4" />,
      description: 'Consultas pendientes'
    },
    {
      title: 'Ventas',
      value: '8',
      change: 25.0,
      icon: <DollarSign className="h-4 w-4" />,
      description: 'Ventas este mes'
    }
  ];

  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-3 gap-4", className)}>
      {kpis.map((kpi) => (
        <Card key={kpi.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {kpi.title}
            </CardTitle>
            <div className="text-muted-foreground">
              {kpi.icon}
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpi.value}</div>
            <div className="flex items-center mt-2">
              {kpi.change > 0 ? (
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
              )}
              <span
                className={cn(
                  "text-xs font-medium",
                  kpi.change > 0 ? "text-green-500" : "text-red-500"
                )}
              >
                {kpi.change > 0 ? "+" : ""}{kpi.change}%
              </span>
              <span className="text-xs text-muted-foreground ml-1">
                vs. mes anterior
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {kpi.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
} 