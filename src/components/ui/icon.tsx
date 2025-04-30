
import * as LucideIcons from 'lucide-react';

interface IconProps {
  name: keyof typeof LucideIcons;
  className?: string;
}

export function Icon({ name, className }: IconProps) {
  const IconComponent = LucideIcons[name];

  if (!IconComponent) {
    console.warn(`Icon ${name} not found in lucide-react`);
    return null;
  }

  return <IconComponent className={className} />;
}
