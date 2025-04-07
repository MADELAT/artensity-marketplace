import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Image,
  Clock,
  ShoppingCart,
  DollarSign,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatisticsCardsProps {
  stats?: {
    activeArtworks: number;
    pendingArtworks: number;
    sales: number;
    earnings: number;
  };
  onSectionChange?: (section: string) => void;
}

const generateDummyStats = () => ({
  activeArtworks: Math.floor(Math.random() * 50) + 10,
  pendingArtworks: Math.floor(Math.random() * 10) + 1,
  sales: Math.floor(Math.random() * 100) + 5,
  earnings: Math.floor(Math.random() * 10000) + 1000,
});

export function StatisticsCards({ 
  stats,
  onSectionChange 
}: StatisticsCardsProps) {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const data = stats || generateDummyStats();

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  const cards = [
    {
      id: 'active',
      title: 'Obras Activas',
      value: formatNumber(data.activeArtworks),
      icon: Image,
      color: 'text-blue-500',
      section: 'artworks',
    },
    {
      id: 'pending',
      title: 'Obras Pendientes',
      value: formatNumber(data.pendingArtworks),
      icon: Clock,
      color: 'text-amber-500',
      section: 'artworks',
    },
    {
      id: 'sales',
      title: 'Ventas Totales',
      value: formatNumber(data.sales),
      icon: ShoppingCart,
      color: 'text-green-500',
      section: 'statistics',
    },
    {
      id: 'earnings',
      title: 'Ingresos',
      value: `$${formatNumber(data.earnings)}`,
      icon: DollarSign,
      color: 'text-purple-500',
      section: 'statistics',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <div
          key={card.id}
          className={cn(
            "bg-card rounded-lg p-6 transition-all duration-300",
            hoveredCard === card.id && "shadow-lg scale-[1.02]"
          )}
          onMouseEnter={() => setHoveredCard(card.id)}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">
                {card.title}
              </p>
              <h3 className="text-2xl font-bold">{card.value}</h3>
            </div>
            <div className={`p-3 rounded-full bg-background ${card.color}`}>
              <card.icon className="h-6 w-6" />
            </div>
          </div>
          {onSectionChange && (
            <Button
              variant="ghost"
              size="sm"
              className="mt-4 w-full justify-between"
              onClick={() => onSectionChange(card.section)}
            >
              Ver más
              <ChevronRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      ))}
    </div>
  );
} 