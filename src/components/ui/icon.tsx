
import * as LucideIcons from 'lucide-react';

interface IconProps {
  name: keyof typeof LucideIcons;
  className?: string;
}

export function Icon({ name, className }: IconProps) {
  const LucideIcon = LucideIcons[name];

  if (!LucideIcon) {
    console.warn(`Icon ${name} not found in lucide-react`);
    return null;
  }

  // Cast the icon component to the correct type to fix TypeScript error
  const IconComponent = LucideIcon as React.ComponentType<{ className?: string }>;
  
  return <IconComponent className={className} />;
}
