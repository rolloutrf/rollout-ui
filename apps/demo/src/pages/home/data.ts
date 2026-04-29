import { Truck, RefreshCw, MapPin } from 'lucide-react'

type AttributeBase = {
  label: string
}

type AttributeIcon = AttributeBase & {
  type: 'icon'
  icon: React.ElementType<{ className?: string; 'aria-hidden'?: boolean }>
}

type AttributeColor = AttributeBase & {
  type: 'color'
  colors: string[]
}

type AttributeComponent = AttributeBase & {
  type: 'component'
  content: React.ReactNode
}

export type Attribute = AttributeIcon | AttributeColor | AttributeComponent

export interface Category {
  id: string
  label: string
  imgUrl: string
  wide: boolean
  imgOffsetY?: number // vertical offset in px, positive = down
  imgOffsetX?: number // horizontal offset in px, positive = right
  to?: string // optional SPA link target — wraps the card in <Link>
}

export interface Banner {
  id: string
  imgUrl: string
  imgScale?: number // override image scale, default 130
  imgOffsetY?: number // vertical offset in %, positive = down
}

export interface Product {
  id: string
  imgUrl: string[]
  title: string
  price: number
  originalPrice?: number
  discount?: string
  attributes: Attribute[]
  seller?: string
  rating?: string
  reviewCount?: string
  date: string
  buttonText: string
}

export const CATEGORY_ROW_1: Category[] = [
  { id: 'c1', label: 'Электроника', imgUrl: '/home/cat-elektronika.png', wide: true, to: '/electronics' },
  { id: 'c2', label: 'Одежда', imgUrl: '/home/cat-odezhda.png', wide: true },
  { id: 'c3', label: 'Косметика', imgUrl: '/home/cat-kosmetika.png', wide: true },
  {
    id: 'c4',
    label: 'Авто',
    imgUrl: '/home/cat-avto.png',
    wide: false,
    imgOffsetY: -16,
    imgOffsetX: -8,
  },
  {
    id: 'c5',
    label: 'Бронирование жилья',
    imgUrl: '/home/cat-bronir.png',
    wide: true,
    imgOffsetY: 8,
  },
  {
    id: 'c6',
    label: 'Покупка жилья',
    imgUrl: '/home/cat-pokupka-zhilya.png',
    wide: true,
    imgOffsetY: -8,
  },
]

export const CATEGORY_ROW_2: Category[] = [
  { id: 'c7', label: 'Цветы', imgUrl: '/home/cat-tsvety.png', wide: false, imgOffsetY: -8 },
  {
    id: 'c8',
    label: 'Товары для дома',
    imgUrl: '/home/cat-tovary-doma.png',
    wide: true,
    imgOffsetY: -8,
  },
  {
    id: 'c9',
    label: 'Доставка продуктов',
    imgUrl: '/home/cat-dostavka-produktov.png',
    wide: true,
    imgOffsetY: 8,
  },
  { id: 'c10', label: 'Услуги', imgUrl: '/home/cat-uslugi.png', wide: false, imgOffsetY: 8 },
  {
    id: 'c11',
    label: 'Доставка еды',
    imgUrl: '/home/cat-dostavka-edy.png',
    wide: true,
    imgOffsetY: 8,
  },
  { id: 'c12', label: 'Работа', imgUrl: '/home/cat-rabota.png', wide: true, imgOffsetY: -8 },
]

export const BANNERS: Banner[] = [
  { id: 'b1', imgUrl: '/home/banner-1.png' },
  { id: 'b2', imgUrl: '/home/banner-2.png' },
  { id: 'b3', imgUrl: '/home/banner-3.png', imgScale: 128, imgOffsetY: 4 },
]

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
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
    id: 'p2',
    imgUrl: ['/home/product-car.png', '/home/product-car.png'],
    title: 'Auto 5 серия M Sport, черный металлик, 3.0 л, 340 л.с., полный привод 2021',
    price: 5399000,
    originalPrice: 5938900,
    discount: '-10 %',
    attributes: [{ type: 'component', content: 'Седан ∙ Автомат', label: 'Седан ∙ Автомат' }],
    seller: 'Autostar',
    rating: '4,2',
    date: 'Создано вчера в 11:20',
    buttonText: 'Позвонить',
  },
  {
    id: 'p3',
    imgUrl: ['/home/product-apartment.png', '/home/product-apartment.png'],
    title: '1-комн. квартира с уютной атмосферой и современным дизайном, 50 м²',
    price: 7500000,
    originalPrice: 8625000,
    discount: '-15 %',
    attributes: [
      { type: 'component', content: '1 из 11 эт. ∙ 4 кв. 2024', label: '1 из 11 эт. ∙ 4 кв. 2024' },
      { type: 'icon', icon: Truck, label: 'Спальных мест: 4' },
      { type: 'icon', icon: MapPin, label: 'м. Солнцево' },
    ],
    seller: 'ЖК Солнечный',
    rating: '4,7',
    reviewCount: '(34)',
    date: 'Создано вчера в 11:20',
    buttonText: 'Забронировать',
  },
  {
    id: 'p4',
    imgUrl: ['/home/product-pizza.png'],
    title: 'Пицца пепперони, средняя, 350 г',
    price: 690,
    attributes: [{ type: 'icon', icon: Truck, label: 'в течении часа' }],
    seller: 'Дринкит',
    rating: '4,9',
    reviewCount: '(190)',
    date: 'Создано вчера в 11:20',
    buttonText: 'В корзину',
  },
  {
    id: 'p5',
    imgUrl: ['/home/product-hoodie.png'],
    title: 'Уютный худи «Зимний Вечер»',
    price: 4500,
    originalPrice: 5925,
    discount: '-10 %',
    attributes: [
      { type: 'color', colors: ['#0a0a0a', '#e5e5e5', '#1d4ed8'], label: '+2 цвета' },
      { type: 'component', content: 'Размеры 40 - 56', label: 'Размеры 40 - 56' },
    ],
    seller: 'YES YES Brand',
    rating: '4,5',
    reviewCount: '(87)',
    date: 'Создано сегодня в 10:30',
    buttonText: 'В корзину',
  },
  {
    id: 'p6',
    imgUrl: ['/home/product-plumber.png'],
    title: 'Услуги сантехника: установка и ремонт труб, монтаж сантехнического оборудования, устранение засоров',
    price: 10000,
    attributes: [
      { type: 'component', content: '1 000 ₽ за час', label: '1 000 ₽ за час' },
      { type: 'component', content: 'Комиссия 50%', label: 'Комиссия 50%' },
      { type: 'icon', icon: MapPin, label: 'м. Солнцево' },
    ],
    seller: 'Александр',
    rating: '4,8',
    reviewCount: '(23)',
    date: 'Создано вчера',
    buttonText: 'Позвонить',
  },
  {
    id: 'p7',
    imgUrl: ['/home/product-bananas.png'],
    title: 'Бананы Эквадор, 500 г',
    price: 99,
    attributes: [
      { type: 'component', content: '+200 баллов', label: '+200 баллов' },
      { type: 'icon', icon: Truck, label: 'за 1 час' },
    ],
    seller: 'Дринкит',
    rating: '4,6',
    reviewCount: '(543)',
    date: 'Создано сегодня',
    buttonText: 'В корзину',
  },
  {
    id: 'p8',
    imgUrl: ['/home/product-bouquet.png'],
    title: 'Букет цветов «Летний бриз» (роза, гвоздика, ромашка)',
    price: 2700,
    attributes: [{ type: 'icon', icon: Truck, label: 'за 30 минут' }],
    seller: 'NiceFlower',
    rating: '4,9',
    reviewCount: '(312)',
    date: 'Создано сегодня',
    buttonText: 'Заказать',
  },
  {
    id: 'p9',
    imgUrl: ['/home/product-hotel.png'],
    title: 'Отель «Сияющий Титан» номера класса люкс',
    price: 10000,
    attributes: [{ type: 'component', content: 'цена за 9 ночей', label: 'цена за 9 ночей' }],
    seller: 'Travel Star',
    rating: '4,7',
    reviewCount: '(156)',
    date: 'Создано 2 дня назад',
    buttonText: 'Забронировать',
  },
  {
    id: 'p10',
    imgUrl: ['/home/product-house.png'],
    title: 'Каркасный дом «Северное Сияние»',
    price: 7000000,
    attributes: [
      { type: 'icon', icon: Truck, label: 'Спальных мест: 4' },
      { type: 'icon', icon: MapPin, label: 'Подольск' },
    ],
    seller: 'House',
    rating: '4,4',
    reviewCount: '(12)',
    date: 'Создано 3 дня назад',
    buttonText: 'Позвонить',
  },
  {
    id: 'p11',
    imgUrl: ['/home/product-perfume.png'],
    title: 'Духи «Тайна Ночи» с нотами чёрной смородины и жасмина',
    price: 19500,
    attributes: [{ type: 'icon', icon: Truck, label: '1 день' }],
    seller: 'Афродита',
    rating: '4,9',
    reviewCount: '(89)',
    date: 'Создано вчера',
    buttonText: 'Купить',
  },
  {
    id: 'p12',
    imgUrl: ['/home/product-programmer.png', '/home/product-programmer.png'],
    title: 'Программист для разработки мобильных приложений на платформе iOS',
    price: 375000,
    attributes: [
      { type: 'component', content: 'Старший специалист', label: 'Старший специалист' },
      { type: 'component', content: 'Полный день', label: 'Полный день' },
      { type: 'icon', icon: MapPin, label: 'Москва' },
    ],
    seller: 'Jobs',
    rating: '4,3',
    reviewCount: '(7)',
    date: 'Создано сегодня в 09:00',
    buttonText: 'Откликнуться',
  },
  {
    id: 'p13',
    imgUrl: ['/home/product-armchair.png', '/home/product-armchair.png'],
    title: 'Барское кресло',
    price: 375000,
    attributes: [
      { type: 'color', colors: ['#0a0a0a', '#e5e5e5', '#737373'], label: '+2 цвета' },
      { type: 'icon', icon: Truck, label: '1-2 дня' },
      { type: 'component', content: '200 бонусов', label: '200 бонусов' },
    ],
    seller: 'Cozy Home',
    rating: '4,6',
    reviewCount: '(34)',
    date: 'Создано вчера',
    buttonText: 'В корзину',
  },
]
