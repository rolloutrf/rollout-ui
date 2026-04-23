import { ItemCardDetail } from './components/ItemCardDetail'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Features/Card/ItemCardDetail',
  component: ItemCardDetail,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    onColorChange: { action: 'onColorChange' },
    onVolumeChange: { action: 'onVolumeChange' },
    onCreditMonthsChange: { action: 'onCreditMonthsChange' },
  },
} satisfies Meta<typeof ItemCardDetail>

export default meta
type Story = StoryObj<typeof meta>

const demoImages = [
  'https://images.unsplash.com/photo-1541643600914-78b084683601?w=240&h=240&fit=crop',
  'https://images.unsplash.com/photo-1541643600914-78b084683601?w=240&h=240&fit=crop',
]

const baseArgs: Story['args'] = {
  imgUrls: demoImages,
  productName: 'Flora Gorgeous Jasmine Eau de Parfum',
  maxTitleLength: 46,
  titleDescription: <p>Цветочный аромат с чистым жасминовым аккордом.</p>,
  currentPrice: 9950,
  originalPrice: 11442,
  priceLocale: 'ru-RU',
  priceCurrency: 'RUB',
  priceSubtitle: 'Скидка применяется автоматически в корзине',
  rating: 4.2,
  reviewCount: 10,
  reviewsLabel: 'отзывов',
  reviewUrl: '#reviews',
  properties: [
    {
      id: 'delivery',
      text: 'Доставка послезавтра',
      rightContent: <span style={{ color: '#10B981' }}>Бесплатно</span>,
    },
  ],
  colors: [
    { label: 'Синий', value: 'blue' },
    { label: 'Красный', value: 'red' },
    { label: 'Серый', value: 'gray' },
    { label: 'Черный', value: 'black' },
  ],
  colorLabel: 'Цвет',
  defaultColor: 'blue',
  volumes: [
    { label: '30', value: '30', suffix: 'мл' },
    { label: '60', value: '60', suffix: 'мл' },
    { label: '90', value: '90', suffix: 'мл' },
    { label: '120', value: '120', suffix: 'мл' },
  ],
  volumeLabel: 'Объем',
  defaultVolume: '30',
  actions: [
    {
      id: 'buy-now',
      text: 'Купить сейчас',
      buttonProps: { variant: 'secondary' },
    },
    {
      id: 'add-to-cart',
      text: 'В корзину',
      buttonProps: { variant: 'default' },
    },
  ],
  creditMonths: [4, 6, 8],
  defaultCreditMonths: 4,
  monthlyPrice: 8650,
  creditTitle: 'Оплата в кредит',
  creditSubtitle: 'Начнётся, только когда заказ будет у вас',
  creditDescription: 'Сейчас оплачиваете только доставку',
  descriptionTabs: [
    {
      id: 'description',
      label: 'Описание',
      shortText: 'Flora Gorgeous Jasmine Eau de Parfum — аромат с акцентом на жасмин грандифлорум.',
      detailedText: 'Композиция раскрывается чистым и мягким шлейфом, флакон бирюзового цвета с золотым колпачком.',
    },
    {
      id: 'characteristics',
      label: 'Характеристики',
      shortText: 'Парфюмерная вода, семейство: цветочные, объем на выбор.',
    },
  ],
  companyName: 'Shop',
  companyLabel: 'Магазин',
  companyRating: 4.8,
  companyItems: [
    {
      id: 'reviews-link',
      title: '5.0',
      description: '10 отзывов',
      url: '#reviews',
    },
    {
      id: 'qa-link',
      title: 'Вопросы',
      description: '1 вопрос',
      url: '#questions',
    },
  ],
}

export const Primary: Story = {
  args: {
    ...baseArgs,
  },
}
