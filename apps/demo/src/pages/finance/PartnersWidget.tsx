import { TicketPercent, Plane, ShoppingBag, Theater, Fuel } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { PARTNER_TABS, PARTNER_CARDS, CASHBACK } from './data'

const TAB_ICONS: Record<string, typeof Plane> = {
  'Путешествия': Plane,
  'Товары': ShoppingBag,
  'Афиша': Theater,
  'Топливо': Fuel,
}

export function PartnersWidget() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-foreground">Роллаут и партнеры</h2>
        <Button variant="ghost" size="sm" className="text-primary">Все</Button>
      </div>

      {/* Scrollable tab bar */}
      <Tabs defaultValue={PARTNER_TABS[1]}>
        <div className="overflow-x-auto scrollbar-hide -mx-4 px-4">
          <TabsList className="flex gap-2 w-max bg-transparent p-0 h-auto">
            {PARTNER_TABS.map(tab => {
              const Icon = TAB_ICONS[tab]
              return (
                <TabsTrigger
                  key={tab}
                  value={tab}
                  className="px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap shadow-none
                    border border-transparent text-muted-foreground bg-transparent gap-1.5
                    data-[active]:bg-card data-[active]:border-border data-[active]:text-foreground data-[active]:shadow-none"
                >
                  {Icon && <Icon className="size-3.5" />}
                  {tab}
                </TabsTrigger>
              )
            })}
          </TabsList>
        </div>
      </Tabs>

      {/* Partner cards */}
      <div className="grid grid-cols-2 gap-3">
        {PARTNER_CARDS.map(card => (
          <Card
            key={card.id}
            className="rounded-3xl overflow-hidden bg-card border border-border shadow-sm cursor-pointer h-[124px] relative"
          >
            <div className="absolute top-6 left-6">
              <p className="text-base font-medium text-card-foreground leading-none">{card.title}</p>
            </div>
            <img
              src={card.imageUrl}
              alt={card.title}
              className="absolute right-0 top-1/2 -translate-y-1/2 h-[115%] w-auto"
            />
          </Card>
        ))}
      </div>

      {/* Cashback card */}
      <Card className="rounded-3xl p-6 flex flex-col gap-1 bg-card border border-border shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
        <div className="flex items-center justify-between w-full shrink-0">
          <p className="text-base font-medium text-card-foreground">{CASHBACK.title}</p>
          <TicketPercent className="size-6 text-muted-foreground" strokeWidth={1.5} />
        </div>
        <div className="flex flex-col justify-between flex-1 min-h-0">
          <p className="text-xs font-normal text-muted-foreground leading-4">{CASHBACK.description}</p>
          <p className="text-xs font-normal text-muted-foreground mt-4">{CASHBACK.footer}</p>
        </div>
      </Card>
    </div>
  )
}
