import { cn } from '@/lib/utils'
import { CATEGORY_ROW_1, CATEGORY_ROW_2 } from './data'
import type { Category } from './data'

function CategoryCard({ label, imgUrl, wide, imgOffsetY, imgOffsetX, eager }: Category & { eager?: boolean }) {
  return (
    <div
      className={cn(
        'relative h-20 rounded-xl bg-secondary flex-shrink-0 overflow-hidden p-2',
        wide ? 'w-[130px]' : 'w-[85px]'
      )}
    >
      <span className="text-sm font-medium leading-none text-foreground relative z-10 block">
        {label}
      </span>
      <div
        className="absolute size-[100px] pointer-events-none"
        style={{
          top: `${22 + (imgOffsetY ?? 0)}px`,
          left: `${30 + (imgOffsetX ?? 0)}px`,
        }}
      >
        <img
          src={imgUrl}
          alt={label}
          className="w-full h-full object-cover"
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
        />
      </div>
    </div>
  )
}

export function MainRubricator() {
  return (
    <div className="flex flex-col gap-2 w-full">
      {[CATEGORY_ROW_1, CATEGORY_ROW_2].map((row, rowIdx) => (
        <div key={rowIdx} className="flex gap-2 overflow-x-auto scrollbar-hide">
          {row.map(cat => (
            <CategoryCard key={cat.id} {...cat} eager={rowIdx === 0} />
          ))}
        </div>
      ))}
    </div>
  )
}
