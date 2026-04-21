import { cn } from '@/lib/cn'

interface ContainerProps {
  children: React.ReactNode
  className?: string
}

export default function Container({ children, className }: ContainerProps) {
  return (
    <div className={cn('w-full max-w-[var(--container-max)] px-6 sm:px-8 md:px-12', className)}>
      {children}
    </div>
  )
}
