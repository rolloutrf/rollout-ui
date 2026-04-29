import { Button } from '@rollout/ui-kit'
import { ArrowLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { SearchInput } from '@/components/ui/SearchInput'
import { PRODUCTS } from '@/pages/home/data'
import { ProductCard } from '@/pages/home/ProductCard'

interface CategoryItem {
  id: string
  label: string
  img: string
}

const CATEGORY_ROW_1: CategoryItem[] = [
  { id: 'phones', label: 'Смартфоны и фототехника', img: '/electronics/cat-smartfony.png' },
  { id: 'appliances', label: 'Бытовая техника', img: '/electronics/cat-bytovaya.png' },
  { id: 'beauty', label: 'Красота и здоровье', img: '/electronics/cat-default.png' },
  { id: 'tv-audio', label: 'ТВ, консоли и аудио', img: '/electronics/cat-default.png' },
  { id: 'pc', label: 'ПК, ноутбуки и периферия', img: '/electronics/cat-default.png' },
]

const CATEGORY_ROW_2: CategoryItem[] = [
  { id: 'pc-parts', label: 'Комплектация для ПК', img: '/electronics/cat-pc.png' },
  { id: 'network', label: 'Сетевое оборудование', img: '/electronics/cat-network.png' },
  { id: 'smart-home', label: 'Умный дом и безопасность', img: '/electronics/cat-default.png' },
  { id: 'leisure', label: 'Отдых и развлечения', img: '/electronics/cat-default.png' },
]

const BANNER_GRADIENT =
  'radial-gradient(at 80% 80%, rgba(93,95,230,1) 0%, rgba(79,76,178,1) 27%, rgba(65,58,126,1) 46%, rgba(50,39,73,1) 65%, rgba(36,20,21,1) 84%)'

const SMARTPHONE = PRODUCTS.find((p) => p.id === 'p1')!

export function ElectronicsPage() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')

  return (
    <div className="w-full">
      <div className="mx-auto flex max-w-[576px] flex-col gap-7 pt-20 pb-8">
        {/* NavBar */}
        <div className="flex w-full items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="size-10 shrink-0 rounded-xl"
            aria-label="Назад"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="size-5 text-foreground" strokeWidth={1.75} />
          </Button>
          <h1 className="flex-1 text-lg font-semibold leading-7 text-foreground">Электроника</h1>
          <div className="size-10 shrink-0" aria-hidden="true" />
        </div>

        {/* Search */}
        <SearchInput value={query} onChange={setQuery} />

        {/* Categories — two horizontal-scroll rows; -mx-4/px-4 breaks out of AppShell's px-4 so cards bleed off the actual screen edge */}
        <div className="flex flex-col gap-2">
          {[CATEGORY_ROW_1, CATEGORY_ROW_2].map((row, rowIdx) => (
            <div key={rowIdx} className="-mx-4 flex gap-2 overflow-x-auto px-4 scrollbar-hide">
              {row.map(({ id, label, img }) => (
                <button
                  key={id}
                  type="button"
                  className="flex h-[72px] w-[208px] shrink-0 items-center gap-3 rounded-2xl border border-border bg-card p-3 text-left"
                >
                  <img
                    src={img}
                    alt=""
                    className="size-10 shrink-0 object-contain"
                    loading={rowIdx === 0 ? 'eager' : 'lazy'}
                    decoding="async"
                  />
                  <span className="flex-1 text-sm font-medium leading-4 text-foreground">{label}</span>
                </button>
              ))}
            </div>
          ))}
        </div>

        {/* Promo banner */}
        <div
          className="aspect-[343/181] w-full overflow-hidden rounded-2xl border border-border"
          style={{ backgroundImage: BANNER_GRADIENT }}
        >
          <img
            src="/home/banner-1.png"
            alt=""
            className="h-full w-full object-contain"
            style={{ transform: 'scale(1.3)' }}
            loading="lazy"
            decoding="async"
          />
        </div>

        {/* All discounts CTA */}
        <button
          type="button"
          className="flex w-full items-center gap-2.5 rounded-2xl border border-border bg-card p-3 text-left"
        >
          <img
            src="/electronics/cta-discounts.png"
            alt=""
            className="size-10 shrink-0 object-contain"
            loading="lazy"
            decoding="async"
          />
          <span className="flex-1 text-sm font-medium leading-4 text-foreground">Все скидки и акции</span>
          <ChevronRight className="size-5 shrink-0 text-muted-foreground" aria-hidden={true} />
        </button>

        {/* Recommendations */}
        <section className="flex w-full flex-col gap-3">
          <h2 className="text-xl font-semibold text-foreground">Вам может понравится</h2>
          <div className="grid grid-cols-2 gap-x-5 gap-y-7">
            {[0, 1, 2, 3].map((i) => (
              <ProductCard key={i} product={SMARTPHONE} />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
