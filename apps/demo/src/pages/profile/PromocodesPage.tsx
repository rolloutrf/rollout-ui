import { Button, Field, FieldLabel, Input } from '@rollout/ui-kit'
import { ArrowLeft, Gift } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface Promo {
  title: string
  description: string
}

const PROMOS: Promo[] = [
  { title: 'Товары за 1 ₽', description: 'до 28 октября' },
  { title: '−20% на первый заказ', description: 'действует 7 дней' },
  { title: 'Бесплатная доставка', description: 'при заказе от 1 500 ₽' },
  { title: 'Кэшбэк 500 ₽', description: 'при оплате RolloutPay' },
]

export function PromocodesPage() {
  const navigate = useNavigate()
  const [code, setCode] = useState('')

  return (
    <div className="w-full">
      <div className="mx-auto flex max-w-[576px] flex-col gap-7 pt-20 pb-8">
        {/* NavBar (Figma 221:4124) */}
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
          <h1 className="flex-1 text-lg font-semibold leading-7 text-foreground">Промокоды</h1>
          <div className="size-10 shrink-0 rounded-xl" aria-hidden="true" />
        </div>

        {/* Activate */}
        <div className="flex w-full flex-col gap-3">
          <Field>
            <Input
              className="h-10 rounded-xl px-3 text-sm"
              placeholder="Введите промокод"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </Field>
          <Button className="h-10 w-full rounded-xl text-sm" disabled={code.trim().length === 0}>
            Активировать
          </Button>
        </div>

        {/* Your promo codes */}
        <section className="flex w-full flex-col gap-3">
          <FieldLabel className="text-sm font-medium text-foreground">Ваши промокоды</FieldLabel>
          <ul className="flex w-full flex-col">
            {PROMOS.map((promo, i) => (
              <li
                key={i}
                className="flex w-full items-center gap-2.5 px-3 py-3"
              >
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-border bg-muted">
                  <Gift className="size-4 text-foreground" strokeWidth={1.5} />
                </div>
                <div className="flex flex-1 min-w-0 flex-col gap-1">
                  <p className="text-sm font-medium leading-4 text-foreground">{promo.title}</p>
                  <p className="text-sm font-normal leading-5 text-muted-foreground">{promo.description}</p>
                </div>
                <Button variant="secondary" className="h-9 shrink-0 rounded-xl px-3 text-xs font-medium">
                  Применить
                </Button>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}
