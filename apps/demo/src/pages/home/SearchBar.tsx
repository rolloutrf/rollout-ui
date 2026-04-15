import { useState } from 'react'
import { Search, X, Bell } from 'lucide-react'
import { Input } from '@rollout/ui-kit'
import { Button } from '@rollout/ui-kit'

export function SearchBar() {
  const [query, setQuery] = useState('')

  return (
    <div className="flex gap-2 items-center w-full">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none z-10" />
        <Input
          placeholder="Поиск"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="h-10 pl-10 pr-10 rounded-xl shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]"
        />
        {query && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setQuery('')}
            className="absolute right-1 top-1/2 -translate-y-1/2 size-8 text-muted-foreground hover:text-foreground"
          >
            <X className="size-4" />
          </Button>
        )}
      </div>
      <Button variant="ghost" size="icon" className="size-[40px] rounded-lg flex-shrink-0">
        <Bell className="size-6 text-muted-foreground" strokeWidth={1.5} />
      </Button>
    </div>
  )
}
