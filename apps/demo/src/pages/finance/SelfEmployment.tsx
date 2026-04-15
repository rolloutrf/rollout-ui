import { CirclePlus, ScanLine, ChevronRight } from 'lucide-react'
import { Button } from '@rollout/ui-kit'
import { SELF_EMPLOYMENT } from './data'

export function SelfEmployment() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-foreground">Самозанятость</h2>
        <Button variant="link" className="text-foreground p-0 h-auto text-xs font-medium">
          Ещё
        </Button>
      </div>

      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <p className="text-xl font-semibold leading-7">
            <span className="text-foreground">120 860,</span>
            <span className="text-muted-foreground">54 ₽</span>
          </p>
          <ChevronRight className="size-4 text-muted-foreground" />
        </div>
        <p className="text-sm font-normal text-muted-foreground">{SELF_EMPLOYMENT.label}</p>
      </div>

      <div className="flex gap-3">
        <button className="flex-1 flex items-center gap-2 bg-secondary rounded-2xl p-4">
          <CirclePlus className="size-6 text-foreground flex-shrink-0" strokeWidth={1.5} />
          <span className="text-sm font-medium text-foreground leading-4">Создать чек</span>
        </button>
        <button className="flex-1 flex items-center gap-2 bg-secondary rounded-2xl p-4">
          <ScanLine className="size-6 text-foreground flex-shrink-0" strokeWidth={1.5} />
          <span className="text-sm font-medium text-foreground leading-4">QR-код</span>
        </button>
      </div>
    </div>
  )
}
