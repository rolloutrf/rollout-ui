import { Bell } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@rollout/ui-kit'

import { SearchInput } from '@/components/ui/SearchInput'

export function SearchBar() {
  const [query, setQuery] = useState('')

  return (
    <div className="flex gap-2 items-center w-full">
      <SearchInput value={query} onChange={setQuery} showClear className="flex-1" />
      <Button variant="ghost" size="icon" className="size-[40px] rounded-lg flex-shrink-0">
        <Bell className="size-6 text-muted-foreground" strokeWidth={1.5} />
      </Button>
    </div>
  )
}
