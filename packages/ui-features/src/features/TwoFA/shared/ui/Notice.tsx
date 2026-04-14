import { cn } from '@rollout/ui-kit'

export const Notice = ({ className, children }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('text-sm text-secondary', className)}>{children}</div>
)
