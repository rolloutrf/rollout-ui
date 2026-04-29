import { ChevronUp, ChevronDown } from 'lucide-react'

import { Tabs, TabsList, TabsTrigger, TabsContent } from '@rollout/ui-kit'
import { Button } from '@rollout/ui-kit'
import { Avatar, AvatarImage } from '@rollout/ui-kit'

import { CURRENCIES } from './data'

export function CurrencyRates() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-foreground">Курсы валют</h2>
        <Button variant="ghost" size="sm" className="text-primary">
          Все
        </Button>
      </div>

      <Tabs defaultValue="currencies">
        <TabsList>
          <TabsTrigger value="currencies">Валюты</TabsTrigger>
          <TabsTrigger value="metals">Металлы</TabsTrigger>
        </TabsList>

        <TabsContent value="currencies" className="mt-3">
          {/* Column headers */}
          <div className="flex items-center mb-2 px-1">
            <div className="flex-1" />
            <div className="w-20 text-right text-xs text-muted-foreground">Купить</div>
            <div className="w-20 text-right text-xs text-muted-foreground">Продать</div>
          </div>

          <div className="flex flex-col gap-4">
            {CURRENCIES.map((c) => (
              <div key={c.code} className="flex items-center gap-3">
                <Avatar className="size-9 rounded-full flex-shrink-0">
                  <AvatarImage src={c.flag} alt={c.code} className="object-cover" />
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{c.code}</p>
                  <p className="text-xs text-muted-foreground">{c.name}</p>
                </div>
                <div className="w-20 flex items-center justify-end gap-0.5 flex-shrink-0">
                  {c.trend === 'up' && <ChevronUp className="size-3.5 text-success" />}
                  {c.trend === 'down' && <ChevronDown className="size-3.5 text-destructive" />}
                  <p className="text-sm font-medium text-foreground">{c.buy}</p>
                </div>
                <div className="w-20 flex items-center justify-end gap-0.5 flex-shrink-0">
                  {c.trend === 'up' && <ChevronUp className="size-3.5 text-success" />}
                  {c.trend === 'down' && <ChevronDown className="size-3.5 text-destructive" />}
                  <p className="text-sm font-medium text-foreground">{c.sell}</p>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="metals" className="mt-3">
          <p className="text-sm text-muted-foreground text-center py-4">Нет данных</p>
        </TabsContent>
      </Tabs>
    </div>
  )
}
