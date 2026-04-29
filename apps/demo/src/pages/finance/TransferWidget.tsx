import { ChevronRight } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@rollout/ui-kit'
import { Avatar, AvatarImage, AvatarFallback } from '@rollout/ui-kit'

import { SearchInput } from '@/components/ui/SearchInput'

import { CONTACTS } from './data'

export function TransferWidget() {
  const [query, setQuery] = useState('')

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-base font-semibold text-foreground">Перевод</h2>

      <SearchInput
        value={query}
        onChange={setQuery}
        placeholder="Введите номер или имя"
        rightSlot={<ChevronRight className="size-4" strokeWidth={1.5} aria-hidden={true} />}
      />

      <div className="overflow-x-auto scrollbar-hide -mx-4 px-4">
        <div className="flex gap-4 w-max">
          {CONTACTS.map((contact, i) => (
            <Button key={i} variant="ghost" className="flex flex-col items-center gap-2 w-[72px] h-auto p-0 rounded-xl">
              <Avatar className="size-[52px]">
                <AvatarImage src={contact.avatarUrl} alt={contact.name} />
                <AvatarFallback className="bg-secondary text-secondary-foreground text-xs font-medium">
                  {contact.name.slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm font-normal leading-4 text-foreground text-center truncate w-full">
                {contact.name}
              </span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
