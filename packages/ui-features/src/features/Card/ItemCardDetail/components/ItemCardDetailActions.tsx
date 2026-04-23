import { Button, cn } from '@rollout/ui-kit'

import type { ItemCardDetailAction } from '@features-src/features/Card/ItemCardDetail/types/ItemCardDetail.types'

type ItemCardDetailActionsProps = {
  actions?: ItemCardDetailAction[]
}

export const ItemCardDetailActions = ({ actions }: ItemCardDetailActionsProps) => {
  if (!actions?.length) {
    return null
  }

  return (
    <div className="flex gap-4 items-center w-full" data-state="actions-section">
      {actions.map((action, actionIndex) => (
        <Button
          key={action.id}
          variant={actions.length > 1 && actionIndex === 0 ? 'secondary' : 'default'}
          className={cn('h-11', actions.length > 1 ? 'flex-1' : 'w-full', action.buttonProps?.className)}
          {...action.buttonProps}
        >
          {action.content ?? action.text}
        </Button>
      ))}
    </div>
  )
}
