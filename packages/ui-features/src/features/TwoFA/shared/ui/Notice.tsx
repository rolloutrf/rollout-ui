import { cn } from '@ui-kit/lib/utils'

export const Notice = ({ className, children }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn(className, 'text-sm text-secondary')}>{children}</div>
)
