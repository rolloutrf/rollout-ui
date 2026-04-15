import { Palette, Truck } from 'lucide-react'

import { ItemCard } from './components/ItemCard'

import type { Meta, StoryObj } from '@storybook/react-vite'

const DEFAULT_ATTRIBUTES = [
  {
    Icon: Palette,
    swatches: ['#111827', '#F97316', '#EAB308'],
    text: '3 цвета',
  },
  {
    Icon: Truck,
    text: 'Доставка завтра',
  },
]

const DEFAULT_IMAGES = [
  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?auto=format&fit=crop&w=1200&q=80',
]

const meta = {
  title: 'features/Card/ItemCard',
  component: ItemCard,
  argTypes: {
    imgUrls: { control: false },
    title: { control: 'text' },
    price: { control: 'text' },
    originalPrice: { control: 'text' },
    discount: { control: 'text' },
    attributes: { control: false },
    seller: { control: 'text' },
    rating: { control: 'text' },
    reviewCount: { control: 'text' },
    metaText: { control: 'text' },
    buttonText: { control: 'text' },
    isFavorite: { control: 'boolean' },
    onFavoriteToggle: { control: false },
    buttonProps: { control: false },
    favoriteButtonProps: { control: false },
  },
} satisfies Meta<typeof ItemCard>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    imgUrls: DEFAULT_IMAGES,
    title: 'Смарт-часы Rollout Active 2 с AMOLED-дисплеем и GPS',
    price: '12 990 ₽',
    originalPrice: '16 990 ₽',
    discount: '-24%',
    attributes: DEFAULT_ATTRIBUTES,
    seller: 'Rollout Store',
    rating: '4.8',
    reviewCount: '214 отзывов',
    metaText: 'Гарантия 12 месяцев',
    buttonText: 'В корзину',
    onFavoriteToggle: () => {},
  },
}
