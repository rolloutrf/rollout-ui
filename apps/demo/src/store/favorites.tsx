import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

interface FavoritesCtx {
  ids: Set<string>
  toggle: (id: string) => void
  has: (id: string) => boolean
}

const FavoritesContext = createContext<FavoritesCtx | null>(null)

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('favorites')
      return saved ? new Set(JSON.parse(saved) as string[]) : new Set()
    } catch {
      return new Set()
    }
  })

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify([...ids]))
  }, [ids])

  const toggle = (id: string) => {
    setIds((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const has = (id: string) => ids.has(id)

  return <FavoritesContext.Provider value={{ ids, toggle, has }}>{children}</FavoritesContext.Provider>
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext)
  if (!ctx) throw new Error('useFavorites must be used within FavoritesProvider')
  return ctx
}
