import { ShoppingCart } from 'lucide-react'
import { NavLink } from 'react-router-dom'

import { NAV_ITEMS } from '@/config/nav'
import { cn } from '@/lib/utils'

export function DesktopNav() {
  return (
    <nav className="hidden md:flex items-center gap-1">
      {NAV_ITEMS.filter(({ path }) => path !== '/assistant').map(({ label, path }) => (
        <NavLink
          key={path}
          to={path}
          end={path === '/'}
          className={({ isActive }) =>
            cn(
              'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-normal transition-colors',
              isActive ? 'text-orange-500 bg-orange-500/10' : 'text-foreground hover:text-orange-500'
            )
          }
        >
          {path === '/cart' && <ShoppingCart size={14} />}
          {label}
        </NavLink>
      ))}
    </nav>
  )
}
