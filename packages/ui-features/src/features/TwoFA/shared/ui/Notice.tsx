import { cn } from '@ui-kit/lib/utils'

export const Notice = ({ className, children }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('text-sm text-secondary', className)}>{children}</div>
)
