import { Badge } from '@/components/ui/badge';
import { STATUS_COLORS } from '@/lib/constants';

interface StatusBadgeProps {
  status: string;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const colorClass = STATUS_COLORS[status] || 'bg-gray-100 text-gray-800';
  const label = status.replace(/_/g, ' ');

  return (
    <Badge variant="secondary" className={`${colorClass} font-medium ${className || ''}`}>
      {label}
    </Badge>
  );
}
