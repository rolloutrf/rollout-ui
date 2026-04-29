import { RefreshCw, ShieldCheck, Truck } from 'lucide-react'

import type { Product } from '@/pages/home/data'

// "Вам может понравится" — diverse phone-family variants for the Электроника page.
// Все используют /home/product-smartphone.png, отличаются заголовком, ценой,
// атрибутами, продавцом и рейтингом — пока в /public/home/ нет других electronics-фото.
export const RECOMMENDED: Product[] = [
  {
    id: 'e1',
    imgUrl: ['/home/product-smartphone.png', '/home/product-smartphone.png'],
    title: 'Смартфон Phone 16 Pro Max Black Titanium, nano SIM + eSIM сим-карты 256 ГБ',
    price: 69500,
    originalPrice: 79500,
    discount: '-10 %',
    attributes: [
      { type: 'color', colors: ['#0a0a0a', '#737373', '#e5e5e5', '#1d4ed8'], label: '+2 цвета' },
      { type: 'icon', icon: Truck, label: '3-5 дней' },
      { type: 'icon', icon: RefreshCw, label: 'Можно в рассрочку' },
    ],
    seller: 'Alexstore',
    rating: '4,2',
    reviewCount: '(19)',
    date: 'Создано вчера в 11:20',
    buttonText: 'В корзину',
  },
  {
    id: 'e2',
    imgUrl: ['/home/product-smartphone.png'],
    title: 'Смартфон Phone 16 Pro Natural Titanium, 512 ГБ, nano SIM + eSIM',
    price: 94900,
    originalPrice: 109900,
    discount: '-13 %',
    attributes: [
      { type: 'color', colors: ['#e5e5e5', '#a3a3a3', '#0a0a0a'], label: '+1 цвет' },
      { type: 'icon', icon: Truck, label: 'Завтра' },
    ],
    seller: 'iWorld',
    rating: '4,8',
    reviewCount: '(247)',
    date: 'Создано сегодня в 09:40',
    buttonText: 'В корзину',
  },
  {
    id: 'e3',
    imgUrl: ['/home/product-smartphone.png'],
    title: 'Смартфон Phone 16 Plus Black, 128 ГБ',
    price: 74490,
    attributes: [
      { type: 'color', colors: ['#0a0a0a', '#fde68a', '#1d4ed8'], label: '+3 цвета' },
      { type: 'icon', icon: Truck, label: '2-4 дня' },
      { type: 'icon', icon: ShieldCheck, label: 'Гарантия 2 года' },
    ],
    seller: 'Цифровой мир',
    rating: '4,5',
    reviewCount: '(58)',
    date: 'Создано вчера в 19:05',
    buttonText: 'В корзину',
  },
  {
    id: 'e4',
    imgUrl: ['/home/product-smartphone.png', '/home/product-smartphone.png'],
    title: 'Смартфон Phone 15 Pro Max, 256 ГБ, восстановленный',
    price: 46900,
    originalPrice: 69000,
    discount: '-32 %',
    attributes: [
      { type: 'icon', icon: Truck, label: '3-7 дней' },
      { type: 'icon', icon: RefreshCw, label: 'Можно в рассрочку' },
    ],
    seller: 'Trade-in.Hub',
    rating: '4,7',
    reviewCount: '(412)',
    date: 'Создано 3 дня назад',
    buttonText: 'В корзину',
  },
]
