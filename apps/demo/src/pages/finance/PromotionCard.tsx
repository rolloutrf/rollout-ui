import { useState } from 'react'
import { X, BadgePercent } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { PROMOTION } from './data'

export function PromotionCard() {
  const [closed, setClosed] = useState(false)
  if (closed) return null

  return (
    <Card className="rounded-3xl p-4 flex flex-row items-center gap-4 bg-secondary border-border shadow-none">
      {/* Media */}
      <div className="size-10 rounded-xl bg-background flex items-center justify-center flex-shrink-0">
        <BadgePercent className="size-5 text-foreground" strokeWidth={1.5} />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground leading-4">{PROMOTION.title}</p>
        <p className="text-sm text-muted-foreground leading-5 mt-1 truncate">{PROMOTION.description}</p>
      </div>

      {/* Close */}
      <Button
        size="icon"
        variant="ghost"
        className="size-4 rounded flex-shrink-0 self-start text-muted-foreground hover:text-foreground p-0 h-auto"
        onClick={() => setClosed(true)}
      >
        <X className="size-4" />
      </Button>
    </Card>
  )
}
