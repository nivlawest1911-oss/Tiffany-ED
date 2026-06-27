import { Button } from '@/components/ui/button';

interface EmptyStateProps {
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

export function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
  icon,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      {icon && <div className="mb-4 text-[#C5A46E]/60">{icon}</div>}
      
      <h3 className="text-xl font-semibold tracking-[-1px] mb-2">{title}</h3>
      
      {description && (
        <p className="text-white/60 max-w-sm mb-6">{description}</p>
      )}

      {actionLabel && onAction && (
        <Button 
          onClick={onAction}
          className="bg-[#C5A46E] hover:bg-[#A67C52] text-[#0A0F1C] font-semibold"
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
