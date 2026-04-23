import { Circle } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@rollout/ui-kit'

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
  const [selectedColor, setSelectedColor] = useState(defaultColor || colors[0]?.value)
  const [selectedVolume, setSelectedVolume] = useState(defaultVolume || volumes[0]?.value)

  const handleColorChange = (value: string) => {
    setSelectedColor(value)
    onColorChange?.(value)
  }

  const handleVolumeChange = (value: string) => {
    setSelectedVolume(value)
    onVolumeChange?.(value)
  }

  return (
    <div className="flex flex-col gap-3 w-full" data-state="selections-section">
      {colors.length > 0 && (
        <div className="flex flex-col gap-3 w-full">
          <p className="text-sm font-medium text-foreground">{colorLabel}</p>
          <div className="flex gap-2 items-start w-full flex-nowrap overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {colors.map((color) => (
              <Button
                key={color.value}
                variant={selectedColor === color.value ? 'default' : 'outline'}
                size="sm"
                className="rounded-md shrink-0"
                onClick={() => handleColorChange(color.value)}
              >
                <Circle className="size-4 mr-2 fill-current" style={{ color: resolveColor(color) }} />
                {color.label}
              </Button>
            ))}
          </div>
        </div>
      )}

      {volumes.length > 0 && (
        <div className="flex flex-col gap-3 w-full">
          <p className="text-sm font-medium text-foreground">{volumeLabel}</p>
          <div className="flex gap-0 items-center w-full">
            {volumes.map((volume, index) => (
              <Button
                key={volume.value}
                variant={selectedVolume === volume.value ? 'default' : 'outline'}
                size="sm"
                className={`flex-1 rounded-none ${
                  index === 0 ? 'rounded-l-md' : ''
                } ${index === volumes.length - 1 ? 'rounded-r-md' : ''}`}
                onClick={() => handleVolumeChange(volume.value)}
              >
                {volume.label}
                {volume.suffix ? ` ${volume.suffix}` : ''}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
