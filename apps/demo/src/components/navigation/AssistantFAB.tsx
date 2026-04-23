import { Sparkles } from 'lucide-react'
import { NavLink } from 'react-router-dom'

import { cn } from '@/lib/utils'

export function AssistantFAB() {
  return (
    <NavLink
      to="/assistant"
      aria-label="Ассистент"
      className={cn(
        'hidden md:flex fixed bottom-[52px] z-50 size-10 rounded-full bg-orange-500 hover:bg-orange-600 shadow-lg'
      )}
      style={{ right: 'max(calc((100vw - 1200px) / 2 + 1rem), 1rem)' }}
    >
      <Sparkles size={18} className="text-white" />
    </NavLink>
  )
}
