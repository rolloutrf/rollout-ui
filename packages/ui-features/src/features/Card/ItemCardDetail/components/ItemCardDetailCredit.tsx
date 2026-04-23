import { useState } from 'react'

import { Button } from '@rollout/ui-kit'

type ItemCardDetailCreditProps = {
  creditMonths?: number[]
  defaultCreditMonths?: number
  monthlyPrice?: number | string
  creditTitle?: React.ReactNode
  creditSubtitle?: React.ReactNode
  creditDescription?: React.ReactNode
  creditMonthSuffix?: string
  creditPerMonthLabel?: string
  creditLocale?: string
  creditCurrency?: string
  onCreditMonthsChange?: (months: number) => void
}

export const ItemCardDetailCredit = ({
  creditMonths = [4, 6, 8],
  defaultCreditMonths = 4,
  monthlyPrice = 8650,
  creditTitle = 'Оплата в кредит',
  creditSubtitle = 'Начнётся, только когда заказ будет у вас',
  creditDescription = 'Сейчас оплачиваете только доставку',
  creditMonthSuffix = 'мес.',
  creditPerMonthLabel = 'в месяц',
  creditLocale = 'ru-RU',
  creditCurrency = 'RUB',
  onCreditMonthsChange,
}: ItemCardDetailCreditProps) => {
  const [selectedMonths, setSelectedMonths] = useState(defaultCreditMonths)

  if (!creditMonths.length || monthlyPrice === undefined) {
    return null
  }

  const parsedMonthlyPrice = typeof monthlyPrice === 'number' ? monthlyPrice : Number(monthlyPrice)
  const formattedMonthlyPrice = Number.isNaN(parsedMonthlyPrice)
    ? String(monthlyPrice)
    : new Intl.NumberFormat(creditLocale, {
        style: 'currency',
        currency: creditCurrency,
        maximumFractionDigits: 0,
      }).format(parsedMonthlyPrice)

  const handleMonthsChange = (months: number) => {
    setSelectedMonths(months)
    onCreditMonthsChange?.(months)
  }

  return (
    <div
      className="flex flex-col gap-4 items-start p-5 rounded-xl w-full bg-secondary-foreground"
      data-state="credit-section"
    >
      <div className="flex flex-col gap-3 w-full">
        <h3 className="text-xl font-bold leading-5 text-primary-foreground">{creditTitle}</h3>
        <p className="text-sm text-primary-foreground/80">{creditSubtitle}</p>
      </div>

      <div className="flex gap-0 items-center w-full">
        {creditMonths.map((months, index) => (
          <Button
            key={months}
            variant={selectedMonths === months ? 'default' : 'outline'}
            size="sm"
            className={`flex-1 rounded-none ${index === 0 ? 'rounded-l-md' : ''} ${
              index === creditMonths.length - 1 ? 'rounded-r-md' : ''
            }`}
            onClick={() => handleMonthsChange(months)}
          >
            {months} {creditMonthSuffix}
          </Button>
        ))}
      </div>

      <div className="flex flex-col gap-1 w-full">
        <p className="text-lg font-semibold leading-5 text-primary-foreground">
          {formattedMonthlyPrice} {creditPerMonthLabel}
        </p>
        <p className="text-sm text-primary-foreground/80">{creditDescription}</p>
      </div>
    </div>
  )
}
