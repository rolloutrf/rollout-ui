import { Heart } from 'lucide-react'
import { Button } from '@rollout/ui-kit'
import { useFavorites } from '@/store/favorites'
import type { Product } from './data'

export function ProductCard({ product: p }: { product: Product }) {
  const { has, toggle } = useFavorites()
  const isFav = has(p.id)

  return (
    // MasterSnippet: gap-3 (12px) between image area and description
    <div className="flex flex-col gap-3">

      {/* ── Image carousel + pagination ── */}
      <div className="flex flex-col gap-1.5 items-center w-full">
        {/* bg-card adapts: white in light, dark surface in dark theme */}
        <div className="aspect-square bg-card border border-border rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] overflow-hidden w-full">
          <img
            src={p.imgUrl}
            alt={p.title}
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
          />
        </div>
        {/* Pagination dots — 4px active / 3px inactive */}
        <div className="flex gap-0.5 items-center">
          <div className="w-1 h-1 rounded-full bg-foreground" />
          <div className="w-[3px] h-[3px] rounded-full bg-border" />
          <div className="w-[3px] h-[3px] rounded-full bg-border" />
        </div>
      </div>

      {/* ── Description — gap-2 (8px) between all rows, px-1 horizontal ── */}
      <div className="flex flex-col gap-2 px-1">

        {/* Name — text-base = 16px, font-normal, text-foreground */}
        <p className="text-base font-normal leading-6 text-foreground line-clamp-2">
          {p.title}
        </p>

        {/* Price set */}
        <div className="flex flex-col gap-0.5">
          {/* Price — text-base bold */}
          <p className="text-base font-bold leading-6 text-foreground whitespace-nowrap">{p.price}</p>
          {p.originalPrice && (
            <div className="flex items-center gap-1.5">
              {/* Original price — text-sm strikethrough, text-foreground (muted by decoration) */}
              <p className="text-sm line-through leading-5 text-foreground">{p.originalPrice}</p>
              {/* Discount — text-sm, text-destructive (semantic red token) */}
              {p.discount && (
                <p className="text-sm leading-5 text-destructive">{p.discount}</p>
              )}
            </div>
          )}
        </div>

        {/* Attribute set — gap-0.5 (2px) between rows */}
        {p.attributes.length > 0 && (
          <div className="flex flex-col gap-0.5">
            {p.attributes.map((attr, i) => (
              <div key={i} className="flex items-center gap-1 max-w-full overflow-hidden">
                {/* Color swatches — inline color dots */}
                {attr.swatches?.map((c, j) => (
                  <div
                    key={j}
                    className="size-3 rounded-full flex-shrink-0 border border-border/30"
                    style={{ backgroundColor: c }}
                  />
                ))}
                {/* Lucide icon — size-3.5, text-muted-foreground */}
                {attr.Icon && (
                  <attr.Icon className="size-3.5 flex-shrink-0 text-muted-foreground" />
                )}
                {/* Attribute text — text-sm, text-foreground */}
                <span className="text-sm leading-5 text-foreground truncate">
                  {attr.text}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Seller + rating */}
        {p.seller && (
          <div className="flex flex-wrap items-center gap-1.5">
            {/* Seller name — text-sm bold */}
            <span className="text-sm font-bold leading-5 text-foreground">{p.seller}</span>
            {p.rating && (
              <div className="flex items-center gap-1">
                {/* Star — amber-500 is a fixed accent, not a semantic token */}
                <span className="text-sm leading-5 text-amber-500">★</span>
                <span className="text-sm leading-5 text-foreground">{p.rating}</span>
                {p.reviewCount && (
                  <span className="text-sm leading-5 text-muted-foreground">{p.reviewCount}</span>
                )}
              </div>
            )}
          </div>
        )}

        {/* Date — h-[39px] fixed, text-sm muted-foreground */}
        <div className="h-[39px] overflow-hidden">
          <p className="text-sm leading-5 text-muted-foreground truncate">{p.date}</p>
        </div>

        {/* Buttons */}
        <div className="flex gap-2 items-center">
          <Button variant="default" size="lg" className="flex-1">
            {p.buttonText}
          </Button>
          <Button
            variant="secondary"
            size="icon-lg"
            className=""
            onClick={() => toggle(p.id)}
          >
            <Heart
              className="size-4 transition-colors"
              fill={isFav ? 'currentColor' : 'none'}
              strokeWidth={isFav ? 0 : 1.5}
              style={{ color: isFav ? 'hsl(var(--destructive))' : undefined }}
            />
          </Button>
        </div>

      </div>
    </div>
  )
}
