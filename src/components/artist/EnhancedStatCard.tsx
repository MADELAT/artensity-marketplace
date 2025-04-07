import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Star, Eye, Heart, TrendingUp, TrendingDown } from 'lucide-react';

interface EnhancedStatCardProps {
  title: string;
  description: string;
  icon: 'star' | 'eye' | 'heart' | 'trending-up' | 'trending-down';
  value: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

const iconMap = {
  'star': Star,
  'eye': Eye,
  'heart': Heart,
  'trending-up': TrendingUp,
  'trending-down': TrendingDown
};

export function EnhancedStatCard({
  title,
  description,
  icon,
  value,
  trend,
  className
}: EnhancedStatCardProps) {
  const IconComponent = iconMap[icon];

  return (
    <Card className={cn('bg-card', className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <IconComponent className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
        {trend && (
          <div className="flex items-center mt-2">
            <span
              className={cn(
                'text-xs font-medium',
                trend.isPositive ? 'text-green-500' : 'text-red-500'
              )}
            >
              {trend.isPositive ? '+' : '-'}
              {trend.value}%
            </span>
            <span className="text-xs text-muted-foreground ml-1">
              vs. mes anterior
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
