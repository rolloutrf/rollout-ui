import { Circle } from 'lucide-react'
import { useMemo, useState } from 'react'

import { Button, ButtonGroup } from '@rollout/ui-kit'

import type {
  ItemCardDetailColorOption,
  ItemCardDetailVolumeOption,
} from '@features-src/features/Card/ItemCardDetail/types/ItemCardDetail.types'

type ItemCardDetailSelectionsProps = {
  colors?: ItemCardDetailColorOption[]
  colorLabel?: React.ReactNode
  defaultColor?: string
  onColorChange?: (color: string) => void

  volumes?: ItemCardDetailVolumeOption[]
  volumeLabel?: React.ReactNode
  defaultVolume?: string
  onVolumeChange?: (volume: string) => void
}

const COLOR_VALUE_MAP: Record<string, string> = {
  blue: '#2563EB',
  red: '#DC2626',
  gray: '#A3A3A3',
  black: '#262626',
}

const resolveColor = (option: ItemCardDetailColorOption) => {
  if (option.colorHex) {
    return option.colorHex
  }

  return COLOR_VALUE_MAP[option.value] ?? '#A3A3A3'
}

type ButtonRadioProps = {
  defaultValue?: string
  items: { label: React.ReactNode; value: string; }[]
  onChange?: (value: string) => void
}

const ButtonRadio = ({ defaultValue, items, onChange }: ButtonRadioProps) => {
  const [selected, setSelected] = useState(defaultValue ?? items[0]?.value)

  const onInnerSelect = (e: React.MouseEvent<HTMLButtonElement>) => {
    const value = e.currentTarget.dataset.value
    if (!value) return
    setSelected(value)
    onChange?.(value)
  }

  return (
    <>
      {items.map((item) => (
        <Button
          key={item.value}
          variant={selected === item.value ? 'default' : 'outline'}
          className={selected === item.value ? 'bg-secondary text-foreground' : ''}
          size="sm"
          onClick={onInnerSelect}
          data-value={item.value}
        >
          {item.label}
        </Button>
      ))}
    </>
  )
}

export const ItemCardDetailSelections = ({
  colors = [],
  colorLabel = 'Цвет',
  defaultColor,
  onColorChange,
  volumes = [],
  volumeLabel = 'Объем',
  defaultVolume,
  onVolumeChange,
}: ItemCardDetailSelectionsProps) => {
  const innerColors = useMemo(() => colors.map((option) => ({
    label: (
      <div className="flex items-center gap-2">
        <Circle className="size-4 fill-current" style={{ color: resolveColor(option) }} />
        {option.label}
      </div>
    ),
    value: option.value,
  })), [colors])

  return (
    <div className="flex flex-col gap-3 w-full" data-state="selections-section">
      {colors.length > 0 && (
        <div className="flex flex-col gap-3 w-full">
          <p className="text-sm font-medium text-foreground">{colorLabel}</p>
          <div className="flex gap-2 items-start w-full flex-nowrap overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <ButtonRadio items={innerColors} defaultValue={defaultColor} onChange={onColorChange} />
          </div>
        </div>
      )}

      {volumes.length > 0 && (
        <div className="flex flex-col gap-3 w-full">
          <p className="text-sm font-medium text-foreground">{volumeLabel}</p>
          <ButtonGroup className='w-full'>
            <ButtonRadio items={volumes} defaultValue={defaultVolume} onChange={onVolumeChange} />
          </ButtonGroup>
        </div>
      )}
    </div>
  )
}
