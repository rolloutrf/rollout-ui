import { NavLink } from 'react-router-dom'

import { NAV_ITEMS } from '@/config/nav'
import { cn } from '@/lib/utils'

/**
 * iOS TabBar — Apple HIG compliant
 *
 * Specs:
 * - Bar height: 49px (fixed) + env(safe-area-inset-bottom)
 * - Icons: 25×25px, strokeWidth 1.5 (SF Symbols style)
 * - Labels: 10px, font-weight 500
 * - Gap icon↔label: 3px
 * - Background: bg-background/95 + backdrop-blur-xl (iOS Regular Material)
 * - Separator: 0.5px border-t (border-border)
 * - Active color: accent (app tint)
 * - Inactive color: muted-foreground
 * - Tap: spring scale animation
 */
export function TabBar() {
  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-50"
      // Safe area for iPhone home indicator
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      {/* iOS Regular Material */}
      <div className="bg-background/20 backdrop-blur-2xl backdrop-saturate-150 border-t border-border">
        <div className="flex items-stretch px-2">
          {NAV_ITEMS.map(({ label, path, icon: ItemIcon }) => (
            <NavLink
              key={path}
              to={path}
              end={path === '/'}
              className={({ isActive }) =>
                cn(
                  'flex-1 flex flex-col items-center justify-center gap-[6px]',
                  'pt-3 pb-[34px]',
                  'transition-all active:scale-110 duration-150',
                  isActive ? 'text-orange-500' : 'text-muted-foreground'
                )
              }
            >
              <ItemIcon size={22} strokeWidth={1.5} />
              <span className="text-[10px] font-medium leading-none">{label}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  )
}
