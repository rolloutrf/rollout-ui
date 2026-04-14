import { useState } from 'react'
import { Search, ChevronRight } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { CONTACTS } from './data'

export function TransferWidget() {
  const [query, setQuery] = useState('')

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-base font-semibold text-foreground">Перевод</h2>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none z-10" />
        <Input
          placeholder="Введите номер или имя"
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="h-10 pl-10 pr-9 rounded-xl shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]"
        />
        <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
      </div>

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
              <span className="text-sm font-normal leading-4 text-foreground text-center truncate w-full">{contact.name}</span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
