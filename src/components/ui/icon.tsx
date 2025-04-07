import * as LucideIcons from 'lucide-react';

interface IconProps {
  name: keyof typeof LucideIcons;
  className?: string;
}

export function Icon({ name, className }: IconProps) {
  const LucideIcon = LucideIcons[name];

  if (!LucideIcon) return null;

  return <LucideIcon className={className} />;
}
