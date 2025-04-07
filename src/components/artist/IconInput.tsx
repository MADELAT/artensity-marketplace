import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface IconInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

export function IconInput({ icon, className, ...props }: IconInputProps) {
  return (
    <div className="relative">
      {icon && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2">
          {icon}
        </div>
      )}
      <Input
        className={cn(
          icon && "pl-10",
          className
        )}
        {...props}
      />
    </div>
  );
} 