import { ChevronRight } from 'lucide-react'

import { Button } from '@rollout/ui-kit'

import { PAYMENTS } from './data'

export function PaymentsWidget() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-foreground">Платежи</h2>
        <Button variant="ghost" size="sm" className="text-primary">
          Все
        </Button>
      </div>

      <div className="flex flex-col gap-3">
        {PAYMENTS.map((p) => (
          <button
            key={p.id}
            className="flex items-center gap-4 w-full p-4 rounded-3xl border border-border bg-transparent hover:bg-muted/50 transition-colors text-left"
          >
            <div className={`size-10 rounded-full flex items-center justify-center flex-shrink-0 ${p.iconBg}`}>
              <p.icon className={`size-5 ${p.iconColor}`} strokeWidth={1.5} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground leading-4">{p.title}</p>
              <p className="text-sm font-normal text-muted-foreground truncate">{p.subtitle}</p>
            </div>
            <ChevronRight className="size-4 text-muted-foreground flex-shrink-0" />
          </button>
        ))}
      </div>
    </div>
  )
}
