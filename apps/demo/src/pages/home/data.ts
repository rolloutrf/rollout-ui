import type { LucideIcon } from 'lucide-react'
import { Truck, RefreshCw, MapPin } from 'lucide-react'

export interface Attribute {
  Icon?: LucideIcon   // lucide-react icon component (Truck, RefreshCw, MapPin, etc.)
  swatches?: string[] // color hex values for color dots row
  text: string
}

export interface Category {
  id: string
  label: string
  imgUrl: string
  wide: boolean
  imgOffsetY?: number // vertical offset in px, positive = down
  imgOffsetX?: number // horizontal offset in px, positive = right
}

export interface Banner {
  id: string
  imgUrl: string
  imgScale?: number   // override image scale, default 130
  imgOffsetY?: number // vertical offset in %, positive = down
}

export interface Product {
  id: string
  imgUrl: string
  title: string
  price: string
  originalPrice?: string
  discount?: string
  attributes: Attribute[]
  seller?: string
  rating?: string
  reviewCount?: string
  date: string
  buttonText: string
}

export const CATEGORY_ROW_1: Category[] = [
  { id: 'c1', label: 'Электроника',        imgUrl: '/home/cat-elektronika.png', wide: true },
  { id: 'c2', label: 'Одежда',             imgUrl: '/home/cat-odezhda.png', wide: true },
  { id: 'c3', label: 'Косметика',          imgUrl: '/home/cat-kosmetika.png', wide: true },
  { id: 'c4', label: 'Авто',               imgUrl: '/home/cat-avto.png', wide: false, imgOffsetY: -16, imgOffsetX: -8 },
  { id: 'c5', label: 'Бронирование жилья', imgUrl: '/home/cat-bronir.png', wide: true, imgOffsetY: 8 },
  { id: 'c6', label: 'Покупка жилья',      imgUrl: '/home/cat-pokupka-zhilya.png', wide: true,  imgOffsetY: -8 },
]

export const CATEGORY_ROW_2: Category[] = [
  { id: 'c7',  label: 'Цветы',              imgUrl: '/home/cat-tsvety.png', wide: false, imgOffsetY: -8 },
  { id: 'c8',  label: 'Товары для дома',    imgUrl: '/home/cat-tovary-doma.png', wide: true,  imgOffsetY: -8 },
  { id: 'c9',  label: 'Доставка продуктов', imgUrl: '/home/cat-dostavka-produktov.png', wide: true,  imgOffsetY: 8 },
  { id: 'c10', label: 'Услуги',             imgUrl: '/home/cat-uslugi.png', wide: false, imgOffsetY: 8 },
  { id: 'c11', label: 'Доставка еды',       imgUrl: '/home/cat-dostavka-edy.png', wide: true,  imgOffsetY: 8 },
  { id: 'c12', label: 'Работа',             imgUrl: '/home/cat-rabota.png', wide: true,  imgOffsetY: -8 },
]

export const BANNERS: Banner[] = [
  { id: 'b1', imgUrl: '/home/banner-1.png' },
  { id: 'b2', imgUrl: '/home/banner-2.png' },
  { id: 'b3', imgUrl: '/home/banner-3.png', imgScale: 128, imgOffsetY: 4 },
]

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    imgUrl: '/home/product-smartphone.png',
    title: 'Смартфон Phone 16 Pro Max Black Titanium, nano SIM + eSIM сим-карты 256 ГБ',
    price: '69\u00a0500 ₽',
    originalPrice: '79\u00a0500 ₽',
    discount: '-10 %',
    attributes: [
      { swatches: ['#0a0a0a', '#737373', '#e5e5e5', '#1d4ed8'], text: '+2 цвета' },
      { Icon: Truck, text: '3-5 дней' },
      { Icon: RefreshCw, text: 'Можно в рассрочку' },
    ],
    seller: 'Alexstore',
    rating: '4,2',
    reviewCount: '(19)',
    date: 'Создано вчера в\u00a011:20',
    buttonText: 'В корзину',
  },
  {
    id: 'p2',
    imgUrl: '/home/product-car.png',
    title: 'Auto 5 серия M Sport, черный металлик, 3.0 л, 340 л.с., полный привод 2021',
    price: '5\u00a0399\u00a0000 ₽',
    originalPrice: '5\u00a0938\u00a0900 ₽',
    discount: '-10 %',
    attributes: [
      { text: 'Седан ∙ Автомат' },
    ],
    seller: 'Autostar',
    rating: '4,2',
    date: 'Создано вчера в\u00a011:20',
    buttonText: 'Позвонить',
  },
  {
    id: 'p3',
    imgUrl: '/home/product-apartment.png',
    title: '1-комн. квартира с уютной атмосферой и современным дизайном, 50 м²',
    price: '7\u00a0500\u00a0000 ₽',
    originalPrice: '8\u00a0625\u00a0000 ₽',
    discount: '-15 %',
    attributes: [
      { text: '1 из 11 эт. ∙ 4 кв. 2024' },
      { Icon: Truck, text: 'Спальных мест: 4' },
      { Icon: MapPin, text: 'м. Солнцево' },
    ],
    seller: 'ЖК Солнечный',
    rating: '4,7',
    reviewCount: '(34)',
    date: 'Создано вчера в\u00a011:20',
    buttonText: 'Забронировать',
  },
  {
    id: 'p4',
    imgUrl: '/home/product-pizza.png',
    title: 'Пицца пепперони, средняя, 350 г',
    price: '690 ₽',
    attributes: [
      { Icon: Truck, text: 'в течении часа' },
    ],
    seller: 'Дринкит',
    rating: '4,9',
    reviewCount: '(190)',
    date: 'Создано вчера в\u00a011:20',
    buttonText: 'В корзину',
  },
  {
    id: 'p5',
    imgUrl: '/home/product-hoodie.png',
    title: 'Уютный худи «Зимний Вечер»',
    price: '4\u00a0500 ₽',
    originalPrice: '5\u00a0925 ₽',
    discount: '-10 %',
    attributes: [
      { swatches: ['#0a0a0a', '#e5e5e5', '#1d4ed8'], text: '+2 цвета' },
      { text: 'Размеры 40 - 56' },
    ],
    seller: 'YES YES Brand',
    rating: '4,5',
    reviewCount: '(87)',
    date: 'Создано сегодня в\u00a010:30',
    buttonText: 'В корзину',
  },
  {
    id: 'p6',
    imgUrl: '/home/product-plumber.png',
    title: 'Услуги сантехника: установка и ремонт труб, монтаж сантехнического оборудования, устранение засоров',
    price: 'от 10\u00a0000 ₽',
    attributes: [
      { text: '1\u00a0000 ₽ за час' },
      { text: 'Комиссия 50%' },
      { Icon: MapPin, text: 'м. Солнцево' },
    ],
    seller: 'Александр',
    rating: '4,8',
    reviewCount: '(23)',
    date: 'Создано вчера',
    buttonText: 'Позвонить',
  },
  {
    id: 'p7',
    imgUrl: '/home/product-bananas.png',
    title: 'Бананы Эквадор, 500 г',
    price: '99 ₽',
    attributes: [
      { text: '+200 баллов' },
      { Icon: Truck, text: 'за 1 час' },
    ],
    seller: 'Дринкит',
    rating: '4,6',
    reviewCount: '(543)',
    date: 'Создано сегодня',
    buttonText: 'В корзину',
  },
  {
    id: 'p8',
    imgUrl: '/home/product-bouquet.png',
    title: 'Букет цветов «Летний бриз» (роза, гвоздика, ромашка)',
    price: '2\u00a0700 ₽',
    attributes: [
      { Icon: Truck, text: 'за 30 минут' },
    ],
    seller: 'NiceFlower',
    rating: '4,9',
    reviewCount: '(312)',
    date: 'Создано сегодня',
    buttonText: 'Заказать',
  },
  {
    id: 'p9',
    imgUrl: '/home/product-hotel.png',
    title: 'Отель «Сияющий Титан» номера класса люкс',
    price: '10\u00a0000 ₽',
    attributes: [
      { text: 'цена за 9 ночей' },
    ],
    seller: 'Travel Star',
    rating: '4,7',
    reviewCount: '(156)',
    date: 'Создано 2 дня назад',
    buttonText: 'Забронировать',
  },
  {
    id: 'p10',
    imgUrl: '/home/product-house.png',
    title: 'Каркасный дом «Северное Сияние»',
    price: '7\u00a0000\u00a0000 ₽',
    attributes: [
      { Icon: Truck, text: 'Спальных мест: 4' },
      { Icon: MapPin, text: 'Подольск' },
    ],
    seller: 'House',
    rating: '4,4',
    reviewCount: '(12)',
    date: 'Создано 3 дня назад',
    buttonText: 'Позвонить',
  },
  {
    id: 'p11',
    imgUrl: '/home/product-perfume.png',
    title: 'Духи «Тайна Ночи» с нотами чёрной смородины и жасмина',
    price: '19\u00a0500 ₽',
    attributes: [
      { Icon: Truck, text: '1 день' },
    ],
    seller: 'Афродита',
    rating: '4,9',
    reviewCount: '(89)',
    date: 'Создано вчера',
    buttonText: 'Купить',
  },
  {
    id: 'p12',
    imgUrl: '/home/product-programmer.png',
    title: 'Программист для разработки мобильных приложений на платформе iOS',
    price: '375\u00a0000 ₽',
    attributes: [
      { text: 'Старший специалист' },
      { text: 'Полный день' },
      { Icon: MapPin, text: 'Москва' },
    ],
    seller: 'Jobs',
    rating: '4,3',
    reviewCount: '(7)',
    date: 'Создано сегодня в\u00a009:00',
    buttonText: 'Откликнуться',
  },
  {
    id: 'p13',
    imgUrl: '/home/product-armchair.png',
    title: 'Барское кресло',
    price: '375\u00a0000 ₽',
    attributes: [
      { swatches: ['#0a0a0a', '#e5e5e5', '#737373'], text: '+2 цвета' },
      { Icon: Truck, text: '1-2 дня' },
      { text: '200 бонусов' },
    ],
    seller: 'Cozy Home',
    rating: '4,6',
    reviewCount: '(34)',
    date: 'Создано вчера',
    buttonText: 'В корзину',
  },
]
