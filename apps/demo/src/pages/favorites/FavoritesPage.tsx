import {
  ArrowLeft,
  ArrowUpDown,
  FolderHeart,
  Heart,
  LayoutGrid,
  Rows3,
  Store,
  Trash2,
  type LucideIcon,
} from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@rollout/ui-kit'

import type { Product } from '@/pages/home/data'

import { PRODUCTS } from '@/pages/home/data'
import { ProductCard } from '@/pages/home/ProductCard'
import { useFavorites } from '@/store/favorites'

type View = 'grid' | 'list'
type Tab = 'items' | 'collections' | 'stores'
type Chip = 'all' | 'discount' | 'instock'
type Sort = 'date' | 'priceAsc' | 'priceDesc' | 'name'

const SORT_LABEL: Record<Sort, string> = {
  date: 'По дате',
  priceAsc: 'По цене ↑',
  priceDesc: 'По цене ↓',
  name: 'По названию',
}

function formatRub(n: number): string {
  return `${n.toLocaleString('ru-RU')} ₽`
}

function pluralize(n: number, forms: [string, string, string]): string {
  const mod10 = n % 10
  const mod100 = n % 100
  if (mod10 === 1 && mod100 !== 11) return forms[0]
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return forms[1]
  return forms[2]
}

export function FavoritesPage() {
  const navigate = useNavigate()
  const { ids, toggle, clear } = useFavorites()
  const [view, setView] = useState<View>('grid')
  const [tab, setTab] = useState<Tab>('items')
  const [chip, setChip] = useState<Chip>('all')
  const [sort, setSort] = useState<Sort>('date')

  const items = PRODUCTS.filter((p) => ids.has(p.id))
  const filtered = items.filter((p) => {
    if (chip === 'discount') return Boolean(p.originalPrice)
    return true
  })
  const sorted = [...filtered].sort((a, b) => {
    if (sort === 'priceAsc') return a.price - b.price
    if (sort === 'priceDesc') return b.price - a.price
    if (sort === 'name') return a.title.localeCompare(b.title, 'ru')
    return 0
  })

  const count = sorted.length
  const isEmpty = items.length === 0

  const handleClear = () => {
    if (window.confirm('Удалить все товары из избранного?')) clear()
  }

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
          <h1 className="flex-1 truncate text-lg font-semibold leading-7 text-foreground">
            Избранное
            {!isEmpty && <span className="ml-2 font-normal text-muted-foreground">{items.length}</span>}
          </h1>
          {!isEmpty && (
            <Button
              variant="ghost"
              size="icon"
              className="size-10 shrink-0 rounded-xl"
              aria-label={view === 'grid' ? 'Список' : 'Сетка'}
              onClick={() => setView(view === 'grid' ? 'list' : 'grid')}
            >
              {view === 'grid' ? (
                <Rows3 className="size-5 text-foreground" strokeWidth={1.75} />
              ) : (
                <LayoutGrid className="size-5 text-foreground" strokeWidth={1.75} />
              )}
            </Button>
          )}
          {!isEmpty && (
            <Button
              variant="ghost"
              size="icon"
              className="size-10 shrink-0 rounded-xl"
              aria-label="Очистить избранное"
              onClick={handleClear}
            >
              <Trash2 className="size-5 text-foreground" strokeWidth={1.75} />
            </Button>
          )}
        </div>

        {/* Tabs */}
        <Tabs value={tab} onValueChange={(v) => setTab(v as Tab)}>
          <TabsList>
            <TabsTrigger value="items">Товары</TabsTrigger>
            <TabsTrigger value="collections">Подборки</TabsTrigger>
            <TabsTrigger value="stores">Магазины</TabsTrigger>
          </TabsList>

          <TabsContent value="items" className="flex min-h-[calc(100svh-380px)] flex-col gap-5">
            {!isEmpty && (
              <>
                {/* Filter chips */}
                <div className="-mx-4 mt-3 flex gap-2 overflow-x-auto px-4 scrollbar-hide">
                  <FilterChip active={chip === 'all'} onClick={() => setChip('all')}>
                    Все
                  </FilterChip>
                  <FilterChip active={chip === 'discount'} onClick={() => setChip('discount')}>
                    Со скидкой
                  </FilterChip>
                  <FilterChip active={chip === 'instock'} onClick={() => setChip('instock')}>
                    В наличии
                  </FilterChip>
                </div>

                {/* Count + sort trigger */}
                <div className="flex w-full items-center justify-between">
                  <p className="text-base font-semibold text-foreground">
                    {count} {pluralize(count, ['товар', 'товара', 'товаров'])}
                  </p>
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      render={
                        <Button
                          variant="ghost"
                          size="sm"
                          className="-mr-2 h-9 gap-1.5 px-2 text-sm font-medium text-muted-foreground"
                        >
                          <ArrowUpDown className="size-4" strokeWidth={1.75} />
                          {SORT_LABEL[sort]}
                        </Button>
                      }
                    />
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuRadioGroup value={sort} onValueChange={(v) => setSort(v as Sort)}>
                        <DropdownMenuRadioItem value="date">По дате</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="priceAsc">По цене ↑</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="priceDesc">По цене ↓</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="name">По названию</DropdownMenuRadioItem>
                      </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Items */}
                {view === 'grid' ? (
                  <div className="grid grid-cols-2 gap-x-5 gap-y-7">
                    {sorted.map((p) => (
                      <ProductCard key={p.id} product={p} />
                    ))}
                  </div>
                ) : (
                  <ul className="flex w-full flex-col">
                    {sorted.map((p) => (
                      <li key={p.id}>
                        <ListRow product={p} onRemove={() => toggle(p.id)} />
                      </li>
                    ))}
                  </ul>
                )}
              </>
            )}

            {isEmpty && <EmptyState />}
          </TabsContent>

          <TabsContent value="collections" className="flex min-h-[calc(100svh-380px)] flex-col">
            <PlaceholderState
              Icon={FolderHeart}
              title="Подборки скоро здесь появятся"
              description="Сохраняйте товары в тематические папки — например, «Подарки» или «Wishlist»"
              ctaLabel="Создать подборку"
            />
          </TabsContent>

          <TabsContent value="stores" className="flex min-h-[calc(100svh-380px)] flex-col">
            <PlaceholderState
              Icon={Store}
              title="Нет избранных магазинов"
              description="Добавляйте магазины, чтобы быстрее находить их в каталоге и получать новости о скидках"
              ctaLabel="Найти магазины"
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        'flex h-10 shrink-0 items-center gap-2 rounded-2xl border px-4 text-sm font-medium ' +
        (active ? 'border-foreground bg-foreground text-background' : 'border-border bg-background text-foreground')
      }
    >
      {children}
    </button>
  )
}

function ListRow({ product: p, onRemove }: { product: Product; onRemove: () => void }) {
  return (
    <div className="flex w-full items-center gap-3 py-3">
      <img src={p.imgUrl[0]} alt={p.title} className="size-20 shrink-0 rounded-xl bg-muted object-cover" />
      <div className="flex flex-1 min-w-0 flex-col gap-0.5">
        <p className="line-clamp-2 text-sm font-medium leading-5 text-foreground">{p.title}</p>
        {p.seller && <p className="line-clamp-1 text-xs leading-4 text-muted-foreground">{p.seller}</p>}
        <div className="mt-1 flex items-baseline gap-2">
          <p className="text-base font-semibold leading-6 text-foreground">{formatRub(p.price)}</p>
          {p.originalPrice && (
            <p className="text-xs text-muted-foreground line-through">{formatRub(p.originalPrice)}</p>
          )}
        </div>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="size-10 shrink-0 rounded-xl"
        aria-label="Удалить из избранного"
        onClick={onRemove}
      >
        <Heart className="size-5 fill-foreground text-foreground" strokeWidth={1.75} />
      </Button>
    </div>
  )
}

function PlaceholderState({
  Icon,
  title,
  description,
  ctaLabel,
  ctaTo = '/',
}: {
  Icon: LucideIcon
  title: string
  description: string
  ctaLabel: string
  ctaTo?: string
}) {
  return (
    <Empty className="flex-1 border-0 py-8">
      <EmptyHeader>
        <EmptyMedia variant="icon" className="size-14 rounded-2xl">
          <Icon className="size-7" strokeWidth={1.5} />
        </EmptyMedia>
        <EmptyTitle className="text-base font-semibold">{title}</EmptyTitle>
        <EmptyDescription>{description}</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button
          nativeButton={false}
          className="h-10 rounded-xl px-4 text-sm"
          render={<Link to={ctaTo}>{ctaLabel}</Link>}
        />
      </EmptyContent>
    </Empty>
  )
}

function EmptyState() {
  const recommended = PRODUCTS.slice(0, 6)
  return (
    <div className="flex flex-col gap-7">
      <PlaceholderState
        Icon={Heart}
        title="Избранное пусто"
        description="Сохраните понравившиеся товары, чтобы вернуться к ним позже"
        ctaLabel="Перейти к покупкам"
      />
      <section className="flex w-full flex-col gap-3">
        <h2 className="text-base font-semibold text-foreground">Рекомендуем вам</h2>
        <div className="-mx-4 flex gap-3 overflow-x-auto px-4 scrollbar-hide">
          {recommended.map((p) => (
            <div key={p.id} className="w-[180px] shrink-0">
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
