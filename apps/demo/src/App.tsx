import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppShell } from '@/components/layout/AppShell'
import { Header } from '@/components/layout/Header'
import { ContentSlot } from '@/components/layout/ContentSlot'
import { Footer } from '@/components/layout/Footer'
import { HomePage } from '@/pages/home/HomePage'
import { FavoritesPage } from '@/pages/favorites/FavoritesPage'
import { FinancePage } from '@/pages/finance/FinancePage'
import { ProfilePage } from '@/pages/profile/ProfilePage'
import { FavoritesProvider } from '@/store/favorites'

export default function App() {
  return (
    <BrowserRouter>
      <FavoritesProvider>
        <AppShell>
          <div className="flex-1 overflow-y-auto w-full">
            <Header />
            <div className="h-[72px]" />
            <div className="min-h-full flex flex-col">
              <div className="flex-1">
                <Routes>
                  <Route path="/"          element={<HomePage />} />
                  <Route path="/favorites" element={<FavoritesPage />} />
                  <Route path="/finance"   element={<FinancePage />} />
                  <Route path="/cart"      element={<ContentSlot />} />
                  <Route path="/profile"   element={<ProfilePage />} />
                  <Route path="/assistant" element={<ContentSlot />} />
                </Routes>
              </div>
              <Footer />
            </div>
          </div>
        </AppShell>
      </FavoritesProvider>
    </BrowserRouter>
  )
}
