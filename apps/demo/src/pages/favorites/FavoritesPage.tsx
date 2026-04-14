import { Heart } from 'lucide-react'
import { useFavorites } from '@/store/favorites'
import { PRODUCTS } from '@/pages/home/data'
import { ProductCard } from '@/pages/home/ProductCard'

export function FavoritesPage() {
  const { ids } = useFavorites()
  const items = PRODUCTS.filter(p => ids.has(p.id))

  return (
    <div className="w-full">
      <div className="max-w-[576px] mx-auto flex flex-col gap-7 py-4 pb-[120px] md:pb-8">
        <h1 className="text-xl font-semibold text-foreground">Избранное</h1>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-4 py-24 text-muted-foreground">
            <Heart className="size-12 stroke-1" />
            <p className="text-sm">Здесь появятся товары, которые вы сохранили</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-x-5 gap-y-7">
            {items.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
