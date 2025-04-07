import { Button } from '@/components/ui/button';
import { Plus, User, BarChart2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface QuickAction {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
  color: string;
}

interface QuickActionsProps {
  onUploadArtwork: () => void;
  onEditProfile: () => void;
  onViewStats: () => void;
}

export function QuickActions({ 
  onUploadArtwork, 
  onEditProfile, 
  onViewStats 
}: QuickActionsProps) {
  const actions: QuickAction[] = [
    {
      title: 'Subir nueva obra',
      description: 'Comparte tu arte con el mundo',
      icon: <Plus className="h-6 w-6" />,
      onClick: onUploadArtwork,
      color: 'bg-blue-500'
    },
    {
      title: 'Editar perfil',
      description: 'Actualiza tu información personal',
      icon: <User className="h-6 w-6" />,
      onClick: onEditProfile,
      color: 'bg-purple-500'
    },
    {
      title: 'Ver estadísticas',
      description: 'Analiza el rendimiento de tus obras',
      icon: <BarChart2 className="h-6 w-6" />,
      onClick: onViewStats,
      color: 'bg-green-500'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {actions.map((action, index) => (
        <motion.div
          key={action.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Button
            variant="outline"
            className={cn(
              "w-full h-24 flex flex-col items-center justify-center gap-2 p-4",
              "hover:bg-accent transition-colors duration-200"
            )}
            onClick={action.onClick}
          >
            <div className={cn(
              "rounded-full p-2 text-white",
              action.color
            )}>
              {action.icon}
            </div>
            <div className="text-center">
              <h3 className="font-semibold">{action.title}</h3>
              <p className="text-xs text-muted-foreground">{action.description}</p>
            </div>
          </Button>
        </motion.div>
      ))}
    </div>
  );
} 