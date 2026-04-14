import { TicketPercent } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { ANALYTICS, LOYALTY } from './data'

export function AnalyticWidgets() {
  return (
    <div className="grid grid-cols-2 gap-3">
      {/* Analytics */}
      <Card className="rounded-3xl p-6 flex flex-col gap-6 bg-card border-border shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]">
        <div className="flex flex-col gap-1">
          <p className="text-base font-bold text-foreground leading-tight">{ANALYTICS.amount}</p>
          <p className="text-xs text-muted-foreground leading-4">{ANALYTICS.label}</p>
        </div>
        <div className="flex h-10 w-full rounded-lg overflow-hidden">
          {ANALYTICS.bars.map((bar, i) => (
            <div key={i} className={`h-full ${bar.width} ${bar.color}`} />
          ))}
        </div>
      </Card>

      {/* Loyalty */}
      <Card className="rounded-3xl p-6 flex flex-col gap-1 bg-card border-border shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
        <div className="flex items-start justify-between">
          <p className="text-base font-bold text-foreground leading-tight">{LOYALTY.points}</p>
          <TicketPercent className="size-5 text-muted-foreground flex-shrink-0" strokeWidth={1.5} />
        </div>
        <p className="text-xs text-muted-foreground leading-4">{LOYALTY.label}</p>
        <p className="text-xs text-muted-foreground leading-4 mt-auto">{LOYALTY.footer}</p>
      </Card>
    </div>
  )
}
