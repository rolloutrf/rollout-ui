import { Moon, Sun } from 'lucide-react'
import { cn } from '@/lib/utils'

import { useTheme } from '@/lib/theme'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <button
      className={cn('size-9')}
      aria-label="Toggle theme"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      {theme === 'light' ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  )
}

