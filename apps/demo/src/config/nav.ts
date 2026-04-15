import { Home, Heart, Wallet, ShoppingBasket, Sparkles } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export interface NavItem {
  label: string
  path: string
  icon: LucideIcon
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Главный', path: '/', icon: Home },
  { label: 'Избранное', path: '/favorites', icon: Heart },
  { label: 'Финансы', path: '/finance', icon: Wallet },
  { label: 'Корзина', path: '/cart', icon: ShoppingBasket },
  { label: 'Ассистент', path: '/assistant', icon: Sparkles },
]
