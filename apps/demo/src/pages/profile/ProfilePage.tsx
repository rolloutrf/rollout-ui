import {
  Bell,
  ChevronRight,
  CircleHelp,
  FileBadge,
  HandCoins,
  Heart,
  List,
  LogOut,
  MessageCircleQuestion,
  MessagesSquare,
  Package,
  Redo2,
  Shield,
  TicketPercent,
  Trash2,
  type LucideIcon,
} from 'lucide-react'
import { Link } from 'react-router-dom'

import { Avatar, AvatarFallback } from '@rollout/ui-kit'
import { Button } from '@rollout/ui-kit'
import { Card } from '@rollout/ui-kit'
import { Separator } from '@rollout/ui-kit'

import { USER, WALLET } from './data'

/* ── types ── */

interface MenuItem {
  icon: LucideIcon
  label: string
  to?: string
  destructive?: boolean
}

interface MenuSection {
  title: string
  items: MenuItem[]
}

/* ── data ── */

const FINANCE_ITEMS: MenuItem[] = [
  { icon: HandCoins, label: 'Способы оплаты' },
  { icon: TicketPercent, label: 'Промокоды', to: '/profile/promocodes' },
  { icon: FileBadge, label: 'Сертификаты' },
]

const MENU_SECTIONS: MenuSection[] = [
  {
    title: 'Мои покупки',
    items: [
      { icon: Package, label: 'Заказы' },
      { icon: Redo2, label: 'Возвраты' },
      { icon: Heart, label: 'Избранное' },
      { icon: List, label: 'Сравнение' },
      { icon: CircleHelp, label: 'Отзывы и вопросы' },
    ],
  },
  {
    title: 'Настройки',
    items: [
      { icon: MessageCircleQuestion, label: 'FAQ' },
      { icon: MessagesSquare, label: 'Чат с поддержкой' },
    ],
  },
  {
    title: 'Поддержка',
    items: [
      { icon: Bell, label: 'Уведомления' },
      { icon: Shield, label: 'Безопасность' },
      { icon: Trash2, label: 'Удалить профиль', destructive: true },
    ],
  },
]

/* ── menu row ── */

function MenuRow({ icon: Icon, label, to, destructive }: MenuItem) {
  const content = (
    <>
      <span className={`flex size-9 shrink-0 items-center justify-center rounded-xl ${destructive ? 'bg-destructive/10 text-destructive' : 'bg-muted text-muted-foreground'}`}>
        <Icon className="size-5" strokeWidth={1.5} />
      </span>
      <span className={`flex-1 text-sm font-normal text-left ${destructive ? 'text-destructive' : 'text-foreground'}`}>
        {label}
      </span>
      {!destructive && <ChevronRight className="size-4 text-muted-foreground shrink-0" />}
    </>
  )
  const className = 'flex items-center gap-3 w-full py-2.5 px-4 cursor-pointer transition-colors hover:bg-muted/50 active:bg-muted'
  return to ? (
    <Link to={to} className={className}>
      {content}
    </Link>
  ) : (
    <div className={className}>{content}</div>
  )
}

/* ── item group ── */

function ItemGroup({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-border bg-card">
      {children}
    </div>
  )
}

/* ── section label ── */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-sm font-medium text-foreground">{children}</p>
}

/* ── page ── */

export function ProfilePage() {
  return (
    <div className="w-full">
      <div className="max-w-[576px] mx-auto flex flex-col gap-6 pt-20 pb-8 px-4">
        {/* ── Аккаунт ── */}
        <section className="flex flex-col gap-2">
          <SectionLabel>Аккаунт</SectionLabel>
          <ItemGroup>
            <Link
              to="/profile/personal-data"
              className="flex items-center gap-3 w-full p-4 cursor-pointer transition-colors hover:bg-muted/50 active:bg-muted"
            >
              <Avatar size="lg" className="size-10">
                <AvatarFallback className="bg-accent text-accent-foreground text-sm font-bold">
                  АК
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0 text-left">
                <p className="text-sm font-medium text-foreground">{USER.name}</p>
                <p className="text-sm text-muted-foreground truncate">{USER.email}</p>
              </div>
              <ChevronRight className="size-4 text-muted-foreground shrink-0" />
            </Link>
          </ItemGroup>
        </section>

        {/* ── Финансы ── */}
        <section className="flex flex-col gap-2">
          <SectionLabel>Финансы</SectionLabel>

          {/* Карточка кошелька */}
          <Card className="rounded-3xl p-5">
            <div className="flex flex-col gap-1">
              <p className="text-2xl font-bold text-card-foreground">{WALLET.balance}</p>
              <p className="text-sm text-muted-foreground">{WALLET.label}</p>
            </div>
            <Button variant="default" className="w-full rounded-xl mt-1">
              Пополнить
            </Button>
          </Card>

          {/* Финансовые пункты */}
          <ItemGroup>
            {FINANCE_ITEMS.map((item, i) => (
              <div key={item.label}>
                {i > 0 && <Separator className="mx-4" />}
                <MenuRow {...item} />
              </div>
            ))}
          </ItemGroup>
        </section>

        {/* ── Menu sections ── */}
        {MENU_SECTIONS.map((section) => (
          <section key={section.title} className="flex flex-col gap-2">
            <SectionLabel>{section.title}</SectionLabel>
            <ItemGroup>
              {section.items.map((item, i) => (
                <div key={item.label}>
                  {i > 0 && <Separator className="mx-4" />}
                  <MenuRow {...item} />
                </div>
              ))}
            </ItemGroup>
          </section>
        ))}

        {/* ── Выход ── */}
        <Button
          variant="outline"
          className="w-full rounded-3xl h-12 gap-2 font-medium"
        >
          <LogOut className="size-4" />
          Выход из профиля
        </Button>
      </div>
    </div>
  )
}
