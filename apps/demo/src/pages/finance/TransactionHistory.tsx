import { Clock4 } from 'lucide-react'

import { Avatar, AvatarImage, AvatarFallback } from '@rollout/ui-kit'
import { Badge } from '@rollout/ui-kit'
import { Button } from '@rollout/ui-kit'

import { TRANSACTIONS } from './data'

export function TransactionHistory() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-foreground">Список операций</h2>
        <Button variant="ghost" size="sm" className="text-primary">
          Все
        </Button>
      </div>

      <div className="flex flex-col">
        {TRANSACTIONS.map((tx) => (
          <div key={tx.id} className="flex items-start gap-4 py-4">
            {/* Media */}
            {tx.icon ? (
              <div className={`size-10 rounded-lg flex items-center justify-center flex-shrink-0 ${tx.iconColor}`}>
                <tx.icon className="size-4 text-white" strokeWidth={1.5} />
              </div>
            ) : (
              <Avatar className="size-10 flex-shrink-0 rounded-lg">
                {tx.avatarUrl && <AvatarImage src={tx.avatarUrl} alt={tx.name} className="rounded-lg" />}
                <AvatarFallback className="rounded-lg bg-muted text-foreground text-xs font-medium">
                  {tx.name.slice(0, 2)}
                </AvatarFallback>
              </Avatar>
            )}

            {/* Content */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground leading-4">{tx.name}</p>
              <p className="text-sm text-muted-foreground leading-5">{tx.category}</p>
            </div>

            {/* Right slot */}
            <div className="flex flex-col items-end gap-1 flex-shrink-0">
              <div className="flex items-center gap-1">
                <p className={`text-sm font-medium leading-4 ${tx.positive ? 'text-success' : 'text-foreground'}`}>
                  {tx.amount}
                </p>
                {tx.pending && <Clock4 className="size-4 text-muted-foreground" strokeWidth={1.5} />}
              </div>
              {tx.bonusPoints && (
                <Badge variant="default" className="rounded-full px-1.5 py-0 text-[10px]">
                  {tx.bonusPoints}
                </Badge>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
