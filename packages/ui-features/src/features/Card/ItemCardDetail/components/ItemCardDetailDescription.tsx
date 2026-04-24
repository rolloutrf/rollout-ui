import { ChevronDown } from 'lucide-react'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@rollout/ui-kit'

import type { ItemCardDetailDescriptionTab } from '@features-src/features/Card/ItemCardDetail/types/ItemCardDetail.types'
import { useBoolean } from '@features-src/shared/hooks/useBoolean'

type ItemCardDetailDescriptionProps = {
  tabs?: ItemCardDetailDescriptionTab[]
  expandLabel?: string
  collapseLabel?: string
}

export const ItemCardDetailDescription = ({
  tabs,
  expandLabel = 'Развернуть',
  collapseLabel = 'Свернуть',
}: ItemCardDetailDescriptionProps) => {
  const [isExpanded, setIsExpanded] = useBoolean(false)

  if (!tabs?.length) {
    return null
  }

  return (
    <div className="w-full flex flex-col" data-state="description-section">
      <Tabs className="w-full" data-horizontal defaultValue={tabs[0].id}>
        <TabsList className="w-full bg-background" data-orientation="horizontal">
          {tabs.map((tab) => (
            <TabsTrigger key={tab.id} value={tab.id} className="w-full">
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {tabs.map((tab) => (
          <TabsContent key={tab.id} value={tab.id} className="mt-4">
            <div>
              <p className="text-base leading-6 text-foreground">{tab.shortText}</p>
              {tab.detailedText && (
                <div>
                  <button
                    type="button"
                    className="flex items-center justify-between py-4 border-b border-border w-full cursor-pointer"
                    onClick={setIsExpanded.toggle}
                  >
                    <span className="text-sm font-medium text-foreground">
                      {isExpanded ? collapseLabel : expandLabel}
                    </span>
                    <ChevronDown className={`size-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                  </button>
                  {isExpanded && <div className="pt-4 text-sm leading-5 text-muted-foreground">{tab.detailedText}</div>}
                </div>
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
