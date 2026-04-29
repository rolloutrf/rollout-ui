import {
  Briefcase,
  Car,
  CreditCard,
  Gamepad2,
  Home,
  MoreHorizontal,
  Pill,
  Plane,
  SendHorizontal,
  ShoppingBag,
  ShoppingBasket,
  Smartphone,
  Wifi,
  Zap,
} from 'lucide-react'

import type { LucideIcon } from 'lucide-react'

// Expense categories — single source of truth for the December bar widget
// (FinancePage → AnalyticWidgets) and the analytics page (pie + list).
// Keep colors aligned with the icon bg in the category list: stroke-* matches bg-*.
export interface ExpenseCategory {
  title: string
  ops: number
  amount: number // RUB
  Icon: LucideIcon
  bgClass: string // solid background token class (bar widget + bar chart bars + pie fill via var)
  strokeClass: string // matching SVG stroke token class (legacy)
  iconBg: string // 15%-opacity background for category-list icon tile
  iconColor: string // matching solid text color for category-list icon
  borderClass: string // matching solid border color (chart bars + pie strokes)
  chartBg: string // 20%-opacity background for chart bars
}

export const EXPENSE_BREAKDOWN: ExpenseCategory[] = [
  { title: 'Супермаркеты', ops: 24, amount: 158000, Icon: ShoppingBasket, bgClass: 'bg-accent', strokeClass: 'stroke-accent', iconBg: 'bg-accent/15', iconColor: 'text-accent', borderClass: 'border-accent', chartBg: 'bg-accent/60' },
  { title: 'Авиабилеты', ops: 3, amount: 145000, Icon: Plane, bgClass: 'bg-cat-teal', strokeClass: 'stroke-cat-teal', iconBg: 'bg-cat-teal/15', iconColor: 'text-cat-teal', borderClass: 'border-cat-teal', chartBg: 'bg-cat-teal/60' },
  { title: 'Доставка еды', ops: 18, amount: 142320, Icon: ShoppingBag, bgClass: 'bg-cat-amber', strokeClass: 'stroke-cat-amber', iconBg: 'bg-cat-amber/15', iconColor: 'text-cat-amber', borderClass: 'border-cat-amber', chartBg: 'bg-cat-amber/60' },
  { title: 'Путешествия и туры', ops: 2, amount: 112000, Icon: Briefcase, bgClass: 'bg-success', strokeClass: 'stroke-success', iconBg: 'bg-success/15', iconColor: 'text-success', borderClass: 'border-success', chartBg: 'bg-success/60' },
  { title: 'Аптеки', ops: 14, amount: 98025, Icon: Pill, bgClass: 'bg-destructive', strokeClass: 'stroke-destructive', iconBg: 'bg-destructive/15', iconColor: 'text-destructive', borderClass: 'border-destructive', chartBg: 'bg-destructive/60' },
]

export const EXPENSE_TOTAL = EXPENSE_BREAKDOWN.reduce((sum, c) => sum + c.amount, 0)

export function formatRub(n: number): string {
  // ru-RU uses non-breaking space as thousands separator — render as-is.
  return `${n.toLocaleString('ru-RU')} ₽`
}

// Account
export const ACCOUNT = {
  bankLogo: null as string | null, // T-bank logo is a vector component in Figma
  title: 'Main account · 9089',
  balance: '10 350 ₽',
}

export interface QuickAction {
  icon: LucideIcon
  label: string
}

export const QUICK_ACTIONS: QuickAction[] = [
  { icon: SendHorizontal, label: 'Отправить' },
  { icon: CreditCard, label: 'Оплатить' },
  { icon: MoreHorizontal, label: 'Ещё' },
]

// Analytics widget — amount is the EXPENSE_TOTAL sum, bars come from EXPENSE_BREAKDOWN.
export const ANALYTICS = {
  amount: formatRub(EXPENSE_TOTAL),
  label: 'Расходы за декабрь',
}

// Loyalty widget
export const LOYALTY = {
  points: '5 329',
  label: 'Накоплено бонусов',
  footer: 'Зачислится 31 декабря',
}

// Promotion card
export const PROMOTION = {
  image: '/finance/promo-banner.png',
  title: 'Ставки на кредит снижены',
  description: 'До 600 000 р на любые цели',
}

// Transactions
export interface Transaction {
  id: number
  name: string
  category: string
  amount: string
  positive?: boolean
  bonusPoints?: string
  pending?: boolean
  avatarUrl: string | null
  icon?: LucideIcon
  iconColor?: string
}

export const TRANSACTIONS: Transaction[] = [
  {
    id: 1,
    name: 'Супермаркет «Удачный»',
    category: 'Продукты',
    amount: '-12 867,09 ₽',
    bonusPoints: '+10',
    pending: true,
    avatarUrl: null,
    icon: ShoppingBasket,
    iconColor: 'bg-cat-amber',
  },
  {
    id: 2,
    name: 'Екатерина Ирсуевна Л.',
    category: 'Переводы ∙ СБП ∙ Сбер',
    amount: '+10 000 ₽',
    positive: true,
    avatarUrl: '/finance/contact-nalichnye.png',
  },
  {
    id: 3,
    name: 'Людмила Ивановна П.',
    category: 'Переводы ∙ СБП ∙ Альфа-Банк',
    amount: '-4 675 ₽',
    avatarUrl: '/finance/contact-maksu.png',
  },
]

// Transfers — contacts
export interface Contact {
  name: string
  avatarUrl: string
}

export const CONTACTS: Contact[] = [
  { name: 'Макс', avatarUrl: '/finance/contact-maksu.png' },
  { name: 'Артём', avatarUrl: '/finance/contact-anya.png' },
  { name: 'Надя', avatarUrl: '/finance/contact-nalichnye.png' },
  { name: 'Рома', avatarUrl: '/finance/contact-roma.png' },
  { name: 'Саша', avatarUrl: '/finance/contact-santa.png' },
  { name: 'Катя', avatarUrl: '/finance/contact-shadow1.png' },
  { name: 'Вика', avatarUrl: '/finance/contact-shadow2.png' },
  { name: 'Дима', avatarUrl: '/finance/contact-shadow3.png' },
]

// Currency rates
export interface Currency {
  flag: string // path to flag image, e.g. '/finance/flag-cny.png'
  code: string
  name: string
  buy: string
  sell: string
  trend: 'up' | 'down' | null
}

export const CURRENCIES: Currency[] = [
  {
    flag: '/finance/flag-cny.png',
    code: 'CNY',
    name: 'Юань',
    buy: '11,22',
    sell: '10,96',
    trend: null,
  },
  {
    flag: '/finance/flag-usd.png',
    code: 'USD',
    name: 'Доллар',
    buy: '80,20',
    sell: '74,70',
    trend: null,
  },
  {
    flag: '/finance/flag-aed.png',
    code: 'AED',
    name: 'Дирхам',
    buy: '22,18',
    sell: '20,96',
    trend: 'up',
  },
  {
    flag: '/finance/flag-kzt.png',
    code: '100 KZT',
    name: 'Тенге',
    buy: '16,09',
    sell: '14,77',
    trend: 'down',
  },
]

// Payments
export interface Payment {
  id: number
  title: string
  subtitle: string
  icon: LucideIcon
  iconBg: string
  iconColor: string
}

export const PAYMENTS: Payment[] = [
  {
    id: 1,
    title: 'Мобильная связь',
    subtitle: 'МТС · Билайн · Мегафон',
    icon: Smartphone,
    iconBg: 'bg-accent/15',
    iconColor: 'text-accent',
  },
  {
    id: 2,
    title: 'Квартплата',
    subtitle: 'ЖКХ · Коммунальные услуги',
    icon: Home,
    iconBg: 'bg-cat-blue/15',
    iconColor: 'text-cat-blue',
  },
  {
    id: 3,
    title: 'Интернет и ТВ',
    subtitle: 'Ростелеком · Дом.ру · МТС',
    icon: Wifi,
    iconBg: 'bg-cat-violet/15',
    iconColor: 'text-cat-violet',
  },
  {
    id: 4,
    title: 'Пополнение баланса',
    subtitle: 'App Store · Google Play',
    icon: Gamepad2,
    iconBg: 'bg-secondary',
    iconColor: 'text-foreground',
  },
  {
    id: 5,
    title: 'Штрафы ГИБДД',
    subtitle: 'Автоматически по номеру авто',
    icon: Car,
    iconBg: 'bg-destructive/15',
    iconColor: 'text-destructive',
  },
  {
    id: 6,
    title: 'Электроэнергия',
    subtitle: 'Мосэнергосбыт · ТНС Энерго',
    icon: Zap,
    iconBg: 'bg-cat-amber/15',
    iconColor: 'text-cat-amber',
  },
]

// Products
export interface Product {
  id: number
  title: string
  subtitle?: string
  imageUrl: string
  bgColor: string
}

export const PRODUCTS: Product[] = [
  { id: 1, title: 'Займы', imageUrl: '/finance/product-zaimy.png', bgColor: 'bg-secondary' },
  { id: 2, title: 'Ипотека', imageUrl: '/finance/product-ipoteka.png', bgColor: 'bg-secondary' },
  {
    id: 3,
    title: 'Инвестиции',
    subtitle: 'от 5₽',
    imageUrl: '/finance/product-investitsii.png',
    bgColor: 'bg-secondary',
  },
  { id: 4, title: 'Кредиты', imageUrl: '/finance/product-kredity.png', bgColor: 'bg-secondary' },
]

// Self-employment
export const SELF_EMPLOYMENT = {
  amount: '120 860,54 ₽',
  label: 'Доход за январь • Обновлено в 08:23',
}

// Partners
export const PARTNER_TABS = ['Путешествия', 'Товары', 'Афиша', 'Топливо']

export interface PartnerCard {
  id: number
  title: string
  imageUrl: string
}

export const PARTNER_CARDS: PartnerCard[] = [
  { id: 1, title: 'Новинки', imageUrl: '/finance/product-zaimy.png' },
  { id: 2, title: 'Акции', imageUrl: '/finance/partner-aktsii.png' },
]

export const CASHBACK = {
  title: 'Кешбэк партнеров',
  description: 'Столько бонусов вам доступно для этой категории',
  points: 222,
  footer: 'Сгорит: 31 декабря',
}

// More products (recommendations)
export interface MoreProduct {
  id: number
  title: string
  subtitle: string
  imageUrl: string
}

export const MORE_PRODUCTS: MoreProduct[] = [
  {
    id: 1,
    title: 'Skyeng',
    subtitle: 'Мастерски качают английский',
    imageUrl: '/finance/more-skyeng-photo.png',
  },
  {
    id: 2,
    title: 'ЦУМ OUTLET',
    subtitle: 'Скидки до 70%',
    imageUrl: '/finance/more-tsum-photo.png',
  },
  { id: 3, title: 'Ostrovok', subtitle: 'Отели от 2 000 ₽', imageUrl: '/home/product-hotel.png' },
  { id: 4, title: 'Летуаль', subtitle: 'Парфюм и уход', imageUrl: '/home/product-perfume.png' },
]
