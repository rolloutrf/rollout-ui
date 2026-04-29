import { TicketPercent } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Card } from '@rollout/ui-kit'

import { ANALYTICS, EXPENSE_BREAKDOWN, EXPENSE_TOTAL, LOYALTY } from './data'

export function AnalyticWidgets() {
  return (
    <div className="grid grid-cols-2 gap-3">
      {/* Analytics */}
      <Link to="/finance/analytics" className="block">
        <Card className="rounded-3xl p-6 flex flex-col gap-6 bg-secondary">
          <div className="flex flex-col gap-1">
            <p className="text-base font-bold text-foreground leading-tight">{ANALYTICS.amount}</p>
            <p className="text-xs text-muted-foreground leading-4">{ANALYTICS.label}</p>
          </div>
          <div className="flex h-8 w-full gap-1">
            {EXPENSE_BREAKDOWN.map((cat) => (
              <div
                key={cat.title}
                className={`h-full rounded-md border-[1.5px] ${cat.borderClass} ${cat.chartBg}`}
                style={{ width: `${(cat.amount / EXPENSE_TOTAL) * 100}%` }}
              />
            ))}
          </div>
        </Card>
      </Link>

      {/* Loyalty */}
      <Card className="rounded-3xl p-6 flex flex-col gap-1 bg-secondary">
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
