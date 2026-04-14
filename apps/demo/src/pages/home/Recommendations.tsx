import { PRODUCTS } from './data'
import { ProductCard } from './ProductCard'

export function Recommendations() {
  return (
    <section className="flex flex-col gap-3 w-full">
      <h2 className="text-xl font-semibold text-foreground">Рекомендации</h2>
      <div className="grid grid-cols-2 gap-x-5 gap-y-7">
        {PRODUCTS.map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  )
}
