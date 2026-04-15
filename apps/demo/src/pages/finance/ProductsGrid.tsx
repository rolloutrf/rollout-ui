import { Card } from '@rollout/ui-kit'
import { Button } from '@rollout/ui-kit'
import { PRODUCTS } from './data'

export function ProductsGrid() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-foreground">Продукты</h2>
        <Button variant="ghost" size="sm" className="text-primary">
          Все
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {PRODUCTS.map((p) => (
          <Card
            key={p.id}
            className="rounded-3xl overflow-hidden bg-card border border-border shadow-sm cursor-pointer h-[105px] relative"
          >
            <div className="absolute top-4 left-4">
              <p className="text-sm font-medium text-foreground leading-none">{p.title}</p>
              {p.subtitle && (
                <p className="text-sm font-medium text-foreground leading-none mt-1">
                  {p.subtitle}
                </p>
              )}
            </div>
            <img
              src={p.imageUrl}
              alt={p.title}
              className="absolute right-0 top-1/2 -translate-y-1/2 h-[115%] w-auto"
            />
          </Card>
        ))}
      </div>
    </div>
  )
}
