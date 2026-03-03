import { cn } from '@/lib/cn'

interface AvailabilityBadgeProps {
  status: 'available' | 'unavailable' | 'limited'
  className?: string
}

export default function AvailabilityBadge({ status, className }: AvailabilityBadgeProps) {
  return (
    <span className={cn('inline-flex items-center gap-2 text-[13px] tracking-wide', className)}>
      <span
        className={cn(
          'h-2 w-2 rounded-full',
          status === 'available' && 'bg-accent',
          status === 'limited' && 'bg-yellow-500',
          status === 'unavailable' && 'bg-red-500'
        )}
      />
      <span className="capitalize">{status}</span>
    </span>
  )
}
