import { Button, Input, cn } from '@rollout/ui-kit'
import { Search, X } from 'lucide-react'

interface SearchInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  rightSlot?: React.ReactNode
  showClear?: boolean
  className?: string
}

export function SearchInput({
  value,
  onChange,
  placeholder = 'Поиск',
  rightSlot,
  showClear = false,
  className,
}: SearchInputProps) {
  const hasClear = showClear && value.length > 0

  return (
    <div className={cn('relative w-full', className)}>
      <Search
        className="pointer-events-none absolute left-3 top-1/2 z-10 size-4 -translate-y-1/2 text-muted-foreground"
        strokeWidth={1.5}
        aria-hidden={true}
      />
      <Input
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          'h-10 rounded-xl pl-10 text-sm shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]',
          hasClear || rightSlot ? 'pr-10' : 'pr-3'
        )}
      />
      {hasClear ? (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onChange('')}
          aria-label="Очистить"
          className="absolute right-1 top-1/2 size-8 -translate-y-1/2 text-muted-foreground hover:text-foreground"
        >
          <X className="size-4" />
        </Button>
      ) : rightSlot ? (
        <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
          {rightSlot}
        </div>
      ) : null}
    </div>
  )
}
