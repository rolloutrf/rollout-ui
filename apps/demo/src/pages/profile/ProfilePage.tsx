import {
  CreditCard,
  TicketPercent,
  Gift,
  ShoppingBag,
  CornerDownLeft,
  Heart,
  ListChecks,
  HelpCircle,
  MessageCircle,
  Bell,
  Shield,
  Trash2,
  ChevronRight,
  type LucideIcon,
} from 'lucide-react'
import { Link } from 'react-router-dom'

import { Card } from '@rollout/ui-kit'
import { Button } from '@rollout/ui-kit'
import { Avatar, AvatarFallback } from '@rollout/ui-kit'

import { USER, WALLET } from './data'

interface MenuItem {
  icon: LucideIcon
  label: string
}

const MENU_SECTIONS: { title: string; items: MenuItem[] }[] = [
  {
    title: '',
    items: [
      { icon: CreditCard, label: 'Способы оплаты' },
      { icon: TicketPercent, label: 'Промокоды' },
      { icon: Gift, label: 'Сертификаты' },
    ],
  },
  {
    title: 'Мои покупки',
    items: [
      { icon: ShoppingBag, label: 'Заказы' },
      { icon: CornerDownLeft, label: 'Возвраты' },
      { icon: Heart, label: 'Избранное' },
      { icon: ListChecks, label: 'Сравнение' },
      { icon: HelpCircle, label: 'Отзывы и вопросы' },
    ],
  },
  {
    title: 'Настройки',
    items: [
      { icon: HelpCircle, label: 'FAQ' },
      { icon: MessageCircle, label: 'Чат с поддержкой' },
    ],
  },
  {
    title: 'Поддержка',
    items: [
      { icon: Bell, label: 'Уведомления' },
      { icon: Shield, label: 'Безопасность' },
      { icon: Trash2, label: 'Удалить профиль' },
    ],
  },
]

/* ── menu row ── */

function MenuRow({ icon: Icon, label }: MenuItem) {
  return (
    <div className="flex items-center gap-3 w-full py-3 px-1 cursor-pointer">
      <Icon className="size-5 text-muted-foreground flex-shrink-0" strokeWidth={1.5} />
      <span className="flex-1 text-sm font-medium text-foreground text-left">{label}</span>
      <ChevronRight className="size-4 text-muted-foreground flex-shrink-0" />
    </div>
  )
}

/* ── page ── */

export function ProfilePage() {
  return (
    <div className="w-full">
      <div className="max-w-[576px] mx-auto flex flex-col gap-6 py-4 pb-8 px-4">
        {/* Title + bell */}
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-foreground">Профиль</h1>
          <Button variant="ghost" size="icon" className="size-10">
            <Bell className="size-5 text-muted-foreground" strokeWidth={1.5} />
          </Button>
        </div>

        {/* Account */}
        <section className="flex flex-col gap-3">
          <p className="text-sm font-medium text-muted-foreground">Аккаунт</p>
          <Link
            to="/profile/personal-data"
            className="flex items-center gap-3 w-full py-2 px-1 cursor-pointer rounded-md transition-colors hover:bg-muted/40"
          >
            <Avatar className="size-12">
              <AvatarFallback className="bg-accent text-accent-foreground text-sm font-bold">АК</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0 text-left">
              <p className="text-sm font-medium text-foreground">{USER.name}</p>
              <p className="text-xs text-muted-foreground">{USER.email}</p>
            </div>
            <ChevronRight className="size-4 text-muted-foreground flex-shrink-0" />
          </Link>
        </section>

        {/* Finance */}
        <section className="flex flex-col gap-3">
          <p className="text-sm font-medium text-foreground">Финансы</p>
          <Card className="rounded-3xl p-6 flex flex-col gap-6 bg-card border border-border shadow-sm">
            <div className="flex flex-col gap-1.5">
              <p className="text-2xl font-bold text-card-foreground">{WALLET.balance}</p>
              <p className="text-sm font-normal text-muted-foreground">{WALLET.label}</p>
            </div>
            <Button variant="default" className="w-full h-[40px] rounded-lg">
              Пополнить
            </Button>
          </Card>
        </section>

        {/* Menu sections */}
        {MENU_SECTIONS.map((section, si) => (
          <section key={si} className="flex flex-col gap-1">
            {section.title && <p className="text-sm font-medium text-muted-foreground mb-2">{section.title}</p>}
            {section.items.map((item, ii) => (
              <MenuRow key={ii} {...item} />
            ))}
          </section>
        ))}

        {/* Logout */}
        <Button variant="secondary" className="w-full rounded-xl h-11 gap-2 font-medium">
          Выход из профиля
        </Button>
      </div>
    </div>
  )
}
