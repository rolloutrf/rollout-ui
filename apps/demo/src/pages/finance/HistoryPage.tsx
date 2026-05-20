import { Avatar, AvatarFallback, AvatarImage, Badge, Button } from '@rollout/ui-kit'
import {
  ArrowLeft,
  ArrowRightLeft,
  Percent,
  Search,
  Settings2,
  ShoppingBasket,
  Sparkles,
  Utensils,
  type LucideIcon,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

type RightSlot =
  | { kind: 'outgoing'; amount: string; badge?: string }
  | { kind: 'incoming'; amount: string }
  | { kind: 'neutral'; amount: string }

type MediaIcon = { type: 'icon'; Icon: LucideIcon; bg: string; fg: string }
type MediaAvatar = { type: 'avatar'; src: string; bg?: string }
type HistoryItem = {
  id: string
  title: string
  description: string
  media: MediaIcon | MediaAvatar
  right: RightSlot
}

type HistoryGroup = {
  id: string
  label: string
  items: HistoryItem[]
}

const GROUPS: HistoryGroup[] = [
  {
    id: 'today',
    label: 'Сегодня, 5 ноября',
    items: [
      {
        id: 'today-1',
        title: 'Супермаркет «Удачный»',
        description: 'Продукты',
        media: { type: 'icon', Icon: ShoppingBasket, bg: 'bg-cat-amber/15', fg: 'text-cat-amber' },
        right: { kind: 'outgoing', amount: '-12 867,09 ₽', badge: '+12' },
      },
      {
        id: 'today-2',
        title: 'Екатерина Ирсуевна Л.',
        description: 'Переводы ∙ СБП ∙ Сбер',
        media: { type: 'avatar', src: '/finance/contact-nalichnye.png' },
        right: { kind: 'incoming', amount: '+10 000 ₽' },
      },
      {
        id: 'today-3',
        title: 'Людмила Ивановна П.',
        description: 'Переводы ∙ СБП ∙ Альфа-Банк',
        media: { type: 'avatar', src: '/finance/contact-maksu.png' },
        right: { kind: 'outgoing', amount: '-4 675 ₽' },
      },
    ],
  },
  {
    id: 'yesterday',
    label: 'Вчера, 4 ноября',
    items: [
      {
        id: 'yest-1',
        title: 'Проценты по вкладу',
        description: 'Накопления',
        media: { type: 'icon', Icon: Percent, bg: 'bg-success/15', fg: 'text-success' },
        right: { kind: 'incoming', amount: '+234,56 ₽' },
      },
      {
        id: 'yest-2',
        title: 'Lamoda',
        description: 'Возврат',
        media: { type: 'icon', Icon: ShoppingBasket, bg: 'bg-accent/15', fg: 'text-accent' },
        right: { kind: 'incoming', amount: '+16 500 ₽' },
      },
      {
        id: 'yest-3',
        title: 'Перевод между счетами',
        description: 'Между счетами',
        media: { type: 'icon', Icon: ArrowRightLeft, bg: 'bg-cat-violet/15', fg: 'text-cat-violet' },
        right: { kind: 'neutral', amount: '50 000 ₽' },
      },
    ],
  },
  {
    id: 'nov-3',
    label: '3 ноября',
    items: [
      {
        id: 'n3-1',
        title: 'Miss you',
        description: 'Кафе и рестораны',
        media: { type: 'icon', Icon: Utensils, bg: 'bg-cat-amber/15', fg: 'text-cat-amber' },
        right: { kind: 'outgoing', amount: '-1 250 ₽', badge: '+3' },
      },
      {
        id: 'n3-2',
        title: 'THE BODY',
        description: 'Красота',
        media: { type: 'icon', Icon: Sparkles, bg: 'bg-destructive/15', fg: 'text-destructive' },
        right: { kind: 'outgoing', amount: '-5 900 ₽', badge: '+9' },
      },
      {
        id: 'n3-3',
        title: 'Перевод на карту ∙∙ 0056',
        description: 'Переводы ∙ Т-Банк',
        media: { type: 'icon', Icon: ArrowRightLeft, bg: 'bg-cat-violet/15', fg: 'text-cat-violet' },
        right: { kind: 'outgoing', amount: '-7 689 ₽' },
      },
    ],
  },
]

const BAR_SEGMENTS: { className: string; flex: number }[] = [
  { className: 'bg-destructive', flex: 38 },
  { className: 'bg-cat-blue', flex: 37 },
  { className: 'bg-success', flex: 7 },
  { className: 'bg-cat-amber', flex: 11 },
  { className: 'bg-success', flex: 7 },
]

export function HistoryPage() {
  const navigate = useNavigate()

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
          <h1 className="flex-1 text-lg font-semibold leading-7 text-foreground">История операций</h1>
          <Button variant="ghost" size="icon" className="size-10 shrink-0 rounded-xl" aria-label="Поиск">
            <Search className="size-5 text-foreground" strokeWidth={1.75} />
          </Button>
        </div>

        {/* Analytics summary card */}
        <article className="flex flex-col gap-6 rounded-2xl border border-border bg-neutral-900 py-6 shadow-sm">
          <header className="flex flex-col gap-1 px-6">
            <h2 className="text-2xl font-bold leading-8 text-neutral-50">100 089 ₽</h2>
            <p className="text-sm leading-5 text-neutral-400">Расходы за апрель</p>
          </header>
          <div className="px-6">
            <div className="flex h-10 w-full gap-1 overflow-hidden rounded-md">
              {BAR_SEGMENTS.map((seg, i) => (
                <span
                  key={i}
                  className={`block h-full ${seg.className}`}
                  style={{ flex: seg.flex }}
                />
              ))}
            </div>
          </div>
        </article>

        {/* Filters toggle */}
        <div>
          <button
            type="button"
            className="inline-flex h-10 items-center gap-1.5 rounded-xl border border-border bg-background px-2.5 text-sm font-medium text-foreground shadow-xs"
          >
            <Settings2 className="size-4" strokeWidth={1.75} />
            <span>Фильтры</span>
          </button>
        </div>

        {/* Operations list grouped by date */}
        <section className="flex flex-col gap-2">
          {GROUPS.map((group, gi) => (
            <div key={group.id} className="flex flex-col">
              <div className="relative flex h-5 items-center justify-center">
                <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-border" aria-hidden />
                <span className="relative bg-background px-2 text-sm text-muted-foreground">{group.label}</span>
              </div>
              <ul className="flex flex-col">
                {group.items.map((item) => (
                  <li key={item.id} className="flex items-start gap-4 py-4">
                    {item.media.type === 'icon' ? (
                      <div
                        className={`flex size-10 flex-shrink-0 items-center justify-center rounded-lg ${item.media.bg}`}
                      >
                        <item.media.Icon className={`size-5 ${item.media.fg}`} strokeWidth={1.75} />
                      </div>
                    ) : (
                      <Avatar className="size-10 flex-shrink-0 rounded-lg">
                        <AvatarImage src={item.media.src} alt={item.title} className="rounded-lg" />
                        <AvatarFallback className="rounded-lg bg-muted text-xs font-medium text-foreground">
                          {item.title.slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                    )}

                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium leading-4 text-foreground">{item.title}</p>
                      <p className="text-sm leading-5 text-muted-foreground">{item.description}</p>
                    </div>

                    <div className="flex flex-shrink-0 flex-col items-end gap-1">
                      <p
                        className={`text-sm font-medium leading-4 ${
                          item.right.kind === 'incoming' ? 'text-success' : 'text-foreground'
                        }`}
                      >
                        {item.right.amount}
                      </p>
                      {item.right.kind === 'outgoing' && item.right.badge ? (
                        <Badge variant="default" className="rounded-full px-1.5 py-0 text-[10px]">
                          {item.right.badge}
                        </Badge>
                      ) : null}
                    </div>
                  </li>
                ))}
              </ul>
              {gi < GROUPS.length - 1 ? null : null}
            </div>
          ))}
        </section>
      </div>
    </div>
  )
}
