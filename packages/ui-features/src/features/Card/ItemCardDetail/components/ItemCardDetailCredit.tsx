import { useCallback, useState } from 'react'

import { ButtonGroup, Button, cn } from '@rollout/ui-kit'

import { Price } from '@features-src/shared/Price'

type ItemCardDetailCreditProps = {
  creditMonths?: number[]
  defaultCreditMonths?: number
  monthlyPrice?: number
  creditTitle?: React.ReactNode
  creditSubtitle?: React.ReactNode
  creditDescription?: React.ReactNode
  creditMonthSuffix?: string
  creditPerMonthLabel?: string
  creditLocale: string
  creditCurrency: string
  onCreditMonthsChange?: (months: number) => void
}

export const ItemCardDetailCredit = ({
  creditMonths,
  defaultCreditMonths,
  monthlyPrice,
  creditTitle = 'Оплата в кредит',
  creditSubtitle = 'Начнётся, только когда заказ будет у вас',
  creditDescription = 'Сейчас оплачиваете только доставку',
  creditMonthSuffix = 'мес.',
  creditPerMonthLabel = 'в месяц',
  creditLocale,
  creditCurrency,
  onCreditMonthsChange,
}: ItemCardDetailCreditProps) => {
  const [selectedMonths, setSelectedMonths] = useState(defaultCreditMonths)
  const handleMonthsChange = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const months = Number(e.currentTarget.dataset.months)
      setSelectedMonths(months)
      onCreditMonthsChange?.(months)
    },
    [onCreditMonthsChange]
  )

  if (!creditMonths?.length || monthlyPrice === undefined) {
    return null
  }

  return (
    <div className="flex flex-col gap-4 items-start p-5 rounded-xl w-full bg-muted" data-state="credit-section">
      <div className="flex flex-col gap-1 w-full">
        <h3 className="text-xl font-bold leading-5 text-foreground">{creditTitle}</h3>
        <p className="text-sm text-secondary-foreground">{creditSubtitle}</p>
      </div>

      <ButtonGroup className="w-full">
        {creditMonths.map((months) => (
          <Button
            key={months}
            className={cn('w-22', selectedMonths === months ? '' : 'bg-background text-foreground')}
            variant={selectedMonths === months ? 'outline' : 'default'}
            size="sm"
            data-months={months}
            onClick={handleMonthsChange}
          >
            {months} {creditMonthSuffix}
          </Button>
        ))}
      </ButtonGroup>

      <div className="flex flex-col gap-1 w-full">
        <p className="text-lg font-semibold leading-5 text-foreground">
          <Price currentPrice={monthlyPrice} locale={creditLocale} currency={creditCurrency} size="md" />{' '}
          {creditPerMonthLabel}
        </p>
        <p className="text-sm text-secondary-foreground">{creditDescription}</p>
      </div>
    </div>
  )
}
