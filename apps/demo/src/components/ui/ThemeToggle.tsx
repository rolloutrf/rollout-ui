import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/lib/theme'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <button
      className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }), 'size-9')}
      aria-label="Toggle theme"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      {theme === 'light' ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  )
}
